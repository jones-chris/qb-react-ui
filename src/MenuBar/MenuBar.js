import React, { Component } from 'react';
import './MenuBar.css';
import QueryTemplates from '../QueryTemplates/QueryTemplates';
import SchemasAndTables from '../SchemasAndTables/SchemasAndTables';
import Joins from '../Joins/Joins';
import OtherOptions from '../OtherOptions/OtherOptions';
import MetadataService from '../Services/MetadataService';
import * as Constants from '../Config/Constants';


class MenuBar extends Component {

    state = {
        queryTemplatesElementHidden: true,
        schemasAndTablesElementHidden: false,
        joinsElementHidden: true,
        columnsElementHidden: true,
        criteriaElementHidden: true,
        otherOptionsElementHidden: true,
        availableSchemas: [],
        selectedSchemas: [],
        // isFetchingData: true
    };

    constructor(props) {
        super(props);

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

        // Bind methods to this class that are passed to child components.
        this.updateSelectedSchemas.bind(this);
    }

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

    // toggleJoinsElementHandler = () => {
    //     let newState = Object.assign({}, this.state);
    //     for (let key in newState) {
    //         newState[key] = true;
    //     }
    //     newState.joinsElementHidden = false;
    //     this.setState(newState);
    // };

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
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">qb4j</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Databases
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.schemasAndTablesElementHidden ? "nav-item" : "nav-item active"}>
                            <a className="nav-link" href="#">Schemas &amp; Tables <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.joinsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleJoinsElementHandler(Constants.JOINS)}
                        >
                            <a className="nav-link" href="#">{Constants.JOINS} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.columnsElementHidden ? "nav-item" : "nav-item active"}>
                            <a className="nav-link" href="#">Columns <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.criteriaElementHidden ? "nav-item" : "nav-item active"}>
                            <a className="nav-link" href="#">Criteria <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.otherOptionsElementHidden ? "nav-item" : "nav-item active"}>
                            <a className="nav-link" href="#">Other Options <span className="sr-only">(current)</span></a>
                        </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

            // <div id="statementButtonsDiv" className="statement-buttons-div">
            //     <button id="queryTemplatesButton"
            //             className="btn-primary qb-navbar-button"
            //             type="button"
            //             onClick={this.toggleQueryTemplatesElementHandler}>
            //         Query Templates
            //     </button>
            //
            //     <button id="schemasButton"
            //             className="btn-primary"
            //             type="button"
            //             onClick={this.toggleSchemasAndTablesElementHandler}>
            //         Schemas &amp; Tables
            //     </button>
            //
            //     <button id="joinsButton"
            //             className="btn-primary"
            //             type="button"
            //             onClick={this.toggleJoinsElementHandler}>
            //         Joins
            //     </button>
            //
            //     <button id="columnsButton" className="btn-primary" type="button">
            //         Columns
            //     </button>
            //
            //     <button id="criteriaButton" className="btn-primary" type="button">
            //         Criteria
            //     </button>
            //
            //     <button id="otherOptionsButton"
            //             className="btn-primary"
            //             type="button"
            //             onClick={this.toggleOtherOptionsElementHandler}>
            //         Other Options
            //     </button>
            //
            //     <button id="saveAsQueryTemplate" type="button" className="btn-primary">
            //         Save As Query Template
            //     </button>
            //
            //     <div>
            //         <button id="runQuery" type="button" className="btn-primary">
            //             Run Query
            //         </button>
            //     </div>
            //
            //     <QueryTemplates hidden={this.state.queryTemplatesElementHidden.toString()}/>
            //     <SchemasAndTables hidden={this.state.schemasAndTablesElementHidden.toString()}
            //                       availableSchemas={this.state.availableSchemas}
            //                       selectHandler={this.updateSelectedSchemas}
            //     />
            //     <Joins hidden={this.state.joinsElementHidden.toString()}/>
            //     <OtherOptions hidden={this.state.otherOptionsElementHidden.toString()}></OtherOptions>
            // </div>
        );
    }
}

export default MenuBar;
