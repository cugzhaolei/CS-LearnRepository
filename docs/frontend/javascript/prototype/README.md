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

### [protytype和_proto_](https://www.cnblogs.com/myfirstboke/p/10449272.html)
所有的对象都拥有__proto__属性，它指向Object.prototype（Object是一个原生函数，所有的对象都是Object的实例）
``` js
let obj = {}
obj.__proto__ === Object.prototype // true
```
所有的函数都同时拥有__proto__和protytpe属性,函数的__proto__指向自己的函数实现 函数的protytpe是一个对象 所以函数的prototype也有__proto__属性 指向Object.prototype
``` js
function func(){}
func.prototype._proto_===Object
```
Object.prototype.__proto__指向null
``` js
Object.prototype._proto_===null
```


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

Object.prototype.a = 'Object';
Function.prototype.a = 'Function';
function Person(){}
var child = new Person();

console.log(Person.a);  //Function
console.log(child.a);   //Object
console.log(child._proto_);  //
console.log(child._proto_._proto_);
console.log(child._proto_._proto_.constructor);
console.log(child._proto_._proto_.constructor.constructor);
console.log(child._proto_._proto_.constructor.constructor.constructor);


VM322:6 Function
VM322:7 Object
VM322:8 {constructor: ƒ}constructor: ƒ Person()__proto__: Object
VM322:9 {a: "Object", constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
VM322:10 ƒ Object() { [native code] }
VM322:11 ƒ Function() { [native code] }
VM322:12 ƒ Function() { [native code] }
```

### 初始化
`Function()`new了`Object()`出来。然后他们各自的`.prototype`，也是各自new出来的。
 
这里面的指向有几个规则，也有几个特例：

#### 规则
 
1. 构造函数/对象，都是对象。
 
   只要是对象，下面就有两个属性：`constructor`和`__proto__`
 
- `.constructor`：谁new的我 我就指谁。
  这是用来记录谁是构造函数的
 
- `.__proto__`：谁new的我 我指他`.prototype`
 
  顺着`constructor`找到爹，然后在下面找到他的`.prototype`，指向他。
 
  这是用来记录，该去哪继承方法/属性的。
   
  自己下面找不到方法/函数，就去`.__proto__`的指针地址里面找。
 
2. 构造函数下面多一个属性，叫`.prototype`
 
   这只有构造函数才有，所以`Function.prototype`相当于`Function().prototype`
 
   构造函数在出生的时候，同时会自动new一个对象出来，`.prototype`会指向这个对象
 
   这个对象，对于这个构造函数没啥用，主要是给new出来的孩子们用的。即其他对象找不到了方法/属性，就通过`.__proto__`找到这里，在这里面继续找。类似于存放给人继承的东西的地方
 

#### 特例
 
1. `Function()`非常特殊，几乎整个都是特例
 
- `Function()`可以看作是自己new了自己，因此`.constructor`指的是自己，`.__proto__`指的也是自己的`.prototype`
 
- `Function()`new出的`Function.prototype`，是个函数
 
  而其他构造函数，new出来的都是对象。
 
- `Function.prototype.__proto__`应该是`Function.prototype`才是呀，但是这样就变成死循环了，自己下面找不到的方法/属性，还是找不到
 
  所以就指向了`Object.prototype`，去继承了`Object.prototype`的方法
 
2. `Object.prototype.__proto__`，指向的是`null`
 
   理应是指向`Object.prototype`的，但那样的话又死循环了，于是就让它指向null，他都没有的方法就全世界都没有了
 
   这下`Object.prototype`就变成了万物方法/属性之源了
    
3. 由`Function`new出来的构造函数，它的`.prototype`的`.__proto__`，指向的是`Objet.prototype`，这个下面再说
 
   感觉就是，遇到死循环不知道该继承谁，就去继承`object.prototype`
   然后`Object.prototype.__proto__`就去继承`null`
 
```js
console.log(Person.a)
// Function
// Person()下面找不到，沿着.__proto__找它爹Function.prototype，里面找到了a=Function，就是结果了。
console.log(child.a)
// Object
// child下面没有a，沿着.__proto__找爹，Person.prototype下面也没有a，再沿着Person.prototype.__proto__找爹，找到了Object.prototype下面有个a是Object，输出
console.log(child.__proto__)
// {constructor: Person()}
// 也就是Person.prototype
console.log(child.__proto__.__proto__)
// {constructor: Object()}
// 也就是Object.prototype
console.log(child.__proto__.__proto__.constructor)
// Object()
console.log(child.__proto__.__proto__.constructor.constructor)
// Function()
console.log(child.__proto__.__proto__.constructor.constructor.constructor)
// Function()
```
 
 
```js
Object.prototype.a='Object'
Function.prototype.a = 'Function'
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
const newObj.__proto__ = Object.getPrototypeOf(newObj) // 获取newObj的原型对象
newObj.__proto__ === foo.prototype // true 验证newObj的原型指向foo
const foo.__proto__ = Object.getPrototypeOf(foo.prototype) // 获取foo.prototype的原型
foo.__proto__ === Object.prototype // true foo.prototype的原型是Object.prototype
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


::: tip

### [js new一个对象的过程](https://www.cnblogs.com/goloving/p/9297019.html)
- 创建一个新对象 
``` js
let obj = {};
```
- 设置新对象的constructor属性为构造函数的名称，设置新对象的_proto_属性指向构造函数的prototype对象；
``` js
obj._proto_= Object.prototype;
```
- 使用新对象调用函数，函数中的this被指向新实例对象
``` js
Object.call(obj);  //{}.构造函数();
```
- 将初始化完毕的新对象地址保存到等号左边的变量中

<b>注意：若构造函数中返回this或返回值是基本类型（number、string、boolean、null、undefined）的值，则返回新实例对象；若返回值是引用类型的值，则实际返回值为这个引用类型</b>

``` js
var foo = "bar";
function test () {
　　this.foo = "foo";
}
new test();     //test中的this指新对象，并未改变全局的foo属性
console.log(this.foo);        // "bar"
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

### [es5实现继承](https://blog.csdn.net/weixin_42098339/article/details/87900369)

1. call实现继承
``` js
function Parent1(){
    this.name="parent";
}
function Child1(){
    Parent1.call(this);
    this.type = 'child1';
}
console.log(new Child1);
```
这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类中一旦存在方法那么子类无法继承。那么引出下面的方法。

2. 借助原型链实现继承
``` js
function Parent2 (){
    this.name = 'paren2';
    this.paly = [1,2,3];
}
function Child2(){
    this.type = 'Child2';
}
Child2.prototype = new Parent2();
console.log(new Child2());
```
看似没有问题，父类的方法和属性都能够访问，但实际上有一个潜在的不足。举个例子

``` js
var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s.play,s2.play);  //[1, 2, 3, 4] [1, 2, 3, 4]
```
明明我只改变了s1的play属性，为什么s2也跟着变了呢？很简单，因为两个实例使用的是同一个原型对象。

3. 组合使用call和原型
``` js
function Parent3(){
    this.name = 'parent3';
    this.play = [1,2,3];
}
function Child3(){
    Parent3.call(this);
    this.type = 'child3';
}
Child3.prototype = new Parent3();
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play,s4.play);//[1, 2, 3, 4] [1, 2, 3]
```
4. 组合继承
``` js
function Parent4(){
    this.name = 'parent4';
    this.play = [1,2,3];
}
function Child4(){
    Parent4.call(this);
    this.type = 'child4';
}
Child4.prototype = Parnet4.prototype;
```
这里让将父类原型对象直接给到子类，父类构造函数只执行一次，而且父类属性和方法均能访问，但是我们来测试一下：

``` js
var s3 = new Child4();
var s4 = new Child4();
console.log(s3);
```
子类实例的构造函数是Parent4，显然这是不对的，应该是Child4。

第五种方式(最推荐使用)：优化2
``` js
function Person5(){
    this.name = 'parent5';
    this.play = [1,2,3];
}
function Child5(){
    Parent5.call(this);
    this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;
```

### [es5/es6实现继承](https://blog.csdn.net/weixin_29364823/article/details/87858328)

1. 定义一个Person类
``` js
function Person(name="default" age=10){
    this.name = name;
    this.age = age;
    var currentClassName = 'Person'; //私有属性
    this.printClassName  = function(){  //特权方法 主要用来访问私有属性
        console.log("className:"+currentClassName);
    }
}
//原型属性
Person.prototype.className = "Person";
//原型方法
Person.prototype.printName = function(){
    console.log("My name is"+this.name)
}
//静态属性
Person.Version = 1.1
```
2. 定义一个People类，并继承person类
``` js
function People(name="default",age=18,sex='man'){
    //特权属性及方法继承
    Person.call(this.name,age);
    this.sex = sex;
    let currentClassName = 'people';//私有属性
    this.printClassName = function(){
        //特权方法 主要是用来访问私有属性
        console.log("className"+currentClassName);
    }
}
//原型属性
Person.prototype.className = 'People';
//原型方法
People.prototype.printSex = function(){
    console.log('my sex is'+this.sex);
}
//原型链属性继承
People.prototype._proto_ = Person.prototype;
//静态属性继承
People._proto_ = Person;
```
3. 执行并运行
``` js
const p = new People('three',25,'male');
p.printClassName();  //className：people
p.printSex();        //my name is three
p.printName();       //my sex is male
console.log(p.className);    //people
console.log(Person.version)  //1.1
```
### ES6实现继承
``` js
class Person{
    constructor(name='defalut',age='18'){
        this.name = name;
        this.age = age;
        let currentClassName = 'Person';//私有属性
        this.printClassName = function(){
            console.log('className:'+currentClassName);
        }
    }
    printName(){
        console.log(`my name is `+this.name)
    }
    get className(){
        return 'Person'
    }
    static get Version(){
        return 1.1
    }
}

class People extends Person{
    constructor(name='default',age=18,sex='male'){
        super(name.age);
        this.sex = sex;
        let currentClassName = 'people'; //私有属性
        this.printClassName = function(){
            //特权方法 主要用来访问私有属性
            console.log(`className`+this.currentClassName)
        }
    }
    printSex(){
        console.log(`my sex is `+this.sex)
    }
}

const p = new people('',25,'male');
p.printClassName(); //className:people
p.printName();      //my name is three
p.printSex();       //my sex is male
console.log(People.version)   //1.1
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
//属性.的优先级高于new foo()，所以===new (Foo.getName)();返回Foo.getName类型的实例
var b=new Foo().getName();//2;
//new foo()的优先级高于foo()，所以就相当于new foo()的属性，===(new Foo()).getName()；返回undefined
var c=new new Foo().getName();//2;
//new foo()优先级低于属性.，所以其实相当于就是new一个new foo()的getName属性函数，===new (new Foo().getName)();返回Foo.getName类型的实例
new Date().getTime();//===((new Date()).getTime)()
(new Date).getTime();//===((new Date()).getTime)()
new Date.getTime();//Uncaught TypeError: Date(...).getTime is not a function；===new (Date.getTime)()
```
:::


### [JavaScript mixin](https://www.jianshu.com/p/7c1471ec4c50)

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


## [7种继承方式](https://www.jianshu.com/p/47c4ab07f271)

[参考链接](https://www.jianshu.com/p/270a037c46c9)

创建对象的过程，便是画一份设计图，JS一共提供了 7 种创建的方式（来自高程三），包括：
1. 工厂模式
2. 构造函数模式
3. 原型模式
4. 组合使用构造函数模式和原型模式
5. 动态原型模式
6. 寄生构造函数模式
7. 稳妥构造函数模式

### 1.工厂模式

``` js  
function createInstance(args1,args2){
    var obj = new Object();
    obj.args1 = args1;
    obj.args2 = args2;
    obj.poly = function(){
        console.log(this.args1+this.args2);
    };
    return obj;
}
var ins1 = createInstance('00','12');
```
在函数内部创建一个对象，然后将参数绑定后再返回，可以实现封装一个类的功能，但缺点是所有的对象的都是Object，无法准确判断它们的类型，比如“人”类是Object，“动物”类也是Object。
  于是出现了构造函数模式。

### 2.构造函数模式
``` js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.fullName = function(){
        console.log(this.name)
    };
}

