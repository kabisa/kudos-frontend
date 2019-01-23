import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { PATH_REGISTER, PATH_FORGOT_PASSWORD, PATH_FEED } from "../../routes";
import {
  isLoggedIn,
  getGraphqlError,
  validateEmail,
  ERROR_INCOMPLETE,
  ERROR_EMAIL_INVALID,
} from "../../support";
import { FormWrapper } from "../../components";
import { loginSuccess } from "./helper";

import s from "./style.scss";
import settings from "src/config/settings";

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

class LoginPage extends Component {
  constructor(props) {
    super(props);

    if (isLoggedIn()) {
      route(PATH_FEED, true);
    }

    this.state = {
      email: "",
      password: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  confirm(data) {
    if (data.signInUser.authenticateData) {
      loginSuccess(data.signInUser.authenticateData);
    } else {
      this.setState({ error: data.signInUser.errors });
      return;
    }
  }

  formSubmit(e, signInUser) {
    e.preventDefault();
    this.setState({ error: null });
    let { email, password } = this.state;
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
      <Mutation
        mutation={MUTATION_LOGIN}
        onCompleted={data => this.confirm(data)}
      >
        {(signInUser, { error, loading }) => {
          console.log("Dit is de url:" + settings.API_BASE_URL);
          let displayError;
          if (error) {
            displayError = getGraphqlError(error);
          }
          if (this.state.error) {
            displayError = this.state.error;
          }
          return (
            <FormWrapper header="Login">
              <Form
                size="large"
                error
                onSubmit={e => this.formSubmit(e, signInUser)}
              >
                <Segment>
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

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Login
                  </Button>

                  {displayError && (
                    <Message negative>
                      <Message.Header>Unable to login</Message.Header>
                      <p>{displayError}</p>
                    </Message>
                  )}
                </Segment>
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
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default LoginPage;
