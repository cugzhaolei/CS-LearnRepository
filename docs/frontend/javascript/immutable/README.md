::: tip
# Immutable 
数据不可变 深拷贝 浅拷贝 第三方库

 JS的基本数据类型:
 String Number Null Boolean Undefined Symbol
 引用类型:
 Object


## 浅拷贝

## 深拷贝

## Proxy方法

我们要通过原生js的api来实现immutable,很显然我们需要对引用对象的set、get、delete等一系列操作的特性进行修改，这就需要defineProperty或者Proxy进行元编程.
我们就以Proxy为例来进行编码,当然,我们需要事先了解一下Proxy的使用方法.
我们先定义一个目标对象
``` js
const target = {name: 'the great wall', count: 0};
```
实现一个功能，每次访问这个对象的count增加1：
``` js
const target = { name:'the great wall',count:0};
const handler = {
    get:function(target,key,receiver){
        console.log(`getting ${key}!`);
        if(key==='count'){
            const count = Reflect.get(target,key,receiver);
            Reflect.set(target,key,count+1,receiver);
            return count+1
        }
        return Reflect.get(target,key,receiver);
    }
};
const a = new Proxy(target,handler)
console.log(a.name,a.count);
//
getting name!
getting count!
the great wall 1
```
Proxy就像一个代理器,当有人对目标对象进行处理(set、has、get等等操作)的时候它会拦截操作，并用我们提供的代码进行处理，此时Proxy相当于一个中介或者叫代理人,当然Proxy的名字也说明了这一点,它经常被用于代理模式中,例如字段验证、缓存代理、访问控制等等。
我们的目的很简单，就是利用Proxy的特性，在外部对目标对象进行修改的时候来进行额外操作保证数据的不可变。
在外部对目标对象进行修改的时候,我们可以将被修改的引用的那部分进行拷贝,这样既能保证效率又能保证可靠性.

1. 那么如何判断目标对象是否被修改过,最好的方法是维护一个状态
``` js
function createState(target){
    this.modifed = false;//是否更改
    this.target = target;//目标
    this.copy = undefined;// 拷贝的对象
}
```
2. 此时我们就可以通过状态判断来进行不同的操作了
``` js
createState.prototype ={
    //对于get操作，如果目标对象没有修改直接返回原对象
    get:function(key){
        if(!this.modified)return this.target[key];
        return this.copy[key];
    },
    //对于set操作。如果目标对象没有被修改过，那么进行修改操作，否则修改拷贝对象
    set:function(key,value){
        if(!this.modified) this.markChanged();
        return (this.copy[key] =value);
    },
    //标记状态为已修改并拷贝
    markChanged:function(){
        if(!this.modified){
            this.modified = true;
            this.copy = shallowCopy(this.target);
        }
    },
};

function shallowCopy(value){
    if(Array.isArray(value))
        return value.slice();
    if(value._proto_===undefined)
        return Object.assign(Object.create(null),value);
    return Object.assign({},value);
}
```
3. 最后我们就可以利用构造函数createState接受目标对象state生成对象store,然后我们就可以用Proxy代理store,producer是外部传进来的操作函数,当producer对代理对象进行操作的时候我们就可以通过事先设定好的handler进行代理操作了.
``` js
const PROXY_STATE = Symbol('proxy-state');
const handler = {
    get(target,key){
        if(key===PROXY_STATE) return target;
        return target.get(key);
    },
    set(target,key,value){
        return target.set(key,value);
    },
};
//接受一个目标对象和一个操作目标对象的函数
function produce(state,producer){
    const store = new createState(state);
    const proxy = new Proxy(store,handler);
    producer(proxy);
    const newState = proxy[PROXY_STATE];
    if(newState.modified) return newState.copy;
    return newState.target;
}
```
4. 我们可以验证一下,我们看到producer并没有干扰到之前的目标函数.
``` js
const baseState = [
    {
        todo:'learn typescript',
        done:true,
    },
    {
        todo:'Try immer',
        done:false,
    },
];
console.log(baseState);
const nextState = produce(baseState,draftState=>{
    draftState.push({todo:'tweet about it',done:false});
    draftState[1].done = true;
})
console.log(baseState,nextState);

[ { todo: 'learn typescript', done: true },
  { todo: 'Try immer', done: true } ] 
  
  [ { todo: 'learn typescript', done: true },
  { todo: 'Try immer', done: true },
  { todo: 'tweet about it', done: false } ]
```
没问题,我们成功实现了轻量级的 immutable.js,在保证 api友好的同时,做到了比 immutable.js 更小的体积和不错的性能.

# 总结
实际上这个实现就是不可变数据库[immer](https://github.com/immerjs/immer) 的迷你版,我们阉割了大量的代码才缩小到了60行左右来实现这个基本功能,实际上除了get/set操作,这个库本身有has/getOwnPropertyDescriptor/deleteProperty等一系列的实现,我们由于篇幅的原因很多代码也十分粗糙,深入了解可以移步完整源码.
在不可变数据的技术选型上,我查阅了很多资料,也进行过实践,immutable.js 的确十分难用,尽管我用他开发过一个完整的项目,因为任何来源的数据都需要通过 fromJS()将他转化为 Immutable 本身的结构,而我们在组件内用数据驱动视图的时候,组件又不能直接用 Immutable 的数据结构,这个时候又需要进行数据转换,只要你的项目沾染上了 Immutable.js 就不得不将整个项目全部的数据结构用Immutable.js 重构(否则就是到处可见的 fromjs 和 tojs 转换,一方面影响性能一方面影响代码可读性),这个解决方案的侵入性极强,不建议大家轻易尝试.
:::

