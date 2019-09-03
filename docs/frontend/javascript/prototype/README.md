## JavaScript 原型相关

https://juejin.im/post/5d622f14f265da03a1486408

JS的原型、原型链一直是比较难理解的内容，不少初学者甚至有一定经验的老鸟都不一定能完全说清楚，更多的"很可能"是一知半解，而这部分内容又是JS的核心内容，想要技术进阶的话肯定不能对这个概念一知半解，碰到问题靠“猜”，却不理解它的规则！

## prototype

<strong>只有函数有prototype属性</strong>

``` js
let a = {}
let b = function () { }
console.log(a.prototype) // undefined
console.log(b.prototype) // { constructor: function(){...} }

```

<b>Object.prototype怎么解释？</b>

其实Object是一个全局对象，也是一个构造函数，以及其他基本类型的全局对象也都是构造函数：

``` js
function outTypeName(data, type) {
    let typeName =  Object.prototype.toString.call(data)
    console.log(typeName)
}
outTypeName(Object) //[object Function]
outTypeName(String) // [object Function]
outTypeName(Number) // [object Function]
```
<strong>为什么只有函数有prototype属性</strong>

JS通过new来生成对象，但是仅靠构造函数，每次生成的对象都不一样。
有时候需要在两个对象之间共享属性，由于JS在设计之初没有类的概念，所以JS使用函数的prototype来处理这部分<b>需要被共享的属性</b>，通过函数的prototype来模拟类：
当创建一个函数时，JS会自动为函数添加prototype属性，值是一个有constructor的对象。
以下是共享属性prototype的栗子：

``` js
function People(name) {
    this.name = name
}
People.prototype.age = 23 // 岁数
// 创建两个实例
let People1 = new People('OBKoro1')
let People2 = new People('扣肉')
People.prototype.age = 24 // 长大了一岁
console.log(People1.age, People2.age) // 24 24
```
<b>为什么People1和People2可以访问到People.prototype.age？</b>

原因是：People1和People2的原型是People.prototype，答案在下方的：构造函数是什么以及它做了什么。

## 原型链

__proto__和Object.getPrototypeOf(target)： 对象的原型
__proto__是对象实例和它的构造函数之间建立的链接，它的值是：构造函数的`prototype。
也就是说：__proto__的值是它所对应的原型对象，是某个函数的prototype
Object.getPrototypeOf(target)全等于__proto__。
它是ES6的标准，兼容IE9，主流浏览器也都支持，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9)，本文将以Object.getPrototypeOf(target)指代__proto__。

<b>不要再使用__proto__:</b>

本段摘自[阮一峰-ES6入门](http://es6.ruanyifeng.com/#docs/object-methods#__proto__%E5%B1%9E%E6%80%A7%EF%BC%8CObject-setPrototypeOf%EF%BC%8CObject-getPrototypeOf)，具体解析请点击链接查看

1. __proto__属性没有写入 ES6 的正文，而是写入了附录。

2. 原因是它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。

3. 标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。

4. 所以无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，应该使用：Object.getPrototypeOf(target)（读操作）、Object.setPrototypeOf(target)（写操作）、Object.create(target)（生成操作）代替

## 构造函数是什么、它做了什么
`
出自《你不知道的js》：在js中, 实际上并不存在所谓的'构造函数'，只有对于函数的'构造调用'。
`
上文一直提到构造函数，所谓的构造函数，实际上就是通过关键字new来调用的函数：

``` js
let newObj = new someFn() // 构造调用函数
```

<b>构造/new调用函数的时候做了什么：</b>

1. 创建一个全新的对象。
2. 这个新对象的原型(Object.getPrototypeOf(target))指向构造函数的prototype对象。
3. 该函数的this会绑定在新创建的对象上。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
5. 我们称这个新对象为构造函数的实例。

<b>原型继承就是利用构造调用函数的特性：</b>
``` js

