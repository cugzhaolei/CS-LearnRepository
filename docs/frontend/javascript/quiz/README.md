# JavaScript 相关面试题


## [webworker](./webworker/)
## [vue 相关](./vue/)
## [Vue面试知识](./vue/)
## [防抖与节流](https://www.jianshu.com/p/566c66aafa22)

:::
## array 相关
::: tip
- map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

``` js
//["1","2","3"].map(parseInt)

//
var ary = [0,1,2];																
ary[10]=10; 
ary.filter(function(x){return x===undefined;});

console.log(ary);

//3-9都没有初始化 
[0,1,2,empty*7,10];

```
:::

## 自执行函数
::: tip
``` js

常见两种方式
1.(function(){...})()
  (function(x){
      console.log(x);
  })(12345)
2.(function(){...}())
  (function(x){
      console.log(x);
  }(12345))
作用 不破坏污染全局的命名空间，若需要使用，将其用变量传入如
（function(window){...}(window)）

```
:::

## async/await
::: tip

ES7 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
想较于 Generator，Async 函数的改进在于下面四点：

* 内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样；
* 更好的语义。async 和 await 相较于 * 和 yield 更加语义化；
* 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）；
* 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator对象方便，可以直接使用 then() 方法进行调用。

作者：xiangzhihong
链接：https://juejin.im/post/5bee888fe51d4557fe34e356
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
``` js
//作用：异步代码的新方式
//promise示例
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
//async/await示例
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}

```
:::

## [Js Mixin](https://www.jianshu.com/p/7c1471ec4c50)

::: tip
Mixin模式，混合模式。这是一种不用继承就可以复用的技术。主要还是为了解决多重继承的问题。多继承的继承路径是个问题。
JS是基于对象的，类和对象都是对象模板。
混合mixin，指的是将一个对象的全部或者部分拷贝到另一个对象上去。其实就是属性了。
可以将多个类或对象混合成一个类或对象。

### 继承实现

``` js
class Serialization {
    constructor() {
        console.log("Serialization construtor ~~~~~~")
        if (typeof(this.stringfy) !== "function") {
            throw new ReferenceError("should define stringify.");
        }
    }
}

class Point extends Serialization {
    constructor(x, y) {
        console.log("Point Constructor");
        super(); // 调用父构造器
        this.x = x;
        this.y = y;
    }

    stringfy() {
        return `<Point x="${this.x}, y=${this.y}">`;
    }
}

s = new Serialization(); // 构造Serialization失败
p = new Point(4,5); // 构造子类对象时，调用父类构造器执行也会失
```
父类构造函数中，要求具有属性是stringify的序列化函数，如果没有则抛出异常。

以下是完整继承的代码
``` js
class Serialization {
    constructor() {
        console.log("Serialization construtor ~~~~~~")
        if (typeof(this.stringfy) !== "function") {
            throw new ReferenceError("should define stringify.");
        }
    }
}

class Point extends Serialization {
    constructor(x, y) {
        console.log("Point Constructor");
        super(); // 调用父构造器
        this.x = x;
        this.y = y;
    }

    stringfy() {
        return `<Point x="${this.x}, y=${this.y}">`;
    }
}

class Point3D extends Point {
    constructor(x, y, z) {
        super(x, y); // 调用父构造器
        this.z = z;
    }

    stringfy() {
        return `<Point3D x="${this.x}, y=${this.y}, z=${this.z}">`
    }
}

p = new Point(4, 5);
console.log(p.stringfy());
console.log("=====================");
p3d = new Point3D(7, 8, 9);
console.log(p3d.stringfy());

/* 输出结果
Point Constructor
Serialization construtor ~~~~~~
<Point x="4, y=5">
=====================
Point Constructor
Serialization construtor ~~~~~~
<Point3D x="7, y=8, z=9">
*/
```
### 高阶对象实现
``` js
const Serialization = Sup => class extends Sup{
    constructor(...args){
        console.log("Serialization constructor");
        super(...args);
        if (typeof this.stringfy !== "function"){
            throw ReferenceError("Stringfy is not define.");
        }
    }
};

class Point{
    constructor(x, y){
        console.log("Point sonctructor");
        this.x = x;
        this.y = y;
    }
}

class Point3D extends Serialization(Point){
    constructor(x, y, z){
        super(x, y);
        this.z = z;
    }
    stringfy(){
        console.log(`<Point ${this.x}.${this.y}.${this.z}>`)
    }
}

let p3d = new Point3D(3, 4, 5);
p3d.stringfy();

/* 输出结果
Serialization constructor
Point sonctructor
<Point 3.4.5>
*/
```

