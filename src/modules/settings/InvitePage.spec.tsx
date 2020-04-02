import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { findByTestId, withMockedProviders } from '../../spec_helper';
import { InvitePage } from './InvitePage';

describe('<InvitePage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(withMockedProviders(<InvitePage />));
    });
  });

  it('renders without crashing', () => {
    expect(findByTestId(wrapper, 'create-invites').length).toBe(1);
  });
});
