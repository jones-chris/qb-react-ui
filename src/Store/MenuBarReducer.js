import * as Constants from '../Config/Constants';

const initialState = {
    elementVisibility: {
        queryTemplatesElementHidden: true,
        schemasAndTablesElementHidden: false,
        joinsElementHidden: true,
        columnsElementHidden: true,
        criteriaElementHidden: true,
        otherOptionsElementHidden: true
    }
};

const showAllElements = (state) => {
    for (let key in state.elementVisibility) {
        state.elementVisibility[key] = true;
    }
};

const menuBarReducer = (state = initialState, action) => {
    // Copy state and show all elements (set all keys' value to true).
    // let newState = Object.assign({}, state);
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case Constants.JOINS:
            showAllElements(newState);
            newState.elementVisibility.joinsElementHidden = false;
            return newState;
        case Constants.SCHEMAS_AND_TABLES:
            showAllElements(newState);
            newState.elementVisibility.schemasAndTablesElementHidden = false;
            return newState;
        case Constants.COLUMNS:
            showAllElements(newState);
            newState.elementVisibility.columnsElementHidden = false;
            return newState;
        case Constants.CRITERIA:
            showAllElements(newState);
            newState.elementVisibility.criteriaElementHidden = false;
            return newState;
        case Constants.OTHER_OPTIONS:
            showAllElements(newState);
            newState.elementVisibility.otherOptionsElementHidden = false;
            return newState;
        case Constants.QUERY_TEMPLATES:
            showAllElements(newState);
            newState.elementVisibility.queryTemplatesElementHidden = false;
            return newState;
        default:
            return state;
    }

};

export default menuBarReducer;