## 常见面试题

### 节点的CRUD操作

* 创建新节点
``` js
createDocumentFragment  //创建新DOM片段
createElement //创建一个元素
createTextNode //创建一个文本节点
```
* 添加 移除 替换 插入
``` js
appendChild() //添加
removeChild //移除
replaceChild //替换
insertBofore //插入
```
* 查找
``` js
getElementsByTagName() //通过标签名查找
getElementsByName() //通过元素的name属性查找
getElementById() //通过元素的id查找
```

### 闭包

定义和用法：
一个父函数里面包含了一个子函数，子函数调用了父函数内部的变量，如果子函数在外部被调用，就产生了闭包。简单的说，闭包就是能够读取其他函数内部变量的函数。
闭包的作用：
1. 读取其他函数内部的变量
2. 变量保存在内存中
注意：
使用过多的闭包会消耗大量内存，造成网页的性能问题，可以在函数执行完成之前把不需要的局部变量删除。

### 浏览器存储

- 数据存储大小
* cookie：4kb
* webStorge：5mb
- 数据存储有效期限
* cookie：根据自己的设置时间
* sessionStorage：关闭窗口后失效
* localStorage：永久有效除非js删除或者浏览器删除
- 作用域
- cookie和localStorage是在同源窗口，同一个浏览器共享的，sessionStorage只在同一个标签页共享。

### document load & ready

* ready：页面的文档结构加载完成，不包括图片视频等非文字内容。 
* load：所有页面元素都加载完成 ready的速度比load快

### 输入url到显示页面
涉及的主要流程或步骤有：
* ①浏览器根据请求的URL，交给DNS域名解析，找到真实的ip，交给域名解析。
* ②服务器交给后端处理完成后返回的数据，浏览器接收文件HTML,CSS,JS图片等。
* ③浏览器对加载的资源进行语法解析，建立相应的数据内部结构。
* ④解析html，创建dom树，自上而下的顺序
* ⑤解析css，优先级：浏览器默认设置<用户设置<外部样式<内联样式<HTML中的style样式；
* ⑥将css与dom合并，构建渲染树
* ⑦布局重绘重排，页面完成渲染。

### HTNL5 新特性

* 新增了 canvas，video，audio，nav，section，footer，header等元素。
* 表单控件，calendar、date、time、email、url、search
* 存储技术：localStorage，sessionStorage等
* 新的技术：webworker, websocket, Geolocation

### Iframe
* ①iframe会阻塞页面的 onload事件
* ②搜索引擎不能够解读 iframe 页面，不利于 seo
* ③iframe和主页面共享连接池，然而浏览器对相同域的链接是有限制的，所以这会影响页面的并行加载。
* ④如果想要绕开以上的2个问题，可以考虑通过js动态复职给 iframe添加src值。


### web标准以及w3c标准

标签闭合，标签小写，不乱嵌套，使用外链形式的css和js，结构层，表现层，行为层分离。

### 元素类型

* 行内元素：a b span img input select strong 
* 块级元素：div ul li ol dl dt dd h1 h2 h3 p 
* 空元素：br hr link meta 
块级元素独占一行，行内元素合一并行一行

清除浮动的几种方式

1. clear：both，添加一个空标签div 
2. 父级div定义伪类:after和zoom 
3. 父级div定义overflow:hidden 
4. 父级div也浮动，需要定义宽度 
5. 结尾处加br标签clear:both
``` js
.clearfix:after{visibility:hidden;display:block;font-size:0;content:" ";clear:both;height:0}
.clearfix{display:inline-table}
.clearfix{height:1%}
.clearfix{display:block;*zoom:1}
```

