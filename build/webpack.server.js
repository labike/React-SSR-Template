const path = require('path')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server.js')
    },
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    }
}) 