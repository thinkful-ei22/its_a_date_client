import React from 'react';
import { connect } from 'react-redux';
import { CreateEvent } from './CreateEvent';
import DateSelectPage from './DateSelectPage';
import {Redirect,withRouter} from 'react-router-dom';
import PreviewEvent from './PreviewEvent';
import { initialState } from '../../reducers/NewEvent';
import ActivitySelect from './ActivityPage';
import RestaurantSelect from './RestaurantSelect';
import moment from 'moment';
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent';
import { updateNewEventState, newEventErrorMessage } from '../../actions/New-Event';
import throttle from 'lodash/throttle';


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
    this.setState({pageCount:0})
  }
  render(){
    if(this.props.loggedIn){
      let component;
      switch (this.state.pageCount) {
      case 0:
        return <Redirect to='/dashboard' />;
      case 1:
        //title, location, description
        component = <CreateEvent 
          nextPage={this.nextPage} 
          dispatch={this.props.dispatch} 
          prevPage={this.prevPage} 
          eventState={this.props.newEvent}
        />;
        break;
      case 2:
        //date/time options
        component = <DateSelectPage nextPage={this.nextPage} dispatch={this.props.dispatch} prevPage={this.prevPage} eventState={this.props.newEvent}/>;
        break;
      case 3:
        //food options
        component = <RestaurantSelect 
        nextPage={this.nextPage} 
        dispatch={this.props.dispatch} 
        prevPage={this.prevPage} 
        eventState={this.props.newEvent}
        restaurants={this.props.restaurants}
        cityCode={this.props.restaurants.cityCode}
        />;
        break;
      case 4:
        //activity options
        component = <ActivitySelect
          dispatch={this.props.dispatch} 
          eventState={this.props.newEvent}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          categories={this.props.activities.categories}
          activities={this.props.activities.activities}
          loading={this.props.activities.loading}
          latitude={this.props.newEvent.location.latitude}
          longitude={this.props.newEvent.location.longitude}
          times={this.props.newEvent.scheduleOptions.map(time => 
                  moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}
        />;
        break;
      case 5:
        //preview, confirm page
        component = <PreviewEvent 
          nextPage={this.nextPage}
          goHome={this.goHome} 
          dispatch={this.props.dispatch} 
          prevPage={this.prevPage} 
          eventState={this.props.newEvent}
          currentUser={this.props.currentUser}
        />;
        break;
      case 6:
        //successful submition page
        component = <SuccessfullyCreatedEvent 
          dispatch={this.props.dispatch} 
          eventState={this.props.newEvent}
          nextPage={this.nextPage}
        />;
        break;
      case 7:
        return <Redirect to='/dashboard'/>;
      }

      return (
        <div className='new-event-form'>
          {component}
        </div>
      );
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

