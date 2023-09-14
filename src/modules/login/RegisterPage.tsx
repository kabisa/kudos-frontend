import { ChangeEvent, Component, FormEvent } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { History } from "history";
import { withRouter } from "react-router-dom";
import {
  ERROR_EMAIL_INVALID,
  ERROR_INCOMPLETE,
  ERROR_SHORT_PASSWORD,
  getGraphqlError,
  validateEmail,
} from "../../support";
import { FormWrapper } from "../../components";
import BackButton from "../../components/back-button/BackButton";
import { loginSuccess } from "./helper";
import settings from "../../config/settings";
import { PATH_LOGIN } from "../../routes";
import { Button, Input, Label } from "@sandercamp/ui-components";
import Segment from "../../components/atoms/Segment";
import BasePage from "./BasePage";
import s from "./RegisterPage.module.css";

export const MUTATION_REGISTER = gql`
  mutation SignUpUser(
    $name: String!
    $email: EmailAddress!
    $password: String!
  ) {
    signUpUser(
      credentials: {
        name: $name
        email: $email
        password: $password
        passwordConfirmation: $password
      }
    ) {
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
      name: "",
      email: "",
      password: "",
      error: "",
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
    this.setState({ error: "" });

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
            <BasePage>
              <FormWrapper toolbar="Register" header="Register">
                <Segment>
                  <form
                    className="form-container"
                    onSubmit={(e) => this.formSubmit(e, signUpUser)}
                  >
                    <Label>
                      Name
                      <Input
                        data-testid="name-input"
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      />
                    </Label>

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
                      variant="primary"
                      disabled={loading}
                      className={s.button}
                    >
                      Register
                    </Button>

                    {displayError && (
                      <div className="errorMessage">
                        <h3>Unable to register</h3>
                        <p data-testid="error-message">{displayError}</p>
                      </div>
                    )}
                  </form>
                  <BackButton />
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
export default withRouter(RegisterPage);
