import React from "react";
import {Route, IndexRoute} from "react-router";

import Wrapper from "./components/wrapper";
import CodeCrawlPage from "./pages/code-crawl-page";
import SettingsPage from "./pages/settings-page";
import SpherePage from "./pages/sphere-page";
import MatrixPage from "./pages/matrix-page";

export default (
  <Route path="/" component={Wrapper}>
    <IndexRoute component={SpherePage} />
    <Route path="crawl" component={CodeCrawlPage} />
    <Route path="settings" component={SettingsPage} />
    <Route path="sphere" component={SpherePage} />
    <Route path="matrix" component={MatrixPage} />
  </Route>
);
