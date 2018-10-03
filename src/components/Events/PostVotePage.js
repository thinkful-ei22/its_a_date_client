import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export class PostVote extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false
    };
    setTimeout(()=>this.setState({redirect:true}), 5000);
  }

  

  render(){
    if(this.state.redirect){
      return <Redirect to='/'/>;
    }
    return (    
      <div className="container paddingTop">
          Thanks for your input!
          Your event coordinator will be in touch with the final plan!
      </div>
                    
    );
  }     
  
}

export default connect()(PostVote);