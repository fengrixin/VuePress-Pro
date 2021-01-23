---
title: 小程序
---

## 优化产品使用体验
- hover-class

## 代码片段
### 更新小程序
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
### 图片转 base64
```javascript
wx.chooseImage({
    success: (res)=>{
        wx.getFileSystemManager().readFile({
           filePath: res.tempFilePaths[0],
           encoding: 'base64',
           success: (res) => {
             console.log('data:image/png;base64,' + res.data)
           }
        })
    }
})
```

## UI 框架
- [Wux weapp](https://wux-weapp.github.io/wux-weapp-docs) 组件库
- [ColorUI](https://github.com/weilanwl/ColorUI)  CSS 库
- [WeUI](https://github.com/Tencent/weui-wxss) 微信官方样式库

## 第三方组件
- [Parser](https://github.com/jin-yufeng/Parser) 富文本解析

- recycle-view 长列表
    ```
    npm i miniprogram-recycle-view -S
    ```

- slide-view 左滑删除
    ```
    npm i miniprogram-slide-view -S
    ```

- vtabs 侧边栏 tabs
    ```
    npm i @miniprogram-component-plus/vtabs -S
    npm i @miniprogram-component-plus/vtabs-content -S
    ```

- wxml-to-canvas 
    ```
    npm i wxml-to-canvas -S
    ```
  
- [image-cropper](https://github.com/wx-plugin/image-cropper) 图片裁剪
    

## 代码规范
- wxss 
    > BEM 命名法： 模块__模块元素-描述符
    ```css
    weui-cell__radio
    weui-cell__radio-selected
    ```
  
- wxml
    > 连接符 - 
    ```html
     <picker-view data-course-id="1" bindtap="handleChangePicker"></picker-view>
    ```

- js
    > 类名：大驼峰命名法，其他：小驼峰命名法

- 文件与目录
    > 连接符 -
