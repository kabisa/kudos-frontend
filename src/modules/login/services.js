import settings from "../../config/settings";
import axios from "../../axios";

export function loginService(username, password) {
  return axios
    .post(settings.API_BASE_URL + settings.API_LOGIN, { username, password })
    .then(resp => resp.data);
}

export function resetPasswordService(email) {
  return axios
    .post(settings.API_BASE_URL + settings.API_RESET_PASSWORD, { email })
    .then(resp => resp.data);
}
