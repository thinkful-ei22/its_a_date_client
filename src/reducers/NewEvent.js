import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE 
} from '../actions/New-Event';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',
  title: '',
  draft: false,
  location: '', //  <-- maybe switch this to {lat: ..., long: ...} ??
  description: '',
  scheduleOptions: [],
  restaurantOptions: [],
  id: null
};


export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } else if (action.type === UPDATE_NEW_EVENT_STATE) {
    console.log('update action=',action);
    return Object.assign({}, state, action.updateObject); //example:  {restaurantOptions: [{zomatoId: '123'}]}

  } else if (action.type === NEW_EVENT_ERROR_MESSAGE) {

    return Object.assign({}, state, {
      errorMessage: action.message
    });
  } else {
    return state;
  }
}