import React, { Component } from 'react';
import './SchemasAndTables.css';
import {connect} from "react-redux";
import { store } from '../index';
import * as Utils from "../Utils/Utils";


class SchemasAndTables extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Get available schemas.
        let apiUrl = `${store.getState().config.baseApiUrl}/metadata/querybuilder4j/schema`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(schemas => {
                console.log(schemas);
                this.props.getAvailableSchemasHandler(schemas)
            });
    }

    render() {
        // Create JSX list of all available schemas so that it can be used when rendering.
        const availableSchemas = [];
        this.props.availableSchemas.forEach(schema => {
            availableSchemas.push(
                <option key={schema.fullyQualifiedName}
                        value={schema.fullyQualifiedName}
                        selected={this.props.selectedSchemas.includes(schema)}
                        onClick={() => this.props.onSelectSchemaHandler(schema.fullyQualifiedName)}
                >
                    {schema.schemaName}
                </option>
            )
        });

        // Create JSX list of all available tables so that it can be used when rendering.
        const availableTables = [];
        if (this.props.availableTables) {
            // Get selected tables...the map() function was returning an empty array so I have to do it the verbose way.
            let selectedTables = [];
            for (let i=0; i<this.props.selectedTables.length; i++) {
                let selectedTable = this.props.selectedTables[i];
                let fullyQualifiedName = selectedTable.fullyQualifiedName;
                selectedTables.push(fullyQualifiedName);
            }

            // For each available table, create the JSX.
            this.props.availableTables.forEach(table => {
                let isSelected = selectedTables.includes(table.fullyQualifiedName);

                availableTables.push(
                    <option key={table.fullyQualifiedName}
                            value={table.fullyQualifiedName}
                            selected={isSelected}
                    >
                        {table.tableName}
                    </option>
                );
            })
        }

        return (
            <div>
                <div id="schemasDiv" className="schemas-div" hidden={this.props.hidden === 'true'}>
                    <label htmlFor="schemas">Schemas</label>
                    <select id="schemas" size="30" multiple={false}  // todo:  eventually change this to support multiple schemas.  API will need to support it too.
                            onChange={this.props.selectSchemasHandler}
                    >
                        {availableSchemas}
                    </select>
                </div>

                <div id="tablesDiv" className="tables-div" hidden={this.props.hidden === 'true'}>
                    <label htmlFor="table">Tables</label>
                    <select id="table" name="table" multiple={true} size="30"
                            onChange={(event) => this.props.onSelectTableHandler(event.target)}
                    >
                        {availableTables}
                    </select>
                </div>
            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => {
    return reduxState.query;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAvailableSchemasHandler: (availableSchemas) => dispatch({
            type: 'UPDATE_AVAILABLE_SCHEMAS',
            payload: {
                availableSchemas: availableSchemas,
                isLoading: false
            }
        }),
        onSelectSchemaHandler: (schemaFullyQualifiedName) => {
            // Get schema object that has been selected.
            let selectedSchemaObjects = store.getState().query.availableSchemas.filter(schema => schemaFullyQualifiedName === schema.fullyQualifiedName);

            // Create a string with the schema names joined together with `&` to be used in API call.
            let joinedSchemaString = selectedSchemaObjects.map(schema => schema.schemaName).join('&');

            let apiUrl = `${store.getState().config.baseApiUrl}/metadata/querybuilder4j/${joinedSchemaString}/table-and-view`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(tables => {
                    console.log(tables);

                    dispatch({ type: 'SELECT_SCHEMA', payload: { tables: tables} })
                });
        },
        onSelectTableHandler: (target) => {
            let newSelectedTableFullyQualifiedNames = Utils.getSelectedOptions(target);

            // Get the table object for the table that was selected.
            let allTables = store.getState().query.availableTables.filter(table => newSelectedTableFullyQualifiedNames.includes(table.fullyQualifiedName));

            // Get table columns for all selected tables.
            let apiUrl = `${store.getState().config.baseApiUrl}/metadata/database/schema/table/column`;
            fetch(apiUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(allTables)
            }).then(response => response.json())
                .then(columns => {
                    console.log(columns);

                    dispatch( { type: 'SELECT_TABLE', payload: { selectedTables: allTables, availableColumns: columns } } )
                });
        }
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(SchemasAndTables);
