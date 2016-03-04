import {combineReducers} from "redux";
import {routeReducer} from "react-router-redux";

// These are the different reducers for the application
import components from "./components";
import settings from "./settings";

// Look, es2015 sexy object literals!
// {sphere: sphere} === {sphere}
// For more see: https://github.com/lukehoban/es6features#enhanced-object-literals
export default combineReducers({
  components,
  routing: routeReducer,
  settings
});
