# JavaScript 函数

## 立即执行函数(IIEF)

```js
常见两种方式
1.(function(){...})()
  (function(x){
      console.log(x);
  })(12345)
2.(function(){...}())
  (function(x){
      console.log(x);
  }(12345))

 //作用 不破坏污染全局的命名空间，若需要使用，将其用变量传入如
（function(window){...}(window)）

```

## 高阶函数

高阶函数是对其他函数进行操作的函数，可以将它们作为参数或返回它们。 简单来说，高阶函数是一个函数，它接收函数作为参数或将函数作为输出返回。
例如，Array.prototype.map，Array.prototype.filter 和 Array.prototype.reduce 是语言中内置的一些高阶函数。

## 高阶函数实战

### 1. Array.prototype.map

map（）方法通过将输入数组中的每个元素作为参数来调用提供的回调函数来创建一个新数组。 map（）方法将从回调函数中获取每个返回的值，并使用这些值创建一个新数组。
传递给 map（）方法的回调函数接受 3 个参数：element，index 和 array。

- 例 1#
  假设我们有一个数组，我们想要创建一个新数组，其中的值是原数组的值的两倍。让我们看看使用和不使用高阶函数的解决方案。
  不使用高阶函数

```js
const1 arr1= [1,2,3];
const2 arr2= [];
for(let i=0;i<arr1.length;i++){
    arr2.push(arr[i]*2);
}

console.log(arr2);
```

使用高阶函数

```js
const arr1 = [1, 2.3];
const arr2 = arr1.map(function(item) {
  return item * 2;
});

console.log(arr2);
```

- 例 2#
  假设我们有一个包含不同人的出生年的数组，我们想要创建一个他们年龄的数组。

不使用

```js
const birthYear = [1975, 1997, 2002, 1995, 1985];

const ages = [];
for (let i = 0; i < birthYear.length; i++) {
  let age = 2018 - birthYear[i];
  ages.push(age);
}

console.log(ages);
```

使用高阶函数

```js
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = birthYear.map((year) => 2019 - year);

console.log(ages);
```

### 2. Array.prototype.filter

filter（）方法创建一个新数组，包含着所有通过了回调函数校验的元素。 传递给 filter（）方法的回调函数接受 3 个参数：element，index 和 array。
让我们来下例子：
例 1#
假设我们有一个包含姓名和年龄的对象数组，我们要创建一个只有年龄大于等于 18 的人的对象数组。

不使用

```js
const persons = [
  { name: "perte", age: 16 },
  { name: "mark", age: 18 },
  { name: "jane", age: 14 },
  { name: "john", age: 24 },
  { name: "tony", age: 27 },
];

const fullAge = [];
for (let i = 0; i < persons.length; i++) {
  if (persons[i] > 18) {
    fullAge.push(persons[i]);
  }
}

console.log(fullAge);
```

使用高阶函数

```js
const persons = [
  { name: "perte", age: 16 },
  { name: "mark", age: 18 },
  { name: "jane", age: 14 },
  { name: "john", age: 24 },
  { name: "tony", age: 27 },
];
const fullAge = persons.filter((person) => person.age > 18);
console.log(fullAge);
```

### 3. Array.prototype.reduce

reduce 方法对数组的每个成员执行回调函数，然后产生单个输出值。 reduce 方法接受两个参数：回调函数和可选的 initialValue（初始值）。
reducer 的回调函数接受四个参数：accumulator，currentValue，currentIndex，sourceArray。
如果提供了初始值，则 accumulator 将等于 initialValue，currentValue 将等于数组中的第一个元素。
如果没有提供 initialValue，则 accumulator 将等于数组中的第一个元素，currentValue 将等于数组中的第二个元素。
例 1#
假设我们需要计算数组中值的总和：

```js
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
});

console.log(sum); //25
```

每次在数组中的值上调用 reducer 函数时，accumulator 都会保留从 reducer 函数返回的先前操作的结果，并将 currentValue 设置为数组的当前值。 最后，结果存储在 sum 变量中。
我们能给这函数提供一个初始值：

