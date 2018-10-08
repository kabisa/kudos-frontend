import { API_BASE_URL, API_TRANSACTIONS, API_GOAL_PROGRESS } from '../../config';
import axios from '../../axios';

export function getTransactionService() {
  return axios.get(API_BASE_URL + API_TRANSACTIONS).then(resp => resp.data);
}

export function getGoalProgressService() {
  return axios.get(API_BASE_URL + API_GOAL_PROGRESS).then(resp => resp.data);
}

/**
 * Like service.
 * @param {Number} transactionId the id of the transaction.
 * @param {Boolean} liked the new like state.
 */
export function likeTransactionService(transactionId, liked) {
  return axios
    .patch(
      `${API_BASE_URL}${API_TRANSACTIONS}/${transactionId}/`,
      { liked },
      { headers: { 'Content-Type': 'application/json', token: '123' } }
    )
    .then(resp => resp.data);
}
