# vue 相关

## [30 道 Vue 面试题](https://juejin.im/post/5d59f2a451882549be53b170)

## [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

## [new Vue](https://github.com/muwoo/blogs/blob/master/src/Vue/1.md)

## [nexttick](https://www.cnblogs.com/tiedaweishao/p/8967127.html)

::: tip
看一段 vue 中使用的代码

```js
export default {
  data () {
    return {
      msg: 0
    }
  },
  mounted () {
    this.msg = 1
    this.msg = 2
    this.msg = 3
  },
  watch: {
    msg () {
      console.log(this.msg)
    }
  }

```

这段脚本执行我们猜测会依次打印：1、2、3。但是实际效果中，只会输出一次：3。为什么会出现这样的情况？我们来一探究竟。

## queueWatcher

定义 watch 监听 msg，实际上会被 Vue 这样调用 vm.$watch(keyOrFn, handler, options)。$watch 是我们初始化的时候，为 vm 绑定的一个函数，用于创建 Watcher 对象

```js
src/core/observser/watcher.js

this.deep = this.user = this.lazy = this.sync = false
......
    /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
```

初始设定 this.deep = this.user = this.lazy = this.sync = false，也就是当触发 update 更新的时候，会去执行 queueWatcher 方法：

```js
src/core/observer/scheduler.js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
```

这里面的 nextTick(flushSchedulerQueue)中的 flushSchedulerQueue 函数其实就是 watcher 的视图更新

```js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  let watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id);

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== "production" && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          "You may have an infinite update loop " +
            (watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`),
          watcher.vm
        );
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice();
  const updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
```

关于 waiting 变量，这是很重要的一个标志位，它保证 flushSchedulerQueue 回调只允许被置入 callbacks 一次。
接下来我们来看看 nextTick 函数，在说 nexTick 之前，需要你对 Event Loop、microTask、macroTask 有一定的了解，Vue nextTick 也是主要用到了这些基础原理,[EventLoop](https://github.com/muwoo/blogs/issues/14)

- microTask

```js
* new Promise()
* new MutationObserver()
```

- macroTask

```js
* setTimeout
* MessageChannel
* postMessage
* setImmediate
```

:::

## 生命周期

::: tip

<!-- ![](./images/) -->

```js
new Vue({})

//初始化vue实例
function _init(){
    //挂载属性
    initLifeCycle(vm);
    //初始化事件系统，钩子函数】
    initEvent(vm);
    //编译slot,vnode
    initRender(vm);
    //触发钩子
    callHook(vm,'beforeCreated)
    //添加inject功能
    initInject(vm);
    //完成数据响应性 props/data/watch/computed/methods
    initState(vm);
    //添加provide功能
    initProvide(vm);
    //触发钩子
    callHook(vm,'created)

    //挂载节点
    if(vm.$option.el){
        vm.$mounted(vm.$options.el);
    }
}

//挂载节点实现
function mountComponent(vm){
    //获取render function
    if(!this.options.render){
        //template to  render
        //Vue.compile = compileToFunctions
        let {render} = compileToFunctions();
        this.options.render= render;
    }
    //触发钩子
    callHook('beforeMount);
    //初始化观察者
    //render 渲染vdom
    vdom = vm.render();
    //update:根据diff出的patches挂载成真实的dom
    vm._update(dom);
    //触发钩子
    callHook(vm,'mounted');
}

//更新节点实现
function queueWatcher(watcher){
    nextTick(flushScheduleQueue);
}

//清空队列
function flushScheduleQueue(){
    //遍历队列中所有修改
    for(){
        //beforeUpdate
        watcher.before();

        //依赖局部更新节点
        watcher.update();
        callHook('updated')
    }
}

//销毁实例实现
Vue.prototype.$destory = function(){
    //触发钩子
    callHook(vm,'bedoreDestory');
    //自身及子节点
    remove();
    //删除依赖
    watcher.teardown();
    //删除监听
    vm.$off();
    //触发钩子
    callHook(vm,'destoryed')
}

```

## 数据响应

看完生命周期后，里面的 watcher 等内容其实是数据响应中的一部分。数据响应的实现由两部分构成: 观察者( watcher ) 和 依赖收集器( Dep )，其核心是 defineProperty 这个方法，它可以 重写属性的 get 与 set 方法，从而完成监听数据的改变。

- Observe (观察者)观察 props 与 state

  - 遍历 props 与 state，对每个属性创建独立的监听器( watcher )

- 使用 defineProperty 重写每个属性的 get/set(defineReactive）

  - get: 收集依赖

    - Dep.depend()

    - watcher.addDep()

- set: 派发更新

  - Dep.notify()
  - watcher.update()
  - queenWatcher()
  - nextTick
  - flushScheduleQueue
  - watcher.run()
  - updateComponent()

```js
let data = { a: 1 };
// 数据响应性
observe(data);

// 初始化观察者
new Watcher(data, "name", updateComponent);
data.a = 2;

// 简单表示用于数据更新后的操作
function updateComponent() {
  vm._update(); // patchs
}

// 监视对象

function observe(obj) {
  // 遍历对象，使用 get/set 重新定义对象的每个属性值
  Object.keys(obj).map((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, k, v) {
  // 递归子属性
  if (type(v) == "object") observe(v);

  // 新建依赖收集器
  let dep = new Dep();
  // 定义get/set
  Object.defineProperty(obj, k, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return v;
    },
    // 重新设置值时，触发收集器的通知机制
    set: function reactiveSetter(nV) {
      v = nV;
      dep.nofify();
    },
  });
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.map((sub) => {
      sub.update();
    });
  }
}

Dep.target = null;

// 观察者
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }
  addDep(Dep) {
    Dep.addSub(this);
  }
  update() {
    this.value = this.obj[this.key];
    this.cb(this.value);
  }
  before() {
    callHook("beforeUpdate");
  }
}
```

## virtual dom 原理实现

- 创建 dom 树

- 树的 diff,同层对比，输出 patches(listDiff/diffChilder/diffProps)
  - 没有新节点，返回
  - 新的节点 tagName 与 key 不变，对比 props,继续递归遍历子树
    - 对比属性(对比新旧属性列表)
      - 旧属性是否存在与新属性列表中
      - 都存在的是否有变化
      - 是否出现旧列表中没有的新属性
  - tagName 和 key 值变化了，则直接替换成新节点
- 渲染差异
  - 遍历 patches，把需要更改的节点取出来
  - 局部更新 dom

```js
function diff(oldTree, newTree) {
  //差异收集
  let patches = {};
  dfs(oldTree, newTree, 0, patches);
  return patches;
}

