import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { PATH_CHOOSE_TEAM } from '../../../routes';
import { Navigation } from '../../navigation';

export const SettingsPage = () => (
  <div style={{ height: '100%' }}>
    <div className="page flex">
      <div>
        <h2>Settings</h2>
      </div>
      <Link color="orange" className="button" to={PATH_CHOOSE_TEAM}>
        <Button>Switch team</Button>
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
