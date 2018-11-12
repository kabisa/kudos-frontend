import { route } from "preact-router";

import settings from "../config/settings";
import { PATH_LOGIN, PATH_CHOOSE_TEAM } from "../routes";

export const isLoggedIn = () => {
  return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

export const hasTeam = () => localStorage.getItem(settings.TEAM_ID_TOKEN);

export const auth = () => {
  if (!isLoggedIn()) {
    route(PATH_LOGIN, true);
  }
  if (!hasTeam()) {
    route(PATH_CHOOSE_TEAM, true);
  }
};
