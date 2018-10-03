import React from 'react';
import { connect } from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom';
import { initialState } from '../../reducers/NewEvent';

import { updateNewEventState, newEventErrorMessage } from '../../actions/New-Event';

import EventBottomNav from './EventBottomNav';
import CreateEventContainer from './CreateEventContainer';


export class NewEventMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pageCount: 1,
    };
  }




  /* ------------ Persists the state of our New Event --------------------------*/
  componentWillMount(){
    try {
      const eventDraft = localStorage.getItem('eventDraft');
      if (eventDraft) {
        this.props.dispatch(updateNewEventState(JSON.parse(eventDraft)));
        const newEventPageCount = localStorage.getItem('newEventPageCount');
        if (newEventPageCount) {
          this.setState({pageCount: Number(newEventPageCount)});
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  componentWillUnmount(){
    localStorage.removeItem('newEventPageCount');
  }

  componentDidUpdate(){
      try {
        localStorage.setItem('eventDraft', JSON.stringify(this.props.newEvent));
        localStorage.setItem('newEventPageCount', this.state.pageCount);
      }
      catch (err) {
        console.log(err);
      }
  }
  /* ------------------------------------------------------------------------------*/




  nextPage = () => {
    this.setState({pageCount: this.state.pageCount + 1}, 
      () => this.props.dispatch(newEventErrorMessage(null))
    )
  }

  prevPage = () => {
    this.setState({pageCount: this.state.pageCount - 1}, 
      () => this.props.dispatch(newEventErrorMessage(null))
    )  
  }

  goHome = () => {
    this.props.history.push(`/dashboard`);
 
  }
  render(){
    if(this.props.loggedIn){
      return(
       <div className="newEventWrapper">
       
         <CreateEventContainer 
            pageNum={this.state.pageCount} 
            props={this.props} 
            nextPage={this.nextPage} 
            prevPage={this.prevPage} 
            goHome={this.goHome}/>

          <EventBottomNav 
            pageNum={this.state.pageCount} 
            props={this.props} 
            nextPage={this.nextPage} 
            prevPage={this.prevPage}
            goHome={this.goHome} />

       </div>
      )


    } else {
      return <Redirect to="/" />;
    }
   
   
  } 


}

const mapStateToProps = state => ({
  newEvent: state.newEvent,
  //loggedIn: state.auth.currentUser !== null,
  loggedIn: localStorage.getItem('authToken') !== null,
  currentUser: state.auth.currentUser,
  restaurants: state.restaurants,
  activities: state.activities
});

export default withRouter(connect(mapStateToProps)(NewEventMain));

