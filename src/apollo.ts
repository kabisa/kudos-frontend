import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { logout } from './support';
import settings from './config/settings';

const token = localStorage.getItem(settings.LOCALSTORAGE_TOKEN);

const handleError = ({ networkError }: any) => {
  if (networkError && networkError.statusCode === 401) {
    logout();
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError((error) => {
      if (error && error.networkError) {
        handleError(error.networkError);
      }
    }),
    new HttpLink({
      uri: `${settings.API_BASE_URL}/graphql`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
