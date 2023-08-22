import { ApolloError } from "@apollo/client";

const getGraphqlError = (error: ApolloError) => {
  if (error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message;
  } else {
    return "Something went wrong.";
  }
};

export default getGraphqlError;
