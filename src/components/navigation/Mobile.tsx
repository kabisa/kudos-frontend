import { Link, useHistory } from "react-router-dom";

import * as routes from "../../routes";
import s from "./Mobile.module.css";
import { Auth } from "../../support";
import classNames from "classnames";
import { Icon } from "@sandercamp/ui-components";

export interface IconComponentProps {
  path: string;
  icon: string;
}

function IconComponent(props: IconComponentProps) {
  const history = useHistory();
  const link = `${props.path}`;

  return (
    <Link to={link} className={s.bottom_item}>
      <Icon
        name={props.icon}
        className={classNames(s.bottom_icon, {
          [s.active]: history.location.pathname === props.path,
        })}
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
          icon="monitoring"
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
          icon="notifications"
        />
      )}
      <IconComponent
        data-testid="profile-button"
        path={routes.PATH_USER}
        icon="person"
      />
    </div>
  );
}

export default MobileNavigation;
