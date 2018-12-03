import { h, Component } from "preact";
import { Button, Form, Message } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";

import settings from "../../config/settings";
import {
  auth,
  getGraphqlError,
  ERROR_SHORT_PASSWORD,
  ERROR_PASSWORD_BLANK,
  ERROR_PASSWORD_MATCH,
  ERROR_PASSWORD_CONFIRMATION_BLANK,
} from "../../support";
import { Navigation, Toolbar } from "../../components/navigation";

import s from "./UserPage.scss";

export const MUTATION_RESET_PASSWORD = gql`
  mutation ResetPassword(
    $current_password: String
    $new_password: String
    $new_password_confirmation: String
  ) {
    resetPassword(
      current_password: $current_password
      new_password: $new_password
      new_password_confirmation: $new_password_confirmation
    ) {
      id
    }
  }
`;

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
      error: null,
    };
    this.initialState = this.state;

    auth();

    this.resetPassword = this.resetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  resetPassword(mutate) {
    const {
      current_password,
      new_password,
      new_password_confirmation,
    } = this.state;

    if (!new_password || !current_password) {
      this.setState({ error: ERROR_PASSWORD_BLANK });
      return;
    }
    if (!new_password_confirmation) {
      this.setState({ error: ERROR_PASSWORD_CONFIRMATION_BLANK });
      return;
    }
    if (new_password !== new_password_confirmation) {
      this.setState({ error: ERROR_PASSWORD_MATCH });
      return;
    }
    if (new_password.length < settings.MIN_PASSWORD_LENGTH) {
      this.setState({ error: ERROR_SHORT_PASSWORD });
      return;
    }

    mutate({
      variables: {
        current_password,
        new_password,
        new_password_confirmation,
      },
    });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });

    if (
      this.state.new_password === this.state.new_password_confirmation &&
      this.state.error
    ) {
      this.setState({ error: false });
    }
  }

  render() {
    return (
      <div id="root">
        <Toolbar text="Reset password" />
        <div className="main-form">
          <div className={s.page}>
            <Mutation
              mutation={MUTATION_RESET_PASSWORD}
              onCompleted={() => {
                this.setState(this.initialState);
                toast.info("Password reset succesfully!");
              }}
            >
              {(resetPassword, { error, loading }) => {
                let displayError;
                if (error) {
                  displayError = getGraphqlError(error);
                }
                if (this.state.error) {
                  displayError = this.state.error;
                }
                return (
                  <Form style={{ maxWidth: "420px", margin: "auto" }}>
                    <Form.Input
                      label="Current password"
                      fluid
                      icon="lock"
                      name="current_password"
                      iconPosition="left"
                      type="password"
                      placeholder="Current password"
                      value={this.state.current_password}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="New password"
                      fluid
                      icon="lock"
                      name="new_password"
                      iconPosition="left"
                      type="password"
                      placeholder="New password"
                      value={this.state.new_password}
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Confirm new password"
                      fluid
                      icon="lock"
                      name="new_password_confirmation"
                      iconPosition="left"
                      type="password"
                      placeholder="Confirm new password"
                      value={this.state.new_password_confirmation}
                      onChange={this.handleChange}
                    />
                    <Button
                      className={s.button}
                      color="blue"
                      loading={loading}
                      disabled={loading}
                      onClick={() => this.resetPassword(resetPassword)}
                    >
                      Reset password
                    </Button>
                    {displayError && (
                      <Message negative>
                        <Message.Header>
                          Unable to reset password
                        </Message.Header>
                        <p>{displayError}</p>
                      </Message>
                    )}
                  </Form>
                );
              }}
            </Mutation>
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default ResetPasswordPage;
