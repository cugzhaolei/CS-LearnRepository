::: tip

# [js基础知识](https://juejin.im/post/5d6c53476fb9a06acc009e00)

##  JS 支持哪些数据类型
![](/images/js-data-type.webp)

Undefined
Null
Boolean
String
Symbol
Number
Object

### JavaScript的特性是什么
![](/images/js-property.webp)

JS 是一种轻量级，解释性编程语言。
为了创建以网络为中心的应用程序而设计。
补充和集成了 Java
补充和集成了 HTML
开放和跨平台


### arguments
JS 变量arguments表示传递给函数的参数。 使用typeof运算符，可以获得传递给函数的参数类型。如下：
``` js
function func(x){
console.log(typeof x, arguments.length);
}
func(); //==> "undefined", 0
func(7); //==> "number", 1
func("1", "2", "3"); //==> "string", 3
```

### JS 创建 cookie

创建cookie的最简单方法是为document.cookie对象分配一个字符串值，如下所示:
``` js
document.cookie = "key1 = value1; key2 = value2; expires = date";
```

### 使用JS读取cookie
读取cookie就像写入cookie一样简单，因为document.cookie对象的值是cookie。

document.cookie的值是由分号分隔的name=value对的列表，其中name是cookie的名称，value是其字符串值。
可以使用split()方法将字符串分解为键和值。

### Attribute 和Property

Attribute——提供关于元素的更多细节，如id、类型、值等。

Property —— 分配给属性的值，如type =“text”，value ='Name'等

### JS访问HTML元素

下面是在JS代码中访问 html 元素的方法列表:

* getElementById(‘idname’): 按id名称获取元素
* getElementsByClass(‘classname’): 获取具有给定类名的所有元素
* getElementsByTagName(‘tagname’): 获取具有给定标记名称的所有元素
* querySelector(): 此函数采用css样式选择器并返回第一个选定元素

### JS中定义变量
在 JS 中声明变量有三种方式：

var – var 语句用于声明一个变量，咱们可以选择初始化该变量的值。例子:var a =10;变量声明在代码执行之前处理。
const - 常量的值不能通过重新赋值来改变，并且不能重新声明。
let - 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。

### 类型化语言
类型化语言中，值与值关联，而不是与变量关联，它有两种类型：

* 动态:在这种情况下，变量可以包含多种类型，如在JS中，变量可以取number, string 类型。

* 静态:在这种情况下，变量只能包含一种类型，就像在Java中声明为string的变量只能包含一组字符，不能包含其他类型。

###  window 与 document 的区别：

window:JS 的 window 是一个全局对象，它包含变量、函数、history、location。
document:document也位于window之下，可以视为window的属性。

### innerHTML 和 innerText 的区别

innerHTML:也就是从对象的起始位置到终止位置的全部内容,包括Html标签。
innerText:从起始位置到终止位置的内容, 但它去除Html标签

### JS的原始/对象类型如何在函数中传递？
两者之间的一个区别是，原始数据类型是通过值传递的，对象是通过引用传递的。

值传递：意味着创建原始文件的副本。把它想象成一对双胞胎:他们出生的时候一模一样，但是双胞胎中的老大在战争中失去了一条腿，而老二却没有。
引用传递: 意味着创建原始文件的别名。当我妈妈叫沙雕的时候，虽然我的名字叫小智，但这并不是说我就突然就克隆了一个自己:我仍然是我，只是可以用不同名字来称呼我而已。

### S中将任意基的字符串转换为整数

parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数,如下：
``` js
parseInt("4F", 16)
```

### export 和 import 是什么

