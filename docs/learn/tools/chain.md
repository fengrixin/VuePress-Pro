---
title: 工具链
---

## 构建打包工具

### 前端代码为何要进行构建和打包？
- 代码体积更小（Tree-Shaking、压缩、合并），加载更快
- 可以使用高级语言或语法（TS、ES6+、模块化、Scss）
- 兼容性更好，错误检查提示（Polyfill、postcss、eslint）
- 统一、高效的开发环境，统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）

## Webpack

### module chunk bundle 分别是什么意思，有何区别？
- module：各个源码文件，webpack 中一切皆模块
- chunk：多模块合并成的，如 entry import() splitChunk
- bundle：最终输出的文件

### loader 和 plugin 的区别？
- loader：模块转换器，如 less-> css
- plugin：扩展插件，如 HtmlWebpackPlugin

### webpack 如何实现懒加载？
import() 结合 Vue/React 的异步组件/路由

### webpack 常见的性能优化？

### babel-runtime 和 babel-polyfill 的区别？
- babel-polyfill 会污染全局
- babel-runtime 不会污染全局

因此在做第三方 lib 的时候要用 babel-runtime

### 为何 Proxy 不能被 Polyfill？
Polyfill 是使用 ECMA 低版本的语法实现出高版本的语法

比如：class 可以用 function 来模拟，Promise 可以用 callback 来模拟

但 Proxy 无法用 Object.defineProperty 来模拟出

## Gulp

## Rollup

## 脚手架生成器

### Yeoman

## 单元测试工具

### Mocha

### Jest

## 持续集成
