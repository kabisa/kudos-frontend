import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { PATH_CHOOSE_TEAM } from '../../../routes';
import { Navigation } from '../../navigation';

export const SettingsPage = () => (
  <div style={{ height: '100%' }}>
    <div className="page flex" style={{ justifyContent: 'space-around' }}>
      <div>
        <h2>Settings</h2>
      </div>
      <Link to={PATH_CHOOSE_TEAM}>
        <Button color="orange">Switch team</Button>
      </Link>
    </div>
    <Navigation />
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
