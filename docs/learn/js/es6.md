---
title: ES6+
---

## 作用域

#### let & const

::: tip
 API 用法直接去 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects) 查就好了
:::


## [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

## [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

## [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 增删改查

#### 增
- push：向数组末尾添加一个或多个元素，并返回新长度
- unshift：向数组头部添加一个或多个元素，并返回新长度

#### 删
- pop：删除数组最后一个元素，并返回删除元素
- shift：删除数组第一个元素，并返回删除元素


#### 改
- fill：给数组填充一个固定值（可以给定开始结束位置）
```javascript
// 创建一个长度为 5 初始值为 0 的数组
console.log(Array(5).fill(0)) //[0,0,0,0,0]
```

#### 查
- includes：查询数组中是否包含指定的值，有则返回 true（注意：引用类型除外）
- indexOf：查询元素在数组中首次出现的位置，没有则返回 -1
- lastIndexOf：查询元素在数组中最后一次出现的位置，没有则返回 -1
- find：遍历数组，返回第一个满足条件的值，否则返回 undefined
- findIndex：遍历数组，返回第一个满足条件的索引，否则返回 -1
- some：遍历数组，判断数组至少一项是否满足条件，返回 true / false
- every：遍历数组，判断数组全部元素是否满足条件，返回 true / false


### 遍历
> 看具体场景使用
- for in：key(也就是 index)
- for of：value
- forEach：index，value，原数组

### 转换
- join：将数组元素转换成字符串（默认以逗号分隔）


### 原地处理并返回
- splice：可对数组进行添加、替换、删除
- sort：对数组进行排序
- reverse：反转数组

### 处理并返回新数组
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

### Iterator
> 返回一个新的 Array Iterator 对象
- entries：包含键值对
- keys：只包含索引
- values：只包含值

### Array.form
> 可以将类数组转换为数组 <br/>
> [类数组](https://www.imooc.com/article/48944)：arguments、document.querySelector 的值、string
```javascript
console.log(Array.from('rixin')) // ['r','i','x','i','n']

// 创建一个长度为 5 且初始值为 0 的数组
console.log(Array.from({length:5}, ()=>0)) // [0,0,0,0,0]
```

### Array.of
> 创建数组
```javascript
console.log(Array.of(5)) // [5]
console.log(Array.of(1,2,3)) // [1,2,3]
```


## [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
> String 和 Array 很多属性方法都差不多，毕竟它俩可以互相转换

### 同 Array
- length
- includes：查询是否存在某个字符串，返回 true/false
- indexOf：查询是否存在某个字符串，返回字符串的索引，否则 -1
- lastIndexOf：从后往前查询，返回值同上
- concat
- slice

### 转换
- split：将字符串以特定字符切割成数组返回

### 原地处理字符串
无

### 处理返回新字符串
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

### 还在为补 0 苦恼吗？

以往，对于日期补 0，往往需要这样子
```javascript
function formatZero(num, length) {
  return (Array(length).join('0') + num).slice(-length)
}
console.log(formatZero(3, 2)) // 03
```

ES8 之后，增加了这两个 API（对 String 补白的方式）

- padStart
```javascript
console.log('3'.padStart(2, '0')) // 03
console.log('3'.padStart(6, '#&')) // #&#&#3
```

- padEnd
```javascript
console.log('3'.padEnd(2, '0')) // 30
```

## [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

## [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

## [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

## [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

## [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

## [Iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
