import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ReactWrapper } from 'enzyme';

export const withMockedProviders = (component: any, mocks?: any, cache?: any, useTypeName: boolean = false) => (
  <MemoryRouter>
    <MockedProvider mocks={mocks} addTypename={useTypeName} cache={cache}>{component}</MockedProvider>
  </MemoryRouter>
);

export const wait = (amount = 0) => new Promise((resolve) => setTimeout(resolve, amount));

export const findByTestId = (wrapper: ReactWrapper, id: string) => wrapper.find(`[data-testid="${id}"]`);

// eslint-disable-next-line max-len
export const findInputByTestId = (wrapper: ReactWrapper, id: string) => wrapper.find(`[data-testid="${id}"]`).find('input');

// eslint-disable-next-line max-len
export const findTextAreaByTestId = (wrapper: ReactWrapper, id: string) => wrapper.find(`[data-testid="${id}"]`).find('textarea');

export const simulateTextareaChange = (wrapper: ReactWrapper, id: string, name: string, value: string) => {
  const input = findTextAreaByTestId(wrapper, id);

  return input.simulate('change', { target: { name, value } });
};

export const simulateInputChange = (wrapper: ReactWrapper, id: string, name: string, value: any) => {
  const input = findInputByTestId(wrapper, id);
  return input.simulate('change', { target: { name, value } });
};

// Mocks the localstorage getItem function with a specific value
export const mockLocalstorage = (value: string) => {
  Storage.prototype.getItem = jest.fn(() => value);
};

