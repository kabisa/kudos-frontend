import gql from "graphql-tag";

export const MUTATION_LOGIN = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      token
    }
  }
`;

export const MUTATION_REGISTER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name
      authProvider: { credentials: { email: $email, password: $password } }
    ) {
      token
    }
  }
`;
