import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Dashboard from './Dashboard';
import {Link, Redirect} from 'react-router-dom';
import './styles/LandingPage.css';
import Button from './Button';



export class LandingPage extends Component {


  componentDidMount(){
    console.log('this.props.loggedIn',this.props.loggedIn);
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
 
            <div className="hero">
              <h1>Let the good times roll! </h1>
              <hr></hr>
              <h3>Easy event planning for groups and friends</h3>
               <Button to="/about">Learn More</Button>
            </div>
          
           <img className="home-img" src="../../assets/home-calendar.png" alt="Homepage image"/>
           
          </div>
  
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  loading:state.auth.loading
});

export default connect(mapStateToProps)(LandingPage);