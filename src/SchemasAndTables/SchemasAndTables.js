import React, { Component } from 'react';
import './SchemasAndTables.css';


class SchemasAndTables extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Create JSX list of all available schemas so that it can be used when rendering.
        const availableSchemas = [];
        this.props.availableSchemas.forEach(schema => {
            availableSchemas.push(
                <option key={schema.fullyQualifiedName}
                        value={schema.fullyQualifiedName}
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
