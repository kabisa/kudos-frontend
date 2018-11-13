import { h } from "preact";
import { Icon } from "semantic-ui-react";

import * as routes from "../../routes";
import s from "./Mobile.scss";

const IconComponent = ({ path, icon }) => {
  const current = window.location.hash.substring(1).split("?")[0];
  if (current !== path) {
    const link = `${path}?transition=none`;
    return (
      <a href={link} className={s.bottom_item}>
        <Icon name={icon} size="large" className={s.bottom_icon} />
      </a>
    );
  }
  return (
    <div className={s.bottom_item}>
      <Icon color="blue" name={icon} size="large" className={s.bottom_icon} />
    </div>
  );
};

export default () => (
  <div className={s.bottom_navigation}>
    <IconComponent path={routes.PATH_SETTINGS} icon="settings" />
    <IconComponent path={routes.PATH_STATISTICS} icon="chart bar" />
    <IconComponent path={routes.PATH_FEED} icon="heart outline" />
    <IconComponent path={routes.PATH_NOTIFICATIONS} icon="bell" />
    <IconComponent path={routes.PATH_USER} icon="user" />
  </div>
);
