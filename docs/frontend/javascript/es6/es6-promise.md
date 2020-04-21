# [Promise实现原理](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)

## [ECMAScript6入门](http://es6.ruanyifeng.com/#docs/promise)

## [Promise all() race() allSettled()](https://juejin.im/post/5d534ff16fb9a06b1027209c)

## 1.基本结构

::: tip

``` js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('FULLFILLED’)
    },1000)
})
```

- 构造函数Promise必须接受一个函数作为参数，我们称该函数为handle，handle又包含resolve和reject两个参数，它们是两个函数。
- 定义一个判断变量是否为函数的方法

``` js
const isFunction = variable=>typeof variable==='function';
```

- 新建一个MyPromise的Class，接受一个handle作为参数

``` js
class MyPromise{
    constructor(handle){
        if(!isFunction(handle)){
            throw new Error('MyPromise must accept a function as a parameter')
        }
    }
}
```

:::

## 2.Promise状态和值

::: tip
<b>Promise</b>存在以下三种状态

- Pending(进行中)
- Fullfilled(已成功)
- Rejected(已失败)

- Promise的值是指状态改变时传递给回调函数的值
- 上文中handle函数包含 resolve 和 reject 两个参数，它们是两个函数，可以用于改变 Promise 的状态和传入 Promise 的值

``` js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('FULLFILLED')
    },1000)
})
```

这里 resolve 传入的 "FULFILLED" 就是 Promise 的值

- resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
- reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
- resolve 和 reject 都可以传入任意类型的值作为实参，表示 Promise 对象成功（Fulfilled）和失败（Rejected）的值
了解了 Promise 的状态和值，接下来，我们为 MyPromise 添加状态属性和值
:::

::: danger
有限状态：

- Pending->Fullfilled
- Pending->Rejected
:::

::: tip

``` js
//定义三个常量 用于标记Promise对象的三种状态
const PENDIND = 'PENDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';

//再为MyPromise添加状态和值，并添加状态改变的执行逻辑
Class MyPromise{
    constructor(handle){
        if(!isFunction(handle)){
            throw new Error('MyPromise must accept a function as a parameter')
        }

        //添加状态
        this._status = PEDNING;
        //添加状态
        this._value = undefined;
        try{
            handle(this._resolve.bind(this),this._reject.bind(this)
        }catch(err){
            this._reject(err);
        }
    }

    //添加resolve时执行的函数
    _resolve(val){
        if(this._status!==PENDING) return
        this._status = FULFILLED;
        this._value = val;
    }
    //添加reject时执行的函数
    _reject(err){
        if(this._status!==PENDING) return
        this._status = REJECTED;
        this._value = err;
    }

}

```

:::

## 3.Promise的then方法

::: tip
Promise 对象的 then 方法接受两个参数：

``` js
promise.then(onFulfilled,onRejected)
```

参数可选
onFulfilled和onRejected都是可选参数

- 如果 onFulfilled 或 onRejected 不是函数，其必须被忽略

* onFulfilled 特性

如果 onFulfilled 是函数：

- 当 promise 状态变为成功时必须被调用，其第一个参数为 promise 成功状态传入的值（resolve 执行时传入的值）
- 在 promise 状态改变前其不可被调用
- 其调用次数不可超过一次

* onRejected 特性
如果 onRejected 是函数：
  - 当 promise 状态变为失败时必须被调用，其第一个参数为 promise 失败状态传入的值（reject 执行时传入的值）
  - 在 promise 状态改变前其不可被调用
  - 其调用次数不可超过一次

* 多次调用
then 方法可以被同一个 promise 对象调用多次
  - 当 promise 成功状态时，所有 onFulfilled 需按照其注册顺序依次回调
  - 当 promise 失败状态时，所有 onRejected 需按照其注册顺序依次回调
* 返回
then 方法必须返回一个新的 promise 对象

``` js
promise2 = promise1.then(onFulfilled,onRejected);
```

promise支持链式调用

``` js
promise1.then(onFulfilled1,onRejected1).then(onFulfilled2,onRejected2);
```

这里涉及到 Promise 的执行规则，包括“值的传递”和“错误捕获”机制：

1. 如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)

   - 若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
   - 若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

