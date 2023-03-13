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

### 模糊/毛玻璃效果
> 一般用法：将结果模糊掉
>
> 取值：0px 以上

```css
filter: blur(1px);
```

## 视差滚动 （兼容性略差）
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)
设置当前元素滚动的速度比其他速度有一定的差别

1. 设置父元素 perspective
2. 目标元素设置 translateZ

```css
.container {
    perspective: 1px;
}
.view {
    transform: translateZ(-1px) scale(2);
}
```

## CSS 实现轮播（兼容性略差）

1. 父容器设置 [scroll-snap-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type)
2. 子列表设置 [scroll-snap-aligin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)

```css
.container {
    scroll-snap-type: x mandatory;
}
.item-view {
    scroll-snap-align: center;
}
```