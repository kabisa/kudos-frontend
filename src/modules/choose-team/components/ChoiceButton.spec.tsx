/* eslint-disable no-proto */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import gql from 'graphql-tag';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory, MemoryHistory } from 'history';
import ChoiceButton from './ChoiceButton';
import { wait, withMockedProviders } from '../../../spec_helper';

const fakeMutation = gql`
    mutation fakeMutation($team_invite_id: ID!) {
        fakeMutation(teamInviteId: $team_invite_id) {
            teamInvite {
                id
            }
        }
    }
`;
let mutationCalled = false;
const mocks = [
  {
    request: {
      query: fakeMutation,
      variables: { team_invite_id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return { data: { fakeMutation: { teamInvite: { id: '1' } } } };
    },
  },
];

describe('<ChoiceButton />', () => {
  let wrapper: ReactWrapper;
  let history: MemoryHistory;

  beforeEach(() => {
    mutationCalled = false;
    history = createMemoryHistory();
    jest.resetAllMocks();

    wrapper = mount(withMockedProviders(<ChoiceButton
      inviteId="1"
      history={history}
      mutation={fakeMutation}
      color="red"
      accept
      teamId="1"
      text="button text"
    />, mocks));
  });

  it('renders the provided text', () => {
    expect(wrapper.contains('button text')).toBe(true);
  });

  it('sets the loading state', () => {
    wrapper.find('.button').hostNodes().simulate('click');

    expect(wrapper.find('.loading').length).toBe(1);
  });

  it('calls the mutation on button click', async () => {
    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(mutationCalled).toBe(true);
    });
  });

  it('sets the team id if the accept property is true', async () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(localStorage.setItem).toBeCalledWith('team_id', '1');
    });
  });

  it('navigates to the next page if the accept property is true', async () => {
    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(history.location.pathname).toBe('/');
    });
  });

  it('doesnt set the team id the accept property is false', async () => {
    wrapper = mount(withMockedProviders(<ChoiceButton
      inviteId="1"
      mutation={fakeMutation}
      color="red"
      accept={false}
      teamId="1"
      text="button text"
    />, mocks));

    jest.spyOn(window.localStorage.__proto__, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(localStorage.setItem).toBeCalledTimes(0);
    });
  });
});