``` js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },1000)
})
let promise2 = promise.then(res=>{
    //返回一个普通值
    return 'this is a simple value'
})

promise2.then(res=>{
    console.log(res);//1s后打印出 this is a simple value
})
```

``` js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve()
    },1000)
})

let promise2 = promise.then(res=>{
    //返回一个promise对象
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('this is a promise')
        },2000)
    })
})

promise2.then(res=>{
    console.log(res)//3s 后打印出 this is a promise
})
```

2. 如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e，例如：

``` js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('success')
    },1000)
})
let promise2 = promise1.then(res=>{
    setTimeout(()=>{
        throw new Error("这里抛出一个异常e")
    })
})

promise2.then(res=>{
    console.log(res)
},err=>{
    console.log(err)  //1秒后打印出: 这里抛出一个异常e
})
```

3. 如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值，例如：

``` js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('success')
    },1000)
})
promise2 = promise1.then('这里的onFulfilled本来就是一个函数，但现在不是')
promise2.then(res=>{
    console.log(res) // 1s 后打印出: success
},err=>{
    console.log(err)
})
```

4. 如果 onRejected 不是函数且 promise1 状态为失败（Rejected），promise2必须变为失败（Rejected） 并返回 promise1 失败的值，例如：

``` js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('fail')
    },1000)
})
promise2 = promise1.then(res=>res,'这里的onRejected本是一个函数，但是现在不是')
promise2.then(res=>{
    console.log(res)
},err=>{
    console.log(err) //1s后打印出: fail
})
```

根据上面的规则，我们来为 完善 MyPromise

修改 constructor : 增加执行队列

由于 then 方法支持多次调用，我们可以维护两个数组，将每次 then 方法注册时的回调函数添加到数组中，等待执行

``` js
constructor(handle){
    if(!isFunction(handle)){
        throw new Error('MyPromise must accept a function as a parameter')
    }
    //添加状态
    this._status = PENDING;
    //添加状态
    this._value = undefined;
    //添加成功回调函数队列
    this._fulfilledQueues = [];
    //添加失败回调函数队列
    this._rejectedQueues = [];
    //执行handler
    try{
        handle(this._resolve.bind(this),this._reject.bind(this))
    }catch(err){
        this._reject(err)
    }

}
```

* 添加then方法

  - 首先，then 返回一个新的 Promise 对象，并且需要将回调函数加入到执行队列中

``` js
//添加then方法
then(onFulfilled,onRejected){
    const {_value,_status} = this;
    switch(_status){
        //当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
            this._fulfilledQueues.push(onFulfilled);
            this._rejectedQueues.push(onRejected);
            break;
        //当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
            onFulfilled(_value);
            break;
        case REJECTED:
            onRejected(_value);
            break;
    }
    //返回一个新的Promise对象
    return new MyPromise((onFulfilledNext,onRejectedNext)=>{

    })
}

```

那返回的新的 Promise 对象什么时候改变状态？改变为哪种状态呢？

根据上文中 then 方法的规则，我们知道返回的新的 Promise 对象的状态依赖于当前 then 方法回调函数执行的情况以及返回值，例如 then 的参数是否为一个函数、回调函数执行是否出错、返回值是否为 Promise 对象。

- 进一步完善then方法

``` js
//添加then方法
then(onFulfilled,onRejected){
    const{_value,_status} = this;
    //返回一个新的Promise对象
    return new MyPromise((onFulfilledNext,onRejectedNext)=>{
        //封装一个成功时执行的函数
        let fulfilled = value=>{
            try{
                if(!isFunction(onFulfilled)){
                    onFulfilledNext(value)
                }else{
                    let res = onFulfilled(value);
                    if(res instanceof MyPromise){
                        //如果当前回调函数返回MyPromise对象，必须等待状态改变后再执行下一个函数
                        res.then(onFulfilledNext,onRejectedNext)
                    }else{
                        //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个回调函数
                        onFulfilledNext(res);
                    }
                }
            }catch(err){
                //如果执行函数出错，新的promise对象的状态为失败
                onRejectedNext(res);
            }
        }

        //封装一个失败时执行的函数
        let rejected = error=>{
            try{
                if(!isFunction(onRejected)){
                    onRejectedNext(error)
                }else{
                    let res = onRejected(error);
                    if(res instanceof MyPromise){
                        //如果当前回调函数返回MyPromise对象，必须等待其状态改变后再执行下一个函数
                        res.then(onFulfilledNext,onRejectedNext)
                    }else{
                        //否则会将返回结果直接作为参数，传入下一个then的回调函数，并理解执行下一个then的回调函数
                        onFulfilledNext(res)
                    }
                }
            }catch(err){
                //执行函数出错，新的promise对象为失败
                onRejectedNext(err)
            }
        }
        switch(_status){
        //当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
            this._fulfilledQueues.push(onFulfilled);
            this._rejectedQueues.push(onRejected);
            break;
        //当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
            onFulfilled(_value);
            break;
        case REJECTED:
            onRejected(_value);
            break;
        }
    })
}

```

