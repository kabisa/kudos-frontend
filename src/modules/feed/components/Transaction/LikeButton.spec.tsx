import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../../../spec_helper';
import LikeButton, { MUTATION_TOGGLE_LIKE } from './LikeButton';
import { FragmentPostResult, GET_GOAL_PERCENTAGE } from '../../queries';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_TOGGLE_LIKE,
      variables: { id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          toggleLikePost: {
            post: {},
          },
        },
      };
    },
  },
  {
    request: {
      query: GET_GOAL_PERCENTAGE,
      variables: { team_id: '1' },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          teamById: {
          },
        },
      };
    },
  },
];

const likedPost: FragmentPostResult = {
  amount: 5,
  createdAt: '2020-03-01',
  id: '1',
  message: 'For cleaning his desk',
  receivers: [
    {
      id: '2',
      name: 'Egon',
      avatar: 'fakeurl',
    },
  ],
  sender: {
    id: '1',
    name: 'Max',
    avatar: 'fakeurl',
  },
  votes: [
    {
      voter: {
        id: '1',
        name: 'Max',
      },
    },
  ],
};
let wrapper: ReactWrapper;

const setup = (liked: boolean, post: FragmentPostResult) => {
  wrapper = mount(withMockedProviders(<LikeButton liked={liked} post={post} />, mocks));
};

describe('<LikeButton />', () => {
  beforeEach(() => {
    mockLocalstorage('1');
    setup(false, likedPost);
  });

  it('renders the correct like amount', () => {
    expect(findByTestId(wrapper, 'like-amount').hostNodes().text()).toBe('1');
  });

  it('renders the correct like icon if the post is not liked', () => {
    expect(findByTestId(wrapper, 'like-icon').hostNodes().hasClass('thumbs up outline')).toBe(true);
  });

  it('renders the correct like icon if the post is liked', () => {
    setup(true, likedPost);
    expect(findByTestId(wrapper, 'like-icon').hostNodes().hasClass('blue thumbs up')).toBe(true);
  });

  it('calls the mutation', async () => {
    await act(async () => {
      findByTestId(wrapper, 'like-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
