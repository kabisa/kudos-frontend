import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, simulateInputChange, wait, withMockedProviders,
} from '../../../../spec_helper';
import KudometerSection from './KudometerSection';
import { CREATE_KUDOMETER, GET_KUDOMETERS } from './KudometerQuerries';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: CREATE_KUDOMETER,
      variables: {
        name: 'Test kudometer',
        team_id: '1',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          createKudosMeter: {
            kudosMeter: {
              id: '1',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          kudosMeters: [
            {
              id: '1',
              name: 'First kudometer',
              goals: [],
            },
            {
              id: '2',
              name: 'Second kudometer',
              goals: [],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          kudosMeters: [
            {
              id: '1',
              name: 'First kudometer',
              goals: [],
            },
            {
              id: '2',
              name: 'Second kudometer',
              goals: [],
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
      query: GET_KUDOMETERS,
      variables: { team_id: '1' },
    },
    error: new Error('Something went wrong'),
  },
];

const mocksWithoutData = [
  {
    request: {
      query: GET_KUDOMETERS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          kudosMeters: [],
        },
      },
    },
  },
];

describe('<KudometerSection />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage('1');
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<KudometerSection />, mocks));
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('shows a loading state', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('shows when there are no kudometers', async () => {
    wrapper = mount(withMockedProviders(<KudometerSection />, mocksWithoutData));
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<td>No kudometers available</td>)).toBe(true);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<KudometerSection />, mocksWithError));
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: Something went wrong</p>)).toBe(true);
    });
  });

  it('shows a row for each kudometer', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'kudometer-row').length).toBe(2);
    });
  });

  it('handles name input correctly', async () => {
    const component = wrapper.find('KudometerSection').instance();

    await act(async () => {
      // @ts-ignore
      expect(component.state.name).toBe('');
      simulateInputChange(wrapper, 'name-input', 'name', 'Test kudometer');

      await wrapper.update();

      // @ts-ignore
      expect(component.state.name).toBe('Test kudometer');
    });
  });

  it('calls the create mutation', async () => {
    const component = wrapper.find('KudometerSection').instance();

    await act(async () => {
      component.setState({ name: 'Test kudometer' });

      await wrapper.update();

      findByTestId(wrapper, 'create-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('doesnt call the mutation if the name is empty', async () => {
    await act(async () => {
      findByTestId(wrapper, 'create-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(false);
    });
  });

  it('sets the selected kudometer', async () => {
    const component: any = wrapper.find('KudometerSection').instance();

    await act(async () => {
      expect(component.state.kudometer).toBe(undefined);

      component.handleViewGoalButtonClick({ id: '1', name: 'Kudometer', goals: [] });

      await wrapper.update();

      expect(component.state.selected.id).toBe('1');
    });
  });

  it('deselects the selected kudometer', async () => {
    const component: any = wrapper.find('KudometerSection').instance();

    await act(async () => {
      component.setState({ selected: { id: '1', name: 'test', goals: [] } });

      await wrapper.update();

      component.handleViewGoalButtonClick({ id: '1', name: 'test', goals: [] });

      await wrapper.update();

      expect(component.state.selected).toBe(undefined);
    });
  });
});
