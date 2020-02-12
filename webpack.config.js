const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';
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
                test: /\.module.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:7]'
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.URL': JSON.stringify(process.env.URL),
            'process.env.SITE_TITLE': JSON.stringify(siteTitle)
        }),
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CleanWebpackPlugin(),
    ]
};
