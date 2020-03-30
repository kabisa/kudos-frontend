import { History } from 'history';
import client from '../client';
import settings from '../config/settings';
import { PATH_LOGIN } from '../routes';

export const isLoggedIn = (): boolean => localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;

export const isTeamAdmin = (): boolean => localStorage.getItem(settings.ROLE_TOKEN) === 'admin';

export const logout = async (history?: History) => {
  localStorage.clear();
  await client.resetStore();

  if (history) {
    history.push(PATH_LOGIN);
  } else {
    window.location.href = '/login';
    window.location.reload();
  }
};
