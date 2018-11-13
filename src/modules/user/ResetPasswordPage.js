import { h, Component } from "preact";
import { Button, Form } from "semantic-ui-react";

import { FormWrapper } from "../../components";
import { history } from "../../support/history";

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
      new_password_confirm: "",
      error_confirm: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { old_password, new_password, new_password_confirm } = this.state;
    if (new_password === new_password_confirm) {
      this.setState({ error_confirm: false });
      this.props.resetPassword(old_password, new_password);
      history.goBack();
    } else {
      this.setState({ error_confirm: true });
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });

    if (
      this.state.new_password === this.state.new_password_confirm &&
      this.state.error_confirm
    ) {
      this.setState({ error_confirm: false });
    }
  }

  render() {
    const { loading, error } = this.props;
    const { error_confirm } = this.state;

    return (
      <FormWrapper toolbar="Reset password" header="Reset password">
        <Form
          size="large"
          onSubmit={this.onSubmit}
          style={{ textAlign: "left" }}
        >
          <Form.Input
            label="Current password"
            fluid
            icon="lock"
            name="old_password"
            error={error}
            iconPosition="left"
            type="password"
            placeholder="Current password"
            onChange={this.handleChange}
          />
          <Form.Input
            label="New password"
            fluid
            icon="lock"
            name="new_password_confirm"
            error={error}
            iconPosition="left"
            type="password"
            placeholder="New password"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Confirm new password"
            fluid
            icon="lock"
            name="new_password"
            error={error_confirm}
            iconPosition="left"
            type="password"
            placeholder="Confirm new password"
            onChange={this.handleChange}
          />
          <Button color="blue" loading={loading} fluid size="large">
            Reset password
          </Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default ResetPasswordPage;
