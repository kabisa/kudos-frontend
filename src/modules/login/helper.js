import { route } from "preact-router";
import { PATH_FEED } from "../../routes";
import settings from "../../config/settings";

export const loginSuccess = data => {
  localStorage.setItem(settings.LOCALSTORAGE_TOKEN, data.token);
  localStorage.setItem(settings.USER_ID_TOKEN, data.user.id);
  route(PATH_FEED, true);
};
