import { Component } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { History } from "history";
import { toast } from "react-toastify";
import { PATH_LOGIN } from "../../routes";

import { FormWrapper } from "../../components";
import BackButton from "../../components/back-button/BackButton";
import { getGraphqlError } from "../../support";
import { Button } from "@kabisa/ui-components";
import Segment from "../../components/atoms/Segment";
import BasePage from "./BasePage";
import s from "./FinishForgotPasswordPage.module.css";
import MessageBox from "../../ui/MessageBox";
import React from "react";
import { PasswordField } from "../../components/PasswordField";

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

export interface Props extends RouteComponentProps {
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

    const searchParams = new URLSearchParams(props.location.search);

    this.token = searchParams.get("reset_password_token") || "";

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
      <BasePage>
        <FormWrapper header="Reset password">
          <Mutation<NewPasswordResult, NewPasswordParameters>
            mutation={MUTATION_NEW_PASSWORD}
            onCompleted={(data) => this.onCompleted(data)}
            onError={(error) =>
              this.setState({ error: getGraphqlError(error) })
            }
          >
            {(mutation, { loading }) => (
              <Segment>
                <form
                  className="form-container"
                  onSubmit={(e) => this.formSubmit(e, mutation)}
                >
                  <PasswordField
                    label="Password"
                    testId="password-input"
                    name="password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <PasswordField
                    label="Confirm password"
                    name="passwordConfirm"
                    value={this.state.passwordConfirm}
                    onChange={(e) =>
                      this.setState({ passwordConfirm: e.target.value })
                    }
                  />
                  <Button
                    data-testid="submit-button"
                    variant="primary"
                    disabled={loading}
                    className={s.button}
                  >
                    Reset password
                  </Button>

                  {formError && (
                    <MessageBox
                      variant="error"
                      title="Unable to reset password"
                      message={this.state.error}
                    />
                  )}
                </form>
                <BackButton />
              </Segment>
            )}
          </Mutation>
        </FormWrapper>
      </BasePage>
    );
  }
}

// @ts-ignore
export default withRouter(FinishForgotPasswordPage);
