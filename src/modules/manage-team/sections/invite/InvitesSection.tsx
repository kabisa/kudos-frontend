import React from "react";
import { gql, useQuery } from "@apollo/client";
import settings from "../../../../config/settings";
import { Storage } from "../../../../support/storage";
import { Invite } from "./Invite";
import { CreateInvite } from "./CreateInvite";
import { Icon } from "@sandercamp/ui-components";

export const QUERY_GET_INVITES = gql`
  query getInvites($team_id: ID!) {
    teamById(id: $team_id) {
      teamInvites {
        acceptedAt
        declinedAt
        email
        id
        sentAt
      }
    }
  }
`;

export interface GetInvitesResult {
  teamById: {
    teamInvites: InviteModel[];
  };
}

export interface InviteModel {
  acceptedAt: string;
  declinedAt: string;
  email: string;
  id: number;
  sentAt: string;
}

function InviteSection(): React.ReactElement {
  const { loading, error, data, refetch } = useQuery<GetInvitesResult>(
    QUERY_GET_INVITES,
    {
      variables: { team_id: Storage.getItem(settings.TEAM_ID_TOKEN) },
    },
  );

  const teamInvites = data?.teamById?.teamInvites || [];

  return (
    <div className="form-container">
      <h2>
        <Icon name="mail" />
        Invites
      </h2>
      <CreateInvite data-testid="create-invite" refetch={refetch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error! {error.message}</p>}
      {teamInvites.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Send at</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {teamInvites.map((item) => (
              <Invite
                data-testid="invite-row"
                key={item.id}
                invite={item}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InviteSection;
