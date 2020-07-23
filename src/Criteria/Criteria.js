import React from 'react';
import Criterion from "./Criterion/Criterion";
import './Criteria.css';
import { connect } from "react-redux";
import { addCriterion } from "../actions/CriteriaActions";

class Criteria extends React.Component {

    constructor(props) {
        super(props);
    }

    recursivelyBuildCriteriaJsx = (criteria, criteriaJsxHolder = []) => {
        criteria.forEach(criterion => {
            criteriaJsxHolder.push(
                <Criterion
                    key={criterion.id}
                    criterion={criterion}
                    availableColumns={this.props.availableColumns}
                >
                </Criterion>
            );

            this.recursivelyBuildCriteriaJsx(criterion.childCriteria, criteriaJsxHolder);
        });

        return criteriaJsxHolder;
    };

    render() {
        let criteriaJsx = [];
        // this.props.criteria.forEach(criterion => {
        //     criteriaJsx.push(
        //         <Criterion
        //             key={criterion.id}
        //             criterion={criterion}
        //             availableColumns={this.props.availableColumns}
        //         >
        //         </Criterion>
        //     )
        //
        //
        // });
        this.recursivelyBuildCriteriaJsx(this.props.criteria, criteriaJsx);

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
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Criteria);
