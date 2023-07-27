import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router, Route, Switch } from "react-router-dom";
import * as routes from "./routes";
import history from "./support/history";
import {
  FinishForgotPasswordPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
} from "./modules/login";
import { FeedPage } from "./modules/feed";
import { NotificationsPage } from "./modules/notifications";
import { ResetPasswordPage, UserPage } from "./modules/user";
import { InvitePage, SettingsPage } from "./modules/settings";
import { StatisticsPage } from "./modules/statistics";
import { ChooseTeamPage, CreateTeamPage } from "./modules/choose-team";
import { ManageTeamPage } from "./modules/manage-team/ManageTeamPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { MediaContextProvider } from "./support/breakpoints";

const ToastWrapper = () => (
  <ToastContainer
    bodyClassName="toast-body"
    toastClassName="toast"
    autoClose={4000}
    pauseOnHover
  />
);

function App() {
  return (
    <div>
      <MediaContextProvider>
        <Router history={history}>
          <Switch>
            <Route path={routes.PATH_LOGIN}>
              <LoginPage />
            </Route>
            <AuthenticatedRoute
              allowNoTeam
              path={routes.PATH_NOTIFICATIONS}
              component={NotificationsPage}
            />
            <AuthenticatedRoute
              allowNoTeam
              path={routes.PATH_USER}
              component={UserPage}
            />
            <AuthenticatedRoute
              path={routes.PATH_STATISTICS}
              component={StatisticsPage}
            />
            <AuthenticatedRoute
              allowNoTeam
              path={routes.PATH_SETTINGS}
              component={SettingsPage}
            />
            <AuthenticatedRoute
              path={routes.PATH_INVITE}
              component={InvitePage}
            />
            <AuthenticatedRoute
              allowNoTeam
              path={routes.PATH_CHOOSE_TEAM}
              component={ChooseTeamPage}
            />
            <AuthenticatedRoute
              allowNoTeam
              path={routes.PATH_CREATE_TEAM}
              component={CreateTeamPage}
            />
            <AuthenticatedRoute
              path={routes.PATH_MANAGE_TEAM}
              component={ManageTeamPage}
            />
            <Route path={routes.PATH_RESET_PASSWORD}>
              <ResetPasswordPage />
            </Route>
            <Route path={routes.PATH_FINISH_RESET_PASSWORD}>
              <FinishForgotPasswordPage />
            </Route>
            <Route path={routes.PATH_FORGOT_PASSWORD}>
              <ForgotPasswordPage />
            </Route>
            <Route path={routes.PATH_REGISTER}>
              <RegisterPage />
            </Route>
            <AuthenticatedRoute path={routes.PATH_FEED} component={FeedPage} />
          </Switch>
        </Router>
        <ToastWrapper />
      </MediaContextProvider>
    </div>
  );
}

export default App;
