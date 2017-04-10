import { createStore, combineReducers, applyMiddleware } from 'redux';

import auth from './auth';
import promiseMiddleware from './middlewares/promise.middleware';

const reducers = combineReducers({
  auth,
});

export default createStore(reducers, applyMiddleware(promiseMiddleware));
