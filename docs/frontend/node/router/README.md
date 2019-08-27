### node.js router
::: tip
- 路由，针对不同的URL提供不同的处理方法。RESTful中的 CRUD 请求对应不同的URL
- 路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
- 路由是由一个 URI、HTTP 请求（GET、POST等）和若干个句柄组成。
- 为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。
- 每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个函数将被执行。
:::

### 一个node.js router实例
::: tip
- 在目录下新建一个文件夹，文件夹作为本次路由测试的目录
- 创建server.js
``` js
//server.js
'use strict';
var http=require('http');
var url=require('url');

function start(route) {
    function onRequest(req,res) {
        // 解析请求，包括文件名
        var pathname=url.parse(req.url).pathname;
        // 输出请求的文件名
        console.log('request for'+pathname+'received');
         //调用路由方法
        route(pathname);
        // Content Type: text/plain
        res.writeHead(200,{'Content-Type':'text/plain'});
        // 响应文件内容
        res.write('hello world');
        // 发送响应数据
        res.end();
    }
    // 创建服务器
    http.createServer(onRequest).listen(8888);
    console.log('server has started at localhost:8888');
}

exports.start=start;
```
- 创建一个路由文件 router.js

``` js
//router.js
'use strict';
function route(pathname) {
    console.log('about to route a request for'+pathname);
}

exports.route=route; 
```
- 创建一个应用执行文件index.js
``` js
//index.js
'use strict';
var server=require('./server.js');
var router=require('./router.js');

server.start(router.route);
```
- 执行文件
``` js
- node index.js
- 然后会看到 - server has started at localhost:8888
:::
















::: tip 
<b>根据node.js的设计规范-CommonJS</b>
CommonJS
:::

### 模块化

::: tip
- 既然JavaScript不能handle如此大规模的代码，我们可以借鉴一下其它语言是怎么处理大规模程序设计的，在Java中有一个重要带概念——package，逻辑上相关的代码组织到同一个包内，包内是一个相对独立的王国，不用担心命名冲突什么的，那么外部如果使用呢？直接import对应的package即可

import java.util.ArrayList; 
遗憾的是JavaScript在设计时定位原因，没有提供类似的功能，开发者需要模拟出类似的功能，来隔离、组织复杂的JavaScript代码，我们称为模块化。

一个模块就是实现特定功能的文件，有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。模块开发需要遵循一定的规范，各行其是就都乱套了

规范形成的过程是痛苦的，前端的先驱在刀耕火种、茹毛饮血的阶段开始，发展到现在初具规模，简单了解一下这段不凡的历程
- 函数封装
``` js
function fn1(){
    //something to do
}

function fn2(){
    // somthing to do
}
```
- 对象
``` js
var obj = {
    a:"var a",
    b:"var b",

    fn1:function(){

    },
    fn2:function(){

    }
}
```
在外面模块引用- module.fn1();
但是可以在外部修改内部值：module.a = ""var aaa";
针对这个问题使用立即执行函数
``` js
var module = ({
    a:"var a";
    b:"var b";

    fn1:function(){

    }
    fn2:function(){

    }
    return {
        fn1:fn1,
        fn2:fn2
    };
})();
```
:::

### CommonJS
CommonJs规范的出发点：后台JS没有模块系统、标准库较少、缺乏包管理工具；为了让JS可以在任何地方运行，以达到Java、C#、PHP这些后台语言具备开发大型应用的能力；事实上ES6已经出现了模块规范，如果使用ES6的模块规范是无需node.js环境的。因此，需要将commonJS规范和ES6的模块规范区分开来。 
1.CommonJS模块规范主要分为三部分：模块定义、模块标识、模块引用。 
a. 一个文件就是一个模块，拥有单独的作用域； 
b.普通方式定义的变量、函数、对象都属于该模块内； 
c.通过require来加载模块； 
d.通过exports和modul.exports来暴露模块中的内容；

模块定义、模块标识：
``` js
//在数据库模块database.js文件中,把各个函数写好，然后暴露出来
 module.exports={
    'saveDatabase':saveDatabase,//保存数据函数
    'saveLastSpider':saveLastSpider,//保存最后一条数据函数
    'getInfoByType':getInfoByType,//通过类型查找函数
    'getInfoByOrder':getInfoByOrder,//通过排序查找函数
 }
