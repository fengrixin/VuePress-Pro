---
title: 遇到的问题
---

## xxx 不在以下 downloadFile 合法域名中
一般在微信后台配置好 downloadFile 合法域名即可

下面说下不一般的，对于微信头像，会出现以下情况

- https://thirdwx.qlogo.cn
> 需在微信后台的 request 和 downloadFile 中都配置上，我也不知道为啥，反正这样就可以了

- http://thirdwx.qlogo.cn
> 一部分用户的头像是 http 的，我也不知道微信小程序官方咋整的，没办法只能自己整个解决方案 <br/>
> 目前较好的解决方法是：前端/后端 把 http://thirdwx.qlogo.cn 替换为 https://wx.qlogo.cn
