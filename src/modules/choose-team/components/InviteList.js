import { h } from "preact";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Invite from "./Invite";

export const GET_INVITES = gql`
  query getInvites {
    viewer {
      self {
        teamInvites {
          id
          sentAt
          team {
            name
          }
        }
      }
    }
  }
`;

const InviteList = () => (
  <Query query={GET_INVITES} pollInterval={2000}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `Error! ${error.message}`;

      if (!data.viewer.self.teamInvites.length) {
        return <p style={{ textAlign: "center" }}>No invites.</p>;
      }

      return (
        <div>
          {data.viewer.self.teamInvites.map(invite => (
            <Invite key={invite.id} invite={invite} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default InviteList;
