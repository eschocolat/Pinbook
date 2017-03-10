import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

import routes from './client/routes';

render((
    <Router history={browserHistory}>
        {routes}
    </Router>
), document.querySelectorAll('[data-ui-role="content"]')[0]);
