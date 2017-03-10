"use strict";

const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');

var webpackConfig = {
    devtool: debug ? 'inline-sourcemap' : false,
    context: path.resolve(__dirname, 'app'),
    entry: {
        app: './client.js',
    },
    output: {
        path: path.resolve(__dirname, 'app', 'public', 'js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: path.resolve(__dirname, 'app'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: debug ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
                }
            }],
        }]
    },
    plugins: debug ? [] : [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        }),
    ]
}

module.exports = webpackConfig;