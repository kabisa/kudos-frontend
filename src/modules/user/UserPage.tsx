import React from 'react';
import {
  Button, Header, Icon, Image, List, Segment,
} from 'semantic-ui-react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';

import { withRouter } from 'react-router-dom';
import { History } from 'history';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { Navigation } from '../../components/navigation';
import { Auth } from '../../support';
import s from './UserPage.module.scss';
import { PATH_RESET_PASSWORD } from '../../routes';

export const GET_USER = gql`
    query getUser {
        viewer {
            name
            avatar
            slackId
            unlockToken
        }
    }
`;

export interface GetUserResult {
  viewer: {
    name: string;
    avatar: string;
    slackId: string;
    unlockToken: string;
  };
}

export interface Props {
  history: History;
}

export interface State {
  // Future state vars go here
}

export function UserPage(props: Props): React.ReactElement {
  function copyCode(token: string) {
    copy(`/register ${token}`);
    toast.info('Copied to clipboard!');
  }

  return (
    <div>
      <div className="page flex" style={{ padding: '2em', justifyContent: 'space-between' }}>
        <div style={{ display: 'grid', justifyContent: 'center' }}>
          <Query<GetUserResult> query={GET_USER}>
            {({ data }) => {
              if (!data || !data.viewer) return <span>Something went wrong</span>;

              return (
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
                  {data && data.viewer.slackId ? (
                    <span>Your account is connected to slack!</span>
                  ) : (
                    <Segment className={s.segment} compact>
                      <Header>You're account is not yet connect to slack but don't worry, connecting is
                        easy!
                      </Header>
                      <List ordered>
                        <List.Item>Copy this command:
                          <Segment
                            onClick={() => copyCode(data.viewer.unlockToken)}
                            className={s.code}
                            compact
                            placeholder
                          >
                            /register {data.viewer.unlockToken}
                            <Icon name="copy" />
                          </Segment>
                        </List.Item>
                        <List.Item>Go to slack and use the command</List.Item>
                        <List.Item>Thats it, you're all set!</List.Item>
                      </List>
                    </Segment>
                  )}
                </div>
              );
            }}
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
