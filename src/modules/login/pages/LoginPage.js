import { h, Component } from "preact";
import { connect } from "preact-redux";
import {
  PATH_REGISTER,
  PATH_FORGOT_PASSWORD,
  PATH_FEED
} from "../../../routes";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { route } from "preact-router";
import { login } from "../actions";

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    // Check if the user is already logged in.
    if (props.isLoggedIn) {
      route(PATH_FEED, true);
    }

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
      <div className="main-form">
        <Grid
          textAlign="center"
          style={{ height: "100%", width: "100%", margin: "auto" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
            </Header>
            <p style={{ color: "red" }}>username:password</p>
            <Form size="large" error onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  error={error}
                  icon="user"
                  name="username"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={username}
                  onChange={this.handleChange}
                  autoFocus="on"
                />
                <Form.Input
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

                <Button color="blue" loading={loading} fluid size="large">
                  Login
                </Button>

                {error && (
                  <Message
                    error={error}
                    header="Unable to login"
                    content="Please make sure you entered your credentials correctly."
                  />
                )}
              </Segment>
            </Form>
            <Message>
              <div style={{ height: "20px" }}>
                <a href={PATH_REGISTER} style={{ float: "left" }}>
                  Sign Up
                </a>
                <a href={PATH_FORGOT_PASSWORD} style={{ float: "right" }}>
                  Forgot password?
                </a>
              </div>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.login.loginLoading,
  isLoggedIn: state.user.token != null,
  error: state.login.loginError !== null
});

const mapDispatchToProps = { login };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);