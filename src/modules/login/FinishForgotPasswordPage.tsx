import React, { Component } from "react";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "@apollo/react-components";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { toast } from "react-toastify";
import { PATH_LOGIN } from "../../routes";

import { FormWrapper } from "../../components";
import BackButton from "../../components/back-button/BackButton";
import { getGraphqlError } from "../../support";

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

    this.handleChange = this.handleChange.bind(this);
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

  handleChange(e: any, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });
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
              <Form
                size="large"
                error={!!error}
                onSubmit={(e) => this.formSubmit(e, mutation)}
              >
                <Segment>
                  <Form.Input
                    data-testid="password-input"
                    fluid
                    icon="lock"
                    name="password"
                    type="password"
                    iconPosition="left"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="passwordConfirm"
                    type="password"
                    iconPosition="left"
                    placeholder="Confirm password"
                    value={this.state.passwordConfirm}
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

                  {formError && (
                    <Message
                      data-testid="error-message"
                      negative
                      header="Unable to reset the password."
                      content={this.state.error}
                    />
                  )}
                </Segment>
              </Form>
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
