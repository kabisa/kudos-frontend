import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { PATH_LOGIN } from "../../routes";
import { route } from "preact-router";
import { toast } from "react-toastify";

import { FormWrapper } from "../../components";
import BackButton from "./BackButton";

const DEFAULT_ERROR = "Something went wrong.";
const PASSWORD_ERROR = "Passwords don't match.";
const EMPTY_ERROR = "Fields can't be empty.";

const MUTATION_NEW_PASSWORD = gql`
  mutation NewPassword(
    $reset_password_token: String!
    $password: String!
    $password_confirmation: String!
  ) {
    newPassword(
      reset_password_token: $reset_password_token
      password: $password
      password_confirmation: $password_confirmation
    ) {
      id
    }
  }
`;

class FinishForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      password_confirm: "",
      error: false,
    };

    this.token = props.reset_password_token || "";

    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  onCompleted(data) {
    if (data.newPassword) {
      route(PATH_LOGIN, true);
      toast.info("Successfully reset password!");
    } else {
      this.setState({ error: DEFAULT_ERROR });
    }
  }

  formSubmit(e, mutation) {
    e.preventDefault();

    const { password, password_confirm } = this.state;

    if (!password || !password_confirm) {
      this.setState({ error: EMPTY_ERROR });
      return;
    }

    if (password !== password_confirm) {
      this.setState({ error: PASSWORD_ERROR });
      return;
    }

    mutation({
      variables: {
        reset_password_token: this.token,
        password: password,
        password_confirmation: password_confirm,
      },
    });
  }

  render() {
    const { error: formError } = this.state;
    return (
      <FormWrapper header="Reset password">
        <Mutation
          mutation={MUTATION_NEW_PASSWORD}
          onCompleted={data => this.onCompleted(data)}
          onError={() => this.setState({ error: DEFAULT_ERROR })}
        >
          {(mutation, { error, loading }) => (
            <div>
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, mutation)}
              >
                <Segment>
                  <Form.Input
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
                    name="password_confirm"
                    type="password"
                    iconPosition="left"
                    placeholder="Confirm password"
                    value={this.state.password_confirm}
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

                  {formError && (
                    <Message
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
export default FinishForgotPasswordPage;
