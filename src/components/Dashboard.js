import React, { Component } from 'react';
import { EventList } from './EventList';
import { connect } from 'react-redux';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import './styles/Dashboard.css';

import {Link, Redirect, withRouter} from 'react-router-dom';


export class Dashboard extends Component {

    render() {
        console.log('userevents props',this.props.userEvents);
        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                   
                   
                    <div id="dashboard_main">
                         <h2>Hey {this.props.currentUser.username}!</h2>
                         <p>Welcome to your dashboard. Here you can create new events or manage
                             events that you've already created. Need Help? 
                         </p>
                             
                           <Link to="/create-event"><h3>Create New Event  <MdAddCircleOutline /></h3></Link>
                         <div id="event_boxes">
                         
                         </div>
                    
                    </div>
                    <div id="dashboard_eventlist">
                     <ul className="block-li">
                         <EventList userEvents={this.props.userEvents}/>
                     </ul>
                    </div>
                    {/* <button id="create-event">Create Event</button> */}
                </div>
            )
        }
        else {
            return <Redirect to='/home' />
        }
}
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    userEvents:state.auth.userEvents
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