```js
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);

console.log(sum); //35
```

## reduce

```js
cosnt reduce = (array,fn,initialValue)=>{
    let accumator;
    if(initialValue!=undefined){
        accumator = initialValue;
    }else{
        accumator = array[0];
    }
    if(initialValue === undefined){
        for(let i=0;i<array.length;i++){
            accumator = fn(accumulator,array[i]);
        }
    }else{
        for(const  value of array){
            accumulator =fn(accumulator,value);
        }
    }
    return [accumulator];
}
```

## zip 函数

合并两个给定是数组

```js
const zip = (leftArr,rightArr,fn)=>{
    let index,results = [];
    for(index = 0;index<Math.min(leftArr)>)
}
```

### Function.prototype.apply()

```js
Function.prototype.apply = function(context = window,args){
    if(typeof this!=='function'){
        throw new TypeError('Type Error');
    }
    const fn = Symbol('fn');
    context[fn] = this;

    const res = context[fn](..args);
    delete context[fn];
    return res;
}
```

### Function.prototype.call()

```js
Function.prototype.call = function(context = window, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Type Error");
  }
  const fn = Symbol("fn");
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
```

### Function.prototype.bind()

```js
Function.prototype.bind = function(context,..args){
    if(typeof this!=='function'){
        throw new TypeError('Type Error');
    }
    // 暂存this
    const self = this;
    return function F() {
        // 考虑new
        if(this instanceof F){
            return new self(...args,...arguments);
        }
        return self.apply(context,[...args,...arguments])
    }
}
```

## 创造高阶函数

到目前为止，我们看到了语言中内置的各种高阶函数。 现在让我们来创造自己的高阶函数。
我们假设 JavaScript 没有原生 map 方法。 我们可以自己创造它，从而创建我们自己的高阶函数。
假设我们有一个字符串数组，然后我们希望将此数组转换为整数数组，其中每个元素表示原数组中字符串的长度。

```js
const strArray = ["JavaScript", "Python", "PHP", "Java", "C"];

function mapForEach(arr, fn) {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray.push(fn(arr[i]));
  }
  return newArray;
}
const lenArray = mapForEach(strArray, (item) => item.length);

console.log(lenArray); //[10, 6, 3, 4, 1]
```

<https://blog.bitsrc.io/understanding-higher-order-functions-in-javascript-75461803bad>

### 偏函数

```js
const partial = function(fn, ...partialArgs) {
  let args = partialArgs;
  return function(...fullArguments) {
    let arg = 0;
    for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArguments[args++];
      }
    }
    return fn.apply(null, args);
  };
};
```

### currying（柯里化）

关于 curring 我们首先要聊的是什么是函数柯里化。
curring 又称部分求值。一个 curring 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数中被真正的需要求值的时候，之前传入的所有参数被一次性用于求值。

```js
const curry = (binaryFn) => {
  return function(firstArg) {
    return function(secondArg) {
      return binaryFn(firstArg, secondArg);
    };
  };
};
```

- 多参数函数转换为一元 curry 函数

```js
let curry = (fn) => {
  if (typeof fn != "function") {
    throw Error("No function provided");
  }
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};
```

生硬的看概念不太好理解，我们来看接下来的例子
我们需要一个函数来计算一年 12 个月的消费，在每个月月末的时候我们都要计算消费了多少钱。正常代码如下

```js
// 未柯里化的函数计算开销
let totalCost = 0;
const cost = function(amount, mounth = "") {
  console.log(`第${mounth}月的花销是${amount}`);
  totalCost += amount;
  console.log(`当前总共消费：${totalCost}`);
};
cost(1000, 1); // 第1个月的花销
cost(2000, 2); // 第2个月的花销
// ...
cost(3000, 12); // 第12个月的花销
```

总结一下不难发现，如果我们要计算一年的总消费，没必要计算 12 次。只需要在年底执行一次计算就行，接下来我们对这个函数进行部分柯里化的函数帮助我们理解

