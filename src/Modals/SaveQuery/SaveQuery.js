import React, { Component } from 'react';
import './SaveQuery.css';
import { connect } from 'react-redux'
import { store } from "../../index";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import { flattenCriteria } from "../../actions/CriteriaActions";
import * as Utils from '../../Utils/Utils';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

class SaveQuery extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		// Get query parameters
		let criteria = store.getState().query.criteria;
		criteria = flattenCriteria(criteria, []);

		// let parameters = criteria.filter.flatMap(criterion => criterion.filter.parameters);
		let parametersJsx = [];
		let parametersTableJsx = <div></div>;
		criteria.forEach(criterion => {
			let parameters = Utils.getCriterionFilterParameters(criterion);
			let allowMulitpleValues = (criterion.operator === 'in' || criterion.operator === 'notIn') ? 'true' : 'false';
			let dataTypeInteger = criterion.column.dataType;
			let dataTypeString = Utils.getJdbcSqlType(criterion.column.dataType);

			parameters.forEach(parameter => {
				parametersJsx.push(
					<tr>
						<td>{parameter}</td>
						<td>{allowMulitpleValues}</td>
						<td>{dataTypeString}</td>
					</tr>
				);
			});

			if (parametersJsx.length > 0) {
				parametersTableJsx = 
						<Form.Group controlId="saveQuery.parameters">
		        			<Form.Label>Parameters</Form.Label>
		        			<Table striped bordered hover>
		        				<thead>
		        					<tr>
		        						<th>Parameter</th>
		        						<th>Allows Multiple Values</th>
		        						<th>Data Type</th>
		        					</tr>
		        				</thead>
		        				<tbody>
		        					{parametersJsx}
		        				</tbody>
		        			</Table>
		        		</Form.Group>;
		    }
		});

		return (
			<Modal show={this.props.show === 'true'} backdrop='static' size="lg" onHide={this.props.onCloseHandler}>
		        
		        <Modal.Header closeButton>
		          <Modal.Title>Save Query</Modal.Title>
		        </Modal.Header>
		        
		        <Modal.Body>
		        	<Form>
		        		<Form.Group controlId="saveQuery.name">
		        			<Form.Label>Name</Form.Label>
		        			<Form.Control as="input" placeholder="Enter the Query's Name"></Form.Control>
		        		</Form.Group>

		        		<Form.Label>Discoverable?  </Form.Label>
		        		<br/>
		        		<ToggleButtonGroup type="radio" name="discoverable" defaultValue="false" onChange={this.props.onToggleDiscoverable}>
		        			<ToggleButton value="false" variant="outline-primary"> No</ToggleButton>
		        			<ToggleButton value="true" variant="outline-primary"> Yes</ToggleButton>
		        		</ToggleButtonGroup>

		        		<Form.Group controlId="saveQuery.description">
		        			<Form.Label>Description</Form.Label>
		        			<Form.Control as="textarea" rows={5}></Form.Control>
		        		</Form.Group>
		        		
		        		{parametersTableJsx}
		        	</Form>
		        </Modal.Body>

		        <Modal.Footer>
		          <Button variant="outline-secondary" onClick={this.props.onCloseHandler}>
		            Close
		          </Button>
		          <Button variant="outline-primary">
		            Save
		          </Button>
		        </Modal.Footer>

	      </Modal>
		);
	}

}

const mapReduxStateToProps = (reduxState) => {
    return {
        ...reduxState.query,
        ...reduxState.modal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    	onCloseHandler: () => {
    		dispatch({
    			type: 'HIDE_SAVE_QUERY_MODAL',
    			payload: {
    				hide: true
    			}
    		});
    	},
    	onToggleDiscoverable: (value) => {
    		let isDiscoverable = value.toLowerCase() === 'true';

    		dispatch({
    			type: 'TOGGLE_DISCOVERABLE',
    			payload: {
    				discoverable: isDiscoverable
    			}
    		});
    	},
    	onSaveHandler: () => {
    		dispatch({
    			type: 'U'
    		})
    	}
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(SaveQuery);