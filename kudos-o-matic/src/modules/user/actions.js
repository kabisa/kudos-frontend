import c from './constants';

export function setToken(token) {
  return { type: c.USER_SET_TOKEN, payload: token };
}

export const logout = () => {
  const logoutAction = { type: c.USER_LOGOUT };

  return dispatch => {
    window.location.hash = '';
    setToken(null);
    dispatch(logoutAction);
  };
};
