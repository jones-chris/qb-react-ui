import React from "react";
import './Criterion.css';
import * as Constants from '../../Config/Constants';
import { connect } from "react-redux";
import { addCriterion } from "../../actions/CriteriaActions";
import { store } from "../../index";

class Criterion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let criterion = this.props.criterion;

        // Create option HTML elements for each available column.
        let availableColumnsJsx = [];
        this.props.availableColumns.forEach(availableColumn => {
            availableColumnsJsx.push(
                <option key={availableColumn.fullyQualifiedName}
                        value={availableColumn.tableName + '.' + availableColumn.columnName}
                        selected={availableColumn.tableName + '.' + availableColumn.columnName === criterion.column}
                >
                    {availableColumn.tableName + '.' + availableColumn.columnName}
                </option>
            )
        });

        // Create the padding left value (50px for each level).
        let paddingLeftNum = (criterion.metadata.level * 50) + 'px';

        return (
            <div id={`row.${criterion.id}`} className="criteria-row" style={{paddingLeft: paddingLeftNum}}>

                <select id={`criteria${criterion.id}.conjunction`} name={`criteria[${criterion.id}].conjunction`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion.id, Constants.CONJUNCTION, event.target.value)}
                >
                    <option value="And" selected={criterion.conjunction === 'And'}>And</option>
                    <option value="Or" selected={criterion.conjunction === 'Or'}>Or</option>
                </select>

                <select id={`criteria${criterion.id}.column`} name={`criteria[${criterion.id}].column`} className="criteria-column-and-filter"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion.id, Constants.COLUMN, event.target.value)}
                >
                    {availableColumnsJsx}
                </select>

                <select id={`criteria${criterion.id}.operator`} name={`criteria[${criterion.id}].operator`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion.id, Constants.OPERATOR, event.target.value)}
                >
                    <option value="equalTo" selected={criterion.operator === 'equalTo'}>=</option>
                    <option value="notEqualTo" selected={criterion.operator === 'notEqualTo'}>&lt;&gt;</option>
                    <option value="greaterThanOrEquals" selected={criterion.operator === 'greaterThanOrEquals'}>&gt;=</option>
                    <option value="lessThanOrEquals" selected={criterion.operator === 'lessThanOrEquals'}>&lt;=</option>
                    <option value="greaterThan" selected={criterion.operator === 'greaterThan'}>&gt;</option>
                    <option value="lessThan" selected={criterion.operator === 'lessThan'}>&lt;</option>
                    <option value="like" selected={criterion.operator === 'like'}>like</option>
                    <option value="notLike" selected={criterion.operator === 'notLike'}>not like</option>
                    <option value="in" selected={criterion.operator === 'in'}>in</option>
                    <option value="notIn" selected={criterion.operator === 'notIn'}>not in</option>
                    <option value="isNull" selected={criterion.operator === 'isNull'}>is null</option>
                    <option value="isNotNull" selected={criterion.operator === 'isNotNull'}>is not null</option>
                </select>

                <input id={`criteria${criterion.id}.filter`} name={`criteria[${criterion.id}].filter`} className="criteria-column-and-filter"
                       value={criterion.filter}
                       onChange={(event) => this.props.onUpdateCriterionHandler(criterion.id, Constants.FILTER, event.target.value)}
                />

                <input type="button" id={`addCriteria-${criterion.id}`} value="+"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.onAddCriterionHandler(criterion.id)}
                />

                <input type="button" id={`removeCriteria-${criterion.id}`} value="X"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.onDeleteCriterionHandler(criterion.id)}
                />

                <input type="button" id={`columnMembers-${criterion.id}`} value="Column Values" className="criteria-add-remove-buttons"
                       onClick={this.props.onShowColumnValuesModal}
                />
            </div>
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
        onAddCriterionHandler: (parentId) => {
            dispatch(addCriterion(parentId));
        },
        onUpdateCriterionHandler: (criterionId, criterionObjectAttributeName, value) => {
            let newCriteria = [...store.getState().query.criteria];

            newCriteria.forEach(criterion => {
                if (criterion.id === criterionId) {
                    criterion[criterionObjectAttributeName] = value;
                }
            });

            dispatch({ type: 'UPDATE_CRITERIA', payload: { newCriteria: newCriteria } })
        },
        onDeleteCriterionHandler: (criterionId) => {
            // Copy store state.
            let newCriteria = [...store.getState().query.criteria];

            // Remove the criterion with the matching id.
            newCriteria = newCriteria.filter(criterion => criterion.id !== criterionId);
            newCriteria.forEach((criterion, newIndex) => {  // Renumber the criterions' id and parentId.
                // Only change the criterion if it's after the deleted criterion.
                if (criterion.id > criterionId) {
                    criterion.id = newIndex;

                    // If criterion is new first root criteria, then set parent id and level.
                    if (criterion.id === 0) {
                        criterion.parentId = null;
                        criterion.metadata.level = 0;
                    }

                    // If the criterion's parent id is equal or greater than the criterion that was deleted, then reduce parentId
                    // by 1.
                    if (criterion.parentId !== null && criterion.parentId >= criterionId) {
                        if (criterion.parentId === 0) {
                            criterion.parentId = null;
                            criterion.metadata.level = 0;
                        } else {
                            criterion.parentId = parseInt(criterion.parentId) - 1;

                            // Get the new criterion's level.  This will be the parent criterion's level plus 1.
                            let parentCriterion = newCriteria.find(crit => crit.id === criterion.parentId);
                            criterion.metadata.level = parentCriterion.metadata.level + 1;
                        }
                    }
                }
            });

            dispatch({ type: 'UPDATE_CRITERIA', payload: { newCriteria: newCriteria } });
        },
        onShowColumnValuesModal: () => dispatch({ type: 'SHOW_COLUMN_VALUES_MODAL', payload: { hide: false } })
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Criterion);
