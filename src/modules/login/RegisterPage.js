import { h, Component } from "preact";
import { Button, Form, Message, Responsive, Segment } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import { FormWrapper } from "../../components";
import { PATH_FEED } from "../../routes";
import settings from "../../config/settings";
import { MUTATION_REGISTER } from "./queries";

import s from "./style.scss";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
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
    if (data.createUser) {
      this.saveUserData(data.createUser.token);
      route(PATH_FEED, true);
    }
  }

  saveUserData(token) {
    localStorage.setItem(settings.LOCALSTORAGE_TOKEN, token);
  }

  formSubmit(e, createUser) {
    e.preventDefault();
    const { name, email, password } = this.state;
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
        {(createUser, { error }) => {
          return (
            <FormWrapper toolbar="Register" header="Register">
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, createUser)}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="name"
                    iconPosition="left"
                    placeholder="Name"
                    autoFocus="on"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
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
                    Register
                  </Button>

                  {error && (
                    <Message
                      error={true}
                      header="Unable to register"
                      content="Please check your input fields"
                    />
                  )}
                </Segment>
              </Form>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Message className={s.back}>
                  <div onClick={() => window.history.back()}>Back</div>
                </Message>
              </Responsive>
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}
export default RegisterPage;
