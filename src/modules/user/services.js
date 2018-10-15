import axios from "../../axios";
import settings from "../../config/settings";

export function getUserInfoService() {
  return axios
    .get(settings.API_BASE_URL + settings.API_USER_INFO)
    .then(resp => resp.data);
}
