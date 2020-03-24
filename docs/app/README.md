## 移动应用

::: tip

- 移动开发也称为手机开发，或叫做移动互联网开发。是指以手机、PDA、UMPC等便携终端为基础，进行相应的开发工作，由于这些随身设备基本都采用无线上网的方式，因此，业内也称作为无线开发。
- 移动开发根据宿主环境和可以分为三种类型
:::

## 手机应用

::: tip

- 目前手机应用与电脑应用各有千秋，但是在针对电商等领域，移动端的用户量已经越来越多
:::

## 开发难题
::: tip

- 手机操作系统种类繁多 一套系统想要在多平台兼容需要大量开发人员
- 移动开发较为困难：手机种类繁多、成本较高
:::

## 解决方法

::: tip

- 无线中间件
- 1. 跨平台：中间件系统都号称跨平台，一次开发，可以适用于不同的平台。
- 2. 门槛高：用WEB开发技术（HTML+JS+CSS) 开发移动应用，极大地降低了门槛，提高了效率。
- 3. 公司转型：软件和互联网公司利用中间件系统开发移动应用，完全是在发挥原有的长处，而无需投入任何资源学习新知识。
- 4. 专业的人做专业的事：无线中间件（移动中间件）的原理就是把原生的功能封装打包成简单的API，开发人员只需要了解调用这些API的方法，即可完成移动开发。
:::

## 原生应用 native app

::: tip
- 百度百科的定义：基于智能手机本地操作系统如iOS、Android、WP并使用原生程式编写运行的第三方应用程序，一般开发的语言为Java、C++等。在使用上的具体表现就是，手机桌面上的图标点进去基本就是native app了。
:::

## 网页应用 web app

::: tip
- 百度百科的定义：基于web的系统和应用，运行于网络和浏览器之上，目前多采用h5标准开发。在使用上的具体表现是，手机浏览器点击进入，会有一些应用的小图标，这些小图标在点击后，在浏览器里加载的页面 跟你直接下载一个app后打开的页面是相同的，这些小图标代表的就是web app。
:::

>----------
来源：郭东东

https://segmentfault.com/a/1190000015678155

>-----------

## 混合应用 hybrid app

::: tip
- Hybrid App主要以JS+Native两者相互调用为主，从开发层面实现“一次开发，多处运行”的机制，成为真正适合跨平台的开发。Hybrid App兼具了Native App良好用户体验的优势，也兼具了Web App使用HTML5跨平台开发低成本的优势。

目前已经有众多Hybrid App开发成功应用，比如美团、爱奇艺、微信等知名移动应用，都是采用Hybrid App开发模式。
:::

### 主流混合方案

::: tip
- 基于 WebView UI 的基础方案，市面上大部分主流 App 都有采用，例如微信JS-SDK，通过 JSBridge 完成 H5 与 Native 的双向通讯，从而赋予H5一定程度的原生能力。
- 基于 Native UI 的方案，例如 React-Native、Weex。在赋予 H5 原生API能力的基础上，进一步通过 JSBridge 将js解析成的虚拟节点树(Virtual DOM)传递到 Native 并使用原生渲染。
- 另外还有近期比较流行的小程序方案，也是通过更加定制化的 JSBridge，并使用双 WebView 双线程的模式隔离了JS逻辑与UI渲染，形成了特殊的开发模式，加强了 H5 与 Native 混合程度，提高了页面性能及开发体验。
:::

### hybrid技术原理

::: tip
-Hybrid App的本质，其实是在原生的 App 中，使用 WebView 作为容器直接承载 Web页面。因此，最核心的点就是 Native端 与 H5端 之间的双向通讯层，其实这里也可以理解为我们需要一套跨语言通讯方案，来完成 Native(Java/Objective-c/...) 与 Java 的通讯。这个方案就是我们所说的 JSBridge，而实现的关键，便是作为容器的 WebView，一切的原理都是基于 WebView 的机制。
:::

### hybridapp 基础原理

::: tip
- Java 通知 Native
- Native 通知 Java
- JSBridge 的接入
- H5 的接入
:::

