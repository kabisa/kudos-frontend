import { ApolloClient } from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { Auth } from './support';
import settings from './config/settings';
import { Storage } from './support/storage';

const handleError = async ({ networkError }: any) => {
  if (networkError && networkError.statusCode === 401) {
    await Auth.logout();
  }
};

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: Storage.getItem(settings.LOCALSTORAGE_TOKEN)
        ? `Bearer ${Storage.getItem(settings.LOCALSTORAGE_TOKEN)}` : '',
    },
  });

  return forward(operation);
});

const uploadLink = createUploadLink({ uri: `${settings.API_BASE_URL}/graphql` });

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
