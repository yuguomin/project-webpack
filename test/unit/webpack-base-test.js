/** 
 * webpack-base-test.js
 * 用于测试webpack.base.js的功能
 */

const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base');

  it('entry', () => {
    assert.equal(baseConfig.entry.index.indexOf('src/index/index.js') !== -1, true);
    assert.equal(baseConfig.entry.search.indexOf('src/search/index.js') !== -1, true);
  })
});