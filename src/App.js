import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { PageTransitionSupport } from "maji";
import LoginPage from "src/modules/login/containers/LoginPage";
import ResetPasswordPage from "src/modules/login/containers/ResetPasswordPage";
import RegisterPage from "src/modules/login/containers/RegisterPage";
import * as routes from "./routes";

const Router = PageTransitionSupport.augmentRouter(PreactRouter, history);

const App = () => (
  <Router history={history}>
    <ResetPasswordPage path={routes.PATH_FORGOT_PASSWORD} />
    <RegisterPage path={routes.PATH_REGISTER} />
    <LoginPage default />
  </Router>
);

export default App;
