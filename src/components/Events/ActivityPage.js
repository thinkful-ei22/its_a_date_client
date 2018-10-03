import React from 'react';
import { fetchCategories, fetchActivities } from '../../actions/Activities';
import moment from 'moment';
import { updateNewEventState } from '../../actions/New-Event';
export default class ActivitySelect extends React.Component {

  componentDidMount(){
    this.props.dispatch(fetchCategories());

  }
  filterEvents(e){
    const times = this.props.times.sort();
    e.preventDefault();
    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,times[0],times[times.length-1], e.target.value));
  }

  deleteWhenClicked(e){
    const { activityOptions }  = this.props.eventState;
    const titleOfActivityToDelete = e.target.id;
    const filteredActivities = activityOptions.filter((option) => option.title !== titleOfActivityToDelete);
  this.props.dispatch(updateNewEventState({activityOptions: filteredActivities}));
  }
  render(){
    let categoryFilters;
    if(this.props.categories.length > 0){
      categoryFilters = this.props.categories.map(category => {
        return <option key={category.id} id={category.id} value={category.id}>{category.name}</option>;
      });
    }
    let activityOptions;
    if(this.props.activities === undefined){
      console.log('no activities');
    }
    if(this.props.activities.activities !== undefined){
      const events = this.props.activities.activities.events;
      if(events.length >0){
        activityOptions = events.map((activity, index) => {
          return (
            <div key={index}>
              <input 
                id={activity.id}
                value={activity.url}
                name={activity.name.text}
                onChange={(e) => {
                  if(e.target.checked === true){
                    this.props.dispatch(updateNewEventState({
                      activityOptions: [...this.props.eventState.activityOptions, {
                        ebId: e.target.id, link: e.target.value, title: e.target.name
                      }]
                    }));
                  }
                  else {
                    console.log('activity id=',activity.id, 'e.target.id=', e.target.id);
                    const tempArray = this.props.eventState.activityOptions.filter(activity => activity.ebId !== e.target.id);
                    console.log('temp array=',tempArray);
                    this.props.dispatch(updateNewEventState({activityOptions: tempArray}));
                  }
                }}
                type="checkbox"></input>
              <a href={activity.url}>{activity.name.text}</a>
              <p>Start: {moment(activity.start.local).format('llll')}</p>
              <p>End: {moment(activity.end.local).format('llll')}</p>
            </div>
          );
        });
      }else{
        activityOptions = <p>No events in this category during the times you selected. Try a different category!</p>;
      }
    }
    
    if(this.props.loading===true){
      categoryFilters = <option>Loading categories...</option>;
      activityOptions = <div>Loading event options...</div>;
    }
    let selectedActivitiesDisplay;
    if ( this.props.eventState.activityOptions.length > 0 ){
      console.log('selected activities', this.props.eventState.activityOptions);
      selectedActivitiesDisplay = this.props.eventState.activityOptions.map((activity,index) => {  
      console.log('ACtivity', activity);
        return  <li key={index} id={activity.title} onClick={e => this.deleteWhenClicked(e)}>{activity.title}</li> 
      });
    }
    return(
      <div>
        <p>Change the category to see a list of events in your area during the times you selected. Check off events to add them to your list of activity options. You can select multiple events!</p>
        <select onChange={(e) => {
          activityOptions = this.filterEvents(e);
        }}>
          <option>Choose a category...</option>
          {categoryFilters}
        </select>
        <ul>Event Choices{selectedActivitiesDisplay}</ul>

        {activityOptions}
      
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>

        <button type='button' onClick={()=>this.props.nextPage()}>Next Page</button>
      </div>
    );
  }
}
