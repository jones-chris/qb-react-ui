import React from "react";
import './Criterion.css';
import * as Constants from '../../Config/Constants';
import { connect } from "react-redux";
import { addCriterion, updateCriterion, deleteCriterion } from "../../actions/CriteriaActions";
import { store } from "../../index";
import _ from 'lodash';

class Criterion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let criterion = this.props.criterion;

        // Create option HTML elements for each available column.
        let availableColumnsJsx = [];
        this.props.availableColumns.forEach(availableColumn => {
            let optionDisplayText;
            if (availableColumn.schemaName === "null") {
                optionDisplayText = `${availableColumn.tableName}.${availableColumn.columnName}`;
            } else {
                optionDisplayText = `${availableColumn.schemaName}.${availableColumn.tableName}.${availableColumn.columnName}`
            }

            availableColumnsJsx.push(
                <option key={availableColumn.fullyQualifiedName}
                        value={availableColumn.fullyQualifiedName}
                        selected={_.isEqual(availableColumn, criterion.column)}
                >
                    {optionDisplayText}
                </option>
            )
        });

        // Create the padding left value (50px for each level).
        let paddingLeftNum = (criterion.metadata.level * 50) + 'px';

        return (
            <div id={`row.${criterion.id}`} className="criteria-row" style={{paddingLeft: paddingLeftNum}}>

                <select className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion, Constants.CONJUNCTION, event.target.value)}
                >
                    <option value="And" selected={criterion.conjunction === 'And'}>And</option>
                    <option value="Or" selected={criterion.conjunction === 'Or'}>Or</option>
                </select>

                <select className="criteria-column-and-filter"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion, Constants.COLUMN, event.target.value)}
                >
                    {availableColumnsJsx}
                </select>

                <select className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.onUpdateCriterionHandler(criterion, Constants.OPERATOR, event.target.value)}
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

                <input className="criteria-column-and-filter"
                       value={criterion.filter}
                       onChange={(event) => this.props.onUpdateCriterionHandler(criterion, Constants.FILTER, event.target.value)}
                />

                <input type="button"
                       value="+"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.onAddCriterionHandler(criterion)}
                />

                <input type="button"
                       value="X"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.onDeleteCriterionHandler(criterion)}
                />

                <input type="button"
                       value="Column Values"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.onShowColumnValuesModal(criterion, 'filter')}
                />
            </div>
        );
    }

}

const mapReduxStateToProps = (reduxState) => {
    return {
        ...reduxState.query,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCriterionHandler: (parentCriterion) => {
            dispatch(addCriterion(parentCriterion));
        },
        onUpdateCriterionHandler: (criterion, criterionObjectAttributeName, value) => {
            dispatch(updateCriterion(criterion, criterionObjectAttributeName, value));
        },
        onDeleteCriterionHandler: (criterionId) => {
            dispatch(deleteCriterion(criterionId));
        },
        onShowColumnValuesModal: (targetObject, targetAttribute) => dispatch({
            type: 'SHOW_COLUMN_VALUES_MODAL',
            payload: {
                hide: false,
                target: {
                    object: targetObject,
                    attribute: targetAttribute
                }
            }
        })
    }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(Criterion);
