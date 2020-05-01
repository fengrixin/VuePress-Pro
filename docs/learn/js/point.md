---
title: 知识点
---

## 原型&原型链

## 作用域&闭包

## 异步&单线程

## 深拷贝

### JSON
> 经常使用，如果对象内存在函数（Function），parse 后函数会变成空对象 {}
```javascript
let data = {
    rowCount: 2,
    list: [{
        id: 1,
        name: '肥宅水'
    },{
        id: 2,
        name: '神仙水'
    }]
}
let data2 = JSON.parse(JSON.stringify(data))
data2.rowCount = 3
console.log(data) // 还是原来的
```

### 递归函数
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
