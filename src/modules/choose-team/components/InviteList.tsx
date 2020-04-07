import React from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Invite, InviteModel } from './Invite';

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
  <Query<InvitesResult> query={GET_INVITES} pollInterval={2000} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
      if (error) return <p data-testid="error-message" style={{ textAlign: 'center' }}>{error.message}</p>;

      if (!data || !data.viewer.teamInvites.length) {
        return <p style={{ textAlign: 'center' }}>No invites.</p>;
      }

      return (
        <div>
          {data.viewer.teamInvites.map((invite) => (
            <Invite data-testid="kudo-invite" key={invite.id} invite={invite} />
          ))}
        </div>
      );
    }}
  </Query>
);

export default InviteList;
