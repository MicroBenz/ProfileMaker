import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from './auth';
import createProfile from './createProfile';
import promiseMiddleware from './middlewares/promise.middleware';

const reducers = combineReducers({
  auth,
  createProfile,
});

export default createStore(reducers, applyMiddleware(promiseMiddleware));
