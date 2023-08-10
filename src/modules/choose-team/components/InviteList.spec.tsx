import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { wait } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { findByTestId, withMockedProviders } from '../../../spec_helper';
import { InviteList } from './index';
import { GET_INVITES } from './InviteList';

const mockWithInvites = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          teamInvites: [
            {
              id: '1',
              team: {
                id: '1',
                name: 'Kabisa',
              },
            },
            {
              id: '2',
              team: {
                id: '2',
                name: 'Dovetail',
              },
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
      query: GET_INVITES,
    },
    error: new Error('It broke'),
  },
];

const mockWithoutInvites = [
  {
    request: {
      query: GET_INVITES,
    },
    result: {
      data: {
        viewer: {
          teamInvites: [],
        },
      },
    },
  },
];


describe('<InviteList />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<InviteList />, mockWithInvites));
  });

  it('renders the loading state', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('renders the invites', async () => {
    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(wrapper.find('[data-testid="kudo-invite"]').length).toBe(2);
    });
  });

  it('shows a message when there are no invites', async () => {
    wrapper = mount(withMockedProviders(<InviteList />, mockWithoutInvites));

    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(findByTestId(wrapper, 'kudo-invite').length).toBe(0);
      expect(wrapper.containsMatchingElement(<p>No invites.</p>)).toBe(true);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<InviteList />, mocksWithError));

    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(findByTestId(wrapper, 'error-message').text()).toBe('Network error: It broke');
    });
  });
});
