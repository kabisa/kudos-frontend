import React, { ChangeEvent, Component, FormEvent } from 'react';
import gql from 'graphql-tag';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import { FormWrapper } from '../../components';
import BackButton from './BackButton';
import { validateEmail } from '../../support';

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
}

type ForgotPasswordMutationCallback = (props: any) => Promise<any>;

class ForgotPasswordPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: '',
      success: false,
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
        >
          {(resetPassword, { error, loading }: any) => (
            <div>
              <Form size="large" error={error} onSubmit={(e) => this.formSubmit(e, resetPassword)}>
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    type="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <Button color="blue" fluid size="large" loading={loading} disabled={loading}>
                    Reset password
                  </Button>

                  {error && (
                  <Message negative>
                    <Message.Header>Unable to reset the password</Message.Header>
                    <p>Something went wrong.</p>
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