SubType.prototype = new SuperType();  // 原型继承：SubType继承SuperType
SubType.prototype.constructor = SubType // 重新指定constructor指向 方便找到构造函数
// 挂载SuperType的this和prototype的属性和方法到SubType.prototype上
```
1. 构造调用的第二点：将新对象的Object.getPrototypeOf(target)指向函数的prototype
2. 构造调用的第三点：该函数的this会绑定在新创建的对象上。
3. 新对象赋值给SubType.prototype

原型类型有个缺点：多个实例对引用类型的操作会被篡改。

----
因为每次实例化引用类型的数据都指向同一个地址，所以它们读/写的是同一个数据，当一个实例对其进行操作，其他实例的数据就会一起更改。

## 原型链是什么

来看个例子：
``` js
function foo() { }
const newObj = new foo() // 构造调用foo 返回一个新对象
const newObj__proto__ = Object.getPrototypeOf(newObj) // 获取newObj的原型对象
newObj__proto__ === foo.prototype // true 验证newObj的原型指向foo
const foo__proto__ = Object.getPrototypeOf(foo.prototype) // 获取foo.prototype的原型
foo__proto__ === Object.prototype // true foo.prototype的原型是Object.prototype
```
如果用以前的语法，从newObj查找foo的原型，是这样的：

``` js
newObj.__proto__.__proto__ // 这种关系就是原型链
```

可以用以下三句话来理解原型链：
1. 每个对象都拥有一个原型对象: newObj的原型是foo.prototype。
2. 对象的原型可能也是继承其他原型对象的: foo.prototype也有它的原型Object.prototype。
3. 一层一层的，以此类推，这种关系就是原型链。

<b>一个对象是否在另一个对象的原型链上</b>
如果一个对象存在另一个对象的原型链上，我们可以说：它们是继承关系。
判断方式有两种，但都是根据构造函数的prototype是否在原型链上来判断的：

1. instanceof: 用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置
语法：object instanceof constructor
``` js
let test = function () { }
let testObject = new test();
testObject instanceof test // true test.prototype在testObject的原型链上
 testObject instanceof Function // false Function.prototype 不在testObject的原型链上
testObject instanceof Object // true Object.prototype在testObject的原型链上

```
2. isPrototypeOf：测试一个对象是否存在于另一个对象的原型链上
语法：prototypeObj.isPrototypeOf(object)
``` js
let test = function () { }
let testObject = new test();
test.prototype.isPrototypeOf(testObject) // true test.prototype在testObject的原型链上
Object.prototype.isPrototypeOf(testObject) // true Object.prototype在testObject的原型链上

