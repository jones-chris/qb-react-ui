import React from 'react';
import Criterion from "./Criterion/Criterion";
import './Criteria.css';

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
                    updateCriterionHandler={this.props.updateCriterionHandler}
                    deleteCriterionHandler={this.props.deleteCriterionHandler}
                >
                </Criterion>
            )
        });

        return (
            <div id="criteria" className="criteria-div" hidden={this.props.hidden === 'true'}>

                <button id="addRootCriteriaButton" name="addRootCriteriaButton" type="button" className="add-root-criteria-button"
                        onClick={() => this.props.addCriterionHandler(null)}>
                    Add Root Criterion
                </button>

                {criteriaJsx}
            </div>
        );
    }

}

export default Criteria;
