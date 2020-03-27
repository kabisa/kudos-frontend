import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { withMockedProviders } from '../../spec_helper';
import AddTransactionPage from './AddTransactionPage';

describe('<AddTransactionPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(withMockedProviders(<AddTransactionPage transaction />));
  });

  it('renders the create post section', () => {
    expect(wrapper.find('CreatePost').length).toBe(1);
  });

  it('renders the header', () => {
    expect(wrapper.find('Toolbar').length).toBe(1);
  });
});
