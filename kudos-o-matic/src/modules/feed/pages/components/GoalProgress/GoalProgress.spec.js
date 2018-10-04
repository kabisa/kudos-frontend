import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { GoalProgress } from './GoalProgress';

function setup() {
  const props = {
    getGoalProgress: jest.fn(() => 50),
    goalPercentageSuccess: true
  };

  const enzymeWrapper = mount(
    <MemoryRouter>
      <GoalProgress {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

it('should render self and subcomponents', () => {
  const { enzymeWrapper } = setup();

  expect(enzymeWrapper.find('a').hasClass('kudo-progress')).toBe(true);

  expect(
    enzymeWrapper
      .find('a')
      .find('div')
      .first()
      .hasClass('kudo-progress-bar')
  ).toBe(true);

  expect(
    enzymeWrapper
      .find('a')
      .find('div')
      .last()
      .hasClass('kudo-progress-bar-negative')
  ).toBe(true);
});
