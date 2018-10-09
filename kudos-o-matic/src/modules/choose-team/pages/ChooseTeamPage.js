import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';

import Toolbar from '../../navigation/Toolbar';
import { PATH_FEED } from '../../../routes';
import InviteItem from './components/Invite';
import TeamRow from './components/TeamRow';

export class ChooseTeamPage extends Component {
  render() {
    return (
      <div>
        <Toolbar backLink={PATH_FEED} text="Choose a group" />
        <div className="flex" style={{ paddingTop: '75px' }}>
          <InviteItem />
          <Divider />
          <TeamRow />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTeamPage);
