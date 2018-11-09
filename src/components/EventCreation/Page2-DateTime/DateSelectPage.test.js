import React from 'react';
import { connect } from 'react-redux';
import  DateSelectPage  from  './DateSelectPage';
import {shallow, mount} from 'enzyme';
const renderer = require('react-test-renderer');



function setup() {
  const props = {
    eventState: {
      location:{
        latitude: jest.fn(),
        longitude: jest.fn()
      },
      restaurantOptions: jest.fn(),
      scheduleOptions: jest.fn(),
    },
    restaurants: {
      yelpRestaurants: jest.fn()
    },
    newEvent: 
     {
       restaurants: {
         yelpRestaurants: jest.fn()
       }
     },

    dispatch: jest.fn()
  }

  
  const enzymeWrapper = mount(<DateSelectPage {...props} />)

  return {
    props,
    enzymeWrapper
  };
}


describe('components', () => {
  describe('DateSelectPage', () => {
    it('should render self and not Datelist if there are no dates to populate', () => {
      const { enzymeWrapper } = setup();
     
      expect(enzymeWrapper.find('DateList').exists()).toBe(false);

    });
  });
});
