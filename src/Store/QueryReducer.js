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
        case 'ADD_SELECTED_COLUMN':
            return {
                ...state,
                selectedColumns: action.payload.selectedColumns
            };
        case 'REMOVE_SELECTED_COLUMN':
            return {
                ...state,
                selectedColumns: action.payload.selectedColumns
            };
        case 'UPDATE_DISTINCT':
            return {
                ...state,
                distinct: ! state.distinct
            };
        case 'UPDATE_SUPPRESS_NULLS':
            return {
                ...state,
                suppressNulls: ! state.suppressNulls
            };
        case 'UPDATE_LIMIT':
            return {
                ...state,
                limit: action.payload.newLimit
            };
        case 'UPDATE_OFFSET':
            return {
                ...state,
                offset: action.payload.newOffset
            };
        default:
            return state;
    }
};

export default queryReducer;
