import settings from "../../config/settings";
import axios from "../../axios";

export function getTransactionsService() {
  return axios
    .get(settings.API_BASE_URL + settings.API_TRANSACTIONS)
    .then(resp => resp.data);
}

export function getTransactionService(id) {
  return axios
    .get(settings.API_BASE_URL + settings.API_TRANSACTIONS + "/" + id)
    .then(resp => resp.data);
}

export function getGoalProgressService() {
  return axios
    .get(settings.API_BASE_URL + settings.API_GOAL_PROGRESS)
    .then(resp => resp.data);
}

/**
 * Like service.
 * @param {Number} transactionId the id of the transaction.
 * @param {Boolean} liked the new like state.
 */
export function likeTransactionService(transactionId, liked) {
  return axios
    .patch(
      `${settings.API_BASE_URL}${settings.API_TRANSACTIONS}/${transactionId}/`,
      { liked }
    )
    .then(resp => resp.data);
}

/**
 * Remove transaction service
 * @param {Number} transactionId the id of the transaction to be removed.
 */
export function removeTransactionService(transactionId) {
  return axios
    .delete(
      `${settings.API_BASE_URL}${settings.API_TRANSACTIONS}/${transactionId}/`
    )
    .then(resp => resp.data);
}