```js
// 部分柯里化完的函数
const curringPartCost = (function() {
  // 参数列表
  let args = [];
  return function() {
    /**
     * 区分计算求值的情况
     * 有参数的情况下进行暂存
     * 无参数的情况下进行计算
     */
    if (arguments.length === 0) {
      let totalCost = 0;
      args.forEach((item) => {
        totalCost += item[0];
      });
      console.log(`共消费：${totalCost}`);
      return totalCost;
    } else {
      // argumens并不是数组，是一个类数组对象
      let currentArgs = Array.from(arguments);
      args.push(currentArgs);
      console.log(
        `暂存${arguments[1] ? arguments[1] : ""}月，金额${arguments[0]}`
      );
    }
  };
})();
```

curringPartCost(1000,1)
curringPartCost(100,2)
curringPartCost()
接下来我们编写一个通用的 curring， 以及一个即将被 curring 的函数。代码如下

```js
// 通用curring函数
const curring = function(fn) {
 let args = []
 return function () {
 if (arguments.length === 0) {
  console.log('curring完毕进行计算总值')
  return fn.apply(this, args)
 } else {
  let currentArgs = Array.from(arguments)[0]
  console.log(`暂存${arguments[1] ? arguments[1] : '' }月，金额${arguments[0]}`)
  args.push(currentArgs)
  // 返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文，这有利于匿名函数的递归或者保证函数的封装性
  return arguments.callee
 }
 }
}
// 求值函数
let costCurring = (function() {
 let totalCost = 0
 return function () {
 for (let i = 0; i < arguments.length; i++) {
  totalCost += arguments[i]
 }
 console.log(`共消费：${totalCost}`)
 return totalCost
 }
})()

// 执行curring化
- costCurring = curring(costCurring)
- costCurring(2000, 1)
- costCurring(2000, 2)
- costCurring(9000, 12)
- costCurring()

//es6的函数柯里化
const curry = (fn, ...args1) => (...args2) =>
(arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg))([...args1, ...args2]);

// 调用
const foo = (a, b, c) => a * b * c;
curry(foo)(2, 3, 4); // -> 24
curry(foo, 2)(3, 4); // -> 24
curry(foo, 2, 3)(4); // -> 24
curry(foo, 2, 3, 4)(); // -> 24
```

柯里化是一种模式，其中一个具有多个参数的函数被分解成多个函数，当被串联调用时，这些函数将一次累加一个所需的所有参数。这种技术有助于使用函数式编写的代码更容易阅读和编写。需要注意的是，要实现一个函数，它需要从一个函数开始，然后分解成一系列函数，每个函数接受一个参数。

```js
function curry(fn) {
  if (fn.length === 0) {
    return fn;
  }

  function _curry(depth, args) {
    return function(newArgument) {
      if (depth - 1 === 0) {
        return fn(...args, newArgument);
      }
      return _curry(depth - 1, [...args, newArgument]);
    };
  }
  return _curry(fn.length, []);
}

function add(a, b) {
  return a + b;
}

var curriedAdd = curry(add);
var addFive = curried(5);

var result = [0, 1, 2, 3, 4, 5].map(addFive);
```

```js
function curry(fn: any) {
  return function judgeCurry(...args: any) {
    return fn.length > args.length
      ? (...args1: any) => judgeCurry(...args, ...args1)
      : fn(...args);
  };
}
```

### formatMoney(千分位)

