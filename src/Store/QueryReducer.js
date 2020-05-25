import cloneDeep from 'lodash/cloneDeep';

const initialState = {
    availableSchemas: [],
    selectedSchemas: [],
    availableTables: [],
    selectedTables: [],
    availableColumns: [],
    selectedColumns: [],
    criteria: [],
    distinct: false,
    suppressNulls: false,
    limit: 10,
    offset: 0,
    ascending: false
};

const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_AVAILABLE_SCHEMAS':
            return {
                ...state,
                availableSchemas:  action.payload.availableSchemas
            };
        case 'SELECT_SCHEMA':
            return {
                ...state,
                availableTables: action.payload.tables
            };
        case 'SELECT_TABLE':
            return {
                ...state,
                selectedTables: action.payload.selectedTables,
                availableColumns: action.payload.availableColumns
            };
        default:
            return state;
    }
};

export default queryReducer;
