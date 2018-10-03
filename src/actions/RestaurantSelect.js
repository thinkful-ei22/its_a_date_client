import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './Utils';

export const FETCH_ZOMATO_LOCATION_REQUEST = 'FETCH_ZOMATO_LOCATION_REQUEST';
export const fetchZomatoLocationRequest = () => ({
  type: FETCH_ZOMATO_LOCATION_REQUEST
});

export const FETCH_ZOMATO_LOCATION_SUCCESS = 'FETCH_ZOMATO_LOCATION_SUCCESS';
export const fetchZomatoLocationSuccess = (cityCode) => ({
  type: FETCH_ZOMATO_LOCATION_SUCCESS,
  cityCode
});

export const FETCH_ZOMATO_LOCATION_ERROR = 'FETCH_ZOMATO_LOCATION_ERROR';
export const fetchZomatoLocationError = (error) => ({
  type: FETCH_ZOMATO_LOCATION_ERROR,
  error
});
export const fetchZomatoLocation = (lat, lon) => (dispatch, getState) => {
  dispatch(fetchZomatoLocationRequest());
  return fetch(`${API_BASE_URL}/api/restaurants/${lat}/${lon}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(cityCode => {
      dispatch(fetchZomatoLocationSuccess(cityCode));
      dispatch(fetchCuisines(cityCode.id));
    })
    .catch(err => dispatch(fetchZomatoLocationError(err)));
};

export const FETCH_CUISINES_REQUEST = 'FETCH_CUISINES_REQUEST';
export const fetchCuisinesRequest = () => ({
  type: FETCH_CUISINES_REQUEST
});

export const FETCH_CUISINES_SUCCESS = 'FETCH_CUISINES_SUCCESS';
export const fetchCuisinesSuccess = (cuisines) => ({
  type: FETCH_CUISINES_SUCCESS,
  cuisines
});

export const FETCH_CUISINES_ERROR = 'FETCH_CUISINES_ERROR';
export const fetchCuisinesError = (error) => ({
  type: FETCH_CUISINES_ERROR,
  error
});

export const fetchCuisines = (cityCode) => (dispatch) => {
  dispatch(fetchCuisinesRequest());
  return fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityCode}`, {
    method: 'GET',
    headers: {
      'Accept':'application/json',
      'user-key':'02fb4b75d2055eb17f988da8447de24a',
    },
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(cuisines => dispatch(fetchCuisinesSuccess(cuisines)))
    .catch(err => dispatch(fetchCuisinesError(err)));
};

export const FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS_REQUEST';
export const fetchRestaurantsRequest = () => ({
  type: FETCH_RESTAURANTS_REQUEST
});

export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const fetchRestaurantsSuccess = (restaurants) => ({
  type: FETCH_RESTAURANTS_SUCCESS,
  restaurants
});

export const FETCH_RESTAURANTS_ERROR = 'ETCH_RESTAURANTS_ERROR';
export const fetchRestaurantsError = (error) => ({
  type: FETCH_RESTAURANTS_ERROR,
  error
});

export const fetchRestaurants = (cityCode, cuisine) => (dispatch) => {
  dispatch(fetchRestaurantsRequest());
  return fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityCode}&entity_type=city&cuisines=${cuisine}`, {
    method: 'GET',
    headers: {
      'Accept':'application/json',
      'user-key':'02fb4b75d2055eb17f988da8447de24a',
    }, 
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(restaurants => dispatch(fetchRestaurantsSuccess(restaurants)))
    .catch(err => dispatch(fetchRestaurantsError(err)));
};