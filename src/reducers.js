import { combineReducers } from "redux";

import loginReducer from "./modules/login/reducer";

const appReducer = combineReducers({
  login: loginReducer
});

export default appReducer;
