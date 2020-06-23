import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { withMockedProviders } from '../../../spec_helper';
import RightRail from './RightRail';

describe('<RightRail />', () => {
  let wrapper: ReactWrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(withMockedProviders(<RightRail />));
    });
  });

  it('renders the statistics section', () => {
    expect(wrapper.find('Statistics').length).toBe(1);
  });
});
