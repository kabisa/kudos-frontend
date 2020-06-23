/* eslint-disable no-shadow */
import React from 'react';
import {
  Divider, Header, Icon, Table,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import settings from '../../../../config/settings';
import { Storage } from '../../../../support/storage';
import { Invite } from './Invite';
import { CreateInvite } from './CreateInvite';

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
    <div>
      <Header as="h2">
        <Icon name="paper plane" />
        <Header.Content>
          Invites
          <Header.Subheader>Manage invites</Header.Subheader>
        </Header.Content>
      </Header>
      <Divider />
      <CreateInvite data-testid="create-invite" />
      <Divider />
      <Query<GetInvitesResult>
        query={QUERY_GET_INVITES}
        variables={{ team_id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error! {error.message}</p>;
          if (!data || !data.teamById) return <p>No invites available</p>;

          return (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Send at</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.teamById.teamInvites.map((item) => (
                  <Invite data-testid="invite-row" key={item.id} invite={item} />
                ))}
              </Table.Body>
            </Table>
          );
        }}
      </Query>
    </div>
  );
}
