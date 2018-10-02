import React from 'react';
import moment from 'moment';
import DateList from './DateList';
import {updateNewEventState} from '../../actions/New-Event';
import './Calendar/less/calendar-time.css';
// import 'react-datepicker/dist/react-datepicker.css';
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
    console.log("FROM PAGE 2: DATESELECTPAGE", this.props);
    //this.props.eventState.draft
    let {inputMoment, showSeconds, locale, size} = this.state;
    return (
      <div className="container">
        <div className="width1100">
          <Flex flexWrap='wrap'>
            <Card
              fontSize={[2,3,4]}
              fontWeight='bold'
              border='1px dashed grey'
              width={[ 1, 1, 1/2, 1/2]}
              p={4}
              my={5}
              bg='#ffffff'
              borderRadius={6}
            >
            
              <Text textAlign='left' fontSize={[ 1, 1, 1 ]}>Select a date and time. You can add multiple dates and times!</Text>
            
              <input
                className="output"
                type="text"
                value={inputMoment.format('llll')}
                readOnly
              />
              <button onClick={this.handleSave}>
                 Add this date
              </button>
              <div className="dateList">
                <DateList dateList={this.props.eventState.scheduleOptions} dispatch={this.props.dispatch}/>
              </div>

              <p className='error-message'>{this.props.eventState.errorMessage}</p>
                  
            </Card>

          
            <Card
              fontSize={4}
              fontWeight='bold'
              width={[ 1, 1, 1/2,1/2  ]}
              p={5}
              my={5}
              bg='#ffffff'
              borderRadius={6}
              border='1px dashed grey'>
              <InputMoment
                moment={inputMoment}
                locale={locale}
                showSeconds={showSeconds}
                onChange={date => this.setState({inputMoment: date})}
              />
            </Card>
          </Flex>
  
        
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

