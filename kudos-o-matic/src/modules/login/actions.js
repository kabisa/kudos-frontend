import { toast } from 'react-toastify';

import c from './constants';
import { setToken } from '../user';
import { loginService, resetPasswordService } from './services';

export function login(username, password) {
  const begin = () => ({ type: c.LOGIN_BEGIN });
  const success = user => ({ type: c.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: c.LOGIN_FAILURE, payload: error });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await loginService(username, password);
      dispatch(setToken(data.token));
      dispatch(success(data));
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
      toast.success('Check your mail to reset your password!');
      dispatch(success(data));
    } catch (error) {
      toast.error('Failed to reset password!');
      dispatch(failure(error.toString()));
    }
  };
}
