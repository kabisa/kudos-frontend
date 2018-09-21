import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Navigation } from '../../navigation';
import { logout } from '../actions';

import '../../../app.css';

export class UserPage extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className="page">
          <Button color="orange" onClick={this.logout} style={{ margin: 'auto', display: 'block' }}>
            Log out
          </Button>
        </div>

        <Navigation />
      </div>
    );
  }
}

UserPage.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { logout };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
