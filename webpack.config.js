const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const themeColor = '#505465';
const siteTitle = 'Whisky Tasting Pal';
const siteDescription = 'Finding tasting notes for your favourite drams.';

module.exports = {
    entry: './src',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|gif|jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
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
