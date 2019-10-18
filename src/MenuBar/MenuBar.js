import React, { Component } from 'react';
import './MenuBar.css'
import QueryTemplates from '../QueryTemplates/QueryTemplates'
import SchemasAndTables from '../SchemasAndTables/SchemasAndTables'
import Joins from '../Joins/Joins'

class MenuBar extends Component {

    state = {
        queryTemplatesElementHidden: true,
        schemasAndTablesElementHidden: false,
        joinsElementHidden: true
    };

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

    render() {
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

                <button id="otherOptionsButton" className="btn-primary" type="button">
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
                <SchemasAndTables hidden={this.state.schemasAndTablesElementHidden.toString()}/>
                <Joins hidden={this.state.joinsElementHidden.toString()}/>
            </div>
        );
    }
}

export default MenuBar;