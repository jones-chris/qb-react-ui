import leftJoinExcluding from "../Images/left_join_excluding.png";
import leftJoin from "../Images/left_join.png";
import innerJoin from "../Images/inner_join.png";
import rightJoin from "../Images/right_join.png";
import rightJoinExcluding from "../Images/right_join_excluding.png";
import fullOuterJoin from "../Images/full_outer_join.png";
import fullOuterJoinExcluding from "../Images/full_outer_join_excluding.png";


// HTML section names.
export const JOINS = 'Joins';
export const SCHEMAS_AND_TABLES = 'Schemas & Tables';
export const COLUMNS = 'Columns';
export const CRITERIA = 'Criteria';
export const OTHER_OPTIONS = 'Other Options';
export const QUERY_TEMPLATES = 'Query Templates';

// Join images.
export const JOIN_IMAGES = [
    {'name': 'LEFT_EXCLUDING',         'image': leftJoinExcluding},
    {'name': 'LEFT',                   'image': leftJoin},
    {'name': 'INNER',                  'image': innerJoin},
    {'name': 'RIGHT',                  'image': rightJoin},
    {'name': 'RIGHT_EXCLUDING',        'image': rightJoinExcluding},
    {'name': 'FULL_OUTER',             'image': fullOuterJoin},
    {'name': 'FULL_OUTER_EXCLUDING',   'image': fullOuterJoinExcluding}
];

// Criterion model object attributes that can be updated.
export const CONJUNCTION = 'conjunction';
export const COLUMN = 'column';
export const OPERATOR = 'operator';
export const FILTER = 'filter';

// Reducer actions
export const ADD_BASE_API_URL = 'ADD_BASE_API_URL';
export const ADD_JOIN = 'ADD_JOIN';
export const DELETE_JOIN = 'DELETE_JOIN';
export const CHANGE_JOIN_TYPE = 'CHANGE_JOIN_TYPE';
export const CHANGE_TABLE = 'CHANGE_TABLE';
export const CHANGE_COLUMN = 'CHANGE_COLUMN';
export const ADD_JOIN_COLUMN = 'ADD_JOIN_COLUMN';
export const DELETE_JOIN_COLUMN = 'DELETE_JOIN_COLUMN';
export const UPDATE_UI_MESSAGES = 'UPDATE_UI_MESSAGES';
export const CHANGE_SELECTED_DATABASE = 'CHANGE_SELECTED_DATABASE';
export const SELECT_SCHEMA = 'SELECT_SCHEMA';
export const SELECT_TABLE = 'SELECT_TABLE';
export const ADD_SELECTED_COLUMN = 'ADD_SELECTED_COLUMN';
export const REMOVE_SELECTED_COLUMN = 'REMOVE_SELECTED_COLUMN';
export const UPDATE_DISTINCT = 'UPDATE_DISTINCT';
export const UPDATE_SUPPRESS_NULLS = 'UPDATE_SUPPRESS_NULLS';
export const UPDATE_LIMIT = 'UPDATE_LIMIT';
export const UPDATE_OFFSET = 'UPDATE_OFFSET';
export const ADD_CRITERIA = 'ADD_CRITERIA';
export const UPDATE_CRITERIA = 'UPDATE_CRITERIA';
export const UPDATE_AVAILABLE_DATABASES = 'UPDATE_AVAILABLE_DATABASES';
export const UPDATE_AVAILABLE_SCHEMAS = 'UPDATE_AVAILABLE_SCHEMAS';
export const UPDATE_AVAILABLE_TABLES = 'UPDATE_AVAILABLE_TABLES';
export const UPDATE_AVAILABLE_COLUMNS = 'UPDATE_AVAILABLE_COLUMNS';
export const IMPORT_QUERY_TEMPLATE = 'IMPORT_QUERY_TEMPLATE';
export const SHOW_COLUMN_VALUES_MODAL = 'SHOW_COLUMN_VALUES_MODAL';
export const UPDATE_COLUMN_VALUES_MODAL_TARGET = 'UPDATE_COLUMN_VALUES_MODAL_TARGET';
export const UPDATE_COLUMN_VALUES_LIMIT = 'UPDATE_COLUMN_VALUES_LIMIT';
export const UPDATE_COLUMN_VALUES_ASCENDING = 'UPDATE_COLUMN_VALUES_ASCENDING';
export const UPDATE_COLUMN_VALUES_SEARCH = 'UPDATE_COLUMN_VALUES_SEARCH';
export const UPDATE_AVAILABLE_COLUMN_MEMBERS = 'UPDATE_AVAILABLE_COLUMN_MEMBERS';
export const ADD_SELECTED_COLUMN_VALUES = 'ADD_SELECTED_COLUMN_VALUES';
export const REMOVE_SELECTED_COLUMN_VALUES = 'REMOVE_SELECTED_COLUMN_VALUES';
export const CLOSE_COLUMN_VALUES_MODAL = 'CLOSE_COLUMN_VALUES_MODAL';
