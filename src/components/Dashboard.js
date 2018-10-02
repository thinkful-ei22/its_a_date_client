import React, { Component } from 'react';
import { EventList } from './EventList';
import { connect } from 'react-redux';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import './styles/Dashboard.css';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { fetchUserEvents } from '../actions/Protected-Data';

export class Dashboard extends Component {
constructor(props){
    super(props);
    this.state = {
        drafts: false
    }
}

// Get most recent event state whenever Dashboard renders
// and once every 15 seconds
componentWillMount(){
  this.props.dispatch(fetchUserEvents());
  this.interval = setInterval(() => {
    this.props.dispatch(fetchUserEvents());
  }, 1000 * 15);
}

// Stop the periodic refresh when Dashboard unmounts
componentWillUnmount(){
  clearInterval(this.interval);
}



displayEvents(){
this.setState({drafts: false});
}
displayDrafts(){
    this.setState({drafts: true});
}
    render() {
        let eventsToDisplay=[];
        //let drafts;
        if(this.props.userEvents !==null && this.props.userEvents.length >= 1){

            switch(this.state.drafts){
                //true = display active events, false = display drafts
                case false:
                    eventsToDisplay = this.props.userEvents.filter(event => event.draft !==true );
                    //drafts = false;
                    break;
                case true:
                    eventsToDisplay = this.props.userEvents.filter(event => event.draft === true);
                   // drafts = true;
            }
        }
      
        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                   
                    <div id="dashboard_main">
                         <h2>Hey {this.props.currentUser.username}!</h2>
                         <p>Welcome to your dashboard. Here you can create new events or manage
                             events that you've already created. Need Help? 
                         </p>
                             <button id="display-drafts" onClick={() => this.displayDrafts()}>Drafts</button>
                             <button id="display-active-events" onClick={() => this.displayEvents()}>Active Events</button>
                           <Link to="/create-event"><h3>Create New Event  <MdAddCircleOutline /></h3></Link>
                         <div id="event_boxes">
                         <EventList drafts={this.state.drafts} userEvents={eventsToDisplay}/>
                         </div>
                    
                    </div>
                    <div id="dashboard_eventlist">
                     <ul className="block-li">
                  
                     </ul>
                    </div>
                </div>
            )
        }
        else {
            return <Redirect to='/' />
        }
}
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    userEvents:state.auth.userEvents
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
