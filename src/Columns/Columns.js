import * as React from "react";
import './Columns.css';
import * as Utils from '../Utils/Utils';

class Columns extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        // Create JSX list of all available tables so that it can be used when rendering.
        const availableColumns = [];
        if (this.props.availableColumns) {
            this.props.availableColumns.forEach(column => {
                availableColumns.push(
                    <option key={`${column.databaseName}.${column.schemaName}.${column.tableName}.${column.columnName}`}
                            value={column.columnName}>
                        {`${column.tableName}.${column.columnName} (${Utils.getJdbcSqlType(column.dataType)})`}
                    </option>
                );
            })
        }

        return (
            <div id="tableColumns" name="tableColumns" className="table-columns" width="600px" height="191px"
                 hidden={this.props.hidden === 'true'}
            >
                <div id="availableColumnsDiv" className="available-columns-div">
                    <label htmlFor="availableColumns">Table Columns</label>
                    <select id="availableColumns" name="availableColumns" multiple size="25"
                    >
                        {availableColumns}
                    </select>
                </div>
                <div id="addRemoveColumns" className="available-columns-buttons-div">
                    <button id="addColumnsButton" name="addColumnsButton" type="button"
                            className="available-columns-add-button"> &#8592; </button>
                    <br/>
                    <button id="removeColumnsButton" name="removeColumnsButton" type="button"
                            className="available-columns-remove-button"
                    > &#8594; </button>
                </div>
                <div id="selectedColumnsDiv" className="selected-columns-div">
                    <label htmlFor="selectedColumns">Selected Columns</label>
                    <select id="columns" name="columns" multiple size="25">
                        <option value="null">null</option>
                    </select>
                </div>
            </div>
        );
    }

}

export default Columns;
