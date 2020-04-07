import client from '../client';
import settings from '../config/settings';
import { PATH_LOGIN } from '../routes';
import history from './history';
import { Storage } from './storage';

export class Auth {
  public static isLoggedIn = (): boolean => Storage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;

  public static hasTeam = (): boolean => Storage.getItem(settings.TEAM_ID_TOKEN) !== null;

  public static isTeamAdmin = (): boolean => Storage.getItem(settings.ROLE_TOKEN) === 'admin';

  public static logout = async () => {
    await client.resetStore();
    Storage.clearAll();

    history.push(PATH_LOGIN);
    window.location.reload();
  };
}
