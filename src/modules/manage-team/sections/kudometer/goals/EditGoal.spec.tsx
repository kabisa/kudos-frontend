import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId,
  mockLocalstorage,
  simulateInputChange,
  wait,
  withMockedProviders,
} from '../../../../../spec_helper';
import { EditGoal } from './EditGoal';
import { CREATE_GOAL, GET_KUDOMETERS, UPDATE_GOAL } from '../KudometerQuerries';

let createMutationCalled = false;
let updateMutationCalled = false;
const mocks = [
  {
    request: {
      query: CREATE_GOAL,
      variables: {
        name: 'first goal',
        amount: 100,
        kudometer: '1',
      },
    },
    result: () => {
      createMutationCalled = true;
      return {
        data: {
          createGoal: {
            goal: {
              id: '1',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: UPDATE_GOAL,
      variables: {
        name: 'second goal',
        amount: 200,
        goalId: '2',
      },
    },
    result: () => {
      updateMutationCalled = true;
      return {
        data: {
          updateGoal: {
            goal: {
              id: '2',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: {
        team_id: '1',
      },
    },
    result: () => ({
      data: {
        teamById: {
          kudosMeters: [
            {
              id: '1',
              name: 'Kudometer',
              goals: [
                {
                  id: '1',
                  amount: 100,
                  name: 'Uit eten',
                },
              ],
            },
          ],
        },
      },
    }),
  },
];

const mocksWithErrors = [
  {
    request: {
      query: CREATE_GOAL,
      variables: {
        name: 'first goal',
        amount: 100,
        kudometer: '1',
      },
    },
    error: new Error('it broke'),
  },
];

describe('<EditGoal />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    createMutationCalled = false;
    updateMutationCalled = false;

    wrapper = mount(withMockedProviders(<EditGoal kudometerId="1" />, mocks));
  });

  it('has a empty initial state', () => {
    const component: any = wrapper.find('EditGoal').instance();

    expect(component.state.editing).toBe(false);
    expect(component.state.goalKudos).toBe('');
    expect(component.state.goalName).toBe('');
  });

  it('sets the state correctly', () => {
    const component: any = wrapper.find('EditGoal').instance();
    component.setEditState('2', '200', 'second goal');

    expect(component.state.editing).toBe(true);
    expect(component.state.editGoalName).toBe('second goal');
    expect(component.state.editGoalKudos).toBe('200');
    expect(component.state.editGoalId).toBe('2');
  });

  it('updates the edit goal when editing is true', async () => {
    const component: any = wrapper.find('EditGoal').instance();

    await act(async () => {
      component.setState({ editing: true });

      await wrapper.update();

      expect(component.state.editGoalName).toBe('');

      simulateInputChange(wrapper, 'goal-name', 'editGoalName', 'updated name');

      await wrapper.update();

      expect(component.state.editGoalName).toBe('updated name');
    });
  });

  it('Calls the create mutation if editing is false', async () => {
    const component: any = wrapper.find('EditGoal').instance();

    await act(async () => {
      component.setState({
        editing: false,
        goalKudos: '100',
        goalName: 'first goal',
      });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(createMutationCalled).toBe(true);
      expect(updateMutationCalled).toBe(false);
    });
  });

  it('Calls the update mutation if editing is true', async () => {
    const component: any = wrapper.find('EditGoal').instance();

    await act(async () => {
      component.setState({
        editing: true,
        editGoalId: '2',
        editGoalKudos: '200',
        editGoalName: 'second goal',
      });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(createMutationCalled).toBe(false);
      expect(updateMutationCalled).toBe(true);
    });
  });

  it('Shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<EditGoal kudometerId="1" />, mocksWithErrors));
    const component: any = wrapper.find('EditGoal').instance();

    await act(async () => {
      component.setState({
        editing: false,
        goalKudos: '100',
        goalName: 'first goal',
      });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Network error: it broke</p>));
    });
  });

  it('cancels the editing with the cancel button', async () => {
    const component: any = wrapper.find('EditGoal').instance();

    await act(async () => {
      component.setState({ editing: true });

      await wait(0);
      await wrapper.update();

      findByTestId(wrapper, 'cancel-button').hostNodes().simulate('click');

      await wrapper.update();

      expect(component.state.editing).toBe(false);
    });
  });
});
