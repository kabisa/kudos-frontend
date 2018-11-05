import gql from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query postsConnection($end: String) {
    postsConnection(first: 10, after: $end) {
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
    users(name: $name) {
      name
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($message: String!, $kudos: Int!, $receivers: [Int]!) {
    createPost(message: $message, amount: $kudos, receivers: $receivers) {
      id
    }
  }
`;
