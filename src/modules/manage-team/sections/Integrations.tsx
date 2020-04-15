import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Storage } from '../../../support/storage';
import settings from '../../../config/settings';

const GET_TEAM_INTEGRATIONS = gql`
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


export default class IntegrationsSection extends React.Component<any, any> {
  slackUrl = `https://slack.com/oauth/v2/authorize?state=${Storage.getItem(settings.TEAM_ID_TOKEN)}&client_id=964340573189.952854390691&scope=app_mentions:read,channels:join,chat:write,chat:write.public,commands,incoming-webhook,reactions:read,users:read.email,users:read&user_scope=identity.basic,identity.email`;

  constructor(props: any) {
    super(props);
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
            if (loading) return <span>Loading...</span>;
            if (error) return <span>{error.message}</span>;
            if (!data) return <span>Something went wrong</span>;

            if (data.teamById.slackTeamId) {
              return (
                <div>
                  <Header as="h5">Slack integration</Header>
                  <p>Your team is already connected to slack! <br />
                    To disable it remove the app from your workspace.
                  </p>
                </div>
              );
            }

            return (
              <div>
                <Header as="h5">Slack integration</Header>
                <p> To enable slack integration add the app to your workspace using the button below.</p>
                <p>Afterwards every Slack user (including you) should link their account kudo-o-matic account by visiting their profile page.</p>
                <a href={this.slackUrl}><img
                  alt="Add to Slack"
                  height="40"
                  width="139"
                  src="https://platform.slack-edge.com/img/add_to_slack.png"
                  srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
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
