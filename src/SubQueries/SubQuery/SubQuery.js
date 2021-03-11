import React, { Component } from 'react';
import { connect } from 'react-redux'
import { store } from "../../index";
import Form from "react-bootstrap/Form";
import "./SubQuery.css";
import Table from 'react-bootstrap/Table';
import {assertAllValidations} from "../../Validators/Validators";
import {getJdbcSqlType} from '../../Utils/Utils';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import chevronDown from '../../Images/chevron_down.svg';

class SubQuery extends Component {

	constructor(props) {
		super(props);
	}

    /**
    * A convenience method that attempts to walk the available sub query object tree to get the parameters object.
    * If a property cannot be found, then a TypeError will be thrown, which will be caught and an empty array will 
    * be returned because, essentially, parameters could not be found.  
    **/
	getAvailableSubQueryParameters = () => {
		try {
			let availableSubQueries = {...store.getState().query.availableSubQueries};
			let parameters = availableSubQueries[this.props.subQuery.queryTemplateName].versions[this.props.subQuery.version].metadata.parameters;
			return (parameters) ? parameters : []; // Check that the last property in the chain did not return undefined.
		} catch (typeError) {
			return [];
		}
	};

	render() {
		let queryTemplateNamesOptionsJsx = [];
		queryTemplateNamesOptionsJsx.push(<option default=""></option>)
		Object.keys(store.getState().query.availableSubQueries).forEach(availableSubQuery => {
			queryTemplateNamesOptionsJsx.push(
				<option key={availableSubQuery}
						value={availableSubQuery}
						selected={this.props.subQuery.queryTemplateName === availableSubQuery}
				>
					{availableSubQuery}
				</option>
			);
		});

		let versionsOptionsJsx = [];
		versionsOptionsJsx.push(<option default=""></option>);
		let queryTemplateName = this.props.subQuery.queryTemplateName;
		if (queryTemplateName !== '') {
			let versions = store.getState().query.availableSubQueries[queryTemplateName].versions;
			Object.keys(versions).forEach(version => {
				versionsOptionsJsx.push(
					<option key={version}
					        value={version}
					        selected={this.props.subQuery.version === version}
					>
						{version}
					</option>
				);
			}); 
		}

		let parametersAndArgumentsJsx = [];
		let availableSubQueryVersionParameters = this.getAvailableSubQueryParameters();
		if (availableSubQueryVersionParameters.length > 0) {
			availableSubQueryVersionParameters.forEach(parameter => {
				let parameterName = parameter.name;

				// Get argument, if one exists.
				let argument = this.props.subQuery.parametersAndArguments[parameterName];

				// Create JSX.
				parametersAndArgumentsJsx.push(
					<tr>
						<td>{parameterName}</td>
						<td>{(parameter.allowsMultipleValues) ? 'true' : 'false'}</td>
						<td>{getJdbcSqlType(parameter.column.dataType)}</td>
						<td>
							<Form.Control
								as="input"
								size="sm"
								value={(argument) ? argument : ''}
								onChange={(event) => this.props.onUpdateArgument(this.props.subQuery.id, parameterName, event)}
							>
							</Form.Control>
						</td>
					</tr>
				);
			});
		}

		return (
			<Card>
				<Card.Header>
					<Accordion.Toggle as={Button} variant="link" eventKey={this.props.subQuery.id.toString()}> 
						<img src={chevronDown}
						     className="hover-pointer"
						></img>
					</Accordion.Toggle>
				</Card.Header>
				<Accordion.Collapse eventKey={this.props.subQuery.id.toString()}>
					<Card.Body>
						<Form>
							<Form.Group>
				    			<Table striped bordered hover>
				    				<tbody>
				    					<tr>
											<td>Sub Query Name</td>
											<td>
												<Form.Control 
													disabled={false}
													readOnly={false}
													as="input"
													type="text"
												    placeholder="Your name for the sub query" 
												    size="sm" 
												    value={this.props.subQuery.subQueryName}
													onChange={(event) => this.props.onChangeSubQueryName(this.props.subQuery.id, 'subQueryName', event)}
											    >
											    </Form.Control>
											</td>
										</tr>

				    					<tr>
											<td>Query Template</td>
											<td>
												<Form.Control 
											    	as="select" 
													size="sm"
													onChange={(event) => this.props.onChangeQueryTemplateName(this.props.subQuery.id, 'queryTemplateName', event)}
											    >
													{queryTemplateNamesOptionsJsx}
												</Form.Control>
											</td>
										</tr>

										<tr>
											<td>Version</td>
											<td>
												<Form.Control 
													as="select" 
													size="sm"
													onChange={(event) => this.props.onChangeVersion(this.props.subQuery.id, 'version', event)}
											    >	
											    	{versionsOptionsJsx}
												</Form.Control>
											</td>
											
										</tr>
				    				</tbody>
				    			</Table>
				    		</Form.Group>

				    		{
								parametersAndArgumentsJsx.length > 0 &&
								<Form.Group controlId="subQuery.parameters">
				        			<Table striped bordered hover>
				        				<thead>
				        					<tr>
				        						<th>Parameter</th>
				        						<th>Allows Multiple Values</th>
				        						<th>Data Type</th>
				        						<th>Argument</th>
				        					</tr>
				        				</thead>
				        				<tbody>
				        					{parametersAndArgumentsJsx}
				        				</tbody>
				        			</Table>
				        		</Form.Group>
							}
				    	</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		);
	}

}

