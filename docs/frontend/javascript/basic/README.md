::: tip

# [js 基础知识](https://juejin.im/post/5d6c53476fb9a06acc009e00)

## JS 支持哪些数据类型

![js-data-type](/images/js-data-type.webp)

- Undefined
- Null
- Boolean
- String
- Symbol
- Number
- Object

### JavaScript 的特性是什么

![js property](/images/js-property.webp)

JS 是一种轻量级，解释性编程语言。
为了创建以网络为中心的应用程序而设计。
补充和集成了 Java
补充和集成了 HTML
开放和跨平台

### arguments

JS 变量 arguments 表示传递给函数的参数。 使用 typeof 运算符，可以获得传递给函数的参数类型。如下：

```js
function func(x) {
  console.log(typeof x, arguments.length);
}
func(); //==> "undefined", 0
func(7); //==> "number", 1
func("1", "2", "3"); //==> "string", 3
```

### JS 创建 cookie

创建 cookie 的最简单方法是为 document.cookie 对象分配一个字符串值，如下所示:

```js
document.cookie = "key1 = value1; key2 = value2; expires = date";
```

### 使用 JS 读取 cookie

读取 cookie 就像写入 cookie 一样简单，因为 document.cookie 对象的值是 cookie。

document.cookie 的值是由分号分隔的 name=value 对的列表，其中 name 是 cookie 的名称，value 是其字符串值。
可以使用 split()方法将字符串分解为键和值。

### Attribute 和 Property

Attribute——提供关于元素的更多细节，如 id、类型、值等。
Property —— 分配给属性的值，如 type =“text”，value ='Name'等

### JS 访问 HTML 元素

下面是在 JS 代码中访问 html 元素的方法列表:

- getElementById(‘idname’): 按 id 名称获取元素
- getElementsByClass(‘classname’): 获取具有给定类名的所有元素
- getElementsByTagName(‘tagname’): 获取具有给定标记名称的所有元素
- querySelector(): 此函数采用 css 样式选择器并返回第一个选定元素

### JS 中定义变量

在 JS 中声明变量有三种方式：

var – var 语句用于声明一个变量，咱们可以选择初始化该变量的值。例子:var a =10;变量声明在代码执行之前处理。
const - 常量的值不能通过重新赋值来改变，并且不能重新声明。
let - 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

### 类型化语言

类型化语言中，值与值关联，而不是与变量关联，它有两种类型：

- 动态:在这种情况下，变量可以包含多种类型，如在 JS 中，变量可以取 number, string 类型。

- 静态:在这种情况下，变量只能包含一种类型，就像在 Java 中声明为 string 的变量只能包含一组字符，不能包含其他类型。

### window 与 document 的区别：

window:JS 的 window 是一个全局对象，它包含变量、函数、history、location。
document:document 也位于 window 之下，可以视为 window 的属性。

### innerHTML 和 innerText 的区别

innerHTML:也就是从对象的起始位置到终止位置的全部内容,包括 Html 标签。
innerText:从起始位置到终止位置的内容, 但它去除 Html 标签

### JS 的原始/对象类型如何在函数中传递？

两者之间的一个区别是，原始数据类型是通过值传递的，对象是通过引用传递的。

值传递：意味着创建原始文件的副本。把它想象成一对双胞胎:他们出生的时候一模一样，但是双胞胎中的老大在战争中失去了一条腿，而老二却没有。
引用传递: 意味着创建原始文件的别名。当我妈妈叫沙雕的时候，虽然我的名字叫小智，但这并不是说我就突然就克隆了一个自己:我仍然是我，只是可以用不同名字来称呼我而已。

### JS 中将任意基的字符串转换为整数

parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于 2-36 之间的数,如下：

```js
parseInt("4F", 16);
```

### export 和 import 是什么

import 和 export 有助于咱们编写模块化 JS 代码。 使用 import 和 export，咱们可以将代码拆分为多个文件，如下：

```js
//------ lib.js ------
export const sqrt = Math.sqrt;
export function square(x) {
return x * x;
}
export function diag(x, y) {
return sqrt(square(x) + square(y));
}

//------ main.js ------
 { square, diag } from 'lib';
console.log(square(5)); // 25
console.log(diag(4, 3)); // 5
```

### JS 中的“严格”模式是什么以及如何启用

严格模式是在代码中引入更好的错误检查的一种方法。

- 当使用严格模式时，不能使用隐式声明的变量，或为只读属性赋值，或向不可扩展的对象添加属性。

- 可以通过在文件，程序或函数的开头添加“use strict”来启用严格模式

### call 和 apply 有什么区别

call 和 apply 可以用来重新定义函数的执行环境，也就是 this 的指向；call 和 apply 都是为了改变某个函数运行时的 context，即上下文而存在的，换句话说，就是为了改变函数体内部 this 的指向。
call()调用一个对象的方法，用另一个对象替换当前对象，可以继承另外一个对象的属性，它的语法是：

