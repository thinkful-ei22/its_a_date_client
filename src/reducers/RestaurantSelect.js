import { FETCH_CUISINES_REQUEST, FETCH_CUISINES_ERROR, FETCH_CUISINES_SUCCESS, FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_ERROR, FETCH_RESTAURANTS_SUCCESS, FETCH_ZOMATO_LOCATION_REQUEST, FETCH_ZOMATO_LOCATION_ERROR, FETCH_ZOMATO_LOCATION_SUCCESS } from '../actions/RestaurantSelect';

const initialState = {
  cityCode:null,
  cuisines:[],
  loading: false,
  error: null,
  restaurants: []
};

export default function reducer(state = initialState, action){
  if(action.type === FETCH_ZOMATO_LOCATION_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_ZOMATO_LOCATION_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_ZOMATO_LOCATION_SUCCESS){
    return Object.assign({}, state, {
      loading: false,
      cityCode: action.cityCode.id
    });
  }
  else if(action.type === FETCH_CUISINES_REQUEST){
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_CUISINES_ERROR){
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_CUISINES_SUCCESS){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      cuisines: action.cuisines.cuisines
    });
  }
  else if(action.type === FETCH_RESTAURANTS_REQUEST){
    console.log(action);
    return Object.assign({}, state, {
      loading: true
    });
  }
  else if(action.type === FETCH_RESTAURANTS_ERROR){
    console.log(action);
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if(action.type === FETCH_RESTAURANTS_SUCCESS){
    console.log(action.restaurants.restaurants);
    return Object.assign({}, state, {
      loading: false,
      restaurants:  action.restaurants.restaurants
    });
  }
  return state;
}