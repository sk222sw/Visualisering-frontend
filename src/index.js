import React from 'react';
import ReactDom from 'react-dom';
import {Router, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import routes from './routes';


// By wrapping the whole app in the react-redux Provider we get... magic!
ReactDom.render(
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
