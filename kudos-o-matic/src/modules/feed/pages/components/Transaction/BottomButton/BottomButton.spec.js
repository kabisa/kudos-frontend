import React from 'react';
import { mount } from 'enzyme';

import BottomButton from './BottomButton';

function setup() {
  const props = {
    icon: 'heart',
    text: 'test'
  };

  const enzymeWrapper = mount(<BottomButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

it('should render self and subcomponents', () => {
  const { enzymeWrapper } = setup();

  expect(enzymeWrapper.find('button').hasClass('button-action')).toBe(true);

  expect(
    enzymeWrapper
      .find('button')
      .find('i')
      .hasClass('heart icon')
  ).toBe(true);

  expect(enzymeWrapper.find('button').text()).toBe('test');
});
