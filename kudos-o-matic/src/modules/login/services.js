import { API_BASE_URL, API_LOGIN, API_RESET_PASSWORD, LOCALSTORAGE_TOKEN } from '../../config';
import axios from '../../axios';

export function loginService(username, password) {
  return axios.post(API_BASE_URL + API_LOGIN, { username, password }).then(resp => {
    // login successful if there's a jwt token in the response
    if (resp.data.token) {
      // store resp details and jwt token in local storage to keep resp logged in between page refreshes
      localStorage.setItem(LOCALSTORAGE_TOKEN, JSON.stringify(resp.data.token));
    }

    return resp.data;
  });
}

export function resetPasswordService(email) {
  return axios.post(API_BASE_URL + API_RESET_PASSWORD, { email }).then(resp => resp.data);
}
