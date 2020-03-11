import React from "react";
import gql from "graphql-tag";
import {Query} from "react-apollo";

import Invite from "./Invite";

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
        teamInvites: Invite[];
    }
}

const InviteList = () => (
    <Query<InvitesResult> query={GET_INVITES} pollInterval={2000} fetchPolicy="network-only">
        {({loading, error, data}) => {
            if (loading) return <p style={{textAlign: "center"}}>Loading...</p>;
            if (error) return <p style={{textAlign: "center"}}/>;

            if (!data || !data.viewer.teamInvites.length) {
                return <p style={{textAlign: "center"}}>No invites.</p>;
            }

            return (
                <div>
                    {data.viewer.teamInvites.map(invite => (
                        <Invite key={invite.id} invite={invite}/>
                    ))}
                </div>
            );
        }}
    </Query>
);

export default InviteList;
