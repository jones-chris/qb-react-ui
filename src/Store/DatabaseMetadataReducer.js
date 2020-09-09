import {
    UPDATE_AVAILABLE_COLUMNS,
    UPDATE_AVAILABLE_DATABASES,
    UPDATE_AVAILABLE_SCHEMAS,
    UPDATE_AVAILABLE_TABLES
} from "../Config/Constants";

const initialState = {
    availableDatabases: [],
    availableSchemas: [],
    availableTables: [],
    availableColumns: []
};

const databaseMetadataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AVAILABLE_DATABASES:
            return {
                ...state,
                availableDatabases: action.payload.availableDatabases
            };
        case UPDATE_AVAILABLE_SCHEMAS:
            return {
                ...state,
                availableSchemas:  action.payload.availableSchemas
            };
        case UPDATE_AVAILABLE_TABLES:
            return {
                ...state,
                availableTables: action.payload.availableTables
            };
        case UPDATE_AVAILABLE_COLUMNS:
            return {
                ...state,
                availableColumns: action.payload.availableColumns
            };
        default:
            return state;
    }
};

export default databaseMetadataReducer;
