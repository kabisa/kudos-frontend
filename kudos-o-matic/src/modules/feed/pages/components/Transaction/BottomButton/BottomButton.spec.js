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

describe('BottomButton', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.find('button').hasClass('button-action')).toBe(true);
  });

  it('should have a button text', () => {
    expect(enzymeWrapper.find('button').text()).toBe('test');
  });

  it('should have an icon', () => {
    expect(
      enzymeWrapper
        .find('button')
        .find('i')
        .hasClass('heart icon')
    ).toBe(true);
  });
});
