import {
    ADD_CRITERIA, ADD_SELECTED_COLUMN, CHANGE_SELECTED_DATABASE,
    IMPORT_QUERY_TEMPLATE, REMOVE_SELECTED_COLUMN, SELECT_SCHEMA, SELECT_TABLE,
    UPDATE_COLUMN_VALUES_MODAL_TARGET,
    UPDATE_CRITERIA, UPDATE_DISTINCT,
    UPDATE_LIMIT, UPDATE_OFFSET, UPDATE_SUPPRESS_NULLS
} from "../Config/Constants";

const initialState = {
    selectedDatabase: null,
    selectedSchemas: [],
    selectedTables: [],
    selectedColumns: [],
    criteria: [],
    joins: [],
    distinct: false,
    suppressNulls: false,
    limit: 10,
    offset: 0,
    ascending: false
};

const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SELECTED_DATABASE:
            return {
                ...initialState,
                availableDatabases: state.availableDatabases,
                selectedDatabase: action.payload.selectedDatabase
            };
        case SELECT_SCHEMA:
            return {
                ...state,
                selectedSchemas: action.payload.selectedSchemas
            };
        case SELECT_TABLE:
            return {
                ...state,
                selectedTables: action.payload.selectedTables
            };
        case ADD_SELECTED_COLUMN:
            return {
                ...state,
                selectedColumns: action.payload.selectedColumns
            };
        case REMOVE_SELECTED_COLUMN:
            return {
                ...state,
                selectedColumns: action.payload.selectedColumns
            };
        case UPDATE_DISTINCT:
            return {
                ...state,
                distinct: ! state.distinct
            };
        case UPDATE_SUPPRESS_NULLS:
            return {
                ...state,
                suppressNulls: ! state.suppressNulls
            };
        case UPDATE_LIMIT:
            return {
                ...state,
                limit: action.payload.newLimit
            };
        case UPDATE_OFFSET:
            return {
                ...state,
                offset: action.payload.newOffset
            };
        case ADD_CRITERIA:
            return {
                ...state,
                criteria: action.payload.newCriteria
            };
        case UPDATE_CRITERIA:
            return {
                ...state,
                criteria: action.payload.newCriteria
            };
        case UPDATE_COLUMN_VALUES_MODAL_TARGET:
            return {
                ...state,
                criteria: action.payload.newCriteria
            };
        case IMPORT_QUERY_TEMPLATE:
            let queryTemplate = action.payload.queryTemplate;

            return {
                ...state,
                selectedColumns: queryTemplate.columns //todo:  finish this once qb4j lib's data models are corrected to match web app and front end.
            };
        default:
            return state;
    }
};

export default queryReducer;
