import React from 'react';
import {Link} from 'react-router-dom';
import { CLIENT_BASE_URL } from '../../config';
import { resetNewEventState } from '../../actions/New-Event';
import { sendEmail } from '../../actions/Email';


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

  sendEmail(e){
    e.preventDefault();
    const recipients = e.target.to.value.split(',');
    console.log(recipients);
    this.props.dispatch(sendEmail({
                to: recipients,
                from: e.target.from.value,
                subject: e.target.subject.value,
                text: e.target.message.value,
                html: `<p>${e.target.message.value}</p>`
              }));
  }
  

  render(){
    return (
      <div className="event-successfully-created">

        <h2>Nice! Your event has been created successfully.</h2>
        <button onClick={this.handleCopy}>Copy Link</button>  
          {this.state.copied ? <span style={{color: 'red'}}><p>Copied</p></span> : null}
            <p></p>
        <div className="event-link-to-share">
          <h3>Share this link with your friends:</h3>
          <p id="event-link">{CLIENT_BASE_URL}/guestevents/{this.props.eventState.id}</p>
          <h3>Email an invite to your friends!</h3>
          <form onSubmit={(e) => this.sendEmail(e)}>
          <label htmlFor='from'>Enter your e-mail.</label>
            <input placeholder='user@example.com' id='from'></input>
            <label htmlFor='to'>Enter recipients' e-mails separated by a comma.</label>
            <input placeholder="friend1@example.com, friend2@example.com, friend3@example.com" id="to"></input>
            <label htmlFor='subject'>Enter the subject of the e-mail.</label>
            <input placeholder="Let's hang out!" id="subject"></input>
            <label htmlFor='message'>Write the body of the e-mail.</label>
            <textarea placeholder={`Hi!  Let's get together. Please vote on when and where we should hang out here: ${CLIENT_BASE_URL}/guestevents/${this.props.eventState.id}`} id="message"></textarea>
            <button type="submit">Send</button>
          </form>
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
