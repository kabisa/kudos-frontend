import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from './LoginPage';

function setup() {
  const props = {
    login: jest.fn(),
    loading: false,
    error: false,
    isLoggedIn: false
  };

  const enzymeWrapper = shallow(<LoginPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('LoginPage', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
