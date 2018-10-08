import React from 'react';
import { shallow } from 'enzyme';

import { LikeButton } from './LikeButton';

function setup() {
  const props = {
    like: jest.fn(),
    transactionId: 0,
    liked: true,
    likes: 1
  };

  const enzymeWrapper = shallow(<LikeButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('LikeButton', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });
});
