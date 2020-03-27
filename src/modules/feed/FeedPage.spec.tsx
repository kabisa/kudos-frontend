import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  findByTestId,
  mockLocalstorage, withMockedProviders,
} from '../../spec_helper';
import { FeedPage } from './index';

let wrapper: ReactWrapper;

const setup = () => {
  wrapper = mount(withMockedProviders(<FeedPage />));
};

describe('<FeedPage />', () => {
  beforeEach(() => {
    mockLocalstorage('1');
    setup();
  });

  it('should show a create post section', async () => {
    expect(wrapper.find('CreatePost').length).toBe(1);
  });

  it('should show a left rail', async () => {
    expect(findByTestId(wrapper, 'left-rail').length).toBe(1);
  });

  it('should show a right rail', async () => {
    expect(findByTestId(wrapper, 'right-rail').length).toBe(1);
  });

  it('should show a repo list', async () => {
    expect(findByTestId(wrapper, 'repo-list').length).toBe(1);
  });
});
