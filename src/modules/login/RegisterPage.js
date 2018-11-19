import { h, Component } from "preact";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";

import { getGraphqlError } from "../../support";
import { FormWrapper } from "../../components";
import { MUTATION_REGISTER } from "./queries";
import BackButton from "./BackButton";
import { loginSuccess } from "./helper";

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

                  <Button color="blue" fluid size="large">
                    Register
                  </Button>

                  {error && (
                    <Message
                      error={true}
                      header="Unable to register"
                      content={() => getGraphqlError(error)}
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

export default RegisterPage;
