const initialState = {
    parentWindow: null,
    parentWindowUrl: '',
    baseApiUrl: '',
    uiMessage: null
};

const configReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_BASE_API_URL':
            return {
                ...state,
                parentWindow: action.payload.parentWindow,
                parentWindowUrl: action.payload.parentWindowUrl,
                baseApiUrl: action.payload.baseApiUrl,
                uiMessage: action.payload.uiMessage
            };
        default:
            return state;
    }

};

export default configReducer;
