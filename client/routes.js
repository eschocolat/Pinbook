import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { Main, NotFound } from './containers';
import './index.scss';

export default (
    <Route path="/">
        <IndexRoute component={Main}/>
        <Route path="*" component={NotFound} status={404}/>
    </Route>
);