### base64的原理及优缺点

* 优点:可以将二进制数据转化为可打印字符，方便传输数据，对数据进行简单的加密，肉眼安全。
* 缺点：内容编码后体积变大，编码和解码需要CPU额外工作量。

### [事件代理，事件委托](https://www.jianshu.com/p/a77d8928c5c9)
事件委托就是利用事件冒泡，只制定一个时间处理程序，就可以管理某一类型的所有事件。

#### 事件委托
在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率越大，100个li就要占用100个内存空间。如果要用事件委托，就会将所有的操作放到js程序里面，只对它的父级(如果只有一个父级)这一个对象进行操作，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

#### 原理：
事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

假如我们有一个 ul 列表，里面有4个li，我们可以在 li 上绑定 click 事件，但是也可以在她们的 父节点 ul上绑定，这种在 父节点上绑定事件来代替子节点事件的方法，就叫做事件委托。

#### [时间冒泡与捕获](https://www.cnblogs.com/html55/p/10164914.html)
DOM2.0模型将事件处理流程分为三个阶段：一、事件捕获阶段，二、事件目标阶段，三、事件起泡阶段。如图:
![](/images/js-event-buble.webp)

例子1. 页面有个ul包含着4个li，鼠标移动到li上，li背景变成红色，移出，背景恢复原色。

如果按照以前的写法，代码如下：

``` js
<ul id="ul1">
            <li>111</li>
            <li>222</li>
            <li>333</li>
            <li>444</li>
        </ul>
        
        <script type="text/javascript">
            window.onload = function(){
                var oUl = document.getElementById('ul1');
                var aLi = oUl.children;
                console.log(aLi);
                
                //传统方法，li身上添加事件，需要用for循环，找到每个li
                for (var i=0;i<aLi.length;i++) {
                    aLi[i].onmouseover = function() {
                        this.style.background = 'red';
                    }
                    aLi[i].onmouseout = function(){
                        this.style.background = '';
                    }
                }//for结束
            }
        </script>
```
事件委托写法:
``` js
<script type="text/javascript">
            window.onload = function(){
                var oUl = document.getElementById('ul1');                
                oUl.onmouseover = function(ev){
                    var ev = ev || window.event;
                    var oLi = ev.srcElement || ev.target;
                    oLi.style.background = 'red';                    
                }
                
                oUl.onmouseout = function(ev){
                    var ev = ev || window.event;
                    var oLi = ev.srcElement || ev.target;
                    oLi.style.background = '';                    
                }
            }
        </script>
```
改进版

``` js
<script type="text/javascript">
            window.onload = function(){
                var oUl = document.getElementById('ul1');            
                oUl.onmouseover = function(ev){
                    var ev = ev || window.event;
                    var oLi = ev.srcElement || ev.target;
                    if(oLi.nodeName.toLowerCase() == 'li'){
                        oLi.style.background = 'red';
                    }                                     
                }
                
                oUl.onmouseout = function(ev){
                    var ev = ev || window.event;
                    var oLi = ev.srcElement || ev.target;
                    if(oLi.nodeName.toLowerCase() == 'li'){
                        oLi.style.background = '';
                    }                
                }      
            }
        </script>
```

### 简述vue、react

 Vue的优势包括： 
- 模板和渲染函数的弹性选择 
- 简单的语法及项目创建 
- 更快的渲染速度和更小的体积

- React的优势包括： 
- 更适用于大型应用和更好的可测试性 
- 同时适用于Web端和原生App 
- 更大的生态圈带来的更多支持和工具 
- 而实际上，React和Vue都是非常优秀的框架，它们之间的相似之处多过不同之处，并且它们大部分最棒的功能是相通的： 
- 利用虚拟DOM实现快速渲染 
- 轻量级 
- 响应式和组件化 
- 服务器端渲染 
- 易于集成路由工具，打包工具以及状态管理工具 
- 优秀的支持和社区


