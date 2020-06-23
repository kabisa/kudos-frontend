import React from 'react';
import { Button, SemanticCOLORS } from 'semantic-ui-react';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { DocumentNode } from 'graphql';
import settings from '../../../config/settings';
import { PATH_FEED } from '../../../routes';
import { GET_INVITES } from './InviteList';
import { Storage } from '../../../support/storage';
import s from './ChooseTeam.module.scss';

export interface Props {
  mutation: DocumentNode;
  inviteId: string;
  text: string;
  color: SemanticCOLORS;
  accept?: boolean;
  teamId: string;
  history: History;
}

function ChoiceButton(props: Props): React.ReactElement {
  return (
    <Mutation<any>
      mutation={props.mutation}
      update={(cache, { data: { declineInvite } }) => {
        if (props.accept) {
          return;
        }

        let oldState: any;
        try {
          oldState = cache.readQuery({ query: GET_INVITES });
        } catch (err) {
          // This is just to silence the error in the tests
          return;
        }
        if (!oldState || !oldState.viewer) return;
        const newState = {
          ...oldState,
          viewer: {
            ...oldState.viewer,
            self: {
              ...oldState.viewer.self,
              teamInvites: oldState.viewer.self.teamInvites.filter(
                (item: any) => item.id !== declineInvite.id,
              ),
            },
          },
        };
        cache.writeQuery({
          query: GET_INVITES,
          data: newState,
        });
      }}
    >
      {(mutate, { loading }) => (
        <Button
          loading={loading}
          color={props.color}
          size="small"
          className={s.button}
          onClick={() => {
            mutate({ variables: { team_invite_id: props.inviteId } });
            if (props.accept) {
              Storage.setItem(settings.TEAM_ID_TOKEN, props.teamId);
              toast.info('Invite successfully accepted!');
              props.history.push(PATH_FEED);
            }
            toast.info('Invite successfully declined!');
          }}
        >
          {props.text}
        </Button>
      )}
    </Mutation>
  );
}

// @ts-ignore
export default withRouter(ChoiceButton);
