import {
    AUTH_REQUEST,
    AUTH_ERROR
} from '../actions/Auth';
import { FETCH_PROTECTED_DATA_ERROR, REQUEST_PROTECTED_DATA, CHANGE_CURRENT_USER } from '../actions/Protected-Data';

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

    } else if (action.type === REQUEST_PROTECTED_DATA) {
        return Object.assign({}, state, {
            loading: true,
            error: action.error
        });

    } else if (action.type === CHANGE_CURRENT_USER) {
        console.log('Hit reducer');
        return Object.assign({}, state, {
            loading: false,
            error: null,
            currentUser: action.data
        })

    } else if (action.type === FETCH_PROTECTED_DATA_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        })
    } 

    return state;
}