import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import routes from './routes';
import { port, env } from './config';

const app = express();

/*
 |------------------------------------------------------------------------------
 | view engine
 |------------------------------------------------------------------------------
 */
app.engine('handlebars', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.resolve(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

/*
 |------------------------------------------------------------------------------
 | middleware
 |------------------------------------------------------------------------------
 */
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 |------------------------------------------------------------------------------
 | middleware
 |------------------------------------------------------------------------------
 */
app.use('/', routes);

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
