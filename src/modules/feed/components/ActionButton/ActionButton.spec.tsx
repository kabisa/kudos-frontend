import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { withMockedProviders } from '../../../../spec_helper';
import ActionButton from './ActionButton';

describe('<ActionButton />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<ActionButton />));
  });

  it('should render a huge button if the screen is mobile', () => {
    // @ts-ignore
    const initialWidth = global.innerWidth;
    // @ts-ignore
    global.innerWidth = 300;
    // @ts-ignore
    global.dispatchEvent(new Event('resize'));
    wrapper = mount(withMockedProviders(<ActionButton />));

    expect(wrapper.find('.button').hasClass('huge')).toBe(true);

    // @ts-ignore
    global.innerWidth = initialWidth;
    // @ts-ignore
    global.dispatchEvent(new Event('resize'));
  });

  it('should render a massive button if the screen is larger then mobile', () => {
    expect(wrapper.find('.button').hasClass('massive')).toBe(true);
  });
});
