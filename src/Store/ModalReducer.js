const initialState = {
    hideColumnMembersModal: true,
    columnValueModal: null
};

const modalReducer = (state = initialState, action) => {
    // Copy state.
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'SHOW_COLUMN_VALUES_MODAL':
            // Create Column Values initial state.
            let initialColumnValuesModalState = {
                target: {
                    // The target object, which is passed by reference - so if the object is updated here, it will be updated in the `query` state.
                    object: action.payload.target.object,
                    // the target object attribute to update.
                    attribute: action.payload.target.attribute
                },
                id: 0,  // There will only be 1 Column Values modal and state at a time.
                offset: 0,
                limit: 2,
                ascending: true,
                search: null,
                availableColumnValues: [],
                selectedColumnValues: [],
                disablePriorPageButton: true,
                disableNextPageButton: false,
                disableLimitDropDown: false,
                disableOrderDropDown: false,
                uiMessage: '',
                firstPaginationOccurred: false
            };

            newState.hideColumnMembersModal = action.payload.hide;
            newState.columnValueModal = initialColumnValuesModalState;

            return newState;
        case 'UPDATE_COLUMN_VALUES_LIMIT':
            newState.columnValueModal.limit = action.payload.newLimit;
            return newState;
        case 'UPDATE_COLUMN_VALUES_ASCENDING':
            newState.columnValueModal.ascending = action.payload.newAscending;
            return newState;
        case 'UPDATE_COLUMN_VALUES_SEARCH':
            newState.columnValueModal.search = action.payload.newSearch;
            return newState;
        case 'UPDATE_AVAILABLE_COLUMN_MEMBERS':
            // If this is the first pagination, set `firstPaginationOccurred` to true, so that Limit, Offset, and Search
            // can be disabled in the Column Values modal UI.
            if (! newState.columnValueModal.firstPaginationOccurred) {
                newState.columnValueModal.firstPaginationOccurred = ! newState.columnValueModal.firstPaginationOccurred;
            }

            // Add available column members to modal state.
            newState.columnValueModal.availableColumnValues = action.payload.newColumnValues;

            // Update offset.
            newState.columnValueModal.offset += action.payload.offsetDelta;

            // Update the UI message.
            newState.columnValueModal.uiMessage = action.payload.uiMessage;

            // Enable/disable Prior Page and Next Page buttons.
            newState.columnValueModal.disablePriorPageButton = action.payload.disablePriorPageButton;
            newState.columnValueModal.disableNextPageButton = action.payload.disableNextPageButton;

            return newState;
        case 'ADD_SELECTED_COLUMN_VALUES':
            newState.columnValueModal.selectedColumnValues.push(action.payload.columnValuesToAdd);
            return newState;
        case 'CLOSE_COLUMN_VALUES_MODAL':
            return initialState;
        default:
            return state;
    }

};

export default modalReducer;
