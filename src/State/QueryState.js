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
            selectedColumns: []
        };

        // Bind handlers to `this` context.
        this.updateSelectedSchemas.bind(this);
        this.updateSelectedTables.bind(this);
        this.toggleJoinsElementHandler.bind(this);
        this.updateSelectedColumns.bind(this);
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
        this.setState({ selectedSchemas: newSelectedSchemas });

        // Second, get available tables for the selected schemas.
        // todo:  this is hard coded to the 0th selected schema because multiple schemas are not supported in the API yet.
        this.getAvailableTables(newSelectedSchemas[0])
    };

    updateSelectedTables = (event) => {
        // First, update state's selectedTables.
        const selectElement = event.target;
        let newSelectedTables = Utils.getSelectedOptions(selectElement);
        this.setState({selectedTables: newSelectedTables});

        // Second, get available columns for selected tables.
        // todo:  this is hard coded to the 0th selected schema because multiple schemas are not supported in the API yet.
        this.getAvailableColumns(this.state.selectedSchemas[0], newSelectedTables);
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

    updateSelectedColumns = (event) => {
        // const selectElement = event.target;
        // let newSelectedColumns = Utils.getSelectedOptions(selectElement);
        let newSelectedColumnsFullyQualifiedNames = Utils.getSelectedOptions(document.getElementById('availableColumns'));

        // Get the column JSON object based on newSelectedColumns, which is an array of the column fullyQualifiedNames.
        let newSelectedColumns = this.state.availableColumns.filter(column => {
            return newSelectedColumnsFullyQualifiedNames.includes(column.fullyQualifiedName);
        });

        this.setState({selectedColumns: newSelectedColumns});
    };

    toggleJoinsElementHandler = (elementToShow) => {
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
                    toggleElementVisibilityHandler={this.toggleJoinsElementHandler}
                >
                </MenuBar>

                <Joins
                    hidden={this.state.elementsVisibility.joinsElementHidden.toString()}
                >
                </Joins>

                <OtherOptions
                    hidden={this.state.elementsVisibility.otherOptionsElementHidden.toString()}
                >
                </OtherOptions>

                <SchemasAndTables
                    hidden={this.state.elementsVisibility.schemasAndTablesElementHidden.toString()}
                    availableSchemas={this.state.availableSchemas}
                    selectSchemasHandler={this.updateSelectedSchemas}
                    availableTables={this.state.availableTables}
                    selectTablesHandler={this.updateSelectedTables}
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