function dfs(oldNode, newNode, index, patches) {
  let curPatches = [];
  if (newNode) {
    //当前旧节点tagname和key值完全一致时
    if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
      //继续比对属性
      let props = diffProps(oldNode.props, newNode.props);
      curPatches.push({ type: "changeProps", props });
      //递归进入下一层级的比较
      diffChildrens(oldNode.children, newNode.children, index, patches);
    } else {
      //当tagName或者key修改后，表示已经是全新节点，无需再比
      curPathes.push({ type: "replaceNode", node: newNode });
    }
  }
  //构建出整颗差异树

  if (curPatches.length) {
    if (patches[index]) {
      patches[index] = patches[index].contact(curPatches);
    } else {
      patches[index] = curPatches;
    }
  }
}

//属性对比实现
function diffProps(oldProps, newProps) {
  let propsPatches = [];
  // 遍历新旧属性列表
  // 查找删除项
  // 查找修改项
  // 查找新增项
  forEach(oldProps, (k, v) => {
    if (!newProps.hasOwnProperty(k)) {
      propsPatches.push({ type: "remove", prop: k });
    } else {
      if (v !== newProps[k]) {
        propsPatches.push({ type: "change", prop: key, value: newProps[k] });
      }
    }
  });
  forEach(newProps, (k, v) => {
    if (!oldProps.hasOwnProperty) {
      propsPatches.push({ type: "add", prop: k, value: v });
    }
  });
  return propsPatches;
}

//对比子级差异
function diffChildrens(oldChild, newChild, index, patches) {
  //标记子级的删除/新增/移动
  let { change, list } = diffList(oldChild, newChild, index, patches);
  if (change.length) {
    if (patches[index]) {
      patches[index] = patches[index].contact(change);
    } else {
      patches[index] = change;
    }
  }

  //根据key获取原本匹配的节点，进一步递归从头开始
  oldChild.map((item, i) => {
    let keyIndex = list.indexOf(item.key);
    if (keyIndex) {
      let node = newChild(keyIndex);
      //进一步递归比对
      dfs(item, node, index, patches);
    }
  });
}

