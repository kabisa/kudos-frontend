import config from '../../config';
import axios from '../../axios';

export function getUserInfoService() {
  return axios.get(config.apiUrl + config.urlUserInfo).then(resp => resp.data);
}
