import { route } from "preact-router";
import { PATH_CHOOSE_TEAM } from "../../routes";
import settings from "../../config/settings";

export const loginSuccess = data => {
  localStorage.setItem(settings.LOCALSTORAGE_TOKEN, data.token);
  localStorage.setItem(settings.USER_ID_TOKEN, data.user.id);
  route(PATH_CHOOSE_TEAM, true);
  window.location.reload();
};
