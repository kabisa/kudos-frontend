import "@kabisa/ui-components/index.css";
import "./styles/shell.css";
import "./ui/global.css";

import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import client from "./client";

const renderApp = function () {
  const root = document.getElementById("root") as HTMLElement;
  // eslint-disable-next-line react/no-deprecated
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    root,
  );
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
