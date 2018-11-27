import client from "../apollo";
import { route } from "preact-router";

import settings from "../config/settings";
import { PATH_LOGIN, PATH_CHOOSE_TEAM } from "../routes";

export const isLoggedIn = () => {
  return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

export const hasTeam = () =>
  localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const auth = () => {
  if (settings.environment === "test") {
    return true;
  }

  if (!isLoggedIn()) {
    route(PATH_LOGIN, true);
    window.location.reload();
    return false;
  }
  if (!hasTeam()) {
    route(PATH_CHOOSE_TEAM, true);
    window.location.reload();
    return false;
  }
  return true;
};

export const authAllowNoTeam = () => {
  if (settings.environment === "test") {
    return true;
  }

  if (!isLoggedIn()) {
    route(PATH_LOGIN, true);
    window.location.reload();
    return false;
  }
  return true;
};

export const logout = () => {
  localStorage.clear();
  client.resetStore();

  route(PATH_LOGIN, true);
  window.location.reload();
};
