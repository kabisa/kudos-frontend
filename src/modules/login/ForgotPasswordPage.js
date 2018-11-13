import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { route } from "preact-router";
import { Mutation } from "react-apollo";

import { FormWrapper } from "../../components";
import { PATH_FEED } from "../../routes";
import settings from "../../config/settings";
import { MUTATION_REGISTER } from "./queries";
import BackButton from "./BackButton";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
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
    // PLACEHOLDER
    createUser({
      variables: { ...this.state },
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
            <FormWrapper toolbar="Forgot password" header="Forgot password">
              <h1 style={{ color: "red" }}>TODO</h1>
              <Form
                size="large"
                error={error}
                onSubmit={e => this.formSubmit(e, createUser)}
              >
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={this.handleChange}
                  />

                  <Button color="blue" fluid size="large">
                    Reset password
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
              <BackButton />
            </FormWrapper>
          );
        }}
      </Mutation>
    );
  }
}
export default ForgotPasswordPage;
