import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { logout } from './support';
import settings from './config/settings';
import { Storage } from './support/storage';

const handleError = ({ networkError }: any) => {
  if (networkError && networkError.statusCode === 401) {
    logout();
  }
};
const httpLink = new HttpLink({ uri: `${settings.API_BASE_URL}/graphql` });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: Storage.getItem(settings.LOCALSTORAGE_TOKEN)
        ? `Bearer ${Storage.getItem(settings.LOCALSTORAGE_TOKEN)}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError((error) => {
      if (error && error.networkError) {
        handleError(error.networkError);
      }
    }),
    concat(authMiddleware, httpLink),
  ]),
  cache: new InMemoryCache(),
});

export default client;