import和export有助于咱们编写模块化JS代码。 使用import和export，咱们可以将代码拆分为多个文件，如下：
``` js
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
### JS中的“严格”模式是什么以及如何启用？
严格模式是在代码中引入更好的错误检查的一种方法。

* 当使用严格模式时，不能使用隐式声明的变量，或为只读属性赋值，或向不可扩展的对象添加属性。

* 可以通过在文件，程序或函数的开头添加“use strict”来启用严格模式

### call 和 apply有什么区别
call和apply可以用来重新定义函数的执行环境，也就是this的指向；call和apply都是为了改变某个函数运行时的context，即上下文而存在的，换句话说，就是为了改变函数体内部this的指向。
call()调用一个对象的方法，用另一个对象替换当前对象，可以继承另外一个对象的属性，它的语法是：
``` js
Function.call(obj[, param1[, param2[, [,...paramN]]]]);
```
说明：call方法可以用来代替另一个对象调用一个方法，call方法可以将一个函数的对象上下文从初始的上下文改变为obj指定的新对象，如果没有提供obj参数，那么Global对象被用于obj

apply() 和call()方法一样，只是参数列表不同，语法：
``` js
Function.apply(obj[, argArray]);
```
说明：如果argArray不是一个有效数组或不是arguments对象，那么将导致一个TypeError，如果没有提供argArray和obj任何一个参数，那么Global对象将用作obj。

JS中清空数组

有许多方法可以用来清空数组:

方法一：
``` js
arrayList = []
```
上面的代码将把变量arrayList设置为一个新的空数组。如果在其他任何地方都没有对原始数组arrayList的引用，则建议这样做，因为它实际上会创建一个新的空数组。咱们应该小心使用这种清空数组的方法，因为如果你从另一个变量引用了这个数组，那么原始的引用数组将保持不变。


方法二：
``` js
arrayLisy.length = 0;
```
上面的代码将通过将其length设置为0来清除现有数组。这种清空数组的方式还会更新指向原始数组的所有引用变量。 因此，当你想要更新指向arrayList的所有引用变量时，此方法很有用。

方法三：
``` js
arrayList.splice(0,arrayList.length);
```
方法四：
``` js
while(arrauList.length){
    arrayList.pop();
}
```


### delete
``` js
var output = (function(x)
{
  delete x;
  return x;
}
)(0);
console.log(output);  //0
```
delete操作符用于从对象中删除属性。这里x不是一个对象，而是一个局部变量，删除操作符不影响局部变量。

``` js
var X = { foo : 1}; 
var output = (function() 
{ 
  delete X.foo; 
  return X.foo; 
} 
)(); 
console.log(output);  //undefined
```

### 手写JSONP
``` js
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

### addEventListener
``` js
addEventListener('',function(e){

})
```

### Math
#### Math 对象属性
属性	|描述
--:|:--
E	|返回算术常量 e，即自然对数的底数（约等于2.718）。
LN2	|返回 2 的自然对数（约等于0.693）。
LN10	|返回 10 的自然对数（约等于2.302）。
LOG2E	|返回以 2 为底的 e 的对数（约等于 1.414）。
LOG10E	|返回以 10 为底的 e 的对数（约等于0.434）。
PI	|返回圆周率（约等于3.14159）。
SQRT1_2	|返回返回 2 的平方根的倒数（约等于 0.707）。
SQRT2	|返回 2 的平方根（约等于 1.414）。

#### Math 对象方法
方法	|描述
--:|:--
abs(x)	|返回数的绝对值。
acos(x)	|返回数的反余弦值。
asin(x)	|返回数的反正弦值。
atan(x)	|以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
atan2(y,x)	|返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
ceil(x)	|对数进行上舍入。
cos(x)	|返回数的余弦。
exp(x)	|返回 e 的指数。
floor(x)	|对数进行下舍入。
log(x)	|返回数的自然对数（底为e）。
max(x,y)	|返回 x 和 y 中的最高值。
min(x,y)	|返回 x 和 y 中的最低值。
pow(x,y)	|返回 x 的 y 次幂。
random()	|返回 0 ~ 1 之间的随机数。
round(x)	|把数四舍五入为最接近的整数。
sin(x)	|返回数的正弦。
sqrt(x)	|返回数的平方根。
tan(x)	|返回角的正切。
toSource()	|返回该对象的源代码。
valueOf()	|返回 Math 对象的原始值

## [浏览器多页面通信](https://blog.csdn.net/scottsu11/article/details/88357990)

###  1：websocket通讯

全双工(full-duplex)通信自然可以实现多个标签页之间的通信

WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，比如说，服务器可以在任意时刻发送消息给浏览器。为什么传统的HTTP协议不能做到WebSocket实现的功能？这是因为HTTP协议是一个请求－响应协议，请求必须先由浏览器发给服务器，服务器才能响应这个请求，再把数据发送给浏览器。

也有人说，HTTP协议其实也能实现啊，比如用轮询或者Comet。这个机制的缺点一是实时性不够，二是频繁的请求会给服务器带来极大的压力。

Comet本质上也是轮询，但是在没有消息的情况下，服务器先拖一段时间，等到有消息了再回复。这个机制暂时地解决了实时性问题，但是它带来了新的问题：以多线程模式运行的服务器会让大部分线程大部分时间都处于挂起状态，极大地浪费服务器资源。另外，一个HTTP连接在长时间没有数据传输的情况下，链路上的任何一个网关都可能关闭这个连接，而网关是我们不可控的，这就要求Comet连接必须定期发一些ping数据表示连接“正常工作”。

