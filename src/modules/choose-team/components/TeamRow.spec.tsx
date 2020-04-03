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
    jest.clearAllMocks();

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
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(spy).toBeCalledWith('team_id', '1');
    });
  });

  it('sets the user role on button click', async () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem');

    await act(async () => {
      wrapper.find('.button').hostNodes().simulate('click');

      await wait(0);

      expect(spy).toBeCalledWith('team_role', 'Admin');
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
