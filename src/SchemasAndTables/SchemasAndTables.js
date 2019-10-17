import React from 'react';
import './SchemasAndTables.css'

const Aux = props => props.children;

const SchemasAndTables = (props) => {
    return (
        <Aux>
            <div id="schemasDiv" className="schemas-div" hidden={props.hidden === 'true'}>
                <label htmlFor="schemas">Schemas</label>
                <select id="schemas" size="30">
                    <option value="null">null</option>
                </select>
            </div>

            <div id="tablesDiv" className="tables-div" hidden={props.hidden === 'true'}>
                <label htmlFor="table">Tables</label>
                <select id="table" name="table" multiple={true} size="30">
                </select>
            </div>
        </Aux>

    );
};

export default SchemasAndTables;