// 列表对比，主要也是根据 key 值查找匹配项
// 对比出新旧列表的新增/删除/移动
function diffList(oldList, newList, index, patches) {
  let change = [];
  let list = [];
  const newKeys = getKey(newList);
  oldList.map((v) => {
    if (newKeys.indexOf(v.key) >= -1) {
      list.push(v.key);
    } else {
      list.push(null);
    }
  });

  //标记删除
  for (let i = list.length - 1; i >= 0; i--) {
    if (!list[i]) {
      list.splice(i, 1);
      change.push({ type: "remove", index: i });
    }
  }

  //标记新增和移动
  newList.map((item, i) => {
    const key = item.key;
    const index = list.indexOf(key);
    if (index === -1 || key == null) {
      //新增
      change.push({ type: "add", node: item, index: i });
      list.splice(i, 0, key);
    } else {
      //移动
      if (index !== i) {
        change.push({
          type: "move",
          from: index,
          to,
          i,
        });
        move(list, index, i);
      }
    }
  });
  return { change, list };
}
```

## [Proxy 对比 defineProperty 的优势](https://www.jianshu.com/p/2df6dcddb0d7)

[defineProperty & Proxy](https://www.jianshu.com/p/d16565c6b6ee)

- 数组变化也能监听到
- 不需要深度遍历监听
- Proxy 可以直接监听对象而非属性
- Proxy 直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于 Object.defineProperty。
- Proxy 可以直接监听数组的变化
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
  Object.defineProperty 的优势如下:

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

```js
let data = { a: 1 };
let reactiveData = new Proxy(data, {
  get: function(target, name) {
    //
  },
  //
});
```

## Vue 怎么用 vm.\$set() 解决对象新增属性不能响应的问题 ？

受现代 JavaScript 的限制 ，Vue  无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data  对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.\$set (object, propertyName, value) 来实现为对象添加响应式属性，那框架本身是如何实现的呢？
我们查看对应的 Vue 源码：vue/src/core/instance/index.js

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  //target为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    //修改数组的长度，避免索引>数组长度导致splice()错误
    target.length = Math.max(target.length, key);
    //利用数组的splice实现变异方法触发响应式
    target.splice(key, 1, val);
    return val;
  }
  //key 已经存在，直接修改属性值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any)._ob_;
  //target本身就不是响应式数据，直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  //对属性进行响应式处理
  defineReactive(obj.value, key, val);
  ob.dep.notify();
  return val;
}
```

我们阅读以上源码可知，vm.\$set 的实现原理是：

如果目标是数组，直接使用数组的 splice 方法触发响应式；

如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
:::

## [虚拟 DOM 的优缺点](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)

::: tip

- 优点：
  - <b>保证性能下限</b> 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
  - <b>无需手动操作 DOM</b>： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
  - 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。
- 缺点：
  - <b>无法进行极致优化</b>： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
    :::

## Vue-Key 的作用

::: tip

- [vue 中的 key 有什么作用](https://www.cnblogs.com/zhumingzhenhao/p/7688336.html)

- [vue2.0 key 的作用](https://calendar.perfplanet.com/2013/diff/)

- [《深入剖析：Vue 核心之虚拟 DOM》](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)

其实不只是 vue，react 中在执行列表渲染时也会要求给每个组件添加上 key 这个属性。

要解释 key 的作用，不得不先介绍一下虚拟 DOM 的 Diff 算法了。

我们知道，vue 和 react 都实现了一套虚拟 DOM，使我们可以不直接操作 DOM 元素，只操作数据便可以重新渲染页面。而隐藏在背后的原理便是其高效的 Diff 算法。

vue 和 react 的虚拟 DOM 的 Diff 算法大致相同，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的 DOM 结构，不同的组件产生不同的 DOM 结构。
2. 同一层级的一组节点，他们可以通过唯一的 id 进行区分。
   基于以上这两点假设，使得虚拟 DOM 的 Diff 算法的复杂度从 O(n^3)降到了 O(n)。
   这里我们借用 React’s diff algorithm 中的一张图来简单说明一下：

<!-- ![](/images/vue-diff.jpg) -->

当页面的数据发生变化时，Diff 算法只会比较同一层级的节点：

- 如果节点类型不同，直接干掉前面的节点，再创建并插入新的节点，不会再比较这个节点以后的子节点了。
- 如果节点类型相同，则会重新设置该节点的属性，从而实现节点的更新。
  当某一层有很多相同的节点时，也就是列表节点时，Diff 算法的更新过程默认情况下也是遵循以上原则。

- <b>需要使用 key 来给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，找到正确的位置区插入新的节点</b>。

所以一句话，<b>key 的作用主要是为了高效的更新虚拟 DOM</b>。另外 vue 中在使用相同标签名元素的过渡切换时，也会使用到 key 属性，其目的也是为了让 vue 可以区分它们，

否则 vue 只会替换其内部属性而不会触发过渡效果。

<b>更准确</b>：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
<b>更快速</b>：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下

```js
function createKeyToIndex(children, beginIdx, endIndx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = childer[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

:::

## [vue 项目性能优化](https://juejin.im/post/5d548b83f265da03ab42471d)

## [Vue3.0 新特性](https://juejin.im/post/5bb719b9f265da0ab915dbdd)

## [Vue-Router](./vue-router/)

## [Vuex](./vuex)

::: tip

- state: 状态中心
- mutations: 更改状态
- actions: 异步更改状态
- getters: 获取状态
- modules: 将 state 分成多个 modules，便于管理

:::
