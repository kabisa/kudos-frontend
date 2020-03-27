import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  findByTestId, simulateInputChange, wait, withMockedProviders,
} from '../../spec_helper';
import { ResetPasswordPage } from './index';
import { MUTATION_RESET_PASSWORD } from './ResetPasswordPage';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_RESET_PASSWORD,
      variables: {
        currentPassword: 'oldPassword',
        newPassword: 'newPassword',
        newPasswordConfirmation: 'newPassword',
      },
    },
    result: () => {
      mutationCalled = true;
      return { data: { resetPassword: { user: { id: '1' } } } };
    },
  },
];

describe('<ResetPasswordPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<ResetPasswordPage />, mocks));
  });

  it('has three input elements', () => {
    const fields = wrapper.find('.field');

    expect(fields.length).toBe(3);
  });

  it('shows an error if the current password is blank', async () => {
    await act(async () => {
      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Current password can&#39;t be blank.</p>)).toBe(true);
    });
  });

  it('shows an error if the new password is blank', async () => {
    await act(async () => {
      simulateInputChange(wrapper, 'current-password-input', 'currentPassword', 'oldPassword');

      await wrapper.update();

      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(wrapper.containsMatchingElement(<p>New password can&#39;t be blank.</p>)).toBe(true);
    });
  });

  it('shows an error if the password confirm is blank', async () => {
    await act(async () => {
      simulateInputChange(wrapper, 'current-password-input', 'currentPassword', 'oldPassword');
      simulateInputChange(wrapper, 'new-password-input', 'newPassword', 'newPassword');

      await wrapper.update();

      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Password confirmation can&#39;t be blank.</p>)).toBe(true);
    });
  });

  it('shows an error if the new passwords dont match', async () => {
    await act(async () => {
      simulateInputChange(wrapper, 'current-password-input', 'currentPassword', 'oldPassword');
      simulateInputChange(wrapper, 'new-password-input', 'newPassword', 'newPassword');
      simulateInputChange(wrapper, 'confirm-password-input', 'newPasswordConfirmation', 'otherNewPassword');

      await wrapper.update();

      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Password don&#39;t match.</p>)).toBe(true);
    });
  });

  it('shows an error if the password length is too short', async () => {
    await act(async () => {
      simulateInputChange(wrapper, 'current-password-input', 'currentPassword', 'oldPassword');
      simulateInputChange(wrapper, 'new-password-input', 'newPassword', 'a');
      simulateInputChange(wrapper, 'confirm-password-input', 'newPasswordConfirmation', 'a');

      await wrapper.update();

      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      const expectedElement = <p>Password needs to have a minimum of 8 characters.</p>;
      expect(wrapper.containsMatchingElement(expectedElement)).toBe(true);
    });
  });

  it('calls the mutation if all contraints are met', async () => {
    await act(async () => {
      simulateInputChange(wrapper, 'current-password-input', 'currentPassword', 'oldPassword');
      simulateInputChange(wrapper, 'new-password-input', 'newPassword', 'newPassword');
      simulateInputChange(wrapper, 'confirm-password-input', 'newPasswordConfirmation', 'newPassword');

      await wrapper.update();

      findByTestId(wrapper, 'reset-password-button').hostNodes().simulate('click');

      await wait(0);
      wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });
});