### Jquery 对比 Vue

- DOM操作
- 设计模式 MVVM


### eval
把对应的字符串解析成JS代码并运行 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行） 由JSON字符串转换为JSON对象的时候可以用eval，
``` js
var obj =eval('('+ str +')')
```

### null & undefined

* undefined: 表示不存在这个值，如果变量被声明了没有赋值。
* null： 变量被定义赋值了，但是为空的情况，没有任何属性方法和值 
* 在验证null时，一定要使用 === ，因为 ==无法分别null 和 undefined
``` js
typeof null
"object"
typeof undefined
"undefined"
typeof Number
"function"
typeof String
"function"
typeof NaN
"number"
typeof '12'
"string"
typeof 12
"number"
typeof 1+'2'
"number2"
typeof '1'+2
"string2"
typeof ('1'+2)
"string"
typeof (1+'2')
"string"
```

### JSON
json是JavaScript Object Notation的缩写，即JavaScript对象表示法，是一种轻量级的数据交换格式，易于阅读和编写，同时也易于机器解析和生成。json是存储和交换文本信息的语法，类似于XML。json采用完全独立与语言的文本格式，它的语言格式类似于c语言家族。这些特性也使的json成为理想的数据交换语言。

#### parse()
JSON字符串转换为JSON对象
``` js
var obj =eval('('+ str +')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
```
#### stringify()
JSON对象转换为json字符串
``` js
var last=obj.toJSONString();
var last=JSON.stringify(obj);
```

### DOMContentLoaded&Window.onload
DOMContentLoaded事件要在window.onload之前执行，当DOM树构建完成的时候就会执行DOMContentLoaded事件。当window.onload事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

### attribute和property

* attribute是dom元素在文档中作为html标签拥有的属性； 
* property就是dom元素在js中作为对象拥有的属性。

### [OOP & OPP](https://www.cnblogs.com/mmmzh/p/10108163.html)

* OPP（面向过程）

优点：调用的时候不需要实例化，不消耗资源，性能比面向对象高

缺点：没有面向对象易维护、易复用、易扩展 .

* OOP（面向对象）

优点：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更加灵活、更加易于维护 

缺点：性能比面向过程低 

### [JSONP]
``` js
function jsonp(url, jsonpCallback, success) {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
}

```

### json转换

将数组obj格式：
``` js
var obj = [
    {id:1, parent: null},
    {id:2, parent: 1},
    {id:3, parent: 2},
];
```
转换为obj2格式：
``` js
var obj2 = {
    obj: {
        id: 1,
        parent: null,
        child: {
            id: 2,
            parent: 1,
            child: {
                id: 3,
                parent: 2
            }
        }
    }
```

``` js
var oj2 = {};
fucntion createObj2(obj,child){
    if(child.parent){
        if(obj.obj){
            createObj2(obj.obj,child);
        }else{
            if(obj.id====child.parent){
                obj.child={
                    id:child.id,
                    parent:child.parent,
                }
            }else{
                if(obj.child){
                    createObj2(obj.child,child);
                }else{
                    console.log('obj22未匹配到对应的parent关系')
                }
            }
        }
    }else{//不在父节点 则为根节点
        obj.obj={
            id:child.id,
            parent:child.parent,
            child:{}
        }
    }
}
obj.forEacf(item,item_i=>{
    createObj2(obj2,item)
})
console.log('obj2':obj2)
```

