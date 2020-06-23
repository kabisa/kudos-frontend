import React from 'react';

import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';
import {
  findByTestId, simulateInputChange, wait, withMockedProviders,
} from '../../spec_helper';
import { RegisterPage } from './index';
import { MUTATION_REGISTER } from './RegisterPage';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_REGISTER,
      variables: {
        name: 'Max',
        email: 'max@example.com',
        password: 'password',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          signUpUser: {
            authenticateData: {
              token: '1',
              user: {
                id: '1',
              },
            },
          },
        },
      };
    },
  },
];
const mocksWithError = [
  {
    request: {
      query: MUTATION_REGISTER,
      variables: {
        name: 'Max',
        email: 'max@example.com',
        password: 'password',
      },
    },
    result: {
      errors: [new GraphQLError('It broke')],
    },
  },
];

describe('<RegisterPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<RegisterPage />, mocks));
  });

  it('handles input correctly', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      expect(component.state.name).toBe('');
      expect(component.state.email).toBe('');
      expect(component.state.password).toBe('');

      simulateInputChange(wrapper, 'name-input', 'name', 'Max');
      simulateInputChange(wrapper, 'email-input', 'email', 'max@example.com');
      simulateInputChange(wrapper, 'password-input', 'password', 'password');

      await wrapper.update();
      expect(component.state.name).toBe('Max');
      expect(component.state.email).toBe('max@example.com');
      expect(component.state.password).toBe('password');
    });
  });

  it('shows a message if the name is empty', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: '', email: 'email', password: 'password' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      expect(component.state.error).toBe('You need to fill all fields.');
      expect(wrapper.containsMatchingElement(<p>You need to fill all fields.</p>)).toBe(true);
    });
  });

  it('shows a message if the email is empty', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: '', password: 'password' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      expect(component.state.error).toBe('You need to fill all fields.');
      expect(wrapper.containsMatchingElement(<p>You need to fill all fields.</p>)).toBe(true);
    });
  });

  it('shows a message if the password is empty', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: 'email', password: '' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      expect(component.state.error).toBe('You need to fill all fields.');
      expect(wrapper.containsMatchingElement(<p>You need to fill all fields.</p>)).toBe(true);
    });
  });

  it('shows a message if the email is invalid', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: 'fakeEmail', password: 'password' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      expect(component.state.error).toBe('Invalid email.');
      expect(wrapper.containsMatchingElement(<p>Invalid email.</p>)).toBe(true);
    });
  });

  it('shows a message if the password is too short', async () => {
    const component: any = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: 'max@example.com', password: 'short' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      expect(component.state.error).toBe('Password needs to have a minimum of 8 characters.');
      expect(wrapper.containsMatchingElement(<p>Password needs to have a minimum of 8 characters.</p>)).toBe(true);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<RegisterPage />, mocksWithError));
    const component = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: 'max@example.com', password: 'password' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'error-message').text()).toBe('It broke');
    });
  });

  it('calls the mutation', async () => {
    const component = wrapper.find('RegisterPage').instance();

    await act(async () => {
      component.setState({ name: 'Max', email: 'max@example.com', password: 'password' });
      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
