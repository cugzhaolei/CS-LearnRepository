### WebApp
* 通过 JSBridge 完成 H5 与 Native 的双向通讯，并 基于 Webview 进行页面的渲染；
* <b>优势</b>: 简单易用，架构门槛/成本较低，适用性与灵活性极强；
* <b>劣势</b>: Webview 性能局限，在复杂页面中，表现远不如原生页面；

#### WebView
Webview 是 Native App 中内置的一款基于 Webkit内核 的浏览器，主要由两部分组成:

* WebCore 排版引擎；
* JSCore 解析引擎；

