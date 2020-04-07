import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../spec_helper';
import Desktop, { GET_USER } from './Desktop';

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        viewer: {
          name: 'Max',
        },
      },
    },
  },
];

describe('<Desktop />', () => {
  mockLocalstorage('admin');
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<Desktop />, mocks));
  });

  it('renders the users name', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.contains('Max')).toBe(true);
    });
  });

  it('should have a link to the home page', async () => {
    expect(findByTestId(wrapper, 'home-button').hostNodes().length).toBe(1);
  });

  it('should have a link to the profile page', async () => {
    expect(findByTestId(wrapper, 'profile-button').hostNodes().length).toBe(1);
  });

  it('should have a switch team button', async () => {
    expect(findByTestId(wrapper, 'switch-team-button').hostNodes().length).toBe(1);
  });

  it('should have a logout button', async () => {
    expect(findByTestId(wrapper, 'logout-button').hostNodes().length).toBe(1);
  });

  it('should have a manage team button if the user is admin', async () => {
    expect(findByTestId(wrapper, 'manage-team-button').hostNodes().length).toBe(1);
  });

  it('should not have a manage team button if the user is member', async () => {
    mockLocalstorage('member');
    wrapper = mount(withMockedProviders(<Desktop />, mocks));

    expect(findByTestId(wrapper, 'manage-team-button').hostNodes().length).toBe(0);
  });
});
