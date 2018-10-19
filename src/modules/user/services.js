import axios from "../../axios";
import settings from "../../config/settings";

export function getUserInfoService() {
  return axios
    .get(settings.API_BASE_URL + settings.API_USER_INFO)
    .then(resp => resp.data);
}

export function resetPassword(oldPassword, newPassword) {
  return axios
    .post(settings.API_BASE_URL + settings.API_USER_RESET_PASSWORD, {
      old_password: oldPassword,
      new_password: newPassword,
    })
    .then(resp => resp.data);
}
