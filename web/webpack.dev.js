const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './dist',
        proxy: {
            '/api': {
                target: 'http://api',
                pathRewrite: { '^/api': '' }
            }
        }
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});
