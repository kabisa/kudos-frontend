import { Component, FormEvent } from "react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";

import { FormWrapper } from "../../components";
import BackButton from "../../components/back-button/BackButton";
import { getGraphqlError, validateEmail } from "../../support";
import { Button, Input } from "@sandercamp/ui-components";

export const MUTATION_FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: EmailAddress!) {
    forgotPassword(credentials: { email: $email }) {
      email
    }
  }
`;

export interface ForgotPasswordResult {
  email: string;
}

export interface ForgotPasswordParameters {
  email: string;
}

export interface Props {}

export interface State {
  email: string;
  success: boolean;
  error: string;
}

type ForgotPasswordMutationCallback = (props: any) => Promise<any>;

class ForgotPasswordPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      success: false,
      error: "",
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  onCompleted() {
    this.setState({ success: true });
  }

  formSubmit(e: FormEvent, resetPassword: ForgotPasswordMutationCallback) {
    e.preventDefault();
    const { email } = this.state;

    if (!validateEmail(email)) {
      this.setState({ error: "Invalid email address" });
      return;
    }

    resetPassword({
      variables: { email: this.state.email },
    });
  }

  render() {
    return (
      <FormWrapper header="Forgot password" toolbar="Forgot password">
        <Mutation<ForgotPasswordResult, ForgotPasswordParameters>
          mutation={MUTATION_FORGOT_PASSWORD}
          onCompleted={this.onCompleted}
          onError={(error) => this.setState({ error: getGraphqlError(error) })}
        >
          {(resetPassword, { error, loading }: any) => (
            <div>
              <form onSubmit={(e) => this.formSubmit(e, resetPassword)}>
                <div className="ui segment">
                  <Input
                    data-testid="email-input"
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />

                  <Button
                    data-testid="submit-button"
                    variant="primary"
                    disabled={loading}
                  >
                    Reset password
                  </Button>

                  {this.state.error && (
                    <div className="errorMessage">
                      <h3>Unable to reset the password</h3>
                      <p data-testid="error-message">{this.state.error}</p>
                    </div>
                  )}

                  {this.state.success && (
                    <div className="successMessage">
                      <h3>Reset password instructions sent</h3>
                      <p>Check your mail for the details.</p>
                    </div>
                  )}
                  <BackButton />
                </div>
              </form>
            </div>
          )}
        </Mutation>
      </FormWrapper>
    );
  }
}

export default ForgotPasswordPage;
