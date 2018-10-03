import React from 'react';
import moment from 'moment';
import DateList from './DateList';
import {updateNewEventState} from '../../actions/New-Event';
import './Calendar/less/calendar-time.css';

// import 'react-datepicker/dist/react-datepicker.css';
import {MdAddCircleOutline} from 'react-icons/lib/md';
import '../styles/DateTime.css';
import { InputMoment } from './Calendar';
import {
  Box,
  Flex,
  Card,
  Button,
  Image,
  Heading,
  Text
} from 'rebass';



export default class DateSelectPage extends React.Component {

  constructor(props) {
    super(props);
      
    this.state = {
      inputMoment: moment(),
      thisTime: moment(),
      showSeconds: true,
      locale: 'en',
      size: 'small'
    };
  }


  handleSave = () => {
    let currentTime = moment();
    //Error Handling...
    if (this.state.inputMoment < currentTime) {
      return this.props.dispatch(updateNewEventState({
        errorMessage: 'No time-travel! Select a future date/time.'
      }));
    } else if (this.props.eventState.scheduleOptions.find(date => date.date === this.state.inputMoment.format('llll'))) {
      return this.props.dispatch(updateNewEventState({
        errorMessage: 'That date/time is already an option.'
      }))
    }

    //Update the Redux state
    this.props.dispatch(updateNewEventState({
      errorMessage: '',
      scheduleOptions: [
        ...this.props.eventState.scheduleOptions, 
        {date: this.state.inputMoment.format('llll'), votes: 0}
      ]
    }));
  };
     

  handleNextPage = () => {
    if (this.props.eventState.scheduleOptions.length === 0) {
      this.props.dispatch(updateNewEventState({errorMessage: 'Must select a time.'}));
    } else {
      this.props.nextPage();
    }
  }

  render(){
    let {inputMoment, showSeconds, locale, size} = this.state;

    console.log( (this.state.thisTime.format('llll') == this.state.inputMoment.format('llll') ? 'true' : 'false')); 
    return (
      <div className="container">
        <div className="width1100">

            <div className="card border-right">
            <h2>Some good times for {this.props.eventState.title} are... </h2>
              <p>Select possible dates and times for your event by selecting a date fom the date tab and then a time from the time tab. You can add multiple dates and times!</p>
              <InputMoment
                moment={inputMoment}
                locale={locale}
                showSeconds={showSeconds}
                onChange={date => this.setState({inputMoment: date})}
              />
            </div>
            {/* <input
                className="output"
                type="text"
                value={inputMoment.format('llll')}
                readOnly
              /> */}

             
            <div className="card">
             <h3>Selected Date:</h3>
         
             <p className='selected-date-text'><strong>{ (this.state.inputMoment.format('llll') === this.state.thisTime.format('llll')) ? 'No time selected' : inputMoment.format('llll')}</strong></p>
             <button onClick={this.handleSave}>
             <MdAddCircleOutline />
             Add this time
              </button>
            
             <h3>Added Dates:</h3>
            
             
            
              <div className="dateList">
                <DateList dateList={this.props.eventState.scheduleOptions} dispatch={this.props.dispatch}/>
              </div>
              </div>


              <p className='error-message'>{this.props.eventState.errorMessage}</p>

 
        </div>

        <button type='button' onClick={() => this.props.prevPage()}>
          {'<-'} Back
        </button>
         
        <button onClick={ () => this.handleNextPage()}>
          Next Page
        </button>
      
      </div>

            
    );
  }
   
}