WebSocket并不是全新的协议，而是利用了HTTP协议来建立连接。为什么WebSocket连接可以实现全双工通信而HTTP连接不行呢？实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧。安全的WebSocket连接机制和HTTPS类似。首先，浏览器用wss://xxx创建WebSocket连接时，会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。

WebSocket连接必须由浏览器发起，特点：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

### 2：定时器setInterval+cookie

在页面A设置一个使用 setInterval 定时器不断刷新，检查 Cookies 的值是否发生变化，如果变化就进行刷新的操作。

由于 Cookies 是在同域可读的，所以在页面 B 审核的时候改变 Cookies 的值，页面 A 自然是可以拿到的。

这样做确实可以实现我想要的功能，但是这样的方法相当浪费资源。虽然在这个性能过盛的时代，浪费不浪费也感觉不出来，但是这种实现方案，确实不够优雅。

### 3：使用localstorage

localstorage是浏览器多个标签共用的存储空间，所以可以用来实现多标签之间的通信(ps：session是会话级的存储空间，每个标签页都是单独的）。

直接在window对象上添加监听即可：
``` js
window.onstorage = (e) => {console.log(e)}// 或者这样window.addEventListener('storage', (e) => console.log(e))
```
onstorage以及storage事件，针对都是非当前页面对localStorage进行修改时才会触发，当前页面修改localStorage不会触发监听函数。然后就是在对原有的数据的值进行修改时才会触发，比如原本已经有一个key会a值为b的localStorage，你再执行：localStorage.setItem('a', 'b')代码，同样是不会触发监听函数的。

### 4：html5浏览器的新特性SharedWorker

普通的webworker直接使用new Worker()即可创建，这种webworker是当前页面专有的。然后还有种共享worker(SharedWorker)，这种是可以多个标签页、iframe共同使用的。

SharedWorker可以被多个window共同使用，但必须保证这些标签页都是同源的(相同的协议，主机和端口号)

首先新建一个js文件worker.js，具体代码如下：
``` js
// sharedWorker所要用到的js文件，不必打包到项目中，直接放到服务器即可let data = ''onconnect = function (e) {  let port = e.ports[0]  port.onmessage = function (e) {    if (e.data === 'get') {      port.postMessage(data)    } else {      data = e.data    }  }}
```
webworker端(暂且这样称呼)的代码就如上，只需注册一个onmessage监听信息的事件，客户端(即使用sharedWorker的标签页)发送message时就会触发。

注意webworker无法在本地使用，出于浏览器本身的安全机制，所以我这次的示例也是放在服务器上的，worker.js和index.html在同一目录。


因为客户端和webworker端的通信不像websocket那样是全双工的，所以客户端发送数据和接收数据要分成两步来处理。示例中会有两个按钮，分别对应的向sharedWorker发送数据的请求以及获取数据的请求，但他们本质上都是相同的事件--发送消息。

webworker端会进行判断，传递的数据为'get'时，就把变量data的值回传给客户端，其他情况，则把客户端传递过来的数据存储到data变量中。下面是客户端的代码：

// 这段代码是必须的，打开页面后注册SharedWorker，显示指定worker.port.start()方法建立与worker间的连接
``` js
    if (typeof Worker === "undefined") {
      alert('当前浏览器不支持webworker')
    } else {
      let worker = new SharedWorker('worker.js')
      worker.port.addEventListener('message', (e) => {
        console.log('来自worker的数据：', e.data)
      }, false)
      worker.port.start()
      window.worker = worker
    }
``` 
// 获取和发送消息都是调用postMessage方法，我这里约定的是传递'get'表示获取数据。
``` js
window.worker.port.postMessage('get')
window.worker.port.postMessage('发送信息给worker')
```

页面A发送数据给worker，然后打开页面B，调用window.worker.port.postMessage('get')，即可收到页面A发送给worker的数据。

### [this.指向](https://juejin.im/post/5c049e6de51d45471745eb98)

* 箭头函数在自己的作用域内没有自己的this,如果需要使用this，就会指向定义时所在的作用域的this
箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。

this就几种情况：

* new，指向新对象。
* bind/apply/call，指向第一个参数（如果第一个参数是null则指向window）。
* 作为对象的方法调用，指向对象。
* 函数调用，指向window。

``` js
  // 方式1
  var a = 10;
  var obj = {
      a: 20,
      say: () => {  // 此处改为箭头函数
          console.log(this.a);
      }
  };
  obj.say(); // -> 10
  
  // 方式2
  var a = 10;
  var obj = {
      a: 20,
      say: function () {
          console.log(this.a);
      }
  };
  obj.say.call(this); // 此处显示绑定this为全局window对象
  
  // 方式3
  var a = 10;
  var obj = {
      a: 20,
      say: function () {
          console.log(this.a);
      }
  };
  
  var say = obj.say; // 此处先创建一个临时变量存放函数定义，然后单独调用
  say();
```


### 'a'+b 'a'-b

+前面为字符则转为字符串
-前面字符转数字再计算

:::

### [判断类型](https://www.cnblogs.com/178-533/p/7489403.html)

#### typeof 
可以判断基本数据类型 Number String Null Undefined 
``` js
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


``` js
var test1 = new Array();
alert(test1 instanceof Array);//输出true
var test2 = new String();
alert(test2 instanceof String);//输出true
var test3 = {};
alert(test3 instanceof Object);//输出true
var test4 = /qwe/;
alert(test4 instanceof RegExp);//输出true
var test5 = 1;
alert(test5 instanceof number);//输出false
var test6 = "";
alert(test6 instanceof String);//输出false
var test7 = true;
alert(test7 instanceof Boolean);//输出false
```
instanceof 对于基本类型输出false 对于引用类型输出true

#### Object.prototype.toString

``` js
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

### [onLoad和DOMContentLoaded](https://www.cnblogs.com/double405/p/5125059.html)

一般情况下，DOMContentLoaded事件要在window.onload之前执行，当DOM树构建完成的时候就会执行 DOMContentLoaded事件，而window.onload是在页面载入完成的时候，才执行，这其中包括图片等元素。大多数时候我们只是想在 DOM树构建完成后，绑定事件到元素，我们并不需要图片元素，加上有时候加载外域图片的速度非常缓慢。

### [new和instanceof](https://juejin.im/post/5c19c1b6e51d451d1e06c163)

1. 创建一个新对象，同时继承对象类的原型，即Person.prototype；
2. 执行对象类的构造函数，同时该实例的属性和方法被this所引用，即this指向新构造的实例；
3. 如果构造函数return了一个新的“对象”，那么这个对象就会取代整个new出来的结果。如果构造函数没有return对象，那么就会返回步骤1所创建的对象，即隐式返回this。（一般情况下构造函数不会返回任何值，不过在一些特殊情况下，如果用户想覆盖这个值，可以选择返回一个普通的对象来覆盖。）

``` js
// let p = new Person()
let p = (function () {
    let obj = {};
    obj.__proto__ = Person.prototype;
    
    // 其他赋值语句...
    
    return obj;
})();
```
instanceof 内部机制 ，实现x instanceof y的内部判断：
``` js
while(x._prototype_!==null){
  if(x._proto_===y.prototype){
    return true;
  }
  x._proto_ = x._proto_.proto_;
}
if(x._proto_==null){return false;}
```

``` js
function F() {}
function O() {}

O.prototype = new F();
var obj = new O();

console.log(obj instanceof O); // true
console.log(obj instanceof F); // true
console.log(obj.__proto__ === O.prototype); // true
console.log(obj.__proto__.__proto__ === F.prototype); // true
```
根据new机制修改上面代码
``` js
function F() {}
function O() {}

var obj = (function () {
    var obj1 = {};
    obj1.__proto__ = F.prototype; // new F();
    O.prototype = obj1; // O.prototype = new F();
    obj.__proto__ = O.prototype; // new O();
    obj.__proto__ = obj1;
    return obj;
})();
```
结合instanceof内部机制很容易得出正确答案，调整一下顺序，结果不同
``` js
function F(){}
function O(){}

var obj = new O();
O.prototype = new F();

console.log(obj instanceof O); //false
console.log(obj instanceof F); //false
console.log(obj._proto_=== O.prototype);  //false
console.log(obj._proto_._proto_=== F.prototype);  //false
```
### [js遍历](https://www.jianshu.com/p/c43f418d6bf0)

``` js
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

## [Attribute和Property](https://www.cnblogs.com/lmjZone/p/8760232.html)

* property是DOM中的属性，是JavaScript里面的对象
* attribute是HTML标签上的特性，它的值只能是字符串

* property能够从attribute中得到同步；
* attribute不会同步property上的值；
* attribute和property之间的数据绑定是单向的，attribute->property；
* 更改property和attribute上的任意值，都会将更新反映到HTML页面中