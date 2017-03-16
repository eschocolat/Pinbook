import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import routes from './routes';
import config from './config';

const app = express();

/*
 |--------------------------------------------------------------------------
 | config
 |--------------------------------------------------------------------------
 */
mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

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
const crossDomain = (options) => {
    return (req, res, next) => {
        // prevent iframe embedding
        res.header('X-Frame-Options', 'SAMEORIGIN');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
        next();
    };
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(crossDomain());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/', routes);

/*
 |------------------------------------------------------------------------------
 | server start
 |------------------------------------------------------------------------------
 */
app.listen(config.PORT, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${config.PORT} [${config.ENV}]`);
});
