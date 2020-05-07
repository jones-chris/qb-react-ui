import React from 'react';
import './App.css';
import MenuBar from './MenuBar/MenuBar';
import QueryState from "./State/QueryState";


const App = () => {
    this.state = {
        availableSchemas: [],
        selectedSchemas: []
    };

    return (
        <div className="App">
            <MenuBar></MenuBar>
        </div>
    );
};

export default App;
