import React, { Component } from 'react';
import './MenuBar.css';
import * as Constants from '../Config/Constants';
import { connect } from 'react-redux'
import { store } from "../index";


class MenuBar extends Component {

    constructor(props) {
        super(props);
    }

    onRunQueryHandler = () => {
        const currentQueryState = store.getState().query;
        const currentJoinState = store.getState().joins;

        // Put selected columns in the format the API is expecting.
        // todo:  change this once the qb4j library, backend, and front end all use the same schema.
        let selectedColumns = [];
        for (let column of currentQueryState.selectedColumns) {
            selectedColumns.push({
                fullyQualifiedName: column.tableName + '.' + column.columnName,
                alias: ''
            });
        }

        // Determine parent table.
        let targetJoinTables = currentQueryState.joins.map(join => join.targetTable.fullyQualifiedName);
        let parentTable = currentQueryState.selectedTables.find(table => ! targetJoinTables.includes(table.fullyQualifiedName));

        // todo:  Prepare join objects for now but pass object without metadata later when object structures are standardized across library, backend, and front end.
        let preparedJoins = [];
        currentJoinState.joins.forEach(join => {
            let preparedJoin = {
                joinType: join.joinType,
                parentTable: (join.parentTable.schemaName === 'null') ? join.parentTable.tableName : join.parentTable.schemaName + '.' + join.parentTable.tableName,
                targetTable: (join.targetTable.schemaName === 'null') ? join.targetTable.tableName : join.targetTable.schemaName + '.' + join.targetTable.tableName,
                parentJoinColumns: [],
                targetJoinColumns: []
            };

            join.parentJoinColumns.forEach(parentJoinColumn => {
                preparedJoin.parentJoinColumns.push(parentJoinColumn.tableName + '.' + parentJoinColumn.columnName);
            });

            join.targetJoinColumns.forEach(targetJoinColumn => {
                preparedJoin.targetJoinColumns.push(targetJoinColumn.tableName + '.' + targetJoinColumn.columnName);
            });

            preparedJoins.push(preparedJoin);
        });

        // Build statement object
        let statement = {
            name: '',
            columns: selectedColumns,
            table: parentTable.tableName, // todo:  pass entire parentTable object to API when object structures are standardized across library, backend, and frontend.
            criteria: currentQueryState.criteria,
            joins: preparedJoins,
            distinct: currentQueryState.distinct,
            groupBy: false,
            orderBy: false,
            limit: currentQueryState.limit,
            ascending: currentQueryState.ascending,
            offset: currentQueryState.offset,
            suppressNulls: currentQueryState.suppressNulls
        };

        console.log(statement);

        // Send query to API.
        let apiUrl = `${store.getState().config.baseApiUrl}/data/querybuilder4j/query`;
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
            });
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">qb4j</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Databases
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>

                        <hr className="divider"/>

                        {/*<li className={this.props.elementVisibility.queryTemplatesElementHidden ? "nav-item" : "nav-item active"}*/}
                        {/*    onClick={this.props.toggleQueryTemplatesVisibility}*/}
                        {/*>*/}
                        {/*    <a className="nav-link" href="#">{Constants.QUERY_TEMPLATES} <span className="sr-only">(current)</span></a>*/}
                        {/*</li>*/}

                        {/*<hr className="divider"/>*/}

                        <li className={this.props.elementVisibility.schemasAndTablesElementHidden ? "nav-item" : "nav-item active"}
                            onClick={this.props.toggleSchemasAndTablesVisibility}
                        >
                            <a className="nav-link" href="#">{Constants.SCHEMAS_AND_TABLES} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.props.elementVisibility.joinsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={this.props.toggleJoinsVisibility}
                        >
                            <a className="nav-link" href="#">{Constants.JOINS} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.props.elementVisibility.columnsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={this.props.toggleColumnsVisibility}
                        >
                            <a className="nav-link" href="#">{Constants.COLUMNS} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.props.elementVisibility.criteriaElementHidden ? "nav-item" : "nav-item active"}
                            onClick={this.props.toggleCriteriaVisibility}
                        >
                            <a className="nav-link" href="#">{Constants.CRITERIA} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.props.elementVisibility.otherOptionsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={this.props.toggleOtherOptionsVisibility}
                        >
                            <a className="nav-link" href="#">{Constants.OTHER_OPTIONS} <span className="sr-only">(current)</span></a>
                        </li>

                    </ul>

                    <button className="btn btn-outline-primary my-2 my-sm-0"
                            onClick={this.onRunQueryHandler}
                    >
                        Run Query
                    </button>

                </div>
            </nav>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState.menuBar;
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleJoinsVisibility: () => dispatch({ type: Constants.JOINS }),
        toggleSchemasAndTablesVisibility: () => dispatch({ type: Constants.SCHEMAS_AND_TABLES }),
        toggleQueryTemplatesVisibility: () => dispatch({ type: Constants.QUERY_TEMPLATES }),
        toggleColumnsVisibility: () => dispatch({ type: Constants.COLUMNS }),
        toggleCriteriaVisibility: () => dispatch({ type: Constants.CRITERIA }),
        toggleOtherOptionsVisibility: () => dispatch({ type: Constants.OTHER_OPTIONS })
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(MenuBar);
