import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCESS,
  RESET_NEW_EVENT_STATE
} from '../actions/New-Event';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',

  title: '',
  city: '',
  state: '',
  description: '',
  draft: false,
  location: '',
  scheduleOptions: [],
  restaurantOptions: [],
  activityOptions:[],
  id: null,
  loading: false
};


export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } else if (action.type === POST_NEW_EVENT_REQUEST) {

    return Object.assign({}, state, {
      loading: true
    });
  }else if (action.type === UPDATE_NEW_EVENT_STATE) {
    return Object.assign({}, state, action.updateObject); //example:  {restaurantOptions: [{zomatoId: '123'}]}

  } else if (action.type === POST_NEW_EVENT_SUCCESS) {

    return Object.assign({}, state, {
      loading: false
    });
  }   else if (action.type === POST_NEW_EVENT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === RESET_NEW_EVENT_STATE) {
    return Object.assign({}, state, initialState);
  } else if (action.type === NEW_EVENT_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } else {
    return state;
  }
}