---
title: Vue
---


## Nuxt

### 创建项目
查看 [官网](https://nuxtjs.org/docs/2.x/get-started/installation) 或者 [nuxt 中文网](https://www.nuxtjs.cn/guide/installation) 就可以了

### 部署 
> 参考文章
> - [next.js、nuxt.js等服务端渲染框架构建的项目部署到服务器，并用PM2守护程序](https://segmentfault.com/a/1190000012774650)
> - [Nuxt项目从开始到部署](https://segmentfault.com/a/1190000020452519?utm_source=tag-newest)
> - [nuxt.js部署vue应用到服务端过程](https://segmentfault.com/a/1190000014450967)

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
    > 注意：Nginx 必须处于服务器下，而不能处于服务器内的 docker 容器中。<br/>
    > docker 容器相当于一个虚拟机，虚拟机内的 127.0.0.1 不是服务器中的 127.0.0.1，具体是什么不是很清楚，对服务端不是很了解
                                                                                                                                                                                                                                          
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
