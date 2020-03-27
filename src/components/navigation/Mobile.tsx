import React from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';

import * as routes from '../../routes';
import settings from '../../config/settings';
import s from './Mobile.module.scss';

export interface IconComponentProps {
  path: string;
  icon: SemanticICONS;
  history: History;
}

function IconComponent(props: IconComponentProps) {
  const link = `${props.path}`;
  return (
    <Link to={link} className={s.bottom_item}>
      <Icon
        name={props.icon}
        size="large"
        className={s.bottom_icon}
        color={props.history.location.pathname === props.path ? 'blue' : 'black'}
      />
    </Link>
  );
}

export interface MobileProps {
  history: History;
}

function mobile(props: MobileProps) {
  const isLoggedIn = localStorage.getItem(settings.TEAM_ID_TOKEN);
  return (
    <div className={s.bottom_navigation}>
      <IconComponent
        data-testid="settings-button"
        path={routes.PATH_SETTINGS}
        icon="settings"
        history={props.history}
      />
      {isLoggedIn && (
      <IconComponent
        data-testid="statistics-button"
        path={routes.PATH_STATISTICS}
        icon="chart bar"
        history={props.history}
      />
      )}
      {isLoggedIn && (
      <IconComponent
        data-testid="home-button"
        path={routes.PATH_FEED}
        icon="home"
        history={props.history}
      />
      )}
      {isLoggedIn && (
      <IconComponent
        data-testid="notifications-button"
        path={routes.PATH_NOTIFICATIONS}
        icon="bell"
        history={props.history}
      />
      )}
      <IconComponent
        data-testid="profile-button"
        path={routes.PATH_USER}
        icon="user"
        history={props.history}
      />
    </div>
  );
}

export default withRouter(mobile);
