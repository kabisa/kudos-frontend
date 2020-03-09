import React from "react";
import { Container, Menu, Icon, Dropdown } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import  {withRouter} from "react-router-dom"

import {
  PATH_FEED,
  PATH_USER,
  PATH_CHOOSE_TEAM,
  PATH_MANAGE_TEAM,
} from "../../routes";
import { logout, isAdmin } from "../../support";

import s from "./Desktop.module.scss";

export const GET_USER = gql`
  query getUser {
    viewer {
      name
    }
  }
`;

export const DesktopNavigation = ({history}) => (
  <div className={s.root}>
    <Menu fixed="top" inverted size="large" className={s.menu}>
      <Container>
        <Menu.Item onClick={() => history.push(PATH_FEED)}>Home</Menu.Item>
        <Menu.Menu position="right">
          <Query query={GET_USER}>
            {({ data }) => (
              <Dropdown
                item
                simple
                text={data && data.viewer ? data.viewer.name : "Loading..."}
              >
                <Dropdown.Menu>
                  <a
                    onClick={() => history.push(PATH_USER)}
                    className="item"
                    style={{ color: "black" }}
                  >
                    <Icon name="user" />
                    Profile
                  </a>
                  <Dropdown.Divider />
                  {isAdmin() && (
                    <a
                      onClick={() => history.push(PATH_MANAGE_TEAM)}
                      className="item"
                      style={{ color: "black" }}
                    >
                      <Icon name="settings" />
                      Manage team
                    </a>
                  )}
                  {isAdmin() && <Dropdown.Divider />}
                  <a
                    onClick={() => history.push(PATH_CHOOSE_TEAM)}
                    className="item"
                    style={{ color: "black" }}
                  >
                    <Icon name="exchange" />
                    Switch team
                  </a>
                  <Dropdown.Item onClick={() => logout(history)}>
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

export default withRouter(DesktopNavigation);
