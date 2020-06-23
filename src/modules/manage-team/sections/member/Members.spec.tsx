import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { mockLocalstorage, wait, withMockedProviders } from '../../../../spec_helper';
import MemberSection, { GET_USERS } from './Members';

const mocks = [
  {
    request: {
      query: GET_USERS,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          memberships: [
            {
              id: '1',
              role: 'member',
              user: {
                id: '1',
                name: 'Max',
                email: 'max@example.com',
              },
            },
            {
              id: '2',
              role: 'admin',
              user: {
                id: '2',
                name: 'Egon',
                email: 'egon@example.com',
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
      query: GET_USERS,
      variables: { id: '1' },
    },
    error: new Error('something went wrong'),
  },
];

describe('<Member />', () => {
  mockLocalstorage('1');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<MemberSection />, mocks));
  });

  it('shows a loading state', () => {
    expect(wrapper.containsMatchingElement(<p>Loading...</p>)).toBe(true);
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<MemberSection />, mocksWithError));
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Error! Network error: something went wrong</p>)).toBe(true);
    });
  });

  it('renders a row for each membership', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.find('MemberRow').length).toBe(2);
    });
  });
});
