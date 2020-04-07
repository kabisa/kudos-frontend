import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, withMockedProviders } from '../../../../spec_helper';
import { Transaction } from './index';
import { FragmentPostResult } from '../../queries';

const transaction: FragmentPostResult = {
  id: '1',
  amount: 5,
  message: 'test message',
  createdAt: '',
  receivers: [
    {
      name: 'Stefan',
      id: '1',
      avatar: 'fakeUrl',
    },
  ],
  sender: {
    name: 'Egon',
    id: '2',
    avatar: 'fakeUrl',
  },
  votes: [],
};

const transactionWithVote = {
  ...transaction,
  votes: [
    {
      voter: {
        id: '5',
        name: 'Ralph',
      },
    },
  ],
};

describe('Transaction', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<Transaction transaction={transactionWithVote} />));
  });

  it('renders the kudos amount without votes', () => {
    const postMessage = findByTestId(wrapper, 'kudo-amount');

    expect(postMessage.text()).toBe('5₭ ');
  });

  it('renders the message', () => {
    const postMessage = findByTestId(wrapper, 'post-message');

    expect(postMessage.text()).toBe('test message');
  });

  it('renders the like button', () => {
    const voteButton = findByTestId(wrapper, 'like-button');

    expect(voteButton.hostNodes().length).toBe(1);
  });

  it('renders the senders name', () => {
    const senderName = findByTestId(wrapper, 'sender-name');

    expect(senderName.text()).toBe('Egon ');
  });

  it('renders all the receivers', () => {
    const receivers = findByTestId(wrapper, 'post-receivers');

    expect(receivers.text()).toBe('Stefan');
  });

  it('renders the header', () => {
    const header = findByTestId(wrapper, 'post-header');

    expect(header.length).toBe(1);
  });
});
