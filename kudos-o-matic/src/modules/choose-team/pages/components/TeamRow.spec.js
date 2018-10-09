import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import TeamRow from './TeamRow';

function setup() {
  const props = {};

  const enzymeWrapper = mount(
    <MemoryRouter>
      <TeamRow {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('TeamRow', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
