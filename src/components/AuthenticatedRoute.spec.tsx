import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestId, withMockedProviders } from '../spec_helper';
import AuthenticatedRoute from './AuthenticatedRoute';

let wrapper: ReactWrapper;
const setup = (allowNoTeam: boolean) => {
  wrapper = mount(
    withMockedProviders(<AuthenticatedRoute allowNoTeam={allowNoTeam} component={<h1>Some component</h1>} />),
  );
};
describe('<AuthenticatedRoute />', () => {
  beforeEach(() => {
    setup(false);
  });

  it('does not render the page if the user is not logged in', () => {
    jest.mock('../support/auth', () => ({
      isLoggedIn: jest.fn().mockImplementation(() => false),
    }));

    expect(findByTestId(wrapper, 'redirect').length).toBe(1);
  });

  it('does not render the page if the user has no team and allowNoTeam is false', () => {
    setup(false);
    jest.mock('../support/auth', () => ({
      isLoggedIn: jest.fn().mockImplementation(() => false),
      hasTeam: jest.fn().mockImplementation(() => false),
    }));

    expect(findByTestId(wrapper, 'redirect').length).toBe(1);
  });

  it('does render the page if the user has no team and allowNoTeam is true', () => {
    setup(true);
    jest.mock('../support/auth', () => ({
      isLoggedIn: jest.fn().mockImplementation(() => false),
      hasTeam: jest.fn().mockImplementation(() => false),
    }));

    expect(findByTestId(wrapper, 'redirect').length).toBe(1);
  });

  it('does render the page if the user is logged in and has a team', () => {
    setup(false);
    jest.mock('../support/auth', () => ({
      isLoggedIn: jest.fn().mockImplementation(() => false),
      hasTeam: jest.fn().mockImplementation(() => true),
    }));

    expect(findByTestId(wrapper, 'redirect').length).toBe(1);
  });
});
