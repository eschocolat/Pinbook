import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app';
import Main from './main/Main';
import NotFound from './404/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Main}/>
        <Route path="*" component={NotFound} status={404}/>
    </Route>
);
