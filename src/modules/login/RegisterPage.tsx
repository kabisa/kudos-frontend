import React, { ChangeEvent, Component, FormEvent } from 'react';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { History } from 'history';
import { withRouter } from 'react-router-dom';
import {
  ERROR_EMAIL_INVALID,
  ERROR_INCOMPLETE,
  ERROR_SHORT_PASSWORD, getGraphqlError,
  validateEmail,
} from '../../support';
import { FormWrapper } from '../../components';
import BackButton from '../../components/back-button/BackButton';
import { loginSuccess } from './helper';
import settings from '../../config/settings';
import { PATH_LOGIN } from '../../routes';

export const MUTATION_REGISTER = gql`
    mutation SignUpUser($name: String!, $email: EmailAddress!, $password: String!) {
        signUpUser(credentials: { name: $name, email: $email, password: $password, passwordConfirmation: $password }) {
            authenticateData {
                token
                user {
                    id
                }
            }
        }
    }
`;

export interface RegisterResult {
  signUpUser: {
    authenticateData: {
      token: string;
      user: {
        id: string;
      };
    };
  };
}

export interface RegisterParameters {
  name: string;
  email: string;
  password: string;
}

export interface Props {
  history: History;
}

export interface State {
  name: string;
  email: string;
  password: string;
  error: string;
}

class RegisterPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
  }

  confirm(data: RegisterResult) {
    if (data.signUpUser.authenticateData) {
      loginSuccess(data.signUpUser.authenticateData);
      this.props.history.push(PATH_LOGIN);
    }
  }

  formSubmit(e: FormEvent, signUpUser: any) {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.setState({ error: '' });

    if (!name || !email || !password) {
      this.setState({ error: ERROR_INCOMPLETE });
      return;
    }

    if (!validateEmail(email)) {
      this.setState({ error: ERROR_EMAIL_INVALID });
      return;
    }

    if (password.length < settings.MIN_PASSWORD_LENGTH) {
      this.setState({ error: ERROR_SHORT_PASSWORD });
      return;
    }

    signUpUser({
      variables: { name, email, password },
    });
  }

  render() {
    return (
      <Mutation<RegisterResult, RegisterParameters>
        mutation={MUTATION_REGISTER}
        onError={(error) => this.setState({ error: getGraphqlError(error) })}
        onCompleted={(data) => this.confirm(data)}
      >
        {(signUpUser, { error, loading }: any) => {
          let displayError;
          if (this.state.error) {
            displayError = this.state.error;
          }

          return (
            <FormWrapper toolbar="Register" header="Register">
              <Segment>
                <Form size="large" error={!!error} onSubmit={(e) => this.formSubmit(e, signUpUser)}>
                  <Form.Input
                    data-testid="name-input"
                    fluid
                    icon="user"
                    name="name"
                    iconPosition="left"
                    placeholder="Name"
                    autoFocus="on"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
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
                  <Form.Input
                    data-testid="password-input"
                    fluid
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
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
                    Register
                  </Button>

                  {displayError && (
                  <Message negative>
                    <Message.Header>Unable to register</Message.Header>
                    <p data-testid="error-message">{displayError}</p>
                  </Message>
                  )}
                </Form>
                <BackButton />
              </Segment>
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}

// @ts-ignore
export default withRouter(RegisterPage);
