# Stack 栈

## 3.1 栈数据结构
栈是一种遵从后进先出（ LIFO）原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

### 3.1.1 创建栈
创建stack类：
``` js
function Stack(){
    //各种属性和方法声明
    //保存元素的数据结构 使用数组
    let items = [];
}
```
声明一些内部方法
 push(element(s))：添加一个（或几个）新元素到栈顶。
 pop()：移除栈顶的元素，同时返回被移除的元素。
 peek()：返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）。
 isEmpty()：如果栈里没有任何元素就返回true，否则返回false。
 clear()：移除栈里的所有元素。
 size()：返回栈里的元素个数。这个方法和数组的length属性很类似。

### 3.1.2 向栈顶添加元素
该方法只添加元素到栈顶，也就是栈的末尾。
``` js
this.push = function(element){
    items.push(element);
};
```

### 3.1.3 从栈移除元素
主要用来移除栈里的元素。栈遵从LIFO原则，因此移出的是最后添加进去的元素.
``` js
this.pop =function(){
    return items.pop();
};
```

### 3.1.4 查看栈顶元素
返回栈顶的元素
``` js
this.peek = function(){
    return items(items.length-1);
};
```
![](/images/frontend-datastructure-JavaScriptDescription-stack-pop.jpg)

### 检查栈是否为空
isEmpty，如果栈为空的话将返回true，否则就返回false
``` js
this.isEmpty = function(){
    return items.length==0;
};
```
### 3.1.6 清空和打印栈元素
clear方法用来移除栈里所有的元素，把栈清空
``` js
this.clear = function(){
    items = [];
};
```
完整的stack
``` js
function Stack(){
    //各种属性和方法声明
    //保存元素的数据结构 使用数组
    let items = [];

    this.push = function(element){
        items.push(element);
    };

    this.pop =function(){
        return items.pop();
    };

    this.peek = function(){
        return items(items.length-1);
    };

    this.isEmpty = function(){
        return items.length==0;
    };

    this.isEmpty = function(){
        return items.length==0;
    };

    this.clear = function(){
        items = [];
    };
}
```
使用Stack类
``` js
//初始化Stack类
let stack = new Stack();
console.log(stack.isEmpty()); //true

stack.push(5);
stack.push(8);

console.log(stack.peek()); //输出8

stack.push(11);
console.log(stack.size()); //输出3
console.log(stack.isEmpty()); //输出false

stack.push(15);
```
![](/images/frontend-datastructure-javascript-stack-example.jpg)

``` js
stack.pop();
stack.pop();
console.log(stack.size()); //输出2
stack.print(); //输出[5, 8]
```
![](/images/frontend-datastructure-javascript-stack-example-1.jpg)

## ECMAScript 6 和 Stack 类

``` js
class Stack(){
    constructor(){
        this.items = []; //{1}
    }
    push(element){
        this.items.push(element);
    }

}
```
只能在类的构造函数constructor里声明（行{1}），在类的其他函数里用this.nameofVariable就可以引用这个变量。

尽管代码看起来更简洁、更漂亮，变量items却是公共的。 ES6的类是基于原型的。虽然基于原型的类比基于函数的类更节省内存，也更适合创建多个实例，却不能够声明私有属性（变量）或方法。
1. 用ES6的限定作用域Symbol实现类
ES6新增了一种叫作Symbol的基本类型，它是不可变的，可以用作对象的属性
``` js
let _items = Symbol(); //{1}
class Stack{
    constructor(){
        this[_items] = [];//{2}
    }
    //其他方法
}
```
声明了Symbol类型的变量_items（行{1}），在类的constructor函数中初始化它的值（行{2}）。要访问_items，只需把所有的this.items都换成this[_items]。

