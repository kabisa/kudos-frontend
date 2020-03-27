import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { withMockedProviders } from '../../../../spec_helper';
import CommentButton from './CommentButton';

describe('<CommentButton />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<CommentButton transactionId="1" text="Some text" />));
  });

  it('renders the provided text', () => {
    expect(wrapper.contains('Some text')).toBe(true);
  });
});
