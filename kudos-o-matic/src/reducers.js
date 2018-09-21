import { combineReducers } from 'redux';

import { loginReducer } from './modules/login';
import { userReducer } from './modules/user';

const appReducer = combineReducers({
  login: loginReducer,
  user: userReducer
});

export default appReducer;
