/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');

const baseConfig = require('./base');

module.exports = merge(baseConfig, {
  entry: {
    main: [
      // 'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      resolve(__dirname, '../src/index.js'),
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    // hot: true,
    contentBase: resolve(__dirname, '../dist'),
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
});
