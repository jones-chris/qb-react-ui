import React, { Component } from 'react';
import './SchemasAndTables.css';


class SchemasAndTables extends Component {

    constructor(props) {
        super(props);

        this.state = {
            availableSchemas: [],
            selectedSchemas: [],
            availableTables: [],
            selectedTables: []
        };

        this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e);
    }

    render() {
        // Create JSX list of all available schemas so that it can be used when rendering.
        const availableSchemas = [];
        this.props.availableSchemas.forEach(schema => {
            availableSchemas.push(
                <option key={`${schema.databaseName}.${schema.schemaName}`} value={schema.schemaName}>{schema.schemaName}</option>
            )
        });

        // Create JSX list of all available tables so that it can be used when rendering.
        const availableTables = [];
        if (this.props.availableTables) {
            this.props.availableTables.forEach(table => {
                availableTables.push(
                    <option key={`${table.databaseName}.${table.schemaName}.${table.tableName}`} value={table.tableName}>{table.tableName}</option>
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
                            onChange={this.props.selectTablesHandler}
                    >
                        {availableTables}
                    </select>
                </div>
            </div>
        );
    }

}

export default SchemasAndTables;
