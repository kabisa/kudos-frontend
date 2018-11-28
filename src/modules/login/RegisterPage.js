import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  getGraphqlError,
  validateEmail,
  ERROR_INCOMPLETE,
  ERROR_EMAIL_INVALID,
  ERROR_SHORT_PASSWORD,
} from "../../support";
import { FormWrapper } from "../../components";
import BackButton from "./BackButton";
import { loginSuccess } from "./helper";
import settings from "src/config/settings";

export const MUTATION_REGISTER = gql`
  mutation CreateUser(
    $name: String!
    $email: EmailAddress!
    $password: String!
  ) {
    createUser(
      credentials: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  confirm(data) {
    if (data.createUser) {
      loginSuccess(data.createUser);
    }
  }

  formSubmit(e, createUser) {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.setState({ error: null });

    if (!name || !email || !password) {
      this.setState({ error: ERROR_INCOMPLETE });
      return;
    }

    if (!validateEmail(email)) {
      this.setState({ error: ERROR_EMAIL_INVALID });
      return;
    }

    if (password.length < settings.MIN_PASSWORD_LENGTH) {
      this.setState({ error: ERROR_SHORT_PASSWORD });
      return;
    }

    createUser({
      variables: { name, email, password },
    });
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_REGISTER}
        onCompleted={data => this.confirm(data)}
      >
        {(createUser, { error, loading }) => {
          let displayError;
          if (error) {
            displayError = getGraphqlError(error);
          }
          if (this.state.error) {
            displayError = this.state.error;
          }

          return (
            <FormWrapper toolbar="Register" header="Register">
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, createUser)}
              >
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    name="name"
                    iconPosition="left"
                    placeholder="Name"
                    autoFocus="on"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <Button
                    color="blue"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Register
                  </Button>

                  {displayError && (
                    <Message negative>
                      <Message.Header>Unable to register</Message.Header>
                      <p>{displayError}</p>
                    </Message>
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

export default RegisterPage;
