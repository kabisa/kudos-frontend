import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { KudometerRow } from './KudometerRow';
import { DELETE_KUDOMETER, GET_KUDOMETERS, Kudometer } from './KudometerQuerries';

const kudometer: Kudometer = {
  id: '1',
  name: 'First kudometer',
  goals: [],
};

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: DELETE_KUDOMETER,
      variables: { id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deleteKudosMeter: {
            kudosMeterId: '1',
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
    result: () => {
      queryCalled = true;
      return {
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
      };
    },
  },
];

describe('<KudometerRow />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;
  const viewButtonHandler = jest.fn();
  const deleteHandler = jest.fn();

  beforeEach(() => {
    mutationCalled = false;
    queryCalled = false;
    wrapper = mount(withMockedProviders(
      <table>
        <tbody>
          <KudometerRow
            key="1"
            kudometer={kudometer}
            viewButtonClickHandler={viewButtonHandler}
            deleteKudometerHandler={deleteHandler}
          />
        </tbody>
      </table>,
      mocks,
    ));
  });

  it('shows the kudometer name', () => {
    expect(wrapper.containsMatchingElement(<td>First kudometer</td>)).toBe(true);
  });

  it('opens the goals', async () => {
    await act(async () => {
      findByTestId(wrapper, 'goal-button').hostNodes().simulate('click');

      await wrapper.update();

      expect(viewButtonHandler).toBeCalledTimes(1);
    });
  });

  it('has a confirm delete button', async () => {
    await act(async () => {
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'confirm-delete-button').hostNodes().length).toBe(1);
    });
  });

  it('calls the delete mutation', async () => {
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
