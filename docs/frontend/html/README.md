::: tip

# [HTML基础](https://juejin.im/post/5bee888fe51d4557fe34e356)

## html基础

根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。在选择标签时请遵循以下原则：

1. 尽可能少的使用无语义的标签div和span；
2. 在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；
3. 不要使用纯样式标签，如：b、font、u等，改用css设置。
4. 需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；
5. 使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；
6. 表单域要用fieldset标签包起来，并用legend标签说明表单的用途；
7. 每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

## META Viewport

``` html
<!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang=”en”> 标准的 lang 属性写法
<meta charset=’utf-8′>    声明文档使用的字符编码
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
<meta name=”description” content=”不超过150个字符”/>       页面描述
<meta name=”keywords” content=””/>      页面关键词
<meta name=”author” content=”name, email@gmail.com”/>    网页作者
<meta name=”robots” content=”index,follow”/>      搜索引擎抓取
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
<meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
<meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
<meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
<meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
<meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
<meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
<meta name=”full-screen” content=”yes”>              UC强制全屏
<meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
<meta name=”browsermode” content=”application”>   UC应用模式
<meta name=”x5-page-mode” content=”app”>    QQ应用模式
<meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
设置页面不缓存
<meta http-equiv=”pragma” content=”no-cache”>
<meta http-equiv=”cache-control” content=”no-cache”>
<meta http-equiv=”expires” content=”0″>

```

## 网页布局

### 三列布局，左右定宽 中间自适应

#### float

左右定宽，右边元素要在中间元素之前

``` html
<div>
    <div class="left"></div>
    <div class="right"></div>
    <div class="middle"></div>
</div>
```

``` css
.left .right{
    width:60px;
    height:30px;
}
.left{
    float:left;
}
.right{
    float:right;
}
.middle{
    margin-right:70px;
    margin-left:70px;
    height:30px;
}
```

#### flex

父元素display：flex，左右定宽，中间flex：1自适应

``` html
<div class="container">
    <div class="left"></div>
        <div class="middle"></div>
    <div class="right"></div>
</div>
```

``` css
.container{
    display:flex;
}
.left .right{
    width:60px;
    height:30px;
}
.middle{
    flex:1;
    margin-left:10px;
    margin-right:10px
}
```

#### grid

``` html
<div class="container">
    <div class="left"></div>
        <div class="middle"></div>
    <div class="right"></div>
</div>
```

``` css
.container{
    display:grid;
    width:100%;
    grid-template-rows:30px;
    grid-template-columns:60px auto 60px;
}

.middle{
    margin-left:10px;
    margin-right:10px;
}
```

:::



## HTML页面性能

[First Paint探究](https://www.cnblogs.com/hongrunhui/p/8929001.html)

> **FP发生在body中第一个script脚本之前的CSS解析和JS执行完成之后。换句话说就是第一脚本之前的`DOM`和`CSSOM`准备就绪之后，便会着手渲染第一脚本前的内容。**
>
> **如果第一脚本前的JS和CSS加载完了，`body`中的脚本还未下载完成，那么浏览器就会利用构建好的局部`CSSOM`和`DOM`提前渲染第一脚本前的内容（触发`FP`）；如果第一脚本前的JS和CSS都还没下载完成，`body`中的脚本就已经下载完了，那么浏览器就会在所有JS脚本都执行完之后才触发FP。**

