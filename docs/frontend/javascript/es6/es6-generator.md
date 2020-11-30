# Generator

```js
function* foo() {
  yield "result1";
  yield "result2";
  yield "result3";
}

const gen = foo();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
```

ES5 下如何实现 generator

```js
"use strict";

var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(foo);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          _context.next = 2;
          return "result1";

        case 2:
          _context.next = 4;
          return "result2";

        case 4:
          _context.next = 6;
          return "result3";

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var gen = foo();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
```

regeneratorRuntime.mark 和 regeneratorRuntime.wrap，这两者其实是 regenerator-runtime 模块里的两个方法，regenerator-runtime 模块来自 facebook 的 regenerator 模块，完整代码在[runtime.js](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)

## regeneratorRuntime.mark()

regeneratorRuntime.mark(foo)这个方法在第一行被调用，我们先看一下 runtime 里 mark()方法的定义

```js
runtime.mark = function(genFun) {
  genFun._proto_ = GeneratorFunctionPrototype;
  genFUn.prototype = Object.create(Gp);
  return genFun;
};
```

mark()方法为生成器函数（foo）绑定了一系列原型

## regeneratorRuntime.wrap()

babel 转化的代码，执行 foo(),其实是执行 wrap()

```js
function wrap(innerFn, outerFn, self) {
  var generator = Object.create(outerFn.prototype);
  var context = new Context([]);
  generaor._invoke = makeInvokeMethod(innerFn, self, context);

  return generator;
}
```

wrap 方法先是创建了一个 generator，并继承 outerFn.prototype；然后 new 了一个 context 对象；makeInvokeMethod 方法接收 innerFn(对应 foo\$)、context 和 this，并把返回值挂到 generator.\_invoke 上；最后 return 了 generator。其实 wrap()相当于是给 generator 增加了一个\_invoke 方法

::: tip
outerFn.prototype 其实就是 genFun.prototype，
context 可以直接理解为这样一个全局对象，用于储存各种状态和上下文：
:::

```js
var ContinueSentinel = {};

var context = {
    done:false,
    method:'next',
    next:0,
    prev:0,
    abrupt:function(type,arg){
        var record ={}；
        record.type = type;
        record.arg = arg;

        return this.complete(record);
    },
    complete:funtion(record,afterLoc){
        if(record.type === 'return'){
            this.rival = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
        }
        return ContinueSentinel;
    },
    stop:function(){
        this.done = true;
        return this.rival;
    }
};
```

::: tip
makeInvokeMethod 的定义如下，它 return 了一个 invoke 方法，invoke 用于判断当前状态和执行下一步，其实就是我们调用的 next()
:::

```js
//以下是编译后的代码
function makeInvokeMethod(innerFn, context) {
  // 将状态置为start
  var state = "start";

  return function invoke(method, arg) {
    // 已完成
    if (state === "completed") {
      return { value: undefined, done: true };
    }

    context.method = method;
    context.arg = arg;

    // 执行中
    while (true) {
      state = "executing";

      var record = {
        type: "normal",
        arg: innerFn.call(self, context), // 执行下一步,并获取状态(其实就是switch里边return的值)
      };

      if (record.type === "normal") {
        // 判断是否已经执行完成
        state = context.done ? "completed" : "yield";

        // ContinueSentinel其实是一个空对象,record.arg === {}则跳过return进入下一个循环
        // 什么时候record.arg会为空对象呢, 答案是没有后续yield语句或已经return的时候,也就是switch返回了空值的情况(跟着上面的switch走一下就知道了)
        if (record.arg === ContinueSentinel) {
          continue;
        }
        // next()的返回值
        return {
          value: record.arg,
          done: context.done,
        };
      }
    }
  };
}
```

::: tip

为什么 generator.\_invoke 实际上就是 gen.next 呢，因为在 runtime 对于 next()的定义中，next()其实就 return 了\_invoke 方法
:::

```js
// Helper for defining the .next, .throw, and .return methods of the
// Iterator interface in terms of a single ._invoke method.
function defineIteratorMethods(prototype) {
  ["next", "throw", "return"].forEach(function(method) {
    prototype[method] = function(arg) {
      return this._invoke(method, arg);
    };
  });
}

defineIteratorMethods(Gp);
```

## 低配实现 & 调用流程分析

