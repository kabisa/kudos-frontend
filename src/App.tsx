import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import * as routes from './routes';
import { PATH_LOGIN } from './routes';

import {
  FinishForgotPasswordPage, ForgotPasswordPage, LoginPage, RegisterPage,
} from './modules/login';
import { AddTransactionPage, FeedPage } from './modules/feed';
import { NotificationsPage } from './modules/notifications';
import { ResetPasswordPage, UserPage } from './modules/user';
import { InvitePage, SettingsPage } from './modules/settings';
import { StatisticsPage } from './modules/statistics';
import { ChooseTeamPage, CreateTeamPage } from './modules/choose-team';
import { ManageTeamPage } from './modules/manage-team/ManageTeamPage';
import { isLoggedIn } from './support';

const ToastWrapper = () => (
  <ToastContainer bodyClassName="toast-body" toastClassName="toast" autoClose={4000} pauseOnHover />
);

const AuthenticatedRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => (isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />)} />
);

function App() {
  return (
    <div>
      <Responsive>
        <Router>
          <Switch>
            <Route path={PATH_LOGIN}>
              <LoginPage />
            </Route>
            <AuthenticatedRoute path={routes.PATH_NOTIFICATIONS} component={NotificationsPage} />
            <AuthenticatedRoute path={routes.PATH_USER} component={UserPage} />
            <AuthenticatedRoute path={routes.PATH_STATISTICS} component={StatisticsPage} />
            <AuthenticatedRoute path={routes.PATH_SETTINGS} component={SettingsPage} />
            <AuthenticatedRoute path={routes.PATH_INVITE} component={InvitePage} />
            <AuthenticatedRoute path={routes.PATH_CHOOSE_TEAM} component={ChooseTeamPage} />
            <AuthenticatedRoute path={routes.PATH_CREATE_TEAM} component={CreateTeamPage} />
            <AuthenticatedRoute path={routes.PATH_MANAGE_TEAM} component={ManageTeamPage} />
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
            <AuthenticatedRoute path={routes.PATH_ADD_TRANSACTION} component={AddTransactionPage} />
          </Switch>
        </Router>
        <ToastWrapper />
      </Responsive>
    </div>
  );
}

export default App;
