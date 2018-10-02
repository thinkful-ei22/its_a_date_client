import { 
  SHOW_NEW_EVENT_STATE, 
  UPDATE_NEW_EVENT_STATE,
  NEW_EVENT_ERROR_MESSAGE,
  POST_NEW_EVENT_REQUEST,
  POST_NEW_EVENT_SUCCESS,
  RESET_NEW_EVENT_STATE
} from '../actions/New-Event';
import { SEND_EMAIL_REQUEST, SEND_EMAIL_ERROR, SEND_EMAIL_SUCCESS } from '../actions/Email';

import {
  LOAD_DRAFT_INTO_REDUX_STATE,
  PUT_UPDATED_DRAFT_REQUEST,
  PUT_UPDATED_DRAFT_SUCCESS

} from '../actions/Edit-Draft';

export const initialState = {
  showNewEvent: false,
  errorMessage: '',

  title: '',
  description: '',
  draft: false,
  location: '', // i.e. {latitude: 55, longitude: -55}
  locationCity: '', // i.e. {city: 'Denver', state: 'CO'}
  scheduleOptions: [],
  restaurantOptions: [],
  activityOptions:[],
  id: null,
  loading: false,
  inviteEmail: {
    to: '',
    from: '',
    subject: '',
    text: '',
    html: ''
  }
};

//draft that's being edited 
//currently uses 'update new event state'
export default function newEventReducer (state=initialState, action) {
  if (action.type === SHOW_NEW_EVENT_STATE) {
    return Object.assign({}, state, {
      showNewEvent: action.bool
    });

  } else if (action.type === POST_NEW_EVENT_REQUEST) {
console.log('NewEvent Request');
    return Object.assign({}, state, {
      loading: true
    });
  }else if (action.type === UPDATE_NEW_EVENT_STATE) {
    return Object.assign({}, state, action.updateObject); //example:  {restaurantOptions: [{zomatoId: '123'}]}

  } else if (action.type === POST_NEW_EVENT_SUCCESS) {
console.log('New event Success');
    return Object.assign({}, state, {
      loading: false
    });
  }  else if (action.type === PUT_UPDATED_DRAFT_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === LOAD_DRAFT_INTO_REDUX_STATE) {
    console.log('update action=',action.draftObject);
    
    return Object.assign({}, state,  action.draftObject
      ); 
} else if (action.type === PUT_UPDATED_DRAFT_SUCCESS) {

  return Object.assign({}, state, {
    loading: false
  });
}  else if (action.type === RESET_NEW_EVENT_STATE) {
    return Object.assign({}, state, initialState);
  } else if (action.type === NEW_EVENT_ERROR_MESSAGE) {
    return Object.assign({}, state, {
      errorMessage: action.message,
      loading: false
    });
  } else if(action.type === SEND_EMAIL_REQUEST){
    console.log(action);
    return Object.assign({}, state, {
      loading:true
    });
  }
  else if(action.type === SEND_EMAIL_ERROR){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      errorMessage: action.error,
    });
  }
  else if(action.type === SEND_EMAIL_SUCCESS){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      email: action.email
    });
  }
  else {
    return state;
  }
}