import React, { Component } from 'react';
import EventList from './EventList';
import { connect } from 'react-redux';


import {Link, Redirect, withRouter} from 'react-router-dom';


export class Dashboard extends Component {

    render() {

        if(this.props.loggedIn){
            return (
                <div className="dashboard-wrapper">
                   
                    <EventList events={this.props.events} dispatch={this.props.dispatch} />
                    <Link to="/create-event">Create Event</Link>
                    {/* <button id="create-event">Create Event</button> */}
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
    events: state.auth.events
  });

export default withRouter(connect(mapStateToProps)(Dashboard));
