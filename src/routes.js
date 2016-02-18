import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Wrapper from './components/wrapper';
import SpherePage from './pages/sphere-page';
import MatrixPage from './pages/matrix-page';

export default (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={MatrixPage} />
        <Route path="sphere" component={SpherePage} />
        <Route path="matrix" component={MatrixPage} />
    </Route>
);