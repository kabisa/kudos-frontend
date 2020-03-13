/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import settings from '../../../../config/settings';
import { MemberRow } from './MemberRow';

export const GET_USERS = gql`
    query GetUsers($id: ID!) {
        teamById(id: $id) {
            memberships {
                id
                role
                user {
                    id
                    name
                    email
                }
            }
        }
    }
`;

export const DEACTIVATE_USER = gql`
    mutation DeactivateUser($id: ID!) {
        deleteTeamMember(id: $id) {
            teamMemberId
        }
    }
`;

export const ALTER_ROLE = gql`
    mutation UpdateTeamMemberRole($role: TeamMemberRole!, $userId: ID!, $teamId: ID!) {
        updateTeamMemberRole(role: $role, userId: $userId, teamId: $teamId) {
            teamMember {
                role
                id
            }
            errors
        }
    }
`;

export interface Membership {
  id: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface GetUsersResult {
  teamById: {
    memberships: Membership[];
  };
}

export interface AlterRoleParameters {
  userId: string;
  teamId: string;
  role: string;
}

export interface DeactivateUserParameters {
  id: string;
}

export interface Props {
  // Future props go here
}

export interface State {
  // Future state vars go here
}

export class MemberSection extends Component<Props, State> {
  userId: string;

  constructor(props: Props) {
    super(props);

    this.userId = localStorage.getItem(settings.USER_ID_TOKEN) || '';
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>
            Members
            <Header.Subheader>Manage team members</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Query<GetUsersResult>
          query={GET_USERS}
          variables={{ id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading || !data) return <p> Loading... </p>;
            if (error) return <p>Error! ${error.message} </p>;

            return (
              <div>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          maxWidth: '13rem',
                        }}
                      >
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Role</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '10em' }}>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {data.teamById.memberships.map((item) => (
                      <MemberRow key={item.id} membership={item} refetch={refetch} />
                    ))}
                  </Table.Body>
                </Table>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default MemberSection;
