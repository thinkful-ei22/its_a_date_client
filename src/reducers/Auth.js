import {
    AUTH_REQUEST,
    AUTH_ERROR
} from '../actions/Auth';
import { FETCH_PROTECTED_DATA_ERROR, FETCH_PROTECTED_DATA_SUCCESS } from '../actions/Protected-Data';

const initialState = {
    currentUser: null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });

    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });

    } else if (action.type === FETCH_PROTECTED_DATA_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            error: null,
            currentUser: action.currentUser
        })

    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })
    } 

    return state;
}