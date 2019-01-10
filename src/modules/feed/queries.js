import gql from "graphql-tag";

export const FRAGMENT_POST = gql`
  fragment PostInFeed on Post {
    id
    amount
    message
    createdAt
    receivers {
      id
      avatar
      name
    }
    sender {
      id
      name
      avatar
    }
    votes {
      voter {
        id
        name
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query postsConnection($team_id: ID!, $end: String) {
    teamById(id: $team_id) {
      posts(first: 10, after: $end, orderBy: "created_at desc") {
        edges {
          cursor
          node {
            ...PostInFeed
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${FRAGMENT_POST}
`;

export const GET_USERS = gql`
  query Users($team_id: ID!) {
    teamById(id: $team_id) {
      users {
        id
        name
        virtualUser
      }
    }
  }
`;

export const GET_GOAL_PERCENTAGE = gql`
  query getGoalPercentage($team_id: ID!) {
    teamById(id: $team_id) {
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
