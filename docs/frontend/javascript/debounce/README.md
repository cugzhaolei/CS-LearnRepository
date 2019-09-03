
#[防抖与节流](https://www.cnblogs.com/momo798/p/9177767.html)
::: tip

防抖与节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。

## 防抖 (debounce): 
将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
- 立即防抖
触发事件后函数会立即执行，然后n秒内不触发事件才会执行函数的效果
``` js
function debounce(fn,wait){
    let timeout = null;
    let context = this;
    let args = arguments;
    return function(){
      if(timeout) clearTimeout(timeout);
      var callNow = !timeout;
      timeout = setTimeout(function(){
        timeout =null;
      },wait)
      if(callNow){
        fn.apply(context,args);
      }
    }
}
// 处理函数
function handle() {    
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));


```
## 非立即防抖
触发事件后函数不会立即执行，而是在n秒之后执行，如果n秒之内又触发了事件，则会重新计算函数执行时间。

``` js
function debounce(fn,wait){
  let timeout =null;
  let context = this;
  let args = arguments;
  return function(){
    if(timeout) clearTimeout(timeout);
    timeout = setIimeout(function(){
      fn.apply(context,args)
    },wait);
  }
}
```

``` js
// fn 
//fuinction函数 
//wait等待时间 
//immediate 是否立即执行
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}


```
## 节流(throttle): 
每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。

``` js

- 时间戳
function throttle(fn,wait){
  let previous = 0;
  return function(){
    let now = Date.now();
    let context = this;
    let args = arguments;
    if(now-previous>wait){
      fn.apply(context,args);
      previous = now;
    }
  }
}

- 定时版本
function throttle(fn,wait){
  let timeout;
  return function(){
    let context = this;
    let args = arguments;
    if(!timeout){
      timeout = setTimeout(function(){
        timeout = null;
        fn.apply(context,args);
      },wait)
    }
  }
}

function handle() {            
　　console.log(Math.random());        
}        
window.addEventListener('scroll', throttle(handle, 1000));
```

### 结合时间戳与定时器

``` js
function(fn,wait,type){
  if(type===1){
    let previous = 0;
  }else if(type===2){
    let timeout;
  }

  return function(){
    let context = this;
    let args = arguments;
    if(type===1){
      let now = Date.now();
      if(now-previous>wait){
        fn.apply(context,args);
        previous = now;
      }
    }else if(type===2){
      if(!timeout){
        timeout = setTimeout(function(){
          timeout = null;
          fn.apply(context,args)
        },wait)
      }
    }
  }
}

```