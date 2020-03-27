import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { withMockedProviders } from '../../spec_helper';
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

  it('render the correct text', () => {
    expect(wrapper.containsMatchingElement(<h2>200₭ od 500₭ for Some goal</h2>));
  });
});
