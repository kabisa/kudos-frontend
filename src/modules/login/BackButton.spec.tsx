import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { withMockedProviders } from '../../spec_helper';
import BackButton from './BackButton';

describe('<BackButton />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<BackButton />));
  });

  it('render the correct text', () => {
    expect(wrapper.contains('Back')).toBe(true);
  });
});
