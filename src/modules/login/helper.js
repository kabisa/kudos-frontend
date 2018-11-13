import { route } from "preact-router";
import { PATH_FEED } from "../../routes";
import settings from "../../config/settings";

export const loginSuccess = token => {
  localStorage.setItem(settings.LOCALSTORAGE_TOKEN, token);
  route(PATH_FEED, true);
};
