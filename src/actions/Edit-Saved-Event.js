import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";




export const PUT_UPDATED_EVENT_REQUEST = 'PUT_UPDATED_EVENT_REQUEST';
export const putUpdatedEventRequest = () => ({
  type: PUT_UPDATED_EVENT_REQUEST,
  
})
export const PUT_UPDATED_EVENT_SUCCESS = 'PUT_UPDATED_EVENT_SUCCESS';
export const putUpdatedEventSuccess = () => ({
  type: PUT_UPDATED_EVENT_SUCCESS,
  
})



export const updateSavedEvent = eventData => dispatch => {
  console.log('FROM Edit-Draft Action: Draft DATA', eventData);
  dispatch(putUpdatedEventRequest());
  const eventId = eventData.id;
  console.log('draftData:',eventData );
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/events/${eventId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(() => { 
  dispatch(putUpdatedEventSuccess());
  return Promise.resolve();
})
  .catch(err => Promise.reject(err) )
}