//函数具体的实现没有贴出来，上面名称的是函数名。
```

模块引用：
``` js
//在控制模块controller.js中引用上面定义好的模块
var database = require('./database');//引用模块，将生成的对象指向database对象（命名可以是任意定的）
database.saveDatabase([1,2,3,4,5]);//通过database对象调用相应的函数
```
3、所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；模块的加载顺序，按照代码的出现顺序是同步加载的;

4、__dirname代表当前模块文件所在的文件夹路径，__filename代表当前模块文件所在的文件夹路径+文件名;

5、require（同步加载）基本功能：读取并执行一个JS文件，然后返回该模块的exports对象，如果没有发现指定模块会报错;

6、模块内的exports：为了方便，node为每个模块提供一个exports变量，其指向module.exports，相当于在模块头部加了这句话：var exports = module.exports，在对外输出时，可以给exports对象添加方法，PS：不能直接赋值（因为这样就切断了exports和module.exports的联系）;

7、npm root -g：查看npm全局包安装位置，建议在nvm目录下新建npm\node_modules目录，然后设置npm的全局包安装位置：npm config set prefix “”，然后将该路径添加到环境变量中;

8、npm init -y：初始化一个package.json文件，加上-y就会默认生成该文件，无需一步一步填写；npm docs 包名：查看包的文档；npm install：安装package.json中dependencies属性中所有依赖的包

9、由于npm的服务器是国外的，所以如果你没有和谐工具是下载不了的，这里推荐使用淘宝NPM镜像：http://npm.taobao.org/，与官方NPM的同步频率目前为10分钟一次；安装命令：npm install -g cnpm –registry=https://registry.npm.taobao.org，安装包：cnpm install 包名（其它命令基本一致）;

10、如果你不想下载cnpm，npm还提供了一个镜像源管理工具：npm install -g nrm，通过：nrm ls，查看镜像源列表 ，通过：npm use 镜像源，来切换;

11、NPM的模块加载机制：

  如果require的是绝对路径文件，查找不会去遍历每个node_modules目录，其速度最快
　　1）.从module.paths数组中（由当前执行文件目录到磁盘根目录）取出第一个目录作为查找基准

　　2）.直接从目录中查找该文件，如果存在则结束查找，如果不存在则进行下一条查找

　　3）.尝试添加.js、.node、.json后缀之后查找，如果存在文件则结束查找，如果不存在则进行下一条查找

　　4）.尝试将require的参数作为一个包来进行查找，读取目录下的package.json文件，取得Main参数指定的文件

　　5）.尝试查找该文件，如果存在则结束查找，如果不存在则进行第3条查找

　　6）.如果继续失败，则取出module.paths数组中的下一目录作为基准查找，循环第1-5个步骤

　　7）.如果继续失败，循环第1-6个步骤，直到module.paths中的最后一个值

　　8）.如果继续失败，则抛出异常
 ———————————————— 

原文链接：https://blog.csdn.net/a419419/article/details/80196911

::: tip
- AMD
- CMD
:::


### AMD
AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思。它是一个在浏览器端模块化开发的规范

由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出

requireJS主要解决两个问题

1、多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器 
2、js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长 
看一个使用requireJS的例子
``` js
// 定义模块 myModule.js
define(['dependency'], function(){
    var name = 'Byron';
    function printName(){
        console.log(name);
    }

    return {
        printName: printName
    };
});

// 加载模块
require(['myModule'], function (my){
　 my.printName();
});
```
语法
``` js
requireJS定义了一个函数 define，它是全局变量，用来定义模块

define(id?, dependencies?, factory);

id：可选参数，用来定义模块的标识，如果没有提供该参数，脚本文件名（去掉拓展名）
dependencies：是一个当前模块依赖的模块名称数组
factory：工厂方法，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值 
在页面上使用require函数加载模块
require([dependencies], function(){}); 
require()函数接受两个参数
``` 

第一个参数是一个数组，表示所依赖的模块
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。
 ———————————————— 

原文链接：https://blog.csdn.net/jackwen110200/article/details/52105493

::: tip
- AMD
- CMD
:::



### CMD
CMD 即Common Module Definition通用模块定义，CMD规范是国内发展出来的，就像AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同 
语法 
Sea.js 推崇一个模块一个文件，遵循统一的写法 
define(id?, deps?, factory) 
因为CMD推崇

一个文件一个模块，所以经常就用文件名作为模块id
CMD推崇依赖就近，所以一般不在define的参数中写依赖，在factory中写
factory是一个函数，有三个参数，function(require, exports, module)

require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口：require(id)
exports 是一个对象，用来向外提供模块接口
module 是一个对象，上面存储了与当前模块相关联的一些属性和方法
看个例子：
``` js
// 定义模块  myModule.js
define(function(require, exports, module) {
  var $ = require('jquery.js')
  $('div').addClass('active');
});

// 加载模块
seajs.use(['myModule.js'], function(my){

});
```
 ———————————————— 

原文链接：https://blog.csdn.net/jackwen110200/article/details/52105493

::: tip
- AMD
- CMD
:::

### 区别
关于这两个的区别网上可以搜出一堆文章，简单总结一下

最明显的区别就是在模块定义时对依赖的处理不同

1、AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块 
2、CMD推崇就近依赖，只有在用到某个模块的时候再去require 
这种区别各有优劣，只是语法上的差距，而且requireJS和SeaJS都支持对方的写法

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同

很多人说requireJS是异步加载模块，SeaJS是同步加载模块，这么理解实际上是不准确的，其实加载模块都是异步的，只不过AMD依赖前置，js可以方便知道依赖模块是谁，立即加载，而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略

为什么我们说两个的区别是依赖模块执行时机不同，为什么很多人认为ADM是异步的，CMD是同步的（除了名字的原因。。。）

同样都是异步加载模块，AMD在加载模块完成后就会执行改模块，所有模块都加载执行完后会进入require的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行

CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的

这也是很多人说AMD用户体验好，因为没有延迟，依赖模块提前执行了，CMD性能好，因为只有用户需要的时候才执行的原因
 ———————————————— 
原文链接：https://blog.csdn.net/jackwen110200/article/details/52105493