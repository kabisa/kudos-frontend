import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import { Header, MUTATION_REMOVE_POST } from './Header';
import { FragmentPostResult, GET_POSTS } from '../../queries';

const transaction: FragmentPostResult = {
  amount: 5,
  createdAt: new Date().toString(),
  id: '1',
  message: 'For cleaning up his desk',
  receivers: [
    {
      id: '2',
      name: 'Egon',
      avatar: 'receiverAvatarUrl',
    },
  ],
  sender: {
    id: '1',
    name: 'Max',
    avatar: 'fakeAvatarUrl',
  },
  votes: [],
};

const olderTransaction: FragmentPostResult = {
  amount: 5,
  createdAt: '2020-03-01',
  id: '1',
  message: 'For cleaning up his desk',
  receivers: [
    {
      id: '2',
      name: 'Egon',
      avatar: 'receiverAvatarUrl',
    },
  ],
  sender: {
    id: '1',
    name: 'Max',
    avatar: 'fakeAvatarUrl',
  },
  votes: [],
};

let mutationCalled = false;
let queryCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_REMOVE_POST,
      variables: { id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          deletePost: {
            postId: '1',
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: '1' },
    },
    result: () => {
      queryCalled = true;
      return {
        data: {
          teamById: {},
        },
      };
    },
  },
];

describe('<Header />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockLocalstorage('1');
    mutationCalled = false;
    queryCalled = false;
    wrapper = mount(withMockedProviders(<Header transaction={transaction} />, mocks));
  });

  it('shows the correct kudo amount', () => {
    expect(findByTestId(wrapper, 'post-amount').contains('5')).toBe(true);
  });

  it('shows the correct timestamp', () => {
    expect(findByTestId(wrapper, 'post-timestamp').contains('a few seconds ago')).toBe(true);
  });

  it('shows the senders avatar', () => {
    expect(findByTestId(wrapper, 'sender-avatar').hostNodes().props().src).toBe('fakeAvatarUrl');
  });

  it('shows the receivers avatar', () => {
    expect(findByTestId(wrapper, 'receiver-avatar').hostNodes().props().src).toBe('receiverAvatarUrl');
  });

  it('allows the user to remove his own post within 15 minutes', () => {
    expect(findByTestId(wrapper, 'post-dropdown').hostNodes().length).toBe(1);
  });

  it('prevents the user to remove his own post after 15 minutes', () => {
    wrapper = mount(withMockedProviders(<Header transaction={olderTransaction} />));

    expect(findByTestId(wrapper, 'post-dropdown').hostNodes().length).toBe(0);
  });

  it('always allows an admin to remove a post', () => {
    mockLocalstorage('admin');
    wrapper = mount(withMockedProviders(<Header transaction={transaction} />));

    expect(findByTestId(wrapper, 'post-dropdown').hostNodes().length).toBe(1);
  });

  it('doesnt allow an other user to delete the post', () => {
    mockLocalstorage('3');
    wrapper = mount(withMockedProviders(<Header transaction={transaction} />));

    expect(findByTestId(wrapper, 'post-dropdown').length).toBe(0);
  });

  it('shows the confirmation dialog', async () => {
    await act(async () => {
      findByTestId(wrapper, 'post-dropdown').hostNodes().simulate('click');
      await wrapper.update();
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');
      await wrapper.update();

      expect(findByTestId(wrapper, 'confirm-dialog').hostNodes().length).toBe(1);
    });
  });

  it('calls the delete mutation and refetch query', async () => {
    await act(async () => {
      findByTestId(wrapper, 'post-dropdown').hostNodes().simulate('click');
      await wrapper.update();
      findByTestId(wrapper, 'delete-button').hostNodes().simulate('click');
      await wrapper.update();

      findByTestId(wrapper, 'confirm-dialog').find('.primary').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);

      await wait(0);
      await wrapper.update();

      expect(queryCalled).toBe(true);
    });
  });
});
