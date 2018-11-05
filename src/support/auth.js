import { route } from "preact-router";

import settings from "../config/settings";
import { PATH_LOGIN } from "../routes";

export const isLoggedIn = () => {
  return localStorage.getItem(settings.LOCALSTORAGE_TOKEN) !== null;
};

export const auth = () => {
  if (!isLoggedIn) {
    route(PATH_LOGIN, true);
  }
};
