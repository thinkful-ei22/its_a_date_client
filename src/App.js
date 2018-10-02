import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain'
import HeaderBar from './components/HeaderBar.js';
import  {fetchProtectedData} from './actions/Protected-Data';

import RegistrationPage from './components/RegistrationPage';
import LoginPage  from './components/LoginPage';

import {Route, withRouter, Redirect} from 'react-router-dom';
import SuccessfullyCreatedEvent from './components/Events/SuccessfullyCreatedEvent';
import GuestEventForm from './components/Events/GuestEventForm';


class App extends Component {


  componentWillMount(){
    if(localStorage.getItem('authToken')){
       this.props.dispatch(fetchProtectedData());
    } else {
      return;
    }
  }

  render() {

   
    
    return (
      <div className="App">
        <div className="app" lang="en">
               <HeaderBar/>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} /> 
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/create-event" component={NewEventMain} />
                <Route exact path="/edit-draft" render={(props) => {
                        console.log('APP JS props passes', this.props.location.state)
                     return <NewEventMain {...props} {...this.props.location.state} />
                        }}/>
                <Route exact path="/guestevents/:eventId" component={GuestEventForm} />
          
            </div>
      </div>
    );
  }


}

//  export default App;


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
