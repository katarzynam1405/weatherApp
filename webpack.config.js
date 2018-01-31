const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extraxtCommons = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.js'
})

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    devServer: {
        hot: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', { modules: false }]
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { limit: 10000 }
                }]
            }
        ],
        loaders: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            loader: 'eslint',
            exclude: /node_modules/
        }]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        __filename: true,
        __dirname: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        extraxtCommons
    ]
};

module.exports = config;