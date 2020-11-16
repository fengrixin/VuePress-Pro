---
title: 知识点
---

## 基础知识

### typeof
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
判断变量是否属于对象的实例
```javascript

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
> JavaScript 采用的是静态作用域，也叫词法作用域。 <br/>
> 也就是说函数在定义的时候函数的作用域就决定了
>
ES6 之前，只有全局作用域和函数作用域，ES6 之后才加入了块级作用域

### JavaScript 代码的执行流程
![流程图](https://static001.geekbang.org/resource/image/64/1e/649c6e3b5509ffd40e13ce9c91b3d91e.png)
![流程图](https://static001.geekbang.org/resource/image/06/13/0655d18ec347a95dfbf843969a921a13.png)

### 执行上下文
> 在不同的标准中，相应的术语有一定的变化

ES3（古典定义）
- scope：作用域，也叫作用域链
- variable object：变量对象，用于存储变量的对象
- this value：this 值

ES5（改进了命名方式）
- lexical environment：词法环境，当获取变量时使用
- variable environment：变量环境，当声明变量时使用
- this value：this 值

ES2018（this 值归入词法环境中，然后增加了一些其他内容）
- **lexical environment**：词法环境，当获取变量或 this 值时使用
- **variable environment**：变量环境，当声明变量时使用
- code evaluation state：用于恢复代码执行位置
- Function：执行的任务是函数时使用，表示正在被执行的函数
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码
- Realm：使用的基础库和内置对象实例
- Generator：仅生成器上下文有这个属性，表示当前生成器

虽然标准的定义一直在变化，但核心原理不变。最重要的依然是「作用域链」「变量环境」「this」

#### 哪些情况会创建执行上下文？
- 当 JavaScript 执行全局代码的时候，会编译全局代码并创建「全局上下文」，而且在整个页面的生存周期内，全局执行上下文只有一份
- 当调用一个函数时，函数体内的代码才会被编译，并创建「函数执行上下文」，一般情况下，在函数执行结束之后，创建的函数执行上下文会被销毁
- 当使用 eval 函数时，eval 的代码也会被编译，并创建执行上下文

### 变量提升
在代码编译阶段，JavaScript 引擎会把变量和（声明式）函数的声明部分放入到了变量环境中。

变量提升后，会给变量设置默认值，也就是 undefined；（声明式）函数不同于变量，会整个函数体提升
```javascript
VariableEnvironment:
     showName ->function : {console.log("showName被调用"),
     myname -> undefined, 
```
关于同名变量和函数的两点处理原则：
- 如果是同名的函数，JavaScript 编译阶段会选择最后声明的那个。
- 如果变量和函数同名，那么在编译阶段，变量的声明会被忽略。
    > 函数提升要比变量提升的优先级要高一些，且不会被变量声明覆盖，但是会被变量赋值之后覆盖。

### 调用栈
调用栈是用来管理「函数调用关系」的一种数据结构

### 闭包
> 本质是一个绑定了「执行环境」的函数
- 广义上，普通函数都是闭包
- 狭义上，在外部可以访问到函数内的变量的函数，称为闭包

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
