import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import { FormWrapper } from "../../components";
import { MUTATION_FORGOT_PASSWORD } from "./queries";
import BackButton from "./BackButton";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      success: false,
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
        {(resetPassword, { error }) => {
          return (
            <FormWrapper toolbar="Forgot password" header="Forgot password">
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, resetPassword)}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <Button color="blue" fluid size="large">
                    Reset password
                  </Button>

                  {error && (
                    <Message
                      error={true}
                      header="Unable to reset the password."
                      content="Something went wrong."
                    />
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
