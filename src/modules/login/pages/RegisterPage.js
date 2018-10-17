import { h, Component } from "preact";
import { connect } from "preact-redux";
import PropTypes from "prop-types";
import { Toolbar } from "../../../components/navigation";

import { Button, Form, Grid, Message } from "semantic-ui-react";
import { login } from "../actions";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirm_password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { loading, error } = this.props;
    const { username, password } = this.state;

    return (
      <div>
        <Toolbar text="Sign up" />
        <div className="main-form">
          <Grid
            textAlign="center"
            style={{ height: "100%", width: "100%", margin: "auto" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form
                size="large"
                error
                onSubmit={this.onSubmit}
                style={{ textAlign: "left" }}
              >
                <Form.Input
                  label="Email address"
                  fluid
                  error={error}
                  icon="user"
                  name="username"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  fluid
                  error={error}
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Confirm password"
                  fluid
                  error={error}
                  icon="lock"
                  name="confirm_password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />

                <Button color="blue" loading={loading} fluid size="large">
                  Sign up
                </Button>

                {error && (
                  <Message
                    error={error}
                    header="Unable to register"
                    content="Please make sure you entered your credentials correctly."
                  />
                )}
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  login: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.login.loginLoading,
  error: state.login.loginError !== null
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
