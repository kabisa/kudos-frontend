import { gql } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import {
  PATH_CHOOSE_TEAM,
  PATH_FEED,
  PATH_MANAGE_TEAM,
  PATH_USER,
} from "../../routes";
import { isAdmin, Auth } from "../../support";

import s from "./Desktop.module.css";
import {
  Icon,
  Link as KabisaLink,
  DropdownMenu,
  MenuItem,
} from "@kabisa/ui-components";

export const GET_USER = gql`
  query getUser {
    viewer {
      name
    }
  }
`;

export interface GetUserResult {
  viewer: {
    name: string;
  };
}

export function DesktopNavigation() {
  const history = useHistory();

  return (
    <header className={s.header}>
      <nav>
        <KabisaLink
          theme="light"
          data-testid="home-button"
          onClick={() => history.push(PATH_FEED)}
        >
          Home
        </KabisaLink>
        <Query<GetUserResult> query={GET_USER}>
          {({ data, loading }) => (
            <DropdownMenu
              direction="bottom"
              text={
                loading ? "loading.." : data?.viewer.name ?? "Welcome back!"
              }
            >
              <Link
                data-testid="profile-button"
                to={PATH_USER}
                className={s.link}
              >
                <MenuItem className={s.menuItem}>
                  <Icon name="man" className={s.icon} />
                  Profile
                </MenuItem>
              </Link>

              {isAdmin() && (
                <Link
                  data-testid="manage-team-button"
                  to={`${PATH_MANAGE_TEAM}/general`}
                  className={s.link}
                >
                  <MenuItem className={s.menuItem}>
                    <Icon name="settings" className={s.icon} />
                    Manage team
                  </MenuItem>
                </Link>
              )}
              <Link
                data-testid="switch-team-button"
                to={PATH_CHOOSE_TEAM}
                className={s.link}
              >
                <MenuItem className={s.menuItem}>
                  <Icon name="switch" className={s.icon} />
                  Switch team
                </MenuItem>
              </Link>
              <a
                data-testid="logout-button"
                onClick={async () => {
                  await Auth.logout();
                }}
              >
                <MenuItem className={s.menuItem}>
                  <Icon name="logout" className={s.icon} />
                  Log out
                </MenuItem>
              </a>
            </DropdownMenu>
          )}
        </Query>
      </nav>
    </header>
  );
}

export default DesktopNavigation;
