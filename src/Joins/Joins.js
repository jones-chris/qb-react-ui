import React, { Component } from 'react';
import './Joins.css'


class Joins extends Component {

    state = {
        joins: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        // Create available tables JSX.
        const availableTables = this.props.availableTables.map(table => {
            return <option key={table.fullyQualifiedName}
                           value={table.fullyQualifiedName}
            >
                {table.tableName}
            </option>
        });

        // Create available columns JSX.
        const availableColumns = this.props.availableColumns.map(column => {
            return <option key={column.fullyQualifiedName}
                           value={column.fullyQualifiedName}
            >
                {column.columnName}
            </option>
        });

        // Create joins JSX.
        const joinsJsx = this.props.joins.map(join => {
            return <div key={join.id} id={`join-row${join.id}`} className="join-row">
                <button id={`joins-deleteButton-${join.id}`} className="delete-join-button" type="button"
                        onClick={() => this.props.onDeleteJoinHandler(join.id)}>
                    X
                </button>

                <input id={`joins${join.id}.joinType`} hidden defaultValue={join.joinType}/>

                <select id={`joins${join.id}.parentTable`}>
                    {availableTables}
                </select>

                <img id={`joins-image-${join.id}`}
                     className="join-image"
                     src={join.joinImageUrl}
                     onClick={() => this.props.onJoinImageClickHandler(join.id)}/>

                <select id={`joins${join.id}.targetTable`}>
                    {availableTables}
                </select>

                <div>
                    <select id={`joins${join.id}.parentJoinColumns`}>
                        {availableColumns}
                    </select>

                    <b> = </b>

                    <select id={`joins${join.id}.targetJoinColumns`}>
                        {availableColumns}
                    </select>

                    <button id={`joins${join.id}.addParentAndTargetColumn`} type="button">
                        +
                    </button>
                </div>
            </div>
        });

        return (
            <div id="joinsDiv" className="joins-div" hidden={this.props.hidden === 'true'}>
                <button id="addJoin" name="addJoin" type="button" onClick={this.props.onAddJoinClickHandler}>Add Join</button>
                <div>
                    {joinsJsx}
                </div>
            </div>
        );
    }
}

export default Joins;
