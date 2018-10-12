import React from 'react';
import '../../styles/SelectActivity.css';

import { fetchCategories, fetchActivities } from '../../../actions/Activities';
import { updateNewEventState } from '../../../actions/New-Event';
import moment from 'moment';

export default class SelectActivity extends React.Component {
  
  componentDidMount(){
    this.props.dispatch(fetchCategories());
  }


  filterEvents(e){
    e.preventDefault();
    const times = this.props.times.sort();

    // Add five hours to the latest selected date, so user can see more event options
    let fiveHoursAfter = Number(moment(times[times.length - 1], 'YYYY-MM-DDTHH:mm:ss').format('x')) + (1000 * 60 * 60 * 5); //convert to ms, add 5 hours
    fiveHoursAfter = moment(fiveHoursAfter, 'x').format('YYYY-MM-DDTHH:mm:ss'); //convert back into formatted time

    this.props.dispatch(fetchActivities(this.props.latitude, this.props.longitude,times[0], fiveHoursAfter, e.target.value));
  }


  handleCheckboxChange(e){
    if(e.target.checked === true){
      // Make sure the activity is not already added to the New Event state
      if(this.props.eventState.activityOptions.find(act => act.ebId === e.target.id)){
        return this.props.dispatch(updateNewEventState({errorMessage: 'That activity is already selected.'}));
      }

      this.props.dispatch(updateNewEventState({
        errorMessage: '',
        activityOptions: [...this.props.eventState.activityOptions, {
          ebId: e.target.id, 
          link: e.target.value, 
          title: e.target.name, 
          description: e.target.dataset.description, 
          start: e.target.dataset.start, 
          end: e.target.dataset.end
        }]
      }));
    }
    else {
      const tempArray = this.props.eventState.activityOptions.filter(activity => activity.ebId !== e.target.id);
      this.props.dispatch(updateNewEventState({errorMessage: '', activityOptions: tempArray}));
    }
  }
   

  render(){
  
    let categoryFilters;
    if(this.props.categories.length > 0){
      categoryFilters = this.props.categories.map(category => {
        return <option key={category.id} id={category.id} value={category.id}>{category.name}</option>;
      });
    }

    let activityOptions;

    const events = this.props.activities;
    if (events.length > 0) {
      activityOptions = events.map( activity => {
        let checked = false;
        // If it's already a selected option, set default checked
        if (this.props.eventState.activityOptions.find(act => act.ebId === activity.id)) {
          checked = true;
        }

        const description= activity.description.text;
        const start = moment(activity.start.local).format('llll');
        const end = moment(activity.end.local).format('llll');
        return (
          <li key={activity.id} className={`activity-item border-bottom checked-${checked}`}>
            <input 
              data-start={start}
              data-end={end}
              data-description={description}
              id={activity.id}
              value={activity.url}
              name={activity.name.text}
              onChange={(e) => this.handleCheckboxChange(e)}
              type="checkbox"
              defaultChecked={checked}></input>
            <a href={activity.url} target="_blank">{activity.name.text}</a>
            <p className="dates-text">Start: {moment(activity.start.local).format('llll')}</p>
            <p className="dates-text">End: {moment(activity.end.local).format('llll')}</p>
          </li>
        );
      });

    } else {
      activityOptions = <p >No events in this category during the times you selected. Try a different category!</p>;
    }

    if(this.props.loading===true){
      categoryFilters = <option>Loading categories...</option>;
      activityOptions = <div>Loading event options...</div>;
    }
  
    return(
      <div className="category-select">
        <p>Change the category to see a list of events in your area during the times you selected. Check off events to add them to your list of activity options. You can select multiple events!</p>
        <select onChange={(e) => this.filterEvents(e)}>
          <option id="choose-a-category">Choose a category...</option>
          {categoryFilters}
        </select>
        <ul>
          {activityOptions}
        </ul>
      </div>
    );
  }
}