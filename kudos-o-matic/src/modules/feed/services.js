import { API_BASE_URL, API_TRANSACTIONS } from '../../config';
import axios from '../../axios';

export function getTransactionService() {
  return axios.get(API_BASE_URL + API_TRANSACTIONS).then(resp => resp.data);
}