ES6新增的Object.getOwnPropertySymbols方法能够取到类里面声明的所有Symbols属性。破坏stack类的例子
``` js
let stack = new Stack();
stack.push(5);
stack.push(8);
let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log(objectSymbols.length); // 1
console.log(objectSymbols); // [Symbol()]
console.log(objectSymbols[0]); // Symbol()
stack[objectSymbols[0]].push(1);
stack.print(); //输出 5, 8, 1
```
访问stack[objectSymbols[0]]是可以得到_items的。并且，_items属性是一个数组，可以进行任意的数组操作，比如从中间删除或添加元素。我们操作的是栈，不应该出现这种行为。

2. 用ES6的WeakMap实现类
WeakMap可以存储键值对，其中键是对象，值可以是任意数据类型
``` js
const items = new WeakMap();//{1}
class Stack(){
    constructor(){
        items.set(this,[]); //{2}
    }
    push(element){
        let s = items.get(this); //{3}
        s.push(element);
    }
    pop(){
        let s = items.get(this);
        let r = s.pop();
        return r;
    }
    //其他方法
}
```
 行{1}，声明一个WeakMap类型的变量items。
 行{2}，在constructor中，以this（ Stack类自己的引用）为键，把代表栈的数组存入items。
 行{3}，从WeakMap中取出值，即以this为键（行{2}设置的）从items中取值。
items在Stack类里是真正的私有属性了，但还有一件事要做。 items现在仍然是在Stack类以外声明的，因此谁都可以改动它。我们要用一个闭包（外层函数）把Stack类包起来，这样就只能在这个函数里访问WeakMap：
``` js
let Stack = (function(){
    const remStack = new WeakMap();
    class Stack{
        constructor(){
            items.set(this,[]);
        }
    }
    return Stack;//{5}
})
```
当Stack函数里的构造函数被调用时，会返回Stack类的一个实例（行{5}）。

## 3.3 用栈解决问题
栈的实际应用非常广泛。在回溯问题中，它可以存储访问过的任务或路径、撤销的操作

1. 从十进制到二进制
现实生活中，我们主要使用十进制。但在计算科学中，二进制非常重要，因为计算机里的所有内容都是用二进制数字表示的（ 0和1）。要把十进制转化成二进制，我们可以将该十进制数字和2整除（二进制是满二进一），直到结果是0为止。
![](/images/frontend-datastructure-javascript-stack-10tohextring.jpg)
``` js
function divideBy2(decNumber){
    var remStack = new  Stack(),
    rem,
    binaryString = '';
    while(decNumber>0){//{1}
        rem = Math.floor(decNumber%2);//{2}
        remStack.push(rem);//{3}
        decNumber = Math.floor(decNumber/2); //{4}
    }

    while(!remStack.isEmpty()){//{5}
        binaryString +=remStack.pop().toString();
    }
    return binaryString;
}
console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));
```
当结果满足和2做整除的条件时（行{1}），我们会获得当前结果和2的余数，放到栈里（行{2}、 {3}）。然后让结果和2做整除（行{4}）。另外请注意： JavaScript有数字类型，但是它不会区分究竟是整数还是浮点数。因此，要使用Math.floor函数让除法的操作仅返回整数部分。最后，用pop方法把栈中的元素都移除，把出栈的元素变成连接成字符串（行{5}）。
``` js
function baseConverter(decNumber,base){
    var remStack = new Stack(),
    rem,
    baseString = '',
    digits = '0123456789ABCDEF'; //{6}
    while(decNumber>0){
        rem = Math.floor(decNumber%base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber/base);
    }

    while(!remStack.isEmpty()){
        baseString +=digits[remStack.pop()]; //{7}
    }
    return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
```
将十进制转成二进制时，余数是0或1；在将十进制转成八进制时，余数是0到7之间的数；但是将十进制转成16进制时，余数是0到9之间的数字加上A、 B、 C、D、 E和F（对应10、 11、 12、 13、 14和15）。因此，我们需要对栈中的数字做个转化才可以（行{6}和行{7}）。

## 3.4小结

用代码自己实现了栈，还讲解了如何用push和pop往栈里添加和移除元素

比较了创建Stack类的不同方法，并分别列举了优点和缺点
