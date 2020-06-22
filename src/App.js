import React from 'react';
import './App.css';
import MenuBar from "./MenuBar/MenuBar";
import Joins from "./Joins/Joins";
import { connect } from 'react-redux'
import SchemasAndTables from "./SchemasAndTables/SchemasAndTables";
import Columns from "./Columns/Columns";
import OtherOptions from "./OtherOptions/OtherOptions";
import Criteria from "./Criteria/Criteria";
import ColumnValues from "./Modals/ColumnValues/ColumnValues";
import QueryTemplates from "./QueryTemplates/QueryTemplates";


class App extends React.Component {

    constructor(props) {
        super(props);

        // Get config state.
        this.props.onLoadIFrame();
    }

    componentDidMount() {
    }

    render() {
        if (this.props.config.uiMessage !== null) {
            return (
                <p>{this.props.config.uiMessage}</p>
            )
        }

        return (
            <div className="App">
                <MenuBar/>

                {/*Are the non-hidden attributes needed now that the state is available in the component?*/}
                <Joins
                    hidden={this.props.menuBar.elementVisibility.joinsElementHidden.toString()}
                />

                {/*Are the non-hidden attributes needed now that the state is available in the component?*/}
                <SchemasAndTables
                    hidden={this.props.menuBar.elementVisibility.schemasAndTablesElementHidden.toString()}
                />

                {/*Are the non-hidden attributes needed now that the state is available in the component?*/}
                <Columns
                    hidden={this.props.menuBar.elementVisibility.columnsElementHidden.toString()}
                />

                <OtherOptions
                    hidden={this.props.menuBar.elementVisibility.otherOptionsElementHidden.toString()}
                />

                <Criteria
                    hidden={this.props.menuBar.elementVisibility.criteriaElementHidden.toString()}
                />

                <QueryTemplates
                    hidden={this.props.menuBar.elementVisibility.queryTemplatesElementHidden.toString()}
                />

                {/*Modals*/}
                <ColumnValues
                    hidden={this.props.modal.hideColumnMembersModal.toString()}
                    modalState={this.props.modal.columnValueModal}
                />

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadIFrame: () => {
            // Get config values and add them to state.
            let urlParams = new URLSearchParams(window.location.search);

            let uiMessage = null;
            if (! urlParams.has('baseApiUrl')) {
                uiMessage = 'baseApiUrl query parameter is required'
            }

            dispatch({
                type: 'ADD_BASE_API_URL',
                payload: {
                    parentWindow: window.parent,
                    parentWindowUrl: document.location.ancestorOrigins[0],
                    baseApiUrl: urlParams.get('baseApiUrl'),
                    uiMessage: uiMessage
                }
            });
        }
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(App);
