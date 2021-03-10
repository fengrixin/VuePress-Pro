---
title: Vue
---

## MVVM 数据驱动视图
不再关注如何去操作 DOM，而更专注于数据和业务逻辑
![](https://img.imgdb.cn/item/6045b714cef1ec5e6f4e1dbb.png)

## 响应式

### Object.defineProperty
缺点：
- 对象每个属性都劫持监听
- 数组需在原型链上复写方法，拦截监听
    ```javascript
    let arrProto = Object.create(Array.prototype)
    arrProto.push = function() {
      // 触发视图更新后再调用原型链上的 Array 的 push 方法
      updateView()
      Array.prototype.push.call(this, ...arguments)
    }
    ```

### Proxy
- 优点：代理对象，对象的增删改都可监听
- 缺点：兼容性不好，且无法 Polyfill

## $nextTick
- Vue 是异步渲染
    - data 改变之后，DOM 不会立刻渲染
    - 页面渲染时会将 data 的修改做整合，一次性更新视图
    - 减少 DOM 操作次数，提高性能
- $nextTick 会在 DOM 渲染之后被触发，以获取最新 DOM 节点

## 生命周期相关

### props methods data computed watch 的初始化顺序
::: tip 总结
在 beforeCreate 和 created 之间进行初始化，它们的顺序为：<br/>
props -> methods -> data -> computed -> watch
::: 

查看源码可以得知，在 new Vue 的时候，Vue 会进行初始化

vue/src/core/instance/index.js
```javascript
import {initMixin} from './init'

function Vue(options) {
  if(process.env.NODE_ENV !== 'production' && !(this instanceof Vue)){
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)

export default Vue
```

在 initMixin 的时候 this._init() 会被挂在 Vue 的原型上，其中，_init() 的方法中有一段代码
```javascript
vm._self = vm
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm)  // resolve provide after data/props
callHook(vm, 'created')
```

进入 initState() 方法中，有那么一段非常清晰明确浅显易懂的代码
```javascript
const opts = vm.$options
if(opts.props) initProps(vm, opts.props)
if(opts.methods) initMethods(vm, opts.methods)
if(opts.data){
  initData(vm)
}else{
  observe(vm._data = {}, true /* asRootData */)
}
if(opts.computed) initComputed(vm, opts.computed)
if(opts.watch && opts.watch !== nativeWatch){
  initWatch(vm, opts.watch)
}

// vue/src/core/util/env.js
// Firefox has a "watch" function onObject.prototype...
export const nativeWatch = ({}).watch
```

## 性能相关

### 异步加载组件
使用异步加载组件的方式，可以做到按需加载，在一些复杂的场景中，可以缩短渲染时间，提升用户体验
- 页面
- 子组件
```javascript
asyncDemo: ()=> import('./asyncDemo')
```

## 面试题

### v-show 和 v-if 的区别
- v-show 通过 CSS 的 display 控制显示和隐藏
- v-if 组件真正的渲染和销毁元素，而不是显示和隐藏
- 频繁切换显示状态用 v-show，否则用 v-if

### 为何 v-for 中要用 key
- 必须用 key，别整 random 或 index 这两个货色
- diff 算法中会通过 tag 和 key 来判断 vnode 节点是否是同一个
- 减少渲染次数，提升渲染性能
- v-for 不要和 v-if 一起使用（v-for 优先级比 v-if 高）

### computed 和 watch 的区别
- computed 会把计算结果缓存起来，相关的 data 数据不变则不会重新计算，提高性能
- watch 一般用来监听数据的变化
- computed 会先于 watch 进行初始化

### 为何组件 data 必须是一个函数
组件编译后实际上是一个 class，组件的使用相当于实例化

如果 data 是一个对象，那么其中一个实例对象对 data 修改，都会影响到其他实例对象

data 是函数的话就可以保证每个实例化对象都是独立的，不会相互影响

### 多个组件有相同的逻辑，如何抽离？
使用 mixins 混入，mixins 的缺点是命名不能相同，否则会冲突，项目大的时候不易排查问题

### 何时使用异步组件？
- 加载复杂或者大组件时
- 路由异步加载

### 何时需要使用 keep-alive？
缓存组件，不需要重复渲染
- 多个静态 tab 页的切换
- 优化性能

### 何时需要使用 beforeDestroy
- 解绑自定义事件
- 清除定时器
- 解绑自定义的 DOM 事件，如 window scroll 等

### template 是什么
相当于一种模板语法，不是单纯的 html，它还有着指令、表达式，循环判断这些能力

Vue 会把 template 编译成一个 render 函数，执行这个函数后会生成 VNode，也就是虚拟 DOM

（Vue3 在编译的时候做了一定的优化，对需要改变的地方打一个标记，比如插值、判断、循环，这样 diff 的时候只需要比对有标记的地方即可）

### 描述组件渲染和更新的过程
#### 渲染过程
- 解析模板为 render 函数（在开发环境就已经完成，vue-loader）
- 触发响应式，监听 data 属性 getter setter
- 执行 render 函数，生成 vnode，然后通过 patch(elem, vnode) 函数渲染在页面上
#### 更新过程
- 修改 data，触发 setter（此前在 getter 中已经被监听）
- 重新执行 render 函数，生成 newVnode
- patch(vnode, newVnode) 通过 diff 对比拿到需要更新的节点，渲染到页面上

![](https://img.imgdb.cn/item/60478eb65aedab222ccad427.png)

### 描述 Vue 组件生命周期（有父子组件的情况）
- 页面加载渲染

    beforeCreate -> created -> beforeMount -> [beforeCreate -> created - beforeMount -> mounted] -> mounted
- 子组件更新

    beforeUpdate -> [beforeUpdate -> updated] -> updated
- 父组件更新

    beforeUpdate -> updated
- 页面销毁

    beforeDestroy -> [beforeDestroy -> destroyed] -> destroyed

### Vue 组件如何通讯
#### 父子组件间
- props 和 $emit

#### 父子/兄弟/不相关组件间
- Vuex
- Vue 本身就具备自定义事件的能力
    ```javascript
    // event.js
    import Vue from 'vue'
    export default new Vue()
  
    // xxx1.vue
    import event from './event.js'
    event.$emit('onChange', 'value') // 触发自定义事件
  
    // xxx2.vue
    import event from './event.js'
    mounted(){
      event.$on('onChange', this.changeValueHandler) // 监听自定义事件
    }
    changeValueHandler(value){
      console.log(value) // value
    }
    beforDestroy(){
      event.$off('onChange', this.changeValueHandler) // 解绑事件，以免内存泄漏
    }
    ```
- EventBus

### 双向数据绑定 v-model 的实现原理
就输入框而言，在编译 template 的时候，会给输入框绑定一个 input 事件，实时更新 value，从而达到数据的双向绑定
- input 元素的 value = this.name
- 绑定 input 事件 this.name = $event.target.value
- data 更新触发 re-render

- 修饰符：
    - v-model.trim 去除前后空格
    - v-model.lazy 防抖
    - v-model.number 转换为数字

### Vue-Router 两种路由模式的区别和原理
- hash
    - 监听 window.onhashchange 事件，浏览器会记录 hash 变化
    - 刷新，hash 不会提交到服务端
- history
    - history.pushState 切换路由
    - window.onpopstate 监听路由
    - 需要服务端配合，否则刷新后会 404

### 基于 Vue 设计一个购物车（组件结构，Vuex state 数据结构）

### diff 算法的时间复杂度是如何优化到 O(n) 的？
- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

### 请用 vnode 描述一个 DOM 结构
```html
<div id="app" class="container">
    <p>text</p>
    <ul style="font-size: 20px">
        <li>a</li>
    </ul>
</div>
```
```json5
{
  tag: 'div',
  props: {
    className: 'container',
    id: 'app'
  },
  children: [
    {
      tag: 'p',
      children: 'text'
    },{
      tag: 'ul',
      props: {
        style: 'font-size: 20px'
      },
      children: [
        {tag: 'li', children: 'a'}
      ]
    }
  ]
}
```