```js
function fmoney(num: number) {
  /* 正则实现 */
  // 参考：https://www.cnblogs.com/lvmylife/p/8287247.html
  let [integer, decimal] = String(num).split(".");
  let regExp = /\d{1,3}(?=(\d{3})+$)/g;
  integer = integer.replace(regExp, "$&,");
  return `${integer}${decimal === undefined ? "" : "." + decimal}`;
  // 正则解释
  // 正则表达式 \d{1,3}(?=(\d{3})+$)  表示前面有1~3个数字，后面的至少由一组3个数字结尾
  // 先行肯定断言(?=)会作为匹配校验，但不会出现在匹配结果字符串里面
  // ?=表示正向引用，可以作为匹配的条件，但匹配到的内容不获取，并且作为下一次查询的开始
  // $& 表示与正则表达式相匹配的内容，具体的可查看 w3school的replace()方法

  /* Number.prototype.toLocaleString()实现 */
  // Number.prototype.toLocaleString()
  // return num.toLocaleString('en');

  /* Intl.NumberFormat().format(number)实现 */
  // Intl.NumberFormat().format(number)
  // return Intl.NumberFormat('en').format(num);

  // reduce 方案
  // let arr = String(num).split('.');
  // let char = arr[0].split('').reverse();
  // let IntStr = char.reduce((acc, value, index) => {
  //     return `${index % 3 === 0 ? String(value)+',' : String(value)}${acc}`;
  // }, '').slice(0, -1);
  // return `${IntStr}${arr[1]? '.'+arr[1] : '' }`;
}
```

### 组合函数 compose

```js
function compose(...args: any[]) {
  return (subArgs: any) => {
    return args.reverse().reduce((acc, func, index) => {
      return func(acc);
    }, subArgs);
  };
}
```

### 函数管道

```js
function pipe(...args:any[]){
    return args(subArgs:any)=>{
        return args.reduce((acc,func,index)=>{
            return func(acc);
        },subArgs);
    }
}
```

### 函数节流

```js
function throttle(fn: any, wait: number) {
  let last: any;
  return function() {
    let now: any = Date.now();
    //初次执行
    if (!last) {
      fn.apply(this, arguments);
      last = now;
      return;
    }
    //以后触发，需要判断是否到延迟
    if (now - last >= wait) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}
```

### 函数防抖

```js
function debounce(func: any, delay: number) {
  //初次触发定时器为null，后面产生一份定时器并记下定时器id
  let timer: any = null;
  return function() {
    let args = arguments;
    //如果已有定时器id，则需要清除,重新开始延迟执行
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      //销毁定时器id，以便下次节流函数触发
      timer = null;
    }, delay);
  };
}
```

JavaScript 中的大多数函数都是用户主动触发的，一般情况下是没有性能问题，但是在一些特殊的情况下不是由用户直接控制。容易大量的调用引起性能问题。毕竟 DOM 操作的代价是非常昂贵的。下面将列举一些这样的场景：
window.resise 事件。
mouse, input 等事件。
上传进度

下面通过高阶函数的方式我们来实现函数节流

```js
/**
 * 节流函数
 * @param {*} fn
 * @param {*} interval
 */
const throttle = function(fn, interval = 500) {
  let timer = null, // 计时器
    isFirst = true; // 是否是第一次调用
  return function() {
    let args = arguments,
      _me = this;
    // 首次调用直接放行
    if (isFirst) {
      fn.apply(_me, args);
      return (isFirst = false);
    }
    // 存在计时器就拦截
    if (timer) {
      return false;
    }
    // 设置timer
    timer = setTimeout(function() {
      console.log(timer);
      window.clearTimeout(timer);
      timer = null;
      fn.apply(_me, args);
    }, interval);
  };
};
// 使用节流
window.onresize = throttle(function() {
  console.log("throttle");
}, 600);

// method2
const throttle = (fn, time) => {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};
```

### 分时函数

节流函数为我们提供了一种限制函数被频繁调用的解决方案。下面我们将遇到另外一个问题，某些函数是用户主动调用的，但是由于一些客观的原因，这些操作会严重的影响页面性能，此时我们需要采用另外的方式去解决。
如果我们需要在短时间内才页面中插入大量的 DOM 节点，那显然会让浏览器吃不消。可能会引起浏览器的假死，所以我们需要进行分时函数，分批插入。

