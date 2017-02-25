const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
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
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
    }),
  ]
}
