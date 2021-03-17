# [JS实现原生api](https://juejin.im/post/5cf4c8ce6fb9a07efc4973a6#heading-0)

::: tip

## ES5实现map()方法

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

## ES5实现数组的reduce()方法

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

## ES6实现call/apply

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

## 实现generator

``` js

// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }

// cb 也就是编译过的 test 函数
function generator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    };

    return {
      next: function() {
        var ret = cb(object);
        if (ret === undefined) return { value: undefined, done: true };
        return {
          value: ret,
          done: false
        };
      }
    };
  })();
}
// 如果你使用 babel 编译后可以发现 test 函数变成了这样
function test() {
  var a;
  return generator(function(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        // 可以发现通过 yield 将代码分割成几块
        // 每次执行 next 函数就执行一块代码
        // 并且表明下次需要执行哪块代码
        case 0:
          a = 1 + 2;
          _context.next = 4;
          return 2;
        case 4:
          _context.next = 6;
          return 3;
		// 执行完毕
        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}
```

## 实现Object.create方法

``` js
function create(proto){
    function F(){};
    F.prototype = proto;
    return new F();
}

```

## 实现Bind方法

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


Function.prototype.bind=function(context,...args){
    if(typeof this!=='function'){
        throw new Error('not a function');
    }
    let fn = this;
    let resFn = function(...args2){
        return fn.apply(this instanceof resFn?this:context,args.contact(args2));
    };
    const DumpFunction = function DumpFunction(){};
    DumpFunction.prototype = this.prototype;
    resFn.prototype = new DumpFunction();
    return resFn;
}

Function.prototype.myFind=function(context){
    if(typeof this!=='function'){
        throw new TypeError('Error');
    }
    var _this = this;
    var args = [...arguments].slice(1)
    //return a function 
    return function F(){
        //due to return a function ,use new F() 
        if(this instanceof F){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args.contact(...arguments))
    }
}
```

## 实现Call

``` js
Function.prototype.call = function(context){
    var context = context||window;
    //add property to context
    // getValue.call(a, 'yck', '24') => a.fn = getValue
    context.fn = this;
    //将context后面的参数取出来
    var args = [...arguments].slice(1);
    /// getValue.call(a, 'yck', '24') => a.fn('yck',24)
    var result = context.fn(...args)
    //删除fn
    delete context.fn;
    return result;
}

```

## 实现apply

``` js
Function.prototype.apply = function(context){
    var context = context||window;
    context.fn = this;
    var result 
    //判断是否存储第二个参数
    //如果存在，就将第二个参数展开
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn();
    }

    delete context.fn;
    return result;
}
```

## 实现new关键字

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

## 实现instanceof的作用

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

function instance_of(L:Object,R:any){
    let protoChain = Object.getOwnProperty(L);
    const LPrototype = R.prototype;
    //最坏的情况递归查到Object.prototype === null
    while(protoChain){
        //两个对象指向同一个内存地址，则为同一个对象
        if(protoChain === LPrototype){
            return true;
        }
        protoChain = Object.getPrototypeOf(protoChain);
    }
    //找到终点还没有找到，则无
    return false;
}
```

## 实现单例模式

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

## 实现防抖效果

核心要点：如果在定时器的时间范围内再次触发，则重新计时

``` js
const debounce = (fn,delay)=>{
    let timer = null;
    return (...args) =>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,args);
        },delay);
    };
};
```

## 实现节流功能

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

## JS数组扁平化(flat)方法总结

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

// 多维数组扁平化
var arr = [1,2,[3,4,5,[6,7,8,[9,10]]]];

function streamroller(arr){
    var res = [];
    for(var i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            res.push.apply(res,steamroller(arr[i]));
        }else{
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(steamroller(arr));

//apply+some
// 利用arr.some判断当数组中还有数组的话，递归调用steamroller2扁平函数(利用apply扁平), 用concat连接，最终返回arr;
function steamroller2(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat.apply([],arr);
    }
    return arr;
}
console.log(steamroller2(arr));

//reduce方法
// 当数组中还有数组的话，递归调用steamroller3扁平函数(利用reduce扁平), 用concat连接，最终返回arr.reduce的返回值;
function steamroller3(arr){
    return arr.reduce((pre,next)=>{
        return pre.concat(Array.isArray(next)?steamroller3(next):next);
    },[])
}

//es6
// 利用arr.some判断当数组中还有数组的话，递归调用flatten扁平函数(利用es6展开运算符扁平), 用concat连接，最终返回arr;
function steamroller4(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr=[].concat(...arr);
    }
    return arr;
}
console.log(steamroller4(arr))
```

## 数组去重排序

方法一：
双层循环，外层循环元素，内层循环时比较
如果有相同的值则跳过，不相同则push进数组

``` js
Array.prototype.distinct = function(){
    var arr = this;
    result = [],i,j,len=arr.length;
    for(i=0;i<len;i++){
        for(j=i+1;j<len;j++){
            if(arr[i]==arr[j]){
                j=++i;
            }
        }
    result.push(arr[i]);
    }
    return result;
}

