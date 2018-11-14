import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import { MUTATION_LOGIN } from "./queries";
import { PATH_REGISTER, PATH_FORGOT_PASSWORD, PATH_FEED } from "../../routes";
import { isLoggedIn, getGraphqlError } from "../../support";
import { FormWrapper } from "../../components";
import { loginSuccess } from "./helper";

import s from "./style.scss";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    if (isLoggedIn()) {
      route(PATH_FEED, true);
    }

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  confirm(data) {
    if (data.signInUser) {
      loginSuccess(data.signInUser.token);
    }
  }

  formSubmit(e, signInUser) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      signInUser({
        variables: { email, password },
      });
    } else {
      window.alert("Please fill out all fields.");
    }
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_LOGIN}
        onCompleted={data => this.confirm(data)}
      >
        {(signInUser, { data, error }) => {
          return (
            <FormWrapper header="Login">
              <Form
                size="large"
                error
                onSubmit={e => this.formSubmit(e, signInUser)}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    autoFocus="on"
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

                  <Button color="blue" fluid size="large">
                    Login
                  </Button>

                  {data && data.signInUser === null && (
                    <Message
                      error={true}
                      header="Unable to login"
                      content="Incorrect username/password."
                    />
                  )}

                  {error && (
                    <Message
                      error={true}
                      header="Unable to login"
                      content={() => getGraphqlError(error)}
                    />
                  )}
                </Segment>
              </Form>
              <Message>
                <div className={s.message}>
                  <a href={PATH_REGISTER} className={s.left}>
                    Sign Up
                  </a>
                  <a href={PATH_FORGOT_PASSWORD} className={s.right}>
                    Forgot password?
                  </a>
                </div>
              </Message>
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default LoginPage;
