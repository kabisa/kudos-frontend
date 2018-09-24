import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

import './style.css';

export default () => {
  const path = window.location.hash.substring(1);
  const activeColor = 'blue';

  return (
    <div className="bottom-navigation">
      {/* Settings */}
      {path !== routes.settingsPath && (
        <Link to={routes.settingsPath} className="bottom-item">
          <Icon name="setting" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.settingsPath && (
        <div className="bottom-item">
          <Icon color={activeColor} name="setting" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Statistics */}
      {path !== routes.statsPath && (
        <Link to={routes.statsPath} className="bottom-item">
          <Icon name="chart bar" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.statsPath && (
        <div className="bottom-item">
          <Icon color={activeColor} name="chart bar" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Feed */}
      {path !== routes.feedPath && (
        <Link to={routes.feedPath} className="bottom-item">
          <Icon name="heart outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.feedPath && (
        <div className="bottom-item">
          <Icon color={activeColor} name="heart" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Notifications */}
      {path !== routes.notificationsPath && (
        <Link to={routes.notificationsPath} className="bottom-item">
          <Icon name="bell outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.notificationsPath && (
        <div className="bottom-item">
          <Icon color={activeColor} name="bell" size="large" className="bottom-icon" />
        </div>
      )}

      {/* User */}
      {path !== routes.userPath && (
        <Link to={routes.userPath} className="bottom-item">
          <Icon name="user outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.userPath && (
        <div className="bottom-item">
          <Icon color={activeColor} name="user" size="large" className="bottom-icon" />
        </div>
      )}
    </div>
  );
};
