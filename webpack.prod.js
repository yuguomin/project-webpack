'use strict';

const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  entryFiles.map((filePath) => {
    const match = filePath.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = filePath;
    htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`), // 模版所在位置
        filename: `${pageName}.html`, // 指定打包出的文件名称
        chunks: ['vendors', 'commons', pageName], // html使用哪些chunk
        inject: true, // true自动注入chunk到html
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: ['babel-loader', 'eslint-loader']
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                })
              ]
            }
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 100, // 1rem的转换值为100px 750px相当于7.5rem
              remPrecesion: 8 // px转rem的小数点位数
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: `img/[name]_[hash:8].[ext]`
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
  ].concat(htmlWebpackPlugin),
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /(react|react-dom)/, // 建议仅包括您的核心框架和实用程序，并动态加载其余依赖项。
          name: 'vendors',
          chunks: 'all',
          priority: -10
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        }
      }
    }
  }
}