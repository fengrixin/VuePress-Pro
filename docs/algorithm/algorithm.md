---
title: 算法
---

> 算法的本质是寻找规律并实现
>
> 如果寻找规律？找出输入和输出的关系，寻找突破口
>
> 如何实现？实现是程序+数据结构的结合体

## 闲暇时间刷刷算法，提高下逻辑思维

[力扣主页](https://leetcode-cn.com/u/rixin)

## 排序算法

按时间复杂度区分的话：

- O(n^2)：冒泡排序、选择排序、插入排序
- O(nlogn)：快速排序、归并排序、堆排序
- O(n)：计数排序、桶排序、基数排序

排序还可以根据其稳定性划分为「稳定排序」和「不稳定排序」。何为不稳定性呢？就是值相同的元素在排序后改变了原来的位置。

- 稳 定：冒泡排序、插入排序、归并排序、计数排序、桶排序、基数排序
- 不稳定：选择排序、快速排序、堆排序

### 冒泡排序

冒泡排序非常简单，就是遍历一组数据（数据长度-1次），相邻两个数字进行对比，然后交换位置

冒泡排序是一种稳定排序。

```javascript
function sort(arr) {
  for (let i = 0, leni = arr.length - 1; i < leni; i++) {
    for (let j = 0, lenj = arr.length - i - 1; j < lenj; j++) {
      let temp = 0;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

sort([2, 3, 5, 1, 4])
```

优化：

- 使用一个变量进行标记，如果在某轮排序中，没有元素交换，则说明数列已然有序，可以直接跳出循环，节省循环次数

```javascript
function sort(arr) {
  for (let i = 0, leni = arr.length - 1; i < leni; i++) {
    let isSorted = true;
    for (let j = 0, lenj = arr.length - i - 1; j < lenj; j++) {
      let temp = 0;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSorted = false; // 本轮有交换
      }
    }
    if (isSorted) break  // 本轮无交换，跳出循环
  }
  return arr;
}

sort([4, 5, 1, 2, 3])
```

- 记录下最后一次元素交换的位置，该位置即为无序数列的边界，往后就是有序区了，无需再遍历下去

```javascript
function sort(arr) {
  for (let i = 0, leni = arr.length - 1; i < leni; i++) {
    let isSorted = true;
    let sortBorder = arr.length - 1;
    for (let j = 0; j < sortBorder; j++) {
      let temp = 0;
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        isSorted = false; // 本轮有交换
        sortBorder = j; // 记录最后一次交换的位置
      }
    }
    if (isSorted) break  // 本轮无交换，跳出循环
  }
  return arr;
}

sort([2, 1, 3, 4, 5])
```

- 鸡尾酒排序：像钟摆一样左右交替循环进行排序，适用于大部分元素已经有序的情况

### 快速排序

同冒泡一样也属于交换排序，不同于冒泡每次只把一个元素冒泡到数列一端

快速排序则是 **「在每一轮挑选一个基准元素，并让其他比它大的元素移动到数列一边，比它小的元素移动到数列的另一边，从而把数列拆解成两个部分」**

这种思路叫做「分治法」

### 堆排序

## 二分查找
- 时间复杂度： O(logn)
- 凡有序，必二分！
- 递归（代码逻辑清晰）
```javascript
function binarySearch(arr, target, startIndex, endIndex) {
  const length = arr.length
  if(length === 0) return -1
  // 刚开始，定义范围
  if(startIndex == null) startIndex = 0
  if(endIndex == null) endIndex = length
  // 找不到
  if(startIndex > endIndex) return -1
  // 中间位置
  const midIndex = Math.floor((startIndex + endIndex) / 2)
  const midValue = arr[midIndex]
  if(target < midValue) {
    // 目标值在左侧
    return binarySearch(arr, target, startIndex, midIndex - 1)
  } else if(target > midValue) {
    // 目标值在右侧
    return binarySearch(arr, target, midIndex + 1, endIndex)
  } else {
    // 找到了
    return midIndex
  }
}
```
- 非递归（性能好一些些，递归的函数调用开销会多一些）
```javascript
function binarySearch(arr, target) {
  const length = arr.length
  if(length === 0) return -1
  let startIndex = 0 // 开始位置
  let endIndex = length - 1 // 结束位置
  while(startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]
    if(target < midValue) {
      // 目标值在左侧
      endIndex = midIndex - 1
    } else if(target > midValue) {
      // 目标值在右侧
      startIndex = midIndex + 1
    } else {
      // 找到了
      return midIndex
    }
  }
  return -1
}
binarySearch([1,2,3,4,5,6], 2)
```

## 哈希算法

## 深度和广度优先搜索

## 贪心算法

## 分治算法

## 回溯算法

## 动态规划

## 算法题

### 数组

- [两数之和](https://leetcode-cn.com/problems/two-sum)
- [删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array)
- [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array)

- 已知如下数组，编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```javascript
const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

console.log(Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b))
```

- 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']
  ，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

```javascript
function concatArr(arr1, arr2) {
  let arr = [...arr1]
  let currentIndex = 0
  for (let i = 0, len = arr2.length; i < len; i++) {
    let re = new RegExp(arr2[i])
    while (currentIndex < arr.length) {
      if (!re.test(arr[++currentIndex])) {
        arr.splice(currentIndex, 0, arr2[i])
        break
      }
    }
  }
  return arr
}

let arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let arr2 = ['A', 'B', 'C', 'D']
console.log(arr1, arr2, concatArr(arr1, arr2))
```

- 把一个数组旋转 k 步
```javascript
// O(n^2)
function rotate1(arr, k) {
  const len = arr.length
  if(!k || len === 0) return arr
  const step = Math.abs(k % len)
  for(let i = 0; i < step; i++) {
    const n = arr.pop()
    if(n) {
      arr.unshift(n) // unshift、shift、splice 复杂度为 O(n)
    }
  }
  return arr
}
rotate1([1,2,3,4,5,6,7], 3)

// O(1)
function rotate2(arr, k) {
  const len = arr.length
  if(!k || len === 0) return arr
  const step = Math.abs(k % len)
  const tempS = arr.slice(-step)
  const tempE = arr.slice(0, len - step)
  return tempS.concat(tempE)
}
rotate2([1,2,3,4,5,6,7], 3)
```

### 链表
- 反转单向链表
```javascript
function reverseLinkList(listNode) {
  // 定义三个指针
  let prevNode = undefined
  let curNode = undefined
  let nextNode = listNode
  // 以 nextNode 为主，遍历链表
  while(nextNode) {
    // 1. 第一个元素指向 null，反转为最后一位
    if(curNode && !prevNode) {
      curNode.next = null
    }
    // 2. 反转指针
    if(curNode && prevNode) {
      curNode.next = prevNode
    }
    // 3. 三个指针向后移动
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode.next
  }
  // 4. 反转最后一个元素
  curNode.next = prevNode

  return curNode
}
function createLinkList(arr) {
    const len = arr.length
    if(len === 0) throw new Error("arr is empty");
    let curNode = {
        value: arr[len - 1],
        next: null
    }
    if(len === 1) return curNode
    for(let i = len - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        }
    }
    return curNode
}
reverseLinkList(createLinkList([1,2,3,4]))
```

### 字符串

- [反转字符串](https://leetcode-cn.com/problems/reverse-string)
