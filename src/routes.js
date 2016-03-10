import React from "react";
import {Route, IndexRoute} from "react-router";

import Wrapper from "./components/wrapper";
import CodeCrawlPage from "./pages/code-crawl-page";
import EarthPage from "./pages/earth-page";
import SettingsPage from "./pages/settings-page";
import MatrixPage from "./pages/matrix-page";

export default (
  <Route path="/" component={Wrapper}>
    <IndexRoute component={EarthPage} />
    <Route path="crawl" component={CodeCrawlPage} />
    <Route path="earth" component={EarthPage} />
    <Route path="matrix" component={MatrixPage} />
    <Route path="settings" component={SettingsPage} />
  </Route>
);
