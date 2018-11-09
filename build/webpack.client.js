const path = require('path')
const webpack = require('webpack')
const HtmlPlugins = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlPlugins({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
}) 

if(isDev){
    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '127.0.0.1',
        compress: true,
        port: '8080',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
    },
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config