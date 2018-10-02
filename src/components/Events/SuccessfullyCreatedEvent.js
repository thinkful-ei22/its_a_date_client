import React from 'react';
import {Link} from 'react-router-dom';
import { CLIENT_BASE_URL } from '../../config';
import { resetNewEventState } from '../../actions/New-Event';


export default class SuccessfullyCreatedEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value:'',
      copied:false
    }
  
  }

  //Need to clear the local storage persistance after form is submitted
  componentWillUnmount(){
    this.props.dispatch(resetNewEventState());
    localStorage.removeItem('eventDraft');
    localStorage.removeItem('newEventPageCount');
  }
  
  
  handleCopy =()=>{
    var inp = document.createElement('input');
    document.body.appendChild(inp)
    inp.value =document.querySelector("#event-link").textContent
    inp.select();
    document.execCommand('copy',false);
    inp.remove();
    this.setState({copied:true});
  }

  

  render(){
    return (
      <div className="event-successfully-created">

        <h2>Nice! Your event has been created successfully.</h2>

        <div className="event-link-to-share">
          <h3>Share this link with your friends:</h3>
          <p id="event-link">{CLIENT_BASE_URL}/guestevents/{this.props.eventState.id}</p>

          <button onClick={this.handleCopy}>Copy Link</button>  
          {this.state.copied ? <span style={{color: 'red'}}><p>Copied</p></span> : null}
            <p></p>
          <Link to="/dashboard"> 
            <button id="back-to-dashboard">
                Back to Dashboard
            </button>
          </Link>
        </div>

      </div>
    )
  } 
 
}