```
## 原型链的终点: Object.prototype

Object.prototype是原型链的终点，所有对象都是从它继承了方法和属性。

Object.prototype没有原型对象：

``` js
const proto = Object.getPrototypeOf(Object.prototype) // null
```

下面是两个验证例子，有疑虑的同学多写几个测试用例印证一下。

<b>字符串原型链的终点：Object.prototype</b>
``` js
let test = '由String函数构造出来的'
let stringPrototype = Object.getPrototypeOf(test) // 字符串的原型
stringPrototype === String.prototype // true 字符串的原型是String对象
Object.getPrototypeOf(stringPrototype) === Object.prototype // true String对象的原型是Object对象
```
<b>函数原型链的终点:Object.prototype</b>
``` js
let test = function () { }
let fnPrototype = Object.getPrototypeOf(test)
fnPrototype === Function.prototype // true test的原型是Function.prototype
Object.getPrototypeOf(Function.prototype) === Object.prototype // true
```

## 原型链用来做什么？

<b>属性查找：</b>
如果试图访问对象(实例instance)的某个属性,会首先在对象内部寻找该属性,直至找不到,然后才在该对象的原型(instance.prototype)里去找这个属性，以此类推
``` js
let test = '由String函数构造出来的'
let stringPrototype = Object.getPrototypeOf(test) // 字符串的原型
stringPrototype === String.prototype // true 字符串的原型是String对象
Object.getPrototypeOf(stringPrototype) === Object.prototype // true String对象的原型是Object对象
```
当你访问test的某个属性时，浏览器会进行以下查找：

1. 浏览器首先查找test 本身
2. 接着查找它的原型对象：String.prototype
3. 最后查找String.prototype的原型对象：Object.prototype
4. 一旦在原型链上找到该属性，就会立即返回该属性，停止查找。
5. 原型链上的原型都没有找到的话，返回undefiend

这种查找机制还解释了字符串为何会有自带的方法: slice/split/indexOf等。

准确的说：

- 这些属性和方法是定义在String这个全局对象/函数上的。
- 字符串的原型指向了String函数的prototype。
- 之后通过查找原型链，在String函数的prototype中找到这些属性和方法。

<b>拒绝查找原型链：</b>

hasOwnProperty: 指示对象自身属性中是否具有指定的属性

语法：obj.hasOwnProperty(prop)

参数: prop 要查找的属性

返回值: 用来判断某个对象是否含有指定的属性的Boolean。
``` js
let test ={ 'OBKoro1': '扣肉' }
test.hasOwnProperty('OBKoro1');  // true
test.hasOwnProperty('toString'); // false test本身没查找到toString 
```

这个API是挂载在object.prototype上，所有对象都可以使用，API会忽略掉那些从原型链上继承到的属性。

## 扩展
<b>实例的属性</b>
你知道构造函数的实例对象上有哪些属性吗？这些属性分别挂载在哪个地方？原因是什么？
``` js

function foo() {
    this.some = '222'
    let ccc = 'ccc'
    foo.obkoro1 = 'obkoro1'
    foo.prototype.a = 'aaa'
}
foo.koro = '扣肉'
foo.prototype.test = 'test'
let foo1 = new foo() // `foo1`上有哪些属性,这些属性分别挂载在哪个地方
foo.prototype.test = 'test2' // 重新赋值
```

1. this.some：foo1对象的属性

通过构造调用foo的this指向foo1，所以this.some挂载在foo1对象下。
属性查找: foo1.some
foo1.some直接读取foo1的属性。

2. foo1.test、foo1.a：foo1对象的原型

根据上文提到的：构造/new调用函数的时候会创建一个新对象(foo1)，自动将foo1的原型(Object.getPrototypeOf(foo1))指向构造函数的prototype对象。
构造调用会执行函数，所以foo.prototype.a = 'aaaaa'也会执行，单就赋值这个层面来说写在foo外面和写在foo里面是一样的。
属性查找：foo1.test、foo1.a

* foo1本身没有找到,继续查找
* foo1的原型Object.getPrototypeOf(foo1)上找到了a和test，返回它们，停止查找。


3. foo1.obkoro1和foo1.koro：返回undefined

<b>静态属性: foo.obkoro1、foo.koro</b>

函数在JS中是一等公民，它也是一个对象, 用来模拟类。

这两个属性跟foo1没有关系，它是对象foo上的两个属性(类似函数的:arguments/prototype/length等属性)，称为静态属性。
它们只能通过foo.obkoro1和foo.koro来访问。

<b>原型对象改变，原型链下游获取的值也会改变</b>

上面那个例子中的foo1.test的值是什么？
``` js
foo.prototype.test = 'test'
let foo1 = new foo() // `foo1`上有哪些属性,这些属性分别挂载在哪个地方
foo.prototype.test = 'test2' // 重新赋值
```
foo1.test的值是test2，原因是：foo1的原型对象是Object.getPrototypeOf(foo1)存的指针，指向foo.prototype的内存地址，不是拷贝，每次读取的值都是当前foo.prototype的最新值。


## 原型/构造函数/实例

- 原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个JavaScript对象中都包含一个__proto__ (非标准)的属性指向它爹(该对象的原型)，可obj.__proto__进行访问。

- 构造函数: 可以通过new来 新建一个对象 的函数。

- 实例: 通过构造函数和new创建出来的对象，便是实例。 实例通过__proto__指向原型，通过constructor指向构造函数。

``` js
//实例
const instance = new Object();

