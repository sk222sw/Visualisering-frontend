import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';

import codeCrawl from './code-crawl';
import settings from './settings';
import sphere from './sphere';

export default combineReducers({
  routing: routeReducer,
  codeCrawl,
  settings,
  sphere
});