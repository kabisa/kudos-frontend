import React from 'react';
import { mount } from 'enzyme';

import UserDropdown from './UserDropdown';

function setup() {
  const props = {
    onChange: jest.fn()
  };

  const enzymeWrapper = mount(<UserDropdown {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('UserDropdown', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
