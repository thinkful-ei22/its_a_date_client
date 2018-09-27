import React from 'react';
import {connect} from 'react-redux';
import './styles/EventList.css'
import { fetchEvents } from '../actions/Auth';


class EventList extends React.Component {

  //////----need a dispatch to fetch action to get the event list on the backend///
  /////-----then going to map through and list all the events////////////
  componentDidMount(){
    console.log('componentDidMount');
    this.props.dispatch(fetchEvents());
  }

  render(){

    let event;
    if(this.props.events !== null){
      console.log(this.props.events);

      event = this.props.events.map((event)=>{
        return event.scheduleOptions.map(date =>{
          return date.option.times.map((time, i) =>{
            console.log(time);
            return(
              <div key={i} className='user-event'>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <p>Date:{date.option.date}</p>
                <p>Time:{time.time}</p>
                <p>Votes:{time.votes}</p>
              </div>
            )
          })        
        })        
      })

    

    }
    return (
      <div className='event-list'>
        {event}
      </div>
    )
    
  }
}
 

const mapStateToProps = state => ({
  events: state.auth.events,
  loading: state.auth.loading
})

export default connect(mapStateToProps)(EventList);