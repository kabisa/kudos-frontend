import { h, render } from "preact";
import { route } from "preact-router";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";

import "src/config/sentry";
import settings from "./config/settings";
import { PATH_LOGIN } from "./routes";

import "./styles/shell.scss";

const renderApp = function() {
  const App = require("./App").default;
  const root = document.querySelector("#maji-app");

  // Check for user token
  const token = localStorage.getItem(settings.LOCALSTORAGE_TOKEN);
  if (!token) {
    if (!window.location.href.includes(`#${PATH_LOGIN}`)) {
      route(PATH_LOGIN, true);
    }
  }

  root.innerHTML = "";
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root
  );
};

renderApp();

if (process.env.NODE_ENV !== "production") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
