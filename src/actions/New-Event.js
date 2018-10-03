import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './Utils';


export const SHOW_NEW_EVENT_STATE = 'SHOW_NEW_EVENT_STATE';
export const showNewEventState = bool => ({
  type: SHOW_NEW_EVENT_STATE,
  bool
});


export const UPDATE_NEW_EVENT_STATE = 'UPDATE_NEW_EVENT_STATE';
export const updateNewEventState = updateObject => ({
  type: UPDATE_NEW_EVENT_STATE,
  updateObject
});


export const RESET_NEW_EVENT_STATE = 'RESET_NEW_EVENT_STATE';
export const resetNewEventState = () => ({
  type: RESET_NEW_EVENT_STATE
});

export const NEW_EVENT_ERROR_MESSAGE = 'NEW_EVENT_ERROR_MESSAGE';
export const newEventErrorMessage = message => ({
  type: NEW_EVENT_ERROR_MESSAGE,
  message
});

export const POST_NEW_EVENT_REQUEST = 'POST_NEW_EVENT_REQUEST';
export const postNewEventRequest = message => ({
  type: POST_NEW_EVENT_REQUEST,
  
});
export const POST_NEW_EVENT_SUCCESS = 'POST_NEW_EVENT_SUCCESS';
export const postNewEventSuccess = message => ({
  type: POST_NEW_EVENT_SUCCESS,
  
});

export const postNewEvent = eventData => dispatch => {
  dispatch(postNewEventRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(updateNewEventState({id: res.id}));
    
    })
    .then(() => { 
      dispatch(postNewEventSuccess());
      return Promise.resolve();
    })
    .catch(err => Promise.reject(err) );
};

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const deleteEventRequest = () => ({
  type: DELETE_EVENT_REQUEST
});

export const DELETE_EVENT_ERROR = 'DELETE_EVENT_ERROR';
export const deleteEventError = (error) => ({
  type: DELETE_EVENT_ERROR,
  error
});

export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const deleteEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS
});

export const deleteEvent = (eventId) => dispatch => {
  dispatch(deleteEventRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    // .then(res => res.json())
    .then(() => dispatch(deleteEventSuccess()))
    .catch(err => Promise.reject(err));
};