import React from 'react';
import gql from 'graphql-tag';

import ChoiceButton from './ChoiceButton';

import s from './ChooseTeam.module.scss';

export const MUTATION_ACCEPT_INVITE = gql`
    mutation AcceptTeamInvite($team_invite_id: ID!) {
        acceptTeamInvite(teamInviteId: $team_invite_id) {
            teamInvite {
                id
            }
        }
    }
`;

export const MUTATION_DECLINE_INVITE = gql`
    mutation DeclineTeamInvite($team_invite_id: ID!) {
        declineTeamInvite(teamInviteId: $team_invite_id) {
            teamInvite {
                id
            }
        }
    }
`;

export interface InviteModel {
  id: string;
  team: {
    id: string;
    name: string;
  };
}

export interface Props {
  invite: InviteModel;
}

export function Invite(props: Props): React.ReactElement {
  return (
    <div className={s.root}>
      <p className={s.text}>{props.invite.team.name}</p>
      <ChoiceButton
        inviteId={props.invite.id}
        mutation={MUTATION_ACCEPT_INVITE}
        text="Accept"
        color="teal"
        teamId={props.invite.team.id}
        accept
      />
      <ChoiceButton
        inviteId={props.invite.id}
        mutation={MUTATION_DECLINE_INVITE}
        text="Decline"
        color="red"
        teamId={props.invite.team.id}
      />
    </div>
  );
}
