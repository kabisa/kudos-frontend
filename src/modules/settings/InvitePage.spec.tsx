import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, withMockedProviders } from '../../spec_helper';
import { InvitePage } from './InvitePage';

describe('<InvitePage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<InvitePage />));
  });

  it('renders without crashing', () => {
    expect(findByTestId(wrapper, 'create-invites').length).toBe(1);
  });
});
