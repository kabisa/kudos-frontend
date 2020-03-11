import React from "react";
import gql from "graphql-tag";

import ChoiceButton from "./ChoiceButton";

import s from "./ChooseTeam.module.scss";

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

export interface Invite {
    id: string;
    team: {
        id: string
        name: string

    }
}

export interface Props {
    invite: Invite;
}


export const Invite: React.FC<Props> = ({invite}) => (
    <div className={s.root}>
        <p className={s.text}>{invite.team.name}</p>
        <ChoiceButton
            inviteId={invite.id}
            mutation={MUTATION_ACCEPT_INVITE}
            text="Accept"
            color="green"
            teamId={invite.team.id}
            accept
        />
        <ChoiceButton
            inviteId={invite.id}
            mutation={MUTATION_DECLINE_INVITE}
            text="Decline"
            color="orange"
            teamId={invite.team.id}
        />
    </div>
);

export default Invite;
