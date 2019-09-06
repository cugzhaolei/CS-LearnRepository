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

:::