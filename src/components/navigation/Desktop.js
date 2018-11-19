import { h } from "preact";
import { Container, Menu, Icon, Dropdown } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
  PATH_FEED,
  PATH_STATISTICS,
  PATH_USER,
  PATH_SETTINGS,
} from "../../routes";
import { logout } from "../../support";

import s from "./Desktop.scss";

export const GET_USER = gql`
  query getUser {
    viewer {
      self {
        name
      }
    }
  }
`;

export const DesktopNavigation = () => (
  <div className={s.root}>
    <Menu fixed="top" inverted size="large" className={s.menu}>
      <Container>
        <Menu.Item href={`#${PATH_FEED}`}>Home</Menu.Item>
        <Menu.Item href={`#${PATH_STATISTICS}`}>Goals</Menu.Item>
        <Menu.Menu position="right">
          <Query query={GET_USER}>
            {({ data }) => (
              <Dropdown
                item
                simple
                text={data.viewer ? data.viewer.self.name : "Loading..."}
              >
                <Dropdown.Menu>
                  <a
                    href={`#${PATH_USER}`}
                    className="item"
                    style={{ color: "black" }}
                  >
                    Profile
                  </a>
                  <a
                    href={`#${PATH_SETTINGS}`}
                    className="item"
                    style={{ color: "black" }}
                  >
                    Settings
                  </a>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <Icon name="log out" />
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Query>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

export default DesktopNavigation;
