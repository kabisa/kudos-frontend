import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { CreateInvite, MUTATION_CREATE_INVITE } from './CreateInvite';
import {
  findByTestId,
  mockLocalstorage,
  simulateTextareaChange,
  wait,
  withMockedProviders,
} from '../../../../spec_helper';
import { QUERY_GET_INVITES } from './InvitesSection';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_CREATE_INVITE,
      variables: {
        emails: ['max@example.com'],
        team_id: '1',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          createTeamInvite: {
            teamInvites: [
              {
                id: '1',
              },
            ],
          },
        },
      };
    },
  },
  {
    request: {
      query: QUERY_GET_INVITES,
      variables: {
        team_id: '1',
      },
    },
    result: {
      data: {
        teamById: {
          teamInvites: [
            {
              id: '1',
              acceptedAt: '2020-03-10',
              declinedAt: '',
              email: 'max@example.com',
              sentAt: '2020-03-01',
            },
          ],
        },
      },
    },
  },
];

describe('<InvitePage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage('1');
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<CreateInvite />, mocks));
  });

  it('renders the input field', () => {
    expect(findByTestId(wrapper, 'email-input').hostNodes().length).toBe(1);
  });

  it('renders the send button', () => {
    expect(wrapper.find('.button').hostNodes().length).toBe(1);
  });

  it('displays an error if the email field is empty', async () => {
    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      expect(wrapper.containsMatchingElement(<p>Email can&#39;t be blank.</p>));
    });
  });

  it('sets the loading state when the mutation is called', async () => {
    await act(async () => {
      simulateTextareaChange(wrapper, 'email-input', 'emails', 'max@example.com');

      await wrapper.update();

      wrapper.find('.button').hostNodes().simulate('click');

      expect(wrapper.find('.loading').length).toBe(1);
    });
  });

  it('shows an error if an email is invalid', async () => {
    await act(async () => {
      simulateTextareaChange(wrapper, 'email-input', 'emails', 'invalidEmail');

      await wrapper.update();

      wrapper.find('.button').hostNodes().simulate('click');

      expect(wrapper.containsMatchingElement(<p>Couldn&#39;t parse emails.</p>)).toBe(true);
    });
  });

  it('shows an error if multiple emails are invalid', async () => {
    await act(async () => {
      simulateTextareaChange(wrapper, 'email-input', 'emails', 'invalidEmail, otherFakeEmail');

      await wrapper.update();

      wrapper.find('.button').hostNodes().simulate('click');

      expect(wrapper.containsMatchingElement(<p>Couldn&#39;t parse emails.</p>)).toBe(true);
    });
  });

  it('calls the mutation if all requirements are met', async () => {
    await act(async () => {
      simulateTextareaChange(wrapper, 'email-input', 'emails', 'max@example.com');

      await wrapper.update();

      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('only uses valid email addresses when multiple are entered', async () => {
    await act(async () => {
      simulateTextareaChange(wrapper, 'email-input', 'emails', 'max@example.com;invalidEmail');

      await wrapper.update();

      wrapper.find('.button').hostNodes().simulate('click');
      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
