import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { Storage } from "../../../../support/storage";
import settings from "../../../../config/settings";
import getGraphqlError from "../../../../support/getGraphqlError";
import {
  GET_TEAM_INTEGRATIONS,
  REMOVE_SLACK,
  RemoveSlackParameters,
  RemoveSlackResult,
} from "./Integrations";
import { Button } from "@sandercamp/ui-components";

export interface SlackSectionProps {
  slackId: string;
  slackConnectUrl: string;
}

function SlackConnectedSection(): React.ReactElement {
  return (
    <div data-testid="slack-connected-container">
      <h4>Slack integration</h4>
      <p>
        Your team is connected to Slack.
        <br />
        You can remove it by using the button below.
      </p>
      <Mutation<RemoveSlackResult, RemoveSlackParameters>
        mutation={REMOVE_SLACK}
        onCompleted={() => {
          toast.info("Successfully removed Slack");
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
            toast.error(
              `Something went wrong ${getGraphqlError(mutationError)}`,
            );
          }

          return (
            <Button
              data-testid="remove-slack-btn"
              variant="primary"
              disabled={mutationLoading}
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

interface SlackDisconnectedProps {
  slackConnectUrl: string;
}

function SlackDisconnectedSection(
  props: SlackDisconnectedProps,
): React.ReactElement {
  return (
    <div data-testid="slack-disconnected-container">
      <h4>Slack integration</h4>
      <p>
        To enable Slack integration add the app to your workspace using the
        button below.
      </p>
      <p>
        Afterwards every Slack user (including you) should link their account
        Kudo-O-Matic account by visiting their profile page.
      </p>
      <a data-testid="connect-slack-button" href={props.slackConnectUrl}>
        <img
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack.png"
          srcSet={
            "https://platform.slack-edge.com/img/add_to_slack.png 1x" +
            ", https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          }
        />
      </a>
    </div>
  );
}

export function SlackSection(props: SlackSectionProps): React.ReactElement {
  return (
    <div>
      {props.slackId ? (
        <SlackConnectedSection />
      ) : (
        <SlackDisconnectedSection slackConnectUrl={props.slackConnectUrl} />
      )}
    </div>
  );
}
