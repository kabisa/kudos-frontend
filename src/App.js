/* eslint-disable react/jsx-key */
import { h } from "preact";
import { Router as PreactRouter } from "preact-router";
import { history } from "src/support/history";
import { PageTransitionSupport } from "maji";
import { Responsive } from "semantic-ui-react";

import * as routes from "./routes";

import { LoginPage, ForgotPasswordPage, RegisterPage } from "./modules/login";
import { FeedPage, AddTransactionPage } from "./modules/feed";
import { NotificationsPage } from "./modules/notifications";
import { UserPage, ResetPasswordPage } from "./modules/user";
import { SettingsPage } from "./modules/settings";
import { StatisticsPage } from "./modules/statistics";
import { ChooseTeamPage } from "./modules/choose-team";
import { CommentPage } from "./modules/comments";

const AnimationRouter = PageTransitionSupport.augmentRouter(
  PreactRouter,
  history
);

const Routes = [
  <FeedPage exact path={routes.PATH_FEED} />,
  <NotificationsPage path={routes.PATH_NOTIFICATIONS} />,
  <UserPage path={routes.PATH_USER} />,
  <StatisticsPage path={routes.PATH_STATISTICS} />,
  <SettingsPage path={routes.PATH_SETTINGS} />,
  <AddTransactionPage path={routes.PATH_ADD_TRANSACTION} />,
  <ResetPasswordPage path={routes.PATH_RESET_PASSWORD} />,
  <ChooseTeamPage path={routes.PATH_CHOOSE_TEAM} />,
  <CommentPage path="/comments/:comment" />,

  <ForgotPasswordPage path={routes.PATH_FORGOT_PASSWORD} />,
  <RegisterPage path={routes.PATH_REGISTER} />,
  <LoginPage default path={routes.PATH_LOGIN} />,
];

const App = () => (
  <div>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <PreactRouter history={history}>{Routes}</PreactRouter>
    </Responsive>

    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <AnimationRouter history={history}>{Routes}</AnimationRouter>
    </Responsive>
  </div>
);

export default App;
