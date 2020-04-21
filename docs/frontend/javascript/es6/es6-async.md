# async/await

ES2017 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。

* async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
想较于 Generator，Async 函数的改进在于下面四点：

* 内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样；
* 更好的语义。async 和 await 相较于 * 和 yield 更加语义化；
* 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）；
* 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator对象方便，可以直接使用 then() 方法进行调用。

``` js
//promise实例
const makeRequest = ()=>{
    return getJson()
    .then(data=>{
        if(data.needsAnotherRequest){
            return makeAnotherRequest(data)
            .then(moreData=>{
                console.log(moreData);
                return moreData;
            })
        }else{
            console.log(data);
            return data;
        }
    })
}

//async/await
const makeRequest = async()=>{
    const data = await getJson()
    if(data.needsAnotheRRequest){
        const moreData = await makeAnotherRequest(data);
        console.log(moreData);
        return moreData;
    }else{
        console.log(data);
        return data;
    }
}
```

## [阮一峰大神的ES6入门](http://es6.ruanyifeng.com/#docs/async)

返回thenable对象

``` js
class sleep{
    constructor(timeout){
        this.timeout = timeout;
    }
    then(resolve,reject){
        const startTime = Date.now();
        setTimeout(
            ()=>resolve(Date.now()-startTime),
        this.timeout
        );
    }
}
(async ()=>{
    const sleep = await new Sleep(1000);
    console.log(sleepTime);
})();
```

javascript 休眠

``` js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();
```

任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

``` js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

## 错误处理

如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

``` js
async function f(){
    await new Promise(function(resolve,reject){
        throw new Error("出错了");
    });
}
f()
.then(v=>console.log(v))
.catch(e=>console.log(e))
//Error 出错了
```

防止出错的方法，也是将其放在try...catch代码块之中。

``` js
async function f(){
    try{
        await new Promiseh(function(resolve,reject){
            throw new Error('出错了');
        });
    }catch(e){

    }
    return await('hello world');
}
```

## 实现原理

将Generator函数和自动执行器包装在一个函数中

``` js
async function fn(args){
    //something to do
}

function fn(args){
    return spawn(function* (){
        //
    });
}
```

spawn 是自动执行器 简单实现如下：

``` js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## [手写Async](https://juejin.im/post/5e79e841f265da5726612b6e)

``` js
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function() {
  
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments)

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult
        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value)
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resolve的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next()
            //
            //      // 此时done为true了 整个promise被resolve了 
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val)
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err)
            },
          )
        }
      }
      step("next")
    })
  }
}
```
