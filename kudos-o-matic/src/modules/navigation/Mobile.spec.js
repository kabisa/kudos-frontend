import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Mobile from './Mobile';

function setup() {
  const props = {};

  const enzymeWrapper = mount(
    <MemoryRouter>
      <Mobile {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('Mobile', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