//原型
const prototype = Object.prototype;

```

``` js

实例.__proto__ === 原型

原型.constructor === 构造函数

构造函数.prototype === 原型

// 这条线其实是是基于原型进行获取的，可以理解成一条基于原型的映射线
// 例如: 
// const o = new Object()
// o.constructor === Object   --> true
// o.__proto__ = null;
// o.constructor === Object   --> false
实例.constructor === 构造函数
```

## 对象的拷贝

* 浅拷贝: 以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响
![微软开发者社区](https://msdn.microsoft.com/zh-cn/library/dn858229(v=vs.94).aspx)
``` js
- Object.assing(target,…sources)

- 展开运算符
```

* 深拷贝: 完全拷贝一个新对象，修改时原对象不再受到任何影响

``` js
Array :

// 1. for循环

let arr1 = [1,2,3];
let arr2 = copyArr(arr1);
function copyArr(arr){
    let res=[];
    for(let i=0,length=arr.length;i<length;i++){
        res.push(arr[i]);
    }
    return res;
}

//2. slice //返回新数组
let arr1 = [1,2,3];
let arr2 = arr1.slice(0);

//3. contact
let arr1 = [1,2,3];
let arr2 = arr1.contact();

//4. 扩展运算符
let arr1 = [1,2,3];
let [...arr2] = arr1;

//5. Array.from
//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
let arr1 = [1,2.3];
let arr2 = Array.from(arr1);


//Object

//1. for循环

let obj1 = {count:12,price:200,name:'apple'};
let onj2 = copyObj(obj){
    let ans = {};
    for(let key in obj){
        res[key] = obj[key];
    }
    return ans;
}


//2.JSON方法
//具有循环引用的对象时，报错
//当值为函数、undefined、或symbol时，无法拷贝
let obj1 = {count:12,price:200,name:'apple'};
let obj2 = JSON.parse(JSON.stringify(obj1));


//3 扩展运算符
let obj1 = {count:12,price:200,name:'apple'};
let {...obj2} = obj1;

//组合版
//
function deepClone(obj){
    let ans = Array.isArray(obj)?[],{};
    if(obj&&typeof obj === 'object'){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                if(obj[key]&&typeof obj[key]==='object'){
                    ans[key]=deepClone(obj[key]);
                }else{
                    ans[key] = obj[key];
                }
            }
        }
    }
    return ans;
}


//避免相互引用导致死循环，在遍历过程中判断是否是相互引用对象，是则退出循环
// https://blog.csdn.net/weixin_37719279/article/details/81240658
function deepClone(obj){
    let ans = Array.isArray(obj)?[]:{};
    for(let i in obj){
        let prop = obj[i];
        if(prop===ans){
            continue;
        }
        if(typeof prop === 'object'){
            ans[i] = (prop.constructor===Array)?[]:{};
            arguments.callee(prop,obj[i]);
        }else{
            ans[i] = prop;
        }
    }
    return ans;
}

function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : {};            
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
var str = {};
var obj = { a: {a: "hello", b: 21} };
deepClone(obj, str);
console.log(str.a);

//Obeject.create()方法
//直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果。

function deepClone(obj){
    let ans = Array.isArray(obj)?[],{};
    for(var i in obj){
        var prop = obj[i];
        if(prop === ans)
        {
            continue;
        }
        if(typeof prop === 'object'){
            ans[i] = (prop,constructor === Array)?[]:Object.create(prop);
        }else{
            ans[i] = prop;
        }
    }
    return ans;
}

