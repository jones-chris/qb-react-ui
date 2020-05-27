import React from 'react';
import Criterion from "./Criterion/Criterion";
import './Criteria.css';
import { connect } from "react-redux";
import { addCriterion } from "../actions/CriteriaActions";

class Criteria extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let criteriaJsx = [];
        this.props.criteria.forEach(criterion => {
            criteriaJsx.push(
                <Criterion
                    key={criterion.id}
                    criterion={criterion}
                    availableColumns={this.props.availableColumns}
                    // updateCriterionHandler={this.props.updateCriterionHandler}
                    // deleteCriterionHandler={this.props.deleteCriterionHandler}
                    // addCriterionHandler={this.props.addCriterionHandler}
                >
                </Criterion>
            )
        });

        return (
            <div id="criteria" className="criteria-div" hidden={this.props.hidden === 'true'}>

                <button id="addRootCriteriaButton" type="button" className="add-root-criteria-button"
                        onClick={() => this.props.onAddCriterionHandler(null)}>
                    Add Root Criterion
                </button>

                {criteriaJsx}

            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => {
    return reduxState.query;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCriterionHandler: (parentId, ) => {
            dispatch(addCriterion(parentId));
        }
        // onAddCriterionHandler: (parentId) => {
        //     // Copy the state's criteria to a new array.
        //     let newCriteria = [...store.getState().query.criteria];
        //
        //     // If parentId is null, then the new criterion id will be 0 (the top-most root).
        //     let id = 0;
        //     if (parentId !== null) {
        //         id = parentId + 1;
        //     }
        //
        //     // Renumber all criterions' id and parentId that are greater than parentId.
        //     newCriteria.forEach(criterion => {
        //         if (criterion.id >= id) {
        //             criterion.id += 1;
        //
        //             if (criterion.parentId !== null && criterion.parentId >= id) {
        //                 criterion.parentId += 1;
        //             }
        //         }
        //     });
        //
        //     // Get the new criterion's level.  This will be the parent criterion's level plus 1.
        //     let level = 0;
        //     if (parentId !== null) {
        //         let parentCriterion = newCriteria.find(criterion => criterion.id === parentId);
        //         level = parentCriterion.metadata.level + 1;
        //     }
        //
        //     // Instantiate a new criterion model with the id and parent id.
        //     let criterion = {
        //         id: id,
        //         parentId: parentId,
        //         conjunction: 'AND',
        //         frontParenthesis: null,
        //         column: null,
        //         operator: null,
        //         filter: '',
        //         endParenthesis: null,
        //         metadata: {
        //             level: level
        //         }
        //     };
        //
        //     // Add the new criterion to the criteria array.
        //     // todo:  add new criterion to certain index in array.
        //     newCriteria.splice(id, 0, criterion);
        //
        //     dispatch({ type: 'ADD_CRITERIA', payload: { newCriteria: newCriteria } });
        // }
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Criteria);
