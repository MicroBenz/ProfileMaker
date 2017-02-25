const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/client/index.jsx'
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.sass'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: [/node_modules/],
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                module: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                autoprefixer: true,
                            },
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ],
                }),
            },
        ],
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: 'app.bundle.js',
        publicPath: '/',
    },
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}
