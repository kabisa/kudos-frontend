import { API_BASE_URL, API_TRANSACTIONS, API_GOAL_PROGRESS } from '../../config';
import axios from '../../axios';

export function getTransactionService() {
  return axios.get(API_BASE_URL + API_TRANSACTIONS).then(resp => resp.data);
}

export function getGoalProgressService() {
  return axios.get(API_BASE_URL + API_GOAL_PROGRESS).then(resp => resp.data);
}
