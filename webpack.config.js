const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/index.js', // this indicates the main js file that everything will be bundled into
    output: {
        filename: 'bundle.js', // this is the file name for the bundled output
        path: path.resolve(__dirname, 'dist') // this is the directory for the bundled output, in this case it's 'dist'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
    },
    devtool: 'eval-source-map',
    plugins: [
        new Dotenv(),
        new ESLintPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Project', // this line will be the title that shows up in your browser tab
            template: './src/index.html', // everything will get injected into this file
            inject: 'body',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|png|avif|jpe?g)$/,
                type: "asset/resource",
                generator: {
                    filename: "[name][ext]",
                    publicPath: "assets/images/",
                    outputPath: "assets/images/",
                },
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
        ],
    },
};