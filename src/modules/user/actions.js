import c from "./constants";
import { getUserInfoService } from "./services";
import settings from "../../config/settings";

/**
 * Save the token in the state and localstorage.
 * @param {string} token The token to use for further authentication.
 */
export const setToken = token => {
  const setTokenAction = () => ({ type: c.USER_SET_TOKEN, payload: token });

  // Save the token in localstorage.
  if (token) {
    localStorage.setItem(settings.LOCALSTORAGE_TOKEN, JSON.stringify(token));
  }

  return dispatch => {
    dispatch(setTokenAction(token));
  };
};

/**
 * Log out. This clears the token in the redux store and removes the localstorage token.
 */
export const logout = () => {
  const logoutAction = { type: c.USER_LOGOUT };

  // Clear the localstorage.
  localStorage.clear();

  return dispatch => {
    dispatch(setToken(null));
    dispatch(logoutAction);
    window.location.reload();
  };
};

/**
 * Gets the user info from the backend.
 */
export const getUserInfo = () => {
  const begin = () => ({ type: c.USER_GET_INFO_BEGIN });
  const success = data => ({ type: c.USER_GET_INFO_SUCCESS, payload: data });
  const failure = error => ({ type: c.USER_GET_INFO_FAILURE, payload: error });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await getUserInfoService();
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error.toString()));
    }
  };
};