```js
Function.call(obj[, param1[, param2[, [,...paramN]]]]);
```

说明：call 方法可以用来代替另一个对象调用一个方法，call 方法可以将一个函数的对象上下文从初始的上下文改变为 obj 指定的新对象，如果没有提供 obj 参数，那么 Global 对象被用于 obj

apply() 和 call()方法一样，只是参数列表不同，语法：

```js

Function.apply(obj[, argArray]);
```

说明：如果 argArray 不是一个有效数组或不是 arguments 对象，那么将导致一个 TypeError，如果没有提供 argArray 和 obj 任何一个参数，那么 Global 对象将用作 obj。

JS 中清空数组

有许多方法可以用来清空数组:

方法一：

```js
arrayList = [];
```

上面的代码将把变量 arrayList 设置为一个新的空数组。如果在其他任何地方都没有对原始数组 arrayList 的引用，则建议这样做，因为它实际上会创建一个新的空数组。咱们应该小心使用这种清空数组的方法，因为如果你从另一个变量引用了这个数组，那么原始的引用数组将保持不变。

方法二：

```js
arrayLisy.length = 0;
```

上面的代码将通过将其 length 设置为 0 来清除现有数组。这种清空数组的方式还会更新指向原始数组的所有引用变量。 因此，当你想要更新指向 arrayList 的所有引用变量时，此方法很有用。

方法三：

```js
arrayList.splice(0, arrayList.length);
```

方法四：

```js
while (arrauList.length) {
  arrayList.pop();
}
```

### delete

```js
var output = (function(x) {
  delete x;
  return x;
})(0);
console.log(output); //0
```

delete 操作符用于从对象中删除属性。这里 x 不是一个对象，而是一个局部变量，删除操作符不影响局部变量。

```js
var X = { foo: 1 };
var output = (function() {
  delete X.foo;
  return X.foo;
})();
console.log(output); //undefined
```

### 手写 JSONP

```js
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jsonp</title>
</head>
<body>
	<div id="result"></div>
<script>
(function(window,document,undefined){
var jsonp = function(url,data,callback){
// 回调函数+时间戳
var cbName = 'callback_' + new Date().getTime();
// 暴露全局函数给window
// 判读查询字符串最后一位是否为?或者是&
var queryString = url.indexOf('?') == -1 ? '?' : '&';
// 遍历传进来的data实参赋值给查询字符串
for(var k in data){
  queryString += k + '=' + data[k] + '&';
}
// 查询字符串加上回调函数
queryString += 'callback=' + cbName;
// 创建script标签
var ele = document[0].createElement('script');
// 给script标签添加src属性值
ele.src = url + queryString;
window[cbName] = function(data){
callback(data);
document[0].body.removeChild(ele);
};
// 添加到body尾部
document[0].body.appendChild(ele);
}
//jsonp函数暴露给window
window.$jsonp = jsonp;
})(window,document,undefined);
</script>
<script>
$jsonp('http://api.douban.com/v2/movie/in_theaters',{
	'count':1
},function(data){
	document.getElementsByTagName('body')[0].innerHTML = JSON.stringify(data);
})
</script>
</body>
</html>
```

```js
const JSONP = function({url,params,callbackName})=>{
  const generateUrl = () => {
    let dataSrc = '';
    for(let key in params){
      if(Object.prototype.hasOwnProperty.call(params,key)){
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  }

  return new Promise((resolve,reject)=>{
    const scriptEle = document.createElement('script');
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    window[callbackName] = data =>{
      resolve(data);
      document.removeChild(scriptEle);
    }
  })
}
```

### AJAX

```js
const getJSON = function(url){
  return new Promise((resolve,reject)=>{
    const xhr = XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHttp');
    xhr.open('GET',url,false);
    xhr.setRequestHeader('Accept','application/json');
    xhr.onreadystatechange = function(){
      if(xhr.readyState!==4)return;
      if(xhr.status === 200||xhr.status === 304){
        resolve(xhr.responseText);
      }else{
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  })
}
```

### Event

