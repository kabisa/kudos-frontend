import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GET_POSTS } from './queries';
import {
  findByTestId, mockLocalstorage, wait, withMockedProviders,
} from '../../spec_helper';
import { RepoList } from './RepoList';

const mocks = [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          posts: {
            edges: [
              {
                cursor: 'x',
                node: {
                  __typename: 'Post',
                  id: '1',
                  amount: 5,
                  message: 'test message',
                  createdAt: '2020-03-10',
                  receivers: [
                    {
                      id: '1',
                      name: 'Stefan',
                      email: 'stefan@example.com',
                      avatar: 'fakeAvatar',
                    },
                  ],
                  sender: {
                    id: '1',
                    name: 'Max',
                    email: 'max@example.com',
                    avatar: 'fakeAvatar',
                  },
                  votes: [
                    {
                      voter: {
                        id: '5',
                        name: 'Egon',
                      },
                    },
                  ],
                },
              },
            ],
            pageInfo: {
              endCursor: '2',
              hasNextPage: false,
            },
          },
        },
      },
    },
  },
];

const mocksWithNextPage = [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: '1' },
    },
    result: {
      data: {
        teamById: {
          posts: {
            edges: [
              {
                cursor: 'x',
                __typename: 'PostEdge',
                node: {
                  __typename: 'Post',
                  id: '1',
                  amount: 5,
                  message: 'test message',
                  createdAt: '2020-03-10',
                  receivers: [
                    {
                      id: '1',
                      name: 'Stefan',
                      email: 'stefan@example.com',
                      avatar: 'fakeAvatarUrl',
                    },
                  ],
                  sender: {
                    id: '1',
                    name: 'Max',
                    email: 'max@example.com',
                    avatar: 'fakeAvatarUrl',
                  },
                  votes: [
                    {
                      voter: {
                        id: '5',
                        name: 'Egon',
                      },
                    },
                  ],
                },
              },
            ],
            pageInfo: {
              endCursor: 'x',
              hasNextPage: true,
            },
            __typename: 'PostConnection',
          },
          __typename: 'Team',
        },
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: '1' },
    },
    error: new Error('It broke'),
  },
];

const mocksWithoutData = [
  {
    request: {
      query: GET_POSTS,
      variables: { team_id: '1' },
    },
    result: {
      data: {},
    },
  },
];
let wrapper: ReactWrapper;

const setup = (mock: any) => {
  wrapper = mount(withMockedProviders(<RepoList />, mock));
};

describe('<RepoList />', () => {
  beforeEach(() => {
    mockLocalstorage('1');
    setup(mocks);
  });

  it('should show loading when the query is loading', async () => {
    expect(wrapper.find('TransactionLoading').length).toBe(4);
  });

  it('should show loading when there is no data', async () => {
    setup(mocksWithoutData);
    expect(wrapper.find('TransactionLoading').length).toBe(4);
  });

  it('should show the error message when there is an error', async () => {
    setup(mocksWithError);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Network error: It broke</p>)).toBe(true);
    });
  });

  it('should render all the posts', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(wrapper.find('Transaction').length).toBe(1);
    });
  });

  it('should show a load next button when there are more posts', async () => {
    setup(mocksWithNextPage);
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'next-page-button').length).toBe(1);
    });
  });

  it('should not show a load next button when there are no more posts', async () => {
    await act(async () => {
      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'next-page-button').length).toBe(0);
      expect(wrapper.containsMatchingElement(<p>You&apos;ve reached the end, congratulations!</p>)).toBe(true);
    });
  });
});
