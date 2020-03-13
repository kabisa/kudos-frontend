import ApolloClient, { InMemoryCache } from 'apollo-boost';
import settings from './config/settings';
import { logout } from './support';

const token = localStorage.getItem(settings.LOCALSTORAGE_TOKEN);

const onError = ({ networkError }: any) => {
  if (networkError && networkError.statusCode === 401) {
    logout();
  }
};

const client = new ApolloClient({
  uri: `${settings.API_BASE_URL}/graphql`,
  onError,
  cache: new InMemoryCache(),
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default client;
