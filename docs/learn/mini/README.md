---
title: 小程序
---
## 代码片段
- 更新小程序
```javascript
const upm = wx.getUpdateManager();
    if (upm) {
      upm.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              upm.applyUpdate()
            }
          },
          fail: function (err) {
            console.warn(err);
          }
        })
      })
    }
```


## 常用 UI 框架
- [Wux weapp](https://wux-weapp.github.io/wux-weapp-docs) 组件库
- [ColorUI](https://github.com/weilanwl/ColorUI)  CSS 库

## 常用插件
- [Parser](https://github.com/jin-yufeng/Parser) 富文本解析
