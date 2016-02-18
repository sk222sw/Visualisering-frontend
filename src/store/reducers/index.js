import {combineReducers} from 'redux';
import codeCrawl from './code-crawl';
import sphere from './sphere';

export default combineReducers({
    codeCrawl,
    sphere
});