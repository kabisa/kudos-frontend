import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Toolbar from './Toolbar';

function setup() {
  const props = {
    text: 'Toolbar text',
    backLink: '/'
  };

  const enzymeWrapper = mount(
    <MemoryRouter>
      <Toolbar {...props} />
    </MemoryRouter>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('Toolbar', () => {
  const { enzymeWrapper } = setup();
  it('should render self and subcomponents', () => {
    expect(enzymeWrapper.exists()).toBe(true);
  });

  it('should have the right text', () => {
    expect(
      enzymeWrapper
        .find('div')
        .find('span')
        .text()
    ).toBe('Toolbar text');
  });
});
