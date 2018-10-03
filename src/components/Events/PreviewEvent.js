import React from 'react';
import { postNewEvent, resetNewEventState } from '../../actions/New-Event';
import '../styles/PreviewEvent.css'


export default function PreviewEvent (props) {

  function onSubmit() {
    const newEvent = {
      userId: props.currentUser.id,
      title: props.eventState.title,
      draft: false,
      description: props.eventState.description,
      location: props.eventState.location,  //{latitude: ..., longitude: ...}
      locationCity: props.eventState.locationCity,
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions,
      activityOptions: props.eventState.activityOptions
    };
    return props.dispatch(postNewEvent(newEvent))
      .then(() => props.nextPage())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }

 function onDraft () {
    const newEvent = {
      userId: props.currentUser.id,
      title: props.eventState.title,
      draft: true,
      description: props.eventState.description,
      location: props.eventState.location,  //{latitude: ..., longitude: ...}
      locationCity: props.eventState.locationCity,
      scheduleOptions: props.eventState.scheduleOptions,
      restaurantOptions: props.eventState.restaurantOptions,
      activityOptions: props.eventState.activityOptions
    };
    return props.dispatch(postNewEvent(newEvent))
      .then(() => {
        props.dispatch(resetNewEventState());
        localStorage.removeItem('eventDraft');
        localStorage.removeItem('newEventPageCount');
        props.goHome();
      })
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }


  let timesDisplay, restaurantsDisplay, activitiesDisplay;

    timesDisplay = props.eventState.scheduleOptions.map((option, i) => { 
      return (
        <div key={i} className="option_container">
          <input 
            type="checkbox" 
            id={"time-option"+i}
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
            type="checkbox" 
            id={"restaurant-option"+i}
            name="restaurant-option"
            value={option.zomatoId} />
          <label> {link} </label>
        </div> );}); 
      
    activitiesDisplay = props.eventState.activityOptions.map((option,i) => { 
      let link = <a href={option.link}>{option.title}</a>;
      return (
        <div key={i} className="option_container">
          <input 
            type="checkbox" 
            id={"activity-option"+i}
            name="activity-option"
            value={option.ebId} />
          <label> {link} </label>
        </div> );}); 

  if(props.eventState.loading){
    return ( <h1>Loading...</h1> )
   } else { 
        return (
  <div className="absolute-wrapper">
    <div className='preview-event'>
      <div>
        {/* <input type='image'/> */}
        <button type='button' onClick={() => props.prevPage()}>
          {'<-'} Back
        </button>

           <button type='button' onClick={() => onDraft()}>Save as Draft</button>
        <button type='button' onClick={() => onSubmit()}>Looks good!</button>
        <h1>Preview Event Form</h1>
      </div>

      
      <div className="guest-event-form-wrapper">
        <h3>You're invited to:</h3>
        <h1>{props.eventState.title}</h1><br/>
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
          <div className="activity-options"> 
            <h4>Choose a Place:</h4>
            {activitiesDisplay}
          </div>
          <br/>
          <br/>
        </form>     
      </div>

      {/* <div>
        <button type='button' onClick={() => onDraft()}>Save as Draft</button>
        <button type='button' onClick={() => onSubmit()}>Looks good!</button>
      </div> */}
    </div>
    </div>
  );
}
}


//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
