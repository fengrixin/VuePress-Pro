---
title: Node.js
---

## NPM

### 淘宝镜像

```text
npm i --registry=https://registry.npm.taobao.org
```

## 私仓登录

如果项目中引用的插件是私仓的，那么需要登录私仓后，才可以 install

```text
npm login --registry=私仓URL
```

然后输入用户名密码邮箱即可

- 查看私仓登录的用户名

```text
npm whoami --registry=私仓URL
```