## 各类app优缺点

::: tip
特性|webapp|hybridapp|nativeapp
---:|:---:|:---:|:---
开发成本|低|中|高 
维护更新|简单|简单|复杂
体验|差|中|优
商城认可|认可|不认可|认可
安装|不需要|需要|需要
跨平台|优|优|差
:::

## 小程序

::: tip

* 通过更加定制化的 JSBridge，赋予了 Web 更大的权限，并使用双 WebView 双线程的模式隔离了 JS逻辑 与 UI渲染，形成了特殊的开发模式，加强了 H5 与 Native 混合程度，属于第一种方案的优化版本；
* 优势: 用户体验好于常规 Webview 方案，且通常依托的平台也能提供更为友好的开发调试体验以及功能；
* 劣势: 需要依托于特定的平台的规范限定
:::

## 交互原理

::: tip
Hybrid技术 中最核心的点就是 Native端 与 H5端 之间的 双向通讯层，其实这里也可以理解为我们需要一套 跨语言通讯方案，便是我们常听到的 JSBridge。

* JavaScript 通知 Native
    * API注入，Native 直接在 JS 上下文中挂载数据或者方法
       * 延迟较低，在安卓4.1以下具有安全性问题，风险较高

    * WebView URL Scheme 跳转拦截
       * 兼容性好，但延迟较高，且有长度限制

    * WebView 中的 prompt/console/alert拦截(通常使用 prompt)

* Native 通知 Javascript:

    * IOS: stringByEvaluatingJavaScriptFromString
    ``` Swift
    webview.stringByEvaluatingJavaScriptFromString("alert('NativeCall')")
    ```
    * Android: loadUrl (4.4-)

    ``` js
    // 调用js中的JSBridge.trigger方法
    // 该方法的弊端是无法获取函数返回值；
    webView.loadUrl("javascript:JSBridge.trigger('NativeCall')")
    ```

    * Android: evaluateJavascript (4.4+)

    ``` js
    // 4.4+后使用该方法便可调用并获取函数返回值；
    mWebView.evaluateJavascript（"javascript:JSBridge.trigger('NativeCall')", 	 new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String value) {
            //此处为 js 返回的结果
        }
    });
    ```

:::
## 接入方案

::: tip
整套方案需要 Web 与 Native 两部分共同来完成:

* Native: 负责实现URL拦截与解析、环境信息的注入、拓展功能的映射、版本更新等功能；
* JavaScirpt: 负责实现功能协议的拼装、协议的发送、参数的传递、回调等一系列基础功能。

接入方式：
* 在线H5: 直接将项目部署于线上服务器，并由客户端在 HTML 头部注入对应的 Bridge。

    * 优势: 接入/开发成本低，对 App 的侵入小；
    * 劣势: 重度依赖网络，无法离线使用，首屏加载慢；


* 内置离线包: 将代码直接内置于 App 中，即本地存储中，可由 H5 或者 客户端引用 Bridge。

    * 优势: 首屏加载快，可离线化使用；
    * 劣势: 开发、调试成本变高，需要多端合作，且会增加 App 包体积
::: 

### 优化方案

::: tip
* Webview 预加载: Webview 的初始化其实挺耗时的。我们测试过，大概在100~200ms之间，因此如果能前置做好初始化于内存中，会大大加快渲染速度。
* 更新机制: 使用离线包的时候，便会涉及到本地离线代码的更新问题，因此需要建立一套云端下发包的机制，由客户端下载云端最新代码包 (zip包)，并解压替换本地代码。
   * 增量更新: 由于下发包是一个下载的过程，因此包的体积越小，下载速度越快，流量损耗越低。只打包改变的文件，客户端下载后覆盖式替换，能大大减小每次更新包的体积。
   * 条件分发: 云平台下发更新包时，可以配合客户端设置一系列的条件与规则，从而实现代码的条件更新:
      * 单 地区 更新: 例如一个只有中国地区才能更新的版本；
      * 按 语言 更新: 例如只有中文版本会更新；
      * 按 App 版本 更新: 例如只有最新版本的 App 才会更新；
      * 灰度 更新: 只有小比例用户会更新；
      * AB测试: 只有命中的用户会更新；
