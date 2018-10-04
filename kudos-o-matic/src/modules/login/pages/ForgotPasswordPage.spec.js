import React from 'react';
import { shallow } from 'enzyme';

import { ForgotPasswordPage } from './ForgotPasswordPage';

function setup() {
  const props = {
    forgotPassword: jest.fn(),
    loading: false
  };

  const enzymeWrapper = shallow(<ForgotPasswordPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('ForgotPasswordPage', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
