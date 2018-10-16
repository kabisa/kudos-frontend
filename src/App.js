import { h } from "preact";
import { Router as PreactRouter } from "preact-router";

import { history } from "src/support/history";
import { PageTransitionSupport } from "maji";
import LoginPage from "src/modules/login/containers/LoginPage";
import { default as ForgotPasswordPage } from "src/modules/login/containers/ResetPasswordPage";
import RegisterPage from "src/modules/login/containers/RegisterPage";
import { FeedPage } from "./modules/feed";
import { NotificationsPage } from "./modules/notifications";
import { UserPage } from "./modules/user";
import { SettingsPage } from "./modules/settings";
import { StatisticsPage } from "./modules/statistics";
import * as routes from "./routes";
import { AddTransactionPage } from "./modules/feed/pages/AddTransactionPage";
import ResetPasswordPage from "./modules/user/pages/ResetPasswordPage";
import { ChooseTeamPage } from "./modules/choose-team";

const Router = PageTransitionSupport.augmentRouter(PreactRouter, history);

const App = () => (
  <Router history={history}>
    <FeedPage exact path={routes.PATH_FEED} />
    <NotificationsPage path={routes.PATH_NOTIFICATIONS} />
    <UserPage path={routes.PATH_USER} />
    <StatisticsPage path={routes.PATH_STATISTICS} />
    <SettingsPage path={routes.PATH_SETTINGS} />
    <AddTransactionPage path={routes.PATH_ADD_TRANSACTION} />
    <ResetPasswordPage path={routes.PATH_RESET_PASSWORD} />
    <ChooseTeamPage path={routes.PATH_CHOOSE_TEAM} />

    <ForgotPasswordPage path={routes.PATH_FORGOT_PASSWORD} />
    <RegisterPage path={routes.PATH_REGISTER} />
    <LoginPage default path={routes.PATH_LOGIN} />
  </Router>
);

export default App;
