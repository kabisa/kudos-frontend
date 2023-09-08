import React from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
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

export function InviteSection(): React.ReactElement {
  return (
    <div className="form-container">
      <h2>
        <Icon name="mail" />
        Invites
      </h2>
      <CreateInvite data-testid="create-invite" />
      <Query<GetInvitesResult>
        query={QUERY_GET_INVITES}
        variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! {error.message}</p>;
          if (!data || !data.teamById || data.teamById.teamInvites.length === 0)
            return <p>No invites available</p>;

          return (
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
                {data.teamById.teamInvites.map((item) => (
                  <Invite
                    data-testid="invite-row"
                    key={item.id}
                    invite={item}
                  />
                ))}
              </tbody>
            </table>
          );
        }}
      </Query>
    </div>
  );
}
