import React from 'react';
import { updateNewEventState } from '../../actions/New-Event';


export default function Datelist (props){

    if(props  === undefined ){
      return null;   
    }

    function deleteWhenClicked(event){
      const dateString = event.target.innerHTML;
      const indexToDelete = props.dateList.findIndex(date => date.date === dateString);
      const filteredTimes = props.dateList.filter((date, index) => index !== indexToDelete)
      props.dispatch(updateNewEventState({scheduleOptions: filteredTimes}));
    }
      
    return (
      <ul className="date_list" aria-live="polite">
        {
          props.dateList.map((date,index)=>{
              
            return (
              <li className="date-list-item" 
                key={index} 
                onClick={e => deleteWhenClicked(e)}
              >
                {date.date}
                {/* {word.lapineWord} : {Math.floor(word.percentCorrect)} %  */}
                 
              </li>
            );
          })
        } 
      </ul>
    );
}
