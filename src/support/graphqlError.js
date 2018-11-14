const getGraphqlError = error =>
  error.message.includes("GraphQL error")
    ? error.message.split(":")[1]
    : "Something went wrong";

export default getGraphqlError;
