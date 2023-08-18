import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Context as ResponsiveContext } from 'react-responsive'
import BackButton from './BackButton';

describe('<BackButton />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      // Because the component is wrapped with react-responsive components we need
      // to provide a mock value for the browser width.
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <BackButton />
      </ResponsiveContext.Provider> 
    );
  });

  it('render the correct text', () => {
    expect(wrapper.contains('Back')).toBe(true);
  });
});