```js
/**
 * 分时函数
 * @param {*创建节点需要的数据} list
 * @param {*创建节点逻辑函数} fn
 * @param {*每一批节点的数量} count
 */
const timeChunk = function(list, fn, count = 1) {
  let insertList = [], // 需要临时插入的数据
    timer = null; // 计时器
  const start = function() {
    // 对执行函数逐个进行调用
    for (let i = 0; i < Math.min(count, list.length); i++) {
      insertList = list.shift();
      fn(insertList);
    }
  };
  return function() {
    timer = setInterval(() => {
      if (list.length === 0) {
        return window.clearInterval(timer);
      }
      start();
    }, 200);
  };
};
// 分时函数测试
const arr = [];
for (let i = 0; i < 94; i++) {
  arr.push(i);
}
const renderList = timeChunk(
  arr,
  function(data) {
    let div = document.createElement("div");
    div.innerHTML = data + 1;
    document.body.appendChild(div);
  },
  20
);
renderList();
```

### 惰性加载函数

在 Web 开发中，因为一些浏览器中的差异，一些嗅探工作总是不可避免的。
因为浏览器的差异性，我们要常常做各种各样的兼容，举一个非常简单常用的例子：在各个浏览器中都能够通用的事件绑定函数。
常见的写法是这样的：

```js
// 常用的事件兼容
const addEvent = function(el, type, handler) {
  if (window.addEventListener) {
    return el.addEventListener(type, handler, false);
  }
  // for IE
  if (window.attachEvent) {
    return el.attachEvent(`on${type}`, handler);
  }
};
```

复制代码这个函数存在一个缺点，它每次执行的时候都会去执行 if 条件分支。虽然开销不大，但是这明显是多余的，下面我们优化一下， 提前一下嗅探的过程：

```js
const addEventOptimization = (function() {
  if (window.addEventListener) {
    return (el, type, handler) => {
      el.addEventListener(type, handler, false);
    };
  }
  // for IE
  if (window.attachEvent) {
    return (el, type, handler) => {
      el.attachEvent(`on${type}`, handler);
    };
  }
})();
```

这样我们就可以在代码加载之前进行一次嗅探，然后返回一个函数。但是如果我们把它放在公共库中不去使用，这就有点多余了。下面我们使用惰性函数去解决这个问题：

```js
// 惰性加载函数
let addEventLazy = function(el, type, handler) {
  if (window.addEventListener) {
    // 一旦进入分支，便在函数内部修改函数的实现
    addEventLazy = function(el, type, handler) {
      el.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEventLazy = function(el, type, handler) {
      el.attachEvent(`on${type}`, handler);
    };
  }
  addEventLazy(el, type, handler);
};
addEventLazy(document.getElementById("eventLazy"), "click", function() {
  console.log("lazy ");
});
```

一旦进入分支，便在函数内部修改函数的实现，重写之后函数就是我们期望的函数，在下一次进入函数的时候就不再存在条件分支语句。

## [数字转中文](https://www.cnblogs.com/liquanjiang/p/8655075.html)

//js 实现将数字 1234 转化为汉字字符串（一千二百三十四）（或大写汉字壹仟贰佰叁拾肆）；

/_阿拉伯数字转中文数字 中文数字的特点： 每个计数数字都跟着一个权位，权位有：十、百、千、万、亿。 以“万”为小节，对应一个节权位，万以下没有节权位。 每个小节内部以“十百千”为权位独立计数。 “十百千”不能连续出现，而“万”和“亿”作为节权位时可以和其他权位连用，如：“二十亿”。 中文数字对“零”的使用要满足以下三条规则： 以 10000 为小节，小节的结尾即使是 0，也不使用零。 小节内两个非 0 数字之间要使用“零”。 当小节的“千”位是 0 时（即：1~999），只要不是首小节，都要补“零”。 算法设计的一些说明： 对“零”的第三个规则，把检测放在循环的最前面并默认为 false，可以自然的丢弃最高小节的加零判断。 单个数字转换用数组实现，var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"]; 节权位同样用数组实现，var chnUnitSection = ["","万","亿","万亿","亿亿"]； 节内权位同样用数组实现，var chnUnitChar = ["","十","百","千"];_/

注意： 下面的方法只针对 1 亿亿以下数字有效，因为在日常项目中，一亿亿已经是非常大的数字，基本上达不到这个量

