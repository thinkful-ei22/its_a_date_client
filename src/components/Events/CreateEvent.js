
import React from 'react';
// import {Field, reduxForm, focus} from 'redux-form';
import '../styles/CreateEvent.css'
export function CreateEvent(props) {
    return (
        <form
            className="event-form"
            onSubmit={e=>{
                e.preventDefault();
            }
        }>
            <label htmlFor="eventName">Event Name</label>
            <input
                type="eventName"
                id="eventName"
                name="eventName"
                placeholder="Get together"
                
            />
            <label htmlFor="location">Location</label>
            <input
                type="Location"
                id="Location"
                name="Location"
                placeholder="Please enter a location"
            />

            <label>
                Enter a short description for your event:
                <textarea />
            </label>
            <button>
                Next Page
            </button>
        </form>
    );
}
