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
  <Query query={GET_INVITES} pollInterval={2000} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
      if (error)
        return <p style={{ textAlign: "center" }}>Error! {error.message}</p>;

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