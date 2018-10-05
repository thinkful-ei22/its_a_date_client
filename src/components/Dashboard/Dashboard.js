import React, { Component } from 'react';
import { EventList } from './UserEvents/EventList';
import { connect } from 'react-redux';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import '../styles/Dashboard.css';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { fetchUserEvents } from '../../actions/Protected-Data';


export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: true
    };
  }

  componentWillMount(){
    this.props.dispatch(fetchUserEvents());
  }

  displayEvents(){
    this.setState({display:true});
  }

  displayDrafts(){
    this.setState({display:false});
  }

  render() {
    let eventsToDisplay=[];

    if(this.props.userEvents !==null && this.props.userEvents.length >= 1){
      switch(this.state.display){
      //true = display active events, false = display drafts
      case true:
        eventsToDisplay = this.props.userEvents.filter(event => event.draft !==true );
        break;
      case false:
        eventsToDisplay = this.props.userEvents.filter(event => event.draft === true);
        break;
      }
    }

    if(this.props.loggedIn){
      return (
        <div className="dashboard-wrapper">
          <div id="dashboard_main">
            <h2>Hey {this.props.currentUser.username}!</h2>
            <p>Welcome to your dashboard. Here you can create new events or manage
                             events that you've already created. 
            </p>
            <button id="display-drafts" onClick={() => this.displayDrafts()}>Drafts</button>
            <button id="display-active-events" onClick={() => this.displayEvents()}>Active Events</button>
            <Link to="/create-event"><h3>Create New Event  <MdAddCircleOutline /></h3></Link>
            <div id="event_boxes">
            
            </div>      
          </div>
          <div id="dashboard_eventlist">
            <ul className="block-li">
              <EventList loading={this.props.loading} userEvents={eventsToDisplay} dispatch={this.props.dispatch} events={this.state.display}/>
            </ul>
          </div>
        </div>
      );
    }
    else {
      return <Redirect to='/home' />;
    }
  }
}


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser,
  userEvents:state.auth.userEvents,
  loading:state.auth.loading
});

export default withRouter(connect(mapStateToProps)(Dashboard));
