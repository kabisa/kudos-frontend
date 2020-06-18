import React from 'react';
import { Button } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { PATH_CHOOSE_TEAM, PATH_INVITE } from '../../routes';
import { Navigation } from '../../components/navigation';
import { isAdmin } from '../../support';

import s from './Settings.module.scss';

export interface Props {
  // Future props go here
}

export interface State {
  // Future state vars go here
}

export function SettingsPage(): React.ReactElement {
  return (
    <div>
      <div className="page flex" style={{ padding: '2em', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid' }}>
          <h2 className={s.name}>Settings</h2>
          {isAdmin() && (
            <Link to={PATH_INVITE}>
              <Button color="blue" className={s.button}>
                Invite
              </Button>
            </Link>
          )}
          <Link to={PATH_CHOOSE_TEAM}>
            <Button color="teal" className={s.button}>
              Switch team
            </Button>
          </Link>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

export default SettingsPage;
