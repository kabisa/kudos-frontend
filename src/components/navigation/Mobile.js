import React from "react";
import { Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import * as routes from "../../routes";
import settings from "../../config/settings";
import s from "./Mobile.module.scss";

const IconComponent = ({ path, icon, history }) => {
  const link = `${path}`;
  return (
    <Link to={link} className={s.bottom_item}>
      <Icon name={icon} size="large" className={s.bottom_icon}
            color={history.location.pathname === path ? "blue" : "black"}/>
    </Link>
  );
};

const mobile = (history) => {
  const isLoggedIn = localStorage.getItem(settings.TEAM_ID_TOKEN);
  return (
    <div className={s.bottom_navigation}>
      <IconComponent path={routes.PATH_SETTINGS} icon="settings" history={history}/>
      {isLoggedIn && (
        <IconComponent path={routes.PATH_STATISTICS} icon="chart bar" history={history}/>
      )}
      {isLoggedIn && (
        <IconComponent path={routes.PATH_FEED} icon="home" history={history}/>
      )}
      {isLoggedIn && (
        <IconComponent path={routes.PATH_NOTIFICATIONS} icon="bell" history={history}/>
      )}
      <IconComponent path={routes.PATH_USER} icon="user" history={history}/>
    </div>
  );
};

export default withRouter(mobile);