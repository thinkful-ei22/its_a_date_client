import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
//import LoginForm from './LoginForm';
import { connect } from 'react-redux';
//import Dashboard from './Dashboard';
import {Link, Redirect} from 'react-router-dom';
import HeaderBar from './HeaderBar';
import './styles/LandingPage.css';

import RegistrationForm  from './RegistrationForm';

export class LandingPage extends Component {


  componentDidMount(){
    //console.log('this.props.loggedIn',this.props.loggedIn);
  }
  

  render(){ 
    if(this.props.loading){
      return <h1>loading...</h1>;
    }
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
    
        <div className="hero"><h1>Event Planning Made Easy </h1></div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading:state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);