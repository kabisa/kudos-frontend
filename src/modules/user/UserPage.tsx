import React from 'react';
import {
  Button, Header, Image, Segment,
} from 'semantic-ui-react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';

import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { toast } from 'react-toastify';
import { Navigation } from '../../components/navigation';
import { Auth } from '../../support';
import s from './UserPage.module.scss';
import { PATH_RESET_PASSWORD } from '../../routes';
import settings from '../../config/settings';
import { Storage } from '../../support/storage';

const queryString = require('query-string');

export const GET_USER = gql`
    query getUser {
        viewer {
            name
            avatar
            slackId
        }
    }
`;

export interface GetUserResult {
  viewer: {
    name: string;
    avatar: string;
    slackId: string;
    slackRegistrationToken: string;
  };
}

export interface Props {
  history: History;
}

export interface State {
  // Future state vars go here
}

export class UserPage extends React.Component<Props, State> {
  slackConnectUrl = `${settings.API_BASE_URL}/auth/slack/user/${Storage.getItem(settings.USER_ID_TOKEN)}`;

  constructor(props: Props) {
    super(props);

    const parsed = queryString.parse(this.props.history.location.search);
    const { auth } = parsed;

    if (auth === 'ok') {
      toast.success('Your account has been connected to Slack!');
    }
  }

  render() {
    return (
      <div>
        <div className="page flex" style={{ padding: '2em', justifyContent: 'space-between' }}>
          <div style={{ display: 'grid', justifyContent: 'center' }}>
            <Query<GetUserResult> query={GET_USER}>
              {({ loading, data }) => {
                if (loading) return <span data-testid="loading">Loading...</span>;
                if (!data || !data.viewer) return <span>Something went wrong</span>;

                return (
                  <div>
                    <h2 className={s.name}>{data.viewer.name}</h2>
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
                      <Header data-testid="slack-connected">Your account is connected to slack!</Header>
                    ) : (
                      <Segment data-testid="register-slack" className={s.segment} compact>
                        <Header>You&#39;re account is not yet connected to Slack but don&#39;t worry, connecting is
                          easy!
                        </Header>
                        <div>
                          <p>Simply press the button below and you&#39;re good to go.</p>
                          <a data-testid="slack-button" href={this.slackConnectUrl}><img
                            alt="Add to Slack"
                            height="40"
                            width="139"
                            src="https://platform.slack-edge.com/img/add_to_slack.png"
                            srcSet={'https://platform.slack-edge.com/img/add_to_slack.png 1x'
                                    + ', https://platform.slack-edge.com/img/add_to_slack@2x.png 2x'}
                          />
                          </a>

                        </div>
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
              onClick={() => this.props.history.push(PATH_RESET_PASSWORD)}
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
}

// @ts-ignore
export default withRouter(UserPage);
