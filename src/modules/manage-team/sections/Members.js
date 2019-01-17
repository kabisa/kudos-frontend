import { h, Component } from "preact";
import { Header, Icon, Divider, Table, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import { Mutation, Query } from "react-apollo";
import settings from "src/config/settings";

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
  mutation UpdateTeamMemberRole(
    $role: TeamMemberRole!
    $userId: ID!
    $teamId: ID!
  ) {
    updateTeamMemberRole(role: $role, userId: $userId, teamId: $teamId) {
      teamMember {
        role
        id
      }
      errors
    }
  }
`;

export class MemberSection extends Component {
  constructor(props) {
    super(props);

    this.userId = localStorage.getItem(settings.USER_ID_TOKEN);
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="settings" />
          <Header.Content>
            Members
            <Header.Subheader>Manage team members</Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <Query
          query={GET_USERS}
          variables={{ id: localStorage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <div>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Role</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {data.teamById.memberships.map(item => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.user.name}</Table.Cell>
                          <Table.Cell>{item.user.email}</Table.Cell>
                          <Table.Cell>{item.role}</Table.Cell>
                          <Table.Cell>
                            {this.userId !== item.user.id && (
                              <div>
                                <Mutation
                                  mutation={ALTER_ROLE}
                                  onCompleted={() => {
                                    toast.info("Role updated successfully!");
                                    refetch();
                                  }}
                                >
                                  {(mutate, { loading }) => (
                                    <Button
                                      color="green"
                                      size="tiny"
                                      icon="arrow up"
                                      loading={loading}
                                      disabled={item.role === "admin"}
                                      onClick={() =>
                                        mutate({
                                          variables: {
                                            role:
                                              item.role === "member"
                                                ? "moderator"
                                                : "admin",
                                            userId: item.user.id,
                                            teamId: localStorage.getItem(
                                              settings.TEAM_ID_TOKEN
                                            ),
                                          },
                                        })
                                      }
                                    />
                                  )}
                                </Mutation>
                                <Mutation
                                  mutation={ALTER_ROLE}
                                  onCompleted={() => {
                                    toast.info("Role updated successfully!");
                                    refetch();
                                  }}
                                >
                                  {(mutate, { loading }) => (
                                    <Button
                                      color="yellow"
                                      size="tiny"
                                      icon="arrow down"
                                      disabled={item.role === "member"}
                                      loading={loading}
                                      onClick={() =>
                                        mutate({
                                          variables: {
                                            role:
                                              item.role === "moderator"
                                                ? "member"
                                                : "moderator",
                                            userId: item.user.id,
                                            teamId: localStorage.getItem(
                                              settings.TEAM_ID_TOKEN
                                            ),
                                          },
                                        })
                                      }
                                    />
                                  )}
                                </Mutation>
                                <Mutation
                                  mutation={DEACTIVATE_USER}
                                  onCompleted={() => {
                                    toast.info(
                                      "User deactivated successfully!"
                                    );
                                  }}
                                >
                                  {(mutate, { loading }) => (
                                    <Button
                                      color="red"
                                      size="tiny"
                                      icon="trash"
                                      loading={loading}
                                      onClick={() => {
                                        if (
                                          confirm(
                                            "Are you sure you want to deactivate this user?"
                                          )
                                        ) {
                                          mutate({
                                            variables: { id: item.id },
                                          });
                                          refetch();
                                        }
                                      }}
                                    />
                                  )}
                                </Mutation>
                              </div>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
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
