import client from '../client';
import settings from '../config/settings';
import { PATH_LOGIN } from '../routes';
import history from './history';

export const isLoggedIn = (): boolean => localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;

export const hasTeam = (): boolean => localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const isTeamAdmin = (): boolean => localStorage.getItem(settings.ROLE_TOKEN) === 'admin';

export const logout = async () => {
  await client.resetStore();
  localStorage.clear();

  history.push(PATH_LOGIN);
};
