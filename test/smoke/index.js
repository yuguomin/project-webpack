/**
 * index.js
 * 冒烟测试入口文件
 */

const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms'
});

process.chdir(path.join(__dirname, '../template'));

const prodConfig = require('../../lib/webpack.prod');

rimraf('./dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      process.exit(2);
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
    }));

    console.log('Webpack build success, begin to run test');

    mocha.addFile(path.join(__dirname, 'html.test.js'));
    mocha.addFile(path.join(__dirname, 'css-js.test.js'));

    mocha.run();
  });
});
