## [webpack](https://legacy.gitbook.com/book/toobug/webpack-guide/details)

## [前端进阶](https://juejin.im/post/5c92f499f265da612647b754)

## [核心思想](https://juejin.im/post/5cc26dfef265da037b611738)

## [webpack详解](https://juejin.im/post/5aa3d2056fb9a028c36868aa)

::: tip
* JavaScript 的 模块打包工具 (module bundler)。通过分析模块之间的依赖，最终将所有模块打包成一份或者多份代码包 (bundler)，供 HTML 直接引用。实质上，Webpack 仅仅提供了 打包功能 和一套 文件处理机制，然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。因此 Webpack 具有高度的可拓展性，能更好的发挥社区生态的力量。

   * Entry: 入口文件，Webpack 会从该文件开始进行分析与编译；
   * Output: 出口路径，打包后创建 bundler 的文件路径以及文件名；
   * Module: 模块，在 Webpack 中任何文件都可以作为一个模块，会根据配置的不同的 Loader 进行加载和打包；
   * Chunk: 代码块，可以根据配置，将所有模块代码合并成一个或多个代码块，以便按需加载，提高性能；
   * Loader: 模块加载器，进行各种文件类型的加载与转换；
   * Plugin: 拓展插件，可以通过 Webpack 相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改；
* 工作流程 (加载 - 编译 - 输出)

   * 1、读取配置文件，按命令 初始化 配置参数，创建 Compiler 对象；
   * 2、调用插件的 apply 方法 挂载插件 监听，然后从入口文件开始执行编译；
   * 3、按文件类型，调用相应的 Loader 对模块进行 编译，并在合适的时机点触发对应的事件，调用 Plugin 执行，最后再根据模块 依赖查找 到所依赖的模块，递归执行第三步；
   * 4、将编译后的所有代码包装成一个个代码块 (Chuck)， 并按依赖和配置确定 输出内容。这个步骤，仍然可以通过 Plugin 进行文件的修改;
   * 5、最后，根据 Output 把文件内容一一写入到指定的文件夹中，完成整个过程；
