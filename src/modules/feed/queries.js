import gql from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query postsConnection($end: String) {
    postsConnection(first: 10, after: $end, orderBy: "created_at desc") {
      edges {
        cursor
        node {
          id
          amount
          message
          receivers {
            name
          }
          sender {
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users($name: String) {
    users(findByName: $name) {
      name
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $message: String!
    $kudos: Int!
    $receivers: [ID]!
    $team_id: ID!
  ) {
    createPost(
      message: $message
      amount: $kudos
      receiver_ids: $receivers
      team_id: $team_id
    ) {
      id
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
        amount
      }
    }
  }
`;
