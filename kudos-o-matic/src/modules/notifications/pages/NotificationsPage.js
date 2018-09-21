import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from '../../navigation';

export class NotificationsPage extends Component {
  render() {
    return (
      <div>
        <p>NotificationsPage</p>
        <Navigation />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
