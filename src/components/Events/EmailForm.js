import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../../actions/Email';
import { CLIENT_BASE_URL } from '../../config';


 class EmailForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sent: false
    };
  }

  sendEmail(e){
    e.preventDefault();
    const recipients = e.target.to.value.split(',');
    this.props.dispatch(sendEmail({
      to: recipients,
      from: this.props.currentUser.email,
      subject: e.target.subject.value,
      text: e.target.message.value,
      html: `<p>${e.target.message.value}</p>`
    }));
    this.setState({sent:true});
  }

  closeAlert(){
    this.setState({sent:false});
  }
  render(){
    let alertBox;
    if(this.state.sent===true){
      alertBox = <div>
        <h2>Success!</h2>
        <p>E-mail sent! Check the dashboard periodically for voting results.</p>
        <button onClick={()=>this.closeAlert()}>Close</button>
      </div>;
    }
    else if(this.state.sent===false){
      alertBox = <div></div>;
    }
    return (
      <div>
        <form onSubmit={(e) => this.sendEmail(e)}>
          
          <label htmlFor='to'>Enter recipients' e-mails separated by a comma.</label>
          <input placeholder="friend1@example.com, friend2@example.com, friend3@example.com" id="to"></input>
          <label htmlFor='subject'>Enter the subject of the e-mail.</label>
          <input placeholder="Let's hang out!" id="subject"></input>
          <label htmlFor='message'>Write the body of the e-mail.</label>
          <textarea placeholder={`Hi!  Let's get together. Please vote on when and where we should hang out here: ${CLIENT_BASE_URL}/guestevents/${this.props.eventState.id}`} id="message"></textarea>
          <button type="submit">Send</button>
        </form>
        {alertBox}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})
export default connect(mapStateToProps)(EmailForm);
//<label htmlFor='from'>Enter your e-mail.</label>
//<input placeholder='user@example.com' id='from'></input>