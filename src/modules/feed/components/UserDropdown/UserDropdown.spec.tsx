import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import DropdownRemote from './UserDropdown';
import { GET_USERS } from '../../queries';

const mocksWithData = [
  {
    request: {
      query: GET_USERS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          users: [
            {
              id: '1',
              name: 'Max',
              virtualUser: false,
            },
            {
              id: '2',
              name: 'Egon',
              virtualUser: false,
            },
            {
              id: '3',
              name: 'Kabisa',
              virtualUser: true,
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
      query: GET_USERS,
      variables: { team_id: '1' },
    },
    error: new Error('It broke'),
  },
];

const mocksWithoutData = [
  {
    request: {
      query: GET_USERS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          users: [],
        },
      },
    },
  },
];


let wrapper: ReactWrapper;
const handleChangeMock = jest.fn();

const setup = (mocks: any) => {
  wrapper = mount(withMockedProviders(<DropdownRemote onChange={handleChangeMock} error={false} />, mocks));
};

describe('<DropdownRemote />', () => {
  beforeEach(() => {
    mockLocalstorage('1');
    setup(mocksWithData);
  });

  it('shows when the users are loading', async () => {
    expect(findByTestId(wrapper, 'user-dropdown').hostNodes().hasClass('loading')).toBe(true);
  });

  it('shows when there is an error', async () => {
    setup(mocksWithError);

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'user-dropdown').hostNodes().hasClass('error')).toBe(true);
    });
  });

  it('shows when there are no users', async () => {
    setup(mocksWithoutData);

    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'user-dropdown').find('div.item').length).toBe(0);
    });
  });

  it('creates an option for each user', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'user-dropdown').find('div.item').length).toBe(3);
    });
  });

  it('handles change correctly', async () => {
    const component: any = wrapper.find('Dropdown').instance();

    await act(async () => {
      expect(component.state.value).toStrictEqual([]);

      await wait(0);
      await wrapper.update();

      // @ts-ignore
      wrapper.find('Dropdown').prop('onChange')(undefined, { value: ['1'] });

      await wrapper.update();

      expect(component.state.value).toStrictEqual(['1']);
    });
  });

  it('handles change correctly when an id is not a number', async () => {
    const component: any = wrapper.find('Dropdown').instance();

    await act(async () => {
      expect(component.state.value).toStrictEqual([]);

      await wait(0);
      await wrapper.update();

      // @ts-ignore
      wrapper.find('Dropdown').prop('onChange')(undefined, { value: ['NotAValidNumber'] });

      await wrapper.update();

      expect(component.state.value).toStrictEqual([]);
    });
  });

  it('handles change correctly when there is no value', async () => {
    const component: any = wrapper.find('Dropdown').instance();

    await act(async () => {
      expect(component.state.value).toStrictEqual([]);

      await wait(0);
      await wrapper.update();

      // @ts-ignore
      wrapper.find('Dropdown').prop('onChange')(undefined, { value: undefined });

      await wrapper.update();

      expect(component.state.value).toStrictEqual([]);
    });
  });
});
