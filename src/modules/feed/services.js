import settings from "../../config/settings";
import axios from "../../axios";

export function getTransactionService() {
  return axios
    .get(settings.API_BASE_URL + settings.API_TRANSACTIONS)
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
      { liked },
      { headers: { "Content-Type": "application/json", token: "123" } }
    )
    .then(resp => resp.data);
}
