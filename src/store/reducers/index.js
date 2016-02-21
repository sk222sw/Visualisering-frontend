import {combineReducers} from "redux";
import {routeReducer} from "react-router-redux";

// These are the different reducers for the application
import codeCrawl from "./code-crawl";
import earth from "./earth";
import settings from "./settings";
import sphere from "./sphere";
import matrix from "./matrix";

// Look, es2015 sexy object literals!
// {sphere: sphere} === {sphere}
// For more see: https://github.com/lukehoban/es6features#enhanced-object-literals
export default combineReducers({
  routing: routeReducer,
  codeCrawl,
  earth,
  settings,
  matrix,
  sphere
});
