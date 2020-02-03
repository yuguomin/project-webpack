/**
 * webpack.prod.js
 * 生产阶段webpack额外配置内容
 */

const cssnano = require('cssnano');
const merge = require('webpack-merge');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackTagsPlugin({
      scripts: [
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
          external: {
            packageName: 'react',
            variableName: 'React',
          },
        },
        {
          path: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          external: {
            packageName: 'react-dom',
            variableName: 'ReactDOM',
          },
        },
      ],
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
