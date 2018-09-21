import c from './constants';

export function setToken(token) {
  return { type: c.USER_SET_TOKEN, payload: token };
}

export const logout = () => {
  const logoutAction = { type: c.USER_LOGOUT };
  localStorage.clear();
  return dispatch => {
    dispatch(setToken(null));
    dispatch(logoutAction);
    window.location.hash = '';
  };
};
