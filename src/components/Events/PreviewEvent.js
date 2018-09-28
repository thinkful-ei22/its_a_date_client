import React from 'react';
import { postNewEvent } from '../../actions/New-Event';


export default function PreviewEvent(props){
  
  
  let timesDisplay, restaurantsDisplay;

  timesDisplay = props.eventState.scheduleOptions.map((option, i) => { 
    return (
      <div key={i} className="option_container">
        <input 
        type="radio" 
        name="time-option" 
        value={option.id} />

        <label> {option.date} </label> 
        </div>
        );});

  restaurantsDisplay = props.eventState.restaurantOptions.map((option,i) => { 
    let link = <a href={option.website}>{option.name}</a>;
    return (
      <div key={i} className="option_container">
        <input 
          type="radio" 
          name="restaurant-option" 
          value={option.zomatoId} />
          <label> {link} </label>
        </div> );}); 


  function onSubmit() {
    const newEvent = {
      userId: props.userId,
      title: props.eventState.title,
      description: props.eventState.description,
      location: props.eventState.location,  //zomato location ID
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions
    };
    return props.dispatch(postNewEvent(newEvent))
      .then(() => props.nextPage())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }

  return (
    <div className='preview-event'>
      <div>
        {/* <input type='image'/> */}
        <button type='button' onClick={() => props.prevPage()}>
          {'<-'} Back
        </button>
        <h1>Preview Event Form</h1>
      </div>

      
      <div className="guest-event-form-wrapper">
        <h3>You're invited to:</h3>
        <h1>Title</h1><br/>
        <h3>Vote to decide on a time and place.</h3>
            
        <h3>Description</h3>
        <form className="event-form-options">
          <div className="time-options"> 
            <h4>Choose a Time:</h4>
              {timesDisplay}
          </div>
          <div className="restaurant-options"> 
            <h4>Choose a Place:</h4>
             {restaurantsDisplay}
          </div>
          <br/>
          <br/>
        </form>     
      </div>

      <div>
        <button type='button'>Save as Draft</button>
        <button type='button' onClick={() => onSubmit()}>Looks good!</button>
      </div>
    </div>
  );
}




//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
