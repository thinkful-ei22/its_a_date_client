import { API_BASE_URL } from "../config";
import { normalizeResponseErrors } from "./Utils";


export const LOAD_DRAFT_INTO_REDUX_STATE = 'LOAD_DRAFT_INTO_REDUX_STATE';
export const loadDraftIntoReduxState = draftObject => ({
  type: LOAD_DRAFT_INTO_REDUX_STATE,
  draftObject
});



export const PUT_UPDATED_DRAFT_REQUEST = 'PUT_UPDATED_DRAFT_REQUEST';
export const putUpdatedDraftRequest = message => ({
  type: PUT_UPDATED_DRAFT_REQUEST,
  
})
export const PUT_UPDATED_DRAFT_SUCCESS = 'PUT_UPDATED_DRAFT_SUCCESS';
export const putUpdatedDraftSuccess = message => ({
  type: PUT_UPDATED_DRAFT_SUCCESS,
  
})



export const putUpdatedDraft = draftData => dispatch => {
  console.log('FROM Edit-Draft Action: Draft DATA', draftData);
  dispatch(putUpdatedDraftRequest());
  const draftId = draftData.id;
  console.log('draftData:',draftData );
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/events/${draftId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(draftData)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(() => { 
  dispatch(putUpdatedDraftSuccess());
  return Promise.resolve();
})
  .catch(err => Promise.reject(err) )
}