import { toast } from 'react-toastify';

import c from './constants';
import { getTransactionService } from './services';

export function getTransactions() {
  const begin = () => ({ type: c.GET_TRANSACTIONS_BEGIN });
  const success = data => ({ type: c.GET_TRANSACTIONS_SUCCESS, payload: data });
  const failure = error => ({ type: c.GET_TRANSACTIONS_FAILURE, payload: error });

  return async dispatch => {
    dispatch(begin());
    try {
      const data = await getTransactionService();
      dispatch(success(data));
    } catch (error) {
      toast.error('Unable to get transactions.');
      dispatch(failure(error.toString()));
    }
  };
}
