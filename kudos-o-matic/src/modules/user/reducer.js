import constants from './constants';
import { createReducer, updateObject } from '../../utils/reduxHelper';

const initialState = {
  token: null
};

const setToken = (state, action) => updateObject(state, { token: action.payload });
const logout = state => updateObject(state, { token: null });

const handlers = {};
handlers[constants.USER_SET_TOKEN] = setToken;
handlers[constants.USER_LOGOUT] = logout;

const userReducer = createReducer(initialState, handlers);

export default userReducer;
