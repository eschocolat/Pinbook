import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { AppContainer as HotReloader } from 'react-hot-loader';

import routes from './routes';

const appElement = document.getElementById('app');

const root = (
    <Router history={browserHistory}>
        {routes}
    </Router>
);

render(
    <HotReloader>{root}</HotReloader>,
    appElement
);

const renderRoot = () => {
    const routes = require('./routes').default;
    render(
        <HotReloader>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </HotReloader>, 
        appElement)
};

if (module.hot) {
    module.hot.accept('./routes', renderRoot);
}
