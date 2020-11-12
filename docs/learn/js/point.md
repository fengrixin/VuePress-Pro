---
title: 知识点
---

## 判断类型

### typeof
一般用来判断基本类型，引用类型无法判断
```javascript
/** 判断所有值类型 */
typeof undefined // 'undefined'
typeof '' // 'string'
typeof 1 // 'number'
typeof BigInt(123) // 'bigint'
typeof true // 'boolean'
typeof Symbol('s') // 'symbol'

/** 特殊 */
typeof null // 'object'

/** 判断引用类型 */
typeof [] // 'object'
typeof {} // 'object'
typeof new String() // 'object' new 出来的都是对象，除了 new Function()
typeof new Set() // 'object'
typeof new Map() // 'object'

/** 判断函数 */
typeof console.log // 'function'
typeof function() {} // 'function'
typeof new Function() // 'function'
```

### instanceof
右边的 prototype 在左边变量的原型链上
```javascript
let s = new String()
s instanceof String  // true

Function instanceof Function // true
Object instanceof Object // true
Function instanceof Object // true
```

### 类型转换
经常涉及到类型转换的场景有以下几种：
- 字符串拼接
- ==
- 逻辑运算

## 原型&原型链

### constructor

### 属性

### 方法

## 闭包与作用域

## 异步&单线程

## 深拷贝
测试用例
```js
{
    arr: [1, 2, 3],
    date: new Date(0),
    func: ()=>{console.log('--')},
    inf: Infinity,
    map: new Map([[1,2]]),
    nan: NaN,
    obj: {a: 1},
    reg: /123/,
    set: new Set([1,2]),
    symbol: Symbol('1'),
    und: undefined,
}
```

### JSON
> 业务中最实用，只能拷贝基本类型、数组和对象 <br/>
> 无法拷贝 Infinity、NaN、reg(正则)、undefined、Symbol、Function、Date、Set、Map
```javascript
JSON.parse(JSON.stringify(data))
```

### 递归函数
> 相比 JSON 拷贝而言，此函数无法拷贝 reg(正则)、Function、Date、Set、Map
```javascript
function cloneDeep(obj) {
  let tempObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          tempObj[key] = cloneDeep(obj[key])
        } else {
          tempObj[key] = obj[key]
        }
      }
    }
  }
  return tempObj
}
```

### 最优方案
> 当然，这只是不使用第三方的最优方案，最优的当然是使用 Lodash.cloneDeep
```js
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const cloneDeep = (obj, hash = new WeakMap()) => {
    if (hash.has(obj)) return hash.get(obj)
    let type = [Date, RegExp, Set, Map, WeakSet, WeakMap];
    if(type.includes(obj.constructor)) return new obj.constructor(obj)
    
    let cloneObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    hash.set(obj, cloneObj);
    
    for (let key of Reflect.ownKeys(obj)){
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? cloneDeep(obj[key], hash) : obj[key];
    }

    return cloneObj;
}
```

### [Lodash.cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)
> Lodash 中的深拷贝方法，可以做到全类型深拷贝

## 函数防抖&节流

有一些场景某些函数会频繁触发，比如输入框验证，滚动条更新，用户频繁点击提交按钮等。 <br/>
这时候就需要用到防抖/节流，降低触发频率

### 防抖
> 在给定时间内，让函数只在第一次或最后一次执行

- 第一次执行
```javascript
// 普通写法
let timer = null
function callback() {
  if (timer) clearTimeout(timer)
  let isFirst = !timer
  timer = setTimeout(()=>timer = null, 1000)
  if (isFirst) {
    //TODO 执行
  }
}

// 闭包写法
function debounce(func, delay) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    let isFirst = !timer
    timer = setTimeout(()=>timer = null, delay)
    if (isFirst) func.apply(this, arguments)
  }
}
window.onscroll = debounce(()=>{
    //TODO 执行
}, 1000)
```

- 最后一次执行
```javascript
// 普通写法
let timer = null
function callback(){
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
        //TODO 执行
    }, 1000)
}

// 闭包写法
function debounce(func, delay) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func.apply(this, arguments), delay)
  }
}
window.onscroll = debounce(()=>{
    //TODO 执行
}, 1000)
```

- 合并成一个函数
```javascript
/**
 * 函数防抖
 *@param func 执行函数
 *@param delay 延时执行毫秒数
 *@param type true-第一次，false-最后一次
 */
function debounce(func, delay, type=false) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    if (type){
        let isFirst = !timer
        timer = setTimeout(()=> timer=null, delay)
        if (isFirst) func.apply(this, arguments)
    }else {
        timer = setTimeout(func.apply(this, arguments), delay)
    }
  }
}
window.onscroll = debounce(()=>{
    //TODO 执行
}, 1000)
```

### 节流
> 控制函数执行的时间间隔

- 间隔前触发
```javascript
// 普通写法
let prev = 0
function callback(){
  let now = Date.now()
  if(now - prev > 1000){
    //TODO 执行
    prev = now
  }   
}

// 闭包写法
function throttle(func, delay) {
  let prev = 0
  return function() {
    let now = Date.now()
    if (now - prev > delay){
      func.apply(this, arguments)
      prev = now
    }
  }
}
```

- 间隔后触发
```javascript
// 普通写法
let timer = null
function callback(){
  if(!timer){
    timer = setTimeout(()=>{
        //TODO 执行
        timer = null
    }, 1000)
  }
}

// 闭包写法
function throttle(func, delay) {
  let timer = null
  return function() {
    if (!timer){
        timer = setTimeout(()=>{
            func.apply(this, arguments)
            timer = null
        }, delay)
    }
  }
}
```

- 合并
```javascript
/**
 * 函数节流
 *@param func 执行函数
 *@param delay 延时执行毫秒数
 *@param type true-间隔开始，false-间隔结束
 */
function throttle(func, delay, type=true) {
    let prev = 0
    let timer = null

  return function() {
     if (type){
     let now = Date.now()
         if (now - prev > delay){
           func.apply(this, arguments)
           prev = now
         }
     } else {
        if (!timer){
           timer = setTimeout(()=>{
              func.apply(this, arguments)
              timer = null
           }, delay)
         }
     }
  }
}
```
