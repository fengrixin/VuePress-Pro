---
title: 面试题
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

## 内存泄漏的场景（Vue）
- 被全局变量、函数引用，组件销毁时未清除
- 被全局事件、定时器引用，组件销毁时未清除
- 被自定义事件引用，组件销毁时未清除

## 网络请求中，token 和 cookie 的区别？
- cookie 是 HTTP 规范，而 token 是自定义传递
- cookie 会默认被浏览器存储，而 token 需自己存储
- token 默认没有跨域限制

### Cookie
- HTTP 无状态，每次请求都要带 cookie，以帮助识别身份
- 服务端也可以向客户端 set-cookie，cookie 大小限制 4kb
- 默认有跨域限制，不可跨域共享、传递 cookie（跨域传递需前后端设置 withCredentials）
- 可进行本地存储信息

### Cookie + Session
- 跨域限制
![](https://pic.imgdb.cn/item/6322e39e16f2c2beb1fe1204.jpg)

### JWT （JSON Web Token）
- 无跨域限制
- 前端发起登录，后端验证成功后返回一个加密的 Token
- 前端自行存储这个 token（其中包含了用户信息，已加密）
- 后续访问服务端接口都带上这个 token，作为用户身份

## 如何实现 SSO 单点登录？
- cookie 默认不可跨域共享，但有些情况下可设置为共享
- 主域名相同，如：www.baidu.com、image.baidu.com
- 设置 cookie 的 domain 为主域名（.baidu.com），即可共享 cookie