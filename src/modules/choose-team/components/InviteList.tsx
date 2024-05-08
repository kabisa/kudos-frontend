import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { Invite, InviteModel } from "./Invite";

export const GET_INVITES = gql`
  query getInvites {
    viewer {
      teamInvites {
        id
        team {
          id
          name
        }
      }
    }
  }
`;

export interface InvitesResult {
  viewer: {
    teamInvites: InviteModel[];
  };
}

const InviteList = () => (
  <div>
    <Query<InvitesResult>
      query={GET_INVITES}
      pollInterval={2000}
      fetchPolicy="network-only"
    >
      {({ loading, error, data }) => {
        if (loading) return <p className="text-center">Loading...</p>;
        if (error)
          return (
            <p data-testid="error-message" className="text-center">
              {error.message}
            </p>
          );

        if (!data || !data.viewer.teamInvites.length) {
          return <p className="text-center">No invites.</p>;
        }

        return (
          <div data-testid="invite-list">
            {data.viewer.teamInvites.map((invite) => (
              <Invite
                data-testid="kudo-invite"
                key={invite.id}
                invite={invite}
              />
            ))}
          </div>
        );
      }}
    </Query>
  </div>
);

export default InviteList;
