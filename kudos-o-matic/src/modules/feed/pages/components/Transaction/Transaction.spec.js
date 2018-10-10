import React from 'react';
import { shallow } from 'enzyme';

import Transaction from './Transaction';

function setup() {
  const props = {
    transaction: {
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
    }
  };

  const enzymeWrapper = shallow(<Transaction {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Transaction', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
