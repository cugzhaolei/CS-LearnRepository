# 装饰器

参考链接
[1.都2020年了，你还不会JavaScript 装饰器？](https://juejin.im/post/5e7822c3e51d4526f23a45ae)

## 1.前言

装饰器是最新的 ECMA 中的一个提案，是一种与类（class）相关的语法，用来注释或修改类和类方法。装饰器在 Python 和 Java 等语言中也被大量使用。装饰器是实现 AOP（面向切面）编程的一种重要方式。

``` js
class animal{
    @readonly name = 0;
}
```

readonly设置为只读，提高了代码的简洁性和可读性

## 2.装饰器模式

装饰器模式是一种结构型设计模式，它允许向一个现有的对象添加新的功能，同时又不改变其结构，是作为对现有类的一个包装

decorator是ES7中一个提案，装饰器模式是一种结构型设计模式，它允许向一个现有的对象添加新的功能，同时又不改变其结构，是作为对现有类的一个包装

### 2.1python装饰器

``` py
def auth(func):
    def inner(request,*args,**kwargs):
        v = request.COOKIES.get('user')
        if not v:
            return redirect('/login')
        return func(request, *args,**kwargs)
    return inner

@auth
def index(request):
    v = request.COOKIES.get("user")
    return render(request,"index.html",{"current_user":v})
```

这个 auth 装饰器是通过检查 cookie 来判断用户是否登录的。auth 函数是一个高阶函数，它接收了一个 func 函数作为参数，返回了一个新的 inner 函数。
在 inner 函数中进行 cookie 的检查，由此来判断是跳回登录页面还是继续执行 func 函数。
在所有需要权限验证的函数上，都可以使用这个 auth 装饰器，很简洁明了且无侵入。

### 2.2 JavaScript装饰器

实现上面使用`object.defineProperty`

### 2.3 类装饰器

装饰类的时候，装饰器方法一般会接收一个目标类作为参数

``` js
const decoratorClass = (targetClass)=>{
    targetClass.test = '123'
}

@decoratorClass
Class Test {}
Test.test; //123
```

除了可以修改类本身，还可以通过修改原型，给实例增加新属性。下面是给目标类增加 speak 方法的例子

``` js
const withSpeak = (targetClass) => {
    const prototype = targetClass.prototype;
    prototype.speak = function() {
        console.log('I can speak ', this.language);
    }
}
@withSpeak
class Student {
    constructor(language) {
        this.language = language;
    }
}
const student1 = new Student('Chinese');
const student2 = new Student('English');
student1.speak(); // I can speak  Chinese

student2.speak(); // I can speak  Englist

```

利用高阶函数的属性，还可以给装饰器传参，通过参数来判断对类进行什么处理。

``` js
const withLanguage = (language) => (targetClass) => {
    targetClass.prototype.language = language;
}
@withLanguage('Chinese')
class Student {
}
const student = new Student();
student.language; // 'Chinese'

```

## 3. 装饰器的应用

### 3.1 多重继承

在实现 JavaScript 多重继承的时候，可以使用 mixin 的方式，这里结合装饰器甚至还能更进一步简化 mixin 的使用。

``` js
function singleTon(name){
    this.name = name;
    this.instance = null;
}
singleTon.prototype.getName = function(){
    console.log(this.name)
}
singleTon.getInstance = function(name){
    if(!this.instance){
        this.instance = new singleTon(name);
    }
    return this.instance;
}

var a = singleTon.getInstance('name1')
var b = singleTon.getInstance('name2')

```
