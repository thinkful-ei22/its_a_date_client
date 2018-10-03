import React from 'react';
import './styles/AboutPage.css';
import {Link} from 'react-router-dom';
export default class AboutPage extends React.Component {

    render(){ 
        return(
            <div className="container">
   
            <div className="about-info">
          
             
          
            <h1>Easy as 1, 2, 3 </h1>
            <p>
            <strong>Goodtimes</strong> simplifies planning get-togethers for large groups of friends by collecting
            the big questions - when?, where?, what-to-eat?, what to do? -
            into a simple multiple choice survey that you can then email to your friends. 
            Tally up the votes - bam!- <em>let the good times roll.</em>
            </p>
            <hr></hr>
            <div className="about-icon-container" >
                <div className="boxItem">
                  <img src="./assets/calendarcolor.png" />
                  <strong>Select dates</strong>
                </div>

                <div className="boxItem">
                <img src="./assets/foodcolor.png" />
                <strong>Select dining</strong>
                </div>

                <div className="boxItem">
                    <img src="./assets/eventcolor.png" />
                    <strong>Select events</strong>
                </div>

            </div>
            <hr></hr>
              <div >
               <strong> Voila! Send your completed form to your friends via email directly from the website or share it via the generated link!</strong>
                <h3>   <Link to="/register"> Sign up </Link>to get started. </h3> 
                </div>  
        
            {/* <strong>The five steps:</strong>
                <ul>
                    <li>Create a new event and provide location details</li>
                    <li>Choose dates and times</li>
                    <li>Choose a place to eat</li>
                    <li>Choose events</li>
                    <li>Send your friends the newly created form</li>
                </ul>
                <hr></hr>
               <h3>Voila! <Link to="/register"> Sign up </Link>to get started. </h3>   */}
        
             
             </div>
 
                  <div className="bg"></div>
          </div>

        )
    }
}