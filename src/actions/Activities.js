import {normalizeResponseErrors} from './Utils';

//get category list
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
});

export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const fetchCategoriesError = (error) => ({
  type: FETCH_CATEGORIES_ERROR,
  error
});

export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesRequest());
  return fetch('https://www.eventbriteapi.com/v3/categories/?token=LMGDQWGEPZAZZGFLKMKA',{
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(categories => dispatch(fetchCategoriesSuccess(categories)))
    .catch(err => dispatch(fetchCategoriesError(err)));
};

//get events matching date, time, and category filter
export const FETCH_ACTIVITIES_REQUEST = 'FETCH_ACTIVITIES_REQUEST';
export const fetchActivitiesRequest = () => ({
  type: FETCH_ACTIVITIES_REQUEST
});
export const FETCH_ACTIVITIES_ERROR = 'FETCH_ACTIVITIES_ERROR';
export const fetchActivitiesError = (error) => ({
  type: FETCH_ACTIVITIES_ERROR,
  error
});
export const FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCES';
export const fetchActivitiesSuccess = (activities) => ({
  type: FETCH_ACTIVITIES_SUCCESS,
  activities
});

//format: 40.7128
//format -74.0060
//format: 2018-07-02T12:00:00Z
//format: 2018-12-03T12:00:00Z 
export const fetchActivities = (latitude, longitude, start, end) => (dispatch) => {
  dispatch(fetchActivitiesRequest());
  return fetch(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=${latitude}&location.longitude=${longitude}&start_date.range_start=${start}&start_date.range_end=${end}&token=LMGDQWGEPZAZZGFLKMKA`,{
    method: 'GET',   
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(activities => dispatch(fetchActivitiesSuccess(activities)))
    .catch(err => dispatch(fetchCategoriesError(err)));
};