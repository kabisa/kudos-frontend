import { h } from "preact";
import gql from "graphql-tag";

import ChoiceButton from "./ChoiceButton";

import s from "./style.scss";

export const MUTATION_ACCEPT_INVITE = gql`
  mutation AcceptInvite($team_invite_id: ID!) {
    acceptInvite(team_invite_id: $team_invite_id) {
      id
    }
  }
`;
export const MUTATION_DECLINE_INVITE = gql`
  mutation DeclineInvite($team_invite_id: ID!) {
    declineInvite(team_invite_id: $team_invite_id) {
      id
    }
  }
`;

export const Invite = ({ invite }) => (
  <div className={s.root}>
    <p className={s.text}>{invite.team.name}</p>
    <ChoiceButton
      inviteId={invite.id}
      mutation={MUTATION_DECLINE_INVITE}
      text="Decline"
      color="orange"
    />
    <ChoiceButton
      inviteId={invite.id}
      mutation={MUTATION_ACCEPT_INVITE}
      text="Accept"
      color="red"
    />
  </div>
);

export default Invite;
