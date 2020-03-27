import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../../spec_helper';
import { GoalRow } from './GoalRow';
import { DELETE_GOAL, GET_KUDOMETERS, Goal } from '../KudometerQuerries';

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_GOAL,
      variables: { id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {},
      };
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: '1' },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {},
      };
    },
  },
];

const goal: Goal = {
  id: '1',
  name: 'Hapje eten',
  amount: 100,
};

describe('<GoalRow />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;
  const editGoalMock = jest.fn(() => 1);

  beforeEach(() => {
    mutationCalled = false;
    queryCalled = false;
    wrapper = mount(withMockedProviders(<GoalRow key={goal.id} goal={goal} editGoal={editGoalMock} />, mocks));
  });

  it('renders all the information', () => {
    expect(wrapper.containsMatchingElement(<td>{goal.name}</td>)).toBe(true);
    expect(wrapper.containsMatchingElement(<td>{goal.amount}</td>)).toBe(true);
  });

  it('calls the dit goal function', async () => {
    await act(async () => {
      findByTestId(wrapper, 'edit-button').hostNodes().simulate('click');

      expect(editGoalMock).toBeCalledTimes(1);
    });
  });

  it('has a delete confirm button', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'confirm-delete-button').hostNodes().length).toBe(1);
    });
  });

  it('calls the delete mutation and the refetch query', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, 'confirm-delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
    });
  });
});
