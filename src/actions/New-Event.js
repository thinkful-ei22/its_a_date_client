import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";


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
//Example input:  {restuarantOptions: [zomatoId: '123', votes: 0]}


export const NEW_EVENT_ERROR_MESSAGE = 'NEW_EVENT_ERROR_MESSAGE';
export const newEventErrorMessage = message => ({
  type: NEW_EVENT_ERROR_MESSAGE,
  message
})



export const postNewEvent = eventData => dispatch => {
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
    return Promise.resolve();
  })
  .catch(err => Promise.reject(err) )
}