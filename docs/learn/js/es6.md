---
title: ES6+
---

## 变量

### let & const
> ES6 新增的变量声明，没有 var 的变量提升效果

### 类型
| | | | | | | | |
| --- |:---:|:---:|:---:|:---:|:---:|:---:| ---:| 
| 值类型 | String | Number | Boolean | Undefined | Null | Symbol | BigInt |
| 引用类型 | Array | Object | Function | Map | Set | | | |

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
- filter：遍历数组，对数组进行筛选，剔除不符合条件的 item
```javascript
const arr = [1, 2, 3, 4]
console.log(arr.filter(item=>item!==2)) // [1, 3, 4]
```
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

## [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

### Object.defineProperty
给对象新增/修改一个属性，并指定属性的配置
```js
let obj = {}
Object.defineProperty(obj, 'key', {
    configurable: false, // true-可更改该属性名或删除该defineProperty 时属性通过 ，默新增认 false
    enumerable: false, // true-可枚举该属性，通过 defineProperty 新增时默认 false
    writable: false, // true-可修改该属性值，通过 defineProperty 新增时默认 false
    value: 'value',
    get() {},
    set(v) {}
})
// {key: 'value'}
```
> Object.defineProperties 增强版，可新增/修改多个属性

### Object.getOwnPropertyDescriptor
获取属性的 props(配置)
```js
let obj = {key: 'value'}
Object.getOwnPropertyDescriptor(obj, 'key')
// {configurable: false, enumerable: false,writable: false,value: 'value',get() {},set(v) {}} 
```

> getOwnPropertyDescriptors 增强版，获取对象所有属性的 props

### Object.assign
追加/合并属性，经常用于浅拷贝。
> 将一个或多个对象与目标对象合并，目标对象已经存在的，即覆盖，不存在的，即追加 <br/>
> 操作后会原地改变目标对象，并返回目标对象
```javascript
let target = {a: 1, b: 2}
Object.assign(target, {b: 3, c:4}) // {a: 1, b: 3, c: 4}
console.log(target) // {a: 1, b: 3, c: 4}
```
通过该方法浅拷贝，只能拷贝源对象的可枚举属性，且属性的 prop 配置将会重置为普通数据属性，也无法拷贝源对象的原型
> 可使用以下方法实现拷贝不可枚举属性、props、原型
```js
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
```

## [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
### 参数
- 默认参数
```javascript
function fn(x, y=2, z) {
  console.log(x, y, z)
}
fn() // undefined 2 undefined
```
- 可变参数
> 可变参数后不可再有其他参数
```javascript
function fn(x, ...params) {
  console.log(x, params)
}
fn(1, 2, 3, 4) // 1 [2, 3, 4]
```
- 传参-拆开数组
```javascript
function fn(x=1, y=2, z=3) {
  console.log(x+y+z)
}
fn(...[4]) // 9
fn(...[4, 5]) // 12
fn(...[4, 5, 6]) // 15
```

### 箭头函数
> 在箭头函数中，this 指向属于外层作用域
```javascript
window.x = 2
const fn = (x) => {
    return this.x + 1
}
fn(1) // 3
```
#### 注意事项
- 如果返回值是表达式，可省略 return 和 {}
```javascript
const fn = x => x+1
fn(1) // 2
```
- 如果返回值是对象，需要用括号包起来
```javascript
const fn = (x) => ({x: x+1})
fn(1) // {x: 2}
```

## [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
### Number 和 parseInt 的区别
- Number 可格式化浮点数，parseInt 只能格式化成整数
```javascript
console.log(Number('12.34')) // 12.34
console.log(parseInt('12.34')) // 12
```
- Number 不能格式化带有除数字外的字符串，parseInt 可格式化头部为数字的字符串
```javascript
console.log(Number('123abc')) // NaN
console.log(parseInt('123abc')) // 123
```
### toFixed(n)
> 保留小数点后几位，默认为 0 ，返回字符串

### 0.1+0.2!==0.3
> 由于浮点数的精度问题，0.1+0.2=0.30000000000000004 <br/>
> 因此，非整数的 Number 类型无法用 ==/=== 来比较

正确的比较方法：
```javascript
function equalFloat(num){
 return Math.abs(num) <= Number.EPSILON
}
console.log(equalFloat(0.1+0.2-0.3)) // true
```

## [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)
> 日期对象
- Date.now() 返回当前时间戳

## [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
> 值集合，且唯一（即不可重复，无论是基本类型或是对象的引用）
- 属性：[size]
- 常用方法：[add]  [delete]  [has]  [clear]
- 遍历：[for of] [forEach]
```javascript
let set = new Set([1, 2, 3])
set.size // 3
set.add('2')
set.add({a:1})
set.delete(2) // true
```

## [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
> 键值对集合
- 属性：[size]
- 常用方法：[set] [delete] [has] [clear]
- 遍历：[for of] [forEach]
```javascript
let map = new Map([[1,2], [3, 4]])
```

## [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

## [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

## [Iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
