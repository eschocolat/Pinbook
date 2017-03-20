"use strict";

var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use : 'css-loader?sourceMap!sass-loader?outputStyle=expanded'}),
    exclude: ['node_modules']
});

module.exports = {
    entry: [
        './client/app.js',
        './client/index.scss'
    ],
    output: {
        publicPath: './',		
        path: path.resolve(__dirname, 'server', 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
                filename: 'style.css',
                allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './client/template.html',
            filename: '../views/index.html',
            files: {
                css: ['style.css'],
                js: ['bundle.js'],
            }
        })
    ]
};
