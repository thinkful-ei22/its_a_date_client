import React from 'react';
import './styles/EventList.css';
import EventItem from './EventItem';

export function EventList(props) {
 
  if(props.userEvents !== null ){
    return props.userEvents.map((event, i)=>{
      return(
        <EventItem key={i} event={event} dispatch={props.dispatch}/>
      )
    });
  }
  else{
    return(
      null
    )
  }
}