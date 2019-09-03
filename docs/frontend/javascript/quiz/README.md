## JavaScript 相关面试题


### [webworker](./webworker/)
### [vue 相关](./vue/)
### [Vue面试知识](./vue/)
### [防抖与节流](https://www.jianshu.com/p/566c66aafa22)

:::
### array 相关
::: tip
- map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

``` js
//["1","2","3"].map(parseInt)



//
var ary = [0,1,2];																
ary[10]=10; 
ary.filter(function(x){return x===undefined;});

console.log(ary);

//3-9都没有初始化 
[0,1,2,empty*7,10];


```
:::

### 自执行函数
::: tip
``` js

常见两种方式
1.(function(){...})()
  (function(x){
      console.log(x);
  })(12345)
2.(function(){...}())
  (function(x){
      console.log(x);
  }(12345))
作用 不破坏污染全局的命名空间，若需要使用，将其用变量传入如
（function(window){...}(window)）

```
:::

### async/await
::: tip

ES7 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
想较于 Generator，Async 函数的改进在于下面四点：

* 内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样；
* 更好的语义。async 和 await 相较于 * 和 yield 更加语义化；
* 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）；
* 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator对象方便，可以直接使用 then() 方法进行调用。

作者：xiangzhihong
链接：https://juejin.im/post/5bee888fe51d4557fe34e356
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
``` js
作用：异步代码的新方式
promise示例
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
async/await示例
const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}

```
:::

### [Js Mixin](https://www.jianshu.com/p/7c1471ec4c50)

::: tip
Mixin模式，混合模式。这是一种不用继承就可以复用的技术。主要还是为了解决多重继承的问题。多继承的继承路径是个问题。
JS是基于对象的，类和对象都是对象模板。
混合mixin，指的是将一个对象的全部或者部分拷贝到另一个对象上去。其实就是属性了。
可以将多个类或对象混合成一个类或对象。
#### 继承实现

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

s = new Serialization(); // 构造Serialization失败
p = new Point(4,5); // 构造子类对象时，调用父类构造器执行也会失
```
父类构造函数中，要求具有属性是stringify的序列化函数，如果没有则抛出异常。

以下是完整继承的代码
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
#### 高阶对象实现
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