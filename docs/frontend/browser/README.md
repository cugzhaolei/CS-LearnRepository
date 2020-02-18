# 浏览器相关知识


## 浏览器内核

浏览器/RunTime|：内核（渲染引擎）|JavaScript 引擎
--：|：--|：--
Chrome	|Blink（28~） Webkit（Chrome 27）	|V8
FireFox |Gecko |	SpiderMonkey
Safari	|Webkit|	JavaScriptCore
Edge	|EdgeHTML	|Chakra(for JavaScript)
IE	|Trident	|Chakra(for JScript)
PhantomJS	|Webkit	|JavaScriptCore
Node.js	-	|V8|-

<table>
    <thead>
    <th><td></td></th>
    </thead>
    <tbody>
    <tr><td></td></tr>
    </tbody>
</table>

## [浏览器组成](https://www.jianshu.com/p/e4a75cb6f268)

1. 用户界面 - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
2. 浏览器引擎 - 在用户界面和呈现引擎之间传送指令。
3. 呈现引擎 - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
4. 网络 - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
5. 用户界面后端 - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. JavaScript 解释器。用于解析和执行 JavaScript 代码。
7. 数据存储。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

![](/images/browser-layer.webp)

## 浏览器引擎工作流程

1. 浏览器获取HTML文件，然后对文件进行解析，形成DOM Tree
2. 与此同时，进行CSS解析，生成Style Rules
3. 接着将DOM Tree与Style Rules合成为 Render Tree
4. 接着进入布局（Layout）阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标
5. 随后调用GPU进行绘制（Paint），遍历Render Tree的节点，并将元素呈现出来
![](/images/browser-render.webp)

### [DOM 解析和渲染](https://juejin.im/post/59c60691518825396f4f71a1)

1. CSS 不会阻塞 DOM 的解析

![](/images/browser-chunk.webp)

2. CSS 阻塞页面渲染

3. JS 阻塞 DOM 解析,但浏览器会"偷看"DOM，预先下载相关资源。

4. 浏览器遇到 \<script>且没有defer或async属性的 标签时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

## [CSS解析](https://segmentfault.com/a/1190000016253407)

[浏览器如何解析](https://www.cnblogs.com/fundebug/p/how-does-browser-parse-css.html)

[浏览器工作流程](https://segmentfault.com/a/1190000009236417)
CSS从右往左解析，因此可以想到HTML性能调优的时候，尽量减少层级嵌套

## CSS优先级

* !important > 内联 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 通配符 > 继承

## [DOM Tree构建](https://www.jianshu.com/p/14d54a263291)

1. 转码: 浏览器将接收到的二进制数据按照指定编码格式转化为HTML字符串
2. 生成Tokens: 之后开始parser，浏览器会将HTML字符串解析成Tokens
3. 构建Nodes: 对Node添加特定的属性，通过指针确定 Node 的父、子、兄弟关系和所属 treeScope
4. 生成DOM Tree: 通过node包含的指针确定的关系构建出DOM Tree
![](/images/dom-tree-render.png)


## 回流与重绘
* 回流: 部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算，表现为重新生成布局，重新排列元素
* 重绘: 由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新，表现为某些元素的外观被改变

单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成回流之后，将会重新绘制受到此次回流影响的部分

回流和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下回流的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。

『重绘』不一定会出现『回流』，『回流』必然会出现『重绘』。

## 如何触发回流和重绘？
任何改变用来构建渲染树的信息都会导致一次回流或重绘：

* 添加、删除、更新DOM节点
* 通过display: none隐藏一个DOM节点-触发回流和重绘
* 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
* 移动或者给页面中的DOM节点添加动画
* 添加一个样式表，调整样式属性
* 用户行为，例如调整窗口大小，改变字号，或者滚动。
## 如何避免重绘或者回流？
###  集中改变样式
我们往往通过改变class的方式来集中改变样式
``` js
// 判断是否是黑色系样式
const theme = isDark ? 'dark' : 'light'

// 根据判断来设置不同的class
ele.setAttribute('className', theme)
```
#### 使用DocumentFragment
我们可以通过createDocumentFragment创建一个游离于DOM树之外的节点，然后在此节点上批量操作，最后插入DOM树中，因此只触发一次回流
``` js
var fragment = document.createDocumentFragment();

for (let i = 0;i<10;i++){
  let node = document.createElement("p");
  node.innerHTML = i;
  fragment.appendChild(node);
}

document.body.appendChild(fragment);
```
### 提升为合成层
将元素提升为合成层有以下优点：

* 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
* 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
* 对于 transform 和 opacity 效果，不会触发 layout 和 paint
提升合成层的最好方式是使用 CSS 的 will-change 属性：
``` css
#target {
  will-change: transform;
}
```

## 前端及时通信

### 短轮询
### [Comet](http://www.52im.net/thread-334-1-1.html)

### [SSE](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
SSE 与 WebSocket 作用相似，都是建立浏览器与服务器之间的通信渠道，然后服务器向浏览器推送信息。
总体来说，WebSocket 更强大和灵活。因为它是全双工通道，可以双向通信；SSE 是单向通道，只能服务器向浏览器发送，因为流信息本质上就是下载。如果浏览器向服务器发送信息，就变成了另一次 HTTP 请求。

![](/images/ryf-server-sent-events.jpg)

但是，SSE 也有自己的优点。
* SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
* SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
* SSE 默认支持断线重连，WebSocket 需要自己实现。
* SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
* SSE 支持自定义发送的消息类型。

### [websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。
它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。
![](/images/ryf-websocket.png)
其他特点包括：
* （1）建立在 TCP 协议之上，服务器端的实现比较容易。
* （2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
* （3）数据格式比较轻量，性能开销小，通信高效。
* （4）可以发送文本，也可以发送二进制数据。
* （5）没有同源限制，客户端可以与任意服务器通信。
* （6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

* 优点：真正意义上的实时双向通信，性能好，低延迟
* 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器

### [webworker](/webworker/)

### [service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

## 浏览器同源
同源策略是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSRF等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。
![](/images/site-origin.webp)

可实现跨域的标签
\<link> 
\<img> 
\<script>

当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示：

![](/images/cross-site-type.webp)

## 如何实现跨域

### JSONP
最经典

### CORS
最流行

### NGINX
最方便

### [其他方案](https://juejin.im/post/5c23993de51d457b8c1f4ee1#heading-19)
