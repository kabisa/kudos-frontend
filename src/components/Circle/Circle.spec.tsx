import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, withMockedProviders } from '../../spec_helper';
import CustomCircle from './Circle';

describe('<CustomCircle />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<CustomCircle
      percent={50}
      currentKudos={200}
      neededKudos={500}
      goal="Some goal"
    />));
  });

  it('renders the correct current kudo amount', () => {
    const summary = findByTestId(wrapper, 'current-kudos');

    expect(summary.text()).toBe('200₭');
  });

  it('renders the correct goal', () => {
    const goal = findByTestId(wrapper, 'goal-kudos');

    expect(goal.text()).toBe('of 500₭ for Some goal');
  });
});
