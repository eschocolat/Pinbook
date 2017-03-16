import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../client/routes';

const reactRender = (req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        // in case of error display the error message
        if (err) {
            return res
                .status(500)
                .send(err.message);
        }

        // in case of redirect propagate the redirect to the browser
        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        // generate the React markup for the current route
        let markup;

        markup = renderToString(<RouterContext {...renderProps}/>);

        // render the index template with the embedded React markup
        return res.render('index', {markup});
    });
};

module.exports = reactRender;
