import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { History } from "history";

import * as routes from "../../routes";
import s from "./Mobile.module.scss";
import { Auth } from "../../support";

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
        color={
          props.history.location.pathname === props.path ? "blue" : "black"
        }
      />
    </Link>
  );
}

export function MobileNavigation() {
  const history = useHistory();

  return (
    <div className={s.bottom_navigation}>
      <IconComponent
        data-testid="settings-button"
        path={routes.PATH_SETTINGS}
        icon="settings"
        history={history}
      />
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="statistics-button"
          path={routes.PATH_STATISTICS}
          icon="chart bar"
          history={history}
        />
      )}
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="home-button"
          path={routes.PATH_FEED}
          icon="home"
          history={history}
        />
      )}
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="notifications-button"
          path={routes.PATH_NOTIFICATIONS}
          icon="bell"
          history={history}
        />
      )}
      <IconComponent
        data-testid="profile-button"
        path={routes.PATH_USER}
        icon="user"
        history={history}
      />
    </div>
  );
}

export default MobileNavigation;
