import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import config from './config';
import { renderFile } from 'ejs';

const app = express();

/*
 |--------------------------------------------------------------------------
 | development
 |--------------------------------------------------------------------------
 */
if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
    console.log('Server is running on development mode');

    const WebpackDevServer = require('webpack-dev-server');
    const webpack = require('webpack');
 
    const devConfig = require('../webpack.config');
    let compiler = webpack(devConfig);
    let devServer = new WebpackDevServer(compiler, devConfig.devServer);
    devServer.listen(config.DEV_PORT, () => {
        console.log(`webpack-dev-server is listening on port ${config.DEV_PORT}`);
    });
}


/*
 |--------------------------------------------------------------------------
 | mongo DB
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
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', renderFile);

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
    console.info(`Server running on ${config.DOMAIN} [${config.ENV}]`);
});