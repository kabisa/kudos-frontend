import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import { getGraphqlError } from '../../support';
import { DISCONNECT_SLACK, DisconnectSlackResult, GET_USER } from './UserPage';
import s from './UserPage.module.scss';

export function SlackConnectedSegment(): React.ReactElement {
  return (
    <div data-testid="slack-connected">
      <Header>Your account is connected to Slack!</Header>
      <p>You can disconnect your Kudo-O-Matic account from Slack by using the button below.</p>
      <Mutation<DisconnectSlackResult>
        mutation={DISCONNECT_SLACK}
        refetchQueries={[
          { query: GET_USER },
        ]}
        onCompleted={() => {
          toast.info('Disconnected from Slack!');
        }}
      >
        {(disconnectSlack, { error, loading: mutationLoading }) => {
          if (error) {
            return <p>Something went wrong: {getGraphqlError(error)}</p>;
          }

          return (
            <Button
              data-testid="disconnect-slack-btn"
              color="red"
              className={s.button}
              loading={mutationLoading}
              onClick={() => disconnectSlack()}
            >
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

export function SlackDisconnectedSegment(props: SlackDisconnectedProps): React.ReactElement {
  return (
    <div style={{ textAlign: 'center' }} data-testid="register-slack">
      <Header>You&#39;re account is not yet connected to Slack but don&#39;t worry, connecting is
        easy!
      </Header>
      <div>
        <p>Simply press the button below and you&#39;re good to go.</p>
        <Button
          className={s.button}
          data-testid="connect-slack-btn"
          href={props.slackConnectUrl}
          style={{ background: '#FFF' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFF',
          }}
          >
            <img
              style={{ marginRight: 8 }}
              width={20}
              height={20}
              src={props.slackIconPath}
              alt="Connect account"
            />
            Connect account
          </div>
        </Button>
      </div>
    </div>
  );
}
