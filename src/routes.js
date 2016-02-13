import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Wrapper from './components/wrapper';
import SpherePage from './pages/sphere-page';

export default (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={SpherePage} />
        <Route path="sphere" component={SpherePage} />
    </Route>
);