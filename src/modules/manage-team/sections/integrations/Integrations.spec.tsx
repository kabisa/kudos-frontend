import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { createMemoryHistory, History } from 'history';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import IntegrationsSection, { GET_TEAM_INTEGRATIONS, REMOVE_SLACK } from './Integrations';

let mutationCalled = false;
const mocksWithoutSlack = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: '',
        },
      },
    },
  },
];

const mocksWitSlack = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: 'someId',
        },
      },
    },
  },
  {
    request: {
      query: REMOVE_SLACK,
      variables: { teamId: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          removeSlack: {
            team: {
              id: '1',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: '1' },
    },
    result: {
      data: {
        teamById: {
          slackTeamId: 'someId',
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_TEAM_INTEGRATIONS,
      variables: { id: '1' },
    },
    error: new Error('something went wrong'),
  },
];

let wrapper: ReactWrapper;
let history: History;
const setup = (mocks: any) => {
  history = createMemoryHistory();
  mutationCalled = false;
  wrapper = mount(withMockedProviders(<IntegrationsSection history={history} />, mocks));
};

describe('<IntegrationsSection />', () => {
  mockLocalstorage('1');

  beforeEach(() => {
    setup(mocksWithoutSlack);
  });

  it('shows when the query is loading', () => {
    expect(findByTestId(wrapper, 'loading').length).toBe(1);
  });

  it('shows when there is an error', async () => {
    setup(mocksWithError);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'error').length).toBe(1);
    });
  });

  describe('not connected to Slack', () => {
    beforeEach(() => {
      setup(mocksWithoutSlack);
    });

    it('shows the slack disconnected container', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(findByTestId(wrapper, 'slack-disconnected-container').length).toBe(1);
      });
    });

    it('doesn\'t show the slack connected container', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(findByTestId(wrapper, 'slack-connected-container').length).toBe(0);
      });
    });

    it('redirects to the correct url', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        const btn = findByTestId(wrapper, 'connect-slack-button');

        expect(btn.prop('href')).toEqual('http://localhost:3000/auth/slack/team/1');
      });
    });
  });

  describe('connected to slack', () => {
    beforeEach(() => {
      setup(mocksWitSlack);
    });

    it('shows the connected to slack container', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(findByTestId(wrapper, 'slack-connected-container').length).toBe(1);
      });
    });

    it('doesnt show the not connected to slack container', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        expect(findByTestId(wrapper, 'slack-disconnected-container').length).toBe(0);
      });
    });

    it('calls the disconnect mutation', async () => {
      await act(async () => {
        await wait(0);
        await wrapper.update();

        findByTestId(wrapper, 'remove-slack-btn').hostNodes().simulate('click');

        await wait(0);

        expect(mutationCalled).toBe(true);
      });
    });
  });
});
