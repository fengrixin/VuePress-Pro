---
title: 神奇的 CSS
---

## filter
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

### 灰度
> 一般用法：将整个页面变成灰色
>
> 取值：0-1 之间，可以为百分比

```css
filter: grayscale(100%);
```

### 模糊效果
> 一般用法：将结果模糊掉
>
> 取值：0px 以上

```css
filter: blur(1px);
```

## 面试题

### CCS 盒模型
引申话题：
   - 基本概念：标准模型 + IE 模型 [传送门](/learn/css/#盒子模型)
   - 标准模型和 IE 模型到区别 [传送门](/learn/css/#盒子模型)
   - CSS 如何设置这两种模型 [传送门](/learn/css/#盒子模型)
   - JS 如何设置获取盒模型对应的宽和高
     ```javascript
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
