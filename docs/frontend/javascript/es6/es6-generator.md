# Generator

``` js
function* foo(){
    yield 'result1'
    yield 'result2'
    yield 'result3'
}

const gen = foo()
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
```

ES5下如何实现generator

``` js
"use strict";

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(foo);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'result1';

        case 2:
          _context.next = 4;
          return 'result2';

        case 4:
          _context.next = 6;
          return 'result3';

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

regeneratorRuntime.mark和regeneratorRuntime.wrap，这两者其实是 regenerator-runtime 模块里的两个方法，regenerator-runtime 模块来自facebook的 regenerator 模块，完整代码在[runtime.js](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)

## regeneratorRuntime.mark()

regeneratorRuntime.mark(foo)这个方法在第一行被调用，我们先看一下runtime里mark()方法的定义

``` js
runtime.mark = function(genFun){
    genFun._proto_ = GeneratorFunctionPrototype;
    genFUn.prototype = Object.create(Gp);
    return genFun;
};
```

mark()方法为生成器函数（foo）绑定了一系列原型

## regeneratorRuntime.wrap()

babel转化的代码，执行foo(),其实是执行wrap()

``` js
function wrap(innerFn,outerFn,self){
    var generator = Object.create(outerFn.prototype);
    var context = new Context([]);
    generaor._invoke = makeInvokeMethod(innerFn,self,context);

    return generator;
}
```

wrap方法先是创建了一个generator，并继承outerFn.prototype；然后new了一个context对象；makeInvokeMethod方法接收innerFn(对应foo$)、context和this，并把返回值挂到generator._invoke上；最后return了generator。其实wrap()相当于是给generator增加了一个_invoke方法

::: tip
outerFn.prototype其实就是genFun.prototype，
context可以直接理解为这样一个全局对象，用于储存各种状态和上下文：
:::

``` js
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
makeInvokeMethod的定义如下，它return了一个invoke方法，invoke用于判断当前状态和执行下一步，其实就是我们调用的next()
:::

``` js
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
        arg: innerFn.call(self, context)    // 执行下一步,并获取状态(其实就是switch里边return的值)
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
          done: context.done
        };
      }
    }
  };
}
```

::: tip

为什么generator._invoke实际上就是gen.next呢，因为在runtime对于next()的定义中，next()其实就return了_invoke方法
:::

``` js
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

``` js
function gen$(_context){
    while(1){
        switch(_context.prev = _context.next){
            case 0:
                _context.next = 2;
                return 'result1';

            case 2:
                _context.next = 4;
                return 'result2';

            case 4:
                _context.next = 6;
                return 'result3';

            case 6:
            case "end":
                return _context.stop();
        }
    }
}

// 低配版context  
var context = {
  next:0,
  prev: 0,
  done: false,
  stop: function stop () {
    this.done = true
  }
}

// 低配版invoke
let gen = function() {
  return {
    next: function() {
      value = context.done ? undefined: gen$(context)
      done = context.done
      return {
        value,
        done
      }
    }
  }
}

// 测试使用
var g = gen()
g.next()  // {value: "result1", done: false}
g.next()  // {value: "result2", done: false}
g.next()  // {value: "result3", done: false}
g.next()  // {value: undefined, done: true}

```

调用流程：

1. 我们定义的function*生成器函数被转化为以上代码
2. 转化后的代码分为三大块：
   * gen$(_context)由yield分割生成器函数代码而来
   * context对象用于储存函数执行上下文
   * invoke()方法定义next()，用于执行gen$(_context)来跳到下一步

3. 当我们调用g.next()，就相当于调用invoke()方法，执行gen$(_context)，进入switch语句，switch根据context的标识，执行对应的case块，return对应结果
4. 当生成器函数运行到末尾（没有下一个yield或已经return），switch匹配不到对应代码块，就会return空值，这时g.next()返回{value: undefined, done: true}

从中我们可以看出，Generator实现的核心在于上下文的保存，函数并没有真的被挂起，每一次yield，其实都执行了一遍传入的生成器函数，只是在这个过程中间用了一个context对象储存上下文，使得每次执行生成器函数的时候，都可以从上一个执行结果开始执行，看起来就像函数被挂起了一样

## 参考

1. [Generaotr实现](https://juejin.im/post/5e3b9ae26fb9a07ca714a5cc)