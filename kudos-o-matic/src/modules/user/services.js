import axios from '../../axios';
import { API_BASE_URL, API_USER_INFO } from '../../config';

export function getUserInfoService() {
  return axios.get(API_BASE_URL + API_USER_INFO).then(resp => resp.data);
}
