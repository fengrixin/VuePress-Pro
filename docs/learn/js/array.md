---
title: Array
---

::: tip
 API 用法直接去 [MDN][MDN] 查就好了
:::

## 增
- push：向数组末尾添加一个或多个元素，并返回新长度
- unshift：向数组头部添加一个或多个元素，并返回新长度

## 删
- pop：删除数组最后一个元素，并返回删除元素
- shift：删除数组第一个元素，并返回删除元素


## 改
- fill：给数组填充一个固定值（可以给定开始结束位置）
```javascript
// 创建一个长度为 5 初始值为 0 的数组
console.log(Array(5).fill(0)) //[0,0,0,0,0]
```

## 查
- includes：查询数组中是否包含指定的值，有则返回 true（注意：引用类型除外）
- indexOf：查询元素在数组中首次出现的位置，没有则返回 -1
- lastIndexOf：查询元素在数组中最后一次出现的位置，没有则返回 -1
- find：遍历数组，返回第一个满足条件的值，否则返回 undefined
- findIndex：遍历数组，返回第一个满足条件的索引，否则返回 -1
- some：遍历数组，判断数组至少一项是否满足条件，返回 true / false
- every：遍历数组，判断数组全部元素是否满足条件，返回 true / false


## 遍历
> 看具体场景使用
- for in：key(也就是 index)
- for of：value
- forEach：index，value，原数组

## 转换
- join：将数组元素转换成字符串（默认以逗号分隔）


## 处理并返回新数组
> 返回的新数组都是浅拷贝
- concat：合并两个或多个数组
- slice：切割数组
- map：遍历数组，对每一项进行处理
- filter：遍历数组，对数组进行筛选，剔除不需要的 item
- flat：深度遍历，返回给定层数的新数组
```javascript
const arr = [1,2,[3,4,[5,6]]]
console.log(arr.flat(2)) // [1,2,3,4,5,6]
```

## 原地处理并返回
- splice：可对数组进行添加、替换、删除
- sort：对数组进行排序
- reverse：反转数组

## Iterator
> 返回一个新的 Array Iterator 对象
- entries：包含键值对
- keys：只包含索引
- values：只包含值

## Array.form
> 可以将类数组转换为数组 <br/>
> [类数组](https://www.imooc.com/article/48944)：arguments、document.querySelector 的值、string
```javascript
console.log(Array.from('rixin')) // ['r','i','x','i','n']

// 创建一个长度为 5 且初始值为 0 的数组
console.log(Array.from({length:5}, ()=>0)) // [0,0,0,0,0]
```

## Array.of
> 创建数组
```javascript
console.log(Array.of(5)) // [5]
console.log(Array.of(1,2,3)) // [1,2,3]
```

[MDN]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
