import constants from './constants';
import { createReducer, updateObject } from '../../utils/reduxHelper';

const initialState = {
  getTransactionsLoading: false,
  getTransactionsSuccess: false,
  getTransactionsError: null,
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

const handlers = {};
handlers[constants.GET_TRANSACTIONS_BEGIN] = getTransactionsBegin;
handlers[constants.GET_TRANSACTIONS_SUCCESS] = getTransactionsSuccess;
handlers[constants.GET_TRANSACTIONS_FAILURE] = getTransactionsError;

const reducer = createReducer(initialState, handlers);

export default reducer;
