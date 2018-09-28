import React, { Component } from 'react';

import { connect } from 'react-redux';
// import { clearAuth } from '../actions/Auth';
// import { clearAuthToken } from '../Local-Storage';
import {Link} from 'react-router-dom';
import {changeCurrentUser} from '../actions/Protected-Data';
import {MdSentimentSatisfied} from 'react-icons/lib/md';
import './styles/HeaderBar.css';



export class HeaderBar extends Component {

   

    logOut() {
        localStorage.removeItem('authToken');
        this.props.dispatch(changeCurrentUser(null));
    }


    render(){
           
        let signUpButton, logInButton;
             signUpButton =(
                <button className="signup">Sign Up</button>
            );
            logInButton =(
                <button className="login">Log In</button>
            );

            if(this.props.loggedIn){
                return(
                    <section className="header-bar">
                    <div className="header-logo">
                        <h3> <Link to="/"><MdSentimentSatisfied/></Link>Goodtimes</h3>
                    </div>
    
                        <div className="header-nav">    
                            <button className="logout" onClick={() => this.logOut()}>Log out</button>
                        </div>
                    
                
                   </section>

                )
            } else {

                return (
                    <section className="header-bar">
                    <div className="header-logo">
                    <h3>  <Link to="/"><MdSentimentSatisfied/></Link>Goodtimes</h3>
                    </div>

                        <div className="header-nav">
                    
                            
                            
                            <Link to="/register">{signUpButton}</Link>
                            <Link to="/login">{logInButton}</Link>
                       </div>
               
                </section>
                );
         }
     }
}
//let logOutButton,  aboutToggle;
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});


export default connect(mapStateToProps)(HeaderBar);

// logOutButton = (
//     <button className="logout" onClick={() => this.logOut()}>Log out</button>
// );


// aboutToggle =(
//     <button className="about" onClick={() => this.props.switchOverlay(true)}>About</button>
// );