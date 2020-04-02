import React from 'react';
import {
  Container, Dropdown, Icon, Menu,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { Query } from '@apollo/react-components';
import {
  PATH_CHOOSE_TEAM, PATH_FEED, PATH_MANAGE_TEAM, PATH_USER,
} from '../../routes';
import { isAdmin, logout } from '../../support';

import s from './Desktop.module.scss';

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

export interface Props {
  history: History;
}

export function DesktopNavigation(props: Props) {
  return (
    <div className={s.root}>
      <Menu fixed="top" inverted size="large" className={s.menu}>
        <Container>
          <Menu.Item data-testid="home-button" onClick={() => props.history.push(PATH_FEED)}>Home</Menu.Item>
          <Menu.Menu position="right">
            <Query<GetUserResult> query={GET_USER}>
              {({ data }) => (
                <Dropdown item simple text={data && data.viewer ? data.viewer.name : 'Loading...'}>
                  <Dropdown.Menu>
                    <Link data-testid="profile-button" to={PATH_USER} className="item" style={{ color: 'black' }}>
                      <Icon name="user" />
                      Profile
                    </Link>
                    <Dropdown.Divider />
                    {isAdmin() && (
                    <Link
                      data-testid="manage-team-button"
                      to={`${PATH_MANAGE_TEAM}/general`}
                      className="item"
                      style={{ color: 'black' }}
                    >
                      <Icon name="settings" />
                      Manage team
                    </Link>
                    )}
                    {isAdmin() && <Dropdown.Divider />}
                    <Link
                      data-testid="switch-team-button"
                      to={PATH_CHOOSE_TEAM}
                      className="item"
                      style={{ color: 'black' }}
                    >
                      <Icon name="exchange" />
                      Switch team
                    </Link>
                    <Dropdown.Item data-testid="logout-button" onClick={() => logout()}>
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
}

export default withRouter(DesktopNavigation);
