import {
    AUTH_REQUEST,
    AUTH_ERROR,
    FIND_EVENTS_REQUEST,
    FIND_EVENTS_SUCCESS,
    FIND_EVENTS_FAILURE
} from '../actions/Auth';
import { FETCH_PROTECTED_DATA_ERROR, REQUEST_PROTECTED_DATA, CHANGE_CURRENT_USER } from '../actions/Protected-Data';

const initialState = {
    currentUser: null,
    events: null,
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

    } else if(action.type === FIND_EVENTS_SUCCESS){
        return Object.assign({}, state, {
          events: action.events,
          loading: false
        });

    } else if(action.type === FIND_EVENTS_REQUEST){
        return Object.assign({}, state, {
          loading: true,
        });

    } else if(action.type === FIND_EVENTS_FAILURE){
        return Object.assign({}, state, {
          error: action.error,
          loading: false
        });
    }
    return state;
}