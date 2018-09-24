import config from '../../config';
import axios from '../../axios';

export function getTransactionService() {
  return axios.get(config.apiUrl + config.urlTransactions).then(resp => resp.data);
}
