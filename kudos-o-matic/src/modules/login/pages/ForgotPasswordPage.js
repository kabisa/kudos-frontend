import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { forgotPassword } from '../actions';

import './style.css';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit() {
    this.props.forgotPassword(this.state.email);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="main-form">
        <Grid
          textAlign="center"
          style={{ height: '100%', width: '100%', margin: 'auto' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Reset password
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="username"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />

                <Button color="teal" loading={loading} fluid size="large">
                  Reset password
                </Button>
              </Segment>
            </Form>
            <Message>
              <Link to="/login">Back</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.login.resetPasswordLoading
});

const mapDispatchToProps = { forgotPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
