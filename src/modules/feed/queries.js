import gql from "graphql-tag";

export const FRAGMENT_POST = gql`
  fragment PostInFeed on Post {
    id
    amount
    message
    receivers {
      name
    }
    sender {
      name
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
    postsConnection(
      findByTeamId: $team_id
      first: 10
      after: $end
      orderBy: "created_at desc"
    ) {
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
  ${FRAGMENT_POST}
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
        id
        amount
        name
      }
    }
  }
`;
