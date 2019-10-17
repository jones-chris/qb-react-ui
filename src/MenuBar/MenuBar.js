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

    constructor() {
        super();
        // this.toggleQueryTemplatesElementHandler = this.toggleQueryTemplatesElementHandler.bind(this);
        this.queryTemplatesElement = React.createRef();
    }

    toggleQueryTemplatesElementHandler = () => {
        let newState = Object.assign({}, this.state);
        for (let key in newState) {
            newState[key] = true;
        }
        newState.queryTemplatesElementHidden = false;
        this.setState(newState);
    };

    render() {
        return (
            <div id="statementButtonsDiv" className="statement-buttons-div">
                <button id="queryTemplatesButton" className="btn-primary qb-navbar-button" type="button"
                        onClick={this.toggleQueryTemplatesElementHandler}>
                    Query Templates
                </button>

                <button id="schemasButton" className="btn-primary" type="button">
                    Schemas &amp; Tables
                </button>

                <button id="joinsButton" className="btn-primary" type="button">
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

                <QueryTemplates hidden={this.state.queryTemplatesElementHidden.toString()}></QueryTemplates>
                <SchemasAndTables hidden={this.state.schemasAndTablesElementHidden.toString()}></SchemasAndTables>
                <Joins hidden={this.state.joinsElementHidden.toString()}></Joins>

            </div>
        );
    }
}

export default MenuBar;