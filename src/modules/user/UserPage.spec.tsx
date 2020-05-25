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
    result: () => (
      {
        data: {
          viewer: {
            name: 'Max',
            avatar: 'fakeAvatarUrl',
            slackRegistrationToken: 'token',
            slackId: '',
          },
        },
      }),
  },
];

const mocksWithSlackId = [
  {
    request: {
      query: GET_USER,
    },
    result: () => (
      {
        data: {
          viewer: {
            name: 'Max',
            avatar: 'fakeAvatarUrl',
            slackRegistrationToken: 'token',
            slackId: '1',
          },
        },
      }),
  },
];

let wrapper: ReactWrapper;
let history: MemoryHistory;
const setup = async (mock: any) => {
  history = createMemoryHistory();

  await act(async () => {
    wrapper = mount(withMockedProviders(<UserPage history={history} />, mock));
  });
};

describe('<UserPage/>', () => {
  beforeEach(async () => {
    await setup(mocks);
  });

  it('shows the component is loading', () => {
    expect(findByTestId(wrapper, 'loading').length).toBe(1);
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

  it('shows the connect to slack part if the slack id is null', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'register-slack').hostNodes().length).toBe(1);
    });
  });

  it('shows the user is connected to slack if the slack id is not null', async () => {
    await setup(mocksWithSlackId);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'slack-connected').hostNodes().length).toBe(1);
    });
  });
});
