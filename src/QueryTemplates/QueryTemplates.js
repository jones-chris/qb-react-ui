import React  from 'react';
import './QueryTemplates.css'
import {store} from "../index";
import {connect} from "react-redux";
import * as Utils from "../Utils/Utils";

class QueryTemplates extends React.Component {

    state = {
        queryTemplateNames: [],
        isSearching: false,
        matchedQueryTemplateNames: [], // Holds the query template names that match the search text.
        selectedQueryTemplate: null
    };

    constructor(props) {
        super(props);

        this.getMatchingSearchQueryTemplateNames = this.getMatchingSearchQueryTemplateNames.bind(this);
        this.getQueryTemplateByName = this.getQueryTemplateByName.bind(this);
    }

    componentDidMount() {
        // Get query template names.
        let apiUrl = `${store.getState().config.baseApiUrl}/query-template`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(templates => {
                console.log(templates);

                this.setState({
                    ...this.state,
                    queryTemplateNames: templates
                })
            });
    }

    getMatchingSearchQueryTemplateNames(searchText) {
        let matchingQueryTemplateNames = this.state.queryTemplateNames.filter(templateName => templateName.includes(searchText));

        this.setState({
            ...this.state,
            isSearching: true,
            matchedQueryTemplateNames: matchingQueryTemplateNames
        });
    }

    getQueryTemplateByName(target) {
        let selectedQueryTemplateName = Utils.getSelectedOptions(target);

        let apiUrl = `${store.getState().config.baseApiUrl}/query-template/${selectedQueryTemplateName}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(template => {
                console.log(template);

                this.setState({
                    ...this.state,
                    selectedQueryTemplate: template
                })
            });
    }

    /**
     * This method exists solely to get the state's `selectedQueryTemplate` and pass it to the prop's `onImportQueryTemplate`
     * because state is not available in `mapDispatchToProps`.
     */
    importQueryTemplate() {
        this.props.onImportQueryTemplate(this.state.selectedQueryTemplate);
    }

    render() {
        // Create query template names JSX.
        let queryTemplateNamesJsx = [];

        // If the user is searching, create JSX for only the template names from state's `matchedQueryTemplateNames`.
        // Else, create JSX for state's `queryTemplateNames`.
        if (this.state.isSearching) {
            this.state.matchedQueryTemplateNames.forEach((templateName, index) => {
                queryTemplateNamesJsx.push(
                    <option key={index} value={templateName}>{templateName}</option>
                )
            });
        } else {
            this.state.queryTemplateNames.forEach((templateName, index) => {
                queryTemplateNamesJsx.push(
                    <option key={index} value={templateName}>{templateName}</option>
                )
            });
        }

        return (
            <div id="queryTemplatesDiv" hidden={this.props.hidden === 'true'}>
                <div className="form-inline my-2 my-lg-0 query-template-search-div">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                           onChange={(event) => this.getMatchingSearchQueryTemplateNames(event.target.value)}
                    />
                </div>

                <div className="query-template-div">
                    <select id="queryTemplates" size="40" className="form-control mr-sm-2"
                            onChange={(event) => this.getQueryTemplateByName(event.target)}
                    >
                        {queryTemplateNamesJsx}
                    </select>
                </div>

                <div hidden={this.state.selectedQueryTemplate === null}>
                    <div id="queryTemplateButtonsDiv">
                        <button id="importQueryTemplate" className="btn btn-outline-primary my-2 my-sm-0"
                                onClick={this.importQueryTemplate}
                        >
                            Import Query Template
                        </button>

                        <button id="runQueryTemplate" className="btn btn-outline-primary my-2 my-sm-0">Run Query Template</button>
                    </div>

                    <p><b>Author</b></p>

                    <p><b>Description</b></p>

                    <p><b>Parameters</b></p>
                </div>

            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => {
    return reduxState.query;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onImportQueryTemplate: (queryTemplate) => {
            dispatch({
                type: 'IMPORT_QUERY_TEMPLATE',
                payload: {
                    queryTemplate: queryTemplate
                }
            })
        }
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(QueryTemplates);
