import { h, Component } from "preact";
import gql from "graphql-tag";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import { FormWrapper } from "../../components";
import BackButton from "./BackButton";
import { validateEmail, ERROR_INVALID_EMAIL } from "../../support";

export const MUTATION_FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: EmailAddress!) {
    forgotPassword(credentials: { email: $email }) {
      email
    }
  }
`;

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      success: false,
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  onCompleted() {
    this.setState({ success: true });
  }

  formSubmit(e, resetPassword) {
    e.preventDefault();
    const { email } = this.state;

    if (!validateEmail(email)) {
      this.setState({ error: ERROR_INVALID_EMAIL });
      return;
    }

    resetPassword({
      variables: { email: this.state.email },
    });
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_FORGOT_PASSWORD}
        onCompleted={this.onCompleted}
      >
        {(resetPassword, { error, loading }) => {
          return (
            <FormWrapper toolbar="Forgot password" header="Forgot password">
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, resetPassword)}
              >
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Reset password
                  </Button>

                  {error && (
                    <Message negative>
                      <Message.Header>
                        Unable to reset the password
                      </Message.Header>
                      <p>Something went wrong.</p>
                    </Message>
                  )}

                  {this.state.success && (
                    <Message
                      header="Succesfully reset password"
                      content="Check your mail for the details."
                    />
                  )}
                </Segment>
              </Form>
              <BackButton />
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}
export default ForgotPasswordPage;
