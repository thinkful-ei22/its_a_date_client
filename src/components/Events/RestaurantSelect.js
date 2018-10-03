import React from 'react';

import { fetchRestaurants, fetchZomatoLocation } from '../../actions/RestaurantSelect';
import { updateNewEventState } from '../../actions/New-Event';
import '../styles/RestaurantSelect.css';


export default class RestaurantSelect extends React.Component {

  constructor(props){
    super(props);
  }

  
  componentWillMount(){
    this.props.dispatch(fetchZomatoLocation(this.props.eventState.location.latitude, this.props.eventState.location.longitude));
  }

  getCuisines(e){
    const cuisineCode = e.target.value;
    e.preventDefault();
    this.props.dispatch(fetchRestaurants(this.props.cityCode, cuisineCode));
  }
  
  render(){
    let cuisineOptions;
    if(this.props.restaurants.cityCode === null){
      cuisineOptions = <option>Loading cuisine options...</option>;

    } else {
      cuisineOptions = this.props.restaurants.cuisines.map( (cuisine,index) => {
        return (
          <option value={cuisine.cuisine.cuisine_id} key={index}>{cuisine.cuisine.cuisine_name}</option>
        );
      });
    }


    let restaurantChoices = this.props.restaurants.restaurants.map((restaurant,index) => {
      return (
        <div className="restaurant-item" key={index}>
          <input 
            onChange={(e)=>{
              if (e.target.checked === true) {
                this.props.dispatch(updateNewEventState({
                  restaurantOptions: [...this.props.eventState.restaurantOptions, 
                    {zomatoId: e.target.id, website: e.target.value, name: e.target.name}
                  ]
                }));
              }
              else {
                const tempArray =  this.props.eventState.restaurantOptions.filter(restaurant => restaurant.zomatoId !== e.target.id);
                this.props.dispatch(updateNewEventState({restaurantOptions: tempArray}));
              }
            }}
            key={index} id={restaurant.restaurant.id} name={restaurant.restaurant.name} value={restaurant.restaurant.url} type="checkbox"></input>

          <img src={restaurant.restaurant.thumb ==="" ? "https://www.redbytes.in/wp-content/uploads/2018/09/zomato-logo-AD6823E433-seeklogo.com_.png" : restaurant.restaurant.thumb} alt="Thumbnail"></img>
         <div className="restaurant-info">
            <a key={index+1} href={restaurant.restaurant.url} target="#">{restaurant.restaurant.name}</a>
            <p>{'$'.repeat(restaurant.restaurant.price_range)}</p>
            <p>Rating: {restaurant.restaurant.user_rating.aggregate_rating}</p>
          </div>

        </div>
      );
    });
    

    let selectedRestaurantsDisplay;
    if ( this.props.eventState.restaurantOptions.length > 0 ){
      selectedRestaurantsDisplay = this.props.eventState.restaurantOptions.map((restaurant,index) => <li key={index}>{restaurant.name}</li>);
    }
    
    return(
      <div className="container text-left">
      <h1>Let's go eat!</h1>
        <p>Change the cuisine to see a list of restaurant options. 
          Check off restaurants to add them to your list of options.
           You can select multiple restaurants!</p>
        <div id="select-cuisine">
          <form id="select-cuisine-form">
            <label>Select Cuisine</label>
            <select onChange={e => this.getCuisines(e)}>
              <option>Select a cuisine...</option>
              {cuisineOptions}
            </select>
          </form>
         
       
         
         
          <ul>Restaurant Choices{selectedRestaurantsDisplay}</ul>

          <button type='button' onClick={() => this.props.prevPage()}>
            {'<-'} Back
          </button>

          <button type='button' onClick={()=>this.props.nextPage()}>Next Page</button>
        </div>

        <div id="restaurant-list">
          {restaurantChoices}
        </div>
      </div>
    );
  }
}