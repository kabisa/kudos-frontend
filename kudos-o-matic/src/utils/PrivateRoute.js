import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends Component {
  render() {
    const { component: ProtectedComponent, loggedIn, ...rest } = this.props;

    if (loggedIn) {
      return <Route {...rest} render={props => <ProtectedComponent {...props} />} />;
    }
    return <Redirect to="/login" />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.string
};

PrivateRoute.defaultProps = {
  loggedIn: null
};

const mapStateToProps = state => ({
  loggedIn: state.user.token
});

export default connect(mapStateToProps)(PrivateRoute);
