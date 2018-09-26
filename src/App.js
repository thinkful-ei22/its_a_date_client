import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
//import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import EventContainer from './components/Events/EventContainer.js'
import HeaderBar from './components/HeaderBar.js';
import  {fetchProtectedData} from './actions/Protected-Data';

import RegistrationPage from './components/RegistrationPage';
//import LoginForm  from './components/LoginForm';
import LoginPage  from './components/LoginPage';
import {Route, withRouter, Redirect} from 'react-router-dom';
import { NewEventMain} from './components/Events/newEventMain';

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
                <Route exact path="/dateform" component={EventContainer} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/login" component={LoginPage} /> 
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/create-event" component={NewEventMain} />
          
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
