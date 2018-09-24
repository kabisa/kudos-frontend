import axios from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: config.apiUrl
});

instance.defaults.headers.common = {
  token: '123'
};

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (!window.location.hash.includes('login')) {
        /* eslint no-console: 0 */
        console.warn('Unauthorized response');

        localStorage.clear();
        window.location.hash = '';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
