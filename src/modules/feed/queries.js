import gql from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query postsConnection {
    postsConnection(first: 10) {
      edges {
        cursor
        node {
          id
          kudos
          message
          receivers {
            name
          }
          sender {
            name
          }
        }
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
    createPost(message: $message, kudos: $kudos, receivers: $receivers) {
      id
    }
  }
`;
