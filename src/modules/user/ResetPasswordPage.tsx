import React, { ChangeEvent, Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import settings from '../../config/settings';
import {
  ERROR_PASSWORD_BLANK,
  ERROR_PASSWORD_CONFIRMATION_BLANK,
  ERROR_PASSWORD_MATCH,
  ERROR_SHORT_PASSWORD,
  getGraphqlError,
} from '../../support';
import { Navigation, Toolbar } from '../../components/navigation';

import s from './UserPage.module.scss';
import { PATH_FEED } from '../../routes';

export const MUTATION_RESET_PASSWORD = gql`
  mutation ResetPassword($current_password: String, $new_password: String, $new_password_confirmation: String) {
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
      error: '',
      error_current: false,
      error_new: false,
      error_new_confirm: false,
    };

    this.state = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      ...this.cleanErrors,
    };

    this.initialState = this.state;

    this.resetPassword = this.resetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
  }

  checkErrors() {
    const { currentPassword, newPassword, newPasswordConfirmation } = this.state;

    this.setState(this.cleanErrors);

    if (!currentPassword) {
      this.setState({ error: ERROR_PASSWORD_BLANK, error_current: true });
      return false;
    }
    if (!newPassword) {
      this.setState({ error: ERROR_PASSWORD_BLANK, error_new: true });
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
    const { currentPassword, newPassword, newPasswordConfirmation } = this.state;

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

  handleChange(e: ChangeEvent, { name, value }: any) {
    // @ts-ignore
    this.setState({ [name]: value });

    if (this.state.newPassword === this.state.newPasswordConfirmation && this.state.error) {
      this.checkErrors();
    }
  }

  render() {
    return (
      <div id="root">
        <Toolbar text="Reset password" />
        <div className="main-form">
          <div className={s.page}>
            <Mutation<ResetPasswordParameters>
              mutation={MUTATION_RESET_PASSWORD}
              onCompleted={() => {
                this.setState(this.initialState);
                toast.info('Password reset successfully!');
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
                  <Form style={{ maxWidth: '420px', margin: 'auto' }}>
                    <Form.Input
                      label="Current password"
                      fluid
                      icon="lock"
                      name="current_password"
                      iconPosition="left"
                      type="password"
                      placeholder="Current password"
                      error={this.state.error_current}
                      value={this.state.currentPassword}
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
                      error={this.state.error_new}
                      value={this.state.newPassword}
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
                      error={this.state.error_new_confirm}
                      value={this.state.newPasswordConfirmation}
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
                        <Message.Header>Unable to reset password</Message.Header>
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

// @ts-ignore
export default withRouter(ResetPasswordPage);