```js
function gen$(_context) {
  while (1) {
    switch ((_context.prev = _context.next)) {
      case 0:
        _context.next = 2;
        return "result1";

      case 2:
        _context.next = 4;
        return "result2";

      case 4:
        _context.next = 6;
        return "result3";

      case 6:
      case "end":
        return _context.stop();
    }
  }
}

// 低配版context
var context = {
  next: 0,
  prev: 0,
  done: false,
  stop: function stop() {
    this.done = true;
  },
};

// 低配版invoke
let gen = function() {
  return {
    next: function() {
      value = context.done ? undefined : gen$(context);
      done = context.done;
      return {
        value,
        done,
      };
    },
  };
};

// 测试使用
var g = gen();
g.next(); // {value: "result1", done: false}
g.next(); // {value: "result2", done: false}
g.next(); // {value: "result3", done: false}
g.next(); // {value: undefined, done: true}
```

调用流程：

1. 我们定义的 function\*生成器函数被转化为以上代码
2. 转化后的代码分为三大块：

   - gen\$(\_context)由 yield 分割生成器函数代码而来
   - context 对象用于储存函数执行上下文
   - invoke()方法定义 next()，用于执行 gen\$(\_context)来跳到下一步

3. 当我们调用 g.next()，就相当于调用 invoke()方法，执行 gen\$(\_context)，进入 switch 语句，switch 根据 context 的标识，执行对应的 case 块，return 对应结果
4. 当生成器函数运行到末尾（没有下一个 yield 或已经 return），switch 匹配不到对应代码块，就会 return 空值，这时 g.next()返回{value: undefined, done: true}

从中我们可以看出，Generator 实现的核心在于上下文的保存，函数并没有真的被挂起，每一次 yield，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个 context 对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样

### Generator 实现对象属性 Iteration

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }

  let people = { first: "three", last: "s" };

  for (let [key, value] of objectEntries(people)) {
    console.log(`${three},${value}`);
  }
}
// first : three
// last : s
```

另一种对象的遍历写法：Symbol.iterator

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }

  let people = { first: "three", last: "s" };

  people[Symbol.iterator] = objectEntries;

  for (let [key, value] of people) {
    console.log(`${three},${value}`);
  }
}
// first : three
// last : s
```

## generator 遍历

ES6 提供了 yield\*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield "x";
  yield* foo();
  yield "y";
}

// 等同于
function* bar() {
  yield "x";
  yield "a";
  yield "b";
  yield "y";
}

// 等同于
function* bar() {
  yield "x";
  for (let v of foo()) {
    yield v;
  }
  yield "y";
}

