import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from '../../navigation';

export class FeedPage extends Component {
  render() {
    return (
      <div>
        <p>Feed</p>
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
)(FeedPage);