const mapReduxStateToProps = (reduxState) => {
    return {
        ...reduxState.query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	onChangeSubQueryName: (subQueryId, attributeName, event) => {
    		let newSubQueries = [...store.getState().query.subQueries];

            let newSubQueryName = event.target.value;
            newSubQueries.forEach(subQuery => {
                if (subQuery.id === subQueryId) {
                    subQuery.subQueryName = newSubQueryName;
                }
            });

    		dispatch({
    			type: 'UPDATE_SUBQUERIES',
    			payload: {
    				subQueries: newSubQueries
    			}
    		});

    		dispatch({
                type: 'UPDATE_UI_MESSAGES',
                payload: {
                    uiMessages: assertAllValidations()
                }
            });
    	},
    	onChangeQueryTemplateName: async (subQueryId, attributeName, event) => {
    		let newSubQueries = [...store.getState().query.subQueries];

    		let newQueryTemplateName = event.target.value;
    		if (newQueryTemplateName === '') {
    			console.error('newQueryTemplateName is an empty string');
    			return;
    		}
    		newSubQueries.forEach(subQuery => {
    			if (subQuery.id === subQueryId) {
    				subQuery.queryTemplateName = newQueryTemplateName;
    			}
    		})

    		// If the sub query has no versions, then get them from the API.
    		let availableSubQueries = {...store.getState().query.availableSubQueries};
    		let availableSubQuery = availableSubQueries[newQueryTemplateName];
    		if (Object.keys(availableSubQuery.versions).length === 0) {
    			let apiUrl = `${store.getState().config.baseApiUrl}/query-template/${newQueryTemplateName}/versions`;
	            await fetch(apiUrl)
	                .then(response => response.json())
	                .then(versions => {
	                    console.log(versions);

	                    versions.forEach(version => {
	                    	availableSubQuery.versions[version] = {
	                    		'metadata': {}
	                    	}
	                    });
	                });
    		}

    		dispatch({
    			type: 'UPDATE_AVAIALABLE_SUBQUERIES',
    			payload: {
    				availableSubQueries: availableSubQueries
    			}
    		});

			dispatch({
    			type: 'UPDATE_SUBQUERIES',
    			payload: {
    				subQueries: newSubQueries
    			}
			});

    		dispatch({
                type: 'UPDATE_UI_MESSAGES',
                payload: {
                    uiMessages: assertAllValidations()
                }
            });
    	},
    	onChangeVersion: async (subQueryId, attributeName, event) => {
    		// Update sub query version.
    		let newSubQueries = [...store.getState().query.subQueries];
    		let newVersion = parseInt(event.target.value);
    		if (isNaN(newVersion)) {
    			console.error('newVersion is not a number');
    			return;
    		}

    		let subQuery = newSubQueries.filter(subQuery => subQuery.id === subQueryId)[0];
    		subQuery.version = newVersion;

    		// Update available sub query meta data if it has not been cached on the client.
    		let availableSubQueries = {...store.getState().query.availableSubQueries};
    		let availableSubQuery = availableSubQueries[subQuery.queryTemplateName];
    		let availableSubQueryVersion = availableSubQuery.versions[newVersion];
    		if (Object.keys(availableSubQueryVersion.metadata).length === 0) {
    			let apiUrl = `${store.getState().config.baseApiUrl}/query-template/${subQuery.queryTemplateName}/metadata?version=${newVersion}`;
	            await fetch(apiUrl)
	                .then(response => response.json())
	                .then(metadata => {
	                    console.log(metadata);

	                    availableSubQueryVersion.metadata = metadata;
	                });
    		}

    		 dispatch({
    			type: 'UPDATE_AVAIALABLE_SUBQUERIES',
    			payload: {
    				availableSubQueries: availableSubQueries
    			}
    		});

			dispatch({
    			type: 'UPDATE_SUBQUERIES',
    			payload: {
    				subQueries: newSubQueries
    			}
			});

    		dispatch({
                type: 'UPDATE_UI_MESSAGES',
                payload: {
                    uiMessages: assertAllValidations()
                }
            });
    	},
    	onUpdateArgument: (subQueryId, parameterName, event) => {
    		let newSubQueries = [...store.getState().query.subQueries];

			let argument = event.target.value;
    		let subQuery = newSubQueries.filter(subQuery => subQuery.id === subQueryId)[0];
    		subQuery.parametersAndArguments[parameterName] = argument;

    		dispatch({
    			type: 'UPDATE_SUBQUERIES',
    			payload: {
    				subQueries: newSubQueries
    			}
			});

    		dispatch({
                type: 'UPDATE_UI_MESSAGES',
                payload: {
                    uiMessages: assertAllValidations()
                }
            });
    	}
	}
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(SubQuery);