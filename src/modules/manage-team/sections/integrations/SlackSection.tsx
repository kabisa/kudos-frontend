import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import { Storage } from '../../../../support/storage';
import settings from '../../../../config/settings';
import getGraphqlError from '../../../../support/getGraphqlError';
import {
  GET_TEAM_INTEGRATIONS, REMOVE_SLACK, RemoveSlackParameters, RemoveSlackResult,
} from './Integrations';

export interface SlackSectionProps {
  slackId: string;
  slackConnectUrl: string
}

export function SlackSection(props: SlackSectionProps): React.ReactElement {
  return (
    <div>
      { props.slackId ? (
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
                toast.error(`Something went wrong ${getGraphqlError(mutationError)}`);
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
      ) : (
        <div data-testid="slack-disconnected-container">
          <Header as="h5">Slack integration</Header>
          <p> To enable Slack integration add the app to your workspace using the button below.</p>
          <p>Afterwards every Slack user (including you) should link their account Kudo-O-Matic account
            by visiting their profile page.
          </p>
          <a data-testid="connect-slack-button" href={props.slackConnectUrl}><img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet={'https://platform.slack-edge.com/img/add_to_slack.png 1x'
                        + ', https://platform.slack-edge.com/img/add_to_slack@2x.png 2x'}
          />
          </a>
        </div>
      )}
    </div>
  );
}