* 接着修改 _resolve 和 _reject ：依次执行队列中的函数

当 resolve 或 reject 方法执行时，我们依次提取成功或失败任务队列当中的函数开始执行，并清空队列，从而实现 then 方法的多次调用，实现的代码如下：

``` js
//添加resolved时执行的函数
_resolve(val){
    if(this._status!==PENDING)return

    //依次执行成功队列中的函数，并清空队列
    const run=()=>{
        this._status = FULFILLED;
        this._value = val;
        let cb;
        while(cb= this._fulfilledQueues.shift()){
            cb(val)
        }
    }
    //为了支持同步的promise，这里采用异步调用
    setTimeout(()=>run(),0)
}
//添加reject时执行的函数
_rejected(err){
    if(this._status!==PEDNING) return;
    const run = ()=>{
        this._status = REJECTED;
        this._value = err;
        let cb;
        while(cb=this._rejectedQueues.shift()){
            cb(err)
        }
    }
    //为了支持同步的Promise，这里采用异步调用
    setTimeout(run,0)
}

```

这里还有一种特殊的情况，就是当 resolve 方法传入的参数为一个 Promise 对象时，则该 Promise 对象状态决定当前 Promise 对象的状态。

``` js
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})

```
上面代码中，p1 和 p2 都是 Promise 的实例，但是 p2 的resolve方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。
注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是Pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 Fulfilled 或者 Rejected，那么 p2 的回调函数将会立刻执行。

我们来修改_resolve来支持这样的特性

``` js
//添加resolve时执行的函数
_resolve(val){
    const run = ()=>{
        if(this._status!==PENDING) reutrn;
        //依次执行成功队列中的函数，并定义队列
        const runFulfilled = (value)=>{
            let cb;
            while(cb=this._fulfilledQueues.shift()){
                cb(value);
            }
        }
        //依次执行失败队列中的函数
        const runRejected = (error)=>{
            let cb;
            while(cb=this._rejectedQueues.shift()){
                cb(error)
            }
        }
        //如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        //当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        if(val instance of MyPromise){
            val.then(val=>{
                this._value = value;
                this._status = FULFILLED;
                runFulfilled(value)
            },err=>{
                this._value = err;
                this._status = REJECTED;
                runRejected(err);
            })
        }else{
            htis._value = err;
            this._status = FULFILLED;
            runFulfiles(val);
        }
    }
    //为了支持同步的Promise.这里采用异步调用
    setTimeout(run,0)
}

```

这样一个Promise就基本实现了，现在我们来加一些其它的方法

* catch方法
相当于调用then方法，但只传入Rejected状态的回调函数

``` js
catch(onRejected){
    return this.then(undefined,onRejected);
}
```

* 静态resolve方法
``` js
static resolve(value){
    //如果参数是MyPromise实例，直接返回这个实例
    if(value instanceof MyPromise) return value;
    return new MyPromise(resolve=>resolve(value));
}
```

* 静态 reject 方法
``` js
//添加静态reject方法
static reject(value){
    return new MyPromise((resolve,reject)=>reject(value))
}
```
* 静态all方法

