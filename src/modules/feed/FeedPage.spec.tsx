import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId,
  mockLocalstorage, withMockedProviders,
} from '../../spec_helper';
import { FeedPage } from './index';
import { render, screen } from '@testing-library/react';

let wrapper: ReactWrapper;

const setup = () => {
  wrapper = mount(withMockedProviders(<FeedPage />));
};

describe('<FeedPage />', () => {
  beforeEach(async () => {
    mockLocalstorage('1');

    await act(async () => {
      setup();
    });
  });

  it('should show a create post section', async () => {
    expect(wrapper.find('CreatePost').length).toBe(1);
  });

  it('should show a right rail', async () => {
    render(
      withMockedProviders(<FeedPage />)
    );

    expect(screen.getAllByTestId("right-tail").length).toBe(1);
  });

  it('should show a repo list', async () => {
    expect(findByTestId(wrapper, 'repo-list').length).toBe(1);
  });
});
