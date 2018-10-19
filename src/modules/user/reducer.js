import constants from "./constants";
import { createReducer, updateObject } from "../../support/redux";

const initialState = {
  token: null,

  getUserInfoLoading: false,
  getUserInfoSuccess: false,
  getUserInfoError: null,
  data: null,
};

const setToken = (state, action) =>
  updateObject(state, { token: action.payload });
const logout = state => updateObject(state, { token: null });

const getUserInfoBegin = state =>
  updateObject(state, { getUserInfoLoading: true });
const getUserInfoSuccess = (state, action) =>
  updateObject(state, {
    getUserInfoLoading: false,
    getUserInfoError: null,
    data: action.payload,
  });
const getUserInfoFailure = (state, action) =>
  updateObject(state, {
    getUserInfoLoading: false,
    getUserInfoError: action.payload,
  });

const handlers = {};
handlers[constants.USER_SET_TOKEN] = setToken;
handlers[constants.USER_LOGOUT] = logout;

handlers[constants.USER_GET_INFO_BEGIN] = getUserInfoBegin;
handlers[constants.USER_GET_INFO_SUCCESS] = getUserInfoSuccess;
handlers[constants.USER_GET_INFO_FAILURE] = getUserInfoFailure;

const userReducer = createReducer(initialState, handlers);

export default userReducer;
