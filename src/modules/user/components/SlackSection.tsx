import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";

import { getGraphqlError } from "../../../support";
import { DISCONNECT_SLACK, DisconnectSlackResult, GET_USER } from "../UserPage";

import s from "./SlackSection.module.scss";
import Button from "../../../ui/Button";

export function SlackConnectedSegment({
  slackIconPath,
}: {
  slackIconPath: string;
}) {
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
        {(disconnectSlack, { error, loading }) => {
          if (error) {
            return <p>Something went wrong: {getGraphqlError(error)}</p>;
          }

          return (
            <Button
              text="Disconnect Slack account"
              image={slackIconPath}
              alt="Disconnect account"
              variant="secondary"
              state={loading ? "disabled" : "default"}
              onClick={() => disconnectSlack()}
            />
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

export function SlackDisconnectedSegment(props: SlackDisconnectedProps) {
  return (
    <div className={s.slack_message} data-testid="register-slack">
      <h3>
        You&#39;re account is not yet connected to Slack but don&#39;t worry,
        connecting is easy!
      </h3>
      <p>Simply press the button below and you&#39;re good to go.</p>
      <Button
        text="Connect account"
        image={props.slackIconPath}
        alt="Connect account"
        variant="secondary"
        onClick={() => (window.location.href = props.slackConnectUrl)}
      />
    </div>
  );
}
