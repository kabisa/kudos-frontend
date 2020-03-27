import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, mockLocalstorage, withMockedProviders } from '../../spec_helper';
import Mobile from './Mobile';

let wrapper: ReactWrapper;
const setup = () => {
  wrapper = mount(withMockedProviders(<Mobile />));
};

describe('<Mobile />', () => {
  mockLocalstorage('fakeToken');

  beforeEach(() => {
    setup();
  });

  it('should have a button to the settings page', () => {
    expect(findByTestId(wrapper, 'settings-button').length).toBe(1);
  });

  it('should have a button to the profile page', () => {
    expect(findByTestId(wrapper, 'profile-button').length).toBe(1);
  });

  it('should have a button to the feed page if the user is logged in', () => {
    expect(findByTestId(wrapper, 'home-button').length).toBe(1);
  });

  it('should have a button to the statistics page if the user is logged in', () => {
    expect(findByTestId(wrapper, 'statistics-button').length).toBe(1);
  });

  it('should have a button to the notifications page if the user is logged in', () => {
    expect(findByTestId(wrapper, 'notifications-button').length).toBe(1);
  });

  it('should not have a button to the feed, statistics and notifications page if the user is not logged in', () => {
    mockLocalstorage('');
    setup();
    expect(findByTestId(wrapper, 'home-button').length).toBe(0);
    expect(findByTestId(wrapper, 'notifications-button').length).toBe(0);
    expect(findByTestId(wrapper, 'statistics-button').length).toBe(0);
  });
});
