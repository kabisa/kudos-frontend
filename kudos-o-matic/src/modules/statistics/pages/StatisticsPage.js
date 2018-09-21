import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from '../../navigation';

export class StatisticsPage extends Component {
  render() {
    return (
      <div>
        <p>StatisticsPage</p>
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
)(StatisticsPage);
