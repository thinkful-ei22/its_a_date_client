import React from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm';
import { Redirect } from 'react-router-dom';
import Page from './Page';
import './styles/LoginPage.css';

export function RegistrationPage(props) {
    console.log(props.loggedIn,'Login');
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (    
        <Page>
        <div className="container">
           <div className="form-container">
              <RegistrationForm />
            </div>
         </div>
         </Page>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);