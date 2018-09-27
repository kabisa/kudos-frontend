import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import store from './store';
import config from './config';
import { PrivateRoute } from './utils';
import { LoginPage, ForgotPasswordPage } from './modules/login';
import { FeedPage } from './modules/feed';
import { SettingsPage } from './modules/settings';
import { StatisticsPage } from './modules/statistics';
import { NotificationsPage } from './modules/notifications';
import { UserPage, setToken, getUserInfo } from './modules/user';
import * as routes from './routes';

import 'react-toastify/dist/ReactToastify.min.css';

// Check for user token
const token = localStorage.getItem(config.localStorageToken);
if (token) {
  store.dispatch(setToken(token));
  store.dispatch(getUserInfo());
}

const App = () => (
  <div>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <PrivateRoute path={routes.PATH_FEED} exact component={FeedPage} />
          <PrivateRoute path={routes.PATH_SETTINGS} exact component={SettingsPage} />
          <PrivateRoute path={routes.PATH_NOTIFICATIONS} exact component={NotificationsPage} />
          <PrivateRoute path={routes.PATH_STATISTICS} exact component={StatisticsPage} />
          <PrivateRoute path={routes.PATH_USER} exact component={UserPage} />
          <Route path={routes.PATH_LOGIN} component={LoginPage} />
          <Route path={routes.PATH_FORGOT_PASSWORD} component={ForgotPasswordPage} />
        </Switch>
      </HashRouter>
    </Provider>
    <ToastContainer />
  </div>
);

export default App;
