import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { History } from "history";
import { toast } from "react-toastify";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";
import { SlackSection } from "./SlackSection";
import { Icon } from "@sandercamp/ui-components";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

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
        id: string;
      };
    };
  };
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
  };
}

export interface IntegrationsSectionProps {
  history: History;
}

export default class IntegrationsSection extends React.Component<
  IntegrationsSectionProps,
  any
> {
  slackConnectUrl = `${settings.API_BASE_URL}/auth/slack/team/${Storage.getItem(
    settings.TEAM_ID_TOKEN,
  )}`;

  constructor(props: IntegrationsSectionProps) {
    super(props);

    const parsed = queryString.parse(this.props.history.location.search);
    const { auth } = parsed;

    if (auth === "ok") {
      toast.success(
        "Connected to Slack! You should receive a Slack message shortly to confirm this.",
      );
    }
  }

  render() {
    return (
      <>
        <h2>
          <Icon name="move_up" />
          Integrations
        </h2>
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

            return (
              <SlackSection
                slackId={data.teamById.slackTeamId}
                slackConnectUrl={this.slackConnectUrl}
              />
            );
          }}
        </Query>
      </>
    );
  }
}
