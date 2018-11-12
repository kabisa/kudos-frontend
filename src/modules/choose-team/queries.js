import gql from "graphql-tag";

export const GET_TEAMS = gql`
  query getTeams {
    teams {
      id
      name
    }
  }
`;
