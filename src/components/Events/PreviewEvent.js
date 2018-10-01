import React, { Component } from 'react';
import { postNewEvent } from '../../actions/New-Event';
import '../styles/PreviewEvent.css'
import { connect  } from 'react-redux';

 class PreviewEvent extends Component {
constructor(props){
  super(props);
}
  onSubmit() {
    const newEvent = {
      userId: this.props.userId,
      title: this.props.eventState.title,
      description: this.props.eventState.description,
      location: this.props.eventState.location,  //zomato location ID
      scheduleOptions: this.props.eventState.scheduleOptions,
      restaurantOptions: this.props.eventState.restaurantOptions
    };
    return this.props.dispatch(postNewEvent(newEvent))
      .then(() => this.props.nextPage())
      .catch(err => console.log('ERROR HANDLING HERE dispatch(changeErrorMessaeg(err.message))'));
  }

  render(){ 
    let timesDisplay, restaurantsDisplay;

    timesDisplay = this.props.eventState.scheduleOptions.map((option, i) => { 
      return (
        <div key={i} className="option_container">
          <input 
          type="radio" 
          name="time-option" 
          value={option.id} />
  
          <label> {option.date} </label> 
          </div>
          );});
  
    restaurantsDisplay = this.props.eventState.restaurantOptions.map((option,i) => { 
      let link = <a href={option.website}>{option.name}</a>;
      return (
        <div key={i} className="option_container">
          <input 
            type="radio" 
            name="restaurant-option" 
            value={option.zomatoId} />
            <label> {link} </label>
          </div> );}); 
  
 if(this.props.loading){
  return (
    <h1>Loading...</h1>
   )
 } else { 

  return (
    <div className='preview-event'>
      <div>
        {/* <input type='image'/> */}
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>
        <h1>Preview Event Form</h1>
      </div>

      
      <div className="guest-event-form-wrapper">
        <h3>You're invited to:</h3>
        <h1>{this.props.eventState.title}</h1><br/>
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
        <button type='button' onClick={() => this.onSubmit()}>Looks good!</button>
      </div>
    </div>
  );
}
 }
}
const mapStateToProps = state => ({
  loading: state.newEvent.loading
 
});
export default connect(mapStateToProps)(PreviewEvent);


//PROPS: <PreviewEvent nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