``` js
static all(list){
    return new MyPromise((resolve,reject)=>{
        //返回值集合
        let values = [];
        let const = 0;
        for(let [i,p] of list.entries()){
            //数组参数如果不是promise实例，先调用MyPromise resolve 
            this.resolve(p).then(res=>{
                values[i] = res;
                count++;
                //所有状态都变成fulfilled时返回MyPromise状态就变成fulfilled
                if(count===list.length) resolve(value)
            },err=>{
                //有一个被rejected时返回的MyPromise状态就变成rejected
                reject(err)
            })
        }
    })
}

```

* 静态race方法

``` js
static race(list){
    return new MyPromise((resovle,reject)=>{
        for(let p of list){
            //只要有一个实例率先该边状态，新的MyPromise的状态就跟着改变
            this.resolve(p).then(res=>{
                resolve(res)
            },err=>{
                reject(err)
            })
        }
    })
}
```

* finally方法

- finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

``` js
finally(cb){
    return this.then(value=>MyPromise.resolve(cb()).then(()=>value),reason=>MyPromise.resolve(cb().then(()=>{throw reason})))
}

```
这样一个完整的 Promsie 就实现了，大家对 Promise 的原理也有了解，可以让我们在使用Promise的时候更加清晰明了。

:::

## 4.完整Promise代码

::: tip

``` js
const isFunction=variable=>typeof variable==='function';
//定义Promise的三种状态
const PEDNING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise{
    constructor(handle){
        if(!isFunction(handle)){
            throw new Error('MyPromise must accept a function as a parameter')
        }
        //添加状态
        this._status = PENDING;
        //添加状态
        this._value = undefined;
        //添加成功回调函数
        this._fulfilledQueues = [];
        //添加失败回调函数队列
        this._rejectedQueues = [];
        //执行handle
        try{
            handle(this.resolve.bind(this),this._rejected.bind(this))
        }catch(err){
            this._reject(err);
        }
    }
    //添加resolved时执行的函数
    _resolve(val){
        const run =()=>{
                if(this._status!==PENDING) return;
                //依次执行成功队列中的函数，并清空队列
                const runFulfilled = (value)=>{
                let cb;
                while(cb=this._fulfilledQueues.shift()){
                    cb(value);
                    }
                }
                //依次执行失败队列中的函数，并清空队列
                const runRejected=(error)=>{
                    let cb;
                    while(cb=this._rejectedQueues.shift()){
                        cb(error);
                    }
                }
                /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
                当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态*/
                if(val instanceof MyPromise){
                    val.then(value=>{
                        this._value=value;
                        this._status = FULFILLED;
                        runFulfilled(value);
                    },err=>{
                        this._value =err;
                        this._status = REJECTED;
                        runRejected(err);
                    })
                }else{
                    this._value = val;
                    this._status = FULFILLED;
                    runFulfilled(val);
                }
            }
            //为了支持同步的promise，这里采用异步调用
            setTimeout(run,0)
        }
        //添加reject时执行的函数
        _rejected(err){
            if(this._status!==PENDING) return;
            //依次执行失败队列中的函数，并清空队列
            const run =()=>{
                this._status = REJECTED;
                this._value = err;
                let cb;
                while(cb=this._rejectedQueue.shift()){
                    cb(err)
                }
            }
            //为了支持同步的Promise，这里采用异步调用
            setTimeout(run,0);
        }

        //添加then方法
        then(onFulfilled,onRejected){
            const {_value,_status} = this;
            //返回一个新的promise对象
            return new Promise((onFulfilledNext,onRejectedNext)=>{
                //封装一个成功时执行函数
                let fulfilled = value =>{
                    try{
                        if(!isFunction(onFulfilled)){
                            onFulfilledNext(value)
                        }else{
                            let res = onFulfilled(value);
                            if(res instanceof MyPromise){
                                //如果当前回调函数返回M有Promise对象，必须等待其状态改变后再执行下一个回调函数
                                res.then(onFulfilledNext,onRejectedNext)
                            }else{
                                //否则会将返回结果直接作为参数，传入下一个true的回调函数，并立即执行下一个痛then的回调函数
                                onFulfilledNext(res);
                            }
                        }
                    }catch(err){
                        //如果函数执行出错，新的promise对象状态为失败
                        onRejectedNext(err)
                    }
                }
                //封装一个失败时执行的函数
                let rejected = error=>{
                    try{
                        if(!isFunction(onRejected)){
                            onRejectedNext(error)
                        }else{
                            let res = onRejected(error);
                            if(res instanceof MyPromise){
                                //如果当前回调函数返回MyPromise,必须等待其状态改变后再执行下一个回调函数
                                res.then(onFulfilledNext,onRejectedNext)
                            }else{
                                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                                onFulfilledNext(res);
                            }
                        }
                    }catch(err){
                        //如果函数执行出错，新的promise对象的状态为失败
                        onRejectedNext(err);
                    }
                }
                switch(_status){
                    //当状态为pending时，将then方法回调函数加入执行队列
                    case PENDING:
                        this._fulfilledQueues.push(fulfilled);
                        this._fulfilledQueues.push(rejected);
                        break;
                    case FULFILLED:
                        fulfilled(_value);
                        break;
                    case REJECTED:
                        rejected(_value);
                        break;
                }
            })
        }
        //添加catch方法
        catch(onRejected){
            return this.then(undefined,onRejected)
        }
        //添加静态resolve方法
        static resolve(value){
            //如果参数是MyPromsie实例，直接返回实例
            if(value instanceof MyPromise) return value;
            return new MyPromise(resolve=>resolve(value))
        }
        //添加静态rejected方法
        static rejecte(value){
            return new MyPromise((resolve,reject)=>reject(value))
        }
        //添加静态all方法
        static all(list){
            return new MyPromise((resolve,reject)=>{
                //返回值的集合
                let values = [];
                let count =0;
                for(let [i,p] of list.entries()){
                    //数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                    this.resolve(p).then(res=>{
                        values[i]=res;
                        count++;
                        //所有的状态都变成fulfilled时返回MyPromoise就变成fulfilled
                        if(count===list.length) resolve(values)
                    },err=>{
                        //有一个被rejected时返回的MyPromise状态就变成rejected
                        reject(err);
                    })
                }
            })
        }
        //添加race方法
        static race(list){
            return new Promise((resolve,reject)=>{
                for(let p of list){
                    //只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                    this.resolve(p).then(res=>{
                        resolve(res);
                    },err=>{
                        reject(err);
                    })
                }
            })
        }
        //finally
        finally(cb){
            return this.then(
                value=>MyPromise.resolve(cb()).then(()=>value),
                reason=>MyPromise.resolve(cb()).then(()=>{throw reason})
            );
        }
    }
}
```
:::

