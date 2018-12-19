import { h } from "preact";
import { Icon } from "semantic-ui-react";
import { route } from "preact-router";

import * as routes from "../../routes";
import settings from "../../config/settings";
import s from "./Mobile.scss";

const IconComponent = ({ path, icon }) => {
  const current = window.location.hash.substring(1).split("?")[0];
  if (current !== path) {
    const link = `${path}?transition=none`;
    return (
      <div onClick={() => route(link, true)} className={s.bottom_item}>
        <Icon name={icon} size="large" className={s.bottom_icon} />
      </div>
    );
  }
  return (
    <div className={s.bottom_item}>
      <Icon color="blue" name={icon} size="large" className={s.bottom_icon} />
    </div>
  );
};

export default () => {
  const isLoggedIn = localStorage.getItem(settings.TEAM_ID_TOKEN);
  return (
    <div className={s.bottom_navigation}>
      <IconComponent path={routes.PATH_SETTINGS} icon="settings" />
      {isLoggedIn && (
        <IconComponent path={routes.PATH_STATISTICS} icon="chart bar" />
      )}
      {isLoggedIn && (
        <IconComponent path={routes.PATH_FEED} icon="heart outline" />
      )}
      {isLoggedIn && (
        <IconComponent path={routes.PATH_NOTIFICATIONS} icon="bell" />
      )}
      <IconComponent path={routes.PATH_USER} icon="user" />
    </div>
  );
};
