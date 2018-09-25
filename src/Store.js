import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import authReducer from './reducers/Auth';
import { refreshAuthToken } from './actions/Auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = localStorage.getItem('authToken');
if (authToken) {
    store.dispatch(refreshAuthToken());
}

export default store;

