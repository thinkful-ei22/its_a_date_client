import React, { Component } from 'react';
import DateSelectPage from './DateSelectPage';
//import { connect } from 'react-redux';
//import {Link} from 'react-router-dom';
import '../styles/EventContainer.css';


export default class EventContainer extends Component {

    render() {
        return (
            <div className="container">
                <div className="form-container">
                    <DateSelectPage />
                </div>
            </div>
        )

}
}

//export default requiresLogin()(connect(mapStateToProps)(Dashboard));
