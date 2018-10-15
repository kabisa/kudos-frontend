import { h } from "preact";
import { Icon } from "semantic-ui-react";

import * as routes from "../../routes";

export default () => {
  const path = window.location.hash.substring(1).split("?")[0];
  const activeColor = "blue";

  const settingsPath = `${routes.PATH_SETTINGS}?transition=none`;
  const statsPath = `${routes.PATH_STATISTICS}?transition=none`;
  const feedPath = `${routes.PATH_FEED}?transition=none`;
  const notificationsPath = `${routes.PATH_NOTIFICATIONS}?transition=none`;
  const userPath = `${routes.PATH_USER}?transition=none`;

  return (
    <div className="bottom-navigation">
      {/* Settings */}
      {path !== routes.PATH_SETTINGS && (
        <a href={settingsPath} className="bottom-item">
          <Icon name="setting" size="large" className="bottom-icon" />
        </a>
      )}
      {path === routes.PATH_SETTINGS && (
        <div className="bottom-item">
          <Icon
            color={activeColor}
            name="setting"
            size="large"
            className="bottom-icon"
          />
        </div>
      )}

      {/* Statistics */}
      {path !== routes.PATH_STATISTICS && (
        <a href={statsPath} replace className="bottom-item">
          <Icon name="chart bar" size="large" className="bottom-icon" />
        </a>
      )}
      {path === routes.PATH_STATISTICS && (
        <div className="bottom-item">
          <Icon
            color={activeColor}
            name="chart bar"
            size="large"
            className="bottom-icon"
          />
        </div>
      )}

      {/* Feed */}
      {path !== routes.PATH_FEED && (
        <a href={feedPath} replace className="bottom-item">
          <Icon name="heart outline" size="large" className="bottom-icon" />
        </a>
      )}
      {path === routes.PATH_FEED && (
        <div className="bottom-item">
          <Icon
            color={activeColor}
            name="heart"
            size="large"
            className="bottom-icon"
          />
        </div>
      )}

      {/* Notifications */}
      {path !== routes.PATH_NOTIFICATIONS && (
        <a href={notificationsPath} replace className="bottom-item">
          <Icon name="bell outline" size="large" className="bottom-icon" />
        </a>
      )}
      {path === routes.PATH_NOTIFICATIONS && (
        <div className="bottom-item">
          <Icon
            color={activeColor}
            name="bell"
            size="large"
            className="bottom-icon"
          />
        </div>
      )}

      {/* User */}
      {path !== routes.PATH_USER && (
        <a href={userPath} replace className="bottom-item">
          <Icon name="user outline" size="large" className="bottom-icon" />
        </a>
      )}
      {path === routes.PATH_USER && (
        <div className="bottom-item">
          <Icon
            color={activeColor}
            name="user"
            size="large"
            className="bottom-icon"
          />
        </div>
      )}
    </div>
  );
};
