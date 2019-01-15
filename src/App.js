/* eslint-disable react/jsx-key */
import { h } from "preact";
import { Router as PreactRouter } from "preact-router";
import { history } from "src/support/history";
import { PageTransitionSupport } from "maji";
import { Responsive } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as routes from "./routes";

import {
  LoginPage,
  ForgotPasswordPage,
  RegisterPage,
  FinishForgotPasswordPage,
} from "./modules/login";
import { FeedPage, AddTransactionPage } from "./modules/feed";
import { NotificationsPage } from "./modules/notifications";
import { UserPage, ResetPasswordPage } from "./modules/user";
import { SettingsPage, InvitePage } from "./modules/settings";
import { StatisticsPage } from "./modules/statistics";
import { ChooseTeamPage, CreateTeamPage } from "./modules/choose-team";
import ManageTeamPage from "./modules/manage-team/ManageTeamPage";

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
  <InvitePage path={routes.PATH_INVITE} />,
  <AddTransactionPage path={routes.PATH_ADD_TRANSACTION} />,
  <ResetPasswordPage path={routes.PATH_RESET_PASSWORD} />,
  <ChooseTeamPage path={routes.PATH_CHOOSE_TEAM} />,
  <CreateTeamPage path={routes.PATH_CREATE_TEAM} />,
  <ManageTeamPage path={routes.PATH_MANAGE_TEAM} />,
  // <CommentPage path="/comments/:comment" />,

  <FinishForgotPasswordPage path={routes.PATH_FINISH_RESET_PASSWORD} />,
  <ForgotPasswordPage path={routes.PATH_FORGOT_PASSWORD} />,
  <RegisterPage path={routes.PATH_REGISTER} />,
  <LoginPage default path={routes.PATH_LOGIN} />,
];

const ToastWrapper = () => (
  <ToastContainer
    bodyClassName="toast-body"
    toastClassName="toast"
    autoClose={4000}
    pauseOnVisibilityChange={false}
    pauseOnHover
  />
);

const App = () => (
  <div>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <PreactRouter history={history}>{Routes}</PreactRouter>
      <ToastWrapper />
    </Responsive>

    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <AnimationRouter history={history}>{Routes}</AnimationRouter>
      <ToastWrapper />
    </Responsive>
  </div>
);

export default App;
