import React from "react";
import moment from "moment";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import {
  DefaultContext,
  MutationFunction,
  OperationVariables,
  gql,
} from "@apollo/client";
import settings from "../../../../config/settings";
import { InviteModel, QUERY_GET_INVITES } from "./InvitesSection";
import { Storage } from "../../../../support/storage";
import { IconButton } from "@sandercamp/ui-components";

export interface InviteProps {
  invite: InviteModel;
  key: number;
}

export const MUTATION_DELETE_INVITE = gql`
  mutation DeleteTeamInvite($id: ID!) {
    deleteTeamInvite(teamInviteId: $id) {
      teamInviteId
    }
  }
`;

export interface DeleteInviteParameters {
  id: number;
}

export function Invite(props: InviteProps): React.ReactElement {
  const showConfirmDialog = (
    deleteInvite: MutationFunction<
      DeleteInviteParameters,
      OperationVariables,
      DefaultContext
    >,
  ) => {
    const result = window.confirm(
      "Are you sure you want to delete the guideline?",
    );
    if (result) {
      // TODO: rerender
      deleteInvite({
        variables: { id: props.invite.id },
      });
    }
  };

  let rowClassName = "";
  if (props.invite.declinedAt) {
    rowClassName = "negative";
  } else if (props.invite.acceptedAt) {
    rowClassName = "positive";
  }

  return (
    <tr key={props.invite.id} className={rowClassName}>
      <td>{moment(props.invite.sentAt).format("YYYY-MM-DD")}</td>
      <td>{props.invite.email}</td>
      <td>
        {props.invite.acceptedAt && "Accepted"}
        {props.invite.declinedAt && "Declined"}
        {!props.invite.declinedAt && !props.invite.acceptedAt && "Pending"}
      </td>
      <td>
        <Mutation<DeleteInviteParameters>
          mutation={MUTATION_DELETE_INVITE}
          onCompleted={() => {
            toast.info("Invite removed successfully!");
          }}
          refetchQueries={[
            {
              query: QUERY_GET_INVITES,
              variables: {
                team_id: Storage.getItem(settings.TEAM_ID_TOKEN),
              },
            },
          ]}
        >
          {(deleteInvite, { loading }) => (
            <IconButton
              variant="tertiary"
              name="delete"
              onClick={() => showConfirmDialog(deleteInvite)}
              disabled={loading}
            />
          )}
        </Mutation>
      </td>
    </tr>
  );
}
