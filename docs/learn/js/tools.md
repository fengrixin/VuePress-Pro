---
title: 工具方法
---

## 有意思的面试题

### [].map(parseInt)
```javascript
['1', '2', '3'].map(parseInt) // [1, NaN, NaN]
['10', '10', '10', '10'].map(parseInt) // [10, NaN, 2, 3]
```
map 函数的 callback 参数接受三个参数 callback(currentValue, index, array)

parseInt 函数接受两个参数 parseInt(string, radix)，radix 表示进制

### [1,2,3].map(v=>{v*2})
```javascript
[1,2,3].map(v=>{v*2}) // [undefined, undefined, undefined]
```

### 函数传参
```javascript
//考察点： 1. 引用类型  2. 函数参数传递

function foo(x) {
    x.n = 2;
    x = { n: 3 };
    x.n = 4;
}

let x = { n: 1 };
foo(x)

console.log(x.n);  // 2
```