```js
//如果数字含有小数部分，那么可以将小数部分单独取出
//将小数部分的数字转换为字符串的方法：

var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
var chnUnitChar = ["", "十", "百", "千"];

var numToChn = function(num) {
  var index = num.toString().indexOf(".");
  if (index != -1) {
    var str = num.toString().slice(index);
    var a = "点";
    for (var i = 1; i < str.length; i++) {
      a += chnNumChar[parseInt(str[i])];
    }
    return a;
  } else {
    return;
  }
};

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
function sectionToChinese(section) {
  var str = "",
    chnstr = "",
    zero = false,
    count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
  while (section > 0) {
    var v = section % 10; //对数字取余10，得到的数即为个位数
    if (v == 0) {
      //如果数字为零，则对字符串进行补零
      if (zero) {
        zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
        chnstr = chnNumChar[v] + chnstr;
      }
    } else {
      zero = true; //第一次取余之后，如果再次取余为零，则需要补零
      str = chnNumChar[v];
      str += chnUnitChar[count];
      chnstr = str + chnstr;
    }
    count++;
    section = Math.floor(section / 10);
  }
  return chnstr;
}

//定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零

function TransformToChinese(num) {
  var a = numToChn(num);
  num = Math.floor(num);
  var unitPos = 0;
  var strIns = "",
    chnStr = "";
  var needZero = false;

  if (num === 0) {
    return chnNumChar[0];
  }
  while (num > 0) {
    var section = num % 10000;
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    strIns = sectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr + a;
}

TransformToChinese(12339492835.99302);
//输出    "一百二十三亿三千九百四十九万二千八百三十五点九九三零二"
```

### [JS-this 绑定](https://www.cnblogs.com/penghuwan/p/7356210.html#3870818)

call 的基本使用方式： fn.call(object)
fn 是你调用的函数，object 参数是你希望函数的 this 所绑定的对象。
fn.call(object)的作用： 1.即刻调用这个函数（fn） 2.调用这个函数的时候函数的 this 指向 object 对象

```js
var obj = {
  a: 1, // a是定义在对象obj中的属性
  fire: function() {
    console.log(this.a);
  },
};

var a = 2; // a是定义在全局环境中的变量
var fireInGrobal = obj.fire;
fireInGrobal(); // 输出2
fireInGrobal.call(obj); // 输出1
```

原本丢失了与 obj 绑定的 this 参数的 fireInGrobal 再次重新把 this 绑回到了 obj

但是，我们其实不太喜欢这种每次调用都要依赖 call 的方式，我们更希望：能够一次性 返回一个 this 被永久绑定到 obj 的 fireInGrobal 函数，这样我们就不必每次调用 fireInGrobal 都要在尾巴上加上 call 那么麻烦了。

怎么办呢？ 聪明的你一定能想到，在 fireInGrobal.call(obj)外面包装一个函数不就可以了嘛！

```js
var obj = {
  a: 1, // a是定义在对象obj中的属性
  fire: function() {
    console.log(this.a);
  },
};

var a = 2; // a是定义在全局环境中的变量
var fn = obj.fire;
var fireInGrobal = function() {
  fn.call(obj); //硬绑定
};

fireInGrobal(); // 输出1
```

如果使用 bind 的话会更加简单

```js
var fireInGrobal = function() {
  fn.call(obj); //硬绑定
};
```

可以简化为：

```js
var fireInGrobal = fn.bind(obj);
```

call 和 bind 的区别是：在绑定 this 到对象参数的同时：
1.call 将立即执行该函数
2.bind 不执行函数，只返回一个可供执行的函数

## 数组乱序

```js
function shuffle(arr){
    arr.sort(function(a,b){
        return Math.random()>0.5?-1:1;
    });
    return arr;
}

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
arr.shuffle();

var count = 100000,arr = [];
for(var i=0;i>0.5 ? -1 : 1;){

}
Array.prototype.sort.call(arr,function(a,b){ return Math.random()>.5 ? -1 : 1;};
document.write(arr+'');
var t1 = new Date().getTime();
document.write(t1-t);

//以下方法效率最高
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
var t = new Date().getTime();
arr.shuffle();
document.write(''+arr+'');
var t1 = new Date().getTime();
document.write(t1-t);
```
