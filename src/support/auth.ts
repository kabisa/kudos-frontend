import client from '../client';
import settings from '../config/settings';
import { PATH_LOGIN } from '../routes';
import history from './history';
import { Storage } from './storage';

export const isLoggedIn = (): boolean => Storage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;

export const hasTeam = (): boolean => Storage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const isTeamAdmin = (): boolean => Storage.getItem(settings.ROLE_TOKEN) === 'admin';

export const logout = async () => {
  await client.resetStore();
  Storage.clearAll();

  history.push(PATH_LOGIN);
};
