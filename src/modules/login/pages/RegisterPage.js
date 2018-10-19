import { h, Component } from "preact";
import { connect } from "preact-redux";
import PropTypes from "prop-types";
import { Button, Form, Grid, Message, Responsive } from "semantic-ui-react";

import { Toolbar } from "../../../components/navigation";
import { login } from "../actions";

import s from "./style.scss";

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirm_password: "",
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
          <Grid textAlign="center" className={s.grid} verticalAlign="middle">
            <Grid.Column className={s.column}>
              <Form
                size="large"
                error
                onSubmit={this.onSubmit}
                className={s.text_left}
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

              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Message className={s.back}>
                  <div onClick={() => window.history.back()}>Back</div>
                </Message>
              </Responsive>
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
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.login.loginLoading,
  error: state.login.loginError !== null,
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
