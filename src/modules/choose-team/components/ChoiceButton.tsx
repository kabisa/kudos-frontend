import React from 'react';
import { Button, SemanticCOLORS } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { DocumentNode } from 'graphql';
import settings from '../../../config/settings';
import { PATH_FEED } from '../../../routes';
import { GET_INVITES } from './InviteList';

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
        const oldState: any = cache.readQuery({ query: GET_INVITES });
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
      {(mutate, { loading }) => {
        if (loading) {
          return (
            <Button color={props.color} size="small" className={s.button} loading>
              {props.text}
            </Button>
          );
        }

        return (
          <Button
            color={props.color}
            size="small"
            className={s.button}
            onClick={() => {
              mutate({ variables: { team_invite_id: props.inviteId } });
              if (props.accept) {
                localStorage.setItem(settings.TEAM_ID_TOKEN, props.teamId);
                toast.info('Invite successfully accepted!');
                props.history.push(PATH_FEED);
              }
              toast.info('Invite successfully declined!');
            }}
          >
            {props.text}
          </Button>
        );
      }}
    </Mutation>
  );
}

// @ts-ignore
export default withRouter(ChoiceButton);
