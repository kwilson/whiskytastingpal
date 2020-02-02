const merge = require('webpack-merge');
const base = require('./webpack.config.js');

module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8080,
        contentBase: './dist',
        proxy: {
            "/.netlify": {
                target: "http://localhost:9000",
                pathRewrite: { "^/.netlify/functions": "" }
            }
        },
        historyApiFallback: true
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});
