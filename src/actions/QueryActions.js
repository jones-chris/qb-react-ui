import {store} from "../index";
import { replaceParentCriterionIds } from "../actions/CriteriaActions";
import { removeJoinMetadata } from "../actions/JoinActions";
import * as Utils from "../Utils/Utils"; 

export const runQuery = () => {
	let statement = buildSelectStatement();
    console.log(statement);
    console.log(JSON.stringify(statement));

    // Send query to API.
    let apiUrl = `${store.getState().config.baseApiUrl}/data/${store.getState().query.selectedDatabase.databaseName}/query`;
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(statement),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        const data = await response.json();

        if (! response.ok) {
            if (data.hasOwnProperty('message')) {
                throw Error(data.message)
            } else {
                throw Error('An error occurred when running the query')
            }
        }

        return data;
    }).then(json => {
        console.log(json);

        // Send json to window's parent so the parent can choose what to do with the data.
        let parentWindow = store.getState().config.parentWindow;
        let parentWindowUrl = store.getState().config.parentWindowUrl;
        parentWindow.postMessage(json, parentWindowUrl);
    }).catch(reason => {
        alert(reason)
    });
};

export const saveQuery = () => {
    let statement = buildSelectStatement();
    console.log(statement);
    console.log(JSON.stringify(statement));

    // Send query to API.
    let apiUrl = `${store.getState().config.baseApiUrl}/query-template`;
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(statement),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        if (response.ok) {
            alert('Query saved successfully!');
        } else {
            const data = await response.json();
            if (data.hasOwnProperty('message')) {
                throw Error(data.message)
            } else {
                throw Error('An error occurred when running the query')
            }
        }
    }).catch(reason => {
        alert(reason)
    });
};

const buildSelectStatement = () => {
    const currentQueryState = store.getState().query;
    const currentJoinState = store.getState().joins;

    // Determine parent table.
    let targetJoinTables = currentQueryState.joins.map(join => join.targetTable.fullyQualifiedName);
    let parentTable = currentQueryState.selectedTables.find(table => ! targetJoinTables.includes(table.fullyQualifiedName));

    // // Build the metadata's criteria parameters.
    // let metadata = currentQueryState.metadata;
    // metadata.parameters = buildSelectStatementCriteriaParameters();

    // Build statement object
    let statement = {
        metadata: currentQueryState.metadata,
        database: currentQueryState.selectedDatabase,
        columns: currentQueryState.selectedColumns,
        table: parentTable,
        criteria: replaceParentCriterionIds(currentQueryState.criteria),
        joins: removeJoinMetadata(currentJoinState.joins),
        distinct: currentQueryState.distinct,
        groupBy: false,
        orderBy: false,
        limit: currentQueryState.limit,
        ascending: currentQueryState.ascending,
        offset: currentQueryState.offset,
        suppressNulls: currentQueryState.suppressNulls
    };

    return statement;
};

// const buildSelectStatementCriteriaParameters = () => {
//     let criteriaParameters = [];

//     const currentQueryState = store.getState().query;
//     currentQueryState.criteria.forEach(criterion => {
//         let parameterPlaceholders = Utils.getCriterionFilterParameters(criterion);

//         parameterPlaceholders.forEach(parameterPlaceholder => {
//             let allowMulitpleValues = (criterion.operator === 'in' || criterion.operator === 'notIn') ? 'true' : 'false';
//             let dataTypeInteger = criterion.column.dataType;
//             let dataTypeString = Utils.getJdbcSqlType(criterion.column.dataType);

//             criteriaParameters.push({
//                 name: parameterPlaceholder.substring(1), // Cut off the "@".
//                 allowMulitpleValues: allowMulitpleValues,
//                 jdbcDataType: dataTypeInteger,
//                 dataTypeName: dataTypeString
//             })
//         });
//     })

//     return criteriaParameters;
// };

