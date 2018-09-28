import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain'
import HeaderBar from './components/HeaderBar.js';
import  {fetchProtectedData} from './actions/Protected-Data';
import Error404 from './components/Error404';
import RegistrationPage from './components/RegistrationPage';
import LoginPage  from './components/LoginPage';

import {Route, withRouter, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';


import SuccessfullyCreatedEvent from './components/Events/SuccessfullyCreatedEvent';
import GuestEventForm from './components/Events/GuestEventForm';

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

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
      <BrowserRouter forceRefresh={!supportsHistory}>
       <div className="App">
       <HeaderBar/>
          <div className="app" lang="en">
         
          <Route
          render={({ location }) => {
            const { pathname } = location;
            return (
              <TransitionGroup>
                <CSSTransition 
                  key={pathname}
                  classNames="page"
                  timeout={{
                    enter: 1000,
                    exit: 1000,
                  }}
                > 
                  <Route
                    location={location}
                    render={() => (
                      <Switch>
                        
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/register" component={RegistrationPage} />
                        <Route exact path="/login" component={LoginPage} /> 
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/create-event" component={NewEventMain} />
                        <Route exact path="/guestevents/:eventId" component={GuestEventForm} />
                        <Route component={Error404}/>
                      </Switch>
                    )}
                  />
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
       
               
               
            
              </div>
        </div>
      </BrowserRouter>
    );
  }


}

//  export default App;


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
