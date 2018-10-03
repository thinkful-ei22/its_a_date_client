import React from 'react';
import { fetchCategories, fetchActivities } from '../../actions/Activities';
import moment from 'moment';
import { updateNewEventState } from '../../actions/New-Event';
import SelectActivity from './SelectActivity';
import WriteActivity from './WriteActivity';

export default class ActivitySelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      display: 'none'
    };
  }
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
    const idOfActivityToDelete = e.target.id;
    const filteredActivities = activityOptions.filter((option) => option._id !== idOfActivityToDelete);
  this.props.dispatch(updateNewEventState({activityOptions: filteredActivities}));
  }
  render(){
    
    let optionDisplay;

    if(this.state.display === 'none'){
      optionDisplay = <div></div>;
    }
    else if(this.state.display === 'write'){
      optionDisplay =   
      <div>
        <WriteActivity 
          dispatch={this.props.dispatch} 
          eventState={this.props.eventState}
          prevPage={this.props.prevPage} 
          nextPage={this.props.nextPage}
          categories={this.props.categories}
          activities={this.props.activities}
          loading={this.props.loading}
          latitude={this.props.latitude}
          longitude={this.props.longitude}
          times={this.props.times}
        />
        <button 
          onClick={(e) => {
            const form = e.target.parentElement.firstChild;
            this.props.dispatch(updateNewEventState({
              activityOptions: [...this.props.eventState.activityOptions, {
                ebId: form.title.value, link: '#', description: form.description.value, title: form.title.value
              }]
            })
            );
            this.setState({display:'none'});
          }}
        >Save Event</button>
      </div>;
    }
    else if(this.state.display === 'choose'){
      optionDisplay = <SelectActivity 
        dispatch={this.props.dispatch} 
        eventState={this.props.eventState}
        prevPage={this.props.prevPage} 
        nextPage={this.props.nextPage}
        categories={this.props.categories}
        activities={this.props.activities}
        loading={this.props.loading}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
        times={this.props.times}/>;
    }
    let selectedActivitiesDisplay;
    if ( this.props.eventState.activityOptions.length > 0){
      selectedActivitiesDisplay = this.props.eventState.activityOptions.map((activity,index) => { 
      if(!activity.description){  
        return (  <div key={index}>
          <a href={activity.link} target='blank'>{activity.title}</a>
         </div>
     )
           } else {

            return (  <div key={index}>
              <a href={activity.link} target='blank'>{activity.title}:</a>
               <p>{activity.description.length > 50 ? `${activity.description.slice(0,50)}...` : activity.description}</p>
           </div>
)


            }
            });      
    }

    return(
      <div>
        <h1>Let's do something!</h1>
        <p>You can choose from events in your area or create your own!</p>
        <button onClick={() => this.setState({display: 'choose'})}>Choose From List</button>
        <button onClick={() => this.setState({display: 'write'})}>Create My Own</button>
        <div>Event Choices{selectedActivitiesDisplay}</div>
        {optionDisplay}
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>

        <button type='button' onClick={()=>this.props.nextPage()}>Next Page</button>
      </div>
    );
  }
}
