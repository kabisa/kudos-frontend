import React, { ChangeEvent, Component, FormEvent } from 'react';
import {
  Button, Form, Message, Segment,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { GraphQLError } from 'graphql';
import { PATH_CHOOSE_TEAM, PATH_FORGOT_PASSWORD, PATH_REGISTER } from '../../routes';
import {
  ERROR_EMAIL_INVALID, ERROR_INCOMPLETE, getGraphqlError, isLoggedIn, validateEmail,
} from '../../support';
import { FormWrapper } from '../../components';
import { loginSuccess } from './helper';

import s from './LoginPage.module.scss';

export const MUTATION_LOGIN = gql`
    mutation SignInUser($email: EmailAddress!, $password: String!) {
        signInUser(credentials: { email: $email, password: $password }) {
            authenticateData {
                token
                user {
                    id
                }
            }
            errors
        }
    }
`;

export interface LoginResult {
  signInUser: {
    authenticateData: {
      token: string;
      user: {
        id: string;
      };
    };
    errors: GraphQLError[];
  };
}

export interface LoginParameters {
  email: string;
  password: string;
}

export interface Props {
  history: History;
}

export interface State {
  email: string;
  password: string;
  error: string;
}

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    if (isLoggedIn()) {
      this.props.history.push(PATH_CHOOSE_TEAM);
    }

    this.state = {
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

  confirm(data: LoginResult) {
    if (data.signInUser.authenticateData) {
      loginSuccess(data.signInUser.authenticateData);

      this.props.history.push(PATH_CHOOSE_TEAM);
    } else {
      this.setState({ error: getGraphqlError(data.signInUser.errors) });
    }
  }

  formSubmit(e: FormEvent, signInUser: any) {
    e.preventDefault();
    this.setState({ error: '' });
    let { email } = this.state;
    const { password } = this.state;

    email = email.trim();

    if (!email || !password) {
      this.setState({ error: ERROR_INCOMPLETE });
      return;
    }

    if (!validateEmail(email)) {
      this.setState({ error: ERROR_EMAIL_INVALID });
      return;
    }

    signInUser({
      variables: { email, password },
    });
  }

  render() {
    return (
      <Mutation<LoginResult, LoginParameters>
        mutation={MUTATION_LOGIN}
        onCompleted={(data) => this.confirm(data)}
      >
        {(signInUser, { error, loading }) => {
          let displayError;
          if (error) {
            displayError = getGraphqlError(error);
          }
          if (this.state.error) {
            displayError = this.state.error;
          }
          return (
            <FormWrapper header="Login">
              <Segment>
                <Form size="large" error onSubmit={(e) => this.formSubmit(e, signInUser)}>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    type="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    autoFocus="on"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <Button type="submit" color="blue" fluid loading={loading} disabled={loading}>
                    Login
                  </Button>

                  {displayError && (
                  <Message negative>
                    <Message.Header>Unable to login</Message.Header>
                    <p>{displayError}</p>
                  </Message>
                  )}
                </Form>
                <Message>
                  <div className={s.message}>
                    <a href={PATH_REGISTER} className={s.left}>
                      Sign Up
                    </a>
                    <a href={PATH_FORGOT_PASSWORD} className={s.right}>
                      Forgot password?
                    </a>
                  </div>
                </Message>
              </Segment>
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}

// @ts-ignore
export default withRouter(LoginPage);
