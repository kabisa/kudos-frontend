import { h } from "preact";
import gql from "graphql-tag";

import ChoiceButton from "./ChoiceButton";

import s from "./style.scss";

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

export const Invite = ({ invite }) => (
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
    />
  </div>
);

export default Invite;
