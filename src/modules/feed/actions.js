import c from "./constants";
import {
  getTransactionsService,
  getTransactionService,
  getGoalProgressService,
  likeTransactionService
} from "./services";

/**
 * Gets all current transactions.
 */
export function getTransactions() {
  const begin = () => ({ type: c.GET_TRANSACTIONS_BEGIN });
  const success = data => ({ type: c.GET_TRANSACTIONS_SUCCESS, payload: data });
  const failure = error => ({
    type: c.GET_TRANSACTIONS_FAILURE,
    payload: error
  });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await getTransactionsService();
      dispatch(success(data));
    } catch (error) {
      console.error(error);
      dispatch(failure(error.toString()));
    }
  };
}

/**
 * Get a single transactions.
 */
export function getTransaction(id) {
  const begin = () => ({ type: c.GET_TRANSACTION_BEGIN });
  const success = data => ({ type: c.GET_TRANSACTION_SUCCESS, payload: data });
  const failure = error => ({
    type: c.GET_TRANSACTION_FAILURE,
    payload: error
  });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await getTransactionService(id);
      dispatch(success(data));
    } catch (error) {
      console.error(error);
      dispatch(failure(error.toString()));
    }
  };
}

/**
 * Gets the goal progress for the current goal.
 */
export function getGoalProgress() {
  const begin = () => ({ type: c.GET_GOAL_PROGRESS_BEGIN });
  const success = data => ({
    type: c.GET_GOAL_PROGRESS_SUCCESS,
    payload: data
  });
  const failure = error => ({
    type: c.GET_GOAL_PROGRESS_FAILURE,
    payload: error
  });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await getGoalProgressService();
      dispatch(success(data));
    } catch (error) {
      console.error(error);
      dispatch(failure(error.toString()));
    }
  };
}

/**
 * Change the 'liked' state of a single transaction.
 * @param {Number} transactionId The id of the transaction.
 * @param {Boolean} liked is the transaction being liked or not.
 */
export function likeTransaction(transactionId, liked) {
  const begin = () => ({
    type: c.LIKE_TRANSACTION_BEGIN,
    payload: { transactionId }
  });
  const success = () => ({ type: c.LIKE_TRANSACTION_SUCCESS });
  const failure = error => ({
    type: c.LIKE_TRANSACTION_FAILURE,
    payload: { error, transactionId }
  });

  return async dispatch => {
    dispatch(begin());
    try {
      await likeTransactionService(transactionId, liked);
      dispatch(success());
    } catch (error) {
      console.error(error);
      dispatch(failure(error.toString()));
    }
  };
}
