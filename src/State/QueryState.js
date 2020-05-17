import React, { Component } from 'react';
import MenuBar from "../MenuBar/MenuBar";
import SchemasAndTables from "../SchemasAndTables/SchemasAndTables";
import Joins from "../Joins/Joins";
import OtherOptions from "../OtherOptions/OtherOptions";
import * as Constants from '../Config/Constants';
import Columns from "../Columns/Columns";
import * as Utils from '../Utils/Utils';

class QueryState extends Component {

    constructor(props) {
        super(props);

        this.state = {
            elementsVisibility: {
                queryTemplatesElementHidden: true,
                schemasAndTablesElementHidden: false,
                joinsElementHidden: true,
                columnsElementHidden: true,
                criteriaElementHidden: true,
                otherOptionsElementHidden: true
            },
            isLoading: true,
            availableSchemas: [],
            selectedSchemas: [],
            availableTables: [],
            selectedTables: [],
            availableColumns: [],
            selectedColumns: [],
            joins: [],
            joinAvailableColumns: new Map(),
            distinct: false,
            suppressNulls: false,
            limit: 10,
            offset: 0
        };

        // Bind handlers to `this` context.
        this.updateSelectedSchemas.bind(this);
        this.updateSelectedTables.bind(this);
        this.toggleElementVisibilityHandler.bind(this);
        this.updateSelectedColumns.bind(this);
        this.updateDistinct.bind(this);
        this.updateSuppressNulls.bind(this);
        this.updateLimit.bind(this);
        this.updateOffset.bind(this);
        this.onAddJoinClickHandler.bind(this);
        this.onDeleteJoinHandler.bind(this);
        this.onJoinImageClickHandler.bind(this);
        this.onJoinTableChangeHandler.bind(this);
    }

    componentDidMount() {
        // Get available schemas.
        fetch('http://localhost:8080/metadata/querybuilder4j/schema')
            .then(response => response.json())
            .then(schemas => {
                console.log(schemas);

                let newState = Object.assign({}, this.state);
                newState.availableSchemas = schemas;
                newState.isLoading = false;
                this.setState(newState);
            });
    }

    updateSelectedSchemas = (event) => {
        // First, update state's selectedSchemas.
        const selectElement = event.target;
        let newSelectedSchemas = Utils.getSelectedOptions(selectElement);

        // Get schema object that has been selected.
        let selectedSchemaObjects = this.state.availableSchemas.filter(schema => newSelectedSchemas.includes(schema.fullyQualifiedName));

        this.setState({ selectedSchemas: selectedSchemaObjects });

        // Second, get available tables for the selected schemas.
        // todo:  this is hard coded to the 0th selected schema because multiple schemas are not supported in the API yet.
        this.getAvailableTables(selectedSchemaObjects[0].schemaName)
    };

    updateSelectedTables = (event) => {
        console.log(this.state);

        // First, update state's selectedTables.
        const selectElement = event.target;
        let newSelectedTableFullyQualifiedNames = Utils.getSelectedOptions(selectElement);

        // Get table objects that have been selected.
        console.log(this.state.availableTables);
        let selectedTableObjects = this.state.availableTables.filter(table => newSelectedTableFullyQualifiedNames.includes(table.fullyQualifiedName));

        this.setState({selectedTables: selectedTableObjects});

        // Second, get available columns for selected tables.
        // todo:  this is hard coded to the 0th selected schema because multiple schemas are not supported in the API yet.
        let newSelectedTableNames = selectedTableObjects.map(selectedTableObj => selectedTableObj.tableName);
        this.getAvailableColumns(this.state.selectedSchemas[0].schemaName, newSelectedTableNames);
    };

    getAvailableTables(schemaName) {
        this.setState({ isLoading: true });

        fetch(`http://localhost:8080/metadata/querybuilder4j/${schemaName}/table-and-view`)
            .then(response => response.json())
            .then(tables => {
                console.log(tables);

                let newState = Object.assign({}, this.state);
                newState.availableTables = tables;
                newState.isLoading = false;
                this.setState(newState);
            });
    }

    getAvailableColumns(schemaName, tables) {
        this.setState({ isLoading: true });

        fetch(`http://localhost:8080/metadata/querybuilder4j/${schemaName}/${tables.join('&')}/column`)
            .then(response => response.json())
            .then(columns => {
                console.log(columns);

                let newState = Object.assign({}, this.state);
                newState.availableColumns = columns;
                newState.isLoading = false;
                this.setState(newState);
            });
    }

