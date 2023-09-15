import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';
import {
  findByTestId, simulateInputChange, wait, withMockedProviders,
} from '../../spec_helper';
import { ForgotPasswordPage } from './index';
import { MUTATION_FORGOT_PASSWORD } from './ForgotPasswordPage';

let mutationCalled = false;
const mocks = [
  {
    request: {
      query: MUTATION_FORGOT_PASSWORD,
      variables: {
        email: 'max@example.com',
      },
    },
    result: () => {
      mutationCalled = true;
      return {
        data: {
          forgotPassword: {
            email: 'max@example.com',
          },
        },
      };
    },
  },
];

const mocksWithErrors = [
  {
    request: {
      query: MUTATION_FORGOT_PASSWORD,
      variables: {
        email: 'max@example.com',
      },
    },
    result: {
      errors: [new GraphQLError('It broke')],
    },
  },
];

describe('<ForgotPasswordPage />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mutationCalled = false;
    wrapper = mount(withMockedProviders(<ForgotPasswordPage />, mocks));
  });

  it('handles input correctly', async () => {
    const component: any = wrapper.find('ForgotPasswordPage').instance();

    await act(async () => {
      expect(component.state.email).toBe('');

      simulateInputChange(wrapper, 'email-input', 'email', 'max@example.com');

      await wrapper.update();

      expect(component.state.email).toBe('max@example.com');
    });
  });

  it('shows a message if the email in invalid', async () => {
    const component: any = wrapper.find('ForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ email: 'invalidEmail' });

      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wrapper.update();

      expect(component.state.error).toBe('Invalid email address');
      expect(wrapper.containsMatchingElement(<p>Invalid email address</p>)).toBe(true);
    });
  });

  it('calls the mutation', async () => {
    const component = wrapper.find('ForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ email: 'max@example.com' });

      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(mutationCalled).toBe(true);
    });
  });

  it('shows a message is the mutation is successful', async () => {
    const component = wrapper.find('ForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ success: true });

      await wrapper.update();

      expect(wrapper.containsMatchingElement(<p>Reset password instructions sent</p>));
    });
  });

  it('shows when there is an error', async () => {
    wrapper = mount(withMockedProviders(<ForgotPasswordPage />, mocksWithErrors));
    const component = wrapper.find('ForgotPasswordPage').instance();

    await act(async () => {
      component.setState({ email: 'max@example.com' });

      await wrapper.update();

      findByTestId(wrapper, 'submit-button').hostNodes().simulate('submit');

      await wait(0);
      await wrapper.update();

      expect(findByTestId(wrapper, 'error-message').text()).toBe('It broke');
    });
  });
});