* 降级机制: 当用户下载或解压代码包失败时，需要有套降级方案，通常有两种做法:
   * 本地内置: 随着 App 打包时内置一份线上最新完整代码包，保证本地代码文件的存在，资源加载均使用本地化路径；
   * 域名拦截: 资源加载使用线上域名，通过拦截域名映射到本地路径。当本地不存在时，则请求线上文件，当存在时，直接加载；

* 跨平台部署: Bridge层 可以做一套浏览器适配，在一些无法适配的功能，做好降级处理，从而保证代码在任何环境的可用性，一套代码可同时运行于 App内 与 普通浏览器；
* 环境系统: 与客户端进行统一配合，搭建出 正式 / 预上线 / 测试 / 开发环境，能大大提高项目稳定性与问题排查；
* 开发模式:
   * 能连接PC Chrome/safari 进行代码调试；
   * 具有开发调试入口，可以使用同样的 Webview 加载开发时的本地代码；
   * 具备日志系统，可以查看 Log 信息；
:::

## [hybridAPP 核心](https://github.com/xd-tayde/blog/blob/master/hybrid-2.md)

## JSBridge核心代码

::: tip

### 1.业务方使用姿势

![hybrid2native](/images/hybrid-6.png)

``` js
Bridge.nativeCall('getNetwork',{},e=>{
    if(e.data&&e.data.type==0){
        //无网络状态
        //...
    }else{
        //type：wifi/2g/3g/4g
        //...
    }
})
```

:::

### 1、H5-Native5通信

::: tip
nativeCall内部实现

``` js
let i=0;
function nativeCall(scheme = throwError(),params,callBack){
    //对参数进行字符串化，并进行编码
    parmas = params?decode(JSON.stringify(params)):''

    //生成唯一handler标识
    const handler = i++;
    handlerKey = getHandlerKey(handler);

    //将参数存储进参数池
    _paramsStore.save(handlerKey.p,params);

    if(isFn(callback)){
        //将回调存储金回调池
        _callbackStore.save(handlerKey.c,callback);
        //注册自定义事件，并绑定回调
        //回调会在接收到postMessage时触发执行
        addEvent(handlerKey.e,e=>{
            const {data,handler} = e.data;
            //完成一次完整交互时，将该自定义事件解绑
            removeEvent(handler)
            callback.call(MTJs,data)
        })
    }

    send(`${scheme}?handler=${handler}`);
}
```

上述代码构建过程

* 生成唯一handler标识，从0开始增加
* 将参数按handler值的规则存入参数池(_paramsStore)
* 以handler注册自定义事件，绑定callback，并将callback也写入——callbackStore中，addEvent().存储的目的主要是为了事件解绑时使用
* 以iframe的形式发送协议，并携带唯一标志handler，send();

``` js
//发送协议
function send(scheme){
    setTimeout(()=>{
        //创建iframe
        const iframe = document.createElement('iframe');
        iframe.src = scheme;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        //延迟删除节点
        setTimeout(()=>{
            iframe.parentNode.removeChild(iframe)
        },300)
    },0)
    return this;
}

```

### Native

* 客户端接收到请求后，会使用 handler 调用 getParam 从参数池中获取对应的参数。

``` js
function getParam(handler=throw()){
    const key  = getHandlerKey(handler).p;
    return _paramStore.get(key);
}
```

* 执行协议对应的功能；

这样即走通了 H5 --> Native 的这个流程，在客户端完成了对应的功能后，既开始回传执行结果。

### 2、Native-->H5

#### Native

* Native 完成功能后，直接调用 Bridge.postMessage(handler, data)，将 执行结果 和 之前 nativeCall 传过来的标识回传给 H5；