## [ES5实现Promise](https://juejin.im/post/5db556376fb9a0207a6ddce7)

## Promose 实现Ajax请求

::: tip

``` js
const getJson = function(url){
    const promise = new Promise(function(resolve,reject){
        const handler = function(){
            if(this.readyState!==4){
                return;
            }
            if(this.status===200){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest;
        client.open("GET",url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept","application/json");
        client.send();
    });

    return promise;
}

getJson("you-url/method").then(dunction(json){
    console.log("data:"+json);
},function(error){
    console.log("error:"+erros)
})
```

## [异常捕获](https://www.cnblogs.com/fundebug/p/7655106.html)

浏览器中未处理的Promise错误

一些浏览器(例如Chrome)能够捕获未处理的Promise错误。
unhandledrejection
监听unhandledrejection事件，即可捕获到未处理的Promise错误：

``` js
window.addEventListener('unhandledrejection', event => ···);
```

promise: reject的Promise这个事件是PromiseRejectionEvent实例，它有2个最重要的属性：

* reason: Promise的reject值

``` js
window.addEventListener('unhandledrejection', event =>
{
    console.log(event.reason); // 打印"Hello, Fundebug!"
});

function foo()
{
    Promise.reject('Hello, Fundebug!');
}
foo();
```

当一个Promise错误最初未被处理，但是稍后又得到了处理，则会触发rejectionhandled事件：

``` js
window.addEventListener('rejectionhandled', event => ···);
```

示例代码：这个事件是PromiseRejectionEvent实例。

