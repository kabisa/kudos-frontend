import { h, Component } from "preact";
import { connect } from "preact-redux";
import PropTypes from "prop-types";
import { Page, Main } from "src/components/Page";
import { Header as Toolbar, BackButton } from "src/components/Header";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { login } from "../actions";
import {
  PATH_REGISTER,
  PATH_FORGOT_PASSWORD,
  PATH_FEED,
  PATH_LOGIN
} from "../../../routes";

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
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
      <Page>
        <Toolbar>
          <BackButton />
          <h1>Reset password</h1>
        </Toolbar>
        <div className="main-form">
          <Grid
            textAlign="center"
            style={{ height: "100%", width: "100%", margin: "auto" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="blue" textAlign="center">
                Register a new account
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
                    Sign up
                  </Button>

                  {error && (
                    <Message
                      error={error}
                      header="Unable to register"
                      content="Please make sure you entered your credentials correctly."
                    />
                  )}
                </Segment>
              </Form>
              <Message>
                <div onClick={() => window.history.back()}>Back</div>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Page>
    );
  }
}

LoginPage.propTypes = {
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
)(LoginPage);
