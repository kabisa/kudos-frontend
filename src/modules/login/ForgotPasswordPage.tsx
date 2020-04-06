import React, { ChangeEvent, Component, FormEvent } from 'react';
import gql from 'graphql-tag';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';

import { FormWrapper } from '../../components';
import BackButton from './BackButton';
import { getGraphqlError, validateEmail } from '../../support';

export const MUTATION_FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: EmailAddress!) {
        forgotPassword(credentials: { email: $email }) {
            email
        }
    }
`;

export interface ForgotPasswordResult {
  email: string;
}

export interface ForgotPasswordParameters {
  email: string;
}

export interface Props {}

export interface State {
  email: string;
  success: boolean;
  error: string;
}

type ForgotPasswordMutationCallback = (props: any) => Promise<any>;

class ForgotPasswordPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      success: false,
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onCompleted() {
    this.setState({ success: true });
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  formSubmit(e: FormEvent, resetPassword: ForgotPasswordMutationCallback) {
    e.preventDefault();
    const { email } = this.state;

    if (!validateEmail(email)) {
      this.setState({ error: 'Invalid email address' });
      return;
    }

    resetPassword({
      variables: { email: this.state.email },
    });
  }

  render() {
    return (
      <FormWrapper header="Forgot password">
        <Mutation<ForgotPasswordResult, ForgotPasswordParameters>
          mutation={MUTATION_FORGOT_PASSWORD}
          onCompleted={this.onCompleted}
          onError={(error) => this.setState({ error: getGraphqlError(error) })}
        >
          {(resetPassword, { error, loading }: any) => (
            <div>
              <Form size="large" error={!!error} onSubmit={(e) => this.formSubmit(e, resetPassword)}>
                <Segment>
                  <Form.Input
                    data-testid="email-input"
                    fluid
                    icon="user"
                    name="email"
                    type="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <Button
                    data-testid="submit-button"
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Reset password
                  </Button>

                  {this.state.error && (
                  <Message negative>
                    <Message.Header>Unable to reset the password</Message.Header>
                    <p data-testid="error-message">{this.state.error}</p>
                  </Message>
                  )}

                  {this.state.success && (
                  <Message
                    header="Reset password instructions sent"
                    content="Check your mail for the details."
                  />
                  )}
                  <BackButton />
                </Segment>
              </Form>
            </div>
          )}
        </Mutation>
      </FormWrapper>
    );
  }
}

export default ForgotPasswordPage;
