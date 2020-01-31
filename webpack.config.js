const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const themeColor = '#505465';
const siteTitle = 'Whisky Tasting Pal';
const siteDescription = 'Finding tasting notes for your favourite drams.';

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: siteTitle,
            description: siteDescription,
            themeColor,
            template: './src/index.html',
        }),
        new CopyPlugin([
            { from: './static', to: './' },
        ]),
        new CleanWebpackPlugin(),
    ]
};
