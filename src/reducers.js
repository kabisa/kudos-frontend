import { combineReducers } from "redux";

import loginReducer from "./modules/login/reducer";
import userReducer from "./modules/user/reducer";
import feedReducer from "./modules/feed/reducer";

const appReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  feed: feedReducer,
});

export default appReducer;
