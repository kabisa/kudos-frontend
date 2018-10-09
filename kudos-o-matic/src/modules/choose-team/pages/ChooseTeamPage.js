import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Toolbar from '../../navigation/Toolbar';
import { PATH_FEED } from '../../../routes';

export class ChooseTeamPage extends Component {
  render() {
    return (
      <div>
        <Toolbar backLink={PATH_FEED} text="Choose a group" />
        {/* <div className="page-with-toolbar"> */}
          <h2>h2</h2>
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTeamPage);
