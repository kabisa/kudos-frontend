import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { createMemoryHistory, History } from 'history';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../spec_helper';
import IntegrationsSection, { GET_TEAM_INTEGRATIONS } from './Integrations';

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

  it('shows the slack button if the team has no slack id', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'slack-button').length).toBe(1);
    });
  });

  it('doesnt show the slack button if the team has a slack id', async () => {
    setup(mocksWitSlack);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'slack-button').length).toBe(0);
    });
  });
});
