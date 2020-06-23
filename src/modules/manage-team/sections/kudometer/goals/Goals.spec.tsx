import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, withMockedProviders } from '../../../../../spec_helper';
import { Goals } from './Goals';
import { Goal, Kudometer } from '../KudometerQuerries';

const goals: Goal[] = [
  {
    id: '1',
    name: 'Hapje eten',
    amount: 100,
  },
  {
    id: '2',
    name: 'Bowlen',
    amount: 200,
  },
  {
    id: '3',
    name: 'Reisje naar hawaii',
    amount: 300,
  },
];

const kudometer: Kudometer = {
  goals,
  id: '1',
  name: 'First kudometer',
};


describe('<Goals />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<Goals kudometer={kudometer} />));
  });

  it('renders the edit goal section', () => {
    expect(findByTestId(wrapper, 'goal-edit').length).toBe(1);
  });

  it('renders the kudometer name', () => {
    const expected = <h1>Goals for Kudometer First kudometer</h1>;
    expect(wrapper.containsMatchingElement(expected)).toBe(true);
  });

  it('renders a row for each goal', () => {
    expect(findByTestId(wrapper, 'goal-row').length).toBe(3);
  });
});
