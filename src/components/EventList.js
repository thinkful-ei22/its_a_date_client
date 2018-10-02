import React from 'react';
import './styles/EventList.css';
import EventItem from './EventItem';
import DraftItem from './DraftItem';

export function EventList(props) {
  if(props.userEvents !== null ){
    switch(props.drafts){

        case false:
            return props.userEvents.map((event, i)=>{
                return(
                   <EventItem key={i} event={event}/>
               )
            });

    case true:
    return props.userEvents.map((event, i)=>{
      return(
         <DraftItem key={i} event={event}/>
         )
        });
      }
    }
  else{
    return(
      null
    )
  }
}

