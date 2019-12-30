import * as actionTypes from '../actions/actionTypes';

const initalState = {
    id: null,
    token: null,
    loading: false,
    error: null,
    name: null
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_STARTED:
            return {
                ...state,
                loading: true
            };

        case actionTypes.SIGNUP_SUCCEED:
            return {
                ...state,
                loading: false,
                id: action.id,
                token: action.token,
                error: null,
                name: action.name
            };

        case actionTypes.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state;
    }
};

export default reducer;