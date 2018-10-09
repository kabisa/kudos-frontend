import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { ChooseTeamPage } from './ChooseTeamPage';

function setup() {
  const props = {};

  const enzymeWrapper = mount(
    <MemoryRouter>
      <ChooseTeamPage {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('ChooseTeamPage', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
