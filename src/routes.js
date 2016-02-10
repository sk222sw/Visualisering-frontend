import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Wrapper from './components/wrapper';
import Sphere from './components/sphere';

export default (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Sphere} />
        <Route path="sphere" component={Sphere} />
    </Route>
);