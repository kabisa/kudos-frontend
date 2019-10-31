import client from "../apollo";
import { route } from "preact-router";

import settings from "../config/settings";
import { PATH_LOGIN, PATH_CHOOSE_TEAM, PATH_FEED } from "../routes";
import { tokenIsUsable } from "./tokenIsUsable";

export const isLoggedIn = () => {
  return tokenIsUsable(
    localStorage.getItem(settings.LOCALSTORAGE_TOKEN),
    new Date()
  );
};

export const hasTeam = () =>
  localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

export const auth = (teamAdmin = false) => {
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
  if (teamAdmin) {
    if (!isTeamAdmin()) {
      route(PATH_FEED, true);
      window.location.reload();
      return false;
    }
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

export const isTeamAdmin = () => {
  return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const authIsTeamAdmin = () => {
  return localStorage.getItem(settings.ROLE_TOKEN) === "admin";
};

export const logout = () => {
  localStorage.clear();
  client.resetStore();

  route(PATH_LOGIN, true);
  window.location.reload();
};
