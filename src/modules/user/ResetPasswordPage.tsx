import { ChangeEvent, Component } from "react";
import { Button } from "@kabisa/ui-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { History } from "history";

import settings from "../../config/settings";
import {
  ERROR_PASSWORD_BLANK,
  ERROR_PASSWORD_CONFIRMATION_BLANK,
  ERROR_PASSWORD_MATCH,
  ERROR_PASSWORD_NEW_BLANK,
  ERROR_SHORT_PASSWORD,
  getGraphqlError,
} from "../../support";

import { PATH_FEED } from "../../routes";
import BackButton from "../../components/back-button/BackButton";
import Segment from "../../components/atoms/Segment";
import Page from "../../components/templates/Page";

import s from "./ResetPasswordPage.module.scss";
import { FormWrapper } from "../../components";
import React from "react";
import { PasswordField } from "../../components/PasswordField";

export const MUTATION_RESET_PASSWORD = gql`
  mutation ResetPassword(
    $current_password: String
    $new_password: String
    $new_password_confirmation: String
  ) {
    resetPassword(
      currentPassword: $current_password
      newPassword: $new_password
      newPasswordConfirmation: $new_password_confirmation
    ) {
      user {
        id
      }
    }
  }
`;

export interface ResetPasswordParameters {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface CleanErrors {
  error: string;
  error_current: boolean;
  error_new: boolean;
  error_new_confirm: boolean;
}

export interface Props {
  history: History;
}

export interface State {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
  error: string;
  error_current: boolean;
  error_new: boolean;
  error_new_confirm: boolean;
}

class ResetPasswordPage extends Component<Props, State> {
  cleanErrors: CleanErrors;

  initialState: State;

  constructor(props: Props) {
    super(props);

    this.cleanErrors = {
      error: "",
      error_current: false,
      error_new: false,
      error_new_confirm: false,
    };

    this.state = {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      ...this.cleanErrors,
    };

    this.initialState = this.state;

    this.resetPassword = this.resetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

  checkErrors() {
    const { currentPassword, newPassword, newPasswordConfirmation } =
      this.state;

    this.setState(this.cleanErrors);

    if (!currentPassword) {
      this.setState({ error: ERROR_PASSWORD_BLANK, error_current: true });
      return false;
    }
    if (!newPassword) {
      this.setState({ error: ERROR_PASSWORD_NEW_BLANK, error_new: true });
      return false;
    }
    if (!newPasswordConfirmation) {
      this.setState({
        error: ERROR_PASSWORD_CONFIRMATION_BLANK,
        error_new_confirm: true,
      });
      return false;
    }
    if (newPassword !== newPasswordConfirmation) {
      this.setState({
        error: ERROR_PASSWORD_MATCH,
        error_new: true,
        error_new_confirm: true,
      });
      return false;
    }
    if (newPassword.length < settings.MIN_PASSWORD_LENGTH) {
      this.setState({
        error: ERROR_SHORT_PASSWORD,
        error_new: true,
        error_new_confirm: true,
      });
      return false;
    }
    return true;
  }

  resetPassword(mutate: any) {
    const { currentPassword, newPassword, newPasswordConfirmation } =
      this.state;

    if (!this.checkErrors()) {
      return;
    }

    mutate({
      variables: {
        currentPassword,
        newPassword,
        newPasswordConfirmation,
      },
    });
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputField = e.target;
    // @ts-ignore
    this.setState({ [inputField.name]: inputField.value });

    if (
      this.state.newPassword === this.state.newPasswordConfirmation &&
      this.state.error
    ) {
      this.checkErrors();
    }
  }

  render() {
    return (
      <Page>
        <FormWrapper header="Reset password" toolbar="Reset password">
          <Segment>
            <Mutation<ResetPasswordParameters>
              mutation={MUTATION_RESET_PASSWORD}
              onCompleted={() => {
                this.setState(this.initialState);
                toast.info("Password reset successfully!");
                this.props.history.push(PATH_FEED);
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
                  <>
                    <form className="form-container">
                      <PasswordField
                        label="Current password"
                        testId="current-password-input"
                        name="currentPassword"
                        error={this.state.error_current}
                        value={this.state.currentPassword}
                        onChange={this.handleChange}
                      />
                      <PasswordField
                        label="New password"
                        testId="new-password-input"
                        name="newPassword"
                        error={this.state.error_new}
                        value={this.state.newPassword}
                        onChange={this.handleChange}
                      />
                      <PasswordField
                        label="Confirm new password"
                        testId="confirm-password-input"
                        name="newPasswordConfirmation"
                        error={this.state.error_new_confirm}
                        value={this.state.newPasswordConfirmation}
                        onChange={this.handleChange}
                      />

                      <div className={s.actions}>
                        <Button
                          type="button"
                          data-testid="reset-password-button"
                          disabled={loading}
                          className={s.button}
                          onClick={() => {
                            this.resetPassword(resetPassword);
                          }}
                        >
                          Reset password
                        </Button>
                      </div>

                      {displayError && (
                        <div className={s.errorMessage}>
                          <h3>Unable to reset password</h3>
                          <p>{displayError}</p>
                        </div>
                      )}
                    </form>
                    <BackButton />
                  </>
                );
              }}
            </Mutation>
          </Segment>
        </FormWrapper>
      </Page>
    );
  }
}

// @ts-ignore
export default withRouter(ResetPasswordPage);
