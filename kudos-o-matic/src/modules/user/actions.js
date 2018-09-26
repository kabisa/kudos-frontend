import { toast } from 'react-toastify';

import c from './constants';
import { getUserInfoService } from './services';

export function setToken(token) {
  return { type: c.USER_SET_TOKEN, payload: token };
}

export const logout = () => {
  const logoutAction = { type: c.USER_LOGOUT };
  localStorage.clear();
  return dispatch => {
    dispatch(setToken(null));
    dispatch(logoutAction);
    window.location.reload();
  };
};

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
      toast.error('Unable to get profile data.');
      dispatch(failure(error.toString()));
    }
  };
};
