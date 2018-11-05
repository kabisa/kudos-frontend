import { h, Component } from "preact";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import { MUTATION_LOGIN } from "./queries";
import { PATH_REGISTER, PATH_FORGOT_PASSWORD, PATH_FEED } from "../../routes";
import settings from "../../config/settings";
import { isLoggedIn } from "../../support";

import s from "./style.scss";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    if (isLoggedIn) {
      route(PATH_FEED, true);
    }

    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.confirm = this.confirm.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  confirm(data) {
    if (data.signInUser) {
      this.saveUserData(data.signInUser.token);
      route(PATH_FEED, true);
    }
  }

  saveUserData(token) {
    localStorage.setItem(settings.LOCALSTORAGE_TOKEN, token);
  }

  formSubmit(e, signInUser) {
    e.preventDefault();
    const { email, password } = this.state;
    signInUser({
      variables: { email, password },
    });
  }

  render() {
    return (
      <Mutation
        mutation={MUTATION_LOGIN}
        onCompleted={data => this.confirm(data)}
      >
        {(signInUser, { data }) => {
          return (
            <div className="main-form">
              <Grid
                textAlign="center"
                className={s.grid}
                verticalAlign="middle"
              >
                <Grid.Column className={s.column}>
                  <Header as="h2" color="blue" textAlign="center">
                    Log-in to your account
                  </Header>
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
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        name="password"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                      />

                      <Button color="blue" fluid size="large">
                        Login
                      </Button>

                      {data &&
                        data.signInUser === null && (
                          <Message
                            error={true}
                            header="Unable to login"
                            content="Please make sure you entered your credentials correctly."
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
                </Grid.Column>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default LoginPage;
