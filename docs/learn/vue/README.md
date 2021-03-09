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
- v-show 无论条件是否符合，节点都会创建，适用于经常切换显示的场景，例如 tab 切换
- v-if 只有条件符合，才会创建节点，适用一次性判断的场景，例如列表中的互斥项

### 为何 v-for 中要用 key

- key 尽量不要使用 random 或 index
- v-for 不要和 v-if 一起使用（v-for 优先级比 v-if 高）

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

### 描述 Vue 组件生命周期（有父子组件的情况）

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

- 修饰符：
    - v-model.trim 去除前后空格
    - v-model.lazy 防抖
    - v-model.number 转换为数字

### 基于 Vue 设计一个购物车（组件结构，Vuex state 数据结构）

### diff 算法的时间复杂度是如何优化到 O(n) 的？
- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较
