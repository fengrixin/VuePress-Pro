---
title: 数据结构
---

> 参考来源：
> 《漫画算法》- 小灰的算法之旅、
> [《数据结构与算法之美》](https://time.geekbang.org/column/article/39972)

## why & what

### 为什么要学习数据结构和算法？
- 写出更优雅的代码
- 提高就业竞争力
- 获得更多解决问题的思路和方法
- other

### 数据结构和算法是什么？
> 数据结构是算法的基石，数据结构是为算法服务的，算法要作用在特定的数据结构之上。
- 数据结构是指一组数据的存储结构
- 算法是指操作数据的方法

## 复杂度分析
> 数据结构和算法本身解决的是「快」和「省」的问题，即如何让代码运行的更快，如何让代码更省存储空间。
>
> 那么如何分析算法的好坏？

### 大 O 表示法
[传送门][传送门]

### 渐进时间复杂度
> 代码执行所需的时间规模

- 在分析一个算法或一段代码的复杂度时，只需关注循环执行次数最多的一段代码即可
- 加法法则：总复杂度等于量级最大的那段代码的复杂度
- 乘法法则：嵌套代码的复杂度等于嵌套内外代码复杂度的乘积

常见的复杂度（从低到高）：O(1)、 O(logn)、O(n)、O(nlogn)、O(n^2)、O(n!)


### 渐进空间复杂度
> 代码执行所需消耗的存储空间规模

常见的复杂度（从低到高）：O(1)、O(n)、O(n^2)

### 如何取舍
对前端来说，一般都是牺牲空间换取时间


## 存储结构
::: tip 存储结构
物理结构：顺序存储结构（数组），链式存储结构（链表）

逻辑结构：线性结构（栈、队列、哈希表），非线性结构（树、图）
:::

## 数组
> 数组是一种线性表数据结构，它用一块「连续」的内存空间来存储数据。
>
> 存储方式是顺序存储

[为什么很多编程语言中数组都从0开始编号？][数组]

最坏情况下的时间复杂度：
- 读取/修改 - O(1)
- 插入/删除 - O(n)

因此，数组适合读操作多，写操作少的场景

## 链表
> 和数组相反，链表并不需要一块连续的内存空间，它通过「指针」将一组零散的内存串联起来使用。
>
> 除了单向链表，还有双向链表、循环链表
>
> 存储方式是随机存储

[如何实现 LRU 缓存淘汰算法？][链表]

最坏情况下的时间复杂度：
- 插入/修改 - O(1)
- 读取/删除 - O(n)

因此，链表适合写操作多，读操作少的场景

```javascript
// 根据数组创建单向链表
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
createLinkList([1,2,3,4])
```

## 栈
> 栈是一种线性逻辑结构，遵循「先进后出」原则（可以想象一下羽毛球桶）。最先存入的元素叫做「栈底」，最后存入的就是「栈顶」。
>
> 存储方式可以是数组，也可以是链表

[如何实现浏览器的前进后退功能？][栈]

![栈](https://img.imgdb.cn/item/601035f13ffa7d37b3b612ce.gif)

栈的基本操作是「入栈」和「出栈」。因为入栈和出栈都只会影响到最后一个元素，所以入栈和出栈的时间复杂度都是 O(1)

常见场景：
- 浏览器的前进后退功能
- 小程序的页面跳转
- 面包屑导航

实现：
```javascript
const arr = []
arr.push(1) // 入栈 O(1)
const n = arr.pop() // 出栈 O(1)
```

## 队列
> 队列也是一种线性逻辑结构，遵循「先入先出」原则（可以想象一下排队）。队列的出口端叫「队头」，入口端叫「队尾」。
>
> 存储方式可以是数组，也可以是链表

[队列在线程池等有限资源池中的应用][队列]

队列的基本操作是「入队」和「出队」，和栈一样，入队和出队的时间复杂度也是 O(1)

常见场景：
- 多线程中争夺公平锁的等待队列

变种：
- 双端队列 - 综合了栈和队列的优点，队头和队尾都可以入队出队
- 优先队列 - 遵循的不是先入先出，而是谁的优先级最高，谁先出队

实现：
```javascript
// 链表实现队列 - 性能最好
class Queue {
    head = null
    tail = null
    len = 0

    add(n) { // tail 入队 O(1)
        const newNode = { value: n, next: null }
        // 1. 处理第一个元素
        if(this.head == null) {
            this.head = newNode
        }
        // 2. 处理 tail
        const tailNode = this.tail
        if(tailNode) {
            tailNode.next = newNode // 最后一个元素指向新节点
        }
        this.tail = newNode // tail 指针指向新节点

        // 记录长度
        this.len++
    }

    delete() { // head 出队 O(1)
        const headNode = this.head
        if(headNode == null || this.len <= 0) return null
        // 取值
        const value = headNode.value
        // 处理 head
        this.head = headNode.next

        // 记录长度
        this.len--
        
        return value
    }

    get length() {
        // 遍历链表复杂度为 O(n)，因此记录长度很有必要
        return this.len
    }
}
// 性能测试
const q1 = new Queue()
console.time('queue with linkList')
for(let i=0;  i<10*10000; i++) {
    q1.add(i)
}
for(let i=0;  i<10*10000; i++) {
    q1.delete()
}
console.timeEnd('queue with linkList')
const q2 = []
console.time('queue with array')
for(let i=0;  i<10*10000; i++) {
    q2.push(i)
}
for(let i=0;  i<10*10000; i++) {
    q2.shift()
}
console.timeEnd('queue with array')

// 两个栈实现一个队列 - 性能比数组实现更拉垮
class Queue {
    stack1 = []
    stack2 = []

    add(n) { // 入队 O(1)
        this.stack1.push(n)
    }

    delete() { // 出队 O(n)
        let res 
        const stack1 = this.stack1
        const stack2 = this.stack2
        // 1. 将 stack1 所有元素压到 stack2 中
        while(stack1.length) {
            const n = stack1.pop()
            if(n) {
                stack2.push(n)
            }
        }
        // 2. 移除 stack2 的栈顶元素
        res = stack2.pop()
        // 3. 将 stack2 剩下元素压回 stack1 中
        while(stack2.length) {
            const n = stack2.pop()
            if(n) {
                stack1.push(n)
            }
        }
        return res || null
    }
    get length() {
        return this.stack1.length
    }
}
```

## 散列表
> 散列表又叫哈希表，是存储「key-value」映射的集合。它是基于数组实现的。
>
> 存储方式为数组

[Word文档中的单词拼写检查功能是如何实现的？][散列表]

只要给出一个 key，就可以高效地查找到它所匹配的 value。时间复杂度接近于 O(1)

## 树
树是 n(n>=0) 个节点的有限集。当 n=0 时，称为空树。在任意一个非空树中，有如下特点：
1. 有且仅有一个特定的称为「根」的节点
2. 当 n>1 时，其余节点可分为 m(m>0) 个互不相交的有限集，每一个集合本身又是一个树，并成为根的子树。

### 二叉树
> 二叉树是树的一种特殊形式。这种树的每个节点最多只能有两个子节点
>
> 二叉树还有两种特殊形式，一个是「满二叉树」，一个是「完全二叉树」
>
> 存储方式可以是数组或者链表

![二叉树](https://static001.geekbang.org/resource/image/09/2b/09c2972d56eb0cf67e727deda0e9412b.jpg)
```javascript
const node = {
    value: 5,
    left: {
        value: 3,
        left: { value: 2, left: null, right: null },
        right: { value: 4, left: null, right:  null }
    },
    right: {
        value: 7,
        left: { value: 6, left: null, right: null },
        right: { value: 8, left: null, right:  null }
    }
}
```

### 深度优先遍历
- 前序遍历
    顺序为 根节点->左子树->右子树
```javascript
function preOrderTraverse(node) {
    if(node == null) return
    preorderTraverse(node.left)
    preorderTraverse(node.right)
}
```
    
- 中序遍历
    顺序为 左子树->根节点->右子树
```javascript
function inOrderTraverse(node) {
    if(node == null) return
    inOrderTraverse(node.left)
    console.log(node.value)
    inOrderTraverse(node.right)
}
```

- 后序遍历
    顺序为 左子树->右子树->根节点
```javascript
function postOrderTraverse(node) {
    if(node == null) return
    postOrderTraverse(node.left)
    postOrderTraverse(node.right)
    console.log(node.value)
}
```

### 广度优先遍历
- 层序遍历

    顾名思义，一层一层横向遍历各个节点


[传送门]: https://time.geekbang.org/column/article/40036

[数组]: https://time.geekbang.org/column/article/40961


[链表]: https://time.geekbang.org/column/article/41013


[栈]: https://time.geekbang.org/column/article/41222


[队列]: https://time.geekbang.org/column/article/41330


[散列表]: https://time.geekbang.org/column/article/64233
