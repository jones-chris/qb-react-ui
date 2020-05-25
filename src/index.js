import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers, createStore} from "redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import menuBarReducer from "./Store/MenuBarReducer";
import joinReducer from './Store/JoinReducer';
import queryReducer from "./Store/QueryReducer";
import { Provider } from 'react-redux'

export const store = createStore(combineReducers(
    {
        menuBar: menuBarReducer,
        joins: joinReducer,
        query: queryReducer
    }
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
