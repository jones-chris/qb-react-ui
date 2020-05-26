import React from 'react';
import './App.css';
import MenuBar from "./MenuBar/MenuBar";
import Joins from "./Joins/Joins";
import { connect } from 'react-redux'
import SchemasAndTables from "./SchemasAndTables/SchemasAndTables";
import Columns from "./Columns/Columns";
import OtherOptions from "./OtherOptions/OtherOptions";


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

            <Columns
                hidden={props.menuBar.elementVisibility.columnsElementHidden.toString()}
                availableColumns={props.query.availableColumns}
                selectedColumns={props.query.selectedColumns}
            />

            <OtherOptions
                hidden={props.menuBar.elementVisibility.otherOptionsElementHidden.toString()}
            />

        </div>
    );
};

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
};

export default connect(mapReduxStateToProps, null)(App);
