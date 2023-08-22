import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GET_TEAMS } from './TeamList';
import { findByTestId, wait, withMockedProviders } from '../../../spec_helper';
import { TeamList } from './index';

const mocksWithInvite = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          memberships: [
            {
              id: '1',
              role: 'admin',
              team: {
                id: '2',
                name: 'Team 1',
              },
            },
            {
              id: '2',
              role: 'admin',
              team: {
                id: '2',
                name: 'Team 2',
              },
            },
          ],
        },
      },
    },
  },
];

const mocksWithoutInvite = [
  {
    request: {
      query: GET_TEAMS,
    },
    result: {
      data: {
        viewer: {
          memberships: [],
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_TEAMS,
    },
    error: new Error('It broke'),
  },
];


describe('<TeamList />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    act(() => {
      wrapper = mount(withMockedProviders(<TeamList />, mocksWithInvite));
    });
  });

  it('renders the loading text', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('renders the team list', async () => {
    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(findByTestId(wrapper, 'kudo-teamivite').length).toBe(2);
    });
  });

  it('shows a message when there are no teams', async () => {
    wrapper = mount(withMockedProviders(<TeamList />, mocksWithoutInvite));

    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(findByTestId(wrapper, 'kudo-teaminvite').length).toBe(0);
      expect(wrapper.containsMatchingElement(<p>No teams.</p>)).toBe(true);
    });
  });

  it('shows a message when there is an error', async () => {
    wrapper = mount(withMockedProviders(<TeamList />, mocksWithError));

    await act(async () => {
      await wait(0);
      wrapper.update();

      expect(wrapper.containsMatchingElement(<p>It broke</p>)).toBe(true);
    });
  });
});