    updateSelectedColumns = (action) => {
        if (action === Constants.ADD) {
            let newSelectedColumnsFullyQualifiedNames = Utils.getSelectedOptions(document.getElementById('availableColumns'));

            // Get the column JSON object based on newSelectedColumns, which is an array of the column fullyQualifiedNames.
            let newSelectedColumns = this.state.availableColumns.filter(column => {
                return newSelectedColumnsFullyQualifiedNames.includes(column.fullyQualifiedName);
            });

            this.setState({selectedColumns: newSelectedColumns});
        } else if (action === Constants.REMOVE) {
            let fullyQualifiedColumnsNamesToRemove = Utils.getSelectedOptions(document.getElementById('columns'));

            let newSelectedColumns = this.state.selectedColumns.filter(column => {
                return ! fullyQualifiedColumnsNamesToRemove.includes(column.fullyQualifiedName);
            });

            this.setState({selectedColumns: newSelectedColumns})
        }

    };

    updateDistinct = (isDistinct) => {
        this.setState({distinct: isDistinct});
    };

    updateSuppressNulls = (isSuppressNulls) => {
        this.setState({suppressNulls: isSuppressNulls})
    };

    updateLimit = (newLimit) => {
        this.setState({limit: newLimit});
    };

    updateOffset = (newOffset) => {
        this.setState({offset: newOffset});
    };

    onAddJoinClickHandler = () => {
        let defaultTableObject = '';
        if (this.state.availableTables.length > 0) {
            defaultTableObject = this.state.availableTables[0];
        }

        let newState = Object.assign({}, this.state);
        newState.joins.push({
            'key': newState.joins.length,
            'id': newState.joins.length,
            'joinType': Constants.JOIN_IMAGES[0].name,
            'joinImageUrl': Constants.JOIN_IMAGES[0].image,
            'parentTable': defaultTableObject,
            'targetTable': defaultTableObject,
            'parentJoinColumns': [],
            'targetJoinColumns': []
        });

        this.setState(newState);
    };

    onDeleteJoinHandler = (joinId) => {
        joinId = parseInt(joinId);

        // Create new array of joins that excludes the id being deleted.
        let newState = Object.assign({}, this.state);
        newState.joins = newState.joins.filter(join => join.id !== joinId);

        // Renumber join ids.
        for (let i=0; i<newState.joins.length; i++) {
            newState.joins[i].id = i;
            newState.joins[i].key = i;
        }

        // Delete map entry from joinAvailableColumns that has a key matching the join id.
        let matchingJoinWasDeleted = false;
        for (const [key, value] of newState.joinAvailableColumns.entries()) {
            if (key === joinId) {
                newState.joinAvailableColumns.delete(key);
                matchingJoinWasDeleted = true;
                continue;
            }

            // Renumber the value.  If the join was deleted already, move all items after that item back one "slot" in the map.
            if (matchingJoinWasDeleted) {
                newState.joinAvailableColumns.set(key - 1, value);
                newState.joinAvailableColumns.delete(key);
            }
        }

        this.setState(newState);
    };

    onJoinImageClickHandler = (joinId) => {
        // Get next join image based on currentJoinType.
        joinId = parseInt(joinId);
        let currentJoinType = this.state.joins.filter(join => join.id === joinId)[0].joinType;

        let currentJoinTypeIndex;
        for (let i=0; i<Constants.JOIN_IMAGES.length; i++) {
            let join = Constants.JOIN_IMAGES[i];
            if (join.name === currentJoinType) {
                currentJoinTypeIndex = i;
                break;
            }
        }

        let nextJoinType;
        let nextJoinImageUrl;
        try {
            nextJoinType = Constants.JOIN_IMAGES[currentJoinTypeIndex + 1].name;
            nextJoinImageUrl = Constants.JOIN_IMAGES[currentJoinTypeIndex + 1].image;
        } catch (e) {
            nextJoinType = Constants.JOIN_IMAGES[0].name; // Default to first item in case of index out of range exception.
            nextJoinImageUrl = Constants.JOIN_IMAGES[0].image; // Default to first item in case of index out of range exception.
        }

        // Copy state
        let newState = Object.assign({}, this.state);
        newState.joins.forEach(join => {
            if (join.id === joinId) {
                join.joinType = nextJoinType;
                join.joinImageUrl = nextJoinImageUrl;
            }
        });

        this.setState(newState);
    };

