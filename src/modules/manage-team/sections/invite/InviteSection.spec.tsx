import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { InviteSection, QUERY_GET_INVITES } from './InvitesSection';

const mocks = [
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          teamInvites: [
            {
              acceptedAt: '2020-3-15',
              declinedAt: '',
              email: 'max@example.com',
              id: 1,
              sentAt: '2020-03-10',
            },
            {
              acceptedAt: '2020-3-16',
              declinedAt: '',
              email: 'egon@example.com',
              id: 2,
              sentAt: '2020-03-11',
            },
          ],
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: { team_id: '1' },
    },
    error: new Error('it broke'),
  },
];

describe('<InviteSection />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<InviteSection />, mocks));
  });

  it('shows a loading message', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<InviteSection />, mocksWithError));
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: it broke</p>)).toBe(true);
    });
  });

  it('renders a row for each invite', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'invite-row').length).toBe(2);
    });
  });

  it('renders the add invites section', () => {
    expect(findByTestId(wrapper, 'create-invite').length).toBe(1);
  });
});
