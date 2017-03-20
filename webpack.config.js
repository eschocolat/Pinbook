"use strict";

var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./server/config');

loaders.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
    exclude: ['node_modules']
});

module.exports = {
    entry: [
        `webpack-dev-server/client?${config.DEV_DOMAIN}`,
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './client/app.js'
    ],
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'server', 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'server', 'public'),
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        proxy: {
            '**': [{target: config.DOMAIN}]
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
                filename: 'style.css',
                allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './client/template.html',
            files: {
                css: ['style.css'],
                js: [ "bundle.js"],
            }
        }),
    ]
};
