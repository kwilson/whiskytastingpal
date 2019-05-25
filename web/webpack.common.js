const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const devMode = process.env.NODE_ENV !== 'production';
const icon = path.resolve('./src/icon.png');
const themeColor = '#505465';
const siteTitle = 'Whisky Tasting Pal';
const siteDescription = 'Finding tasting notes for your favourite drams.';

module.exports = {
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
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
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: siteTitle,
            description: siteDescription,
            template: './src/index.html',
        }),
        new CopyPlugin([
            { from: './static', to: './' },
        ]),
        new FaviconsWebpackPlugin(icon),
        new WebpackPwaManifest({
            dir: "ltr",
            lang: "English",
            name: siteTitle,
            scope: "/",
            display: "standalone",
            start_url: "https://whisky.partcoffee.com/",
            short_name: "WTP",
            theme_color: themeColor,
            description: siteDescription,
            orientation: "portrait",
            background_color: themeColor,
            prefer_related_applications: false,
            icons: [
              {
                src: icon,
                sizes: [24, 36, 44, 48, 96, 128, 192, 256, 384, 512] // multiple sizes
              }
            ]
        }),
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
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
