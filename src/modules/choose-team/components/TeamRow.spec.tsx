import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory, MemoryHistory } from 'history';
import { wait, withMockedProviders } from '../../../spec_helper';
import TeamRow from './TeamRow';

describe('<TeamRow />', () => {
  let wrapper: ReactWrapper;
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();

    wrapper = mount(withMockedProviders(
      <TeamRow
        history={history}
        id="1"
        name="Kabisa"
        userRole="Admin"
      />,
    ));
  });

  it('shows the team name', () => {
    expect(wrapper.containsMatchingElement(<p>Kabisa</p>)).toBe(true);
  });

  it('sets the team id on button click', async () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(localStorage.setItem).toBeCalledWith('team_id', '1');
    });
  });

  it('sets the user role on button click', async () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(localStorage.setItem).toBeCalledWith('team_role', 'Admin');
    });
  });

  it('navigates to the next page', async () => {
    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(history.location.pathname).toBe('/');
    });
  });
});