for (let v of bar()) {
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"

function* inner() {
  yield "hello!";
}

function* outer1() {
  yield "open";
  yield inner();
  yield "close";
}

var gen = outer1();
gen.next().value; // "open"
gen.next().value; // 返回一个遍历器对象
// inner {<suspended>}
// __proto__: Generator
// [[GeneratorLocation]]: VM43:1
// [[GeneratorState]]: "suspended"
// [[GeneratorFunction]]: ƒ* inner()
// [[GeneratorReceiver]]: Window
// [[Scopes]]: Scopes[2]
gen.next().value; // "close"

function* outer2() {
  yield "open";
  yield* inner();
  yield "close";
}

var gen = outer2();
gen.next().value; // "open"
gen.next().value; // "hello!"
gen.next().value; // "close"
```

yield\*后面的 Generator 函数（没有 return 语句时），等同于在 Generator 函数内部，部署一个 for...of 循环。

```js
function* concat(iterator1, iterator2) {
  yield* iterator1;
  yield* iterator2;
}

// 等价于

function* concat(iterato1, iterator2) {
  for (var value of iterator1) {
    yield value;
  }
  for (var value of iterator2) {
    yield value;
  }
}
```

上面代码说明，yield*后面的 Generator 函数（没有 return 语句时），不过是 for...of 的一种简写形式，完全可以用后者替代前者。反之，在有 return 语句时，则需要用 var value = yield* iterator 的形式获取 return 语句的值。

如果 yield\*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。

```js
function* gen() {
  yield* ["a", "b", "c"];
}

gen().next(); // { value:"a", done:false }
```

上面代码中，yield 命令后面如果不加星号，返回的是整个数组，加了星号就表示返回的是数组的遍历器对象。

实际上，任何数据结构只要有 Iterator 接口，就可以被 yield\*遍历。

```js
let read = (function*() {
  yield "hello";
  yield* "hello";
})();

read.next().value; // "hello"
read.next().value; // "h"
```

上面代码中，yield 表达式返回整个字符串，yield*语句返回单个字符。因为字符串具有 Iterator 接口，所以被 yield*遍历。

如果被代理的 Generator 函数有 return 语句，那么就可以向代理它的 Generator 函数返回数据。

```js
function* foo() {
  yield 2;
  yield 3;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 4;
}

var it = bar();

it.next();
// {value: 1, done: false}
it.next();
// {value: 2, done: false}
it.next();
// {value: 3, done: false}
it.next();
// "v: foo"
// {value: 4, done: false}
it.next();
// {value: undefined, done: true}
```

上面代码在第四次调用 next 方法的时候，屏幕上会有输出，这是因为函数 foo 的 return 语句，向函数 bar 提供了返回值。

```js
function* genFuncWithReturn() {
  yield "a";
  yield "b";
  return "The result";
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

[...logReturned(genFuncWithReturn())];
// The result
// 值为 [ 'a', 'b' ]
```

上面代码中，存在两次遍历。第一次是扩展运算符遍历函数 logReturned 返回的遍历器对象，第二次是 yield\*语句遍历函数 genFuncWithReturn 返回的遍历器对象。这两次遍历的效果是叠加的，最终表现为扩展运算符遍历函数 genFuncWithReturn 返回的遍历器对象。所以，最后的数据表达式得到的值等于[ 'a', 'b' ]。但是，函数 genFuncWithReturn 的 return 语句的返回值 The result，会返回给函数 logReturned 内部的 result 变量，因此会有终端输出。

yield\*命令可以很方便地取出嵌套数组的所有成员。

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = ["a", ["b", "c"], ["d", "e"]];

for (let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e

// // [...iterTree(tree)] // ["a", "b", "c", "d", "e"]
```

使用 yield\*语句遍历完全二叉树。

```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[["a"], "b", ["c"]], "d", [["e"], "f", ["g"]]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result;
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

generator 实现对象属性

```js
function* gen() {
  this.a = 1;
  yield (this.b = 2);
  yield (this.c = 3);
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}

f.a; // 1
f.b; // 2
f.c; // 3
```

## generator 应用

`(1) 异步操作`

Generator 函数的暂停执行的效果，意味着可以把异步操作写在 yield 表达式里面，等到调用 next 方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 yield 表达式下面，反正要等到调用 next 方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```js
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response) {
    it.next(response);
  });
}

var it = main();
it.next();
```

`读取本地文件`

```js
function* numbers() {
  let file = new FileReader("numbers.txt");
  try {
    while (!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
```

(2) 控制流管理

```js
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(
    function(value4) {
      // Do something with value4
    },
    function(error) {
      // Handle any error from step1 through step4
    }
  )
  .done();
```

上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程。

```js
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```

然后，使用一个函数，按次序自动执行所有步骤。

```js
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}
```

注意，上面这种做法，只适合同步操作，即所有的 task 都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。如果要控制异步的操作流程，详见后面的《异步操作》一章。

下面，利用 for...of 循环会自动依次执行 yield 命令的特性，提供一种更一般的控制流管理的方法。

```js
let steps = [step1Func, step2Func, step3Func];

function* iterateSteps(steps) {
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i];
    yield step();
  }
}
```

上面代码中，数组 steps 封装了一个任务的多个步骤，Generator 函数 iterateSteps 则是依次为这些步骤加上 yield 命令。

将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。

```js
let jobs = [job1, job2, job3];

function* iterateJobs(jobs) {
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}
```

(3) 部署 iterator 接口

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

上述代码中，myObj 是一个普通对象，通过 iterEntries 函数，就有了 Iterator 接口。也就是说，可以在任意对象上部署 next 方法。

下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口。

```js
function* makeSimpleGenerator(array) {
  var nextIndex = 0;

  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(["yo", "ya"]);

gen.next().value; // 'yo'
gen.next().value; // 'ya'
gen.next().done; // true
```

## 参考

1. [Generaotr 实现](https://juejin.im/post/5e3b9ae26fb9a07ca714a5cc)
2. [ECMAScript6 入门](https://es6.ruanyifeng.com/#docs/generator)
