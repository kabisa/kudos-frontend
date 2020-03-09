import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

import "./styles/shell.scss";
import "semantic-ui-css/semantic.min.css"

const renderApp = function() {
  const root = document.getElementById("root");

  root.innerHTML = "";
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>,
    root,
  );
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
