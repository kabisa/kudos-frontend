import React from 'react';
import { shallow } from 'enzyme';

import { FeedPage } from './FeedPage';

const transactionList = [
  {
    id: 0,
    author: {
      id: 3,
      name: 'Malinda Romaguera',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/nutzumi/128.jpg'
    },
    receivers: [
      {
        id: 0,
        first_name: 'Emmett',
        last_name: 'Boyer',
        email: 'Cara.Kreiger@gmail.com',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ah_lice/128.jpg',
        description: "You can't back up the hard drive without backing up the optical SDD alarm!",
        location: 'Alabama'
      }
    ],
    message: "You can't generate the pixel without backing up the solid state JBOD circuit!",
    kudos: 9,
    comments: 22,
    likes: 18,
    created_on: '2018-10-04T08:37:13.448Z'
  },
  {
    id: 1,
    author: {
      id: 5,
      name: 'Scarlett Emard',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/danmartin70/128.jpg'
    },
    receivers: [
      {
        id: 0,
        first_name: 'Natalie',
        last_name: 'Nolan',
        email: 'Onie.Dooley@gmail.com',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/bowbrick/128.jpg',
        description:
          "You can't input the alarm without transmitting the cross-platform CSS matrix!",
        location: 'Montana'
      },
      {
        id: 1,
        first_name: 'Tess',
        last_name: 'Kutch',
        email: 'Reymundo54@gmail.com',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/atariboy/128.jpg',
        description: 'We need to quantify the back-end JSON matrix!',
        location: 'Alabama'
      }
    ],
    message: "You can't parse the interface without compressing the mobile HTTP application!",
    kudos: 35,
    comments: 39,
    likes: 22,
    created_on: '2018-10-04T10:35:22.183Z'
  }
];

function setup() {
  const props = {
    getTransactions: jest.fn(),

    isLoading: false,
    isFailed: false,
    transactions: transactionList
  };

  const enzymeWrapper = shallow(<FeedPage {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('FeedPage', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
