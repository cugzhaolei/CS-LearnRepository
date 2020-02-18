## [定时器](https://blog.csdn.net/qingyafan/article/details/52335753)

## 基本用法与区别

- setTimeout(code, millseconds) 用于延时执行参数指定的代码，如果在指定的延迟时间之前，你想取消这个执行，那么直接用clearTimeout(timeoutId)来清除任务，timeoutID 是 setTimeout 时返回的；
- setInterval(code, millseconds)用于每隔一段时间执行指定的代码，永无停歇，除非你反悔了，想清除它，可以使用 clearInterval(intervalId)，这样从调用 clearInterval 开始，就不会在有重复执行的任务，- intervalId 是 setInterval 时返回的；
- requestAnimationFrame(code)，一般用于动画，与 setTimeout 方法类似，区别是 setTimeout 是用户指定的，而 requestAnimationFrame 是浏览器刷新频率决定的，一般遵循 W3C 标准，它在浏览器每次刷新页面之前执行。

- 尽量别把第一个参数写成字符串

这个坑其实并不能算作坑，它并不能让你陷入错误的沼泽，但是会稍稍拖慢你的应用性能，原因和 eval 方法一致，把第一个参数指定为字符串，函数首先得把它翻译成可执行的代码，SO，尽量不要这么做！


## setTimeout()
https://www.cnblogs.com/xiaohuochai/p/5773183.html

　setTimeout()方法用来指定某个函数或字符串在指定的毫秒数之后执行。它返回一个整数，表示定时器的编号，这个值可以传递给clearTimeout()用于取消这个函数的执行

　　以下代码中，控制台先输出0，大概过1000ms即1s后，输出定时器setTimeout()方法的返回值1
```` js
var Timer = setTimeout(function(){
    console.log(Timer);
},1000);
console.log(0);

````
　　也可以写成字符串参数的形式，由于这种形式会造成javascript引擎两次解析，降低性能，故不建议使用
``` js
var Timer = setTimeout('console.log(Timer);',1000);
console.log(0);
```
　　如果省略setTimeout的第二个参数，则该参数默认为0

　　以下代码中，控制台出现0和1，但是0却在前面，后面会解释这个疑问
``` js
var Timer = setTimeout(function(){
    console.log(Timer);
});
console.log(0);
```
## setInterval()
　setInterval的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行
``` js
<button id="btn">0</button>
<script>
var timer = setInterval(function(){
    btn.innerHTML = Number(btn.innerHTML) + 1;
},1000);
btn.onclick = function(){
    clearInterval(timer);
    btn.innerHTML = 0;
}
</script>
```
[注意]HTML5标准规定，setTimeout的最短时间间隔是4毫秒；setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒

　　大多数电脑显示器的刷新频率是60HZ，大概相当于每秒钟重绘60次。因此，最平滑的动画效的最佳循环间隔是1000ms/60，约等于16.6ms

　　为了节电，对于那些不处于当前窗口的页面，浏览器会将时间间隔扩大到1000毫秒。另外，如果笔记本电脑处于电池供电状态，Chrome和IE10+浏览器，会将时间间隔切换到系统定时器，大约是16.6毫秒

## requestAnimationFrame()
与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

这个API的调用很简单，如下所示：
```` js
var progress = 0;

//回调函数
function render() {
    progress += 1; //修改图像的位置
    if (progress < 100) {

           //在动画没有结束前，递归渲染
           window.requestAnimationFrame(render);
    }
}

//第一帧渲染
window.requestAnimationFrame(render);
````

## setTimeout & setImmediate

setImmediate和setTimeout()是相似的，但根据它们被调用的时间以不同的方式表现。

setImmediate()设计用于在当前poll阶段完成后check阶段执行脚本 。
setTimeout() 安排在经过最小（ms）后运行的脚本，在timers阶段执行。

<b>举个例子</b>
``` js
setTimeout(() => {
  console.log('timeout');
}, 0);
setImmediate(() => {
  console.log('immediate');
});
```
执行定时器的顺序将根据调用它们的上下文而有所不同。 如果从主模块中调用两者，那么时间将受到进程性能的限制。
其结果也不一致
如果在I / O周期内移动两个调用，则始终首先执行立即回调：
``` js
const fs = require('fs');
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```



- 除此之外，requestAnimationFrame还有以下两个优势：

CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

- 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。