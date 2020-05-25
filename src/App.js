import React from 'react';
import './App.css';
import MenuBar from "./MenuBar/MenuBar";
import Joins from "./Joins/Joins";
import { connect } from 'react-redux'
import SchemasAndTables from "./SchemasAndTables/SchemasAndTables";


const App = (props) => {
    return (
        <div className="App">
            <MenuBar/>

            <Joins
                hidden={props.menuBar.elementVisibility.joinsElementHidden.toString()}
                joins={props.joins.joins}
            />

            <SchemasAndTables
                hidden={props.menuBar.elementVisibility.schemasAndTablesElementHidden.toString()}
                availableSchemas={props.query.availableSchemas}
                availableTables={props.query.availableTables}
                selectedTables={props.query.selectedTables}
            />

        </div>
    );
};

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
};

export default connect(mapReduxStateToProps, null)(App);
