import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GET_GOAL_PERCENTAGE } from '../../queries';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { GoalProgress } from '../index';

const mocks = [
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          activeKudosMeter: {
            amount: 5,
          },
          activeGoals: [
            {
              id: 1,
              amount: 10,
              name: 'Goal 1',
              achievedOn: '',
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
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: '1' },
    },
    error: new Error('It broke'),
  },
];

describe('<GoalProgress />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    act(() => {
      wrapper = mount(withMockedProviders(<GoalProgress />, mocks));
    });
  });

  it('renders the loading bar', () => {
    expect(findByTestId(wrapper, 'loading').length).toBe(1);
  });

  it('should have an open lock icon', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'open-lock').hostNodes().length).toBe(1);
    });
  });

  it('should have a closed lock icon', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'closed-lock').hostNodes().length).toBe(1);
    });
  });

  it('should have a progress bar', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'progress-line').hostNodes().length).toBe(1);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<GoalProgress />, mocksWithError));

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<span>Network error: It broke</span>)).toBe(true);
    });
  });
});
