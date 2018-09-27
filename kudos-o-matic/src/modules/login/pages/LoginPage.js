import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import { login } from '../actions';
import { PATH_REGISTER, PATH_FORGOT_PASSWORD, PATH_FEED } from '../../../routes';

import './style.css';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
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
    const { loading, error, isLoggedIn } = this.props;
    const { username, password } = this.state;

    if (isLoggedIn) {
      return <Redirect to={PATH_FEED} />;
    }

    return (
      <div className="main-form">
        <Grid
          textAlign="center"
          style={{ height: '100%', width: '100%', margin: 'auto' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Log-in to your account
            </Header>
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
              <div style={{ height: '20px' }}>
                <Link to={PATH_REGISTER} style={{ float: 'left' }}>
                  Sign Up
                </Link>
                <Link to={PATH_FORGOT_PASSWORD} style={{ float: 'right' }}>
                  Forgot password?
                </Link>
              </div>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,

  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

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