### [LazyMan]()
``` js
//实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")//输出:
	//Hi! This is Hank!
LazyMan("Hank").sleep(10).eat("dinner")//输出
//Hi! This is Hank!
//等待10秒..
//Wake up after 10
//Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")//输出
//Hi This is Hank!
//Eat dinner~
//Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")//输出
//等待5秒
//Wake up after 5
//Hi This is Hank!
//Eat supper

//这是一个典型的流程控制，我们需要按照条件把事件注册到队列中，然后再执行，执行下一个事件通过next来控制
//然后要实现链式调用

function LazyMan(name){
    this.events=[];
    var self = this;
    var fn = (function(name){
        //使用闭包保证正确输出
        return function(){
            console.log("Hi! This is "+name+"!");
            self.next();
        }
    })(name)
    this.events.push(fn);
    //在下一次eventLoop中启动，啫喱水事件队列开始执行的启动点
    setTimeout(function(){
        self.next();
    },0);
}

LazyMan.prototype = {
    //next执行事件
    next:function(){
        var self = this;
        //事件执行按照先进先出方式
        var fn = self.events.shift();
        fn&&fn();
    },
    sleep:function(time){
        if(isNaN(time)){
            throw new Error(time+"must be numeric");
        }
        var self = this;
        var fn = (function(time){
            return function(){
                var timer = setTimeout(function(){
                    console.log("Wake up after"+time+"s");
                    self.next();
                },time*1000)
            }
        })(time)
        self.events.unshift(fn);
        return self;//实现链式调用
    }，
    sleepFirst:function(time){
        id(isNaN(time)){
            throw new Error(time+"必须是数字")；
        }
        var self = this;
        var fn = (function(time){
            return function(){
                var timer = setTimeout(function(){
                    console.log("Wake up after"+time+"s");
                    self.next();
                },time*1000)
            }
        })(time);
        self.events.unshift(fn);//top priority
        return self;
    },
    eat:fucntion(name){
        var self = this;
        var fn = (function(name){
            return function(){
                    console.log("Wake up after"+time+"s");
                    self.next();
            }
        })(name);
        self.events.push(fn);
        return self;
    }
}

function LazyMan(name){
    return new lazyMan(name);
}
```

### [EventBus](https://segmentfault.com/a/1190000017907688)
EventBus是消息传递的一种方式，基于一个消息中心，订阅和发布消息的模式。
 1. 设计模式：订阅者发布者模式
 2. API设计
    1. 只能构造一个消息对象
    2. on('msgName',func)订阅消息，msgname订阅的消息名称;func订阅的消息
    3. one('msgName',func)经订约一次消息，后订阅的会替换前面订阅的消息
    4. emit('msgname',msg)发布消息 msgName；消息名称 msg:发布的消息
    5. off('msgName)移除消息

代码实现
``` js
//构造EventBus
EventBusClass = function(){
    this.msgQueues = {}
}

EventBusClass.prototype = {
    //消息保存到当前消息队列中
    on:function(msgName,func){
        if(this.msgQueues.hasOwnProperty(msgName)){
            if(typeof this.msgQueues[msgName]==='function'){
                this.msgQueues[msgName] = [this.msgQueues[msgName],func]
            }else{
                this.msgQueues[msgName] = [...this.msgQueues[msgName],func]
            }
        }else{
            this.msgQueues[msgName] = func;
        }
    },
    //消息队列中仅保存一个消息
    one:function(msgName,func){
        this.msgQueues[msgName] = func;
    },
    //发送消息
    emit:function(msgName,msg){
        if(!this.msgQueues.hasOwnProperty(msgName)){
            return
        }
        if(typeof this.msgQueues[msgName]==='function'){
            this.msgQueue[msgName](msg)
        }else{
            this.msgQueues[msgName].map((fn)=>{
                fn(msg)
            })
        }
    },
    //移除消息
    off:function(msgName){
        if(!this.msgQueues.hasOwnProperty(msgName)){
            return
        }
        delete this.msgQueues[msgName]
    }
}
//将EventBus放到window对象中
const EventBus = new EventBusClass();
window.EventBus = EventBus;

//使用EventBus
//订阅消息
function subscribe(){
    EventBus.on('first-event',function(msg){
        alert(`订阅的消息是：${msg}`);
    });
}

//发送消息
function emit(){
    const msgInput = document.getElementById('msgInputId')
    EventBus.emit('first-event',msgInput.value)
}
//移除消息
function off(msgName){
    EventBus.off(msgName);
}
```

[CodePen](https://codepen.io/beyondverage0908/pen/maQpgR/)

:::