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
        };

        // Bind handlers to `this` context.
        this.toggleJoinsElementHandler.bind(this);
    }

    updateAvailableSchemas(newAvailableSchemas) {

    }

    toggleJoinsElementHandler = (elementToShow) => {
        let newState = Object.assign({}, this.state);

        // Set all elements' visbibility to true (hidden).
        for (let key in newState.elementsVisibility) {
            newState.elementsVisibility[key] = true;
        }

        // Set the elementToShow's visibility to false (visible/not hidden).
        if (elementToShow === Constants.JOINS) { newState.elementsVisibility.joinsElementHidden = false; }

        this.setState(newState);
    };

    render() {
        return (
            <div>
                <MenuBar toggleJoinsElementHandler={this.toggleJoinsElementHandler}
                >
                </MenuBar>
                <Joins hidden={this.state.elementsVisibility.joinsElementHidden.toString()}></Joins>
                <OtherOptions hidden={this.state.elementsVisibility.otherOptionsElementHidden.toString()}></OtherOptions>
                {/*<SchemasAndTables></SchemasAndTables>*/}
            </div>
        );
    }

}

export default QueryState;
