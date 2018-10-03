import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { clearAuth } from '../actions/Auth';
// import { clearAuthToken } from '../Local-Storage';
import {NavLink, Link} from 'react-router-dom';
import {changeCurrentUser} from '../actions/Protected-Data';
import {MdSentimentSatisfied} from 'react-icons/lib/md';
import Button from './Button';
import './styles/HeaderBar.css';
import './styles/Button.css';



export class HeaderBar extends Component {

    logOut() {
        localStorage.removeItem('authToken');
        this.props.dispatch(changeCurrentUser(null));
    }


    render(){
        console.log('Header bar props',this.props);
           
        let signUpButton, logInButton, aboutButton;
            aboutButton=(
                <Button location={this.props.history.location} to="/about" className="signup"  >About</Button>
            );
             signUpButton =(
                <Button location={this.props.history.location} to="/register" className="signup"  >Sign Up</Button>
            );
            logInButton =(
                <Button location={this.props.history.location} to="/login" className="login" >Log In</Button>
            );

            if(this.props.loggedIn){
                return(
                    <section className="header-bar">
                    <div className="header-logo">
                        <h3 title="GoodTimes"> <Link to="/dashboard"><MdSentimentSatisfied className="smily"/>goodtimes</Link></h3>
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
                    <h3 title="Goodtimes">  <Link to="/home"><MdSentimentSatisfied className="smily"/>goodtimes</Link></h3>
                    </div>

                        <div className="header-nav">
                            {aboutButton}
                            {signUpButton}
                            {logInButton}
                       </div>
               
                </section>
                );
         }
     }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
});


export default withRouter(connect(mapStateToProps)(HeaderBar));

