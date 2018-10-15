import * as c from "./constants";
import { setToken, getUserInfo } from "../user/actions";
import { loginService, resetPasswordService } from "./services";
import { PATH_FEED } from "../../routes";

export function login(username, password) {
  const begin = () => ({ type: c.LOGIN_BEGIN });
  const success = user => ({ type: c.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: c.LOGIN_FAILURE, payload: error });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await loginService(username, password);

      // login successful if there's a jwt token in the response
      if (data.token) {
        dispatch(setToken(data.token));
        dispatch(success(data));
        dispatch(getUserInfo());
        window.location = `/#${PATH_FEED}`;
      }
    } catch (error) {
      dispatch(failure(error.toString()));
    }
  };
}

export function forgotPassword(email) {
  const begin = () => ({ type: c.RESET_PASSWORD_BEGIN });
  const success = user => ({ type: c.RESET_PASSWORD_SUCCESS, payload: user });
  const failure = error => ({ type: c.RESET_PASSWORD_FAILURE, payload: error });

  return async dispatch => {
    dispatch(begin());

    try {
      const data = await resetPasswordService(email);
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error.toString()));
    }
  };
}
