import ApolloClient, { InMemoryCache } from "apollo-boost";

import settings from "./config/settings";

const token = localStorage.getItem(settings.LOCALSTORAGE_TOKEN);

const client = new ApolloClient({
  uri: `${settings.API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default client;
