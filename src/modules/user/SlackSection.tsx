import React from "react";
import { Button } from "@sandercamp/ui-components";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";

import { getGraphqlError } from "../../support";
import { DISCONNECT_SLACK, DisconnectSlackResult, GET_USER } from "./UserPage";

import s from "./UserPage.module.css";

export function SlackConnectedSegment({
  slackIconPath,
}: {
  slackIconPath: string;
}): React.ReactElement {
  return (
    <div data-testid="slack-connected">
      <h3>Your account is connected to Slack!</h3>
      <p>
        You can disconnect your Kudo-O-Matic account from Slack by using the
        button below.
      </p>
      <Mutation<DisconnectSlackResult>
        mutation={DISCONNECT_SLACK}
        refetchQueries={[{ query: GET_USER }]}
        onCompleted={() => {
          toast.info("Disconnected from Slack!");
        }}
      >
        {(disconnectSlack, { error, loading: mutationLoading }) => {
          if (error) {
            return <p>Something went wrong: {getGraphqlError(error)}</p>;
          }

          return (
            <Button
              variant="secondary"
              className={s.slack_button}
              //loading={mutationLoading} TODO
              onClick={() => disconnectSlack()}
            >
              <img
                width={20}
                height={20}
                src={slackIconPath}
                alt="Disconnect account"
              />
              Disconnect Slack account
            </Button>
          );
        }}
      </Mutation>
    </div>
  );
}

export interface SlackDisconnectedProps {
  slackConnectUrl: string;
  slackIconPath: string;
}

export function SlackDisconnectedSegment(
  props: SlackDisconnectedProps,
): React.ReactElement {
  return (
    <div className={s.slack_message} data-testid="register-slack">
      <h3>
        You&#39;re account is not yet connected to Slack but don&#39;t worry,
        connecting is easy!
      </h3>
      <p>Simply press the button below and you&#39;re good to go.</p>
      <Button
        variant="secondary"
        className={s.slack_button}
        onClick={() => (window.location.href = props.slackConnectUrl)}
      >
        <img
          width={20}
          height={20}
          src={props.slackIconPath}
          alt="Connect account"
        />
        Connect account
      </Button>
    </div>
  );
}
