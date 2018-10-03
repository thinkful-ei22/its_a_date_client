import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_ERROR, FETCH_CATEGORIES_SUCCESS, FETCH_ACTIVITIES_REQUEST, FETCH_ACTIVITIES_ERROR, FETCH_ACTIVITIES_SUCCESS } from '../actions/Activities';


const initialState = {
  categories:[],
  loading: false,
  error: null,
  activities: []
};

export default function reducer(state = initialState, action){
  if(action.type === FETCH_CATEGORIES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_CATEGORIES_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_CATEGORIES_SUCCESS){
    console.log('categories action=',action);
    return Object.assign({}, state, {
      loading: false,
      categories: action.categories.categories
    });
  }
  else if(action.type === FETCH_ACTIVITIES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_ACTIVITIES_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_ACTIVITIES_SUCCESS){
    console.log('activities action=', action);
    return Object.assign({}, state, {
      loading: false,
      activities: action
    });
  }
  return state;
}