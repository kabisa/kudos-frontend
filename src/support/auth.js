import client from "../apollo";
import { route } from "preact-router";

import settings from "../config/settings";
import { PATH_LOGIN, PATH_CHOOSE_TEAM } from "../routes";

/**
 * Check if the user is logged in.
 */
export const isLoggedIn = () => {
  return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

/**
 * Check if the team is set.
 */
export const hasTeam = () =>
  localStorage.getItem(settings.TEAM_ID_TOKEN) !== null;

/**
 * Pre-page load check.
 */
export const auth = () => {
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

/**
 * Log the user out.
 */
export const logout = () => {
  localStorage.clear();
  client.resetStore();

  route(PATH_LOGIN, true);
  window.location.reload();
};
