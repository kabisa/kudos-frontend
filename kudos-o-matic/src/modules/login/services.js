// import axios from 'axios';
import config from '../../config';

import axios from '../../axios';

export function loginService(username, password) {
  return axios.post(config.apiUrl + config.urlLogin, { username, password }).then(resp => {
    // login successful if there's a jwt token in the response
    if (resp.data.token) {
      // store resp details and jwt token in local storage to keep resp logged in between page refreshes
      localStorage.setItem(config.localStorageToken, JSON.stringify(resp.data.token));
    }

    return resp.data;
  });
}

export function resetPasswordService(email) {
  return axios.post(config.apiUrl + config.urlResetPassword, { email }).then(resp => resp.data);
}
