# project-webpack
用于不同环境下开发小型项目的webpack配置文件集合demo [![Build Status](https://travis-ci.org/yuguomin/project-webpack.svg?branch=master)](https://travis-ci.org/yuguomin/project-webpack)

# 相关功能
1. 构建源代码
- lib 构建工具源代码文件夹
  - webapck.base.js 基础webpack功能配置文件
  - webapck.dev.js 开发环境webpack功能配置文件
  - webapck.prod.js 生产环境webpack功能配置文件
  - webapck.ssr.js ssr环境webpack功能配置文件

2. eslint规范代码构建
执行命令

```bash
npm run build
```

运行对构建工具代码的eslint校验和基本错误修复。添加eslint规范和统一团队开发风格。

3. 添加冒烟测试和单元测试
- test 冒烟及单元测试文件夹
  - smoke 冒烟测试用例
  - unit 单元测试用例
  - template 测试的项目模版

冒烟测试是对项目进行细化测试前的自我检测，保证构建工具的功能性没有问题，输入输出符合预期文件夹。

单元测试是对项目进行具体代码的测试，详细的单元测试可以快速定位错误，提高代码质量。

技术选型：[mocha](https://github.com/mochajs/mocha)

4. 添加持续集成
利用持续集成减少一些重复的操作，并且减少项目发布风险，每一次代码提交都会触发测试用例，只有通过测试用例，代码才被允许加入到代码主干。

技术选型：[Travis CI](https://travis-ci.org/)