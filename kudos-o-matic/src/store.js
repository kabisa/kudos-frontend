/* eslint no-underscore-dangle: 0 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

// Freeze
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
  middleware.push(freeze);
}

// Redux devtools
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devTools = a => a;
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    devTools
  )
);

export default store;
