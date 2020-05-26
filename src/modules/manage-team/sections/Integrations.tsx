import React from 'react';
import {
  Button, Divider, Header, Icon,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation, Query } from '@apollo/react-components';
import { History } from 'history';
import { toast } from 'react-toastify';
import { Storage } from '../../../support/storage';
import settings from '../../../config/settings';
import getGraphqlError from '../../../support/getGraphqlError';

const queryString = require('query-string');

export const REMOVE_SLACK = gql`
    mutation RemoveSlack($teamId: ID!) {
        removeSlack(teamId: $teamId) {
            team {
                id
            }
        }
    }
`;

export interface RemoveSlackParameters {
  teamId: string;
}

export interface RemoveSlackResult {
  data: {
    removeSlack: {
      team: {
        id: string
      }
    }
  }
}

export const GET_TEAM_INTEGRATIONS = gql`
    query GetTeamIntegrations($id: ID!) {
        teamById(id: $id) {
            slackTeamId
        }
    }
`;

interface TeamIntegrationsResponse {
  teamById: {
    slackTeamId: string;
  }
}

export interface IntegrationsSectionProps {
  history: History,
}


export default class IntegrationsSection extends React.Component<IntegrationsSectionProps, any> {
  slackConnectUrl = `${settings.API_BASE_URL}/auth/slack/team/${Storage.getItem(settings.TEAM_ID_TOKEN)}`;

  constructor(props: IntegrationsSectionProps) {
    super(props);

    const parsed = queryString.parse(this.props.history.location.search);
    const { auth } = parsed;

    if (auth === 'ok') {
      toast.success('Connected to Slack! You should receive a Slack message shortly to confirm this.');
    }
  }


  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Integrations
            <Header.Subheader>Manage integrations</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Query<TeamIntegrationsResponse>
          query={GET_TEAM_INTEGRATIONS}
          variables={{
            id: Storage.getItem(settings.TEAM_ID_TOKEN),
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <span data-testid="loading">Loading...</span>;
            if (error) return <span data-testid="error">{error.message}</span>;
            if (!data) return <span>Something went wrong</span>;

            if (data.teamById.slackTeamId) {
              return (
                <div data-testid="slack-connected-container">
                  <Header as="h5">Slack integration</Header>
                  <p>Your team is connected to Slack.<br />
                    You can remove it by using the button below.
                  </p>
                  <Mutation<RemoveSlackResult, RemoveSlackParameters>
                    mutation={REMOVE_SLACK}
                    onCompleted={() => {
                      toast.info('Successfully removed Slack');
                    }}
                    variables={{
                      teamId: Storage.getItem(settings.TEAM_ID_TOKEN),
                    }}
                    refetchQueries={[
                      {
                        query: GET_TEAM_INTEGRATIONS,
                        variables: {
                          id: Storage.getItem(settings.TEAM_ID_TOKEN),
                        },
                      },
                    ]}
                  >
                    {(removeSlack, { loading: mutationLoading, error: mutationError }) => {
                      if (mutationError) {
                        toast.error(`Something went wrong ${getGraphqlError(error)}`);
                      }

                      return (
                        <Button
                          data-testid="remove-slack-btn"
                          color="red"
                          size="small"
                          loading={mutationLoading}
                          onClick={() => removeSlack()}
                        >
                          Remove Slack
                        </Button>
                      );
                    }}
                  </Mutation>
                </div>
              );
            }

            return (
              <div data-testid="slack-disconnected-container">
                <Header as="h5">Slack integration</Header>
                <p> To enable Slack integration add the app to your workspace using the button below.</p>
                <p>Afterwards every Slack user (including you) should link their account Kudo-O-Matic account
                  by visiting their profile page.
                </p>
                <a data-testid="connect-slack-button" href={this.slackConnectUrl}><img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet={'https://platform.slack-edge.com/img/add_to_slack.png 1x'
                  + ', https://platform.slack-edge.com/img/add_to_slack@2x.png 2x'}
                />
                </a>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
