import React, { Component } from 'react';
import './MenuBar.css';
import * as Constants from '../Config/Constants';
import { connect } from 'react-redux'
import { store } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { replaceParentCriterionIds } from "../actions/CriteriaActions";
import { removeJoinMetadata } from "../actions/JoinActions";


class MenuBar extends Component {

    constructor(props) {
        super(props);

        // Get target databases so they can be added to the drop down nav bar.
        let apiUrl = `${store.getState().config.baseApiUrl}/metadata/database`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(databases => {
                console.log(databases);
                this.props.updateAvailableDatabases(databases);
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    onRunQueryHandler = () => {
        const currentQueryState = store.getState().query;
        const currentJoinState = store.getState().joins;

        // Determine parent table.
        let targetJoinTables = currentQueryState.joins.map(join => join.targetTable.fullyQualifiedName);
        let parentTable = currentQueryState.selectedTables.find(table => ! targetJoinTables.includes(table.fullyQualifiedName));

        // Build statement object
        let statement = {
            name: '',
            database: currentQueryState.selectedDatabase,
            columns: currentQueryState.selectedColumns,
            table: parentTable,
            criteria: replaceParentCriterionIds(currentQueryState.criteria),
            joins: removeJoinMetadata(currentJoinState.joins),
            distinct: currentQueryState.distinct,
            groupBy: false,
            orderBy: false,
            limit: currentQueryState.limit,
            ascending: currentQueryState.ascending,
            offset: currentQueryState.offset,
            suppressNulls: currentQueryState.suppressNulls
        };

        console.log(statement);

        console.log(JSON.stringify(statement));

        // Send query to API.
        let apiUrl = `${store.getState().config.baseApiUrl}/data/${currentQueryState.selectedDatabase}/query`;
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(statement),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(json => {
                console.log(json);

                // Send json to window's parent so the parent can choose what to do with the data.
                let parentWindow = store.getState().config.parentWindow;
                let parentWindowUrl = store.getState().config.parentWindowUrl;
                parentWindow.postMessage(json, parentWindowUrl);
            })
            .catch(reason => {
                console.error(reason);
            });
    };

    render() {
        // Create database NavDropdown.Item JSX.
        let availableDatabases = [];
        store.getState().query.availableDatabases.forEach(database => {
            availableDatabases.push(
                <NavDropdown.Item key={database.databaseName}
                                  onClick={() => this.props.onChangeSelectedDatabase(database)}
                                  // onClick={() => alert('changed!')}
                >
                    {database.databaseName} ({database.databaseType})
                </NavDropdown.Item>
            );
        });

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">qb4j</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Databases" id="basic-nav-dropdown">
                            {availableDatabases}
                        </NavDropdown>

                        <Nav.Link className={this.props.elementVisibility.schemasAndTablesElementHidden ? "nav-item" : "nav-item active"}
                                  onClick={this.props.toggleSchemasAndTablesVisibility}
                        >
                            Schemas & Tables
                        </Nav.Link>

                        <Nav.Link className={this.props.elementVisibility.joinsElementHidden ? "nav-item" : "nav-item active"}
                                  onClick={this.props.toggleJoinsVisibility}
                        >
                            Joins
                        </Nav.Link>

                        <Nav.Link className={this.props.elementVisibility.columnsElementHidden ? "nav-item" : "nav-item active"}
                                  onClick={this.props.toggleColumnsVisibility}
                        >
                            Columns
                        </Nav.Link>

                        <Nav.Link className={this.props.elementVisibility.criteriaElementHidden ? "nav-item" : "nav-item active"}
                                  onClick={this.props.toggleCriteriaVisibility}
                        >
                            Criteria
                        </Nav.Link>

                        <Nav.Link className={this.props.elementVisibility.otherOptionsElementHidden ? "nav-item" : "nav-item active"}
                                  onClick={this.props.toggleOtherOptionsVisibility}
                        >
                            Other Options
                        </Nav.Link>
                    </Nav>

                    <Button className="btn btn-outline-primary my-2 my-sm-0"
                            onClick={this.onRunQueryHandler}
                    >
                        Run Query
                    </Button>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return {
        ...reduxState.menuBar,
        ...reduxState.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleJoinsVisibility: () => dispatch({ type: Constants.JOINS }),
        toggleSchemasAndTablesVisibility: () => dispatch({ type: Constants.SCHEMAS_AND_TABLES }),
        toggleQueryTemplatesVisibility: () => dispatch({ type: Constants.QUERY_TEMPLATES }),
        toggleColumnsVisibility: () => dispatch({ type: Constants.COLUMNS }),
        toggleCriteriaVisibility: () => dispatch({ type: Constants.CRITERIA }),
        toggleOtherOptionsVisibility: () => dispatch({ type: Constants.OTHER_OPTIONS }),
        updateAvailableDatabases: (availableDatabases) => {
            dispatch({
                type: 'UPDATE_AVAILABLE_DATABASES',
                payload: {
                    availableDatabases: availableDatabases
                }
            })
        },
        onChangeSelectedDatabase: (selectedDatabase) => {
            // Update selected database.
            dispatch({
                type: 'CHANGE_SELECTED_DATABASE',
                payload: {
                    selectedDatabase: selectedDatabase
                }
            });

            // Get available schemas for the database.
            let apiUrl = `${store.getState().config.baseApiUrl}/metadata/${selectedDatabase.databaseName}/schema`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(schemas => {
                    console.log(schemas);

                    // Update the schemas in the redux state.
                    dispatch({
                        type: 'UPDATE_AVAILABLE_SCHEMAS',
                        payload: {
                            availableSchemas: schemas,
                            isLoading: false
                        }
                    })
                });
        }
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(MenuBar);
