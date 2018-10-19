import * as constants from "./constants";
import { createReducer, updateObject } from "../../support/redux";

const initialState = {
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  resetPasswordLoading: false,
  resetPasswordError: null,
};

/**
 *  Login
 */
const loginBegin = state => updateObject(state, { loginLoading: true });
const loginSuccess = state =>
  updateObject(state, {
    loginLoading: false,
    loginError: null,
    loginSuccess: true,
  });
const loginFailure = (state, action) =>
  updateObject(state, { loginLoading: false, loginError: action.payload });

/**
 *  Reset password
 */
const resetPasswordBegin = state =>
  updateObject(state, { resetPasswordLoading: true });
const resetPasswordSuccess = state =>
  updateObject(state, { resetPasswordLoading: false });
const resetPasswordFailure = (state, action) =>
  updateObject(state, {
    resetPasswordLoading: false,
    resetPasswordError: action.payload,
  });

const handlers = {};
handlers[constants.LOGIN_BEGIN] = loginBegin;
handlers[constants.LOGIN_SUCCESS] = loginSuccess;
handlers[constants.LOGIN_FAILURE] = loginFailure;

handlers[constants.RESET_PASSWORD_BEGIN] = resetPasswordBegin;
handlers[constants.RESET_PASSWORD_SUCCESS] = resetPasswordSuccess;
handlers[constants.RESET_PASSWORD_FAILURE] = resetPasswordFailure;

const loginReducer = createReducer(initialState, handlers);

export default loginReducer;
