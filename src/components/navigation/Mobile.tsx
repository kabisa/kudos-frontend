import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import * as routes from "../../routes";
import s from "./Mobile.module.scss";
import { Auth } from "../../support";

export interface IconComponentProps {
  path: string;
  icon: SemanticICONS;
}

function IconComponent(props: IconComponentProps) {
  const history = useHistory();
  const link = `${props.path}`;

  return (
    <Link to={link} className={s.bottom_item}>
      <Icon
        name={props.icon}
        size="large"
        className={s.bottom_icon}
        color={history.location.pathname === props.path ? "blue" : "black"}
      />
    </Link>
  );
}

export function MobileNavigation() {
  return (
    <div className={s.bottom_navigation}>
      <IconComponent
        data-testid="settings-button"
        path={routes.PATH_SETTINGS}
        icon="settings"
      />
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="statistics-button"
          path={routes.PATH_STATISTICS}
          icon="chart bar"
        />
      )}
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="home-button"
          path={routes.PATH_FEED}
          icon="home"
        />
      )}
      {Auth.hasTeam() && (
        <IconComponent
          data-testid="notifications-button"
          path={routes.PATH_NOTIFICATIONS}
          icon="bell"
        />
      )}
      <IconComponent
        data-testid="profile-button"
        path={routes.PATH_USER}
        icon="user"
      />
    </div>
  );
}

export default MobileNavigation;
