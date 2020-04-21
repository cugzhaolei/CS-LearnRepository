# Vue相关

## [30 道 Vue 面试题](https://juejin.im/post/5d59f2a451882549be53b170)

## [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)

### 生命周期

::: tip
<!-- ![vue生命周期](./images/) -->
``` js
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
    callHook(vm,'beforeCreated')
    //添加inject功能
    initInject(vm);
    //完成数据响应性 props/data/watch/computed/methods
    initState(vm);
    //添加provide功能
    initProvide(vm);
    //触发钩子
    callHook(vm,'created')

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
    callHook('beforeMount');
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

:::

### 数据响应

::: tip
看完生命周期后，里面的`watcher`等内容其实是数据响应中的一部分。数据响应的实现由两部分构成: 观察者`(watcher)` 和 依赖收集器( Dep )，其核心是`defineProperty`这个方法，它可以重写属性的 `get` 与 `set` 方法，从而完成监听数据的改变。

* `Observe` (观察者)观察 `props` 与 `state`
  * 遍历`props` 与 `state`，对每个属性创建独立的监听器(`watcher`)
* 使用 `defineProperty`重写每个属性的 `get/set(defineReactive）`
  * get: 收集依赖
    * Dep.depend()
    * watcher.addDep()
  * set: 派发更新
    * Dep.notify()
    * watcher.update()
    * queenWatcher()
    * nextTick
    * flushScheduleQueue
    * watcher.run()
    * updateComponent()

``` js
let data = {a: 1}
// 数据响应性
observe(data)

// 初始化观察者
new Watcher(data, 'name', updateComponent)
data.a = 2

// 简单表示用于数据更新后的操作
function updateComponent() {
    vm._update() // patchs
}

// 监视对象
function observe(obj) {
    // 遍历对象，使用 get/set 重新定义对象的每个属性值
    Object.keys(obj).map(key => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive(obj, k, v) {
    // 递归子属性
    if (type(v) == 'object') observe(v)

    // 新建依赖收集器
    let dep = new Dep()
    // 定义get/set
    Object.defineProperty(obj, k, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
        // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return v
        },
        // 重新设置值时，触发收集器的通知机制
        set: function reactiveSetter(nV) {
            v = nV
            dep.nofify()
        },
    })
}

// 依赖收集器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.map(sub => {
            sub.update()
        })
    }
}

Dep.target = null

// 观察者
class Watcher {
    constructor(obj, key, cb) {
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }
    addDep(Dep) {
        Dep.addSub(this)
    }
    update() {
        this.value = this.obj[this.key]
        this.cb(this.value)
    }
    before() {
        callHook('beforeUpdate')
    }
}
```

:::

### v-if和v-show

`v-if` 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 的 `“display”`属性进行切换。
所以，`v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景；`v-show` 则适用于需要非常频繁切换条件的场景。

### Vue中异步请求

* `created`(推荐更快获取服务器数据-减少页面loading时间 ssr不支持beforeMounted mounted)
* `beforeMounted`
* `mounted`(可以访问到dom)

### v-model原理

v-model指令主要用于在表单`input、textarea、select`等元素上实现双向绑定

* text和textarea元素使用value和input事件
* CheckBox和radio使用checked属性和change事件
* select字段将value作为prop并将change作为事件
以input为例

``` js
<input v-model='something'>

// 相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

### 组件监听

``` js
//Parent.vue
<Child @mounted="doSomething"></Child>
//child.cue
mounted(){
    this.$emit('mounted');
}

//parent.vue
<Child @hook:mounted = "doSomething"></Child>

doSomething(){
    console.log('父组件监听到mounted钩子函数')
}
//child.vue
mounted(){
    console.log('子组件触发mounted钩子函数')
}

//输出顺序如下：
//子组件触发mounted钩子函数
//父组件监听mounted钩子函数
```

### virtual dom 原理实现

::: tip

* 创建dom树

* 树的diff,同层对比，输出patches(listDiff/diffChilder/diffProps)
  * 没有新节点，返回
  * 新的节点tagName与key不变，对比props,继续递归遍历子树
    * 对比属性(对比新旧属性列表)
      * 旧属性是否存在与新属性列表中
      * 都存在的是否有变化
      * 是否出现旧列表中没有的新属性
  * tagName和key值变化了，则直接替换成新节点
* 渲染差异
  * 遍历patches，把需要更改的节点取出来
  * 局部更新dom

``` js
function diff(oldTree,newTree){
    //差异收集
    let patches ={};
    dfs(oldTree,newTree,0,patches);
    return patches;
}

function dfs(oldNode,newNode,index,patches){
    let curPatches = [];
    if(newNode){
        //当前旧节点tagname和key值完全一致时
        if(oldNode.tagName === newNode.tagName&&oldNode.key===newNode.key){
            //继续比对属性
            let props= diffProps(oldNode.props,newNode.props);
            curPatches.push({type:'changeProps',props});
            //递归进入下一层级的比较
            diffChildrens(oldNode.children,newNode.children,index,patches)
        }else{
            //当tagName或者key修改后，表示已经是全新节点，无需再比
            curPathes.push({type:'replaceNode',node:newNode});
        }
    }
    //构建出整颗差异树

    if(curPatches.length){
        if(patches[index]){
            patches[index] = patches[index].contact(curPatches)
        }else{
            patches[index] = curPatches;
        }
    }
}

