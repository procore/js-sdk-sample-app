import React from 'react';
import { shallow } from 'enzyme';
import { Application } from './Application';

describe('Given an Application', () => {
  it('Renders Hello, World', () => {
    const wrapper = shallow(<Application />);
    expect(wrapper).toHaveText('Hello, World!');
  });
});