``` js
window.addEventListener('unhandledrejection', event =>
{
    console.log(event.reason); // 打印"Hello, Fundebug!"
});

window.addEventListener('rejectionhandled', event =>
{
    console.log('rejection handled'); // 1秒后打印"rejection handled"
});

function foo()
{
    return Promise.reject('Hello, Fundebug!');
}

var r = foo();

setTimeout(() =>
{
    r.catch(e =>{});
}, 1000);
```

### Node.js中未处理的Promise错误

监听unhandledRejection事件，即可捕获到未处理的Promise错误：

``` js
process.on('unhandledRejection', reason =>
{
    console.log(reason); // 打印"Hello, Fundebug!"
});

function foo()
{
    Promise.reject('Hello, Fundebug!');
}

foo();
```

:::

### promise.finally()

ES2018引入，不管Promise对象最后状态如何，都会执行操作

``` js
promise.then(resolve=>{...})
       .catch(error=>{...})
       .finally(()=>{...})
```

无论promise状态如何，执行完then和catch指定的回调函数都会执行finally指定的回调函数

``` js
promise.finally(()=>{
    //执行函数
});

//等价于
promise.then(
    result=>{
        //语句
        return result;
    },
    error=>{
        //语句
        throw error
    }
)
```

不用finally实现，需要为成功和失败情况各写一次，有了finally方法只需要写一次

``` js
Promise.prototype,finally = function(callback){
    let p = this.constructor;
    return this.then(
        value =>p.resolve(callback()).then(()=>value),
        reason=>p.resovel(callback()).then(()=>{throw reason})
    );
};
```

### promise.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

``` js
const promiseAll = Promise.all([p1,p2,p3]);
```

* promiseAll的状态由p1,p2,p3决定，分为两者情况
  * p1,p2,p3全部为fullfilled，promiseAll变为fullfilled,返回一个数组，传递给p的回调函数
  * 其中一个变为rejected,promiseAll的状态就变为rejected，第一个返回的reject的值，返回给promiseALl

``` js
//eg1
const promise = [1,2,3,4,5,6].map(function(id){
    return  getJson('/post/'+id+".json");
});

Promise.all(promises).then(function(posts){
    //...
}).catch(function(reason){
    //...
});
//只有6个实例的状态都变成fullfilled，或者其中一个变成rejected，才会调用promise.all方法后面的回调函数


//eg2
const databasePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);
const userPormise = databasePromise.then(getCurrentUser);

Promise.all([
    booksPromise,
    userPromise
]).then(([books,user])=>pickTopRecommendations(books,user));
//上面代码中，booksPromise和userPromise是两个异步操作，只有等到它们的结果都返回了，才会触发pickTopRecommendations这个回调函数。
```

::: danger
如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
:::

``` js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]

//如果没有catch方法则会调用promise.all()的catch方法
```

### promise.race()

Promise.race()同样是将多个Promise实例包装成新的Promise实例

``` js
const p = Promise.all([p1,p2,p3]);
```

Promise.race()方法的参数与Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。

``` js
const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function(resolve,reject){
        setTimeout(()=>reject(new Error('request timeout')),5000)
    })
]);
p.then(console.log)
 .catch(console.error)
```

### promise.allSettled()

本标准由ES2020引入。接收一组Promise实例作为参数，包装成新的Promise实例,所有的参数实例都返回结果，包装实例才结束

``` js
const promises = [
    fetch('/api-1'),
    fetch('/api-2'),
    fetch('/api-3'),
];
await Promise.allSettled(promises);//3分请求结束后 加载图标都消失
removeLoadingIndicator();
```

promise实例在函数监听结束后，返回数组

``` js
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]

const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
const results = await Promise.allSettled(promises);

// 过滤出成功的请求
const successfulPromises = results.filter(p => p.status === 'fulfilled');

// 过滤出失败的请求，并输出原因
const errors = results
  .filter(p => p.status === 'rejected')
  .map(p => p.reason);
```

### promise.any()

任何一个为fullfilled则包装实例变为fullfilled，所有的变为rejected，则变为rejected
Promise.any()跟Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成rejected状态而结束。

``` js
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
```

### promise.resolve()

``` js
Promise.resolve('foo')
//equals
new Promise(resolve=>resolve('foo'))
```

## 案例应用

### 加载图片

``` js
const preloadImage = function(path){
    return new Promise(function(resolve,reject){
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
};
```
