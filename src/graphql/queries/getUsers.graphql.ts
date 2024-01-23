import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers($team_id: ID!) {
    teamById(id: $team_id) {
      id
      users {
        id
        name
        virtualUser
      }
    }
  }
`;