import {store} from "../index";
import {UiMessage} from "../Models/UiMessage";

export const assertDatabaseIsSelected = () => {
    if (store.getState().query.selectedDatabase === null) {
        throw Error('Select 1 database');
    }
};

export const assertSchemasAreSelected = () => {
    if (store.getState().query.selectedSchemas.length === 0) {
        throw Error('Select 1 or more schema')
    }
};

export const assertTablesAreSelected = () => {
    if (store.getState().query.selectedTables.length === 0) {
        throw Error('Select 1 or more tables');
    }
};

export const assertJoinsExist = () => {
    let queryState = store.getState().query;
    let joinsState = store.getState().joins;
    let numOfTablesAndJoinsDiff = queryState.selectedTables.length - joinsState.joins.length;

    // There should always be 1 more table than joins.
    // At a minimum, there should be 1 less join than tables, because the user must define the join relationship between
    // the tables that have been selected AND could have self-joins in addition.
    if (queryState.selectedTables.length > 1 && (numOfTablesAndJoinsDiff > 1)) {
        throw Error(`You have ${queryState.selectedTables.length} tables selected, but ${joinsState.joins.length} joins.  
        There should be at least ${queryState.selectedTables.length - 1} join(s).`)
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
        // IN and NOT IN operator check.
        if (criterion.filter.trim().includes(',')) {
            if (criterion.operator !== 'in' && criterion.operator !== 'notIn') {
                throw Error('A criterion appears to have multiple values, but does not have an IN or NOT IN operator')
            }
        }

        // LIKE or NOT LIKE operator check.
        if (criterion.operator === 'like' || criterion.operator === 'notLike') {
            if (! criterion.filter.trim().includes('%')) {
                throw Error(`A criterion uses the ${criterion.operator.toUpperCase()} operator, but does not contain a 
                '%' in the filter`)
            }
        }
    })
};

export const assertAllValidations = () => {
    try{
        assertDatabaseIsSelected();
        assertSchemasAreSelected();
        assertTablesAreSelected();
    } catch (e) {
        return new UiMessage('schemasAndTables', e.message);
    }

    try {
        assertJoinsExist();
    } catch (e) {
        return new UiMessage('joins', e.message);
    }

    try {
        assertColumnsAreSelected();
    } catch (e) {
        return new UiMessage('columns', e.message);
    }

    try {
        assertCriteriaOperatorsAreCorrect();
    } catch (e) {
        return new UiMessage('criteria', e.message);
    }

    return null;
};
