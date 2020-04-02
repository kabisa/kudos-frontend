/* eslint  jsx-a11y/alt-text: 0 */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryHistory } from 'history/createMemoryHistory';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { GET_USER, UserPage } from './UserPage';
import { findByTestId, wait, withMockedProviders } from '../../spec_helper';
import { PATH_RESET_PASSWORD } from '../../routes';

const mocks = [
  {
    request: {
      query: GET_USER,
    },
    result: () => ({ data: { viewer: { name: 'Max', avatar: 'fakeAvatarUrl' } } }),
  },
];

describe('<UserPage/>', () => {
  let wrapper: ReactWrapper;
  let history:MemoryHistory;

  beforeEach(async () => {
    history = createMemoryHistory();

    await act(async () => {
      wrapper = mount(withMockedProviders(<UserPage history={history} />, mocks));
    });
  });

  it('shows the component is loading', () => {
    expect(wrapper.containsMatchingElement(<h2>Loading...</h2>)).toBe(true);
  });

  it('shows the users name', async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      expect(wrapper.containsMatchingElement(<h2>Max</h2>)).toBe(true);
    });
  });

  it('doesnt show an image when the query hasnt loaded', () => {
    expect(wrapper.containsMatchingElement(<img src="fakeAvatarUrl" />)).toBe(false);
  });

  it('shows the users avatar', async () => {
    await act(async () => {
      await wait(0);

      wrapper.update();

      expect(wrapper.containsMatchingElement(<img src="fakeAvatarUrl" />)).toBe(true);
    });
  });

  it('shows a link to gravatar', () => {
    expect(wrapper.containsMatchingElement(<a href="https://nl.grvaatar.com/">gravatar.com</a>));
  });

  it('shows a link to the reset password page', () => {
    expect(wrapper.containsMatchingElement(<button>Change password</button>));
  });

  it('shows a logout button', () => {
    expect(wrapper.containsMatchingElement(<button>Log out</button>));
  });

  it('navigates to the reset password page', async () => {
    await act(async () => {
      const button = findByTestId(wrapper, 'reset-password-btn').hostNodes();

      button.simulate('click', { button: 0 });

      wrapper.update();

      expect(history.location.pathname).toBe(PATH_RESET_PASSWORD);
    });
  });
});