``` js
function postMessage(e){
    //客户端携带hanlder和data调用postMessage；
    const {handler，data} = e;
    //获取对应的自定义事件名 e_handler
    const evName = getHandlerKey(handler).e;
    //创建并触发自定义事件
    fireEvent(evName,e)
    return this;
}
```

#### H5

* H5 在接收到唯一标识后初始化对应的自定义事件，挂载数据后触发，这里涉及的就是 fireEvent 这个函数:

``` js
function fireEvent(evName,data){
    //创建自定义事件对象
    let evenItem;
    if(isFn(doc.CustomEvent)){
        eventItem = new doc.CustomEvent(evName,{
            bubbles:true,
            cancelable:true
        })
    }else if(isFn(doc.createEvent)){
        eventItem = doc.createEvent('Event');
        eventItem.initEvent(evName,true,true)
    }

    //将数据挂载到事件对象中
    if(data&&eventItem){
        eventItem.data = data;
    }

    //触发自定义事件
    if(eventItem){
        win.dispatchEvent(eventItem)
    }else{
        log('Bridge Error:dispatchEvent')
    }
    return this;
}
```

这样，我们就已经完成了双端之间的双向交互机制了，梳理出了整个 bridge.js 的核心代码了，包含了：

* 最重要的开放API: nativeCall 与 postMessage ；

* 客户端获取参数函数: getParam ；

* 事件回调系统中的 addEvent 和 fireEvent ；

* 用于发送协议的 send。
::: 

### 安卓兼容性

::: tip
如果看过上一篇原理篇的童鞋，这时可能会有个疑问：在 Android 4.4以下时，使用的 loadUrl 进行 js 函数的调用，而此时是无法获取函数的返回值的，也就是说4.4- 时，安卓并无法通过 getParam 这个函数来获取到协议的参数，这里需要做兼容性的处理，而我们这里可以使用一个曲线救国的骚操作，使用到的原理就是上一篇文章中有提到的另一种 H5 -> Native 的方案：
:::

#### webView 中的 prompt 拦截

::: tip
方案如下:

* 当安卓接受到协议，并拿到 handler 值；
* 使用无兼容性问题的 loadUrl 执行 js：Bridge.getParam(handler) ，直接将返回值直接通过 js 中的 prompt 发出：

``` js
webview.loadUrl("javascript:prompt('Bridge:commonJsExecute#1'),Bridge.getParam(1))");
```

* 通过重写 onJsPrompt 这个方法，拦截上一步发出的 prompt 的内容，并解析出相应的参数；

``` java
@Override
public boolean onJsPrompt(WebView webView,String url,String message,String defaultValue){
    //获取params内容message
    //匹配解析出对应的参数字符串，并解析
    //...
}
```

通过这样的方式，安卓全平台都可以完成参数的获取，并且方式统一，不需要分平台兼容，这就非常的skrskr啦。~~🤘🏻🤘🏻
:::

## 建造大楼 --- 协议的定制

::: tip
在完成最基础的架构后，我们就可以开始来进一步完成一些上层建筑了，制定一系列真正开放给业务方使用的协议 API，完善整套方案。

首先我们可以将这些协议分成<b> 功能协议</b> 和<b> 业务协议</b>。

### 功能协议

这类协议是指用于完善整套方案的基础功能的一些通用协议，以command://作为通用头，封装在 SDK 之中，可以在全线 App、全线 WebView 中使用：

### 1.初始化机制

上篇文章有提到由于 bridge.js 注入的异步性，我们需要由客户端在注入完成后通知 H5。

这里我们可以约定一个<b>通用的初始化事件</b>，这里我们约定为 _init_，因此前端就可以进行入口的监听, 类似于我们常用的 DOMContentLoaded:

``` js
let isLoaded = false;
window.addEventLister('_init_',e=>{
    if(isLoaded) return false;
    isLoaded = true;

    //代码逻辑
    //..
},false)
```

大家可以看到，这里用了个标记位用于<b>避免事件被重复触发</b>，这是由于客户端中是通过监听 WebView 的生命周期钩子来触发的，而 iframe 之类的操作会导致这些钩子的多次触发，因此需要双方各做一层防御性措施。

