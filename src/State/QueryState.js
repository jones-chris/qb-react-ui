import React, { Component } from 'react';
import MenuBar from "../MenuBar/MenuBar";
import SchemasAndTables from "../SchemasAndTables/SchemasAndTables";
import Joins from "../Joins/Joins";
import OtherOptions from "../OtherOptions/OtherOptions";
import * as Constants from '../Config/Constants';

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
            isFetchingData: true,
            availableSchemas: [],
            selectedSchemas: [],
            availableTables: []
        };

        // Bind handlers to `this` context.
        this.updateSelectedSchemas.bind(this);
        this.toggleJoinsElementHandler.bind(this);
    }

    componentDidMount() {
        // Get available schemas.
        fetch('http://localhost:8080/metadata/querybuilder4j/schema')
            .then(response => response.json())
            .then(schemas => {
                console.log(schemas);

                let newState = Object.assign({}, this.state);
                newState.availableSchemas = schemas;
                newState.isFetchingData = false;
                this.setState(newState);
            });
    }

    updateSelectedSchemas = (event) => {
        // First, update state's selectedSchemas.
        const selectElement = event.target;
        const options = selectElement.options;

        let newSelectedSchemas = [];
        for (let i=0; i<options.length; i++) {
            let option = options[i];
            if (option.selected) {
                newSelectedSchemas.push(option.value);
            }
        }

        let newState = Object.assign({}, this.state);
        newState.selectedSchemas = newSelectedSchemas;
        this.setState(newState);

        // Second, get available tables for the selected schemas.
        // todo:  this is hard coded to the 0th selected schema because multiple schemas are not supported in the API yet.
        this.getAvailableTables(newSelectedSchemas[0])
    };

    getAvailableTables(schemaName) {
        this.setState({isFetchingData: true});

        fetch(`http://localhost:8080/metadata/querybuilder4j/${schemaName}/table-and-view`)
            .then(response => response.json())
            .then(tables => {
                console.log(tables);

                let newState = Object.assign({}, this.state);
                newState.availableTables = tables;
                newState.isFetchingData = false;
                this.setState(newState);
            });
    }

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
                    selectHandler={this.updateSelectedSchemas}
                    availableTables={this.state.availableTables}
                >
                </SchemasAndTables>
            </div>
        );
    }

}

export default QueryState;