```js
function EventEmitter(){
  this.events = new Map();
}

// 实现方法

// addEventListener
const wrapCallback = (fn,once=false)=>({callback:fn,once});
EventEmitter.prototype.addListener = function(type,fn,once=false){
  const handler = this.events.get(type);
  if(!handler){
    // 没有type绑定事件
    this.events.set(type,wrapCallback(fn,once));
  }else if(handler && typeof handler.callback === 'function'){
    //目前type事件只有一个
    this.events.set(type,[handler,wrapCallback(fn,once)]);
  }else{
    // type事件》=2
    handler.push(wrapCallback(fn,once));
  }
}
//模拟实现removeListener
EventEmitter.prototype.removeListener = function(type,listener){
  const handler = this.events.get(type);
  if(!handler)return;
  if(!Array.isArray(this.events)){
    if(handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for(let i = 0;i<handler.length;i++){
    const item = handler[i];
    if(item.callback === listener.callback){
      handler.splice(i,1);
      i--;
      if(handler.length===1){
        this.events.set(type,handler[0]);
      }
    }
  }
}
// 模拟实现once方法
EventEmitter.prototype.once = function(type,listener){
  this.addListener(type,listener,true);
}
// 模拟实现emit方法
EventEmitter.prototype.emit = function(type,...args){
  const handler = this.events.get(type);
  if(!handler)return;
  if(Array.isArray(handler)){
    handler.forEach(item=>{
      item.callback.apply(this,args);
      if(item.once){
        this.removeListener(type,item);
      }
    })
  }else{
    handler.callback.apply(this,args);
    if(handler.once){
      this.events.delete(type);
    }
  }
  return true;
}

EventEmitter.prototype.removeAllListener = function(type){
  const handler = this.events.get(type);
  if(!handler)return;
  this.events.delete(type);
}
```

### addEventListener

```js
addEventListener("", function(e) {});
```

### 图片懒加载

可以给img标签统一自定义属性data-src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。

```js
function lazyLoad(){
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;

  // viewport height
  const viewHeight = document.documentElement.clientHeight;
  // scroll height
  const scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
  for(let i = 0;i<len; i++){
    const offsetHeight = imgs[i].offsetTop;
    if(offsetHeight<viewHeight+scrollHeight){
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

// throttle

window.addEventListener('scroll',lazyLoad);
```

### 滚动加载

原理就是监听页面滚动事件，分析clientHeight、scrollTop、scrollHeight三者的属性关系。

```js
window.addEventListener('scroll',function(){
  const clientHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.docuementElement.scrollHeight;
  if(clientHeight+scrollTop>=scrollHeight){
    // 检测到滚动至页面底部 进行后续操作
  }
},false)
```

### 大列表渲染

渲染大数据时，合理使用 createDocumentFragment 和 requestAnimationFrame ，将操作切分为一小段一小段执行。

```js
setTimeout(()=>{
  // insert 100000 list of data
  const total = 100000;
  // insert once
  const once = 20;
  // times to insert
  const loopCount = Math.cell(total/once);
  let countOfReader = 0;
  const ul = document.querySelector('ul');
  // method to add data
  function add(){
    const fragment = document.createDocumentFragment();
    for(let i=0;i<once,i++){
      const li = document.createElement('li');
      li.innerText = Math.floor(Math.random()*total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfReader +=1;
    loop();
  }
  function loop(){
    if(countOfReader<loopCount){
      window.requestAnimationFrame(add);
    }
  }
  loop();
},0)

```

### 打印当前网页使用多少HTML元素

```js
const fn = () =>{
  return [...new Set([...document.querySelectorAll('*')].map(el=>el.tagName))].length;
}
```

值得注意的是：DOM操作返回的是类数组，需要转换为数组之后才可以调用数组的方法。

### Virtula DOM 转 DOM

```js
function render(){
  container.appendChild(_render(vnode));
}

function _render(vnode){
  //如果是数字转换为字符串
  if(typeof vnode === 'number'){
    vnode = String(vnode);
  }
  //如果是字符串直接就是文本节点
  if(typeof vnode === 'string'){
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if(vnode.attrs){
    //遍历属性
    Object.keys(vnode.attrs).forEach(key=>{
      const value = vnode.attrs[key];
      dom.setAttribute(key,value);
    })
  }
  //子数组进行递归操作
  vnode.children.forEach(child=>{
    render(child,dom);
  })
  return dom;
}
```

### 字符串解析问题

```js
const fn1 = (str, obj) => {
    let res = '';
    // 标志位，标志前面是否有{
    let flag = false;
    let start;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '{') {
            flag = true;
            start = i + 1;
            continue;
        }
        if (!flag) res += str[i];
        else {
            if (str[i] === '}') {
                flag = false;
                res += match(str.slice(start, i), obj);
            }
        }
    }
    return res;
}
// 对象匹配操作
const match = (str, obj) => {
    const keys = str.split('.').slice(1);
    let index = 0;
    let o = obj;
    while (index < keys.length) {
        const key = keys[index];
        if (!o[key]) {
            return `{${str}}`;
        } else {
            o = o[key];
        }
        index++;
    }
    return o;
}
```

### Math

#### Math 对象属性