export const getMockCache = () => new InMemoryCache().restore({
  '$ROOT_QUERY.teamById({"id":"1"}).activeKudosMeter': {
    amount: 260,
    __typename: 'KudosMeter',
  },
  '$ROOT_QUERY.teamById({"id":"1"})': {
    activeKudosMeter: {
      type: 'id',
      generated: true,
      id: '$ROOT_QUERY.teamById({"id":"1"}).activeKudosMeter',
      typename: 'KudosMeter',
    },
    activeGoals: [
      {
        type: 'id',
        generated: false,
        id: 'Goal:2',
        typename: 'Goal',
      },
      {
        type: 'id',
        generated: false,
        id: 'Goal:3',
        typename: 'Goal',
      },
      {
        type: 'id',
        generated: false,
        id: 'Goal:1',
        typename: 'Goal',
      },
    ],
    __typename: 'Team',
    users: [
      {
        type: 'id',
        generated: false,
        id: 'User:1',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:4',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:5',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:6',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:7',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:8',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:9',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:10',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:11',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:12',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:13',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:14',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:15',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:16',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:17',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:18',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:19',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:20',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:21',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:22',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:23',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:24',
        typename: 'User',
      },
    ],
    'posts({"first":10,"orderBy":"created_at desc"})': {
      type: 'id',
      generated: true,
      id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"})',
      typename: 'PostsConnection',
    },
    guidelines: [
      {
        type: 'id',
        generated: false,
        id: 'Guideline:12',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:3',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:7',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:19',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:18',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:16',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:13',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:14',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:15',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:1',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:2',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:20',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:4',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:6',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:11',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:10',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:17',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:8',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:5',
        typename: 'Guideline',
      },
      {
        type: 'id',
        generated: false,
        id: 'Guideline:9',
        typename: 'Guideline',
      },
    ],
  },
  'Goal:2': {
    id: '2',
    amount: 1000,
    name: 'Second goal',
    achievedOn: null,
    __typename: 'Goal',
  },
  'Goal:3': {
    id: '3',
    amount: 1500,
    name: 'Third goal',
    achievedOn: null,
    __typename: 'Goal',
  },
  'Goal:1': {
    id: '1',
    amount: 504,
    name: 'First goal',
    achievedOn: null,
    __typename: 'Goal',
  },
  ROOT_QUERY: {
    'teamById({"id":"1"})': {
      type: 'id',
      generated: true,
      id: '$ROOT_QUERY.teamById({"id":"1"})',
      typename: 'Team',
    },
  },
  'User:1': {
    id: '1',
    name: 'Kabisa',
    virtualUser: true,
    __typename: 'User',
  },
  'User:4': {
    id: '4',
    name: 'Ariejan',
    virtualUser: false,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/5d4c39fdddb3149070070e5a79946b88.png?d=retro&s=200',
  },
  'User:5': {
    id: '5',
    name: 'Stefan',
    virtualUser: false,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/4e9ef980f8849d422887a1620121e523.png?d=retro&s=200',
  },
  'User:6': {
    id: '6',
    name: 'Marijn',
    virtualUser: false,
    __typename: 'User',
  },
  'User:7': {
    id: '7',
    name: 'Egon',
    virtualUser: false,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/da7e899ce6899ef411deb77dff3f2d90.png?d=retro&s=200',
  },
  'User:8': {
    id: '8',
    name: 'Ralph',
    virtualUser: false,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/e80f22727807b95bf14089a0af776bfd.png?d=retro&s=200',
  },
  'User:9': {
    id: '9',
    name: 'Guido',
    virtualUser: false,
    __typename: 'User',
  },
  'User:10': {
    id: '10',
    name: 'Kabisa',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:11': {
    id: '11',
    name: 'test',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:12': {
    id: '12',
    name: 'tets',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:13': {
    id: '13',
    name: 'test',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:14': {
    id: '14',
    name: 'test',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:15': {
    id: '15',
    name: 'Dovetail',
    virtualUser: true,
    __typename: 'User',
  },
  'User:16': {
    id: '16',
    name: 'Dovetail123',
    virtualUser: true,
    __typename: 'User',
  },
  'User:17': {
    id: '17',
    name: 'dovetail',
    virtualUser: true,
    __typename: 'User',
  },
  'User:18': {
    id: '18',
    name: 'Philips',
    virtualUser: true,
    __typename: 'User',
  },
  'User:19': {
    id: '19',
    name: 'Philips',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:20': {
    id: '20',
    name: 'philips',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:21': {
    id: '21',
    name: 'Test1234',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:22': {
    id: '22',
    name: 'Kabisa',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:23': {
    id: '23',
    name: 'Kabisa',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  'User:24': {
    id: '24',
    name: 'Kabisa',
    virtualUser: true,
    __typename: 'User',
    avatar: 'https://gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e.png?d=retro&s=200',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.0': {
    cursor: 'MQ==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:44',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:43': {
    id: '43',
    amount: 13,
    message: 'bla bla',
    createdAt: '2020-03-26T08:54:20Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:24',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.1': {
    cursor: 'Mg==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:43',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:42': {
    id: '42',
    amount: 5,
    message: 'dasd',
    createdAt: '2020-03-25T11:38:38Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:23',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.2': {
    cursor: 'Mw==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:42',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:41': {
    id: '41',
    amount: 5,
    message: 'dasd',
    createdAt: '2020-03-25T10:43:32Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:22',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.3': {
    cursor: 'NA==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:41',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:40': {
    id: '40',
    amount: 5,
    message: 'qewqe',
    createdAt: '2020-03-25T10:40:27Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:5',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.4': {
    cursor: 'NQ==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:40',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:39': {
    id: '39',
    amount: 5,
    message: 'qwer',
    createdAt: '2020-03-25T09:44:25Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:21',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.5': {
    cursor: 'Ng==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:39',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:38': {
    id: '38',
    amount: 6,
    message: 'test',
    createdAt: '2020-03-25T09:01:29Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:19',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:20',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.6': {
    cursor: 'Nw==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:38',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:37': {
    id: '37',
    amount: 5,
    message: 'fsadsda',
    createdAt: '2020-03-25T06:54:29Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:14',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.7': {
    cursor: 'OA==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:37',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:36': {
    id: '36',
    amount: 4,
    message: 'dasd',
    createdAt: '2020-03-25T06:54:16Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:10',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:11',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:12',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:13',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.8': {
    cursor: 'OQ==',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:36',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:25': {
    id: '25',
    amount: 10,
    message: 'Voluptatibus velit aut.',
    createdAt: '2020-03-19T08:23:06Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:4',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:5',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:5',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.9': {
    cursor: 'MTA=',
    node: {
      type: 'id',
      generated: false,
      id: 'Post:25',
      typename: 'Post',
    },
    __typename: 'PostEdge',
  },
  'Post:24': {
    id: '24',
    amount: 6,
    message: 'Et non rem.',
    createdAt: '2020-03-19T08:23:06Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:4',
        typename: 'User',
      },
      {
        type: 'id',
        generated: false,
        id: 'User:5',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:8',
      typename: 'User',
    },
    votes: [

    ],
    __typename: 'Post',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"})': {
    edges: [
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.0',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.1',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.2',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.3',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.4',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.5',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.6',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.7',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.8',
        typename: 'PostEdge',
      },
      {
        type: 'id',
        generated: true,
        id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).edges.9',
        typename: 'PostEdge',
      },
    ],
    pageInfo: {
      type: 'id',
      generated: true,
      id: '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).pageInfo',
      typename: 'PageInfo',
    },
    __typename: 'PostsConnection',
  },
  '$ROOT_QUERY.teamById({"id":"1"}).posts({"first":10,"orderBy":"created_at desc"}).pageInfo': {
    endCursor: 'MTA=',
    hasNextPage: true,
    __typename: 'PageInfo',
  },
  'Guideline:12': {
    id: '12',
    kudos: 1,
    name: 'Unde et ratione non.',
    __typename: 'Guideline',
  },
  'Guideline:3': {
    id: '3',
    kudos: 1,
    name: 'Cupiditate dolore voluptatem iure.',
    __typename: 'Guideline',
  },
  'Guideline:7': {
    id: '7',
    kudos: 1,
    name: 'Ut harum minima autem.',
    __typename: 'Guideline',
  },
  'Guideline:19': {
    id: '19',
    kudos: 1,
    name: 'Dolores provident dolor accusamus.',
    __typename: 'Guideline',
  },
  'Guideline:18': {
    id: '18',
    kudos: 1,
    name: 'Molestias nam assumenda incidunt.',
    __typename: 'Guideline',
  },
  'Guideline:16': {
    id: '16',
    kudos: 1,
    name: 'Est eius praesentium iusto.',
    __typename: 'Guideline',
  },
  'Guideline:13': {
    id: '13',
    kudos: 5,
    name: 'Odio qui et voluptas.',
    __typename: 'Guideline',
  },
  'Guideline:14': {
    id: '14',
    kudos: 5,
    name: 'Optio impedit ea ipsam.',
    __typename: 'Guideline',
  },
  'Guideline:15': {
    id: '15',
    kudos: 5,
    name: 'Fugit odio ut qui.',
    __typename: 'Guideline',
  },
  'Guideline:1': {
    id: '1',
    kudos: 5,
    name: 'Inventore officiis hic amet.',
    __typename: 'Guideline',
  },
  'Guideline:2': {
    id: '2',
    kudos: 5,
    name: 'Quia amet ipsa veniam.',
    __typename: 'Guideline',
  },
  'Guideline:20': {
    id: '20',
    kudos: 10,
    name: 'Quis esse officia aut.',
    __typename: 'Guideline',
  },
  'Guideline:4': {
    id: '4',
    kudos: 10,
    name: 'Harum rerum ratione architecto.',
    __typename: 'Guideline',
  },
  'Guideline:6': {
    id: '6',
    kudos: 10,
    name: 'Ad dignissimos magnam dolorum.',
    __typename: 'Guideline',
  },
  'Guideline:11': {
    id: '11',
    kudos: 10,
    name: 'Non ea consequatur et.',
    __typename: 'Guideline',
  },
  'Guideline:10': {
    id: '10',
    kudos: 20,
    name: 'Quas id vitae quisquam.',
    __typename: 'Guideline',
  },
  'Guideline:17': {
    id: '17',
    kudos: 20,
    name: 'Quaerat aliquid autem deserunt.',
    __typename: 'Guideline',
  },
  'Guideline:8': {
    id: '8',
    kudos: 20,
    name: 'Debitis voluptas qui ut.',
    __typename: 'Guideline',
  },
  'Guideline:5': {
    id: '5',
    kudos: 20,
    name: 'Provident velit iure quas.',
    __typename: 'Guideline',
  },
  'Guideline:9': {
    id: '9',
    kudos: 50,
    name: 'Asperiores error cupiditate at.',
    __typename: 'Guideline',
  },
  'Post:44': {
    id: '44',
    amount: 24,
    __typename: 'Post',
    message: 'test message',
    createdAt: '2020-03-26T08:58:50Z',
    receivers: [
      {
        type: 'id',
        generated: false,
        id: 'User:4',
        typename: 'User',
      },
    ],
    sender: {
      type: 'id',
      generated: false,
      id: 'User:7',
      typename: 'User',
    },
    votes: [

    ],
  },
});
