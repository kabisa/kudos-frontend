import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, simulateInputChange, wait, withMockedProviders,
} from '../../spec_helper';
import FinishForgotPasswordPage, { MUTATION_NEW_PASSWORD } from './FinishForgotPasswordPage';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_NEW_PASSWORD,
      variables: {
        reset_password_token: '1',
        password: 'password',
        password_confirmation: 'password',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          newPassword: {
            user: {
              id: '1',
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
      query: MUTATION_NEW_PASSWORD,
      variables: {
        reset_password_token: '1',
        password: 'password',
        password_confirmation: 'password',
      },
    },
    error: new Error('It broke'),
  },
];

describe('<FinishForgotPasswordPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<FinishForgotPasswordPage reset_password_token="1" />, mocks));
  });

  it('handles input correctly', async () => {
    const component: any = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      expect(component.state.password).toBe('');

      simulateInputChange(wrapper, 'password-input', 'password', 'password');

      await wrapper.update();

      expect(component.state.password).toBe('password');
    });
  });

  it('shows a message if the password field is empty', async () => {
    const component: any = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      expect(component.state.password).toBe('');

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Fields can&#39;t be empty.</p>)).toBe(true);
    });
  });

  it('shows a message if the confirm password field is empty', async () => {
    const component = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ password: 'password' });

      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Fields can&#39;t be empty.</p>)).toBe(true);
    });
  });

  it('shows a message if the passwords arent the same', async () => {
    const component = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ password: 'password', passwordConfirm: 'otherPassword' });

      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Passwords don&#39;t match.</p>)).toBe(true);
    });
  });

  it('calls the mutation', async () => {
    const component = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ password: 'password', passwordConfirm: 'password' });

      await wrapper.update();
      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<FinishForgotPasswordPage reset_password_token="1" />, mocksWithError));
    const component = wrapper.find('FinishForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ password: 'password', passwordConfirm: 'password' });

      await wrapper.update();
      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Network error: It broke</p>)).toBe(true);
    });
  });
});