| 属性    | 描述                                           |
|---------|----------------------------------------------|
| E       | 返回算术常量 e，即自然对数的底数（约等于 2.718）。 |
| LN2     | 返回 2 的自然对数（约等于 0.693）。               |
| LN10    | 返回 10 的自然对数（约等于 2.302）。              |
| LOG2E   | 返回以 2 为底的 e 的对数（约等于 1.414）。        |
| LOG10E  | 返回以 10 为底的 e 的对数（约等于 0.434）。       |
| PI      | 返回圆周率（约等于 3.14159）。                    |
| SQRT1_2 | 返回返回 2 的平方根的倒数（约等于 0.707）。       |
| SQRT2   | 返回 2 的平方根（约等于 1.414）。                 |

#### Math 对象方法

      方法 | 描述

----------:|:------------------------------------------
abs(x) | 返回数的绝对值。
acos(x) | 返回数的反余弦值。
asin(x) | 返回数的反正弦值。
atan(x) | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
atan2(y,x) | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
ceil(x) | 对数进行上舍入。
cos(x) | 返回数的余弦。
exp(x) | 返回 e 的指数。
floor(x) | 对数进行下舍入。
log(x) | 返回数的自然对数（底为 e）。
max(x,y) | 返回 x 和 y 中的最高值。
min(x,y) | 返回 x 和 y 中的最低值。
pow(x,y) | 返回 x 的 y 次幂。
random() | 返回 0 ~ 1 之间的随机数。
round(x) | 把数四舍五入为最接近的整数。
sin(x) | 返回数的正弦。
sqrt(x) | 返回数的平方根。
tan(x) | 返回角的正切。
toSource() | 返回该对象的源代码。
valueOf() | 返回 Math 对象的原始值

## [浏览器多页面通信](https://blog.csdn.net/scottsu11/article/details/88357990)

### 1：websocket 通讯

全双工(full-duplex)通信自然可以实现多个标签页之间的通信

WebSocket 是 HTML5 新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。为什么传统的 HTTP 协议不能做到 WebSocket 实现的功能？这是因为 HTTP 协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。

也有人说，HTTP 协议其实也能实现啊，比如用轮询或者 Comet。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。

Comet 本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个 HTTP 连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接，而网关是我们不可控的，这就要求 Comet 连接必须定期发一些 ping 数据表示连接“正常工作”。

WebSocket 并不是全新的协议，而是利用了 HTTP 协议来建立连接。为什么 WebSocket 连接可以实现全双工通信而 HTTP 连接不行呢？实际上 HTTP 协议是建立在 TCP 协议之上的，TCP 协议本身就实现了全双工通信，但是 HTTP 协议的请求－应答机制限制了全双工通信。WebSocket 连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用 HTTP 协议了，直接互相发数据吧。安全的 WebSocket 连接机制和 HTTPS 类似。首先，浏览器用 wss://xxx 创建 WebSocket 连接时，会先通过 HTTPS 创建安全的连接，然后，该 HTTPS 连接升级为 WebSocket 连接，底层通信走的仍然是安全的 SSL/TLS 协议。

WebSocket 连接必须由浏览器发起，特点：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL。

### 2：定时器 setInterval+cookie

在页面 A 设置一个使用 setInterval 定时器不断刷新，检查 Cookies 的值是否发生变化，如果变化就进行刷新的操作。

由于 Cookies 是在同域可读的，所以在页面 B 审核的时候改变 Cookies 的值，页面 A 自然是可以拿到的。

这样做确实可以实现我想要的功能，但是这样的方法相当浪费资源。虽然在这个性能过盛的时代，浪费不浪费也感觉不出来，但是这种实现方案，确实不够优雅。

### 3：使用 localstorage

