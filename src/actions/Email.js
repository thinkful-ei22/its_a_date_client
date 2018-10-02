import {normalizeResponseErrors} from './Utils';
import { API_BASE_URL } from '../config';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const sendEmailRequest = () => ({
  type: SEND_EMAIL_REQUEST
});
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const sendEmailSuccess = (email) => ({
  type: SEND_EMAIL_SUCCESS,
  email
});
export const SEND_EMAIL_ERROR = 'SEND_EMAIL_ERROR';
export const sendEmailError = (error) => ({
  type: SEND_EMAIL_ERROR,
  error
});
export const sendEmail = emailData => dispatch => {
  dispatch(sendEmailRequest());
  const token = localStorage.getItem('authToken');
  return fetch(`${API_BASE_URL}/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(emailData)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(email => {dispatch(sendEmailSuccess(email));
      return Promise.resolve();
    })
    .catch(err => Promise.reject(err));
};