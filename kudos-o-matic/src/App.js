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
import { UserPage, setToken } from './modules/user';

import 'react-toastify/dist/ReactToastify.min.css';

// Check for user token
const token = localStorage.getItem(config.localStorageToken);
if (token) {
  console.log('got token');
  store.dispatch(setToken(token));
}

const App = () => (
  <div>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <PrivateRoute path="/" exact component={FeedPage} />
          <PrivateRoute path="/settings" exact component={SettingsPage} />
          <PrivateRoute path="/notifications" exact component={SettingsPage} />
          <PrivateRoute path="/statistics" exact component={StatisticsPage} />
          <PrivateRoute path="/user" exact component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
        </Switch>
      </HashRouter>
    </Provider>
    <ToastContainer />
  </div>
);

export default App;
