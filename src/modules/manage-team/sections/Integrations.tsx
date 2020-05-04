import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { History } from 'history';
import { toast } from 'react-toastify';
import { Storage } from '../../../support/storage';
import settings from '../../../config/settings';

const queryString = require('query-string');

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
  slackConnectUrl = `${settings.API_BASE_URL}/auth/slack/${Storage.getItem(settings.TEAM_ID_TOKEN)}`;

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
                <div>
                  <Header as="h5">Slack integration</Header>
                  <p>Your team is already connected to Slack! <br />
                    To disable it remove the app from your workspace.
                  </p>
                </div>
              );
            }

            return (
              <div>
                <Header as="h5">Slack integration</Header>
                <p> To enable Slack integration add the app to your workspace using the button below.</p>
                <p>Afterwards every Slack user (including you) should link their account Kudo-O-Matic account
                  by visiting their profile page.
                </p>
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
            );
          }}
        </Query>
      </div>
    );
  }
}
