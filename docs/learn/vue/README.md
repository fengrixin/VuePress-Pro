---
title: Vue
---

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
