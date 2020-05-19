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

        let paddingLeftNum = (criterion.metadata.level * 50) + 'px';

        return (
            <div id={`row.${criterion.id}`} className="criteria-row" style={{paddingLeft: paddingLeftNum}}>

                <select id={`criteria${criterion.id}.conjunction`} name={`criteria[${criterion.id}].conjunction`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.CONJUNCTION, event.target.value)}
                >
                    <option value="AND" selected={criterion.conjunction === 'AND'}>And</option>
                    <option value="OR" selected={criterion.conjunction === 'OR'}>Or</option>
                </select>

                <select id={`criteria${criterion.id}.column`} name={`criteria[${criterion.id}].column`} className="criteria-column-and-filter"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.COLUMN, event.target.value)}
                >
                    {availableColumnsJsx}
                </select>

                <select id={`criteria${criterion.id}.operator`} name={`criteria[${criterion.id}].operator`} className="criteria-conjuction-and-operator"
                        onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.OPERATOR, event.target.value)}
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
                       onChange={(event) => this.props.updateCriterionHandler(criterion.id, Constants.FILTER, event.target.value)}
                />

                <input type="button" id={`addCriteria-${criterion.id}`} value="+"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.addCriterionHandler(criterion.id)}
                />

                <input type="button" id={`removeCriteria-${criterion.id}`} value="X"
                       className="criteria-add-remove-buttons"
                       onClick={() => this.props.deleteCriterionHandler(criterion.id)}
                />

                <input type="button" id={`columnMembers-${criterion.id}`} value="Column Members"
                       className="criteria-add-remove-buttons"/>
            </div>
        );
    }

}

export default Criterion;
