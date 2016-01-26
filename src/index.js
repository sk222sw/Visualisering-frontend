import React from 'react';
import ReactDom from 'react-dom';

import HelloWorld from './components/hello-world';

ReactDom.render(
    <HelloWorld name="krabba" />,
    document.getElementById('root')
);