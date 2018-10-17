import constants from "./constants";
import {
  createReducer,
  updateObject,
  updateItemInArray
} from "../../support/redux";

const initialState = {
  getTransactionsLoading: false,
  getTransactionsSuccess: false,
  getTransactionsError: null,

  getTransactionLoading: false,
  getTransactionSuccess: false,
  getTransactionError: null,

  getGoalPercentageLoading: false,
  getGoalPercentageSuccess: false,
  getGoalPercentageError: null,

  likeTransactionLoading: false,
  likeTransactionError: null,

  goalPercentage: 0,
  transactions: []
};

/**
 *  Get transactions
 */
const getTransactionsBegin = state =>
  updateObject(state, { getTransactionsLoading: true });

const getTransactionsSuccess = (state, action) =>
  updateObject(state, {
    getTransactionsLoading: false,
    getTransactionsError: null,
    getTransactionsSuccess: true,
    transactions: action.payload
  });

const getTransactionsError = (state, action) =>
  updateObject(state, {
    getTransactionsLoading: false,
    getTransactionsError: action.payload
  });

/**
 *  Get transaction
 */
const getTransactionBegin = state =>
  updateObject(state, { getTransactionLoading: true });

const getTransactionSuccess = (state, action) => {
  if (!state.transactions.find(item => item.id === action.payload.id)) {
    return updateObject(state, {
      getTransactionLoading: false,
      getTransactionError: null,
      getTransactionSuccess: true,
      transactions: [...state.transactions, action.payload]
    });
  }
};

const getTransactionError = (state, action) =>
  updateObject(state, {
    getTransactionLoading: false,
    getTransactionError: action.payload
  });

/**
 * Get goal percentage
 */
const getGoalPercentageBegin = state =>
  updateObject(state, { getGoalPercentageLoading: true });

const getGoalPercentageSuccess = (state, action) =>
  updateObject(state, {
    getGoalPercentageLoading: false,
    getGoalPercentageError: null,
    getGoalPercentageSuccess: true,
    goalPercentage: action.payload.percentage
  });

const getGoalPercentageError = (state, action) =>
  updateObject(state, {
    getGoalPercentageLoading: false,
    getGoalPercentageError: action.payload
  });

/**
 * Like transaction
 */
const likeTransactionBegin = (state, action) =>
  updateObject(state, {
    likeTransactionLoading: true,
    transactions: updateItemInArray(
      state.transactions,
      action.payload.transactionId,
      item =>
        updateObject(item, {
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1
        })
    )
  });

const likeTransactionSuccess = state =>
  updateObject(state, {
    likeTransactionLoading: false
  });

const likeTransactionError = (state, action) =>
  updateObject(state, {
    likeTransactionLoading: false,
    likeTransactionError: action.payload.error,
    transactions: updateItemInArray(
      state.transactions,
      action.payload.transactionId,
      item =>
        updateObject(item, {
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1
        })
    )
  });

const handlers = {};
handlers[constants.GET_TRANSACTIONS_BEGIN] = getTransactionsBegin;
handlers[constants.GET_TRANSACTIONS_SUCCESS] = getTransactionsSuccess;
handlers[constants.GET_TRANSACTIONS_FAILURE] = getTransactionsError;

handlers[constants.GET_TRANSACTION_BEGIN] = getTransactionBegin;
handlers[constants.GET_TRANSACTION_SUCCESS] = getTransactionSuccess;
handlers[constants.GET_TRANSACTION_FAILURE] = getTransactionError;

handlers[constants.GET_GOAL_PROGRESS_BEGIN] = getGoalPercentageBegin;
handlers[constants.GET_GOAL_PROGRESS_SUCCESS] = getGoalPercentageSuccess;
handlers[constants.GET_GOAL_PROGRESS_FAILURE] = getGoalPercentageError;

handlers[constants.LIKE_TRANSACTION_BEGIN] = likeTransactionBegin;
handlers[constants.LIKE_TRANSACTION_SUCCESS] = likeTransactionSuccess;
handlers[constants.LIKE_TRANSACTION_FAILURE] = likeTransactionError;

const reducer = createReducer(initialState, handlers);

export default reducer;