* 模块打包
``` js
(function(modules) {
	// 模拟 require 函数，从内存中加载模块；
	function __webpack_require__(moduleId) {
		// 缓存模块
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		
		// 执行代码；
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		
		// Flag: 标记是否加载完成；
		module.l = true;
		
		return module.exports;
	}
	
	// ...
	
	// 开始执行加载入口文件；
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })({
 	"./src/index.js": function (module, __webpack_exports__, __webpack_require__) {
		// 使用 eval 执行编译后的代码；
		// 继续递归引用模块内部依赖；
		// 实际情况并不是使用模板字符串，这里是为了代码的可读性；
		eval(`
			__webpack_require__.r(__webpack_exports__);
			//
			var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("test", ./src/test.js");
		`);
	},
	"./src/test.js": function (module, __webpack_exports__, __webpack_require__) {
		// ...
	},
 })
```
* 总结:
   * 模块机制: webpack 自己实现了一套模拟模块的机制，将其包裹于业务代码的外部，从而提供了一套模块机制；
   * 文件编译: webpack 规定了一套编译规则，通过 Loader 和 Plugin，以管道的形式对文件字符串进行处理；
:::

## Loader
loader就是一个node模块，它输出了一个函数。当某种资源需要用这个loader转换时，这个函数会被调用。并且，这个函数可以通过提供给它的this上下文访问Loader API。

``` js
module.exports = function(src) {
  //src是原文件内容（abcde），下面对内容进行处理，这里是反转
  var result = src.split('').reverse().join(''); 
  //返回JavaScript源码，必须是String或者Buffer
  return `module.exports = '${result}'`;
}
//使用
{
    test: /\.txt$/,
    use: [
        {
            './path/reverse-txt-loader'
        }
    ]
},


```
::: tip
由于 Webpack 是基于 Node，因此 Webpack 其实是只能识别 js 模块，比如 css / html / 图片等类型的文件并无法加载，因此就需要一个对 不同格式文件转换器。其实 Loader 做的事，也并不难理解: 对 Webpack 传入的字符串进行按需修改。例如一个最简单的 Loader:

``` js
// html-loader/index.js
module.exports = function(htmlSource) {
	// 返回处理后的代码字符串
	// 删除 html 文件中的所有注释
	return htmlSource.replace(/<!--[\w\W]*?-->/g, '')
}
```
当然，实际的 Loader 不会这么简单，通常是需要将代码进行分析，构建 AST (抽象语法树)， 遍历进行定向的修改后，再重新生成新的代码字符串。如我们常用的 Babel-loader 会执行以下步骤:
* babylon 将 ES6/ES7 代码解析成 AST
* babel-traverse 对 AST 进行遍历转译，得到新的 AST
* 新 AST 通过 babel-generator 转换成 ES5
:::
### Loader 特性:
::: tip
* 链式传递，按照配置时相反的顺序链式执行；
* 基于 Node 环境，拥有 较高权限，比如文件的增删查改；
* 可同步也可异步；
:::

### 常用 Loader:
::: tip
* file-loader: 加载文件资源，如 字体 / 图片 等，具有移动/复制/命名等功能；
* url-loader: 通常用于加载图片，可以将小图片直接转换为 Date Url，减少请求；
* babel-loader: 加载 js / jsx 文件， 将 ES6 / ES7 代码转换成 ES5，抹平兼容性问题；
* ts-loader: 加载 ts / tsx 文件，编译 TypeScript；
* style-loader: 将 css 代码以 /style/ 标签的形式插入到 html 中；
* css-loader: 分析@import和url()，引用 css 文件与对应的资源；
* postcss-loader: 用于 css 的兼容性处理，具有众多功能，例如 添加前缀，单位转换 等；
* less-loader / sass-loader: css预处理器，在 css 中新增了许多语法，提高了开发效率；
::: 

### 编写原则:
::: tip
* 单一原则: 每个 Loader 只做一件事；
* 链式调用: Webpack 会按顺序链式调用每个 Loader；
* 统一原则: 遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；
:::
## Plugin
::: tip
插件系统是 Webpack 成功的一个关键性因素。在编译的整个生命周期中，Webpack 会触发许多事件钩子，Plugin 可以监听这些事件，根据需求在相应的时间点对打包内容进行定向的修改。
* 一个最简单的 plugin 是这样的:
``` js
class Plugin{
  	// 注册插件时，会调用 apply 方法
  	// apply 方法接收 compiler 对象
  	// 通过 compiler 上提供的 Api，可以对事件进行监听，执行相应的操作
  	apply(compiler){
  		// compilation 是监听每次编译循环
  		// 每次文件变化，都会生成新的 compilation 对象并触发该事件
    	compiler.plugin('compilation',function(compilation) {})
  	}
}
```
* 注册组件
``` js
// webpack.config.js
module.export = {
	plugins:[
		new Plugin(options),
	]
}
```
* 事件流
Webpack 就像工厂中的一条产品流水线。原材料经过 Loader 与 Plugin 的一道道处理，最后输出结果。
   * 通过链式调用，按顺序串起一个个 Loader；
   * 通过事件流机制，让 Plugin 可以插入到整个生产过程中的每个步骤中；
Webpack 事件流编程范式的核心是基础类 [Tapable](https://www.jianshu.com/p/273e1c9904d2)，是一种 观察者模式 的实现事件的订阅与广播：
### [Tapable](https://www.jianshu.com/p/273e1c9904d2)
* Tapable 几种事件流执行机制
``` js
// 引入 tapable 如下
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```

``` js
const { SyncHook } = require("tapable")

const hook = new SyncHook(['arg'])

// 订阅
hook.tap('event', (arg) => {
	// 'event-hook'
	console.log(arg)
})

// 广播
hook.call('event-hook')
```
* Webpack 中两个最重要的类 Compiler 与 Compilation 便是继承于 Tapable，也拥有这样的事件流机制。

    * Compiler: 可以简单的理解为 Webpack 实例，它包含了当前 Webpack 中的所有配置信息，如 options， loaders, plugins 等信息，全局唯一，只在启动时完成初始化创建，随着生命周期逐一传递；

    * Compilation: 可以称为 编译实例。当监听到文件发生改变时，Webpack 会创建一个新的 Compilation 对象，开始一次新的编译。它包含了当前的输入资源，输出资源，变化的文件等，同时通过它提供的 api，可以监听每次编译过程中触发的事件钩子；

* 区别：
    * Compiler 全局唯一，且从启动生存到结束；
    * Compilation 对应每次编译，每轮编译循环均会重新创建；
* 常用 Plugin:
    * UglifyJsPlugin: 压缩、混淆代码；
    * CommonsChunkPlugin: 代码分割；    
    * ProvidePlugin: 自动加载模块；
    * html-webpack-plugin: 加载 html 文件，并引入 css / js 文件；
    * extract-text-webpack-plugin / mini-css-extract-plugin: 抽离样式，生成 css 文件；
    * DefinePlugin: 定义全局变量；
    * optimize-css-assets-webpack-plugin: CSS 代码去重；
    * webpack-bundle-analyzer: 代码分析；
    * compression-webpack-plugin: 使用 gzip 压缩 js 和 css；
    * happypack: 使用多进程，加速代码构建；
    * EnvironmentPlugin: 定义环境变量；
:::

## 编译优化
::: tip
* <b>代码优化</b>
    * <b>无用代码消除</b>，是许多编程语言都具有的优化手段，这个过程称为 DCE (dead code elimination)，即 删除不可能执行的代码；
       * 例如我们的 UglifyJs，它就会帮我们在生产环境中删除不可能被执行的代码，例如:
        ``` js
        var fn = function() {
            return 1;
            // 下面代码便属于 不可能执行的代码；
            // 通过 UglifyJs (Webpack4+ 已内置) 便会进行 DCE；
            var a = 1;
            return a;
        }
        ```
       * <b>摇树优化 (Tree-shaking)</b>，这是一种形象比喻。我们把打包后的代码比喻成一棵树，这里其实表示的就是，通过工具 "摇" 我们打包后的 js 代码，将没有使用到的无用代码 "摇" 下来 (删除)。即 消除那些被 引用了但未被使用 的模块代码。
          * <b>原理</b>: 由于是在编译时优化，因此最基本的前提就是语法的静态分析，ES6的模块机制 提供了这种可能性。不需要运行时，便可进行代码字面上的静态分析，确定相应的依赖关系。
          * <b>问题</b>: 具有 副作用 的函数无法被 tree-shaking。
             * 在引用一些第三方库，需要去观察其引入的代码量是不是符合预期；
             * 尽量写纯函数，减少函数的副作用；
             * 可使用 webpack-deep-scope-plugin，可以进行作用域分析，减少此类情况的发生，但仍需要注意；
* <b>code-spliting</b>: 代码分割 技术，将代码分割成多份进行 <b>懒加载</b> 或 <b>异步加载</b>，避免打包成一份后导致体积过大，影响页面的首屏加载；
    * Webpack 中使用 SplitChunksPlugin 进行拆分；
    * 按 页面 拆分: 不同页面打包成不同的文件；
    * 按 功能 拆分:
        * 将类似于播放器，计算库等大模块进行拆分后再懒加载引入；
        * 提取复用的业务代码，减少冗余代码；
    * 按 文件修改频率 拆分: 将第三方库等不常修改的代码单独打包，而且不改变其文件 hash 值，能最大化运用浏览器的缓存；
* <b>scope hoisting</b>: 作用域提升，将分散的模块划分到同一个作用域中，避免了代码的重复引入，有效减少打包后的代码体积和运行时的内存损耗；

* 编译性能优化:
   * 升级至 最新 版本的 webpack，能有效提升编译性能；
   * 使用 dev-server / 模块热替换 (HMR) 提升开发体验；
        * 监听文件变动 忽略 node_modules 目录能有效提高监听时的编译效率；
   * 缩小编译范围:
        * modules: 指定模块路径，减少递归搜索；
        * mainFields: 指定入口文件描述字段，减少搜索；
        * noParse: 避免对非模块化文件的加载；
        * includes/exclude: 指定搜索范围/排除不必要的搜索范围；
        * alias: 缓存目录，避免重复寻址；
    * babel-loader:
        * 忽略node_moudles，避免编译第三方库中已经被编译过的代码；
        * 使用cacheDirectory，可以缓存编译结果，避免多次重复编译；
    * 多进程并发:
        * webpack-parallel-uglify-plugin: 可多进程并发压缩 js 文件，提高压缩速度；
        * HappyPack: 多进程并发文件的 Loader 解析；
    * 第三方库模块缓存:
        * DLLPlugin 和 DLLReferencePlugin 可以提前进行打包并缓存，避免每次都重新编译；
    * 使用分析:
        * Webpack Analyse / webpack-bundle-analyzer 对打包后的文件进行分析，寻找可优化的地方；
        * 配置profile：true，对各个编译阶段耗时进行监控，寻找耗时最多的地方；
        * source-map:
           * 开发: cheap-module-eval-source-map；
           * 生产: hidden-source-map；

:::

## 项目性能优化
::: tip
* 1. 编码优化
编码优化，指的就是 在代码编写时的，通过一些 最佳实践，提升代码的执行性能。通常这并不会带来非常大的收益，但这属于 程序猿的自我修养，而且这也是面试中经常被问到的一个方面，考察自我管理与细节的处理。
   * 数据读取:
      * 通过作用域链 / 原型链 读取变量或方法时，需要更多的耗时，且越长越慢；
      * 对象嵌套越深，读取值也越慢；
      * 最佳实践:
         * 尽量在局部作用域中进行 变量缓存；
         * 避免嵌套过深的数据结构，数据扁平化 有利于数据的读取和维护；

   * 循环: 循环通常是编码性能的关键点
      * 代码的性能问题会再循环中被指数倍放大；
      * 最佳实践:
         * 减少遍历的数据量；
         * 完成目的后马上结束循环；
      * 避免在循环中执行大量的运算，避免重复计算，相同的执行结果应该使用缓存；
      * js 中使用 倒序循环 会略微提升性能；
      * 尽量避免使用 for-in 循环，因为它会枚举原型对象，耗时大于普通循环；
* 条件流程性能: Map / Object > switch > if-else
``` js
// 使用 if-else
if(type === 1) {

} else if (type === 2) {

} else if (type === 3) {

}

// 使用 switch
switch (type) {
	case 1:
		break;4
	case 2:
		break;
	case 3:
		break;
    default:
        break;
}

// 使用 Map
const map = new Map([
	[1, () => {}],
	[2, () => {}],
	[3, () => {}],
])
map.get(type)()

// 使用 Objext
const obj = {
	1: () => {},
	2: () => {},
	3: () => {},
}
obj[type]()
```

* 减少 cookie 体积: 能有效减少每次请求的体积和响应时间；
   * 去除不必要的 cookie；
   * 压缩 cookie 大小；
   * 设置 domain 与 过期时间；
* dom 优化:
   * 减少访问 dom 的次数，如需多次，将 dom 缓存于变量中；
   * 减少重绘与回流:
        * 多次操作合并为一次；
        * 减少对计算属性的访问；
             * 例如 offsetTop， getComputedStyle 等
             * 因为浏览器需要获取最新准确的值，因此必须立即进行重排，这样会破坏了浏览器的队列整合，尽量将值进行缓存使用；
        * 大量操作时，可将 dom 脱离文档流或者隐藏，待操作完成后再重新恢复；
        * 使用DocumentFragment / cloneNode / replaceChild进行操作；
    * 使用事件委托，避免大量的事件绑定；
* css 优化:
   * 层级扁平，避免过于多层级的选择器嵌套；
   * 特定的选择器 好过一层一层查找:  .xxx-child-text{} 优于 .xxx .child .text{}
   * 减少使用通配符与属性选择器；
   * 减少不必要的多余属性；
   * 使用 动画属性 实现动画，动画时脱离文档流，开启硬件加速，优先使用 css 动画；
   * 使用 <code><link></code> 替代原生 @import；

* html优化
   * 减少 dom 数量，避免不必要的节点或嵌套；
   * 避免<img src="" />空标签，能减少服务器压力，因为 src 为空时，浏览器仍然会发起请求
        * IE 向页面所在的目录发送请求；
        * Safari、Chrome、Firefox 向页面本身发送请求；
        * Opera 不执行任何操作。

    * 图片提前 指定宽高 或者 脱离文档流，能有效减少因图片加载导致的页面回流；
    * 语义化标签 有利于 SEO 与浏览器的解析时间；
    * 减少使用 table 进行布局，避免使用‘<br/>’与‘<hr/>’；

:::



## 打包体积
为了减小包的打包体积，可以从以下几个方面进行优化：

* 提取第三方库或通过引用外部文件的方式引入第三方库
* 代码压缩插件UglifyJsPlugin
* 服务器启用gzip压缩
* 按需加载资源文件 require.ensure
* 优化devtool中的source-map
* 剥离css文件，单独打包
* 去除不必要插件，通常就是开发环境与生产环境用同一套配置文件导致

## 打包效率

* 开发环境采用增量构建，启用热更新
* 开发环境不做无意义的工作如提取css计算文件hash等
* 配置devtool
* 选择合适的loader，个别loader开启cache 如babel-loader
* 第三方库采用引入方式
* 提取公共代码
* 优化构建时的搜索路径 指明需要构建目录及不需要构建目录
* 模块化引入需要的部分

- 作者：xiangzhihong
- 链接：https://juejin.im/post/5bee888fe51d4557fe34e356

### webpack的配置

``` js
const path = require('path');
module.exports = {
  entry: "./app/entry", // string | object | array
  // Webpack打包的入口
  output: {  // 定义webpack如何输出的选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    filename: "[chunkhash].js", // string
    // 「入口(entry chunk)」文件命名模版
    publicPath: "/assets/", // string
    // 构建文件的输出目录
    /* 其它高级配置 */
  },
  module: {  // 模块相关配置
    rules: [ // 配置模块loaders，解析规则
      {
        test: /\.jsx?$/,  // RegExp | string
        include: [ // 和test一样，必须匹配选项
          path.resolve(__dirname, "app")
        ],
        exclude: [ // 必不匹配选项（优先级高于test和include）
          path.resolve(__dirname, "app/demo-files")
        ],
        loader: "babel-loader", // 模块上下文解析
        options: { // loader的可选项
          presets: ["es2015"]
        },
      },
  },
  resolve: { //  解析模块的可选项
    modules: [ // 模块的查找目录
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // 用到的文件的扩展
    alias: { // 模块别名列表
      "module": "new-module"
	  },
  },
  devtool: "source-map", // enum
  // 为浏览器开发者工具添加元数据增强调试
  plugins: [ // 附加插件列表
    // ...
  ],
}
```
从上面我们可以看到，webpack配置中需要理解几个核心的概念Entry 、Output、Loaders 、Plugins、 Chunk

- Entry：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
- Output：告诉webpack如何命名输出的文件以及输出的目录
- Loaders：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件
- Plugins：Loaders将各类型的文件处理成webpack能够处理的模块，plugins有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的UglifyJsPlugin插件
- Chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用CommonsChunkPlugin将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中CommonsChunkPlugin被废弃，使用SplitChunksPlugin

### webpack详解
读到这里，或许你对webpack有一个大概的了解，那webpack 是怎么运行的呢？我们都知道，webpack是高度复杂抽象的插件集合，理解webpack的运行机制，对于我们日常定位构建错误以及写一些插件处理构建任务有很大的帮助。

webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable，webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。在Tapable1.0之前，也就是webpack3及其以前使用的Tapable，提供了包括

* plugin(name:string, handler:function)注册插件到Tapable对象中
* apply(…pluginInstances: (AnyPlugin|function)[])调用插件的定义，将事件监听器注册到Tapable实例注册表中
* applyPlugins*(name:string, …)多种策略细致地控制事件的触发，包括* applyPluginsAsync、applyPluginsParallel等方法实现对事件触发的控制，实现

（1）多个事件连续顺序执行
（2）并行执行
（3）异步执行
（4）一个接一个地执行插件，前面的输出是后一个插件的输入的瀑布流执行顺序
（5）在允许时停止执行插件，即某个插件返回了一个undefined的值，即退出执行
我们可以看到，Tapable就像nodejs中EventEmitter,提供对事件的注册on和触发emit,理解它很重要，看个栗子：比如我们来写一个插件
``` js
function CustomPlugin(){
    CustomPlugin.prototype.apply = function(complier){
        complier.plugin('emit',pluginFunction);
    }
}
```
在webpack的生命周期中会适时的执行
``` js
this.apply*("emit",options)
```
当然上面提到的Tapable都是1.0版本之前的，如果想深入学习，可以查看Tapable 和 事件流
那1.0的Tapable又是什么样的呢？1.0版本发生了巨大的改变，不再是此前的通过plugin注册事件，通过applyPlugins*触发事件调用，那1.0的Tapable是什么呢？

暴露出很多的钩子，可以使用它们为插件创建钩子函数

``` js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
}=require("tapable");
```
tapable使用
``` js
class Order{
    constructor(){
        this.hooks={
            googs:new SyncHook(['googsId','number']),
            consumer:new AsyncParallelHook(['userId','orderId'])
        }
    }
    queryGoods(goodsId,number){
        this.hook.goods.call(goodsId,number);
    }
    consumerInfoPromise(userId, orderId) {
        this.hooks.consumer.promise(userId, orderId).then(() => {
            //TODO
        })
    }
    consumerInfoAsync(userId, orderId) {
        this.hooks.consumer.callAsync(userId, orderId, (err, data) => {
            //TODO
        })
    }

}
```
对于所有的hook的构造函数均接受一个可选的string类型的数组
``` js
const hook = new SyncHook(["arg1", "arg2", "arg3"]);
// 调用tap方法注册一个consument
order.hooks.goods.tap('QueryPlugin', (goodsId, number) => {
    return fetchGoods(goodsId, number);
})
// 再添加一个
order.hooks.goods.tap('LoggerPlugin', (goodsId, number) => {
    logger(goodsId, number);
})

// 调用
order.queryGoods('10000000', 1)
```
对于一个 SyncHook,我们通过tap来添加消费者，通过call来触发钩子的顺序执行。

对于一个非sync*类型的钩子，即async*类型的钩子，我们还可以通过其它方式注册消费者和调用
``` js
// 注册一个sync 钩子
order.hooks.consumer.tap('LoggerPlugin', (userId, orderId) => {
   logger(userId, orderId);
})

order.hooks.consumer.tapAsync('LoginCheckPlugin', (userId, orderId, callback) => {
    LoginCheck(userId, callback);
})

order.hooks.consumer.tapPromise('PayPlugin', (userId, orderId) => {
    return Promise.resolve();
})

// 调用
// 返回Promise
order.consumerInfoPromise('user007', '1024');

//回调函数
order.consumerInfoAsync('user007', '1024')
```
通过上面的栗子，你可能已经大致了解了Tapable的用法，它的用法

* 插件注册数量
* 插件注册的类型（sync, async, promise）
* 调用的方式（sync, async, promise）
* 实例钩子的时候参数数量
* 是否使用了interception

对于Sync*类型的钩子来说。
* 注册在该钩子下面的插件的执行顺序都是顺序执行。
* 只能使用tap注册，不能使用tapPromise和tapAsync注册
``` js
// 所有的钩子都继承于Hook
class Sync* extends Hook { 
	tapAsync() { // Sync*类型的钩子不支持tapAsync
		throw new Error("tapAsync is not supported on a Sync*");
	}
	tapPromise() {// Sync*类型的钩子不支持tapPromise
		throw new Error("tapPromise is not supported on a Sync*");
	}
	compile(options) { // 编译代码来按照一定的策略执行Plugin
		factory.setup(this, options);
		return factory.create(options);
	}
}
```
对于Async*类型钩子

* 支持tap、tapPromise、tapAsync注册
``` js
class AsyncParallelHook extends Hook{
    constructor(args){
        super(args);
        this.call = this._call =undefined;
    }
    complication(options){
        factory.setup(this.options);
        return factory.create(options);
    }
}

class Hook {
	constructor(args) {
		if(!Array.isArray(args)) args = [];
		this._args = args; // 实例钩子的时候的string类型的数组
		this.taps = []; // 消费者
		this.interceptors = []; // interceptors
		this.call = this._call =  // 以sync类型方式来调用钩子
		this._createCompileDelegate("call", "sync");
		this.promise = 
		this._promise = // 以promise方式
		this._createCompileDelegate("promise", "promise");
		this.callAsync = 
		this._callAsync = // 以async类型方式来调用
		this._createCompileDelegate("callAsync", "async");
		this._x = undefined; // 
	}

	_createCall(type) {
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}

	_createCompileDelegate(name, type) {
		const lazyCompileHook = (...args) => {
			this[name] = this._createCall(type);
			return this[name](...args);
		};
		return lazyCompileHook;
	}
	// 调用tap 类型注册
	tap(options, fn) {
		// ...
		options = Object.assign({ type: "sync", fn: fn }, options);
		// ...
		this._insert(options);  // 添加到 this.taps中
	}
	// 注册 async类型的钩子
	tapAsync(options, fn) {
		// ...
		options = Object.assign({ type: "async", fn: fn }, options);
		// ...
		this._insert(options); // 添加到 this.taps中
	}
	注册 promise类型钩子
	tapPromise(options, fn) {
		// ...
		options = Object.assign({ type: "promise", fn: fn }, options);
		// ...
		this._insert(options); // 添加到 this.taps中
	}
	
}
```
每次都是调用tap、tapSync、tapPromise注册不同类型的插件钩子，通过调用call、callAsync 、promise方式调用。其实调用的时候为了按照一定的执行策略执行，调用compile方法快速编译出一个方法来执行这些插件。
``` js
const factory = new Sync*CodeFactory();
class Sync* extends Hook { 
	// ...
	compile(options) { // 编译代码来按照一定的策略执行Plugin
		factory.setup(this, options);
		return factory.create(options);
	}
}

class Sync*CodeFactory extends HookCodeFactory {
	content({ onError, onResult, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}
```
compile中调用HookCodeFactory#create方法编译生成执行代码。
``` js

class HookCodeFactory {
	constructor(config) {
		this.config = config;
		this.options = undefined;
	}

	create(options) {
		this.init(options);
		switch(this.options.type) {
			case "sync":  // 编译生成sync, 结果直接返回
				return new Function(this.args(), 
				"\"use strict\";\n" + this.header() + this.content({
					// ...
					onResult: result => `return ${result};\n`,
					// ...
				}));
			case "async": // async类型, 异步执行，最后将调用插件执行结果来调用callback,
				return new Function(this.args({
					after: "_callback"
				}), "\"use strict\";\n" + this.header() + this.content({
					// ...
					onResult: result => `_callback(null, ${result});\n`,
					onDone: () => "_callback();\n"
				}));
			case "promise": // 返回promise类型，将结果放在resolve中
				// ...
				code += "return new Promise((_resolve, _reject) => {\n";
				code += "var _sync = true;\n";
				code += this.header();
				code += this.content({
					// ...
					onResult: result => `_resolve(${result});\n`,
					onDone: () => "_resolve();\n"
				});
			    // ...
				return new Function(this.args(), code);
		}
	}
	// callTap 就是执行一些插件，并将结果返回
	callTap(tapIndex, { onError, onResult, onDone, rethrowIfPossible }) {
		let code = "";
		let hasTapCached = false;
		// ...
		code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)};\n`;
		const tap = this.options.taps[tapIndex];
		switch(tap.type) {
			case "sync":
				// ...
				if(onResult) {
					code += `var _result${tapIndex} = _fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				} else {
					code += `_fn${tapIndex}(${this.args({
						before: tap.context ? "_context" : undefined
					})});\n`;
				}
				
				if(onResult) { // 结果透传
					code += onResult(`_result${tapIndex}`);
				}
				if(onDone) { // 通知插件执行完毕，可以执行下一个插件
					code += onDone();
				}
				break;
			case "async": //异步执行，插件运行完后再将结果通过执行callback透传
				let cbCode = "";
				if(onResult)
					cbCode += `(_err${tapIndex}, _result${tapIndex}) => {\n`;
				else
					cbCode += `_err${tapIndex} => {\n`;
				cbCode += `if(_err${tapIndex}) {\n`;
				cbCode += onError(`_err${tapIndex}`);
				cbCode += "} else {\n";
				if(onResult) {
					cbCode += onResult(`_result${tapIndex}`);
				}
				
				cbCode += "}\n";
				cbCode += "}";
				code += `_fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined,
					after: cbCode //cbCode将结果透传
				})});\n`;
				break;
			case "promise": // _fn${tapIndex} 就是第tapIndex 个插件，它必须是个Promise类型的插件
				code += `var _hasResult${tapIndex} = false;\n`;
				code += `_fn${tapIndex}(${this.args({
					before: tap.context ? "_context" : undefined
				})}).then(_result${tapIndex} => {\n`;
				code += `_hasResult${tapIndex} = true;\n`;
				if(onResult) {
					code += onResult(`_result${tapIndex}`);
				}
			// ...
				break;
		}
		return code;
	}
	// 按照插件的注册顺序，按照顺序递归调用执行插件
	callTapsSeries({ onError, onResult, onDone, rethrowIfPossible }) {
		// ...
		const firstAsync = this.options.taps.findIndex(t => t.type !== "sync");
		const next = i => {
			// ...
			const done = () => next(i + 1);
			// ...
			return this.callTap(i, {
				// ...
				onResult: onResult && ((result) => {
					return onResult(i, result, done, doneBreak);
				}),
				// ...
			});
		};
		return next(0);
	}

	callTapsLooping({ onError, onDone, rethrowIfPossible }) {
		
		const syncOnly = this.options.taps.every(t => t.type === "sync");
		let code = "";
		if(!syncOnly) {
			code += "var _looper = () => {\n";
			code += "var _loopAsync = false;\n";
		}
		code += "var _loop;\n";
		code += "do {\n";
		code += "_loop = false;\n";
		// ...
		code += this.callTapsSeries({
			// ...
			onResult: (i, result, next, doneBreak) => { // 一旦某个插件返回不为undefined,  即一只调用某个插件执行，如果为undefined,开始调用下一个
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += "_loop = true;\n";
				if(!syncOnly)
					code += "if(_loopAsync) _looper();\n";
				code += doneBreak(true);
				code += `} else {\n`;
				code += next();
				code += `}\n`;
				return code;
			},
			// ...
		})
		code += "} while(_loop);\n";
		// ...
		return code;
	}
	// 并行调用插件执行
	callTapsParallel({ onError, onResult, onDone, rethrowIfPossible, onTap = (i, run) => run() }) {
		// ...
		// 遍历注册都所有插件，并调用
		for(let i = 0; i < this.options.taps.length; i++) {
			// ...
			code += "if(_counter <= 0) break;\n";
			code += onTap(i, () => this.callTap(i, {
				// ...
				onResult: onResult && ((result) => {
					let code = "";
					code += "if(_counter > 0) {\n";
					code += onResult(i, result, done, doneBreak);
					code += "}\n";
					return code;
				}),
				// ...
			}), done, doneBreak);
		}
		// ...
		return code;
	}
}

```
在HookCodeFactory#create中调用到content方法，此方法将按照此钩子的执行策略，调用不同的方法来执行编译 生成最终的代码。
* SyncHook中调用`callTapsSeries`编译生成最终执行插件的函数，`callTapsSeries`做的就是将插件列表中插件按照注册顺序遍历执行。

``` js
class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}
```
* SyncBailHook中当一旦某个返回值结果不为undefined便结束执行列表中的插件

``` js
 class SyncBailHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			// ...
			onResult: (i, result, next) => `if(${result} !== undefined) {\n${onResult(result)};\n} else {\n${next()}}\n`,
			// ...
		});
	}
}
```
* SyncWaterfallHook中上一个插件执行结果当作下一个插件的入参
``` js
class SyncWaterfallHookCodeFactory extends HookCodeFactory {
	content({ onError, onResult, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			// ...
			onResult: (i, result, next) => {
				let code = "";
				code += `if(${result} !== undefined) {\n`;
				code += `${this._args[0]} = ${result};\n`;
				code += `}\n`;
				code += next();
				return code;
			},
			onDone: () => onResult(this._args[0]),
		});
	}
}
```
* AsyncParallelHook调用callTapsParallel并行执行插件
``` js
class AsyncParallelHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone }) {
		return this.callTapsParallel({
			onError: (i, err, done, doneBreak) => onError(err) + doneBreak(true),
			onDone
		});
	}
}
```

## webpack流程
本文关于webpack 的流程讲解是基于webpack4的。
### webpack 入口文件
从webpack项目的package.json文件中我们找到了入口执行函数，在函数中引入webpack，那么入口将会是lib/webpack.js,而如果在shell中执行，那么将会走到./bin/webpack.js,我们就以lib/webpack.js为入口开始吧！

``` js
{
  "name": "webpack",
  "version": "4.1.1",
  ...
  "main": "lib/webpack.js",
  "web": "lib/webpack.web.js",
  "bin": "./bin/webpack.js",
  ...
  }
```
webpack入口
``` js
const webpack = (options, callback) => {
    // ...
    // 验证options正确性
    // 预处理options
    options = new WebpackOptionsDefaulter().process(options); // webpack4的默认配置
	compiler = new Compiler(options.context); // 实例Compiler
	// ...
    // 若options.watch === true && callback 则开启watch线程
	compiler.watch(watchOptions, callback);
	compiler.run(callback);
	return compiler;
};
```
webpack 的入口文件其实就实例了Compiler并调用了run方法开启了编译，webpack的编译都按照下面的钩子调用顺序执行。

* before-run 清除缓存
* run 注册缓存数据钩子
* before-compile
* compile 开始编译
* make 从入口分析依赖以及间接依赖模块，创建模块对象
* build-module 模块构建
* seal 构建结果封装， 不可再更改
* after-compile 完成构建，缓存数据
* emit 输出到dist目录

### 编译&构建流程

webpack中负责构建和编译都是Compilation
``` js
class Compilation extends Tapable {
	constructor(compiler) {
		super();
		this.hooks = {
			// hooks
		};
		// ...
		this.compiler = compiler;
		// ...
		// template
		this.mainTemplate = new MainTemplate(this.outputOptions);
		this.chunkTemplate = new ChunkTemplate(this.outputOptions);
		this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(
			this.outputOptions
		);
		this.runtimeTemplate = new RuntimeTemplate(
			this.outputOptions,
			this.requestShortener
		);
		this.moduleTemplates = {
			javascript: new ModuleTemplate(this.runtimeTemplate),
			webassembly: new ModuleTemplate(this.runtimeTemplate)
		};

		// 构建生成的资源
		this.chunks = [];
		this.chunkGroups = [];
		this.modules = [];
		this.additionalChunkAssets = [];
		this.assets = {};
		this.children = [];
		// ...
	}
	// 
	buildModule(module, optional, origin, dependencies, thisCallback) {
		// ...
		// 调用module.build方法进行编译代码，build中 其实是利用acorn编译生成AST
		this.hooks.buildModule.call(module);
		module.build(/**param*/);
	}
	// 将模块添加到列表中，并编译模块
	_addModuleChain(context, dependency, onModule, callback) {
		    // ...
		    // moduleFactory.create创建模块，这里会先利用loader处理文件，然后生成模块对象
		    moduleFactory.create(
				{
					contextInfo: {
						issuer: "",
						compiler: this.compiler.name
					},
					context: context,
					dependencies: [dependency]
				},
				(err, module) => {
					const addModuleResult = this.addModule(module);
					module = addModuleResult.module;
					onModule(module);
					dependency.module = module;
					
					// ...
					// 调用buildModule编译模块
					this.buildModule(module, false, null, null, err => {});
				}
		});
	}
	// 添加入口模块，开始编译&构建
	addEntry(context, entry, name, callback) {
		// ...
		this._addModuleChain( // 调用_addModuleChain添加模块
			context,
			entry,
			module => {
				this.entries.push(module);
			},
			// ...
		);
	}

	
	seal(callback) {
		this.hooks.seal.call();

		// ...
		const chunk = this.addChunk(name);
		const entrypoint = new Entrypoint(name);
		entrypoint.setRuntimeChunk(chunk);
		entrypoint.addOrigin(null, name, preparedEntrypoint.request);
		this.namedChunkGroups.set(name, entrypoint);
		this.entrypoints.set(name, entrypoint);
		this.chunkGroups.push(entrypoint);

		GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk);
		GraphHelpers.connectChunkAndModule(chunk, module);

		chunk.entryModule = module;
		chunk.name = name;

		 // ...
		this.hooks.beforeHash.call();
		this.createHash();
		this.hooks.afterHash.call();
		this.hooks.beforeModuleAssets.call();
		this.createModuleAssets();
		if (this.hooks.shouldGenerateChunkAssets.call() !== false) {
			this.hooks.beforeChunkAssets.call();
			this.createChunkAssets();
		}
		// ...
	}


	createHash() {
		// ...
	}
	
	// 生成 assets 资源并 保存到 Compilation.assets 中 给webpack写插件的时候会用到
	createModuleAssets() {
		for (let i = 0; i < this.modules.length; i++) {
			const module = this.modules[i];
			if (module.buildInfo.assets) {
				for (const assetName of Object.keys(module.buildInfo.assets)) {
					const fileName = this.getPath(assetName);
					this.assets[fileName] = module.buildInfo.assets[assetName]; 
					this.hooks.moduleAsset.call(module, fileName);
				}
			}
		}
	}

	createChunkAssets() {
	 // ...
	}
}
```
在webpack make钩子中, tapAsync注册了一个DllEntryPlugin, 就是将入口模块通过调用compilation.addEntry方法将所有的入口模块添加到编译构建队列中，开启编译流程。
``` js
compiler.hooks.make.tapAsync("DllEntryPlugin", (compilation, callback) => {
		compilation.addEntry(
			this.context,
			new DllEntryDependency(
				this.entries.map((e, idx) => {
					const dep = new SingleEntryDependency(e);
					dep.loc = `${this.name}:${idx}`;
					return dep;
				}),
				this.name
			),
			// ...
		);
	});
```
随后在addEntry 中调用_addModuleChain开始编译。在_addModuleChain首先会生成模块，最后构建。
``` js

class NormalModuleFactory extends Tapable {
	// ...
	create(data, callback) {
		// ...
		this.hooks.beforeResolve.callAsync(
			{
				contextInfo,
				resolveOptions,
				context,
				request,
				dependencies
			},
			(err, result) => {
				if (err) return callback(err);

				// Ignored
				if (!result) return callback();
				// factory 钩子会触发 resolver 钩子执行，而resolver钩子中会利用acorn 处理js生成AST，再利用acorn处理前，会使用loader加载文件
				const factory = this.hooks.factory.call(null);

				factory(result, (err, module) => {
					if (err) return callback(err);

					if (module && this.cachePredicate(module)) {
						for (const d of dependencies) {
							d.__NormalModuleFactoryCache = module;
						}
					}

					callback(null, module);
				});
			}
		);
	}
}
```
在编译完成后，调用compilation.seal方法封闭，生成资源，这些资源保存在compilation.assets, compilation.chunk, 在给webpack写插件的时候会用到
``` js
class Compiler extends Tapable {
	constructor(context) {
		super();
		this.hooks = {
			beforeRun: new AsyncSeriesHook(["compilation"]),
			run: new AsyncSeriesHook(["compilation"]),
			emit: new AsyncSeriesHook(["compilation"]),
			afterEmit: new AsyncSeriesHook(["compilation"]),
			compilation: new SyncHook(["compilation", "params"]),
			beforeCompile: new AsyncSeriesHook(["params"]),
			compile: new SyncHook(["params"]),
			make: new AsyncParallelHook(["compilation"]),
			afterCompile: new AsyncSeriesHook(["compilation"]),
			// other hooks
		};
		// ...
	}

	run(callback) {
		const startTime = Date.now();

		const onCompiled = (err, compilation) => {
			// ...

			this.emitAssets(compilation, err => {
				if (err) return callback(err);

				if (compilation.hooks.needAdditionalPass.call()) {
					compilation.needAdditionalPass = true;

					const stats = new Stats(compilation);
					stats.startTime = startTime;
					stats.endTime = Date.now();
					this.hooks.done.callAsync(stats, err => {
						if (err) return callback(err);

						this.hooks.additionalPass.callAsync(err => {
							if (err) return callback(err);
							this.compile(onCompiled);
						});
					});
					return;
				}
				// ...
			});
		};

		this.hooks.beforeRun.callAsync(this, err => {
			if (err) return callback(err);
			this.hooks.run.callAsync(this, err => {
				if (err) return callback(err);

				this.readRecords(err => {
					if (err) return callback(err);

					this.compile(onCompiled);
				});
			});
		});
	}
	// 输出文件到构建目录
	emitAssets(compilation, callback) {
		// ...
		this.hooks.emit.callAsync(compilation, err => {
			if (err) return callback(err);
			outputPath = compilation.getPath(this.outputPath);
			this.outputFileSystem.mkdirp(outputPath, emitFiles);
		});
	}
	
	newCompilationParams() {
		const params = {
			normalModuleFactory: this.createNormalModuleFactory(),
			contextModuleFactory: this.createContextModuleFactory(),
			compilationDependencies: new Set()
		};
		return params;
	}

	compile(callback) {
		const params = this.newCompilationParams();
		this.hooks.beforeCompile.callAsync(params, err => {
			if (err) return callback(err);
			this.hooks.compile.call(params);
			const compilation = this.newCompilation(params);

			this.hooks.make.callAsync(compilation, err => {
				if (err) return callback(err);
				compilation.finish();
				// make 钩子执行后，调用seal生成资源
				compilation.seal(err => {
					if (err) return callback(err);
					this.hooks.afterCompile.callAsync(compilation, err => {
						if (err) return callback(err);
						// emit, 生成最终文件
						return callback(null, compilation);
					});
				});
			});
		});
	}
}

```
### 最后输出

在seal执行后，便会调用emit钩子，根据webpack config文件的output配置的path属性，将文件输出到指定的path.

## [webpack原理](https://segmentfault.com/a/1190000015088834)
### 基本概念
::: tip
在了解 Webpack 原理前，需要掌握以下几个核心概念，以方便后面的理解：

* Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
* Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
* Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
* Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。
:::

### 流程概括
::: tip
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
:::

### 流程细节
::: tip
Webpack 的构建流程可以分为以下三大阶段：

初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。
如果只执行一次构建，以上阶段将会按照顺序各执行一次。但在开启监听模式下，流程将变为如下：
![](/images/webpack-complier.png)
在每个大阶段中又会发生很多事件，Webpack 会把这些事件广播出来供给 Plugin 使用，下面来一一介绍。

### 初始化阶段


:::



### Compiler 和 Compilation
::: tip
在开发 Plugin 时最常用的两个对象就是 Compiler 和 Compilation，它们是 Plugin 和 Webpack 之间的桥梁。 Compiler 和 Compilation 的含义如下：

* Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是全局唯一的，可以简单地把它理解为 Webpack 实例；
* Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。
Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。
:::

### 事件流
::: tip
Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。 这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。

Webpack 通过 Tapable 来组织这条复杂的生产线。 Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 Webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。

Webpack 的事件流机制应用了观察者模式，和 Node.js 中的 EventEmitter 非常相似。Compiler 和 Compilation 都继承自 Tapable，可以直接在 Compiler 和 Compilation 对象上广播和监听事件，方法如下：

``` js
/**
* 广播出事件
* event-name 为事件名称，注意不要和现有的事件重名
* params 为附带的参数
*/
compiler.apply('event-name',params);

/**
* 监听名称为 event-name 的事件，当 event-name 事件发生时，函数就会被执行。
* 同时函数中的 params 参数为广播事件时附带的参数。
*/
compiler.plugin('event-name',function(params) {

});

```
同理，compilation.apply 和 compilation.plugin 使用方法和上面一致。

在开发插件时，你可能会不知道该如何下手，因为你不知道该监听哪个事件才能完成任务。

在开发插件时，还需要注意以下两点：

* 只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。
* 传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或 Compilation 对象上的属性，会影响到后面的插件。
* 有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知 Webpack，才会进入下一处理流程。例如：
``` js
 compiler.plugin('emit',function(compilation, callback) {
    // 支持处理逻辑

    // 处理完毕后执行 callback 以通知 Webpack 
    // 如果不执行 callback，运行流程将会一直卡在这不往下执行 
    callback();
  });
```
:::

### 实战
::: tip
下面我们举一个实际的例子，带你一步步去实现一个插件。

该插件的名称取名叫 EndWebpackPlugin，作用是在 Webpack 即将退出时再附加一些额外的操作，例如在 Webpack 成功编译和输出了文件后执行发布操作把输出的文件上传到服务器。 同时该插件还能区分 Webpack 构建是否执行成功。使用该插件时方法如下：
``` js
module.exports = {
  plugins:[
    // 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；
    new EndWebpackPlugin(() => {
      // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
    }, (err) => {
      // Webpack 构建失败，err 是导致错误的原因
      console.error(err);        
    })
  ]
}

```
要实现该插件，需要借助两个事件：

* done：在成功构建并且输出了文件后，Webpack 即将退出时发生；
* failed：在构建出现异常导致构建失败，Webpack 即将退出时发生；
实现代码如下：
``` js
class EndWebpackPlugin{
    constructor(doneCallback,failback){
        //存下在构造函数中传入的回调函数
        this.doneCallback = doneCallback;
        this.failCallback = failCallBack;
    }
    apply(complier){
        complier.plugin('done',(stats)=>{
            //在done事件中回调doneCallback
            this.doneCallBack(stats);
        });
        complier.plugin('failed',(err)=>{
            //在fail事件中回调failCallBack
            this.failCallBack(err);
        });
    }
}

//导出插件
module.export = EndWebpackPlugin;
```
从开发这个插件可以看出，找到合适的事件点去完成功能在开发插件时显得尤为重要。 在 工作原理概括 中详细介绍过 Webpack 在运行过程中广播出常用事件，你可以从中找到你需要的事件。
:::