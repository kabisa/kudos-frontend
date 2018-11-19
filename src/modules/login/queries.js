import gql from "graphql-tag";

export const MUTATION_LOGIN = gql`
  mutation SignInUser($email: EmailAddress!, $password: String!) {
    signInUser(credentials: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export const MUTATION_REGISTER = gql`
  mutation CreateUser(
    $name: String!
    $email: EmailAddress!
    $password: String!
  ) {
    createUser(
      credentials: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`;

export const MUTATION_FORGOT_PASSWORD = gql`
  mutation ResetPassword($email: EmailAddress!) {
    resetPassword(credentials: { email: $email }) {
      id
    }
  }
`;
