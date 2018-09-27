import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';
import { fetchProtectedData } from './Protected-Data';


export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});


export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = errorMessage => ({
    type: AUTH_ERROR,
    errorMessage
});



export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => {
              localStorage.setItem('authToken', authToken);
              dispatch(fetchProtectedData());  // <-------- Logs in, gets auth token, then immediately fetches the user data
            })
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};

export const FIND_EVENTS_REQUEST= 'FIND_EVENTS_REQUEST';
export const findEventsRequest = ()=>({
    type: FIND_EVENTS_REQUEST
});
export const FIND_EVENTS_SUCCESS= 'FIND_EVENTS_SUCCESS';
export const findEventsSuccess = events =>({
    type: FIND_EVENTS_SUCCESS,
    events
});
export const FIND_EVENTS_FAILURE= 'FIND_EVENTS_FAILURE';
export const findEventsFailure = error =>({
    type: FIND_EVENTS_FAILURE,
    error
});

export const fetchEvents = () => (dispatch) =>{
    const authToken = localStorage.getItem('authToken')
    dispatch(findEventsRequest());
    return fetch(`${API_BASE_URL}/api/events`, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res =>{
        if(!res.ok){
            return Promise.reject({
                message:'Response Not Okay',
                status: res.status,
                statusText: res.statusText
            });
        }
        return res.json();
    })
    .then(result => {
        return dispatch(findEventsSuccess(result));
    })
    .catch(err => {
        console.log('ERR', err);
        return dispatch(findEventsFailure(err.statusText));
    });
};


// export const refreshAuthToken = () => (dispatch, getState) => {
//     const oldToken = localStorage.getItem('authToken');
//     return fetch(`${API_BASE_URL}/auth/refresh`, {
//         method: 'POST',
//         headers: {
//             // Provide our existing token as credentials to get a new one
//             Authorization: `Bearer ${oldToken}`
//         }
//     })
//         .then(res => normalizeResponseErrors(res))
//         .then(res => res.json())
//         .then(({authToken}) => localStorage.setItem('authToken', authToken))
//         .catch(err => {
//             // We couldn't get a refresh token because our current credentials
//             // are invalid or expired, or something else went wrong, so clear
//             // them and sign us out
//             localStorage.removeItem('authToken');
//             dispatch(authError(err));
//         });
// };