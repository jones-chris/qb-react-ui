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

// State names.
export const AVAILABLE_SCHEMAS_STATE = 'availableSchemas';
export const SELECTED_SCHEMAS_STATE = 'selectedSchemas';
export const AVAILABLE_TABLES_STATE = 'availableTables';
export const SELECTED_TABLES_STATE = 'selectedTables';
export const AVAILABLE_COLUMNS_STATE = 'availableColumns';
export const SELECTED_COLUMNS_STATE = 'selectedColumns';
export const JOINS_STATE = 'joins';
export const DISTINCT_STATE = 'distinct';
export const SUPPRESS_NULLS_STATE = 'suppressNulls';
export const LIMIT_STATE = 'limit';
export const OFFSET_STATE = 'offset';

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

// Adding and removing columns.
export const ADD = 'add';
export const REMOVE = 'remove';

// Join parent and target constants.
export const PARENT = 'parent';
export const TARGET = 'target';

// Criterion model object attributes that can be updated.
export const PARENT_ID = 'parentId';
export const CONJUNCTION = 'conjunction';
export const COLUMN = 'column';
export const OPERATOR = 'operator';
export const FILTER = 'filter';
