import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';

import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Navigation } from '../../components/navigation';
import { Auth } from '../../support';
import s from './UserPage.module.scss';
import { PATH_RESET_PASSWORD } from '../../routes';

export const GET_USER = gql`
    query getUser {
        viewer {
            name
            avatar
        }
    }
`;

export interface GetUserResult {
  viewer: {
    name: string;
    avatar: string;
  };
}

export interface Props {
  history: History;
}

export interface State {
  // Future state vars go here
}

export function UserPage(props: Props): React.ReactElement {
  return (
    <div>
      <div className="page flex" style={{ padding: '2em', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid' }}>
          <Query<GetUserResult> query={GET_USER}>
            {({ data }) => (
              <div>
                <h2 className={s.name}>{data && data.viewer ? data.viewer.name : 'Loading...'}</h2>
                <Image
                  src={data && data.viewer ? data.viewer.avatar : null}
                  size="tiny"
                  avatar
                  style={{ marginTop: '2em', marginBottom: '1em' }}
                />
                <span style={{ display: 'block', marginBottom: '2em' }}>
                  To change your avatar go to{' '}
                  <a href="https://nl.gravatar.com/" target="_blank" rel="noopener noreferrer">
                    gravatar.com
                  </a>
                </span>
              </div>
            )}
          </Query>
        </div>
        <div style={{ display: 'contents' }}>
          <Button
            data-testid="reset-password-btn"
            color="blue"
            className={s.button}
            onClick={() => props.history.push(PATH_RESET_PASSWORD)}
          >
            Change password
          </Button>
          <Button color="red" onClick={() => Auth.logout()} className={s.button}>
            Log out
          </Button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}

// @ts-ignore
export default withRouter(UserPage);
