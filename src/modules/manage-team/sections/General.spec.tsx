import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, simulateInputChange, wait, withMockedProviders,
} from '../../../spec_helper';
import GeneralSection, { GET_TEAM_NAME, UPDATE_TEAM } from './General';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          name: 'Kabisa',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_TEAM,
      variables: { name: 'Dovetail', team_id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          updateTeam: {
            team: {
              id: '1',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          name: 'Kabisa',
        },
      },
    },
  },

];

const mocksWithError = [
  {
    request: {
      query: GET_TEAM_NAME,
      variables: { id: '1' },
    },
    error: new Error('something went wrong'),
  },
];

describe('<GeneralSection />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<GeneralSection />, mocks));
  });

  it('shows when the query is loading', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<GeneralSection />, mocksWithError));

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: something went wrong</p>));
    });
  });

  it('renders the team name', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<h1>Kabisa</h1>)).toBe(true);
    });
  });

  it('handles input correctly', async () => {
    const component: any = wrapper.find('GeneralSection').instance();

    await act(async () => {
      await wait(0);
      await wrapper.update();
      expect(component.state.name).toBe('');

      simulateInputChange(wrapper, 'name-input', 'name', 'Dovetail');

      await wrapper.update();
      expect(component.state.name).toBe('Dovetail');
    });
  });

  it('calls the update mutation', async () => {
    const component = wrapper.find('GeneralSection').instance();

    await act(async () => {
      await wait(0);
      await wrapper.update();

      component.setState({ name: 'Dovetail' });

      await wrapper.update();
      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
