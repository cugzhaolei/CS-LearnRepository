# [JS实现原生api](https://juejin.im/post/5cf4c8ce6fb9a07efc4973a6#heading-0)

::: tip
##  ES5实现map()方法
``` js
Array.prototype.MyMap = function(fn,context){
    var arr = Array.prototype.slice.call(this); //es5 不需要用...展开
    var mappedArr = [];
    for(var i =0;i<arr.length;i++){
        if(!arr.hasOwnProperty(i))continue;
        mappedArr.push(fn.call(context,arr[i],i,this))
    }
    return mappedArr;
}
```
##  ES5实现数组的reduce()方法
``` js
Array.prototype.myReduce = function(fn,initialValue){
    var arr = Array.prototype.slice.call(this);
    var res,startIndex;
    res = intitalValue?initialValue:arr[0];
    startIndex = intitalValue?0:1;
    for(var i=0;i<arr.length;i++){
        res = fn.call(null,res,arr[i],i,this);
    }
    return res;
}
```
##  ES6实现call/apply
``` js
Function.prototype.myCall = function(context = window,..args){
    let func = this;
    let fn = Symbol("fn");
    conext[fn] = func;

    let res = context[fn](...args); //重点代码 利用this指向，相当于context.call(...args)
    delete context[fn];
    return res;
}
```

##  实现Object.create方法
``` js
function create(proto){
    function F(){};
    F.prototype = proto;
    return new F();
}

```

##  实现Bind方法
核心要点：
1、对于普通函数，绑定this指向
2、对于构造函数，要保证原函数的原型对象上的属性不能丢失
``` js
Function.prototype.bind = function(context,...args){
    let self = this; // this表示的调用bind函数
    let fBound = function(){
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        return self.apply(this instanceof fBound?this:context||window,args);
    }

    fBound.prototype = Object.create(this.prototype); //保证原函数的原型对象上的属性不丢失
    return fBound;
}
```
##  实现new关键字
核心要点:

1.创建一个全新的对象，这个对象的__proto__要指向构造函数的原型对象
2.执行构造函数
3.返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象
``` js
function myNew(fn,...args){
    let instance = Object.create(fn.prototype);
    let res = fn.apply(instance,args);
    return typeof res === 'object'?res:instance;
}
```

##  实现instanceof的作用
核心要点：原型链的向上查找
``` js
function myInstanceOf(left,rigth){
    let proto = Object.getPrototype(left);
    while(true){
        if(proto==null) return false;
        if(proto==right.prototype) return true;
        proto = Object.getPrototype(proto);
    }
}
```

##  实现单例模式
核心要点：使用闭包和proxy拦截
``` js
function proxy(fun){
    let instance;
    let handler = {
        constructor(target,args){
            if(!instance){
                instance = Reflect.constructor(fun,args);
            }
            return instance;
        }
    }
    return new Proxy(func,handler);
}
```

##  实现防抖效果
核心要点：如果在定时器的时间范围内再次触发，则重新计时

``` js
const debounce = (fn,delay)=>{
    let timer = null;
    return (..args) =>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    };
};

```

##  实现节流功能
核心要点：如果在定时器时间的范围内再次触发，则不予理睬，等当前定时器完成，才能启动下一个定时器
``` js
const throttle = (fn,delay=500)=>{
    let flag = true;
    return (...args)=>{
        if(!flag) return;
        flag = false;
        setTimeout(()=>{
            fn.apply(this,args);
            flag =true;
        },delay);
    };
};
```

##  JS数组扁平化(flat)方法总结
需求:多维数组=>一维数组
``` js
let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary);

//第0中处理:直接的调用
arr_flat = arr.flat(Infinity);

//第一种处理
ary = str.replace(/(\[|\])/g, '').split(',');
// (/(\[|\])/g)

//第三种处理：递归处理
let result = [];
let fn = function(ary){
    for(let i=0;i<ary.length;i++){
        let item = ary[i];
        if(Array.isArray(ary[i])){
            fn(item);
        }else{
            result.push(item);
        }
    }
}

//第四种处理：用 reduce 实现数组的 flat 方法
function flatten(ary){
    return ary.reduce((pre,cur)=>
    {
        return pre.contact(Array.isArray(cur)?flatten(cur):cur);
    },[]);
}

let ary = [1, 2, [3, 4], [5, [6, 7]]]
console.log(flatten(ary))

//第五种处理：扩展运算符
while(ary.some(Array.isArray)){
    ary = [].contact(...ary);
}

```
##  reduce模拟map
``` js
// 别忘了map的第二个参数
Array.prototype._map = function(fn, context = window) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${typeof fn} is not a function`);
  }
  return this.reduce((prev, val, index, arr) => {
    return prev.concat(fn.call(context, val, index, arr));
  }, []);
};
```
:::
## [github](https://github.com/wb421768544/dream/blob/master/fe/模拟实现各种东东/数组相关.md)

``` js
var arr1 = [1,2.[3,4]];
arr1.flat();

arr1.reduce((acc,val)=>acc.contact(val),[]);  //[1,2,3,4]

//or 
const flatSingle = arr=>[].concat(...arr);

// 不使用递归，使用 stack 无限反嵌套多层嵌套数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入 original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 使用 reverse 恢复原数组的顺序
  return res.reverse();
}
flatten(arr1);// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// 使用 reduce、concat 和递归无限反嵌套多层嵌套的数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
flattenDeep(arr1);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

```
[MDN实现](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

## [Immutable.js](https://www.jianshu.com/p/0fa8c7456c15)

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。

## [结构共享](https://zhuanlan.zhihu.com/p/27133830?group_id=851585269567213568)