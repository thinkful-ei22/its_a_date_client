import React, { Component } from 'react';
import {API_BASE_URL} from '../../config';
import { updateEventVotes } from '../../actions/Update-Event-Votes';
//import { updateEventVotes } from '../../actions/Update-Event-Votes';
import { connect } from 'react-redux';
import PostVote from './PostVotePage';
import '../styles/GuestEventForm.css';

class GuestEventForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false,
      guestEvent: null,
      errorMessage: null
    };
    this.submitVotes = this.submitVotes.bind(this);
  }

  componentDidMount(){
    //GET EVENT DATA
    const { eventId }= this.props.match.params;
   console.log('GUEST EVENT MOUNT', this.props);
    fetch(`${API_BASE_URL}/api/guestevents/${eventId}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then(data => {

        this.setState({guestEvent: data});
      });
  }
  submitVotes(event){
    event.preventDefault();

    //If restaurants or times section has not been filled out, return

    if(!document.querySelector('input[name="restaurant-option"]:checked') ||
    !document.querySelector('input[name="time-option"]:checked') ){
      return;
    }
    const restaurantId = document.querySelector('input[name="restaurant-option"]:checked').value;
    const dateId = document.querySelector('input[name="time-option"]:checked').value;
    const eventId = this.state.guestEvent.id;

    let selectionObject = {
      dateSelection: dateId,
      restaurantSelection: restaurantId
    };
    console.log('SELECTION OBJ', selectionObject);
    this.props.dispatch(updateEventVotes(selectionObject, eventId));
    this.setState({submitted:true});
  }
  
    
  render(){
    if(this.state.submitted){
      return <PostVote/>;
    }
    if(this.state.guestEvent === null){
      return (
        <p>Loading...</p>
      );
    } else { 
      let timesDisplay, restaurantsDisplay;

      const {title, description, scheduleOptions, restaurantOptions } = this.state.guestEvent;

      timesDisplay = scheduleOptions.map(option => { 
        return (
          <div className="option_container">
            <input 
            type="radio" 
            name="time-option" 
            value={option.id} />
  
            <label> {option.date} </label> 
            </div>
            );});

      restaurantsDisplay = restaurantOptions.map(option => { 
        let link = <a href={option.website}>{option.name}</a>;
        return (
          <div className="option_container">
            <input 
              type="radio" 
              name="restaurant-option" 
              value={option.zomatoId} />
              <label> {link} </label>
            </div> );});        

      return (
        <div className="guest-event-form-wrapper paddingTop">
          <h3>You're invited to:</h3>
          <h1>{title}</h1><br/>
          <h3>Vote to decide on a time and place.</h3>
            
          <h3>{description}</h3>
          <form className="event-form-options" onSubmit={this.submitVotes}>
            <div className="time-options"> 
              <h4>A good time to meet would be...</h4>
              {timesDisplay}
            </div>
            <div className="restaurant-options"> 
              <h4>Let's go eat at...</h4>
              {restaurantsDisplay}
            </div>
            <br/>
            <br/>
            <button  type="submit" id="submit-votes">
                            Submit</button>
          </form>     
        </div>
        
      );
    }
  }
}

export default connect()(GuestEventForm);