接下来，我们可以通过该事件，直接初始化传给H5一些<b>环境参数和系统信息</b>等，下面是我们使用到的：

``` js
e.data={
    //应用名
    name:'appname',
    //app version
    appVersion:'0.0.1',
    //H5 版本
    version:'0.0.1',
    //平台 1：ios 2:android
    platform:2,
    //地区
    area:'中国',
    //language '
    language:'zh-CN',
    //当前APP环境 0：release 1:pre; 2:dev
    env:2,
    //参数池
    data:{},
}
```

同样的，我们可以<b>约定更多的页面生命周期事件</b>，例如因为App很经常性的隐藏到后台，因此在被激活时，我们可以设置个生命周期: _resume_，可以用于告知 H5 页面被激活。

Tips: 这里就能体现出我们通过<b>事件机制</b>来作为回调系统的优势了，我们可以以最习惯的方式进行事件的监听，而客户端可以直接使用 bridge.fireEvent('_init_', data)触发事件，这样便可以优雅地实现 <b>Native -> H5 的单方向交互</b>。

### 2.包更新机制

Hybrid模块 的其中一种方式是将前端代码打包后内置于 App 本地，以便拥有最快的启动性能和离线访问能力。而这种方式最大的麻烦点，就是代码的更新，我们不可能每次有修改时就手动重新打包给客户端童鞋替换，而且这样也失去了我们的热更新机制。

因此这里就需要一套新的<b>热更新机制</b>，这套机制需要由<b>客户端/前端/服务端</b> 三端的童鞋提供对应的资源，共同协作完成整套流程。

#### 资源

* H5: 每个代码包都有一个<b>唯一且递增的版本号</b>；
* Native: 提供<b>包下载且解压到对应目录</b>的服务，前端可以由下面这个协议来调用该功能。

``` js
Bridge.nativeCall('downloadModule',{
    //APP name
    module:appName,
    //最新包线上地址
    url:zipUrl,
})
```

* 服务端: 提供一个接口，可以获取线上最新代码包的版本号和下载地址。

#### 流程：

* 前端更新代码打包后按版本号上传至指定的服务器上；
* 每次打开页面时，H5请求接口获取线上最新代码包版本号，并与本地包进行版本号比对，当线上的版本号 大于 本地包版本号时，发起包下载协议：
* 客户端接收到协议后，直接去线上地址下载最新的代码包，并解压替换到当前目录文件。
拥有这样的机制后，H5在开发后，就可以直接打包将包上传到对应的服务器上，这样在 App 中打开页面后，即可以实时的热更新。

### 3.环境系统 和 多语言系统

通常，我们会将项目分成多个不同的环境，相互隔离。而由于 Hybrid 模块是置于 App 中的，因此环境需要与 App 进行匹配，这里就可以直接使用上面第一点提到的，通过 _init_ 中携带的数据data.env来匹配：

``` js
env: 0 - 正式环境； 1 - 测试环境； 2 - 开发环境；
```

同理， 多语言也可以直接使用 e.data.language 直接进行匹配；

Tips：
环境机制我们通常主要用于匹配后端的环境，正式环境和测试环境对应不同的接口。而这里还有一点特别的，就是需要注意代码包的更新，上述的包更新条件要包含三个方面:<b> 版本号、环境和 App版本</b>，在不同环境不同 App 版本下，也应该更新到相应的最新代码包。

### 4. 事件中转站

由于页面是 H5 开发，而 Native 可能需要控制 H5 页面，例如最常用的场景:

当页面中有弹窗或者SPA切换页面时，<b>安卓的返回实体键</b>应该能完成对应的回退，而不是因为 WebView 没有 history 就直接关闭。

类似于这类需求，这里就可以定制一个<b>事件中心(_eventListeners_ )</b>，用于监听客户端的实体返回键：

``` js
//事件中心
addEvent('_eventListeners_',e=>{
    const type = e.data.type
    switch(type){
        case:'back':
            //关闭弹窗：this.closeDialog();
            //返回页面:this.goLastPage();
            break;
        case:'hideLoading':
            //y隐藏loading：this.hideLoading()
            break;
        default:
            break;

    }
})

```

