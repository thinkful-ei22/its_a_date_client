import React, { Component } from 'react';
import { Transition, config, animated } from 'react-spring'
import {connect} from 'react-redux';
import { BrowserRouter, Router, withRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

import  {fetchProtectedData} from './actions/Protected-Data';

//App components
import LandingPage from './components/LandingPage';
import RegistrationPage from './components/RegistrationPage';
import HeaderBar from './components/HeaderBar.js';
import LoginPage  from './components/LoginPage';
import Error404 from './components/Error404';
import Dashboard from './components/Dashboard';
import NewEventMain from './components/Events/newEventMain';
import GuestEventForm from './components/Events/GuestEventForm';

//Used by React Router
import createHistory from 'history/createBrowserHistory';

//Main CSS Styles
import './styles.css';


const history = createHistory();



class App extends Component{
    componentWillMount(){
        if(localStorage.getItem('authToken')){
           this.props.dispatch(fetchProtectedData());
        } else {
          return;
        }
      }
  
    render() {
        return (
     <Router history={history}>
            <Route
            render={({ location, ...rest }) => (
                <div className="fill">
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <HeaderBar history={history}/>
                <div className="content">
                <Transition
                    native
                    config={{
                        tension: 1, 
                        friction: 10,

                        restSpeedThreshold: 1,
                        restDisplacementThreshold: 0.001,
                        overshootClamping: true,
                      }}
                    keys={location.pathname.split('/').filter(a => a)[0]}
                    from={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateX(80%)', opacity: 0, overflow:'none'})
                        } else {
                            return({  opacity: 0 })
                        }
                    }}
                    enter={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateX(0px)', opacity: 1,overflow:'none'  })
                        } else {
                            return({  opacity: 1 })
                        }
                    }}
                 
                      
                    leave={item => {
                        if (item !== 'dashboard'){
                            return({ transform: 'translateX(-80%)', opacity: 0 })
                        } else {
                            return({  opacity: 0 })
                        }
                    }}>
                    {style => (
                        <Switch location={location}>
                        <Route exact path="/home" render={props => HomePage({...props, style})} />
                        <Route exact path="/login" render={props => Login_Page({ ...props, style })} />
                        <Route exact path="/register" render={props => RegisterPage({ ...props, style })} />
                        <Route exact path="/dashboard" render={props => DashboardPage({ ...props, style })} />
                        <Route exact path="/create-event" render={props => CreateEventPage({ ...props, style })} />
                    <Route path="/guestevents/:eventId" render={props => GuestEventPage({ ...props, style })} />
                    {/* //<GuestEventForm {...props} style={style}  */}
                    {/* <Route exact path="/guestevents/:eventId" component={GuestEventForm} />  */}
                        </Switch>
                    )}
                    </Transition>
                </div>
                </div>
            )}
            />
        </Router>
        )
    }
   }


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
  });

  export default withRouter(connect(mapStateToProps)(App));


const NavLink = props => (
  <li className="navItem">
    <Link {...props} style={{ cursor: 'pointer', color: 'inherit' }} />
  </li>
)

const HomePage = ({ style }) => (
  <animated.div className="mainRoute" style={{ ...style, background: `#fbfaf4` }}>
    <div className="mainRouteItem">
   <LandingPage />
    </div>
  </animated.div>
);

const RegisterPage = ({ style }) => (
    <animated.div className="mainRoute" style={{ ...style, background: `#fbfaf4` }}>
      <div className="mainRouteItem">
     <RegistrationPage />
      </div>
    </animated.div>
  );

  const Login_Page = ({ style }) => (
    <animated.div className="mainRoute" style={{ ...style, background: `#fbfaf4` }}>
      <div className="mainRouteItem">
       <LoginPage/>
      </div>
      
    </animated.div>
  )
  
  

const DashboardPage = ({ style }) => (
    <animated.div className="dashboardRoute" style={{ ...style, background: `#fbfaf4` }}>
      <div className="dashboardRouteItem">
     <Dashboard />
      </div>

    </animated.div>
  )

const CreateEventPage = ({ style }) => (
  <animated.div  style={{ ...style, background: '#fbfaf4' }}>
   <div className="dashboardRouteItem">
   <NewEventMain/>
   </div>
  </animated.div>

)

const GuestEventPage = ({...props, style}) => (
    <animated.div  style={{ ...style, background: '#fbfaf4' }}>
     <div className="dashboardRouteItem">
     <GuestEventForm {...props}/>
   
     </div>
    </animated.div>
  
  )


