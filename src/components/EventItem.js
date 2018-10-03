import React from 'react';
import { deleteEvent } from '../actions/New-Event';

export default class EventItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    };
  }

  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    );
  }

  render(){
    if(this.state.showDetails){
      return(
        <li className='user-event'>
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>
          <div className='date-options'>
            <p>Date/Time options:</p>
            {
              this.props.event.scheduleOptions.map((date,i) =>{
                console.log(date);
                return(
                  <div key={i} className='date-vote'>
                    <p>Date: {date.date}</p>
                    <p>Votes: {date.votes}</p>
                  </div>
                );
                
              })
            }
          </div>
          <div className='date-options'>
            <p>Restaurant options:</p>
            {
              this.props.event.restaurantOptions.map((food,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <a href={food.website} target="_blank">{food.name}</a>
                    <p>Votes: {food.votes}</p>
                  </div>
                );
              })
            }
          </div>
          <div className='date-options'>
            <p>Event options:</p>
            {
              this.props.event.activityOptions.map((act,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <a href={act.link} target="_blank">{act.title}</a>
                    <p>Votes: {act.votes}</p>
                  </div>
                );
              })
            }
          </div>
        </li>
      );
    }  
    else{
      return(
        <li className='user-event'>
          <h2>{this.props.event.title}</h2>
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
          <button onClick={()=> this.props.dispatch(deleteEvent(this.props.event.id))}>Delete</button>
        </li>
      );
    }    
  }
}