### 5. 数据传递机制

在业务中，很多场景需要做到 Native 与 H5 保持数据的同步，此时就可以使用类似上面的原理，制定一套数据传递协议:

``` js
//推送数据
Bridge。naticeCall('putData',{
    a:1,
    b:2,
    c:3,
})
//监听数据通道
addEvent('getData',e=>{
    //type:代表数据类型，可自定义
    //data:数据
    const{type,data} = e.data;
    switch(type){
        case:'list':
            //获取客户端传递过来的列表数据
            // ... 
            break;
        default:
            break;
    }
})
```

Tips：

Hybrid模块通常需要从对应的入口进入，因此这里有一种可以优化的方式：

<b>由 App 在启动时先去获取线上数据，在进入 WebView 后直接通过 _init_ 或者触发 getData 直接发送给 H5</b>，这样能减少请求数量，优化用户体验。

### 6. 代理请求

H5中最常用的就是请求，通常我们可以直接使用ajax，但是这里有几个问题比较棘手:

* 最常见的请求跨域；
* 数据算法加密；
* 用户登录校验；

而客户端的请求便不会出现这些问题，因此我们可以由客户端代理我们发出的请求，可以定制4个协议: getProxy，postProxy， getProxyLogined，postProxyLogined，其中带有 Logined 的协议代表着在请求时会自动<b>携带已登录用户的 token 和 uid 等参数</b>，使用在一些需要登录信息的接口上。这样做的好处是

* H5 方就无需处理繁多的各项复杂信息，不需要进行跨端传输；
* 能够对 H5 与 Native 的请求出口进行统一，方便加工处理.

``` js
Bridge.naiveCall('getProxy',{
    url,
    data,
    headers,
},e=>{
    if(e.data&&e.data.code==110){
        //请求失败
    }else{
        //请求成功 返回数据e.data
    }
})
```

### 7.更多

除了这些重要的功能外，我们还可以非常自由地定制很多协议，让 H5 拥有更多更强大的功能，下面是我们所定制的一些功能：

* getNetwork：获取网络状态；
* openApp：唤起其它 App；
* setShareInfo与callShare：分享内容到第三方平台；
* link：使用新的 WebView 打开页面；
* closeWebview：关闭 WebView；
* setStorage 与 getStorage：设置与获取缓存数据；
* loading：调用客户端通用 Loading；
* setWebviewTitle：设置 WebView 标题；
* saveImage：保存图片到本地；
...
这里可以定义更多的通用性协议，这里有个原则可以遵守，即这部分协议应该是<b>基础性功能，应该是纯净的，适用于所有的业务方</b>。根据上篇文章提到的理念，这部分是当成通用 SDK 进行维护与升级的，因此不应该耦合业务层的任何逻辑。

而有时我们会遇到需要定制一些业务上的逻辑，例如上面提到的项目中，我们要将用户图片通过算法处理成卡通画。这样的需求就是非常的业务化，不适用于其它项目，因此我们应该定制成业务协议。

:::

### 业务协议

::: tip
这类协议区别于功能协议，它们会杂合一定程度的业务逻辑，而这些逻辑只是针对于特定的项目。其实对于 H5 的使用上，差别并不大，只是使用对应特殊的协议头用于区分，例如:

``` js
Bridge.nativeCall('app://getResultImgae',{
    category_id,
    matrail_id:materialId,
    subcat_id:subcatId,
    origin_img,
    zip_url,
},data=>{
    //获取处理后的效果图路径
    //...
})

```

这类协议通常不包含在 SDK 中，因此需要由客户端的童鞋针对项目的 WebView 进行定制，使用 bridge.js 提供的基础功能实现对应的复杂功能。而在其它的项目入口中，就无法使用这些协议。
:::

<!-- ## [nativeapp](/nativeapp/)
## [webapp](/webapp)

## [hybridapp](/hybridapp) -->
