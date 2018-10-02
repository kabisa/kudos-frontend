import constants from './constants';
import { createReducer, updateObject } from '../../utils/reduxHelper';

const initialState = {
  getTransactionsLoading: false,
  getTransactionsSuccess: false,
  getTransactionsError: null,
  getGoalPercentageLoading: false,
  getGoalPercentageSuccess: false,
  getGoalPercentageError: null,
  goalPercentage: 0,
  transactions: []
};

/**
 *  Get transactions
 */
const getTransactionsBegin = state => updateObject(state, { getTransactionsLoading: true });

const getTransactionsSuccess = (state, action) =>
  updateObject(state, {
    getTransactionsLoading: false,
    getTransactionsError: null,
    getTransactionsSuccess: true,
    transactions: action.payload
  });

const getTransactionsError = (state, action) =>
  updateObject(state, { getTransactionsLoading: false, getTransactionsError: action.payload });

/**
 * Get goal percentage
 */
const getGoalPercentageBegin = state => updateObject(state, { getGoalPercentageLoading: true });

const getGoalPercentageSuccess = (state, action) =>
  updateObject(state, {
    getGoalPercentageLoading: false,
    getGoalPercentageError: null,
    getGoalPercentageSuccess: true,
    goalPercentage: action.payload.percentage
  });

const getGoalPercentageError = (state, action) =>
  updateObject(state, { getGoalPercentageLoading: false, getGoalPercentageError: action.payload });

const handlers = {};
handlers[constants.GET_TRANSACTIONS_BEGIN] = getTransactionsBegin;
handlers[constants.GET_TRANSACTIONS_SUCCESS] = getTransactionsSuccess;
handlers[constants.GET_TRANSACTIONS_FAILURE] = getTransactionsError;

handlers[constants.GET_GOAL_PROGRESS_BEGIN] = getGoalPercentageBegin;
handlers[constants.GET_GOAL_PROGRESS_SUCCESS] = getGoalPercentageSuccess;
handlers[constants.GET_GOAL_PROGRESS_FAILURE] = getGoalPercentageError;

const reducer = createReducer(initialState, handlers);

export default reducer;
