import React from "react";
import ReactDom from "react-dom";
import {Router, hashHistory} from "react-router";
import {Provider} from "react-redux";
import C from "./constants";
import store from "./store";
import actions from "./actions";
import routes from "./routes";

import "../sass/base.scss"; // This tells webpack from where to import the styles
import {websocket} from "./actions/websocket";

// By wrapping the whole app in the react-redux Provider we get... magic!
ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);

// Dispatches all actions received via websockets.
websocket.onmessage = event => {
  try { // Using a try-catch because JSON.parse explodes on invalid JSON.
    const action = JSON.parse(event.data);
    console.log(action);

    action.type === C.WS_CONNECTED ?
      store.dispatch(actions.getDataFromBackend()) :
      store.dispatch(action);
  } catch (e) {
    console.log(event.data);
  }
};
