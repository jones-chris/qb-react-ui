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

        // todo:  Add bindings here
        this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e);
    }

    render() {
        return (
            <div>
                <div id="schemasDiv" className="schemas-div" hidden={this.props.hidden === 'true'}>
                    <label htmlFor="schemas">Schemas</label>
                    <select id="schemas" size="30" multiple={true}
                            onChange={this.props.selectHandler}
                    >
                        <option value="null">null</option>
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
