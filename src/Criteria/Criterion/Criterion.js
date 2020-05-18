import React from "react";
import './Criterion.css';
import * as Constants from '../../Config/Constants';

class Criterion extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let criterion = this.props.criterion;

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

        return (
            <div id={`row.${criterion.id}`} className="criteria-row">
                {/*<input type="hidden" id="criteria${id}.id" name="criteria[${id}].id" value="${id}"/>*/}

                {/*<input type="hidden" id="criteria${id}.parentId" name="criteria[${id}].parentId"*/}
                {/*       value="${parentId}"/>*/}

                <select id={`criteria${criterion.id}.conjunction`} name={`criteria[${criterion.id}].conjunction`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.CONJUNCTION, event.target.value)}
                >
                    <option value="And">And</option>
                    <option value="Or">Or</option>
                </select>

                {/*<input type="hidden" id="criteria${id}.frontParenthesis"*/}
                {/*                name="criteria[${id}].frontParenthesis"/>*/}

                <select id={`criteria${criterion.id}.column`} name={`criteria[${criterion.id}].column`} className="criteria-column-and-filter"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.COLUMN, event.target.value)}
                >
                    {availableColumnsJsx}
                </select>

                <select id={`criteria${criterion.id}.operator`} name={`criteria[${criterion.id}].operator`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.OPERATOR, event.target.value)}
                >
                    <option value="equalTo">=</option>
                    <option value="notEqualTo">&lt;&gt;</option>
                    <option value="greaterThanOrEquals">&gt;=</option>
                    <option value="lessThanOrEquals">&lt;=</option>
                    <option value="greaterThan">&gt;</option>
                    <option value="lessThan">&lt;</option>
                    <option value="like">like</option>
                    <option value="notLike">not like</option>
                    <option value="in">in</option>
                    <option value="notIn">not in</option>
                    <option value="isNull">is null</option>
                    <option value="isNotNull">is not null</option>
                </select>

                <input id={`criteria${criterion.id}.filter`} name={`criteria[${criterion.id}].filter`} className="criteria-column-and-filter"
                       onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.FILTER, event.target.value)}
                />

                {/*<input type="hidden" id="criteria${id}.endParenthesis"*/}
                {/*       name="criteria[${id}].endParenthesis"/>*/}

                <input type="button" id={`addCriteria-${criterion.id}`} value="+"
                       className="criteria-add-remove-buttons"/>

                <input type="button" id={`removeCriteria-${criterion.id}`} value="X"
                       className="criteria-add-remove-buttons"/>

                <input type="button" id={`columnMembers-${criterion.id}`} value="Column Members"
                       className="criteria-add-remove-buttons"/>
            </div>
        );
    }

}

export default Criterion;
