import React from 'react';
import { CreateEvent } from './CreateEvent';
import DateSelectPage from './DateSelectPage';
import PreviewEvent from './PreviewEvent';
import ActivitySelect from './ActivityPage';
import RestaurantSelect from './RestaurantSelect';
import SuccessfullyCreatedEvent from './SuccessfullyCreatedEvent';
import {Redirect,withRouter} from 'react-router-dom';
import moment from 'moment';

export default function CreateEventContainer(props){
    let component;
    console.log('Create Event Props', props);
    switch (props.pageNum) {
    case 0:
      return null
    case 1:
      //title, location, description
      component = <CreateEvent 
        nextPage={props.nextPage} 
        dispatch={props.props.dispatch} 
        prevPage={props.goHome} 
        eventState={props.props.newEvent}
      />;
      break;
    case 2:
      //date/time options
      component = <DateSelectPage 
        nextPage={props.nextPage}
        dispatch={props.props.dispatch}
        prevPage={props.prevPage} 
        eventState={props.props.newEvent}/>;
      break;
    case 3:
      //food options
      component = <RestaurantSelect 
      nextPage={props.nextPage} 
      dispatch={props.props.dispatch} 
      prevPage={props.prevPage} 
      eventState={props.props.newEvent}
      restaurants={props.props.restaurants}
      cityCode={props.props.restaurants.cityCode}
      />;
      break;
    case 4:
      //activity options
      component = <ActivitySelect
        dispatch={props.props.dispatch} 
        eventState={props.props.newEvent}
        prevPage={props.prevPage} 
        nextPage={props.nextPage}
        categories={props.props.activities.categories}
        activities={props.props.activities.activities}
        loading={props.props.activities.loading}
        latitude={props.props.newEvent.location.latitude}
        longitude={props.props.newEvent.location.longitude}
        times={props.props.newEvent.scheduleOptions.map(time => 
                moment(time.date, 'llll').format('YYYY-MM-DDTHH:mm:ss'))}
      />;
      break;
    case 5:
      //preview, confirm page
      component = <PreviewEvent 
        nextPage={props.nextPage}
        goHome={props.goHome} 
        dispatch={props.props.dispatch} 
        prevPage={props.prevPage} 
        eventState={props.props.newEvent}
        currentUser={props.props.currentUser}
      />;
      break;
    case 6:
      //successful submition page
      component = <SuccessfullyCreatedEvent 
        dispatch={props.props.dispatch} 
        prevPage={props.prevPage} 
        eventState={props.props.newEvent}
        nextPage={props.nextPage}
      />;
      break;
    case 7:
      return <Redirect to='/dashboard'/>;
    }

    return (
      <div className='new-event-form bottom-offset'>
        {component}
      </div>
    );

}