//属性对比实现
function diffProps(oldProps,newProps){
    let propsPatches = [];
    // 遍历新旧属性列表
    // 查找删除项
    // 查找修改项
    // 查找新增项
    forEach(oldProps,(k,v)=>{
        if(!newProps.hasOwnProperty(k)){
            propsPatches.push({type:'remove',prop:k});
        }else{
            if(v!==newProps[k]){
                propsPatches.push({type:'change',prop:key,value:newProps[k]});
            }
        }
    })
    forEach(newProps,(k,v)=>{
        if(!oldProps.hasOwnProperty){
            propsPatches.push({type:'add',prop:k,value:v});
        }
    })
    return propsPatches;
}

//对比子级差异
function diffChildrens(oldChild,newChild,index,patches){
    //标记子级的删除/新增/移动
    let {change,list} = diffList(oldChild,newChild,index,patches);
    if(change.length){
        if(patches[index]){
            patches[index]=patches[index].contact(change);
        }else{
            patches[index]=change;
        }
    }

    //根据key获取原本匹配的节点，进一步递归从头开始
    oldChild.map((item,i)=>{
        let keyIndex = list.indexOf(item.key);
        if(keyIndex){
            let node = newChild(keyIndex);
            //进一步递归比对
            dfs(item,node,index,patches);
        }
    })

}

// 列表对比，主要也是根据 key 值查找匹配项
// 对比出新旧列表的新增/删除/移动
function diffList(oldList,newList,index,patches){
    let change=[];
    let list = [];
    const newKeys = getKey(newList);
    oldList.map(v=>{
        if(newKeys.indexOf(v.key)>=-1){
            list.push(v.key);
        }else{
            list.push(null);
        }
    })

    //标记删除
    for(let i = list.length-1;i>=0;i--){
        if(!list[i]){
            list.splice(i,1);
            change.push({type:'remove',index:i});
        }
    }

    //标记新增和移动
    newList.map((item,i)=>{
        const key = item.key;
        const index = list.indexOf(key);
        if(index===-1||key==null){
            //新增
            change.push({type:'add',node:item,index:i});
            list.splice(i,0,key);
        }else{
            //移动
            if(index!==i){
                change.push({
                    type:'move',
                    from:index,
                    to,i,
                })
                move(list,index,i);
            }
        }
    })
    return {change,list}
}
```

:::

### 侦听对象数组变化

vue2.0中对属性的劫持是通过`Object.defineProperty()`实现的，但是对于数组，对象等监听只能通过如下方法

``` js
//observe a list of array item
observeArray(items:Array<any>){
    for(let i=0;i<items.length;i++){
        observe(items[i]) //observe功能为监测数据的变化
    }
}

let childOb = !isShallow&&observe(val)  //observe为监测数据的变化
```

### [Proxy对比defineProperty的优势](https://www.jianshu.com/p/2df6dcddb0d7)

::: tip
[Proxy&defineProperty](https://www.jianshu.com/p/d16565c6b6ee)

* 数组变化也能监听到
* 不需要深度遍历监听
* Proxy可以直接监听对象而非属性
* Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。
* Proxy可以直接监听数组的变化
* Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。
* Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
Object.defineProperty 的优势如下:

* 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

``` js
let data = {a:1}
let reactiveData = new Proxy(data,{
    get:function(target,name){
        //
    },
    //
})
```

:::

### Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题

::: tip
受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 `Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value)`  来实现为对象添加响应式属性，那框架本身是如何实现的呢？
我们查看对应的 Vue 源码：vue/src/core/instance/index.js

``` js
export function set(target:Array<any>|Object,key:any,val:any):any{
    //target为数组
    if(Array.isArray(target)&&isValidArrayIndex(key)){
        //修改数组的长度，避免索引>数组长度导致splice()错误
        target.length = Math.max(target.length,key)
        //利用数组的splice实现变异方法触发响应式
        target.splice(key,1,val)
        return val
    }
    //key 已经存在，直接修改属性值
    if(key in target &&!(key in Object.prototype)){
        target[key] = val
        return val
    }
    const ob = (target:any)._ob_
    //target本身就不是响应式数据，直接赋值
    if(!ob){
        target[key] = val
        return val
    }
    //对属性进行响应式处理
    defineReactive(obj.value,key,val)
    ob.dep.notify()
    return val
}
```

我们阅读以上源码可知，vm.$set 的实现原理是：

如果目标是数组，直接使用数组的 splice 方法触发响应式；

如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）
:::

### [虚拟DOM的优缺点](https://juejin.im/post/5d36cc575188257aea108a74#heading-14)

::: tip

* 优点：
  * <b>保证性能下限</b> 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
  * <b>无需手动操作 DOM</b>： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
  * 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。
* 缺点：
  * <b>无法进行极致优化</b>： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
:::

### [vue中的key有什么作用](https://www.cnblogs.com/zhumingzhenhao/p/7688336.html)

::: tip

https://calendar.perfplanet.com/2013/diff/

其实不只是vue，react中在执行列表渲染时也会要求给每个组件添加上key这个属性。

要解释key的作用，不得不先介绍一下虚拟DOM的Diff算法了。

我们知道，vue和react都实现了一套虚拟DOM，使我们可以不直接操作DOM元素，只操作数据便可以重新渲染页面。而隐藏在背后的原理便是其高效的Diff算法。

vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：

1. 两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。
2. 同一层级的一组节点，他们可以通过唯一的id进行区分。
基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。
这里我们借用React’s diff algorithm中的一张图来简单说明一下：

![diff](/images/vue-diff.png)

:::

### Vue-Router

------

### Vuex

* state: 状态中心
* mutations: 更改状态
* actions: 异步更改状态
* getters: 获取状态
* modules: 将state分成多个modules，便于管理