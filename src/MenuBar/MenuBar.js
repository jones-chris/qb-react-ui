import React, { Component } from 'react';
import './MenuBar.css';
import QueryTemplates from '../QueryTemplates/QueryTemplates';
import SchemasAndTables from '../SchemasAndTables/SchemasAndTables';
import Joins from '../Joins/Joins';
import OtherOptions from '../OtherOptions/OtherOptions';
import MetadataService from '../Services/MetadataService';


class MenuBar extends Component {

    state = {
        queryTemplatesElementHidden: true,
        schemasAndTablesElementHidden: false,
        joinsElementHidden: true,
        otherOptionsElementHidden: true,
        availableSchemas: [],
        selectedSchemas: [],
        isFetchingData: true
    };

    constructor() {
        super();

        // // Get available schemas.
        // this.getAvailableSchemas()
        //     .then(schemas => {
        //         let newState = Object.assign({}, this.state);
        //         newState.availableSchemas = schemas;
        //         newState.isFetchingData = false;
        //         this.setState(newState);
        //     });

        fetch('http://localhost:8080/metadata/querybuilder4j/schema')
            .then(response => response.json())
            .then(schemas => {
                console.log(schemas);

                let newState = Object.assign({}, this.state);
                newState.availableSchemas = schemas;
                newState.isFetchingData = false;
                this.setState(newState);
            });

        // Bind methods to this class that are passed to child components.
        this.updateSelectedSchemas.bind(this);
    }

    // componentDidMount() {
    //     // Get available schemas.
    //     this.getAvailableSchemas()
    //         .then(schemas => {
    //             console.log(schemas);
    //
    //             let newState = Object.assign({}, this.state);
    //             newState.availableSchemas = schemas;
    //             newState.isFetchingData = false;
    //             this.setState(newState);
    //         });
    // }
    //
    // async getAvailableSchemas() {
    //     try {
    //         const response = await fetch('http://localhost:8080/metadata/querybuilder4j/schema');
    //         return response.json();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    toggleQueryTemplatesElementHandler = () => {
        let newState = Object.assign({}, this.state);
        for (let key in newState) {
            newState[key] = true;
        }
        newState.queryTemplatesElementHidden = false;
        this.setState(newState);
    };

    toggleSchemasAndTablesElementHandler = () => {
        let newState = Object.assign({}, this.state);
        for (let key in newState) {
            newState[key] = true;
        }
        newState.schemasAndTablesElementHidden = false;
        this.setState(newState);
    };

    toggleJoinsElementHandler = () => {
        let newState = Object.assign({}, this.state);
        for (let key in newState) {
            newState[key] = true;
        }
        newState.joinsElementHidden = false;
        this.setState(newState);
    };

    toggleOtherOptionsElementHandler = () => {
        let newState = Object.assign({}, this.state);
        for (let key in newState) {
            newState[key] = true;
        }
        newState.otherOptionsElementHidden = false;
        this.setState(newState);
    };

    updateSelectedSchemas = (event) => {
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
    };

    render() {
        if (this.state.isFetchingData) {
            return <p>Fetching data...</p>
        }

        return (
            <div id="statementButtonsDiv" className="statement-buttons-div">
                <button id="queryTemplatesButton"
                        className="btn-primary qb-navbar-button"
                        type="button"
                        onClick={this.toggleQueryTemplatesElementHandler}>
                    Query Templates
                </button>

                <button id="schemasButton"
                        className="btn-primary"
                        type="button"
                        onClick={this.toggleSchemasAndTablesElementHandler}>
                    Schemas &amp; Tables
                </button>

                <button id="joinsButton"
                        className="btn-primary"
                        type="button"
                        onClick={this.toggleJoinsElementHandler}>
                    Joins
                </button>

                <button id="columnsButton" className="btn-primary" type="button">
                    Columns
                </button>

                <button id="criteriaButton" className="btn-primary" type="button">
                    Criteria
                </button>

                <button id="otherOptionsButton"
                        className="btn-primary"
                        type="button"
                        onClick={this.toggleOtherOptionsElementHandler}>
                    Other Options
                </button>

                <button id="saveAsQueryTemplate" type="button" className="btn-primary">
                    Save As Query Template
                </button>

                <div>
                    <button id="runQuery" type="button" className="btn-primary">
                        Run Query
                    </button>
                </div>

                <QueryTemplates hidden={this.state.queryTemplatesElementHidden.toString()}/>
                <SchemasAndTables hidden={this.state.schemasAndTablesElementHidden.toString()}
                                  availableSchemas={this.state.availableSchemas}
                                  selectHandler={this.updateSelectedSchemas}
                />
                <Joins hidden={this.state.joinsElementHidden.toString()}/>
                <OtherOptions hidden={this.state.otherOptionsElementHidden.toString()}></OtherOptions>
            </div>
        );
    }
}

export default MenuBar;
