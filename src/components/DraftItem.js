import React from 'react';
import { connect, mapStateToProps } from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import { MdEdit } from 'react-icons/lib/md';
import './styles/Index.css';
import { loadDraftIntoReduxState } from '../actions/Edit-Draft';

 class DraftItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    
    }
    
  }
  //LOADS DRAFT INTO 'newEvent' of Redux state and redirects page to edit
 addDraftToReduxState(updateObject, pageCount){
     localStorage.removeItem('eventDraft');
      this.props.dispatch(loadDraftIntoReduxState(updateObject));

        this.props.history.push({
          pathname: '/edit-draft',
          state: {pageCount}
        });
  }

  toggleEventDetails(bool){
    this.setState(
      {showDetails: bool}
    )
  }

  render(){
    
    if(this.state.showDetails){
      return(

        <li className='user-event'>
<h2>{this.props.event.title}</h2>
     
          <MdEdit
          className="edit-event-info"
          onClick={()=>this.addDraftToReduxState(this.props.event, 1)}
          />
    
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(false)}>See Details</button>
          <div className='date-options'>
            <p>Date/Time options:</p>
                 <MdEdit
                 className="edit-schedule-options"
                onClick={()=>this.addDraftToReduxState(this.props.event, 2)}/>
            
            {this.props.event.scheduleOptions.map((date,i) =>{
                console.log(date);
                return(
                    <div key={i} className='date-vote'>
                      <p>Date: {date.date}</p>
                      <p>Votes: {date.votes}</p>
                    </div>
                );
                
              })
            }
          </div>
          <div className='date-options'>
            <p>Restaurant options:</p>
                 <MdEdit
                 className="edit-restaurant-options"
                onClick={()=>this.addDraftToReduxState(this.props.event, 3)}/>

            {this.props.event.restaurantOptions.map((food,i) =>{
                return(
                  <div key={i} className='date-vote'>
                    <a href={food.website} target="_blank">{food.name}</a>
                    <p>Votes: {food.votes}</p>
                  </div>
                );
              })
            }
          </div>
        </li>
      )
    }  
    else{
      return(
        <li className='user-event'>
            
          <h2>{this.props.event.title}</h2>
          <MdEdit
               className="edit-event-info"
               onClick={()=>this.addDraftToReduxState(this.props.event, 1)} />
          <p>{this.props.event.description}</p>
          <button onClick={()=> this.toggleEventDetails(true)}>See Details</button>
        </li>
      )
    }    
  }
}

export default withRouter(connect()(DraftItem));