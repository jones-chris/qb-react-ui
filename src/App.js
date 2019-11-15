import React from 'react';
import './App.css';
import MenuBar from './MenuBar/MenuBar';
import { Provider } from 'unstated';


const App = () => {
    return (
        <Provider>
            {/*<QueryState/>*/}
            <div className="App">
                <MenuBar></MenuBar>
            </div>
        </Provider>
    );
};

export default App;
