import { Component, FormEvent } from "react";
import { Link, withRouter } from "react-router-dom";
import { History } from "history";
import { Mutation } from "@apollo/client/react/components";
import { ApolloError, gql } from "@apollo/client";

import {
  PATH_CHOOSE_TEAM,
  PATH_FORGOT_PASSWORD,
  PATH_REGISTER,
} from "../../routes";
import {
  Auth,
  ERROR_EMAIL_INVALID,
  ERROR_INCOMPLETE,
  getGraphqlError,
  validateEmail,
} from "../../support";
import { FormWrapper } from "../../components";
import { loginSuccess } from "./helper";

import s from "./LoginPage.module.css";
import {
  Button,
  Input,
  Link as KabisaLink,
  Label,
} from "@kabisa/ui-components";
import Segment from "../../components/atoms/Segment";
import BasePage from "./BasePage";

export const MUTATION_LOGIN = gql`
  mutation SignInUser($email: EmailAddress!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      authenticateData {
        token
        user {
          id
        }
      }
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
    errors: ApolloError[];
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

    if (Auth.isLoggedIn()) {
      this.props.history.push(PATH_CHOOSE_TEAM);
    }

    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.confirm = this.confirm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  confirm(data: LoginResult) {
    if (data.signInUser.authenticateData) {
      loginSuccess(data.signInUser.authenticateData);

      this.props.history.push(PATH_CHOOSE_TEAM);
    } else {
      this.setState({ error: "Something went wrong." });
    }
  }

  formSubmit(e: FormEvent, signInUser: any) {
    e.preventDefault();
    this.setState({ error: "" });
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
        onError={(error) => {
          this.setState({ error: getGraphqlError(error) });
        }}
        onCompleted={(data) => this.confirm(data)}
      >
        {(signInUser, { loading }) => {
          let displayError;
          if (this.state.error) {
            displayError = this.state.error;
          }
          return (
            <BasePage>
              <FormWrapper header="Login">
                <Segment>
                  <form
                    className="form-container"
                    onSubmit={(e) => this.formSubmit(e, signInUser)}
                  >
                    <Label>
                      Email
                      <Input
                        data-testid="email-input"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </Label>

                    <Label>
                      Password
                      <Input
                        data-testid="password-input"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </Label>

                    <Button
                      data-testid="submit-button"
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className={s.button}
                    >
                      Login
                    </Button>

                    {displayError && (
                      <div className="errorMessage">
                        <h3>Unable to login</h3>
                        <p data-testid="error-message">{displayError}</p>
                      </div>
                    )}
                  </form>
                  <div className={s.footer}>
                    <Link
                      data-testid="sign-up-button"
                      to={PATH_REGISTER}
                      className={s.left}
                    >
                      <KabisaLink theme="dark">Sign Up</KabisaLink>
                    </Link>
                    <Link
                      data-testid="forgot-button"
                      to={PATH_FORGOT_PASSWORD}
                      className={s.right}
                    >
                      <KabisaLink theme="dark">Forgot password?</KabisaLink>
                    </Link>
                  </div>
                </Segment>
              </FormWrapper>
            </BasePage>
          );
        }}
      </Mutation>
    );
  }
}

// @ts-ignore
export default withRouter(LoginPage);
