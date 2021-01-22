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
