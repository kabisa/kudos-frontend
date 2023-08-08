import React from "react";
import { Button, Popup, Table } from "semantic-ui-react";
import moment from "moment";
import { Mutation } from "@apollo/client/react/components";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import settings from "../../../../config/settings";
import { InviteModel, QUERY_GET_INVITES } from "./InvitesSection";
import { Storage } from "../../../../support/storage";

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
  let rowClassName = "";
  if (props.invite.declinedAt) {
    rowClassName = "negative";
  } else if (props.invite.acceptedAt) {
    rowClassName = "positive";
  }

  return (
    <Table.Row key={props.invite.id} className={rowClassName}>
      <Table.Cell>
        {moment(props.invite.sentAt).format("YYYY-MM-DD")}
      </Table.Cell>
      <Table.Cell>{props.invite.email}</Table.Cell>
      <Table.Cell>
        {props.invite.acceptedAt && "Accepted"}
        {props.invite.declinedAt && "Declined"}
        {!props.invite.declinedAt && !props.invite.acceptedAt && "Pending"}
      </Table.Cell>
      <Table.Cell>
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
            <Popup
              trigger={
                <Button
                  data-testid="delete-button"
                  size="tiny"
                  color="red"
                  loading={loading}
                  icon="trash"
                />
              }
              content={
                <Button
                  data-testid="confirm-delete-button"
                  color="red"
                  content="Confirm deletion"
                  onClick={() => {
                    deleteInvite({
                      variables: { id: props.invite.id },
                    });
                  }}
                />
              }
              on="click"
              position="top right"
            />
          )}
        </Mutation>
      </Table.Cell>
    </Table.Row>
  );
}
