import React from "react";
import { Responsive } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import { PATH_LOGIN } from "./routes";

const ToastWrapper = () => (
  <ToastContainer
    bodyClassName="toast-body"
    toastClassName="toast"
    autoClose={4000}
    pauseOnVisibilityChange={false}
    pauseOnHover
  />
);

function App() {
  return (
    <div>
      <Responsive>
        <Router>
          <Switch>
            <Route path={PATH_LOGIN}>
              <LoginPage/>
            </Route>
            <Route path={routes.PATH_NOTIFICATIONS}>
              <NotificationsPage/>
            </Route>
            <Route path={routes.PATH_USER}>
              <UserPage/>
            </Route>
            <Route path={routes.PATH_STATISTICS}>
              <StatisticsPage/>,
            </Route>
            <Route path={routes.PATH_SETTINGS}>
              <SettingsPage/>
            </Route>
            <Route path={routes.PATH_INVITE}>
              <InvitePage/>
            </Route>
            <Route path={routes.PATH_ADD_TRANSACTION}>
              <AddTransactionPage/>
            </Route>
            <Route path={routes.PATH_RESET_PASSWORD}>
              <ResetPasswordPage/>
            </Route>
            <Route path={routes.PATH_CHOOSE_TEAM}>
              <ChooseTeamPage/>
            </Route>
            <Route path={routes.PATH_CREATE_TEAM}>
              <CreateTeamPage/>
            </Route>
            <Route path={routes.PATH_MANAGE_TEAM}>
              <ManageTeamPage/>
            </Route>
            <Route path={routes.PATH_FINISH_RESET_PASSWORD}>
              <FinishForgotPasswordPage/>
            </Route>
            <Route path={routes.PATH_FORGOT_PASSWORD}>
              <ForgotPasswordPage/>
            </Route>
            <Route path={routes.PATH_REGISTER}>
              <RegisterPage/>
            </Route>
            <Route path={routes.PATH_FEED}>
              <FeedPage/>
            </Route>
          </Switch>
        </Router>
        <ToastWrapper/>
      </Responsive>
    </div>
  );
}

export default App;
