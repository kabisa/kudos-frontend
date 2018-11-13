import gql from "graphql-tag";

export const GET_GOALS = gql`
  query getGoals($team_id: ID!) {
    teamById(id: $team_id) {
      activeGoals {
        id
        name
        amount
        achieved_on
      }
      activeKudosMeter {
        amount
      }
    }
  }
`;
