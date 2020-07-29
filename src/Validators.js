import {store} from "../index";

export const assertTablesAreSelected = () => {
    if (store.getState().query.selectedTables.length === 0) {
        throw Error('You must select at least 1 table');
    }
};

export const assertJoinsExist = () => {
    let queryState = store.getState().query;
    let joinsState = store.getState().joins;
    let numOfTablesAndJoinsDiff = queryState.selectedTables.length - joinsState.joins.length;
    // There should always be 1 more table than joins.
    if (queryState.selectedTables.length > 1 && (numOfTablesAndJoinsDiff !== 1)) {
        throw Error(`You have ${queryState.selectedTables.length} tables selected, but only ${joinsState.joins.length} joins.  
        There should be 1 less than join than tables.`)
    }
};

export const assertColumnsAreSelected = () => {
    if (store.getState().query.selectedColumns.length === 0) {
        throw Error('You must select at least 1 column');
    }
};

export const assertCriteriaOperatorsAreCorrect = () => {
    let criteria = store.getState().query.criteria;
    criteria.forEach(criterion => {
        if (criterion.filter.trim().includes(',')) {
            if (criterion.operator !== 'in' && criterion.operator !== 'notIn') {
                throw Error('A criterion appears to have multiple values, but does not have an IN or NOT IN operator')
            }
        }
    })
};

export const assertAllValidations = () => {
    assertTablesAreSelected();
    assertJoinsExist();
    assertColumnsAreSelected();
    assertCriteriaOperatorsAreCorrect();
};
