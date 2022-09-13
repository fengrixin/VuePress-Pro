---
title: 基础
---

## Ajax Fetch Axios 的区别？
三者都用于网络请求，但是不同维度
- Ajax（Asynchronous JavaScript and XML），一种技术统称
- Fetch，一个具体的 API（和 XMLHttpRequest 同一级别，Fetch 语法更简洁易用且支持 Promise）
- Axios，第三方库

## 箭头函数的缺点，哪里不能用箭头函数？
缺点：
- 没有 arguments
- 无法通过 apply call bind 改变 this
不能使用：
- 对象方法
- 原型方法
- 构造函数
- 动态上下文中的回调函数
- Vue 中的生命周期函数、method
  
要熟练应用箭头函数，也要对函数 this arguments 敏感

## HTTP 跨域时为何要发送 options 请求？
- options 请求是跨域请求之前的预检查
- 浏览器自行发起，无需我们干预
- 不影响实际的功能