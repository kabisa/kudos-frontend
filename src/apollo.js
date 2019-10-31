import ApolloClient, { InMemoryCache } from "apollo-boost";

import settings from "./config/settings";
import { tokenIsUsable } from "./support/tokenIsUsable";

const token = localStorage.getItem(settings.LOCALSTORAGE_TOKEN);

const client = new ApolloClient({
  uri: `${settings.API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: tokenIsUsable(token, new Date()) ? `Bearer ${token}` : "",
  },
});

export default client;
