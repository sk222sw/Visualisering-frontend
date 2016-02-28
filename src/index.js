import React from "react";
import ReactDom from "react-dom";
import {Router, hashHistory} from "react-router";
import {Provider} from "react-redux";
import store from "./store";
import routes from "./routes";

import "../sass/base.scss"; // This tells webpack from where to import the styles

// By wrapping the whole app in the react-redux Provider we get... magic!
ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
