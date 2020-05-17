import React, { Component } from 'react';
import './Joins.css'
import * as Constants from '../Config/Constants';


class Joins extends Component {

    state = {
        joins: []
    };

    constructor(props) {
        super(props);
    }

    isTableSelected(joinId, fullyQualifiedTableName, parentOrTarget) {
        if (this.props.joins.length === 0) {
            return false;
        }

        // for (let i=0; i<this.props.joins.length; i++) {
        //     let join = this.props.joins[i];
        let join = this.props.joins.filter(join => join.id === joinId);
            if (parentOrTarget === Constants.PARENT) {
                if (join.parentTable.fullyQualifiedName === fullyQualifiedTableName) {
                    return true;
                }
            } else if (parentOrTarget === Constants.TARGET) {
                if (join.targetTable.fullyQualifiedName === fullyQualifiedTableName) {
                    return true;
                }
            }
        // }

        return false;
    }

    render() {
        // // Create available tables JSX for parent table select element.
        // const availableTablesParentTableOptions = this.props.availableTables.map(table => {
        //     return <option key={table.fullyQualifiedName}
        //                    value={table.fullyQualifiedName}
        //                    selected={this.isTableSelected(table.fullyQualifiedName, Constants.PARENT)}
        //             >
        //         {table.tableName}
        //     </option>
        // });
        //
        // // Create available tables JSX for target table select element.
        // const availableTablesTargetTableOptions = this.props.availableTables.map(table => {
        //     return <option key={table.fullyQualifiedName}
        //                    value={table.fullyQualifiedName}
        //                    selected={this.isTableSelected(table.fullyQualifiedName, Constants.TARGET)}
        //             >
        //         {table.tableName}
        //     </option>
        // });

        // // Create available columns JSX.
        // const availableColumns = this.props.availableColumns.map(column => {
        //     return <option key={column.fullyQualifiedName}
        //                    value={column.fullyQualifiedName}
        //             >
        //         {column.columnName}
        //     </option>
        // });

        // Create available parent columns JSX.
        // if (this.props.availableColumns.size() > 0) {
        //     const availableParentColumns = this.props.availableColumns.values().map(value => {
        //         return <option key={column.fullyQualifiedName}
        //                        value={column.fullyQualifiedName}
        //         >
        //             {column.columnName}
        //         </option>
        //     });
        // }


        // Create available target columns JSX.
        // const availableTargetColumns = this.props.availableColumns.availableTargetColumns.map(column => {
        //     return <option key={column.fullyQualifiedName}
        //                    value={column.fullyQualifiedName}
        //     >
        //         {column.columnName}
        //     </option>
        // });

        // Create joins JSX.
        const joinsJsx = this.props.joins.map(join => {
            // Create available tables JSX for parent table select element.
            const availableTablesParentTableOptions = this.props.availableTables.map(table => {
                return <option key={table.fullyQualifiedName}
                               value={table.fullyQualifiedName}
                               // selected={this.isTableSelected(join.id, table.fullyQualifiedName, Constants.PARENT)}
                               selected={join.parentTable.fullyQualifiedName === table.fullyQualifiedName}
                >
                    {table.tableName}
                </option>
            });

            // Create available tables JSX for target table select element.
            const availableTablesTargetTableOptions = this.props.availableTables.map(table => {
                return <option key={table.fullyQualifiedName}
                               value={table.fullyQualifiedName}
                               // selected={this.isTableSelected(join.id, table.fullyQualifiedName, Constants.TARGET)}
                               selected={join.targetTable.fullyQualifiedName === table.fullyQualifiedName}
                >
                    {table.tableName}
                </option>
            });

            // Create available parent and target columns JSX.
            const joinAvailableColumns = this.props.availableColumns.get(join.id);

            let availableParentColumns = [];
            let availableTargetColumns = [];
            if (joinAvailableColumns) {
                availableParentColumns.push(
                    joinAvailableColumns.availableParentColumns.map(column => {
                        return <option key={column.fullyQualifiedName}
                                       value={column.fullyQualifiedName}
                        >
                            {column.columnName}
                        </option>
                    })
                );

                availableTargetColumns.push(
                    joinAvailableColumns.availableTargetColumns.map(column => {
                        return <option key={column.fullyQualifiedName}
                                       value={column.fullyQualifiedName}
                        >
                            {column.columnName}
                        </option>
                    })
                );
            }

            return <div key={join.id} id={`join-row${join.id}`} className="join-row">
                <button id={`joins-deleteButton-${join.id}`} className="delete-join-button" type="button"
                        onClick={() => this.props.onDeleteJoinHandler(join.id)}>
                    X
                </button>

                <input id={`joins${join.id}.joinType`} hidden defaultValue={join.joinType}/>

                <select id={`joins${join.id}.parentTable`}
                        onChange={(event) => this.props.onJoinTableChangeHandler(join.id, `joins${join.id}.parentTable`, `joins${join.id}.targetTable`)}
                >
                    {availableTablesParentTableOptions}
                </select>

                <img id={`joins-image-${join.id}`}
                     className="join-image"
                     src={join.joinImageUrl}
                     onClick={() => this.props.onJoinImageClickHandler(join.id)}/>

                <select id={`joins${join.id}.targetTable`}
                        onChange={(event) => this.props.onJoinTableChangeHandler(join.id, `joins${join.id}.parentTable`, `joins${join.id}.targetTable`)}
                >
                    {availableTablesTargetTableOptions}
                </select>

                <div>
                    <select id={`joins${join.id}.parentJoinColumns`}>
                        {availableParentColumns}
                    </select>

                    <b> = </b>

                    <select id={`joins${join.id}.targetJoinColumns`}>
                        {availableTargetColumns}
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
