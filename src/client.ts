import { ApolloClient, ApolloLink, from } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client/cache";
import { createUploadLink } from "apollo-upload-client";
import { Auth } from "./support";
import settings from "./config/settings";
import { Storage } from "./support/storage";

const handleError = async ({ networkError, operation }: ErrorResponse) => {
  const { response } = operation.getContext();

  if (networkError && response.statusCode === 401) {
    await Auth.logout();
  }
};

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: Storage.getItem(settings.LOCALSTORAGE_TOKEN)
        ? `Bearer ${Storage.getItem(settings.LOCALSTORAGE_TOKEN)}`
        : "",
    },
  });

  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: `${settings.API_BASE_URL}/graphql`,
});

const apolloClientLink = from([
  onError((error) => {
    handleError(error);
  }),
  authMiddleware,
  uploadLink,
]);

const client = new ApolloClient({
  link: apolloClientLink,
  cache: new InMemoryCache(),
});

export default client;