localstorage 是浏览器多个标签共用的存储空间，所以可以用来实现多标签之间的通信(ps：session 是会话级的存储空间，每个标签页都是单独的）。

直接在 window 对象上添加监听即可：

```js
window.onstorage = (e) => {
  console.log(e);
}; // 或者这样window.addEventListener('storage', (e) => console.log(e))
```

onstorage 以及 storage 事件，针对都是非当前页面对 localStorage 进行修改时才会触发，当前页面修改 localStorage 不会触发监听函数。然后就是在对原有的数据的值进行修改时才会触发，比如原本已经有一个 key 会 a 值为 b 的 localStorage，你再执行：localStorage.setItem('a', 'b')代码，同样是不会触发监听函数的。

### 4：html5 浏览器的新特性 SharedWorker

普通的 webworker 直接使用 new Worker()即可创建，这种 webworker 是当前页面专有的。然后还有种共享 worker(SharedWorker)，这种是可以多个标签页、iframe 共同使用的。

SharedWorker 可以被多个 window 共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

首先新建一个 js 文件 worker.js，具体代码如下：

```js
// sharedWorker所要用到的js文件，不必打包到项目中，直接放到服务器即可let data = ''onconnect = function (e) {  let port = e.ports[0]  port.onmessage = function (e) {    if (e.data === 'get') {      port.postMessage(data)    } else {      data = e.data    }  }}
```

webworker 端(暂且这样称呼)的代码就如上，只需注册一个 onmessage 监听信息的事件，客户端(即使用 sharedWorker 的标签页)发送 message 时就会触发。

注意 webworker 无法在本地使用，出于浏览器本身的安全机制，所以我这次的示例也是放在服务器上的，worker.js 和 index.html 在同一目录。

因为客户端和 webworker 端的通信不像 websocket 那样是全双工的，所以客户端发送数据和接收数据要分成两步来处理。示例中会有两个按钮，分别对应的向 sharedWorker 发送数据的请求以及获取数据的请求，但他们本质上都是相同的事件--发送消息。

webworker 端会进行判断，传递的数据为'get'时，就把变量 data 的值回传给客户端，其他情况，则把客户端传递过来的数据存储到 data 变量中。下面是客户端的代码：

// 这段代码是必须的，打开页面后注册 SharedWorker，显示指定 worker.port.start()方法建立与 worker 间的连接

```js
if (typeof Worker === "undefined") {
  alert("当前浏览器不支持webworker");
} else {
  let worker = new SharedWorker("worker.js");
  worker.port.addEventListener(
    "message",
    (e) => {
      console.log("来自worker的数据：", e.data);
    },
    false
  );
  worker.port.start();
  window.worker = worker;
}
```

// 获取和发送消息都是调用 postMessage 方法，我这里约定的是传递'get'表示获取数据。

```js
window.worker.port.postMessage("get");
window.worker.port.postMessage("发送信息给worker");
```

页面 A 发送数据给 worker，然后打开页面 B，调用 window.worker.port.postMessage('get')，即可收到页面 A 发送给 worker 的数据。

### [this.指向](https://juejin.im/post/5c049e6de51d45471745eb98)

- 箭头函数在自己的作用域内没有自己的 this,如果需要使用 this，就会指向定义时所在的作用域的 this
  箭头函数不会创建自己的 this,它只会从自己的作用域链的上一层继承 this。

this 就几种情况：

- new，指向新对象。
- bind/apply/call，指向第一个参数（如果第一个参数是 null 则指向 window）。
- 作为对象的方法调用，指向对象。
- 函数调用，指向 window。

```js
// 方式1
var a = 10;
var obj = {
  a: 20,
  say: () => {
    // 此处改为箭头函数
    console.log(this.a);
  },
};
obj.say(); // -> 10

// 方式2
var a = 10;
var obj = {
  a: 20,
  say: function() {
    console.log(this.a);
  },
};
obj.say.call(this); // 此处显示绑定this为全局window对象

// 方式3
var a = 10;
var obj = {
  a: 20,
  say: function() {
    console.log(this.a);
  },
};

var say = obj.say; // 此处先创建一个临时变量存放函数定义，然后单独调用
say();
```

### 'a'+b 'a'-b

+前面为字符则转为字符串 -前面字符转数字再计算

:::

### [判断类型](https://www.cnblogs.com/178-533/p/7489403.html)

#### typeof

可以判断基本数据类型 Number String Null Undefined

```js
var a = 1;
console.log(typeof a);
var b = "1";
console.log(typeof b);
var c = undefined;
console.log(typeof c);
var d = true;
console.log(typeof d);

VM340:2 number
VM340:5 string
VM340:8 undefined
VM340:11 boolean

typeof function(){}
"function"
typeof Object
"function"
typeof new Array(5);
"object"
typeof String
"function"
typeof {}
"object"
```

#### instanceof

在 JavaScript 中，判断一个变量的类型会用 typeof 运算符，在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。

instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
语法：object instanceof constructor
参数：object（要检测的对象.）constructor（某个构造函数）
描述：instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```js
var test1 = new Array();
alert(test1 instanceof Array); //输出true
var test2 = new String();
alert(test2 instanceof String); //输出true
var test3 = {};
alert(test3 instanceof Object); //输出true
var test4 = /qwe/;
alert(test4 instanceof RegExp); //输出true
var test5 = 1;
alert(test5 instanceof number); //输出false
var test6 = "";
alert(test6 instanceof String); //输出false
var test7 = true;
alert(test7 instanceof Boolean); //输出false
```

instanceof 对于基本类型输出 false 对于引用类型输出 true

#### Object.prototype.toString

```js
var test1 = new Array();
alert(Object.prototype.toString.call(test1));//输出object Array
var test2 = new String();
alert(Object.prototype.toString.call(test2));//输出object String
var test3 = {};
alert(Object.prototype.toString.call(test3));//输出object Object
var test4 = /qwe/;
alert(Object.prototype.toString.call(test4));//输出object RegExp
var test5 = 1;
alert(Object.prototype.toString.call(test5));//输出object Number
var test6 = "";
alert(Object.prototype.toString.call(test6));//输出object String
var test7 = true;
alert(Object.prototype.toString.call(test7));//输出object Boolean

function Person(name){
  this.name = name;
}
let p = new Person('Tom');

p._proto_  //Person.prototype

Person._proto_ //Function.prototype

//实例的_proto_属性(原型)等于其构造函数的属性，实例p的构造函数为Person
//而Person的构造函数为Function。

var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a)
console.log(foo.b)
console.log(F.a)
console.log(F.b)

VM90:6 value a
VM90:7 undefined
VM90:8 value a
VM90:9 value b
```

### [onLoad 和 DOMContentLoaded](https://www.cnblogs.com/double405/p/5125059.html)

一般情况下，DOMContentLoaded 事件要在 window.onload 之前执行，当 DOM 树构建完成的时候就会执行 DOMContentLoaded 事件，而 window.onload 是在页面载入完成的时候，才执行，这其中包括图片等元素。大多数时候我们只是想在 DOM 树构建完成后，绑定事件到元素，我们并不需要图片元素，加上有时候加载外域图片的速度非常缓慢。

### [new 和 instanceof](https://juejin.im/post/5c19c1b6e51d451d1e06c163)

1. 创建一个新对象，同时继承对象类的原型，即 Person.prototype；
2. 执行对象类的构造函数，同时该实例的属性和方法被 this 所引用，即 this 指向新构造的实例；
3. 如果构造函数 return 了一个新的“对象”，那么这个对象就会取代整个 new 出来的结果。如果构造函数没有 return 对象，那么就会返回步骤 1 所创建的对象，即隐式返回 this。（一般情况下构造函数不会返回任何值，不过在一些特殊情况下，如果用户想覆盖这个值，可以选择返回一个普通的对象来覆盖。）

```js
// let p = new Person()
let p = (function() {
  let obj = {};
  obj.__proto__ = Person.prototype;
  // 其他赋值语句...

  return obj;
})();
```

instanceof 内部机制 ，实现 x instanceof y 的内部判断：

```js
while (x._prototype_ !== null) {
  if (x._proto_ === y.prototype) {
    return true;
  }
  x._proto_ = x._proto_.proto_;
}
if (x._proto_ == null) {
  return false;
}
```

```js
function F() {}
function O() {}

O.prototype = new F();
var obj = new O();

console.log(obj instanceof O); // true
console.log(obj instanceof F); // true
console.log(obj.__proto__ === O.prototype); // true
console.log(obj.__proto__.__proto__ === F.prototype); // true
```

根据 new 机制修改上面代码

```js
function F() {}
function O() {}

var obj = (function() {
  var obj1 = {};
  obj1.__proto__ = F.prototype; // new F();
  O.prototype = obj1; // O.prototype = new F();
  obj.__proto__ = O.prototype; // new O();
  obj.__proto__ = obj1;
  return obj;
})();
```

结合 instanceof 内部机制很容易得出正确答案，调整一下顺序，结果不同

```js
function F() {}
function O() {}

var obj = new O();
O.prototype = new F();

console.log(obj instanceof O); //false
console.log(obj instanceof F); //false
console.log(obj._proto_ === O.prototype); //false
console.log(obj._proto_._proto_ === F.prototype); //false
```

### [js 遍历](https://www.jianshu.com/p/c43f418d6bf0)

```js
Array.prototype.method=function(){
　　console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"
for (var index in myArray) {
  console.log(myArray[index]);
}

VM87:7 1
VM87:7 2
VM87:7 4
VM87:7 5
VM87:7 6
VM87:7 7
VM87:7 数组
VM87:7 function (){
　　console.log(this.length);
}

for (var value of myArray) {
  console.log(value);
}

VM89:2 1
VM89:2 2
VM89:2 4
VM89:2 5
VM89:2 6
VM89:2 7
```

## [Attribute 和 Property](https://www.cnblogs.com/lmjZone/p/8760232.html)

- property 是 DOM 中的属性，是 JavaScript 里面的对象
- attribute 是 HTML 标签上的特性，它的值只能是字符串

- property 能够从 attribute 中得到同步；
- attribute 不会同步 property 上的值；
- attribute 和 property 之间的数据绑定是单向的，attribute->property；
- 更改 property 和 attribute 上的任意值，都会将更新反映到 HTML 页面中

## 浏览器相关

[1.开箱即用的 JS 干货助力金三银四](https://juejin.im/post/5e4365006fb9a07cd248c21d)

### 浏览器相关

#### 检查是否为浏览器环境

```js
const isBrowser = () => ![typeof window, typeof document].includes("undefined");

isBrowser(); //true(browser)
isBrowser(); //false(node)
```

#### 判断手机类型

```js
let getMobile=function(){
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android')>-1||u.indexOf('Linux')>-1//g
  var isIOS = !!u.match(/\(i[^;]+;(U;)?CPU.+Mac OS X/))  //ios终端
  if(isAndroid){
    return 'Android'
  }
  if(isIOS){
    return 'IOS'
  }
}
```

#### 判断微信/QQ 浏览器

```js
let url = navigator.useAgent.toLowerCase();
//使用tolowercase将字符串全部转为小写，方便我们判断
if (url.indexOf("15b202 qq") > -1) {
  //单独判断QQ浏览器
  alert("QQ APP 内置浏览器");
}
if (url.indexOf("micromessenger")) {
  alert("微信内置浏览器");
}
if (url.indexOf("15b202")) {
  alert("QQ和微信内置浏览器");
}
```

#### 判断手机开屏/息屏

```js
document.addEventListener("visibilitychange", () => {
  console.log(document.visibilityState);
  if (document.visibilityState === "hidden") {
    console.log("息屏时间");
  } else if (document.visibilityState === "visible" && vm.hidden) {
    console.log("开屏时间");
  }
});
```

#### 监听联网状态

```js
window.addEventListener("offline", function(e) {
  alert("offline");
});
window.addEventListener("online", function(e) {
  alert("online");
});
if (window.navigator.onLine == true) {
  alert("已连接");
} else {
  alert("未连接");
}
```

#### 检测手机横屏

```js
window.addEventListener("resize", () => {
  if (window.orientation === 180 || window.orientation === 0) {
    //正常方向或者屏幕旋转180度
    console.log("竖屏");
  }
  if (window.orientation === 90 || window.orientaion === 90) {
    // 屏幕顺时钟旋转90度或屏幕逆时针旋转90度
    console.log("横屏");
  }
});
```

### 字符串有关

#### 首字母大写

```js
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join("");
capitalize("fooBar"); //FooBar
```

#### 单个单词首字母大写

```js
const capitalizeEveryWord = str=>str.replace(/\b[a-z]g,char=>toUpperCase())
capitalizeEveryWord("Hello World!") //Hello world
```

#### 删除字符中的 HTML 标签

```js
const stringHTMLtag = (str) => str.replace(/<[^>]*>/g, "");
stripHTMLTags("<p><em>Hello</em> <strong>World</strong></p>"); // 'Hello World!'
```

#### 字符串反转

```js
//方法一
var arr = str.split("");
var newArr = [];
for (var i = 0; i < arr.length; i++) {
  newArr[i] = arr[arr.length - i - 1];
}
var newStr = newArr.join("");
console.log(newStr);

//方法二
var newStr = "";
for (var i = 0; i < str.length; i++) {
  newStr += str.charAt(str.length - i - 1);
}
console.log(newStr);

//方法三
var newStr = str
  .split("")
  .reverse()
  .join("");
console.log(newStr);

//方法四
var arr = str.split("");
var obj = Array.from(new Set([...arr]));
var newStr = "";
for (let i of obj) {
  newStr += obj[arr.lengthi];
}
console.log(newStr);

//方法五
var arr = str.split("");
var newArr = [];
while (arr.length > 0) {
  newArr.push(arr.pop());
}
var newStr = newArr.join("");
console.log(newStr);
```

#### 统计字符串出现最多的字母和次数

```js
var str = "abcdeddd";
var n = {};
for (var i = 0; i < str.length; i++) {
  var char = str.charAt(i);
  if (n[char]) {
    n[char]++; //计算出现的次数
  } else {
    n[char] = 1; //第一次出现标记为1
  }
}
console.log(n);
var max = 0;
var maxChar = null;
for (var key in n) {
  if (max < n[key]) {
    max = n[key];
    maxChar = key;
  }
}
console.log("最多的字符" + maxChar); //最多的字符d
console.log("出现次数" + max); //出现次数4
```

### 数字相关

#### 格式化金钱 毎千分位加逗号

```js
function format(str) {
  let s = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    s = str[i] + s;
    count++;
    if (count % 3 == 0 && i != 0) {
      s = "," + s;
    }
  }
  return s;
}

function format(str) {
  return str.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}
```

#### 文件单位显示

```js
function bytesToSize(bytes){
  if(bytes===0) return '0 B'
  var k = 1024 //1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var  i = Math.floor(Math.log(bytes)/Math.log(k))
  return (bytes/Math.pow(k,i)).toPrecision(3)+' '+sizes[i]
}
console.log(bytesToSize(25))
console.log(bytesToSize(24535))
console.log(bytesToSize(2534554))
console.log(bytesToSize(542555454))
console.log(bytesToSize(12112125545))
console.log(bytesToSize(927212121212105))
console.log(bytesToSize(1865553555555323825))

VM124:8 25.0 B
VM124:9 24.0 KB
VM124:10 2.42 MB
VM124:11 517 MB
VM124:12 11.3 GB
VM124:13 843 TB
VM124:14 1.62 EB
```

#### 计算两点的距离

```js
const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0);
distance(1, 4, 4, 8); //5
```

### 数组/对象相关

#### 获取 URL 参数

```js
function getQueryString(name) {
  var reg = new RegExp("(^|&" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
```

#### 实现对五种 JS 数据的克隆

```js
function clone(obj){
  var copy
  switch(typeof obj){
    case 'undefined':
      break
    case 'number':
      copy = obj-0
      break
    case 'string'
      copy = obj+''
      break
    case 'boolean':
      copy = obj
      break
    case 'object': //array object
      if(obj===null){
        copy =null
      }else{
        if(object.prototype.toString.call(obj).slice(8,-1)==='Array'){
          copy = []
          for(var i=0;i<obj.length;i++){
            copy.push(clone(obj[i]))
          }
        }else{
          copy = {}
          for(var j in obj){
            copy[j] = clone(obj[j])
          }
        }
      }
      break
      default:
        copy = obj
        break
  }
  return copy
}
```

#### 统计数组中出现的次数的对象

```js
const nums = [1, 5, 6, 7, 3, 4, 1, 3, 4, 1];
const result = nums.reduce((pre, next) => {
  pre[next] ? pre[next]++ : (pre[next] = 1);
  return pre;
}, {});

console.log(result); //{1: 3, 3: 2, 4: 2, 5: 1, 6: 1, 7: 1}
```

#### 顺序运行 Promise

```js
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}
const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); //1200
```

#### 检测数值出现次数

```js
const countOccurrences = (arr, val) => {
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
};
countOccurrences([1, 1, 2, 1, 3], 1);
```

#### 数组对象排序

1. 单个属性排序

```js
function compare(property){
  return funtion(a,b){
    let value1 = a[property];
    let value2 = b[property];
    return value1-value2
  }
}
```

2. 多个属性排序

```js
function compare(name, minor) {
  return function(o, p) {
    var a, b;
    if (o && p && typeof o === "object" && typeof p === "object") {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === "function" ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      console.log("error");
    }
  };
}
```

## let const 变量

const 和 let 会生成块级作用域

```js
let a = 10;
const b = 20;

//等于
(function() {
  var a = 10;
  var b = 20;
});

var b = 10;
(function b() {
  b = 20;
  console.log(b); //[Function b]
  console.log(window.b); //10
})();

var b = 10;
(function(c) {
  b = 20;
  console.log(b); //20
  console.log(c); //10
})(b);

var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x); //undefined
consoel.log(b.x); //{n:2}

//. 优先级高于 =
```

#### 作用域

```js
var a = 10;
(function(){
  console.log(a);//undefined
  a = 5;
  console.log(window.a);//10
  var a = 20;
  console.log(a);//20
})()

//1.函数作用域中可以访问全局作用域
var a = 123;
(function(){
  console.log(a);//123
  a = 456;
}());
console.log(a);//456

var a = undefined;
a = 123;
(function(){
  console.log(a) //123
  console.log(window.a)  //123
  window.a = 456
}());
console.log(a) //456


//2.全局作用域无法访问局部作用域
(function(){
  var a = 456
}());
console.log(a)  //a is not defined

//3.局部作用域中隐式声明，默认会在全局作用域中声明变量
(function(){
  a = 456
}());
console.log(a) //456

var window = this;//再次声明此处可忽略
var a //undefined
a = 10
(function(){
  var a
  console.log(a) //
  a = 5 //显式声明 a = 5
  console.log(window.a)
  a = 20; //显示声明 a 从5 变为 20
  console.log(a)
}()
```

```js
var obj = {
  '2':3,
  '3':4,
  'length':2,
  'splice':Array.prototype.splice,
  'push':Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

//考察伪数组
Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
2: 1
3: 2
length: 4
splice: ƒ splice()
push: ƒ push()
__proto__: Object
```

#### call apply

call 比 apply 性能更好，内部少了一次将 apply 数组解构的操作

#### a.b.c.d 和 a['b']['c']['d']

AST 下面前者速度更快，不用考虑后者[]中类型

```js
const recast = require("recast");

const code1 = a.b.c.d;
const code2 = a["b"]["c"]["d"];

const ast1 = recast.parse(code1);
const ast2 = recast.parse(code2);
```

#### for 与 forEach

```js
let arrs = new Array(100000);

console.time('for');
for(let i = 0;i<arrs.length;i++){

};
console.timeEnd('for')

console.time('forEach')

arrs.forEach((arr)=>{

});
console.timeEnd('forEach');

for:2.263ms
forEach: 0.254ms
```

- for 循环没有任何额外的函数调用栈和上下文
- forEach 函数签名实际上是

```js
array.forEach(function(currentValue,index,arr),thisValue)
```
