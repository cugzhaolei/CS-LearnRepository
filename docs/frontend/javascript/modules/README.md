### 模块化

[前端模块化，AMD与CMD的区别](https://blog.csdn.net/jackwen110200/article/details/52105493)
模块化开发在现代开发中已是必不可少的一部分，它大大提高了项目的可维护、可拓展和可协作性。通常，我们 在浏览器中使用 ES6 的模块化支持，在 Node 中使用 commonjs 的模块化支持。
::: tip

* 分类
  * ea6：import/export
  * common.js:require/module.exports/exports
  * amd:require/defined

* require与import区别
  * require支持动态导入，import不支持；
  * require是同步导入，import属于异步导入
  * require是值拷贝，导出值变化不影响导入值，import是内存地址，导入值会随导出值变化
* 解决的问题
  * 模块化
  * 依赖冲突

<b>模块化就是把系统分离成独立功能的方法，这样我们需要什么功能，就加载什么功能</b>

* 每个模块都是独立的，良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护
* 可以重复利用，而不用经常复制自己之前写过的代码
<b>模块化主要解决两个问题，"命名冲突"、"文件依赖"</b>

* 命名冲突

``` js
// a.js
var a = 1;

// b.js
var a = 2;
```

* 文件依赖

``` js
// b.js依赖a.js，标签的书写顺序必须是：
<script src='a.js' type='text/javascript'></script>
<script src='b.js' type='text/javascript'></script>
```

这样在多人开发的时候很难协调啊，令人头疼的问题

### 解决冲突、依赖(按需加载)

* 使用命名空间

这样的写法会暴露所有模块内的成员，内部状态可以被外部改写

``` js
let module = {
  name: 'likang xie',
  sayName() {
    console.log(this.name);
  }
}
```

* 立即执行函数+闭包

函数内部有自己独立的作用域，外部只能访问自己暴露的成员而不能读取内部的私有成员

``` js
let module = (function () {
  let privateName = 'private'; // 私有变量
  let privateFn = function () {}; // 私有函数
  
  // 对外暴露的成员
  return {
    name: 'hello world', // 公有属性
    sayName() { // 公有方法
      console.log(this.name);
    }
  }
})();

// 外部调用
module.sayName(); // likang xie 
```

* 使用立即执行函数+类

同上

``` js
const People = (function () {

  let privateName = 'private'; // 私有变量
  let fn = function () {}; // 私有方法

  return class People {
    constructor () {
      this.name = 'hello world'; // 公有变量
    }
  
    // 公有方法
    sayName() {
      console.log(this.name);
    }
   }

})()
```

:::

[理解CommonJs、AMD、CMD、ES6模块](https://www.jianshu.com/p/67ce52c93392)

### commonjs

::: tip
CommonJS就是为JS的表现来制定规范，NodeJS是这种规范的实现，webpack 也是以CommonJS的形式来书写。因为js没有模块的功能所以CommonJS应运而生，它希望js可以在任何地方运行，不只是浏览器中。它的终极目标是提供一个类似Python，Ruby和Java标准库。
CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}

require()用来引入外部模块；exports对象用于导出当前模块的方法或变量，唯一的导出口；module对象就代表模块本身。

虽说Node遵循CommonJS的规范，但是相比也是做了一些取舍，填了一些新东西的。

不过，说了CommonJS也说了Node，那么我觉得也得先了解下NPM了。NPM作为Node的包管理器，不是为了帮助Node解决依赖包的安装问题嘛，那它肯定也要遵循CommonJS规范啦，它遵循包规范（还是理论）的。

common.js

-----------------------------------------------------------------------------
CommonJS 是以在浏览器环境之外构建 JavaScript 生态系统为目标而产生的项目，比如在服务器和桌面环境中，Node.JS遵循CommonJS的规范
CommonJS 规范是为了解决 JavaScript 的作用域问题而定义的模块形式，可以使每个模块它自身的命名空间中执行。该规范的主要内容是，模块必须通过 module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中。
举例说明：

``` js
var clock = require('clock');
clock.start();
CommonJS 是同步加载模块
```

:::

### AMD

::: tip
CommonJS是主要为了JS在后端的表现制定的，他是不适合前端的，为什么这么说呢？

这需要分析一下浏览器端的js和服务器端js都主要做了哪些事，有什么不同了：

于是乎，AMD(异步模块定义)出现了，它就主要为前端JS的表现制定规范。

AMD就只有一个接口：define(id?,dependencies?,factory);

它要在声明模块的时候制定所有的依赖(dep)，并且还要当做形参传到factory中，像这样：

``` js
1 define(['dep1','dep2'],function(dep1,dep2){...});
```

要是没什么依赖，就定义简单的模块，下面这样就可以啦：

``` js
1 define(function(){
2     var exports = {};
3     exports.method = function(){...};
4     return exports;
5 });
```

咦，这里有define，把东西包装起来啦，那Node实现中怎么没看到有define关键字呢，它也要把东西包装起来呀，其实吧，只是Node隐式包装了而已.....

RequireJS就是实现了AMD规范的呢。

这有AMD的WIKI中文版，讲了很多蛮详细的东西，用到的时候可以查看：[AMD的WIKI中文版](https://github.com/amdjs/amdjs-api/wiki/AMD-%28%E4%B8%AD%E6%96%87%E7%89%88%29)

commonjs

---------------------------------------------------

基于CommonJS规范的nodeJS出来以后，服务端的模块概念已经形成，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。如果将上面的代码运行在客户端浏览器，就会报错。

上面的require方法是同步的。这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"，只能采用"异步加载"。这就是AMD规范诞生的背景。

<b>CommonJS是主要为了JS在后端的表现制定的，他是不适合前端的，AMD出现了，它就主要为前端JS的表现制定规范。</b>

AMD是Asynchronous Module Definition的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

``` js
require([module], callback);

require(['clock'],function(clock){
  clock.start();
});
```

requireJs就是AMD规范的实现

:::

### CMD

::: tip
CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。它写起来是这样的：

``` js
define(function(require, exports, module) {
   var clock = require('clock');
   clock.start();
});
```

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块

大名远扬的玉伯写了seajs，就是遵循他提出的CMD规范，与AMD蛮相近的，不过用起来感觉更加方便些，最重要的是中文版，应有尽有：[seajs官方doc](http://seajs.org/docs/#docs)

:::

### 各模块的差异

* IIFE：自执行函数编写模块化，在一个单独的函数作用域中执行代码，避免变量冲突

``` js
(function(){
  return {
    obj:'',
    name:''
  }
})()
```

* AMD:使用requireJS来编写模块化，特点依赖必须提前声明

``` js
define('./index.js',function(code-style){
  //code-style 就是index.js
})
```

* CMD:使用seaJS来编写模块化，特点：支持动态导入依赖文件

``` js
define(function(require,exports,module){
  var indexCode = require('./index.js');
});
```

* UMD:兼容AMD、CommonJS模块化语法
  * webpack(require.ensure)：webpack2.x版本中的代码分割
  * ES  Modules:ES6引入的模块化，支持import来引入另一个js

``` js
import a from 'a';
```
