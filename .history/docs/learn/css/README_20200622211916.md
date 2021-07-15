---
title: CSS 基础

---

## 语法
CSS 的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是 at 规则；另一种是 qualified rule，也就是普通规则。

- at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束。
- 普通 CSS 规则，也就是我们所熟知的，由选择器和属性指定构成的规则。

### 普通规则
qualified rule 主要由选择器和声明区块构成。声明区块又由属性和值构成。

![普通规则](https://img.kancloud.cn/26/9c/269ce6b81e4f1d9e3f326f17dfa43c55_533x230.png)

#### 选择器：
![](https://static001.geekbang.org/resource/image/8b/7c/8bdd0a249ab1dbf8b854b2decd7eb87c.png)
![](https://static001.geekbang.org/resource/image/4f/67/4fa32e5cf47c72a58f7a8211d4e8fc67.png)

从语法结构可以看出任何选择器都是由几个符号结构连接的：空格、大于号、加号、波浪线、双竖线（这里需要注意一下，空格，即为后代选择器的优先级较低）。

然后对每一个选择器来说，如果它不是伪元素的话，由几个可选的部分组成：标签类型、id、class、属性和伪类，它们中只要出现一个，就构成了选择器

如果它是伪元素，则在这个结构之后追加伪元素。只有伪类可以出现在伪元素之后。

---
#### 声明：属性和值

> 声明部分是由「属性：值」组成的序列

1. 属性
    是中划线、下划线、字母等组成的标识符，CSS 还支持反斜杠转义。
    需要注意的是：属性不允许使用连续的两个中划线开头，这样的属性会被认为是 CSS 变量

在 CSS Variables 标准中，以双中划线开头的属性被当做变量，与之配合的则是 var 函数：
```css
:root{
    --main-color: #000;
    --accent-color: #fff;
}
.content{
    color: var(--main-color);
}
```

2. 值
    - CSS 范围的关键字：initial, unset, inherit, 任何属性都可以的关键字
    - 字符串
    - URL：使用 url() 函数的 URL 值
    - 整数/实数：比如 flex 的属性值
    - 维度：单位的整数/实数，比如 width 属性的值
    - 百分比：大部分维度都支持
    - 颜色：比如 background-color 的属性值
    - 图片：比如 background-image 的属性值
    - 2D位置：比如 background-position 的属性值
    - 函数：来自函数的值，比如 transform 的属性值

---

#### CSS 支持一批特定的计算型函数：
- **calc()**：表达式计算，支持加减乘除四则运算。在针对维度进行计算时，calc() 函数允许不同单位混合运算，这非常的有用。
    ```css
    .item-view{
        width: calc(100vw - 80rpx - 5px);
    }
    // 注意：calc 函数内运算符前后需要空格隔开，否则无效
    ```
- max()：表示取两个数中较大的一个
- min()：表示取两个数中较小的一个
- clamp()：给定一个范围，超出范围外则使用范围的最大或者最小值
- toggle()：在规则选中多于一个元素时生效，它会在几个值之间来回切换
    ```css
    ul { list-style-type: toggle(circle, square); }
    // 让一个列表项的样式圆点和方点间隔出现
    ```
- attr()：允许 CSS 接受属性值的控制
- CSS 的函数还有很多，这里就不一一写出来了

### at 规则
at-rule 由一个 @ 关键字和后续的一个区块组成，如果没有区块，则以分号结束

- **@chartset**：用于提示 CSS 文件使用的字符编码方式，如果被使用，必须出现在最前面
```css
@chartset 'utf-8';
```
- **@import**：用于引入一个 CSS 文件，除了 @chartset 规则不会被引入，@import 可以引入另一个文件的全部内容
```
@import 'common.css'
@import url('base.css');
```
- **@media**：媒体查询，能够对设备的类型，浏览器窗口大小进行判断。在 @media 的区块中，是普通规则列表
```css
@media print {
    body { font-size: 14pt; }
}
```
- **@keyframes**：用于定义动画关键帧
```css
@keyframes move {
    from { left: 0; top: 0; }
    to { left: 100px; top: 100px; }
}
```
- **@fontface**：用于定义一种字体，iconfont 技术就是利用这个特性来实现的
```css
@font-face {
    font-family: Gentium;
    src: url(http://example.com/fonts/Gentium.woff);
}
h1 {
    font-family: Gentium, serif;
}
```
- **@page**：用于页面打印的时候修改页面的 CSS 属性
```css
@page {
    margin: 20px;
}
```
- **@counter-style**：用于定义列表的表现
```css
@counter-style triangle {
    system: cyclic;
    symbols: ‣;
    suffix: ' ';
}
```
- **@support**：检查环境的特性，它与 @media 比较类似
- **@namespace**：用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全部带上特定的命名空间
- **@viewport**：用于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替
- 其他：除了以上这些，还有目前不太推荐使用的 at 规则
    - @color-profile：是 SVG1.0 引入的 CSS 特性，但是实现状况不怎么好
    - @document：还没讨论清楚，被推迟到了 CSS4 中
    - @font-feature-values


## 选择器

### 简述
选择器是由 CSS 最先引入的一个机制（但随着 document.querySelector 等 API 的加入，选择器已经不仅仅是 CSS 的一部分了）

**选择器的基本意义是：根据一些特征，选中元素的一批元素**

把选择器的结构分一下类，那么由简单到复杂可以分成：

* 简单选择器：针对某一特征判断是否选中元素
* 复合选择器：连续写在一起的简单选择器，针对元素自身特征选择单个元素
* 复杂选择器：由  空格, >, ~, +, || 等符号连接的复合选择器，根据父元素或者前序元素检查单个元素
* 选择器列表：由逗号分隔的复杂选择器，表示「或」的关系

![](https://static001.geekbang.org/resource/image/4c/ce/4c9ac78870342dc802137ea9c848c0ce.png)
*伪类选择器：一系列由 CSS 规定好的选择器，它们以冒号开头，伪类有普通型和函数型*

- 简单选择器
- 伪元素选择器（目前兼容性良好的几个）
    - ::first-line：选中元素的第一行
    - ::first-letter：选中元素的第一个字母
    - ::before：在元素内容之前插入一个虚拟的元素（须指定 content 属性才会生效）
    - ::after：在元素内容之后插入一个虚拟的元素（须指定 content 属性才会生效）

### **解析方式**
选择器的解析方式是从右往左解析的
```css
.content .item-view img {
    width: clac(100vw - 20px);
}
// 浏览器在解析时，先会找到 img 标签的元素，然后继续向上查找验证
```

### **选择器权重**
- **!important**：最高
- **标签样式**：第二高
- **id 选择器**：+100
- **class、属性、伪类**：+10
- **类型、伪元素**：+1
- **全体选择器**：+0
-  相同权重按顺序覆盖

## 盒子模型
CSS 盒模型本质上是一个盒子，封装周围的HTML元素，它包括：**边距，边框，填充，和实际内容***。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

![](https://img.kancloud.cn/93/6a/936ad25c180b4571adf8931c53cc4fc3_500x500.png)

- **标准盒子模型**：宽高 = 内容区的宽高

- **低版本 IE 盒子模型**：宽高 = 内容区 + padding + border

- box-sizing ：用来设置 width, height 的作用对象的
    - content-box：内容区（默认，标准盒子模型）
    - padding-box：内容区 + padding
    - border-box：内容区 + padding + border
    - inherit：规定应从父元素继承 box-sizing 属性的值
 
---
#### **一般情况下，都建议使用低版本 IE 盒子模型，因为这更符合我们对现实盒子的认知理解。**
```css
// 最佳实践方法（继承的方式）
html {
    box-sizing: border-box;
}
*,
*::before, 
*::after {
    box-sizing: inherit;
}
```
关于最佳实践的解释：[传送门](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)
> 假设 html 中的某个区块内需要使用不一样的盒子模型，这时候继承的方式就可以很好的切换盒子模型了

## 布局

### 常见布局
- float（浮动布局）
- position（定位布局）
    - relative：相对定位 - 相对于块级元素或行内块元素自身位置进行定位
    - absolute：绝对定位 - 相对于最近的已定位的父级元素（relative, absolute, fixed）进行定位，默认是相对于 body
    - fixed：悬浮定位 - 相对于屏幕视口进行定位（祖先元素不能设置 transform 属性为非 none，否则会以该祖先元素进行定位）[传送门](https://www.imooc.com/article/67784)
- table（表格布局）

### flex 布局
> 详细内容 - [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

![兼容性](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071003.jpg)
webkit 内核的浏览器必须加上 -webkit-
```css
.box{
    display: flex;
    display: inline-flex; // 行内元素也可以使用 flex 布局
    display: -webkit-flex; /* Safari */
}
```
> 注意：设置为 flex 布局之后，子元素的 float、clear 和 vertical-align 属性都会无效

#### 介绍
flex 布局支持横向和纵向，水平方向称为「主轴」，垂直方向称为「交叉轴」。
因而 flex 又支持反向排布，所以又有主轴的开始结束位置，交叉轴的开始结束位置，可以想象成一个 xy 坐标轴。

#### 容器上的属性
- flex-direction（排列方向）
    - row：默认值，主轴为水平方向，起点在左端
    - row-reverse：主轴为水平方向，起点在右端
    - column：主轴为垂直方向，起点在上沿
    - column-reverse：主轴为垂直方向，起点在下沿

- flex-wrap（换行方式）
    - nowarp：默认值，不换行，所有 item 挤在一行里
    - warp：换行
    - wrap-reverse：换行，且第一行在下方

- flex-flow（为前两个的复合属性）
```css
.box{
    flex-flow: row nowrap;  // 默认值
}
```

- justify-content（主轴上的对齐方式，以 row 为例）
    - flex-start：默认值，左对齐
    - flex-end：右对齐
    - center：水平居中对齐
    - space-between：两端对齐，item 之间间隔相等
    - space-around：两端对齐，item 两侧间隔相等，因此一般 item 之间间隔会大一倍

- align-items（交叉轴的对齐方式，以 column为例）
    - stretch：默认值，如果 item 未设置高度或者设为 auto，则 item 的高度占满容器的高度
    - flex-start：顶端对齐
    - flex-end：低端对齐
    - center：垂直居中对齐
    - baseline：以第一个 item 的第一行文字基线对齐

- align-content（多根轴线的对齐方式，只对轴线起作用，不针对每个 item，如果只有一根轴线，该属性不起作用）
    - stretch：默认值，轴线占满容器高度
    - flex-start：与交叉轴起点对齐
    - flex-end：与交叉轴的终点对齐
    - center：与交叉轴的中点对齐
    - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
    - space-around：两端对齐，轴线两侧间隔相等，因此一般轴线之间间隔会大一倍

#### item 上的属性
- order（设置 item 的排列顺序）
    - \<integer>：数值越小，排列越靠前，默认为 0，可为负数

- flex-grow（设置 item 的放大比例）
    - \<integer>：默认为 0，即如果存在剩余空间也不放大。如果所有 item 的 flex-grow 属性都为 1，则均分剩余空间。

- flex-shrink（设置 item 的缩小比例）
    - \<integer>：默认为 1，即如空间不足，该 item 将缩小。设置为 0 不会缩小，负数对该属性无效

- flex-basis（在分配多余空间之前，设置 item 占据的主轴空间）
    - auto，默认值，即 item 的本来大小
    - \<length>：可以设置为 width 一样的值，比如 10px、20%等，则 item 将占据固定空间

- flex（是 grow、shrink、basis 的简写，建议优先使用这个属性，因为浏览器会推算相关值）
    - 0 1 auto：默认值，后两个属性可选
    - auto：快捷键，相当于 1 1 auto
    - none：快捷键，相当于 0 0 auto

- align-self（允许 item 可以有与其他 item 不一样的对齐方式，可覆盖 align-items）
    - auto：默认值，继承容器的 align-items 属性
    - stretch：如果 item 未设置高度或者设为 auto，则 item 的高度占满容器的高度
    - flex-start：顶端对齐
    - flex-end：低端对齐
    - center：垂直居中对齐
    - baseline：以第一个 item 的第一行文字基线对齐


### 网格布局
[传送门](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)


## 非布局样式

### 字体
```css
// 字体族，从左往右寻找渲染字符
font-family: "PingFang SC", "Microsoft Yahei", serif, monospace
```
### 行高
```css
line-height:  // 设置行高，元素会相对于父元素垂直居中 [传送门](https://www.w3school.com.cn/cssref/pr_dim_line-height.asp)
vertical-align:  // 设置垂直对齐方式 [传送门](https://www.w3school.com.cn/css/pr_pos_vertical-align.asp)
```
### 背景
```css
背景颜色
渐变色背景 
多背景叠加（CSS3）
背景图片和属性（雪碧图）  // 减少http 请求
base64 和性能优化  // 针对小图标, 减少http 请求
多分辨率适配   // background-size 压缩图片
```
### 边框
```css
border
    - 属性：大小 类型 颜色
    - 边框背景图
    - 边框衔接（三角形...）
outline  // 轮廓线，在 border 外围，不会占据空间
```
### 滚动
```css
overflow: visible;  // 默认值
overflow: hidden;  // 溢出部分隐藏
overflow: scroll;  // 溢价部分可滚动查看（始终显示）
overflow: auto;  // 如果溢价，可滚动查看
```
### **换行**
```css
word-wrap( css3: overflow-wrap)  // 通过换行控制是否保留单词
word-break  // 针对多字节文字
white-space  // 空白处是否断行
// 可组合使用
```


## 效果属性
### **box-shadow**：[投影](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
    - 营造层次感（立体感）
    - 充当没有宽度的边框
    - 特殊效果（如：画一只机器猫）

### **text-shadow**：[投影-文字](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)
    - 立体感
    - 印刷品质感

### **border-radius**： [边框圆角](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)
    - 圆角矩形
    - 圆形
    - 半圆 / 扇形
    - 一些奇怪的角角

### **background**：[背景](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)
    - 纹理、图案
    - 渐变
    - 雪碧图动画
    - 背景图尺寸适应

### **clip-path**：[裁剪](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
    - 对容器进行裁剪（可配合 svg 进行裁剪）
    - 动画
    - 常见的几何图形
    - 自定义路径

### **transform**：[变换](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
    - perspective: 500px;  // 设置 z 坐标轴的高度
    - transform-style: preserve-3d;  // 3D 变换
    - translate 位移
    - scale 缩放
    - rotate 翻转
    - skew 倾斜


## 预处理器
### **scss**

> 只列出常用的几个用法，深入学习 [传送门](https://www.sass.hk/guide/)

* 嵌套规则

```css
#app{
    .nav-view{
        float: left;
        width: 200px;
    }
    p{
        font-size: 16px;
    }
    a{
        color: blue;
        &:hover{    // & 表示父级选择器
            color: red;
        }
    }
}
```

* 变量

```css
$c-theme: blue;  // 定义
p{
    background-color: $c-theme;  // 引用
}
```

* 混合器

```css
@mixin radius-large {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
}
@mixin whh($w: 100px, $h: 100px){
    width: $w;
    height: $h;
    line-height: $h;
}
// 引用
.content-view{
    @include whh(200px, 300px);
    @include radius-large;
}
```

* 继承

```css
.border-error{
    border: 1px solid red;
}
.border-success{
    @extend .border-error;
    border-color: green;
}
```

### **less**

> 只列出常用的几个用法，深入学习 [传送门](https://less.bootcss.com/)

* 嵌套规则（和 scss 差不多）
* 变量

```css
@c-theme: blue;
p{
    background-color: @c-theme;
}
```

* 混合器

```css
.radius-large {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
}
.whh(@w: 100px, @h: 100px){
    width: @w;
    height: @h;
    line-height: @h;
}
// 引用
.content-view{
    .whh(200px, 300px);
    .radius-large()；
}
```
