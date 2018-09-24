import config from '../../config';
import axios from '../../axios';

export function getTransactionService() {
  return axios.post(config.apiUrl + config.urlTransactions).then(resp => resp.data);
}
