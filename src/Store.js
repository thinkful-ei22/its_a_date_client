import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import authReducer from './reducers/Auth';
import newEventReducer from './reducers/NewEvent';
import restaurantReducer from './reducers/RestaurantSelect';
import activityReducer from './reducers/Activities';
import { refreshAuthToken } from './actions/Auth';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    newEvent: newEventReducer,
    restaurants: restaurantReducer,
    activities: activityReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
// const authToken = localStorage.getItem('authToken');
// if (authToken) {
//     store.dispatch(refreshAuthToken());
// }

export default store;

