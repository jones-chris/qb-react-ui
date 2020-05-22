import React, { Component } from 'react';
import './Joins.css'


class Joins extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Create joins JSX.
        const joinsJsx = this.props.joins.map(join => {
            // Create available tables JSX for parent table select element.
            const availableTablesParentTableOptions = this.props.availableTables.map(table => {
                return <option key={table.fullyQualifiedName}
                               value={table.fullyQualifiedName}
                               selected={join.parentTable.fullyQualifiedName === table.fullyQualifiedName}
                >
                    {table.tableName}
                </option>
            });

            // Create available tables JSX for target table select element.
            const availableTablesTargetTableOptions = this.props.availableTables.map(table => {
                return <option key={table.fullyQualifiedName}
                               value={table.fullyQualifiedName}
                               selected={join.targetTable.fullyQualifiedName === table.fullyQualifiedName}
                >
                    {table.tableName}
                </option>
            });

            // Create available parent and target columns JSX.
            let availableParentColumns = [];
            let availableTargetColumns = [];
            availableParentColumns.push(
                join.metadata.availableColumns.parentColumns.map((column, index) => {
                    return <option key={column.fullyQualifiedName}
                                   // id={`joins${join.metadata.id}.parentJoinColumns[${index}]`}
                                   data-index={index}
                                   value={column.fullyQualifiedName}
                    >
                        {column.columnName}
                    </option>
                })
            );

            availableTargetColumns.push(
                join.metadata.availableColumns.targetColumns.map(column => {
                    return <option key={column.fullyQualifiedName}
                                   value={column.fullyQualifiedName}
                    >
                        {column.columnName}
                    </option>
                })
            );

            // Create a join column div that includes a list of the parent join columns and target join columns.
            let joinColumns = [];
            if (join.parentJoinColumns !== undefined) {
                join.parentJoinColumns.forEach((parentColumn, index) => {
                    let parentJoinColumnsId = `joins${join.metadata.id}.parentJoinColumns${index}`;
                    let targetJoinColumnsId = `joins${join.metadata.id}.targetJoinColumns${index}`;

                    joinColumns.push(
                        <div key={index} data-index={index}>
                            <select id={parentJoinColumnsId}
                                    data-index={index}
                                    onChange={() => this.props.onJoinColumnChangeHandler(join.metadata.id, parentJoinColumnsId, targetJoinColumnsId)}
                            >
                                {availableParentColumns}
                            </select>

                            <b> = </b>

                            <select id={targetJoinColumnsId}
                                    data-index={index}
                                    onChange={() => this.props.onJoinColumnChangeHandler(join.metadata.id, parentJoinColumnsId, targetJoinColumnsId)}
                            >
                                {availableTargetColumns}
                            </select>

                            <button id={`joins${join.metadata.id}.addParentAndTargetColumn`} type="button">
                                +
                            </button>
                        </div>
                    )
                });
            }

            return <div key={join.metadata.id} id={`join-row${join.metadata.id}`} className="join-row">
                <button id={`joins-deleteButton-${join.metadata.id}`} className="delete-join-button" type="button"
                        onClick={() => this.props.onDeleteJoinHandler(join.metadata.id)}>
                    X
                </button>

                <input id={`joins${join.metadata.id}.joinType`} hidden defaultValue={join.joinType}/>

                <select id={`joins${join.metadata.id}.parentTable`}
                        onChange={(event) => this.props.onJoinTableChangeHandler(join.metadata.id, `joins${join.metadata.id}.parentTable`, `joins${join.metadata.id}.targetTable`)}
                >
                    {availableTablesParentTableOptions}
                </select>

                <img id={`joins-image-${join.metadata.id}`}
                     className="join-image"
                     src={join.metadata.joinImageUrl}
                     onClick={() => this.props.onJoinImageClickHandler(join.metadata.id)}/>

                <select id={`joins${join.metadata.id}.targetTable`}
                        onChange={(event) => this.props.onJoinTableChangeHandler(join.metadata.id, `joins${join.metadata.id}.parentTable`, `joins${join.metadata.id}.targetTable`)}
                >
                    {availableTablesTargetTableOptions}
                </select>

                {/*Join columns*/}
                {joinColumns}
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
