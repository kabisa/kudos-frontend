import { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { toast } from "react-toastify";
import { PATH_LOGIN } from "../../routes";

import { FormWrapper } from "../../components";
import BackButton from "../../components/back-button/BackButton";
import { getGraphqlError } from "../../support";
import { Button, Input } from "@sandercamp/ui-components";

const DEFAULT_ERROR = "Something went wrong.";
const PASSWORD_ERROR = "Passwords don't match.";
const EMPTY_ERROR = "Fields can't be empty.";

export const MUTATION_NEW_PASSWORD = gql`
  mutation NewPassword(
    $reset_password_token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    newPassword(
      resetPasswordToken: $reset_password_token
      password: $password
      passwordConfirmation: $password_confirmation
    ) {
      user {
        id
      }
    }
  }
`;

export interface NewPasswordResult {
  user: {
    id: string;
  };
}

export interface NewPasswordParameters {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}

export interface Props {
  reset_password_token: string;
  history: History;
}

export interface State {
  password: string;
  passwordConfirm: string;
  error: string;
}

class FinishForgotPasswordPage extends Component<Props, State> {
  token: string;

  constructor(props: Props) {
    super(props);

    this.state = {
      password: "",
      passwordConfirm: "",
      error: "",
    };

    this.token = props.reset_password_token || "";

    this.formSubmit = this.formSubmit.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onCompleted(data: any) {
    if (data.newPassword) {
      this.props.history.push(PATH_LOGIN);
      toast.info("Successfully reset password!");
    } else {
      this.setState({ error: DEFAULT_ERROR });
    }
  }

  formSubmit(e: any, mutation: any) {
    e.preventDefault();

    const { password, passwordConfirm } = this.state;

    if (!password || !passwordConfirm) {
      this.setState({ error: EMPTY_ERROR });
      return;
    }

    if (password !== passwordConfirm) {
      this.setState({ error: PASSWORD_ERROR });
      return;
    }

    mutation({
      variables: {
        reset_password_token: this.token,
        password,
        password_confirmation: passwordConfirm,
      },
    });
  }

  render() {
    const { error: formError } = this.state;
    return (
      <FormWrapper header="Reset password">
        <Mutation<NewPasswordResult, NewPasswordParameters>
          mutation={MUTATION_NEW_PASSWORD}
          onCompleted={(data) => this.onCompleted(data)}
          onError={(error) => this.setState({ error: getGraphqlError(error) })}
        >
          {(mutation, { error, loading }) => (
            <div>
              <form onSubmit={(e) => this.formSubmit(e, mutation)}>
                <div className="ui segment">
                  <Input
                    data-testid="password-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <Input
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm password"
                    value={this.state.passwordConfirm}
                    onChange={(e) =>
                      this.setState({ passwordConfirm: e.target.value })
                    }
                  />
                  <Button
                    data-testid="submit-button"
                    variant="primary"
                    disabled={loading}
                  >
                    Reset password
                  </Button>

                  {formError && (
                    <div className="errorMessage">
                      <h3>Unable to reset password</h3>
                      <p>{this.state.error}</p>
                    </div>
                  )}
                </div>
              </form>
              <BackButton />
            </div>
          )}
        </Mutation>
      </FormWrapper>
    );
  }
}

// @ts-ignore
export default withRouter(FinishForgotPasswordPage);
