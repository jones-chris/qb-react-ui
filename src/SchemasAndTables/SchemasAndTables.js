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

        return (
            <div>
                <div id="schemasDiv" className="schemas-div" hidden={this.props.hidden === 'true'}>
                    <label htmlFor="schemas">Schemas</label>
                    <select id="schemas" size="30" multiple={true}
                            onChange={this.props.selectHandler}
                    >
                        {availableSchemas}
                    </select>
                </div>

                <div id="tablesDiv" className="tables-div" hidden={this.props.hidden === 'true'}>
                    <label htmlFor="table">Tables</label>
                    <select id="table" name="table" multiple={true} size="30">
                    </select>
                </div>
            </div>
        );
    }

}

export default SchemasAndTables;
