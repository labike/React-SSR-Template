const path = require('path')

module.exports = {
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: ['react-hot-loader/babel']
                    }
                }
            }
        ]
    }
}