var array = [1,2,3,4,5,5,4,1,5,2];
console.log(array.distinct());
```

ES6

``` js
[...new Set(arr)].sort()
```

hash数组去重

``` js
    var arr=[1,8,5,6,4,2,3,8,6,7,5,3];
    var n={},r=[];  //n为hash表，r为临时数组
        for(var i=0;i<arr.length;i++){
          if(!n[arr[i]]){ //如果hash表中没有当前项
             n[arr[i]]=true;   //把当前项存入hash表
             r.push(arr[i]);   //把当前项
             r.sort();
             r.severse();
           }
         }
        console.log(r);
```

利用新数组indexof查找

``` js
       var arr=[1,8,5,6,4,2,3,8,6,7,5,3];
       var res=[];
       for(var i=0;i<arr.length;i++){
         if(res.indexOf(arr[i])==-1){
             res.push(arr[i]);
             res.sort();
         }
      }
     console.log(res);
```

## reduce模拟map

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



## [20个你可能不知道的javascript奇巧淫技（内附参考链接）](https://mp.weixin.qq.com/s/qUJ2nB8NxX_gMHw_jMmJoA)

### 1.一句代码实现多维数组扁平化

```
const arr = [1, 2, 3, [4, [5, 6, [7,8]]]];
// 方式1：
console.log(arr.flat(Infinity));
// 方式2：
console.log(arr.join().split(','));
// 方式3：
console.log(arr.toString().split(','));
// 在查阅资料中，博主发现原来join()、toString()函数式可以跨越层级的，于是便有了方式2、 3
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

### 2.一句代码生成一个[1-100]的数组

```
// 方式1
const arr1 = [...Array(100).keys()] 
// 方式2
const arr2 = Array.from(Array(100), (e, i) => i + 1)
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys

### 3.一句代码实现数组去重

```
const arr = [1, 2, 2, 3, 4, 5, 5, 3]
//方式1：
const newArr1 = [...new Set(arr)]
//方式2
const newArr2 = arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

### 4.一句代码求两个数组交集和差集

```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let intersect = new Set([...a].filter(x => b.has(x)));
let difference = new Set([...a].filter(x => !b.has(x)));
```

参考链接

https://es6.ruanyifeng.com/#docs/set-map

### 5.一句代码获取数组最大值和最小值

```
let numbers = [1, 3, 5, 5, 6, -3, 10]
let max = Math.max(...numbers)
let min = Math.min(...numbers)
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max

### 6.一句代码求字符串反转

```
let str = 'hello 秦爱德';
console.log([...str].reverse().join(''))
```

### 7.一句代码统计字符串中相同字符出现的次数

```
let str = 'aaabbbccddeegggggggllllssgjwd';
let strInfo = str.split('').reduce((p, c) => (p[c]++ || (p[c] = 1), p), {});
console.log(strInfo)
```

### 8.短路条件语句 “&&”

```
if (istrue) {
  callback()
}
// 以上代码等同于 istrue && callback()
```

### 9.用操作符 “||” 来设置默认值

```
let a = a || 'default value'
```

### 10.比“||”操作符更优的“??”

```
let a = a ?? 'default value'
// 与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE

### 11.可选链操作符 “?.”

```
let a = {name:'秦爱德'}
console.log(a.type?.job)
// 可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。
在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

### 12.使用 Object.is()作比较

```
Object.is(0 , 0); // true
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is

### 13.剩余参数

```
function sum(...args) {}
// 剩余参数语法允许我们将一个不定数量的参数表示为一个数组。
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters

### 14.隐式转义（字符串转数字）

```
let a = '1';
console.log(Number(a));
console.log(+a);
// 使用隐式转义可更简单快速
```

### 15.删除数组最后两个元素

```
let a = [1,2,4,5];
a.length = a.length - 2;
```

### 16.数字金额千分位格式化

```
let a = 123456789;
console.log(a.toLocaleString('en-US')) //123,456,789
```

参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

### 17.数字补0操作

```
const a1 = (num, len = 2) => (`0${num}`).slice(-len)
const a2 = (num, len = 2) => (`${num}`).padStart( len, '0')
a1(8)
a2(78,5)
```

### 18.双位操作符

```
Math.floor(5.9) === 5  //true
简写后
~~5.9 === 5  //true
// 可以使用双位操作符来替代 Math.floor( )。双否定位操作符的优势在于它执行相同的操作运行速度更快。
```

### 19.小数取整

```
let num = 123.456

// 常用方法
console.log(parseInt(num)); // 123
// 按位或
console.log(num | 0); // 123
// “双按位非”操作符
console.log(~~ num); // 123
// 左移操作符
console.log(num << 0); // 123
// 按位异或
console.log(num ^ 0); // 123
```

### 20.用字符串返回一个键盘图形 惊 😮！！！

```
console.log((_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)())
```