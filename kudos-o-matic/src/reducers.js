import { combineReducers } from 'redux';

import { loginReducer } from './modules/login';
import { userReducer } from './modules/user';
import { feedReducer } from './modules/feed';

const appReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  feed: feedReducer
});

export default appReducer;
