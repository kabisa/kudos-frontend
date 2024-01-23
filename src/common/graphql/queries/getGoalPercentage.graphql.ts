import { gql } from "@apollo/client";

export const GET_GOAL_PERCENTAGE = gql`
  query getGoalPercentage($team_id: ID!) {
    teamById(id: $team_id) {
      id
      activeKudosMeter {
        amount
      }
      activeGoals {
        id
        amount
        name
        achievedOn
      }
    }
  }
`;
