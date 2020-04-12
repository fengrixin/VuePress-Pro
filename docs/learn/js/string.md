---
title: String
---

::: tip
[String][MDN] 和 Array 很多属性方法都差不多，毕竟它俩可以互相转换
:::

## 同 Array
- length
- includes：查询是否存在某个字符串，返回 true/false
- indexOf：查询是否存在某个字符串，返回字符串的索引，否则 -1
- lastIndexOf：从后往前查询，返回值同上
- concat
- slice

## 转换
- split：将字符串以特定字符切割成数组返回

## 原地处理字符串
无

## 处理返回新字符串
- concat：连接字符串
- repeat：重复字符串（整数次）
- replace：替换字符串（可正则替换）
- slice：剪切字符串（接受负数）
- substring：剪切字符串（负数会转换为 0）
- toLocalLowerCase：转化成小写（加上 Local 稳妥一些，一些特定地区的转化比较特殊）
- toLocalUpperCase：转化成大写
- trim：两端去空白
- trimStart：开头去空白
- trimRight：末尾去空白
- padStart：开头补白
- padEnd：末尾补白

## 还在为补 0 苦恼吗？

以往，对于日期补 0，往往需要这样子
```javascript
function formatZero(num, length) {
  return (Array(length).join('0') + num).slice(-length)
}
console.log(formatZero(3, 2)) // 03
```

ES8 之后，增加了这两个 API（对 String 补白的方式）

### padStart
```javascript
console.log('3'.padStart(2, '0')) // 03
console.log('3'.padStart(6, '#&')) // #&#&#3
```

### padEnd
```javascript
console.log('3'.padEnd(2, '0')) // 30
```

[MDN]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String