```


::: tip
https://www.cnblogs.com/goloving/p/9297019.html
### js new一个对象的过程
- 创建一个新对象 
let obj = {};
- 设置新对象的constructor属性为构造函数的名称，设置新对象的_proto_属性指向构造函数的prototype对象；
obj._proto_= Object.prototype;
- 使用新对象调用函数，函数中的this被指向新实例对象
Object.call(obj);  //{}.构造函数();
- 将初始化完毕的新对象地址保存到等号左边的变量中

<b>注意：若构造函数中返回this或返回值是基本类型（number、string、boolean、null、undefined）的值，则返回新实例对象；若返回值是引用类型的值，则实际返回值为这个引用类型</b>

``` js
var foo = "bar";
function test () {
　　this.foo = "foo";
}
new test();            　　　　　//test中的this指新对象，并未改变全局的foo属性
console.log(this.foo);             // "bar"
console.log(new test().foo);  // "foo";
```
### JS原生实现new
``` js

// 通过分析原生的new方法可以看出，在new一个函数的时候，
// 会返回一个func同时在这个func里面会返回一个对象Object，
// 这个对象包含父类func的属性以及隐藏的__proto__
function New(f) {
    //返回一个func
    return function () {
        var o = {"__proto__": f.prototype};
        f.apply(o, arguments);//继承父类的属性
        return o; //返回一个Object
    }
}
```

## 优先级

``` js
function getName(){
    console.log(1)
}
function Foo() {
    this.getName = function () {
        console.log(2); 
    };
    return this;
}
Foo.getName = function () {
    console.log(3);
};
//先从.属性访问符号开始往前面找一个最近的对象，同时注意new Foo()优先于Foo();
var a=new Foo.getName();//3;
属性.的优先级高于new foo()，所以===new (Foo.getName)();返回Foo.getName类型的实例
var b=new Foo().getName();//2;
new foo()的优先级高于foo()，所以就相当于new foo()的属性，===(new Foo()).getName()；返回undefined
var c=new new Foo().getName();//2;
new foo()优先级低于属性.，所以其实相当于就是new一个new foo()的getName属性函数，===new (new Foo().getName)();返回Foo.getName类型的实例
new Date().getTime();//===((new Date()).getTime)()
(new Date).getTime();//===((new Date()).getTime)()
new Date.getTime();//Uncaught TypeError: Date(...).getTime is not a function；===new (Date.getTime)()
```
:::

### JavaScript mixin

链接：https://www.jianshu.com/p/7c1471ec4c50

::: tip

Mixin模式，混合模式。这是一种不用继承就可以复用的技术。主要还是为了解决多重继承的问题。多继承的继承路径是个问题。
JS是基于对象的，类和对象都是对象模板。
混合mixin，指的是将一个对象的全部或者部分拷贝到另一个对象上去。其实就是属性了。
可以将多个类或对象混合成一个类或对象。

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
- 将类的构造函数建成箭头函数


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
:::

### 原型链继承

``` js
var inherit = (function(c,p){
	var F = function(){};
	return function(c,p){
		F.prototype = p.prototype;
		c.prototype = new F();
		c.uber = p.prototype;
		c.prototype.constructor = c;
	}
})();

```

## 类型判断
判断 Target 的类型，单单用 typeof 并无法完全满足，这其实并不是 bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

基本类型(null): 使用 String(null)
基本类型(string / number / boolean / undefined) + function: 直接使用 typeof即可
其余引用类型(Array / Date / RegExp Error): 调用toString后根据[object XXX]进行判断

``` js
let class2type = {}

```

## [Call Apply Bind](https://blog.csdn.net/wangzl1163/article/details/81121742)

一、call、apply的作用与应用
每个函数都包含两个非继承而来的方法：apply()和call()。
* 改变调用他们的函数体内部this的指向：指向第一个参数（为null指向宿主对象：浏览器中就是window对象！）
* 实现bind的功能
* 借用其他对象的方法。也就是说可以实现继承（构造函数继承或者构造函数和原型链继承组合式继承或者寄生组合式继承）

这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内this对象的值。
首先，apply()方法接收两个参数：
一个是在其中运行函数的作用域，另一个是参数数组。
其中，第二个参数可以是Array的实例，也可以是arguments对象。例如：
``` js
function sum(num1, num2){
    return num1 + num2;
}
 
