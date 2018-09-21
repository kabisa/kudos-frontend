import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from '../../navigation';

export class SettingsPage extends Component {
  render() {
    return (
      <div>
        <p>Settings</p>
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
)(SettingsPage);
