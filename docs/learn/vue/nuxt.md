---
title: Nuxt
---

## 创建项目
查看 [官网](https://nuxtjs.org/docs/2.x/get-started/installation) 或者 [nuxt 中文网](https://www.nuxtjs.cn/guide/installation) 就可以了

## 部署

### 首次部署 
> 参考文章
> - [next.js、nuxt.js等服务端渲染框架构建的项目部署到服务器，并用PM2守护程序](https://segmentfault.com/a/1190000012774650)
> - [Nuxt项目从开始到部署](https://segmentfault.com/a/1190000020452519?utm_source=tag-newest)
> - [nuxt.js部署vue应用到服务端过程](https://segmentfault.com/a/1190000014450967)

> 如果 Nginx 是运行在 docker 集群中的话，Nuxt 需要设置 hostname 为 0.0.0.0（所有地址）
>
> [如何更改应用的主机和端口配置？](https://www.nuxtjs.cn/faq/host-port)

1. 客户端 build 后，将 .nuxt  static nuxt.config.js package.json 上传至服务端指定目录下
    ```shell script
    npm install --registry=https://registry.npm.taobao.org // 也可以不使用淘宝镜像
    ```
2. 配置 Nginx
    ```shell script
    upstream nuxt-server{
       server 127.0.0.1:3000;
       keepalive 64;
    }
    server {
       listen 80;
       server_name xxx.com;  // 域名
       proxy_pass http://nuxt-server;  // 反向代理
    }
    ```                                                                                                                                                                       
    配置好后需要重新加载 Nginx
    ```shell script
    docker exec -it nginx bash // 进入docker容器
    nginx -t // 检测配置语法是否通过
    nginx -s reload // 重新加载
    ```
      
3. 使用 pm2 进程守护进行启动项目
   ```shell script
    pm2 start npm --name "nuxt-server" -- run start
    ```

4. 在浏览器中输入你的域名
> 正常情况下，应该都可以正常访问的，如果出现 502 这些异常，就需要请后端帮忙解决下了。

### 再次部署

1. 上传文件
2. 使用 pm2 重载进程
    ```shell script
    pm2 list  // 查看当前运行的服务 id
    pm2 reload id // 重载
    pm2 restart id // 或者重启
    ```
   或者重新启动
   ```shell script
    pm2 stop id // 停止 id 进程
    pm2 delete id // 删除 id 进程
    pm2 start npm --name "nuxt-server" -- run start // 启动项目
    ```

## 问题集锦

### DOMException：Failed to execute 'appendChild' on 'Node'
本地调试出现以下警告
```text
Parent: <div class="hot-view">...</div>
Mismatching childNodes vs.VNodes: ...
```
并且在部署后报错（如图所示）
![](https://pic.downk.cc/item/5fed68d83ffa7d37b30739d5.png)

解决方案：在 Parent 所提示的元素上用 client-only 包裹住即可解决s
```html
<client-only>
    <div class="hot-view">...</div>
</client-only>
```

### The client-side rendered virtual DOM tree is not matching server-rendered content.
本地调试出现以下警告（如图所示）
![](https://pic.downk.cc/item/5ff7bec63ffa7d37b3bb60fe.png)

这个错误还是挺难排查的，网上找了一圈，产生的原因有以下几个可能
- 不遵循 HTML 规范的写法
- 某个注释
- JS 代码不规范
- 我遇到的是：store 下的 actions 里使用了 || 

报错都一样，解决问题千差万别。那么如何排除问题呢？

很简单，首先，你得有个良好的代码版本管理习惯；

然后，回退版本到刚出现错误的版本，跟未出现错误的版本对比，增加了什么，逐一排查

就这么简单，且枯燥

### Error: Request failed with status code 404
![](https://img.imgdb.cn/item/601e519a3ffa7d37b365814a.png)
Nuxt 部署后，网站打开 node 服务就一直报这个错误，页面交互访问请求都毫无影响

不过这个会大量占用 CPU 资源，输出的日志不到几天就会几十个 G，非常消耗服务器资源

那么，究竟是什么原因导致的呢？通过穷举法不断排查，终于找到了（可累死我了）

原因是：在 layouts/default.vue 中的组件，如果在 created 生命周期内发起请求，就会报这个错误

解决方案：**把请求放到 mounted 中即可解决**
