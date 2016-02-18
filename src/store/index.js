import {applyMiddleware, createStore} from 'redux';
import {hashHistory} from 'react-router';
import thunk from 'redux-thunk';
import {syncHistory} from 'react-router-redux';

import rootReducer from './reducers';
import initialState from './initial-state';

const reduxRouterMiddleware = syncHistory(hashHistory);

const logger = store => next => action => {
  console.log('dispatching', action.type, action);
  const result = next(action);

  console.log('next state', store.getState());
  return result;
};

export default applyMiddleware(thunk, reduxRouterMiddleware, logger)(createStore)(rootReducer, initialState);
