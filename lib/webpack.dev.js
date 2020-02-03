/**
 * webpack.dev.js
 * 开发阶段webpack额外配置内容
 */

const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map', // 开启sourceMap
};

module.exports = merge(baseConfig, devConfig);
