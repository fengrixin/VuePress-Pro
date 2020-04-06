---
title: Array
---
## 增
### push
> 向数组末尾添加一个或多个元素

### unshift
> 向数组头部添加一个或多个元素

### concat
> 合并两个或多个数组
```javascript
let arr = [1, 2, 3], arr2 = [4, 5], arr3 = [6, 7]
arr.concat(arr2) // [1, 2, 3, 4, 5]
arr.concat(arr2, arr3) // [1, 2, 3, 4, 5, 6, 7]
```

## 删
### pop()
> 删除数组最后一个元素并返回删除元素
### shift()
> 删除数组第一个元素并返回删除元素


## 改
### sort
> 对数组进行排序

### reverse
> 反转数组



## 查
### includes
> 查询数组中是否包含指定的值，有则返回 true <br/>
> 注意：引用类型除外
```javascript
const arr = [0, 1, '2', false, {i: 1}]
arr.includes(0) // true
arr.includes('2') // true
arr.includes(false) // true
arr.includes({i: 1}) // false
arr.indexOf(1, 2) // false, 因为是从下标为 2 开始查询的
```

### indexOf
> 查询元素在数组中首次出现的位置，没有则返回 -1
```javascript
const arr = [1, 2, 3]
const i = arr.indexOf(2)   // i = 1
const j = arr.indexOf(4)   // j = -1
const k = arr.indexOf(2, 2)   // k = -1 (从下标为 2 的位置开始找，所以找不到)
```


## 遍历


### forEach
> 遍历数组
```javascript
const arr = [1, 2, 3]
arr.forEach((item, index, arr)=>{// index 和 arr 都是可选项
    console.log(item, index, arr)   // 1, 0, [1,2,3] ...
})
```

### map
> 遍历数组，返回处理后的新数组
```javascript
const arr = [1, 2, 3]
arr.map((item, index, arr)=>{// index 和 arr 都是可选项
    return item+1 
})
console.log(arr)   // [2,3,4]
```

### some
> 遍历数组，判断数组某项是否满足条件（条件满足后不再遍历下去），返回 true / false
```javascript
const arr = [1, 2, 3]
const bol = arr.some((item, index, arr)=>{// index 和 arr 都是可选项
    return item>=2
})
console.log(bol)  // true
```

### every
> 遍历数组，判断数组全部元素是否满足条件，返回 true / false
```javascript
const arr = [1, 2, 3]
const bol = arr.every((item, index, arr)=>{// index 和 arr 都是可选项
    return item>2
})
console.log(bol)   // false
```

### filter
> 遍历数组，返回满足条件后的新数组
```javascript
const arr = [1, 2, 3]
arr.filter((item, index, arr)=>{// index 和 arr 都是可选项
    return item>1
})
console.log(arr)   // [2,3]
```


## 转换
### join
> 将数组元素转换成字符串（默认以逗号分隔）
```javascript
const arr = [1, 2, 3]
arr.join()  // "1,2,3"
arr.join(' ')  // "1 2 3"
```
