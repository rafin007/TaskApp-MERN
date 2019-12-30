import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_STARTED
    };
};

export const signupSucceed = (id, token, name) => {
    return {
        type: actionTypes.SIGNUP_SUCCEED,
        id,
        token,
        name
    };
};

export const signupFailed = (error) => {
    return {
        type: actionTypes.SIGNUP_FAILED,
        error
    };
};

export const signup = (data) => {
    return dispatch => {
        dispatch(signupStart());
        axios.post('/users', data).then(response => {
            dispatch(signupSucceed(response.data.user._id, response.data.token, response.data.user.name));
        }).catch(error => {
            dispatch(signupFailed(error));
        });
    };
};