    onJoinTableChangeHandler = (joinId, parentTableEl, targetTableEl) => {
        let parentTableName = Utils.getSelectedOptions(document.getElementById(parentTableEl))[0];
        let parentTableObject = this.state.availableTables.filter(table => { return table.fullyQualifiedName === parentTableName; })[0];

        let targetTableName = Utils.getSelectedOptions(document.getElementById(targetTableEl))[0];
        let targetTableObject = this.state.availableTables.filter(table => { return table.fullyQualifiedName === targetTableName; })[0];

        let newJoins = Object.assign([], this.state.joins);

        // Copy state's joinAvailableColumns so that it can be updated.
        // Set the parent table or target table for the join.
        // Set the available parent columns or available target columns.
        let newJoinAvailableColumns = new Map(this.state.joinAvailableColumns);
        newJoins.forEach(join => {
            if (join.id === joinId) {
                // Update join's parent and target tables.
                join.parentTable = parentTableObject;
                join.targetTable = targetTableObject;

                // Get available parent columns for this join.
                let newAvailableParentColumns = this.state.availableColumns.filter(column => {
                    return column.databaseName === parentTableObject.databaseName && column.schemaName === parentTableObject.schemaName && column.tableName === parentTableObject.tableName;
                });

                // Get available target columns for this join.
                let newAvailableTargetColumns = this.state.availableColumns.filter(column => {
                    return column.databaseName === targetTableObject.databaseName && column.schemaName === targetTableObject.schemaName && column.tableName === targetTableObject.tableName;
                });

                // Update the join's available parent and target columns.
                newJoinAvailableColumns.set(joinId, {
                    availableParentColumns: newAvailableParentColumns,
                    availableTargetColumns: newAvailableTargetColumns
                });
            }
        });

        // Update state.
        this.setState({
            joins: newJoins,
            joinAvailableColumns: newJoinAvailableColumns
        });
    };

    toggleElementVisibilityHandler = (elementToShow) => {
        // Copy state.
        let newState = Object.assign({}, this.state);

        // Set all elements' visibility to true (hidden).
        for (let key in newState.elementsVisibility) {
            newState.elementsVisibility[key] = true;
        }

        // Set the elementToShow's hidden property to false (visible/not hidden).
        if (elementToShow === Constants.JOINS) { newState.elementsVisibility.joinsElementHidden = false; }
        else if (elementToShow === Constants.SCHEMAS_AND_TABLES) { newState.elementsVisibility.schemasAndTablesElementHidden = false; }
        else if (elementToShow === Constants.COLUMNS) { newState.elementsVisibility.columnsElementHidden = false; }
        else if (elementToShow === Constants.CRITERIA) { newState.elementsVisibility.criteriaElementHidden = false; }
        else if (elementToShow === Constants.OTHER_OPTIONS) { newState.elementsVisibility.otherOptionsElementHidden = false; }

        this.setState(newState);
    };

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        }

        return (
            <div>
                <MenuBar
                    toggleElementVisibilityHandler={this.toggleElementVisibilityHandler}
                >
                </MenuBar>

                <Joins
                    hidden={this.state.elementsVisibility.joinsElementHidden.toString()}
                    joins={this.state.joins}
                    availableTables={this.state.selectedTables}  // The tables the user selects are the tables available for the user to join.
                    // availableColumns={this.state.availableColumns}  // todo:  remove this eventually.
                    onAddJoinClickHandler={this.onAddJoinClickHandler}
                    onDeleteJoinHandler={this.onDeleteJoinHandler}
                    onJoinImageClickHandler={this.onJoinImageClickHandler}
                    onJoinTableChangeHandler={this.onJoinTableChangeHandler}
                    availableColumns={this.state.joinAvailableColumns}
                >
                </Joins>

                <OtherOptions
                    hidden={this.state.elementsVisibility.otherOptionsElementHidden.toString()}
                    distinct={this.state.distinct}
                    distinctHandler={this.updateDistinct}
                    suppressNulls={this.state.suppressNulls}
                    suppressNullsHandler={this.updateSuppressNulls}
                    limit={this.state.limit}
                    limitHandler={this.updateLimit}
                    offset={this.state.offset}
                    offsetHandler={this.updateOffset}
                >
                </OtherOptions>

                <SchemasAndTables
                    hidden={this.state.elementsVisibility.schemasAndTablesElementHidden.toString()}
                    availableSchemas={this.state.availableSchemas}
                    selectSchemasHandler={this.updateSelectedSchemas}
                    availableTables={this.state.availableTables}
                    selectTablesHandler={this.updateSelectedTables}
                    selectedTables={this.state.selectedTables}
                >
                </SchemasAndTables>

                <Columns
                    hidden={this.state.elementsVisibility.columnsElementHidden.toString()}
                    availableColumns={this.state.availableColumns}
                    selectColumnsHandler={this.updateSelectedColumns}
                    selectedColumns={this.state.selectedColumns}
                >
                </Columns>
            </div>
        );
    }

}

export default QueryState;
