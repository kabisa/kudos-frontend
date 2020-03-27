import React from 'react';
import { mount } from 'enzyme';
import { createMemoryHistory, MemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { findByTestId, withMockedProviders } from '../../spec_helper';
import { Content } from './ChooseTeamPage';

describe('<ChooseTeamPage />', () => {
  let wrapper: any;
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    wrapper = mount(withMockedProviders(<Content history={history} />));
  });

  it('renders the invite list', () => {
    expect(findByTestId(wrapper, 'invite-list').length).toBe(1);
  });

  it('renders the team list', () => {
    expect(wrapper.find('TeamList').length).toBe(1);
  });

  it('renders the create team button', () => {
    expect(wrapper.find('.button').length).toBe(1);
  });

  it('navigates to the create team page', async () => {
    await act(() => {
      findByTestId(wrapper, 'create-team').hostNodes().simulate('click');

      wrapper.update();

      expect(history.location.pathname).toBe('/create-team');
    });
  });
});
