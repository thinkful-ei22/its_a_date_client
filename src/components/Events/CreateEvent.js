
import React from 'react';

import '../styles/CreateEvent.css';
import { updateNewEventState, newEventErrorMessage } from '../../actions/New-Event';
import { bingMapsKey } from '../../config';

export class CreateEvent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationOption: 0,
      locationFeedback: ''
    }
  }


  validateCity = () => {
    const city = document.getElementsByName('cityLocation')[0].value;
    const state = document.getElementsByName('stateLocation')[0].value;
    //Error Handle
    if (!city || !state) {
      return this.setState({locationFeedback: 'Must provide a city and state'});
    } else if (city.length < 3) {
      return this.setState({locationFeedback: 'Must provide a longer city name.'});
    }

    this.setState({locationFeedback: 'Checking city...'});
    //Get Latitude and Longitude
    return fetch(`http://dev.virtualearth.net/REST/v1/Locations/US/${state}/${city}/addressLine?includeNeighborhood=0&include=0&key=${bingMapsKey}`)
      .then(res => res.json())
      .then(bingMapsResult => {
        const possibleResults = bingMapsResult.resourceSets[0].resources;
        if (possibleResults.length === 1) {
          let message = `Successfully found ${possibleResults[0].name}`;
          if (!possibleResults[0].address.locality) {
            message = `Must provide a valid city name.`
          }
          this.setState({
            locationFeedback: message,
            locationOption: 0
          }, () => {
            this.props.dispatch(updateNewEventState({
              location: {
                'latitude': possibleResults[0].point.coordinates[0], 
                'longitude': possibleResults[0].point.coordinates[1]
              }
            }));
          })

        } else if (this.state.locationOption < possibleResults.length) {
          let message = `You selected ${possibleResults[this.state.locationOption].name}`;
          if (!possibleResults[this.state.locationOption].address.locality) {
            message = `Must provide a valid city name.`
          }
          this.setState({locationFeedback: message}, () => {
            this.props.dispatch(updateNewEventState({
              location: {
                'latitude': possibleResults[this.state.locationOption].point.coordinates[0],
                'longitude': possibleResults[this.state.locationOption].point.coordinates[1]
              }
            }))
          })
        } else {
          this.setState({
            locationFeedback: 'No more options. Please try a different city.',
            locationOption: 0
          }, () => {
            this.props.dispatch(updateNewEventState({location: ''}));
          })
        }
        return;
      })
      .catch(err => console.log(err));
  }




  handleIncorrectCity = () => {
    this.setState({locationOption: this.state.locationOption + 1}, () => this.validateCity());
  }



  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.eventState.errorMessage) return;
    if (this.state.locationFeedback.startsWith('No more options')) return;
    if (this.state.locationFeedback.startsWith('Must provide')) return;
    if (this.state.locationFeedback === 'Checking city...') return;

    const title = e.target.eventTitle.value.trim();
    const state = e.target.stateLocation.value;
    const city = e.target.cityLocation.value.trim();
    const description = e.target.eventDescription.value;

    //Validate the required fields
    const requiredInfo = [title, state, city];
    let requiredFields = ['title', 'state', 'city'];
    for(let i = 0; i < requiredFields.length; i++){
      if (!requiredInfo[i]) {
        console.log('HANDLE SUBMIT');
        return this.props.dispatch(newEventErrorMessage(`Must include ${requiredFields[i]} for your new event.`));
      }
    }

    this.props.dispatch(updateNewEventState({
      title, 
      description, 
      locationCity: {city, state}
    }));
    this.props.nextPage();
  }


  ////// RENDER BEGINS HERE ////////
  render(){

    console.log('PAGE 1: CreateEVENT this.props:', this.props);

   // console.log('PROPS in CREATE EVENT',this.props);
    let errorMessage = null;
    let locationMessage = null;
    if (this.props.eventState.errorMessage){
      errorMessage = <p className='error-message'>{this.props.eventState.errorMessage}</p>;
    }

    if ( this.state.locationFeedback === 'Checking city...' || 
        this.state.locationFeedback.startsWith('Successfully found') ||
        this.state.locationFeedback.startsWith('No more options.') ||
        this.state.locationFeedback.startsWith('Must provide') ||
        !this.state.locationFeedback) {
      locationMessage = <p>{this.state.locationFeedback}</p>
    } else {
        locationMessage = (
          <p>
            {this.state.locationFeedback}
            <button type='button' onClick={() => this.setState({locationFeedback: ''})}>Yes</button>
            <button type='button' onClick={() => this.handleIncorrectCity()}>No</button>
          </p>
        )
      }
console.log('Create EVENT', this.props);
    return (
      <div>
      <h3>Let's get started!</h3>
      <p>Create a title and select a location for your event. Don't forget to add a description!</p>

      <form
        className="event-form"
        onSubmit={e => this.handleSubmit(e)}
      >
        {errorMessage}

        <label htmlFor="eventTitle">Event Title</label>
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          placeholder="Get together"
          value={this.props.eventState.title}
          onChange={(e) => {
            this.props.dispatch(updateNewEventState({title: e.target.value}));
            this.props.dispatch(newEventErrorMessage(null));
          }}
        />
        <label htmlFor='stateLocation'>Location</label>
        <select name="stateLocation" id="stateLocation" value={this.props.eventState.locationCity.state ? this.props.eventState.locationCity.state : 'AL'} 
          onChange={e => {
            let city = this.props.eventState.locationCity.city ? this.props.eventState.locationCity.city : '';
            this.props.dispatch(updateNewEventState({
              locationCity: {city, state: e.target.value}
            }));
            this.setState({locationOption: 0}, () => this.validateCity() );
          }}>

          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <label htmlFor="cityLocation">City</label>
        <input
          type="text"
          id="cityLocation"
          name="cityLocation"
          placeholder="Please enter a City"
          value={this.props.eventState.locationCity.city ? this.props.eventState.locationCity.city : ''}
          onChange={e => {
            let state = this.props.eventState.locationCity.state ? this.props.eventState.locationCity.state : '';
            this.props.dispatch(updateNewEventState({
              locationCity: {city: e.target.value, state}
            }));
            this.setState({locationOption: 0}, () => this.props.dispatch(newEventErrorMessage(null)));
          }}
          onBlur={() => this.validateCity()}
        />

        {locationMessage}

        <label htmlFor="eventDescription">
                  Enter a short description for your event:
          <textarea rows="4" cols="50" name="eventDescription" 
            value={this.props.eventState.description} 
            onChange={e => this.props.dispatch(updateNewEventState({description: e.target.value}))}
          />
        </label>
              
        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>
        <button type='submit'>
          Next Page
        </button>
      </form>
    </div>
  );
  }
}
