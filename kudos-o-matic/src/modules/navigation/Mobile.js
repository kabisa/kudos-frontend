import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import * as routes from '../../routes';

import './style.css';

export default () => {
  const path = window.location.hash.substring(1);
  const activeColor = 'blue';

  return (
    <div className="bottom-navigation">
      {/* Settings */}
      {path !== routes.PATH_SETTINGS && (
        <Link to={routes.PATH_SETTINGS} replace className="bottom-item">
          <Icon name="setting" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.PATH_SETTINGS && (
        <div className="bottom-item">
          <Icon color={activeColor} name="setting" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Statistics */}
      {path !== routes.PATH_STATISTICS && (
        <Link to={routes.PATH_STATISTICS} replace className="bottom-item">
          <Icon name="chart bar" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.PATH_STATISTICS && (
        <div className="bottom-item">
          <Icon color={activeColor} name="chart bar" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Feed */}
      {path !== routes.PATH_FEED && (
        <Link to={routes.PATH_FEED} replace className="bottom-item">
          <Icon name="heart outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.PATH_FEED && (
        <div className="bottom-item">
          <Icon color={activeColor} name="heart" size="large" className="bottom-icon" />
        </div>
      )}

      {/* Notifications */}
      {path !== routes.PATH_NOTIFICATIONS && (
        <Link to={routes.PATH_NOTIFICATIONS} replace className="bottom-item">
          <Icon name="bell outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.PATH_NOTIFICATIONS && (
        <div className="bottom-item">
          <Icon color={activeColor} name="bell" size="large" className="bottom-icon" />
        </div>
      )}

      {/* User */}
      {path !== routes.PATH_USER && (
        <Link to={routes.PATH_USER} replace className="bottom-item">
          <Icon name="user outline" size="large" className="bottom-icon" />
        </Link>
      )}
      {path === routes.PATH_USER && (
        <div className="bottom-item">
          <Icon color={activeColor} name="user" size="large" className="bottom-icon" />
        </div>
      )}
    </div>
  );
};
