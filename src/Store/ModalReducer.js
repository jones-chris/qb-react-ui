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
                order: 'asc',
                search: '',
                disablePriorPageButton: true,
                disableNextPageButton: false,
                disableLimitDropDown: false,
                disableOrderDropDown: false
            };

            newState.hideColumnMembersModal = action.payload.hide;
            newState.columnValueModal = initialColumnValuesModalState;

            return newState;
        case 'GET_AVAILABLE_COLUMN_VALUES':
            // Get available column members.  //todo:  put this in another action type after initial load.

            // Add available column members to modal state.

            // Update pagination in modal state.
            return state;
        case 'ADD_COLUMN_VALUES_DATA':
            return state;
        // case 'UPDATE_COLUMN_VALUES_TARGET_ATTRIBUTE':
        //     // Get target object ref and attribute.
        //     let targetObjectRef = state.columnValueModal.target.object;
        //     let targetObjectAttribute = state.columnValueModal.target.attribute;
        //
        //     // Update target object ref's attribute.
        //     targetObjectRef[targetObjectAttribute] = 'hello';
        //
        //     return newState;
        case 'CLOSE_COLUMN_VALUES_MODAL':
            return initialState;
        default:
            return state;
    }

};

export default modalReducer;
