import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, findInputByTestId, wait, withMockedProviders,
} from '../../spec_helper';
import CreateTeamPage, { MUTATION_CREATE_TEAM } from './CreateTeamPage';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: 'Kabisa' },
    },
    result: () => {
      mutationCalled = true;
      return { data: { createTeam: { team: { id: '1' } } } };
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: MUTATION_CREATE_TEAM,
      variables: { name: 'Kabisa' },
    },
    error: new Error('It broke'),
  },
];


describe('<CreateTeamPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(async () => {
    mutationCalled = false;

    await act(async () => {
      wrapper = mount(withMockedProviders(<CreateTeamPage />, mocks));
    });
  });

  it('renders a name field', () => {
    expect(wrapper.find('.field').length).toBe(1);
  });

  it('renders the create team button', () => {
    expect(wrapper.containsMatchingElement(<button>Create team</button>)).toBe(true);
  });

  it('returns an error if the name is null', async () => {
    await act(async () => {
      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(findByTestId(wrapper, 'error-message').text()).toBe('Name can\'t be blank.');
    });
  });

  it('Sets the loading state', async () => {
    await act(async () => {
      const input = findInputByTestId(wrapper, 'create-team-input');

      input.simulate('change', { target: { name: 'name', value: 'Kabisa' } });

      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      expect(wrapper.find('.loading').length).toBe(1);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<CreateTeamPage />, mocksWithError));
    const component = wrapper.find('CreateTeamPage').instance();

    await act(async () => {
      component.setState({ name: 'Kabisa' });
      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'error-message').text()).toBe('Network error: It broke');
    });
  });

  it('calls the mutation if the name is not null', async () => {
    await act(async () => {
      const input = findInputByTestId(wrapper, 'create-team-input');

      input.simulate('change', { target: { name: 'name', value: 'Kabisa' } });

      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);

      wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('sets the team id in local storage if the mutation is successful', async () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    await act(async () => {
      const input = findInputByTestId(wrapper, 'create-team-input');

      input.simulate('change', { target: { name: 'name', value: 'Kabisa' } });

      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);

      wrapper.update();

      expect(localStorage.setItem).toBeCalledWith('team_id', '1');
    });
  });
});
