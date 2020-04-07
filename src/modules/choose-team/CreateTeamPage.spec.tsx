import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';
import {
  findByTestId, simulateInputChange, wait, withMockedProviders,
} from '../../spec_helper';
import CreateTeamPage, { MUTATION_CREATE_TEAM } from './CreateTeamPage';
import { Storage } from '../../support/storage';

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
    result: {
      errors: [new GraphQLError('It broke')],
    },
  },
];


describe('<CreateTeamPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(async () => {
    mutationCalled = false;
    Storage.setItem = jest.fn();

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

  it('handles input correctly', async () => {
    const component: any = wrapper.find('CreateTeamPage').instance();

    await act(async () => {
      expect(component.state.name).toBe('');

      simulateInputChange(wrapper, 'name-input', 'name', 'Kabisa');
      await wrapper.update();

      expect(component.state.name).toBe('Kabisa');
    });
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
    const component = wrapper.find('CreateTeamPage').instance();
    await act(async () => {
      component.setState({ name: 'Kabisa' });
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

      expect(findByTestId(wrapper, 'error-message').text()).toBe('It broke');
    });
  });

  it('calls the mutation if the name is not null', async () => {
    const component = wrapper.find('CreateTeamPage').instance();
    await act(async () => {
      component.setState({ name: 'Kabisa' });
      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);

      wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('sets the team id in local storage if the mutation is successful', async () => {
    const component = wrapper.find('CreateTeamPage').instance();

    await act(async () => {
      component.setState({ name: 'Kabisa' });
      await wrapper.update();

      findByTestId(wrapper, 'create-team-button').hostNodes().simulate('click');

      await wait(0);

      wrapper.update();

      expect(Storage.setItem).toBeCalledWith('team_id', '1');
    });
  });
});
