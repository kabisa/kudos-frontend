/* eslint-disable object-curly-newline */
import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import settings from "../../../../config/settings";
import { MemberRow } from "./MemberRow";
import { Storage } from "../../../../support/storage";
import { Icon } from "@sandercamp/ui-components";

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

export default class MemberSection extends Component<Props, State> {
  userId: string;

  constructor(props: Props) {
    super(props);

    this.userId = Storage.getItem(settings.USER_ID_TOKEN) || "";
  }

  render() {
    return (
      <div className="form-container">
        <h2>
          <Icon name="people" />
          Members
        </h2>
        <Query<GetUsersResult>
          query={GET_USERS}
          variables={{ id: Storage.getItem(settings.TEAM_ID_TOKEN) }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <p> Loading... </p>;
            if (error) return <p>Error! {error.message} </p>;

            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data && data.teamById && data.teamById.memberships ? (
                      data.teamById.memberships.map((item) => (
                        <MemberRow
                          key={item.id}
                          membership={item}
                          refetch={refetch}
                        />
                      ))
                    ) : (
                      <tr>
                        <td>No memberships available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
