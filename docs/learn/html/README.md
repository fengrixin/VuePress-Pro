---
title: HTML5
---

## 语义化

### defer 和 async 的区别
- defer：渲染完再执行

要等到整个页面在内存中正常渲染结束（DOM 结构完全生成以及其他脚本执行完成）才会执行，多个 defer 脚本会按照它们在页面出现的顺序进行加载。

- async：下载完就执行

一旦下载完，渲染引擎就会中断渲染，执行完这个脚本后，再继续完成之前的渲染，多个 async 脚本是不能保证加载顺序的。


## 面试题
 
### 假设高度已知，请写出三栏布局，其中左栏、右栏宽度各为 300px，中间自适应
- [flex](/learn/css/#flex-布局)
- [grid](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
- float
- position: absolute
- display: table


### CCS 盒模型
- 基本概念：标准模型 + IE 模型 [传送门](/learn/css/#盒子模型)
- 标准模型和 IE 模型到区别 [传送门](/learn/css/#盒子模型)
- CSS 如何设置这两种模型 [传送门](/learn/css/#盒子模型)
- JS 如何设置获取盒模型对应的宽和高
     ```
     1. element.style.width/height
        只能获取内联样式设置的宽高，获取不了style节点或者link引入的外部样式设置的宽高
     
     2. element.currentStyle.width/height
        能拿到渲染后设置的宽高，但只有 IE 支持
     
     3. window.getComputedStyle(element).width/height
        能拿到渲染后设置的宽高，返回字符串：'300px'
     
     4. element.getBoundingClientRect().width/height
        现在基本用这个，返回元素大小和其相对视窗的位置，返回整数：300
     ```
- 实例题（根据盒模型解释边距重叠）
- BFC（边距重叠解决方案）


### DOM 事件
- 基本概念：DOM 事件的级别
    - DOM0 element.onclick = function(){}
    - DOM2 element.addEventListener('click', function(){}, false)
    - DOM3 element.addEventListener('keyup', function(){}, false)
- DOM 事件模型
    - 事件捕获
    - 事件冒泡
- DOM 事件流
    - 事件通过捕获到达目标元素，然后在目标元素再冒泡到 window 对象
- 描述 DOM 事件捕获的具体流程
    - window -> document -> html(document.documentElement) -> body -> ... -> Element -> ... -> body -> html -> document -> window
- Event 对象的常见应用
    - event.preventDefault() 阻止默认行为
    - event.stopPropagation() 阻止冒泡
    - event.stopImmediatePropagation() 阻止下一个事件发生（当一个元素上有多个事件时）
    - event.currentTarget 返回绑定事件的元素
    - event.target 返回触发事件的元素
- 自定义事件
    - [Event 与 CustomEvent](https://segmentfault.com/a/1190000018699594)
    ```javascript
    let ev = new Event('customEvent')
    let ev2 = new CustomEvent('customEvent2', {name: 'rixin'}) // 可传参
    let html = document.documentElement
    html.addEventListener('customEvent', function() {
      console.log('custom event')
    })
    html.dispatchEvent(ev) // 触发事件
    ```


### HTTP
- HTTP 协议的主要特点
    - 简单快速
    - 灵活
    - 无连接：连接完就会断掉
    - 无状态：但就 HTTP 来说，客户端服务端是无法区分身份的
- HTTP 报文的组成部分
    - 请求报文（请求行(请求类型、地址、协议版本)、请求头（key-value）、空行、请求体）
    - 响应报文（状态行(协议版本、状态码)、响应头（key-value）、空行、响应体）
- HTTP 方法
    - GET 获取资源
    - POST 传输资源
    - PUT 更新资源
    - DELETE 删除资源
    - HEAD 获得报文首部
- POST 和 GET 的区别
    - GET 在浏览器回退时是无害的，而 POST 会再次提交请求
    - GET 产生的 URL 地址 可以被收藏，而 POST 不可以
    - GET 请求会被浏览器主动缓存，而 POST 不会，除非手动设置
    - GET 请求只能进行 url 编码，而 POST 支持多种编码方式
    - GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留
    - GET 请求在 url 中传送的参数是有长度限制的，而 POST 没有限制
    - 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制
    - GET 比 POST 更不安全，因为参数直接暴露在 url 上，所以不能用来传递敏感信息
    - GET 参数通过 url 传递，POST 可以放在 Request body 中
- HTTP 状态码
    - 1xx：指示信息 - 表示请求已接收，继续处理
    - 2xx：成功 - 表示请求已被成功接收
    - 3xx：重定向 - 要完成请求必须进行更进一步的操作
    - 4xx：客户端错误 - 请求有语法错误或请求无法实现
    - 5xx：服务器错误 - 服务器未能实现合法的请求
- 什么是持久连接

    HTTP/1.1 后才支持持久链接
    
    HTTP 协议采用「请求-应答」模式，当使用普通模式，即非 Keep-Alive 模式时，每个请求/应答客户端和服务器都要新建一个连接，完成之后立即断开连接（HTTP 协议为无连接的协议）
    
    当使用 Keep-Alive 模式（又称持久连接、连接重用）时，Keep-Alive 功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive 功能避免了建立或者重新建立连接
    
- 什么是管线化

  在使用持久连接的情况下，某个连接上消息的传递类似于：
    
  请求1 -> 响应1 -> 请求2 -> 响应2 -> 请求3 -> 响应3
  
  管线化后，某个连接上的消息变成了类似这样：
  
  请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3
  
  - 管线化机制通过持久连接完成，仅 HTTP/1.1 支持此技术
  - 只有 GET 和 HEAD 请求可以进行管线化，而 POST 则有所限制
  - 初次创建连接时不应启动管线机制，因为服务器不一定支持 HTTP/1.1 版本的协议
  - 管线化不会影响响应到来的顺序，如上面的例子所示，响应返回的顺序并未改变
  - HTTP/1.1 要求服务器支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可
  - 由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器如 Chrome 和 FireFox 默认并未开启管线化支持


### 原型链
- 创建对象有几种方法
    ```javascript
    // 1. 字面量
    let o1 = {name: 'o1'}
    let o11 = new Object({name: 'o11'})
    // 2. 通过构造函数
    let O = function(name){this.name=name}
    let o2 = new O('o2')
    // 3. Object.create
    let obj = {name: 'o3'}
    let o3 = Object.create(obj)
    ```
- 原型、构造函数、实例、原型链 [传送门](/learn/js/point.html#原型-原型链)
    ![](https://img.imgdb.cn/item/603209c05f4313ce25033c0e.png)
    ```javascript
    let O = function(name){this.name=name}
    let o2 = new O('o2')
    // 构造函数-> O，实例->o2
    O.prototype.constructor === O // true
    O.prototype === o2.__proto__ // true
    O.__proto__ === Function.prototype // true
    ```
- instanceof 的原理 [传送门](/learn/js/point.html#instanceof)
    - 对象的 __proto__ 与 函数的 prototype 在同一条原型链上
- new 运算符


### 通信
- 什么是同源策略及限制
    同源策略限制一个源加载对文档或脚本如何与来自另一个源对资源进行交互。这是一个用于隔离潜在恶意文件对关键对安全机制
    
    同源指的是：协议、域名、端口相同
    - Cookie、LocalStorage 和 IndexDB 无法读取
    - DOM 无法获取
    - AJAX 请求不能发送
    
- 前后端如何通信
    - AJAX 只支持同源
    - WebSocket
    - CORS
- 如何创建 Ajax
    - XMLHttpRequest 对象的工作流程
        ```javascript
        let xhr = new XMLHttpRequest()
        xhr.open('GET', '/')
        xhr.send()
        xhr.onload = function(){}
        ```
    - 兼容性处理
    - 事件的触发条件
    - 事件的触发顺序
- 跨域通信的几种方式
    - JSONP
    - Hash
    - postMessage
    - WebSocket
    - CORS


### 安全
- CSRF「跨站请求伪造」
    ![](https://img.imgdb.cn/item/60325c725f4313ce2528bd39.png)
    条件：网站接口存在漏洞、用户登录过该网站
    
    防御措施：
    - Token 验证
    - Referer 验证
    - 隐藏令牌
    
- XSS「跨域脚本攻击」
    在提交内容里注入 JavaScript 脚本进行攻击
    
    防御措施：
    - 对提交内容进行过滤，对特定字符进行转义