function callSum1(num1, num2){
    return sum.apply(this, arguments);        // 传入arguments对象
}
 
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);    // 传入数组
}
 
alert(callSum1(10,10));   //20
alert(callSum2(10,10));   //20
```
在上面这个例子中，callSum1()在执行sum()函数时传入了this作为this值（因为是在全局作用域中调用的，所以传入的就是window对象）和arguments对象。而callSum2同样也调用了sum()函数，但它传入的则是this和一个参数数组。这两个函数都会正常执行并返回正确的结果。
::: danger
注意：在严格模式下，未指定环境对象而调用函数，则this值不会转型为window。除非明确把函数添加到某个对象或者调用apply()或call()，否则this值将是undefined。
:::

call()方法与apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。对于call()方法而言，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须逐个列举出来，如下面的例子所示。
``` js
function sum(num1, num2){
    return num1 + num2;
}
 
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
 
alert(callSum(10,10));   //20
```
在使用call()方法的情况下，callSum()必须明确地传入每一个参数。结果与使用apply()没有什么不同。至于是使用apply()还是call()，完全取决于你采取哪种给函数传递参数的方式最方便。如果你打算直接传入arguments对象，或者包含函数中先接收到的也是一个数组，那么使用apply()肯定更方便；否则，选择call()可能更合适。（在不给函数传递参数的情况下，使用哪个方法都无所谓。）

事实上，传递参数并非apply()和call()真正的用武之地；它们真正强大的地方是能够扩充函数赖以运行的作用域。下面来看一个例子。
``` js
window.color = "red";
var o = { color: "blue" };
 
function sayColor(){
    alert(this.color);
}
 
sayColor();                //red
 
sayColor.call(this);       //red
sayColor.call(window);     //red
sayColor.call(o);          //blue
```
sayColor()是作为全局函数定义的，而且当在全局作用域中调用它时，它确实会显示"red"——因为对this.color的求值会转换成对window.color的求值。而sayColor.call(this)和sayColor.call(window)，则是两种显式地在全局作用域中调用函数的方式，结果当然都会显示"red"。但是，当运行sayColor.call(o)时，函数的执行环境就不一样了，因为此时函数体内的this对象指向了o，于是结果显示的是"blue"。

使用call()（或apply()）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。再看如下代码。
``` js
window.color = "red";
var o = { color: "blue" };
 
function sayColor(){
    alert(this.color);
}
 
sayColor();                //red
 
o.sayColor = sayColor;
o.sayColor();          //blue
```
我们是先将sayColor()函数放到了对象o中，然后再通过o来调用它的；而在上面的的例子中，就不需要现在这个多余的步骤了。

### bind与call和apply的区别
ECMAScript 5还定义了一个方法：bind()。这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。例如：
``` js
window.color = "red";
var o = { color: "blue" };
 
function sayColor(){
    alert(this.color);
} 
var objectSayColor = sayColor.bind(o);
objectSayColor();    //blue
```
在这里，sayColor()调用bind()并传入对象o，创建了objectSayColor()函数。objectSayColor()函数的this值等于o，因此即使是在全局作用域中调用这个函数，也会看到"blue"。只要是将某个函数指针（即函数名）以值的形式进行传递，同时该函数必须在特定环境中执行，被绑定函数的效用就突显出来了。它们主要用于事件处理程序以及setTimeout()和setInterval()。然而，被绑定函数与普通函数相比有更多的开销，它们需要更多内存，同时也因为多重函数调用稍微慢一点，所以最好只在必要时使用。