var person = new Person("菜鸟",25);
```
不用return对象，将属性和方法直接给了this对象，这样便可以用alert(person instanceof Person);//ture来检测对象的类型，这意味着将来可以将Person标识为一种特定的类型，更利于类的概念。
使用构造函数创建对象，必须使用到new操作符，若是当做普通函数来使用，就相当是为全局对象添加了属性，最后会出现window.fullName();//打印出传入的name变量，而使用new来调用构造函数会经历一下四个步骤：
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象
3. 执行构造函数中的代码（为新对象添加属性）
4. 返回这个新对象
构造函数模式同样有其缺陷，比如上面的例子中，如果创建了两个“人”，就有两个同样的sayName()方法，可以实现同样的功能（打印名字），一个两个还好，如果我们有成百上千个Person实例的话，name就有千百个fullName()方法，这在内存中的开销无疑是极大的，既然是同样的功能，那么让它们共同使用一个函数就足够了，因此可以将这个函数摘出来，这样写：
``` js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.fullName = fullName;
}
function fullName(){
    console.log(this.name);
}
```
将内部引用外部命名的函数，而将函数体放在外面，这样指向的就是同一个方法了，只是如此一来fullName这个方法相当于是放在了全局作用域中，但方法本身却只想让Person的对象使用，大炮打蚊子，有点小尴尬，同时类的封装性也遭到了破坏，由此问题，便引出了第三种创建方法——原型模式。

### 3.原型模式
每个构造函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途，便是容纳同一类下所有实例公有的方法和属性，写法如下。
``` js
function Person(){

}
Person.prototype.name = '菜鸟';
Person.prototype.age = '25';
Person.prototype.fullName = function(){
    console.log(this.name);
};
var person = new Person();
//or
Person.prototype = {
    name:'菜鸟',
    age:'25',
    fullName:function(){
        console.log(this.name);
    }
}
```
好处很明显，同一类下所有对象可以共享属性和方法，当然，缺点一样明显，创建对象的时候无法传入自定义参数，除非设置如person1.name = "夏娃";才会覆盖掉原来的名字，更为严重的是，如果Person的原型中包含了一个数组（引用类型），如果一个对象修改了这个数组，其他对象的数组都会发生变化，因为引用类型的变量指向的是同一块内存地址，这样事情就变得很麻烦了。
构造函数模式无法设置共享的属性，而原型模式无法自定义属性，那如果将两者优点结合起来，那不是天下无敌了吗！？
  所以，我们有了第四种方式——组合使用构造函数模式和原型模式。

###  4.组合使用构造函数和原型模式
``` js
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype = {
    constructor:Person,  //确保实例的构造函数指向Persom
    fullName:function(){
        console.log(this.name);
    }
}
var person = new Person('菜鸟',25);
```
可以自定义的属性（包括引用类型）都放在构造函数里，随便修改都不会影响其他实例，而公共的方法则放在原型对象中，避免资源浪费。

### 5.动态原型模式

当我们为对象定义一个方法时，有时可能存在冲突，必要的情况下，我们可以检查某个应该存在的方法是否有效，如果有效，看一眼走人，如果无效，我们再初始化原型。
``` js
function Person(name,age){
    this.name = name;
    this.age = age;
}
if(typeof this.fullName !="function"){
    Person.prototype.fullName = function(){
        console.log(this.name);
    }
}
```
如上述代码，仅当fullName方法不存在的情况下，才会在原型中添加此方法，而且只会在初次调用构造函数的时候才会执行这条语句，一旦定义后，由于是定义在原型上的方法，所有对象之后都可以直接调用了。
  这种方法的缺陷，同样是不能重写原型，否则会切断现有实例与新原型之间的联系。

### 6.寄生构造函数模式
.在前面几种模式都不适用的情况下（应该不会遇到吧...），可以使用寄生构造函数模式创建对象，基本思想是：创建一个函数，其作用仅仅只是封装创建对象的代码，然后再返回新创建的对象。
``` js
function Person(name,age){
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.fullName = function(){
        console.log(this.name);
    };
    return obj;
}
var person = new Person("菜鸟",25);
```
除了用new操作符以外，其余写法和工厂模式一模一样，一般会在特殊情况下使用它，例如要创建一个数组对象（Array），但在这个对象中要添加新的方法，直接修改Array的构造函数的话，程序里所有的数组都变了，GG，所以可以使用这个模式。代码如下：
``` js
function specialArray(){
    var arr = new Array();
    arr.newFunction = function(){
        console.log("new array function ");
    }
    //function2
    return arr;
}
var list = new specailArray();
list.newFunction();//我叫数组的新方法
```
 要注意，返回的对象与构造函数之间没有关系，不能使用instanceof来确定对象类型，这一点与工厂模式相同，因此建议尽可能不要使用这种方法。

### 7.稳妥构造函数模式

稳妥对象，指的是没有公共属性，也不引用this对象，这种模式适合在禁止使用 this 和 new 的环境中，或者在防止数据被其他应用程序（如Mashup程序）改动时使用，除了不使用 this 和 new 以外，和寄生构造函数模式类似，代码如下：
``` js
function Person(name,age){
    var obj = new Object();
    obj.fullName = function(){
        console.log(name);
    };
    return obj;
}
var person = Person("菜鸟",25);
person.fullName();
```
除了使用fullName() 方法外，没有其他办法访问 name 的值，方法中定义的私有变量和属性也无法影响传入的 name 值，安全性杠杠的！
  当然，与寄生构造函数模式、工厂模式相同，它也不能使用 instanceof 检测其类型。


## 小结

ECMAScript 支持面向对象（OO）编程，但不使用类或者接口。对象可以在代码执行过程中创建和增强，因此具有动态性而非严格定义的实体。在没有类的情况下，可以采用下列模式创建对象。
*  工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来被构造函数模式所取代。
*  构造函数模式，可以创建自定义引用类型，可以像创建内置对象实例一样使用 new 操作符。不过，构造函数模式也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数。
*  原型模式，使用构造函数的 prototype 属性来指定那些应该共享的属性和方法。组合使用构造函数模式和原型模式时，使用构造函数定义实例属性，而使用原型定义共享的属性和方法。

继承方式
*  原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅
复制。而复制得到的副本还可以得到进一步改造。
*  寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强
对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率问
题，可以将这个模式与组合继承一起使用。
*  寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。