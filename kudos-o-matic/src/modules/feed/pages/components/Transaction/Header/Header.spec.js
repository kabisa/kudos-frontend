import React from 'react';
import { mount } from 'enzyme';

import Header from './Header';

function setup() {
  const props = {
    authorUrl: 'https://nolink.com',
    createdOn: '2018-10-04T08:37:13.448Z',
    kudos: 10,
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
    ]
  };

  const enzymeWrapper = mount(<Header {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

it('should render self and subcomponents', () => {
  const { enzymeWrapper } = setup();

  expect(enzymeWrapper.isEmptyRender()).toBe(false);
  expect(
    enzymeWrapper
      .find('div')
      .find('div')
      .first()
      .find('span')
      .first()
      .text()
  ).toBe('10 ₭');
});
