import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
    it('should display the page title name', () => {
        const wrapper = shallow(<App />);
        const text = wrapper.find('h1').text();
        expect(text).toEqual('Business Intelligency');
    });
});
