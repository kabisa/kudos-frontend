import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from '../../navigation';

export class UserPage extends Component {
  render() {
    return (
      <div>
        <p>UserPage</p>
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
)(UserPage);
