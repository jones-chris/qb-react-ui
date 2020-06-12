const initialState = {
    hideColumnMembersModal: true,
    modals: [
        {

        }
    ]
};

const modalReducer = (state = initialState, action) => {
    // Copy state.
    let newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
        case 'SHOW_COLUMN_VALUES_MODAL':
            newState.hideColumnMembersModal = action.payload.hide;
            return newState;
        case 'ADD_COLUMN_VALUES_DATA':
            return state;
        case 'DELETE_COLUMN_VALUES_DATA':
            return state;
        default:
            return state;
    }

};

export default modalReducer;
