# JavaScript相关书籍

# JavaScript高级程序设计(第三版)

## 3 基本概念
* 语法
* 数据类型
* 流控制语句
* 函数
任何语言的核心都必然会描述这门语言最基本的工作原理。而描述的内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。

### 3.1 语法

#### 3.1.1 区分大小写
ECMAScript 中的一切（变量、函数名和操作符）都区分大小写

#### 3.1.2 标识符
所谓标识符，就是指变量、函数、属性的名字，或者函数的参数。
* 第一个字符必须是一个字母、下划线（ _）或一个美元符号（ $）；
* 其他字符可以是字母、下划线、美元符号或数字。
标识符中的字母也可以包含扩展的 ASCII 或 Unicode 字母字符，按照惯例， ECMAScript 标识符采用驼峰大小写格式，也就是第一个字母小写，剩下的每个单词的首字母大写

::: tip
不能把关键字、保留字、 true、 false 和 null 用作标识符
:::

#### 3.1.3 注释
ECMAScript 使用 C 风格的注释，包括单行注释和块级注释。单行注释以两个斜杠开头，如下所示：
``` js
// 单行注释
//块级注释以一个斜杠和一个星号（ /*）开头，以一个星号和一个斜杠（ */）结尾，如下所示：
/*
* 这是一个多行
* （块级）注释
*/
```
#### 3.1.4 严格模式
ECMAScript 5 引入了严格模式（ strict mode）的概念。严格模式是为 JavaScript 定义了一种不同的解析与执行模型。
``` js
"use strict";
//指定函数在严格模式下执行：
function doSomething(){
    "use strict";
    //函数体
}
```
#### 3.1.5 语句
ECMAScript 中的语句以一个分号结尾；如果省略分号，则由解析器确定语句的结尾
``` js
var sum = a + b // 即使没有分号也是有效的语句——不推荐
var diff = a - b; // 有效的语句——推荐
```
可以使用 C 风格的语法把多条语句组合到一个代码块中，即代码块以左花括号（ {）开头，以右花括号（ }）结尾：
``` js
if (test){
    test = false;
    alert(test);
}
```
### 3.2 关键字和保留字
ECMA-262 描述了一组具有特定用途的关键字，这些关键字可用于表示控制语句的开始或结束，或者用于执行特定操作等。按照规则，关键字也是语言保留的，不能用作标识符
``` js
break do instanceof typeof
case else new var
catch finally return void
continue for switch while
debugger* function this with
default if throw
delete in try
```
ECMA-262 还描述了另外一组不能用作标识符的保留字。尽管保留字在这门语言中还没有任何特定的用途，但它们有可能在将来被用作关键字。
``` js
//ES3
abstract enum int short
boolean export interface static
byte extends long super
char final native synchronized
class float package throws
const goto private transient
debugger implements protected volatile
double import public
//ES5
class enum extends super
const export import
//在严格模式下，第 5 版还对以下保留字施加了限制：
implements package public
interface private static
let(es6 中被使用) protected yield(es6)
```

### 3.3 变量
ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。每个变量仅仅是一个用于保存值的占位符而已。定义变量时要使用 var 操作符，ES6 中 let、const
``` js
var variable = 1;
let variable = 1;
const variable = 1;

var message = "hi";
message = 100; // 有效，但不推荐
```
var 操作符定义的变量将成为定义该变量的作用域中的局部变量,如果在函数中使用 var 定义一个变量，那么这个变量在函数退出后就会被销毁
``` js
function test(){
    var message = "hi";
}
test();
alert(message) // Uncaught ReferenceError: message is not defined

//将message修改为全局变量
function test(){
    message = "hi"
}
test()
alert(message) // hi
```

### 3.4 数据类型
ECMAScript 5 中有 5 种简单数据类型（也称为基本数据类型）： Undefined、 Null、 Boolean、 Number 和 String。 ES6中新增 symbol和bigint 还有 1 种复杂数据类型——Object， Object 本质上是由一组无序的名值对组成的。 

#### 3.4.1 typeof操作符
对一个值使用 typeof 操作符可能返回下列某个字符串：
* "undefined"——如果这个值未定义；
* "boolean"——如果这个值是布尔值；
* "string"——如果这个值是字符串；
* "number"——如果这个值是数值；
* "object"——如果这个值是对象或 null；
* "function"——如果这个值是函数；

``` js
typeof Symbol //"function"
```
调用 typeof null
会返回"object"，因为特殊值 null 被认为是一个空的对象引用。

#### 3.4.2 undefined类型
Undefined 类型只有一个值，即特殊的 undefined
``` js
var message; //声明未赋值
alert(message == undefined); //true
```
对未初始化的变量执行 typeof 操作符会返回 undefined 值，而对未声明的变量执行 typeof 操作符同样也会返回 undefined 值

``` js
var message; // 这个变量声明之后默认取得了 undefined 值
// 下面这个变量并没有声明
// var age
alert(typeof message); // "undefined"
alert(typeof age); // "undefined"
```

#### 3.4.3 Null类型
Null 类型是第二个只有一个值的数据类型，这个特殊的值是 null。
``` js
var car = null;
alert(typeof car); // "object"
```
如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为 null 而不是其他值
``` js
if( car!=null){
    //something to do
}
```
undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true：
``` js
console.log(null==undefined) //true
```

#### 3.4.4 Boolean 类型
Boolean 类型是 ECMAScript 中使用得最多的一种类型，该类型只有两个字面值： true 和 false。这两个值与数字值不是一回事，因此 true 不一定等于 1，而 false 也不一定等于 0。
``` js
var found = true;
var lost = false;
```
虽然 Boolean 类型的字面值只有两个，但 ECMAScript 中所有类型的值都有与这两个 Boolean 值等价的值。要将一个值转换为其对应的 Boolean 值，可以调用转型函数 Boolean()
``` js
var message = "Hello world!";
var messageAsBoolean = Boolean(message);
```
数据类型 |转换为true的值 |转换为false的值
--:|:--:|:--
Boolean |true |false
String |任何非空字符串 |""（空字符串）
Number |任何非零数字值（包括无穷大） |0和NaN（参见本章后面有关NaN的内容）
Object |任何对象null
Undefined |n/a| undefined

#### 3.4.5 Number类型
使用 IEEE754 格式来表示整数和浮点数值（浮点数值在某些语言中也被称为双精度数值）
``` js
var intNum = 55; // 整数
```
整数还可以通过八进制（以 8 为基数）或十六进制（以 16 为基数）的字面值来表示。其中，八进制字面值的第一位必须是零（ 0），然后是八进制数字序列（ 0～ 7）。如果字面值中的数值超出了范围，那么前导零将被忽略，后面的数值将被当作十进制数值解析
``` js
var octalNum1 = 070; // 八进制的 56
var octalNum2 = 079; // 无效的八进制数值——解析为 79
var octalNum3 = 08; // 无效的八进制数值——解析为 8
```
十六进制字面值的前两位必须是 0x，后跟任何十六进制数字（ 0～ 9 及 A～ F）。
``` js
var hexNum1 = 0xA;   //十六进制的10
var hexNum2 = 0x1f;  //十六进制的31
```
::: tip
鉴于 JavaScript 中保存数值的方式，可以保存正零（+0）和负零（-0）。正零和负零被认为相等
:::
1. 浮点数值
所谓浮点数值，就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字
``` js
var floatNum1 = 1.1;
var floatNum2 = 0.1;
var floatNum3 = .1; // 有效，但不推荐

var floatNum1 = 1.; // 小数点后面没有数字——解析为 1
var floatNum2 = 10.0; // 整数——解析为 10
```
浮点数值需要的内存空间是保存整数值的两倍,用 e 表示法（即科学计数法）表示的浮点数值表示
``` js
var floatNum = 3.125e7; // 等于 31250000
// 0.0000003 会被转换成 3e7
if (a + b == 0.3){ // 不要做这样的测试！
    alert("You got 0.3.");
}
```
2. 数值范围
ECMAScript 能够表示的最小数值保
存在 Number.MIN_VALUE 中——在大多数浏览器中，这个值是 5e-324；能够表示的最大数值保存在Number.MAX_VALUE 中——在大多数浏览器中，这个值是 1.7976931348623157e+308。如果某次计算的结果得到了一个超出 JavaScript 数值范围的值，那么这个数值将被自动转换成特殊的 Infinity 值。如果这个数值是负数，则会被转换成-Infinity（负无穷），如果这个数值是正数，则会被转换成 Infinity（正无穷）。
``` js
var result = Number.MAX_VALUE + Number.MAX_VALUE;
alert(isFinite(result)); //false
```
3. NaN
NaN，即非数值（ Not a Number）是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况（这样就不会抛出错误了）。在 ECMAScript 中，任何数值除以 0 会返回 NaN，因此不会影响其他代码的执行
``` js
alert(isNaN(NaN)); //true
alert(isNaN(10)); //false（ 10 是一个数值）
alert(isNaN("10")); //false（可以被转换成数值 10）
alert(isNaN("blue")); //true（不能转换成数值）
alert(isNaN(true)); //false（可以被转换成数值 1）
```
isNaN()确实也适用于对象。在基于对象调用 isNaN()函数时，会首先调用对象的 valueOf()方法，然后确定该方法返回的值是否可以转换为数值。如果不能，则基于这个返回值再调用 toString()方法，再测试返回值。而这个过程也是 ECMAScript 中内置函数和操作符的一般执行流程，

4. 数值转换
有 3 个函数可以把非数值转换为数值： Number()、 parseInt()和 parseFloat()。第一个函数，即转型函数 Number()可以用于任何数据类型，而另两个函数则专门用于把字符串转换成数值。
Number()函数的转换规则如下。
* 如果是 Boolean 值， true 和 false 将分别被转换为 1 和 0。
* 如果是数字值，只是简单的传入和返回。
* 如果是 null 值，返回 0。
* 如果是 undefined，返回 NaN。
* 如果是字符串，遵循下列规则：
     如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即"1"会变成 1， "123"会变成 123，而"011"会变成 11（注意：前导的零被忽略了）；
     如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽略前导零）；
     如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值；
     如果字符串是空的（不包含任何字符），则将其转换为 0；
     如果字符串中包含除上述格式之外的字符，则将其转换为 NaN。
* 如果是对象，则调用对象的 valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是 NaN，则调用对象的 toString()方法，然后再次依照前面的规则转换返回的字符串值
``` js
var num1 = Number("Hello world!"); //NaN
var num2 = Number(""); //0
var num3 = Number("000011"); //11
var num4 = Number(true); //1
```
parseInt()函数在转换字符串时，更多的是看其是否符合数值模式。它会忽略字符串前面的空格，直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号， parseInt()就会返回 NaN；也就是说，用 parseInt()转换空字符串会返回 NaN（ Number()对空字符返回 0）。如果第一个字符是数字字符， parseInt()会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。例如， "1234blue"会被转换为 1234，因为"blue"会被完全忽略.
``` js
var num1 = parseInt("1234blue"); // 1234
var num2 = parseInt(""); // NaN
var num3 = parseInt("0xA"); // 10（十六进制数）
var num4 = parseInt(22.5); // 22
var num5 = parseInt("070"); // 56（八进制数）
var num6 = parseInt("70"); // 70（十进制数）
var num7 = parseInt("0xf"); // 15（十六进制数）
//ECMAScript 3 认为是 56（八进制）， ECMAScript 5 认为是 70（十进制）
var num = parseInt("070");
```
在 ECMAScript 5 JavaScript 引擎中， parseInt()已经不具有解析八进制值的能力

``` js
var num1 = parseInt("10", 2); //2 （按二进制解析）
var num2 = parseInt("10", 8); //8 （按八进制解析）
var num3 = parseInt("10", 10); //10 （按十进制解析）
var num4 = parseInt("10", 16); //16 （按十六进制解析）
```
* parseFloat()也是从第一个字符（位置 0）开始解析每个字符。而且也是一直解析到字符串末尾，或者解析到遇见一个无效的浮点数字字符为止.
* parseFloat()与 parseInt()的第二个区别在于它始终都会忽略前导的零。 parseFloat()可以识别前面讨论过的所有浮点数值格式，也包括十进制整数格式。但十六进制格式的字符串则始终会被转换成 0, parseFloat()只解析十进制值，因此它没有用第二个参数指定基数
``` js
var num1 = parseFloat("1234blue"); //1234 （整数）
var num2 = parseFloat("0xA"); //0
var num3 = parseFloat("22.5"); //22.5
var num4 = parseFloat("22.34.5"); //22.34
var num5 = parseFloat("0908.5"); //908.5
var num6 = parseFloat("3.125e7"); //31250000
```

#### 3.4.6 String类型

String 类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列，即字符串。字符串可以由双引号（ "）或单引号（ '）表示
1. 字符字面量
String 数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符。

字 面 量 |含 义
--:|:--
\n| 换行
\t |制表
\b |空格
\r |回车
\f |进纸
\\ |斜杠
\' |单引号（ '），在用单引号表示的字符串中使用。例如： 'He said, \'hey.\''
\" |双引号（ "），在用双引号表示的字符串中使用。例如： "He said, \"hey.\""
\xnn| 以十六进制代码nn表示的一个字符（其中n为0～ F）。例如， \x41表示"A"
\unnnn| 以十六进制代码nnnn表示的一个Unicode字符（其中n为0～ F）。例如， \u03a3表示希腊字符Σ

2. 字符串的特点
ECMAScript 中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量
``` js
var lang = "Java";
lang = lang + "Script";
```

3. 转换为字符串
要把一个值转换为一个字符串有两种方式。第一种是使用几乎每个值都有的 toString()方法
``` js
var age = 11;
var ageAsString = age.toString(); // 字符串"11"
var found = true;
var foundAsString = found.toString(); // 字符串"true"
```
 toString()可以输出以二进制、八进制、十六进制，乃至其他任意有效进制格式表示的字符串值。
```  js
var num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```
String()函数遵循下列转换规则：
* 如果值有 toString()方法，则调用该方法（没有参数）并返回相应的结果；
* 如果值是 null，则返回"null"；
* 如果值是 undefined，则返回"undefined"。
``` js
var value1 = 10;
var value2 = true;
var value3 = null;
var value4;
alert(String(value1)); // "10"
alert(String(value2)); // "true"
alert(String(value3)); // "null"
alert(String(value4)); // "undefined"
```
#### 3.4.7 Object类型
ECMAScript 中的对象其实就是一组数据和功能的集合。对象可以通过执行 new 操作符后跟要创建的对象类型的名称来创建。而创建 Object 类型的实例并为其添加属性和（或）方法，就可以创建自定义对象
``` js
var o = new Object();
```
在 ECMAScript 中，
（就像 Java 中的 java.lang.Object 对象一样） Object 类型是所有它的实例的基础。换句话说，Object 类型所具有的任何属性和方法也同样存在于更具体的对象中。

Object 的每个实例都具有下列属性和方法。
* constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（ constructor）就是 Object()。
* hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例
的原型中）是否存在。其中，作为参数的属性名（ propertyName）必须以字符串形式指定（例如： o.hasOwnProperty("name")）。
* isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型
* propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用 for-in 语句（本章后面将会讨论）来枚举。与 hasOwnProperty()方法一样，作为参数的属性名必须字符串形式指定。
* toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应。
* toString()：返回对象的字符串表示。
* valueOf()：返回对象的字符串、数值或布尔值表示。通常与 toString()方法的返回值相同。

### 3.5 操作符
ECMA-262 描述了一组用于操作数据值的操作符，包括算术操作符（如加号和减号）、位操作符、关系操作符和相等操作符。

#### 3.5.1 一元操作符
只能操作一个值的操作符叫做一元操作符。
1. 递增和递减操作符
递增和递减操作符直接借鉴自 C，而且各有两个版本：前置型和后置型。
``` js
var age = 29;
++age;

var age = 29;
age = age + 1;
```
执行前置递增和递减操作时，变量的值都是在语句被求值以前改变的。（在计算机科学领域，这种情况通常被称作副效应。）
``` js
var age = 29;
var anotherAge = --age + 2;
alert(age); // 输出 28
alert(anotherAge); // 输出 30
```
由于前置递增和递减操作与执行语句的优先级相等，因此整个语句会从左至右被求值
``` js
var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2; // 等于 21
var num4 = num1 + num2; // 等于 21
```
递增和递减操作符遵循下列规则。
* 在应用于一个包含有效数字字符的字符串时，先将其转换为数字值，再执行加减 1 的操作。字符串变量变成数值变量。
* 在应用于一个不包含有效数字字符的字符串时，将变量的值设置为 NaN,字符串变量变成数值变量。
* 在应用于布尔值 false 时，先将其转换为 0 再执行加减 1 的操作。布尔值变量变成数值变量。
* 在应用于布尔值 true 时，先将其转换为 1 再执行加减 1 的操作。布尔值变量变成数值变量。
* 在应用于浮点数值时，执行加减 1 的操作。
* 在应用于对象时，先调用对象的 valueOf()方法（第 5 章将详细讨论）以取得一个可供操作的值。然后对该值应用前述规则。如果结果是 NaN，则在调用 toString()方法后再应用前述规则。对象变量变成数值变量。
``` js
var a1 = "2"
var a2 = "z"
var b = false
var f = 1.1
var o = {
    valueOf:function(){
        return -1
    }
};

s1++; // 值变成数值 3
s2++; // 值变成 NaN
b++;  // 值变成数值 1
f--;  // 值变成 0.10000000000000009（由于浮点舍入错误所致）
o--;  // 值变成数值-2
```
2. 一元加和减操作符
一元加操作符以一个加号（ +）表示
``` js
var num = 25;
num = +num; // 仍然是 25
```
对非数值应用一元加操作符时，该操作符会像 Number()转型函数一样对这个值执行转换。布尔值 false 和 true 将被转换为 0 和 1，字符串值会被按照一组特殊的规则进行解析，而对象是先调用它们的 valueOf()和（或） toString()方法，再转换得到的值
``` js
var s1 = "01";
var s2 = "1.1";
var s3 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};

s1 = +s1; // 值变成数值 1
s2 = +s2; // 值变成数值 1.1
s3 = +s3; // 值变成 NaN
b = +b; // 值变成数值 0
f = +f; // 值未变，仍然是 1.1
o = +o; // 值变成数值-1
```
一元减操作符主要用于表示负数,应用于非数值时，一元减操作符遵循与一元加操作符相同的规则，最后再将得到的数值转换为负数
``` js
var s1 = "01";
var s2 = "1.1";
var s3 = "z";
var b = false;
var f = 1.1;
var o = {
    valueOf: function() {
        return -1;
    }
};

s1 = -s1; // 值变成了数值-1
s2 = -s2; // 值变成了数值-1.1
s3 = -s3; // 值变成了 NaN
b = -b; // 值变成了数值 0
f = -f; // 变成了-1.1
o = -o; // 值变成了数值 1
```

#### 3.5.2 位操作符
位操作符用于在最基本的层次上，即按内存中表示数值的位来操作数值。 ECMAScript 中的所有数值都以 IEEE-754 64 位格式存储，但位操作符并不直接操作 64 位的值。而是先将 64 位的值转换成 32 位的整数，然后执行操作，最后再将结果转换回 64 位。

对于有符号的整数，32 位中的前31 位用于表示整数的值。第 32 位用于表示数值的符号：0 表示正数，1 表示负数。这个表示符号的位叫做符号位，符号位的值决定了其他位数值的格式。其中，正数以纯二进制格式存储，31 位中的每一位都表示 2 的幂。

负数同样以二进制码存储，但使用的格式是二进制补码，步骤如下：
(1) 求这个数值绝对值的二进制码（例如，要求-18 的二进制补码，先求 18 的二进制码）；
(2) 求二进制反码，即将 0 替换为 1，将 1 替换为 0；
(3) 得到的二进制反码加 1。
``` js
//1. -18的二进制码18
0000 0000 0000 0000 0000 0000 0001 0010
//取反 0和1互换
1111 1111 1111 1111 1111 1111 1110 1101
//反码加1
                                      1
---------------------------------------
1111 1111 1111 1111 1111 1111 1110 1110
```

::: tip
默认情况下，ECMAScript 中的所有整数都是有符号整数。不过，当然也存在无符号整数。对于无符号整数来说，第32位不再表示符号，因为无符号整数只能是正数。而且，无符号整数的值可以更大，因为多出的一位不再表示符号，可以用来表示数值。
:::

在 ECMAScript 中：64 位的数值被转换成32位数值，然后执行位操作，最后再将32 位的结果转换回 64 位数值。这样，表面上看起来就好像是在操作32位数值，就跟在其他语言中以类似方式执行二进制操作一样。在对特殊的 NaN 和 Infinity 值应用位操作时，这两个值都会被当成 0 来处理,对非数值应用位操作符，会先使用Number()函数将该值转换为一个数值

1. 按位非（NOT）
按位非操作符由一个波浪线（ ~）表示，执行按位非的结果就是返回数值的反码
``` js
var num1 = 25; // 二进制 00000000000000000000000000011001
var num2 = ~num1; // 二进制 11111111111111111111111111100110
alert(num2); // -26
```
按位非操作的本质：操作数的负值减 1
``` js
var num1 = 25;
var num2 = -num1 - 1;
alert(num2); // "-26"
```

2. 按位与（ AND）
按位与操作符由一个和号字符（ &）表示，它有两个操作符数

第一个数值的位 |第二个数值的位 |结 果

--:|:--:|:--
1 |1| 1
1 |0| 0
0 |1| 0
0 |0| 0

``` js
var result = 25 & 3;
alert(result); //1

 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
AND = 0000 0000 0000 0000 0000 0000 0000 0001
```
3. 按位或（OR）
按位或操作符由一个竖线符号（|）表示

第一个数值的位 |第二个数值的位 |结 果
--:|:--:|:--
1 |1| 1
1 |0| 1
0 |1| 1
0 |0| 0
``` js
var result = 25 | 3;
alert(result); //27

25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
--------------------------------------------
OR = 0000 0000 0000 0000 0000 0000 0001 1011
```
4. 按位异或（XOR）
按位异或操作符由一个插入符号（^）表示

第一个数值的位 |第二个数值的位 |结 果
--:|:--:|:--
1 |1| 0
1 |0| 1
0 |1| 1
0 |0| 1

``` js
var result = 25 ^ 3;
alert(result); //26

 25 = 0000 0000 0000 0000 0000 0000 0001 1001
  3 = 0000 0000 0000 0000 0000 0000 0000 0011
---------------------------------------------
XOR = 0000 0000 0000 0000 0000 0000 0001 1010
```

5. 左移
左移操作符由两个小于号（ <<）表示，这个操作符会将数值的所有位向左移动指定的位数
``` js
var oldValue = 2; // 等于二进制的 10
var newValue = oldValue << 5; // 等于二进制的 1000000，十进制的 64

0000 0000 0000 0000 0000 0000 0000 0010
0000 0000 0000 0000 0000 0000 0100 0000
```

6. 有符号的右移
有符号的右移操作符由两个大于号（>>）表示，这个操作符会将数值向右移动，但保留符号位
``` js
var oldValue = 64; // 等于二进制的 1000000
var newValue = oldValue >> 5; // 等于二进制的 10 ，即十进制的 2

0000 0000 0000 0000 0000 0000 0100 0000
0000 0000 0000 0000 0000 0000 0000 0010
```
7. 无符号右移
无符号右移操作符由 3 个大于号（ >>>）表示，这个操作符会将数值的所有 32 位都向右移动。对正数来说，无符号右移的结果与有符号右移相同
``` js
var oldValue = 64; // 等于二进制的 1000000
var newValue = oldValue >>> 5; // 等于二进制的 10 ，即十进制的 2
```
无符号右移操作符会把负数的二进制码当成正数的二进制码。而且，由于负数以其绝对值的二进制补码形式表示，因此就会导致无符号右移后的结果非常之大.
``` js
var oldValue = -64; // 等于二进制的 11111111111111111111111111000000
var newValue = oldValue >>> 5; // 等于十进制的 134217726
```

#### 3.5.3 布尔操作符
布尔操作符一共有 3 个：非（NOT）、与（AND）和或（OR）

* 如果操作数是一个对象，返回 false；
* 如果操作数是一个空字符串，返回 true；
* 如果操作数是一个非空字符串，返回 false；
* 如果操作数是数值 0，返回 true；
* 如果操作数是任意非 0 数值（包括 Infinity），返回 false；
* 如果操作数是 null，返回 true；
* 如果操作数是 NaN，返回 true；
* 如果操作数是 undefined，返回 true。
``` js
alert(!false); // true
alert(!"blue"); // false
alert(!0); // true
alert(!NaN); // true
alert(!""); // true
alert(!12345); // false

alert(!!"blue"); //true
alert(!!0); //false
alert(!!NaN); //false
alert(!!""); //false
alert(!!12345); //true
```

2. 逻辑与
逻辑与操作符由两个和号（ &&）表示
``` js
var result = true && false;
```
第一个操作数 |第二个操作数 |结 果
--:|:--:|:--
true |true |true
true |false |false
false |true |false
false |false |false

在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值；
* 如果第一个操作数是对象，则返回第二个操作数；
* 如果第二个操作数是对象，则只有在第一个操作数的求值结果为 true 的情况下才会返回该对象；
* 如果两个操作数都是对象，则返回第二个操作数；
* 如果有一个操作数是 null，则返回 null；
* 如果有一个操作数是 NaN，则返回 NaN；
* 如果有一个操作数是 undefined，则返回 undefined。

逻辑与操作属于短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值。
``` js
var found = true;
var result = (found && someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行

//将 found 的值设置为 false
var found = false;
var result = (found && someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（ "false"）
```
3. 逻辑或
逻辑或操作符由两个竖线符号（ ||）表示，有两个操作数
``` js
var result = true || false;
```
第一个操作数 |第二个操作数 |结 果
--:|:--:|:--
True |true| true
True |false| true
false |true |true
false |false| false

与逻辑与操作相似，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值；
* 如果第一个操作数是对象，则返回第一个操作数；
* 如果第一个操作数的求值结果为 false，则返回第二个操作数；
* 如果两个操作数都是对象，则返回第一个操作数；
* 如果两个操作数都是 null，则返回 null；
* 如果两个操作数都是 NaN，则返回 NaN；
* 如果两个操作数都是 undefined，则返回 undefined。
与逻辑与操作符相似，逻辑或操作符也是短路操作符。如果第一个操作数的求值结果为true，就不会对第二个操作数求值
``` js
var found = true;
var result = (found || someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（ "true"）

var found = false;
var result = (found || someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行
```
利用逻辑或的这一行为来避免为变量赋 null 或 undefined 值
``` js
var myObject = preferredObject || backupObject;
```
3.5.4 乘性操作符
ECMAScript 定义了 3 个乘性操作符：乘法、除法和求模,在操作数为非数值的情况下会执行自动的类型转换。参与乘性计算的某个操作数不是数值，后台会先使用 Number()转型函数将其转换为数值。也就是说，空字符串将被当作0，布尔值 true 将被当作 1。

1. 乘法
乘法操作符由一个星号（ *）表示，用于计算两个数值的乘积。
``` js
var result = 34 * 56;
```
在处理特殊值的情况下，乘法操作符遵循下列特殊的规则：
* 如果操作数都是数值，执行常规的乘法计算，即两个正数或两个负数相乘的结果还是正数，而如果只有一个操作数有符号，那么结果就是负数。如果乘积超过了 ECMAScript 数值的表示范围，则返回 Infinity 或-Infinity；
* 如果有一个操作数是 NaN，则结果是 NaN；
* 如果是 Infinity 与 0 相乘，则结果是 NaN；
* 如果是 Infinity 与非 0 数值相乘，则结果是 Infinity 或-Infinity，取决于有符号操作数的符号；
* 如果是 Infinity 与 Infinity 相乘，则结果是 Infinity；
* 如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值，然后再应用上面的
规则。

2. 除法
除法操作符由一个斜线符号（ /）表示，执行第二个操作数除第一个操作数的计算
与乘法操作符类似，除法操作符对特殊的值也有特殊的处理规则。这些规则如下：
* 如果操作数都是数值，执行常规的除法计算，即两个正数或两个负数相除的结果还是正数，而如果只有一个操作数有符号，那么结果就是负数。如果商超过了 ECMAScript 数值的表示范围，则返回 Infinity 或-Infinity；
* 如果有一个操作数是 NaN，则结果是 NaN；
* 如果是 Infinity 被 Infinity 除，则结果是 NaN；
* 如果是零被零除，则结果是 NaN；
* 如果是非零的有限数被零除，则结果是 Infinity 或-Infinity，取决于有符号操作数的符号；
* 如果是 Infinity 被任何非零数值除，则结果是 Infinity 或-Infinity，取决于有符号操作数的符号；
* 如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值，然后再应用上面的规则。

3. 求模
求模（余数）操作符由一个百分号（ %）表示：
``` js
var result = 26 % 5; // 等于 1
```

#### 3.5.5 加性操作符

* 如果有一个操作数是 NaN，则结果是 NaN；
* 如果是 Infinity 加 Infinity，则结果是 Infinity；
* 如果是-Infinity 加-Infinity，则结果是-Infinity；
* 如果是 Infinity 加-Infinity，则结果是 NaN；
* 如果是+0 加+0，则结果是+0；
* 如果是0 加0，则结果是0；
* 如果是+0 加0，则结果是+0。
不过，如果有一个操作数是字符串，那么就要应用如下规则：
* 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来；
* 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来。
如果有一个操作数是对象、数值或布尔值，则调用它们的 toString()方法取得相应的字符串值，然后再应用前面关于字符串的规则。对于 undefined 和 null，则分别调用 String()函数并取得字符串"undefined"和"null"。
``` js
var result1 = 5 + 5; // 两个数值相加
alert(result1); // 10
var result2 = 5 + "5"; // 一个数值和一个字符串相加
alert(result2); // "55"

var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is " + num1 + num2;
alert(message); // "The sum of 5 and 10 is 510"

var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is " + (num1 + num2);
alert(message); //"The sum of 5 and 10 is 15"
```
2. 减法
* 如果两个操作符都是数值，则执行常规的算术减法操作并返回结果；
* 如果有一个操作数是 NaN，则结果是 NaN；
* 如果是 Infinity 减 Infinity，则结果是 NaN；
* 如果是-Infinity 减-Infinity，则结果是 NaN；
* 如果是 Infinity 减-Infinity，则结果是 Infinity；
* 如果是-Infinity 减 Infinity，则结果是-Infinity；
* 如果是+0 减+0，则结果是+0；
* 如果是+0 减0，则结果是0；
* 如果是0 减0，则结果是+0；
* 如果有一个操作数是字符串、布尔值、 null 或 undefined，则先在后台调用 Number()函数将其转换为数值，然后再根据前面的规则执行减法计算。如果转换的结果是 NaN，则减法的结果就是 NaN；
* 如果有一个操作数是对象，则调用对象的 valueOf()方法以取得表示该对象的数值。如果得到的值是 NaN，则减法的结果就是 NaN。如果对象没有 valueOf()方法，则调用其 toString()方法并将得到的字符串转换为数值。
``` js
var result1 = 5 - true; // 4，因为 true 被转换成了 1
var result2 = NaN - 1; // NaN
var result3 = 5 - 3; // 2
var result4 = 5 - ""; // 5，因为"" 被转换成了 0
var result5 = 5 - "2"; // 3，因为"2"被转换成了 2
var result6 = 5 - null; // 5，因为 null 被转换成了 0

```
#### 3.5.6 关系操作符

小于（ <）、大于（ >）、小于等于（ <=）和大于等于（ >=）这几个关系操作符用于对两个值进行比较，比较的规则与我们在数学课上所学的一样。这几个操作符都返回一个布尔值
``` js
var result1 = 5 > 3; //true
var result2 = 5 < 3; //false
```
* 如果两个操作数都是数值，则执行数值比较。
* 如果两个操作数都是字符串，则比较两个字符串对应的字符编码值。
* 如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较。
* 如果一个操作数是对象，则调用这个对象的 valueOf()方法，用得到的结果按照前面的规则执行比较。如果对象没有 valueOf()方法，则调用 toString()方法，并用得到的结果根据前面的规则执行比较。
* 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。

比较字符串时，实际比较的是两个字符串中对应位置的每个字符的字符编码值.由于大写字母的字符编码全部小于小写字母的字符编码
``` js
var result = "Brick" < "alphabet"; //true

var result = "Brick".toLowerCase() < "alphabet".toLowerCase(); //false

var result = "23" < "3"; //true
var result = "23" < 3; //false
var result = "a" < 3; // false，因为"a"被转换成了 NaN
var result1 = NaN < 3; //false
var result2 = NaN >= 3; //false
```
字母 B 的字符编码为 66，字母 a 的字符编码是 97

#### 3.5.7 相等操作符

ECMAScript 的解决方案就是提供两组操作符： 相等和不相等——先转换再比较， 全等和不全等——仅比较而不转换。

1. 相等和不相等
ECMAScript 中的相等操作符由两个等于号（ ==）表示，如果两个操作数相等，则返回 true。而不相等操作符由叹号后跟等于号（ !=）表示，如果两个操作数不相等，则返回 true。这两个操作符都会先转换操作数（通常称为强制转型），然后再比较它们的相等性。

* 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为 0，而true 转换为 1；
* 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；
* 如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法，用得到的基本类型值按照前面的规则进行比较；

这两个操作符在进行比较时则要遵循下列规则。
* null 和 undefined 是相等的。
* 要比较相等性之前，不能将 null 和 undefined 转换成其他任何值。
* 如果有一个操作数是 NaN，则相等操作符返回 false，而不相等操作符返回 true。重要提示：即使两个操作数都是 NaN，相等操作符也返回 false；因为按照规则， NaN 不等于 NaN。
* 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true；否则，返回 false。

表 达 式 |值 |表 达 式 |值
--:|:--:|:--:|:--
null == undefined |true| true == 1 |true
"NaN" == NaN |false |true == 2 |false
5 == NaN |false |undefined == 0 |false
NaN == NaN |false| null == 0 |false
NaN != NaN |true |"5"==5 |true
false == 0 |true

2. 全等和不全等
全等操作符由 3 个等于号（ ===）表示，它只在两个操作数未经转换就相等的情况下返回 true
``` js
var result1 = ("55" == 55); //true，因为转换后相等
var result2 = ("55" === 55); //false，因为不同的数据类型不相等
```

不全等操作符由一个叹号后跟两个等于号（ !==）表示，它在两个操作数未经转换就不相等的情况下返回 true

``` js
var result1 = ("55" != 55); //false，因为转换后相等
var result2 = ("55" !== 55); //true，因为不同的数据类型不相等
```
null == undefined 会返回 true，因为它们是类似的值；但 null === undefined 会返回 false

#### 3.5.8 条件操作符

``` js
variable = boolean_expression ? true_value : false_value;
```
这行代码的含义就是基于对 boolean_expression 求值的结果，决定给变量 variable赋什么值。如果求值结果为 true，则给变量 variable 赋 true_value 值；如果求值结果为 false，则给变量 variable 赋 false_value 值.
``` js
var max = (num1 > num2) ? num1 : num2;
```

#### 3.5.9 赋值操作符
简单的赋值操作符由等于号（ =）表示，其作用就是把右侧的值赋给左侧的变量
```   js
var num = 10;
num = num + 10;
```

每个主要算术操作符（以及个别的其他操作符）都有对应的复合赋值操作符
* 乘/赋值（ *=）；
* 除/赋值（ /=）；
* 模/赋值（ %=）；
* 加/赋值（ +=）；
* 减/赋值（ =）；
* 左移/赋值（ <<=）；
* 有符号右移/赋值（ >>=）；
* 无符号右移/赋值（ >>>=）

#### 3.5.10 逗号操作符
使用逗号操作符可以在一条语句中执行多个操作
``` js
var num1=1, num2=2, num3=3;
```

### 3.6 语句
ECMA-262 规定了一组语句（也称为流控制语句）

#### 3.6.1 if语句
大多数编程语言中最为常用的一个语句就是 if 语句
``` js
if (condition) statement1 else statement2
```

condition（条件）可以是任意表达式；而且对这个表达式求值的结果不一定是布尔值。ECMAScript 会自动调用 Boolean()转换函数将这个表达式的结果转换为一个布尔值。如果对 condition求值的结果是 true，则执行 statement1（语句 1），如果对 condition 求值的结果是 false，则执行 statement2（语句 2）。

``` js
if (i > 25)
    alert("Greater than 25."); // 单行语句
else {
    alert("Less than or equal to 25."); // 代码块中的语句
}
```

#### 3.6.2 do-while语句
do-while 语句是一种后测试循环语句，即只有在循环体中的代码执行之后，才会测试出口条件
``` js
do {
    statement
} while (expression);
```

#### 3.6.3 while语句
while 语句属于前测试循环语句，在循环体内的代码被执行之前，就会对出口条件求值
``` js
while(expression) statement

var i = 0;
while(i<10){
    i+=2;
}
```
#### 3.6.4 for语句
for 语句也是一种前测试循环语句，但它具有在执行循环之前初始化变量和定义循环后要执行的代码的能力。
``` js
for (initialization; expression; post-loop-expression) statement

var count = 10;
for(var i=10;i<count;i++)
{
    alert(i);
}

for (;;) { // 无限循环
    doSomething();
}
```

#### 3.6.5 for-in语句
for-in 语句是一种精准的迭代语句，可以用来枚举对象的属性
``` js
for (property in expression) statement

for (var propName in window) {
    document.write(propName);
}
```

#### 3.6.6 label语句
使用 label 语句可以在代码中添加标签，以便将来使用
``` js
label: statement

start: for (var i=0; i < count; i++) {
    alert(i);
}
```

#### 3.6.7 break和continue语句

break 和 continue 语句用于在循环中精确地控制代码的执行。其中， break 语句会立即退出循环，强制继续执行循环后面的语句。而 continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。
``` js
var num = 0;
for(var  i=1;i<10;i++){
    if(i%5==0){
        break;
    }
    num++;
}
alert(num);  //4

// continue
var num=0;
for(var i=1;i<10;i++){
    if(i%5==0){
        continue;
    }
    num++;
}
alert(num);  //8
```

#### 3.6.8 with语句
with 语句的作用是将代码的作用域设置到一个特定的对象中
``` js
with (expression) statement;
```
定义 with 语句的目的主要是为了简化多次编写同一个对象的工作
``` js
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;

//使用with
with(location){
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}
```
使用 with 语句关联了 location 对象。这意味着在 with 语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部环境中找不到该变量的定义，就会查询location 对象中是否有同名的属性。如果发现了同名属性， 则以 location 对象属性的值作为变量的值。

严格模式下不允许使用 with 语句，否则将视为语法错误

####  3.6.9 switch语句
switch 语句与 if 语句的关系最为密切，而且也是在其他语言中普遍使用的一种流控制语句
``` js
switch(expression){
    case value:statement
        break;
    case value:statement
        break;
    case value:statement
        break;
    case value:statement
        break;
    defalut:statement
}
```
 break 关键字会导致代码执行流跳出 switch 语句,可以在
switch 语句中使用任何数据类型（在很多其他语言中只能使用数值），字符串，对象,每个 case 的值不一定是常量，可以是变量，甚至是表达式。
``` js
switch("hello world"){
    case "hello world":
        console.log("Greeting was found");
        break;
    case "goodbye":
        console.log("Closing was found");
        break;
    default:
        console.log("Unexpected message was found.")
}
```
使用表达式
``` js
var num = 25;
switch(true){
    case num<0:
        console.log("Less than 0");
        break;
    case num>=0&&<=10:
        console.log("Between 0 and 10");
        break;
    case num>10&&num<=20:
        console.log("Between 10 and 20");
        break;
    default:
        alert("More  than 20")
}
```
这个例子首先在 switch 语句外面声明了变量 num。而之所以给 switch 语句传递表达式 true，是因为每个 case 值都可以返回一个布尔值。这样，每个 case 按照顺序被求值，直到找到匹配的值或者遇到 default 语句为止

### 函数
ECMAScript 中的函数使用 function 关键字来声明，后跟一组参数以及函数体。
``` js
function functionName(arg0,arg1,...,argN){
    statements
}

function sayHi(name,message){
    console.log("Hello"+name+","+message);
}
```
ECMAScript 中的函数在定义时不必指定是否返回值
``` js
function sum(num1, num2) {
    return num1 + num2;
}
```
函数会在执行完 return 语句之后停止并立即退出
``` js
function sum(num1, num2) {
    return num1 + num2;
    alert("Hello world"); // 永远不会执行
}
```
严格模式对函数有一些限制：
* 不能把函数命名为 eval 或 arguments；
* 不能把参数命名为 eval 或 arguments；
* 不能出现两个命名参数同名的情况。

#### 3.7.1 理解参数
ECMAScript 函数的参数与大多数其他语言中函数的参数有所不同。 ECMAScript 函数不介意传递进来多少个参数，也不在乎传进来参数是什么数据类型。

ECMAScript 中的参数在内部是用一个数组来表示的。函数接收到的始终都是这个数组，而不关心数组中包含哪些参数,在函数体内可以通过 arguments 对象来访问这个参数数组，从而获取传递给函数的每一个参数,arguments 对象只是与数组类似（它并不是 Array 的实例）

ECMAScript 函数的一个重要特点：命名的参数只提供便利，但不是必需的,通过访问 arguments 对象的 length 属性可以获知有多少个参数传递给了函数。
``` js
function howManyArgs(){
    console.log(arguments.length);
}

howManyArgs("string", 45); //2
howManyArgs(); //0
howManyArgs(12); //1

function doAdd(){
    if(arguments.length == 1){
        console.log(arguments[0]+10);
    }else if(arguments.length==2){
        console.log(arguments[0]+arguments[1]);
    }
}
doAdd(10); //20
doAdd(30, 20); //50
```
没有传递值的命名参数将自动被赋予 undefined 值。这就跟定义了变量但又没有初始化一样。

#### 3.7.2 没有重载
ECMAScript 函数不能像传统意义上那样实现重载。
``` js
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); //300
```

### 3.8 小结
JavaScript 的核心语言特性在 ECMA-262 中是以名为 ECMAScript 的伪语言的形式来定义的。
ECMAScript 中包含了所有基本的语法、操作符、数据类型以及完成基本的计算任务所必需的对象，但没有对取得输入和产生输出的机制作出规定。理解 ECMAScript 及其纷繁复杂的各种细节，是理解其在Web 浏览器中的实现——JavaScript 的关键。目前大多数实现所遵循的都是 ECMA-262 第 3 版，但很多也已经着手开始实现第 5 版了。以下简要总结了 ECMAScript 中基本的要素。
* ECMAScript 中的基本数据类型包括 Undefined、 Null、 Boolean、 Number 和 String,Symbol、Bigint(ES6)。
* 与其他语言不同， ECMScript 没有为整数和浮点数值分别定义不同的数据类型， Number 类型可用于表示所有数值。
* ECMAScript 中也有一种复杂的数据类型，即 Object 类型，该类型是这门语言中所有对象的基
础类型。
* 严格模式为这门语言中容易出错的地方施加了限制。
* ECMAScript 提供了很多与 C 及其他类 C 语言中相同的基本操作符，包括算术操作符、布尔操作
符、关系操作符、相等操作符及赋值操作符等。
* ECMAScript 从其他语言中借鉴了很多流控制语句，例如 if 语句、for 语句和switch 语句等。
ECMAScript 中的函数与其他语言中的函数有诸多不同之处。
* 无须指定函数的返回值，因为任何 ECMAScript 函数都可以在任何时候返回任何值。
* 实际上，未指定返回值的函数返回的是一个特殊的 undefined 值。
* ECMAScript 中也没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式
传递的。
* 可以向 ECMAScript 函数传递任意数量的参数，并且可以通过 arguments 对象来访问这些参数。
* 由于不存在函数签名的特性， ECMAScript 函数不能重载。




















## 4 变量、作用域和内存问题
* 理解基本类型和引用类型
* 理解执行环境
* 理解垃圾收集

变量的值及其数据类型可以在脚本的生命周期内改变。

### 4.1基本类型和引用类型

基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。
 ES5中 5 种基本数据类型： Undefined、 Null、 Boolean、 Number 和 String。这 5 种基本数据类型是按值访问的，因为可以操作保存在变量中的实际的值。ES6中新增Symbol

引用类型的值是保存在内存中的对象。 JavaScript 不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象，ES6中的Map，set，WeakMap,WeakSet

#### 4.1.1 动态属性

定义基本类型值和引用类型值的方式是类似的：创建一个变量并为该变量赋值
引用类型可以
``` js
var person = new Object();
person.name = "threeSt";
alert(person.name); //"threeSt"
//基本类型不能添加
var name = "three";
name.age = 26;
console.log(name.age) //undefined
```

#### 4.1.2 复制变量
从一个变量向另一个变量复制基本类型值和引用类型值时，也存在不同。如果从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

``` js
var num1 = 5;
var num2 = num1;
```
但 num2中的 5 与 num1 中的 5 是完全独立的，该值只是 num1 中 5 的一个副本。此后，这两个变量可以参与任何操作而不会相互影响。
![](/images/front-javascript-variable-baisctype-copyvalue.jpg)

当从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中,这个值的副本实际上是一个指针，而这个指针指向存储在堆中的一个对象。复制操作结束后，两个变量实际上将引用同一个对象。因此，改变其中一个变量，就会影响另一个变量
``` js
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Nicholas";
alert(obj2.name); //"Nicholas"
```
![](/images/frontend-javascript-variable-referencevalue.jpg)

#### 4.1.3 传递参数

ECMAScript 中所有函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。基本类型值的传递如同基本类型变量的复制一样，而引用类型值的传递，则如同引用类型变量的复制一样

在向参数传递基本类型的值时，被传递的值会被复制给一个局部变量（即命名参数，或者用ECMAScript 的概念来说，就是 arguments 对象中的一个元素）。在向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部。
``` js
function addTen(num){
    nun+=10;
    return num;
}
var count = 20;
var  result = addTen(count);
alert(count);  //20 无变化
alert(result); //30
```
使用对象

``` js
function setName(obj){
    obj.name = "demo"
}
var person = new Object();
setName(person);
alert(person.name); //demo
```

在这个函数内部， obj 和 person 引用的是同一个对象。换句话说，即使这个变量是按值传递的， obj 也会按引用来访问同一个对象。于是，当在函数内部为 obj 添加 name属性后，函数外部的 person 也将有所反映；因为 person 指向的对象在堆内存中只有一个，而且是全局对象。有很多开发人员错误地认为：在局部作用域中修改的对象会在全局作用域中反映出来，就说明参数是按引用传递的,证明对象是按值传递的:
``` js
function setName(obj){
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Gerg";
}
var person = new  Object();
setName(person);
alert(person.name); //"Nicholas"
```
在 setName()函数中添加了两行代码：一行代码为 obj重新定义了一个对象，另一行代码为该对象定义了一个带有不同值的 name 属性。在把 person 传递给setName()后， 其 name 属性被设置为"Nicholas"。 然后，又将一个新对象赋给变量 obj， 同时将其 name属性设置为"Greg"。如果 person 是按引用传递的，那么 person 就会自动被修改为指向其 name 属性值为"Greg"的新对象。但是，当接下来再访问 person.name 时，显示的值仍然是"Nicholas"。这说明即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上，当在函数内部重写 obj 时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁

#### 4.1.4 检测类型
typeof 操作符是确定一个变量是字符串、数值、布尔值，还是 undefined 的最佳工具。如果变量的值是一个对象或 null，则 typeof 操作符会像下面例子中所示的那样返回"object"
``` js
var s="Nicholas";
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
alert(typeof s); //string
alert(typeof i); //number
alert(typeof b); //boolean
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object
```

instanceof 操作符
``` js
var result = variable instance of construcor
```
使用 typeof 操作符检测函数时，该操作符会返回"function"。

#### 4.2 执行环境及作用域
执行环境（ execution context，为简单起见，有时也称为“环境”）是 JavaScript 中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（ variable object），环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境。根据 ECMAScript 实现所在的宿主环境不同，表示执行环境的对象也不一样。在 Web 浏览器中，全局执行环境被认为是 window 对象。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。

当代码在一个环境中执行时，会创建变量对象的一个作用域链（ scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（这个对象在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象

标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。
``` js
var color = "blue";
function changeColor(){
    if(color==="blue"){
        color = "red";
    }else{
        color = "blue";
    }
}
changeColor();
alert("color is now"+color);
```
函数 changeColor()的作用域链包含两个对象：它自己的变量对象（其中定义着 arguments 对象）和全局环境的变量对象,在局部作用域中定义的变量可以在局部环境中与全局变量互换使用
``` js
var color = "blue";
function changeColor(){
    var anotherColor = "red";
    function swapColors(){
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        //可以访问到 color anothercolor和tempColor
    }
    //这里这里可以访问到color和anotherColor，但是不能访问tempColor
    swapColor();
}
//只能访问color
changeColor();
```

#### 4.2.1 延长作用域链
虽然执行环境的类型总共只有两种——全局和局部（函数），但还是有其他办法来延长作用域链
* try-catch 语句的 catch 块；
* with 语句。
这两个语句都会在作用域链的前端添加一个变量对象。对 with 语句来说，会将指定的对象添加到作用域链中。对 catch 语句来说，会创建一个新的变量对象，其中包含的是被抛出的错误对象的声明
``` js
function buildUrl(){
    var qs = "?debug=true";
    with(location){
        var url = href+qs;
    }
    return url;
}
```
with 语句接收的是 location 对象，因此其变量对象中就包含了 location 对象的所有属性和方法，而这个变量对象被添加到了作用域链的前端

#### 4.2.2 无块级作用域
ES5 JavaScript 没有块级作用域经常会导致理解上的困惑。ES6 新增let
``` js
if(true){
    var color = "blue";
    let color2 = "yellow";
}
console.log(color)  // blue
console.log(color2) //Uncaught ReferenceError: color2 is not defined
```
在 JavaScript 中， if 语句中的变量声明会将变量添加到当前的执行环境（在这里是
全局环境）中。在使用 for 语句时尤其要牢记这一差异
``` js
for(var i=0;i<10;i++){
    console.log(i);
}
for(let j=0;j<10;j++){
    console.log(j)
}
console.log(i); //10
console.log(j); //VM195:8 Uncaught ReferenceError: j is not defined
```
1. 声明变量
使用 var 声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境；在 with 语句中，最接近的环境是函数环境。如果初始化变量时没有使用 var 声明，该变量会自动被添加到全局环境。
``` js
function add(num1,num2){
    var sum = num1+num2;
    return sum;
}
var result = add(10,20);
console.log(result);  //undefined sum不是有效的变量，因此会导致错误
function add(num1,num2){
    sum = num1+num2;
    return sum;
}
var result = add(10, 20);   //30
alert(sum);                 //30
```
2. 查询标识符
当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什么。搜索过程从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符。如果在局部环境中找到了该标识符，搜索过程停止，变量就绪。如果在局部环境中没有找到该变量名，则继续沿作用域链向上搜索。搜索过程将一直追溯到全局环境的变量对象。如果在全局环境中也没有找到这个标识符，则意味着该变量尚未声明。
``` js
var color = "blue";
function getColor(){
    return color;
}
console.log(getColor()); //blue
```
![](/images/frontend-javascript-variable-findvariable.jpg)
如果局部环境中存在着同名标识符，就不会使用位于父环境中的标识符
``` js
var color = "blue";
function getColor(){
    var color = "red";
    return color;
}
console.log(getColor()); //red
```

### 4.3 垃圾收集
JavaScript 具有自动垃圾收集机制，也就是说，执行环境会负责管理代码执行过程中使用的内存。

局部变量只在函数执行的过程中存在。而在这个过程中，会为局部变量在栈（或堆）内存上分配相应的空间，以便存储它们的值。然后在函数中使用这些变量，直至函数执行结束。此时，局部变量就没有存在的必要了，因此可以释放它们的内存以供将来使用。在这种情况下，很容易判断变量是否还有存在的必要；但并非所有情况下都这么容易就能得出结论。垃圾收集器必须跟踪哪个变量有用哪个变量没用，对于不再有用的变量打上标记，以备将来收回其占用的内存。用于标识无用变量的策略可能会因实现而异，但具体到浏览器中的实现，则通常有两个策略。

#### 4.3.1 标记清除
JavaScript 中最常用的垃圾收集方式是标记清除（ mark-and-sweep）
当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“进入环境”，当变量离开环境时，则将其标记为“离开环境”

#### 4.3.2 引用计数
不太常见的垃圾收集策略叫做引用计数（ reference counting）。引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值赋给该变量时，则这个值的引用次数就是 1。如果同一个值又被赋给另一个变量，则该值的引用次数加 1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。

循环引用指的是对象 A 中包含一个指向对象 B 的指针，而对象 B 中也包含一个指向对象 A 的引用。

``` js
function problem(){
    var objecta = new Object();
    var objectb = new Object();

    objecta.someOtherObject = objectb;
    objectb.anotherObject = objecta;
}
```
objectA 和 objectB 通过各自的属性相互引用；也就是说，这两个对象的引用次
数都是 2。在采用标记清除策略的实现中，由于函数执行之后，这两个对象都离开了作用域，因此这种相互引用不是个问题。但在采用引用计数策略的实现中，当函数执行完毕后， objectA 和 objectB 还将继续存在，因为它们的引用次数永远不会是 0。假如这个函数被重复多次调用，就会导致大量内存得不到回收.

BOM 和 DOM 中的对象就是使用 C++以 COM（ Component Object Model，组件对象模型）对象的形式实现的，而 COM 对象的垃圾收集机制采用的就是引用计数策略。因此，即使 IE 的 JavaScript 引擎是使用标记清除策略来实现的，但JavaScript 访问的 COM 对象依然是基于引用计数策略的。换句话说，只要在 IE 中涉及 COM 对象，就会存在循环引用的问题。
``` js
var element = document.getElementById('some_element');
var myObject = new Object();
myObject.element = element;
element.someObject = myObject;

//手工断开原生 JavaScript 对象与DOM 元素之间的连接
myObject.element = null;
element.someObject = null;
```
这个例子在一个 DOM 元素（ element）与一个原生 JavaScript 对象（ myObject）之间创建了循环引用。其中，变量 myObject 有一个名为 element 的属性指向 element 对象；而变量 element 也有一个属性名叫 someObject 回指 myObject。由于存在这个循环引用，即使将例子中的 DOM 从页面中移除，它也永远不会被回收

#### 4.3.3 性能问题

垃圾收集器是周期性运行的，如果为变量分配的内存数量很可观，那么回收工作量也是相当大的。在这种情况下，确定垃圾收集的时间间隔是一个非常重要的问题。

#### 4.3.4 管理内存
JavaScript在进行内存管理及垃圾收集时面临的问题还是有点与众不同。其中最主要的一个问题，就是分配给 Web浏览器的可用内存数量通常要比分配给桌面应用程序的少。这样做的目的主要是出于安全方面的考虑，目的是防止运行 JavaScript 的网页耗尽全部系统内存而导致系统崩溃。内存限制问题不仅会影响给变量分配内存，同时还会影响调用栈以及在一个线程中能够同时执行的语句数量。
``` js
function createPerson(name){
    var localPerson = new Object();
    localPerson.name = name;
    return localPerson;
}
var globalPerson = createPerson("Nicholas");
//手动解除globalperson的引用
globalPerson = null;
```
解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收


### 4.4小结
JavaScript 变量可以用来保存两种类型的值：基本类型值和引用类型值。ES5 基本类型的值源自以下 5种基本数据类型： Undefined、 Null、 Boolean、 Number 和 String、ES6(Symbol)。基本类型值和引用类型值具有以下特点：

* 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中；
* 从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本；
* 引用类型的值是对象，保存在堆内存中；
* 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针；
* 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象；
* 确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用instanceof 操作符。

所有变量（包括基本类型和引用类型）都存在于一个执行环境（也称为作用域）当中，这个执行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。

* 执行环境有全局执行环境（也称为全局环境）和函数执行环境之分；
* 每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；
* 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全局环境；
* 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据；
* 变量的执行环境有助于确定应该何时释放内存。
JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。可以对 JavaScript 的垃圾收集例程作如下总结。
* 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。
* “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。
* 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。 JavaScript引擎目前都不再使用这种算法；但在 IE 中访问非原生 JavaScript 对象（如 DOM 元素）时，这种算法仍然可能会导致问题。
* 当代码中存在循环引用现象时，“引用计数”算法就会导致问题。
* 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。











## 5 引用类型
ES5中的引用类型是一种数据结构，用于将数据与功能组织在一起，通常被称为类，有时候也被称为对象定义。

对象是某个特定引用类型的实例。新对象是使用 new 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数是出于创建新对象的目的而定义的

### 5.1 Object类型
Object 也是ECMAScript 中使用最多的一个类型。
创建 Object 实例的方式有两种。
* 第一种是使用 new 操作符后跟 Object 构造函数
``` js
var person = new Object();
person.name = "april";
person.age = 26;
```
* 第二种对象字面量表示法。对象字面量是对象定义的一种简写形式，目的在于简化创建包含大量属性的对象的过程。
``` js
var person = {
    name:"april",
    age:26
};
```
ECMAScript 中的表达式上下文指的是能够返回一个值（表达式）。赋值操作符表示后面是一个值，所以左花括号在这里表示一个表达式的开始。同样的花括号，如果出现在一个语句上下文（ statement context）中，例如跟在 if 语句条件的后面，则表示一个语句块的开始。使用逗号分隔两个不同的属性，在最后一个属性中不添加逗号，若添加会在IE7及Opera中出错。
使用对象字面量语法时，如果留空其花括号，则可以定义只包含默认属性和方法的对象
``` js
var person = {}; //与new object()相同
person.name = "april";
person.age = 26;
```
一般来说，访问对象属性时使用的都是点表示法，这也是很多面向对象语言中通用的语法。不过，在 JavaScript 也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中
``` js
alert(person["name"]); //april
alert(person.name);    //april
```
但方括号语法的主要优点是可以通过变量来访问属性
``` js
var propertyName = "name";
alert(person[propertyName]); //april
```
### 5.2 Array类型
ECMAScript 中的数组与其他多数语言中的数组有着相当大的区别。虽然 ECMAScript 数组与其他语言中的数组都是数据的有序列表，但与其他语言不同的是， ECMAScript 数组的每一项可以保存任何类型的数据。也就是说，可以用数组的第一个位置来保存字符串，用第二位置来保存数值，用第三个位置来保存对象，以此类推。而且， ECMAScript 数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容
纳新增数据。
创建数组的基本方式有两种。第一种是使用 Array 构造函数
``` js
var colors = new Array();
```
预先分配定长数组
``` js
var colors = new Array(20);
```
向 Array 构造函数传递数组中应该包含的项
``` js
var colors = new Array("red", "blue", "green");
```
使用Array构造函数创建数组时也可以省略new操作符
``` js
var colors = Array(3);      //包含三项的数组

var names = Array("april"); //包含一项
```
创建数组的第二种基本方式是使用数组字面量表示法。数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开
``` js
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
var names = []; // 创建一个空数组
var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组
//chrome console下面的结果
values
(2) [1, 2]
options
(5) [empty × 5]
names
[]
colors
(3) ["red", "blue", "green"]
```
在读取和设置数组的值时，要使用方括号并提供相应值的基于 0 的数字索引
``` js
var colors = ["red", "blue", "green"]; // 定义一个字符串数组
alert(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 新增第四项
```
方括号中的索引表示要访问的值。如果索引小于数组中的项数，则返回对应项的值

数组的 length 属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。
``` js
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors.length = 2;
alert(colors[2]); //undefined
```
利用 length 属性也可以方便地在数组末尾添加新项
``` js
var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
colors[colors.length] = "black"; //（在位置 3）添加一种颜色
colors[colors.length] = "brown"; //（在位置 4）再添加一种颜色
```
::: danger
数组最多可以包含 4 294 967 295 个项，这几乎已经能够满足任何编程需求了。如果想添加的项数超过这个上限值，就会发生异常。而创建一个初始大小与这个上限值接近的数组，则可能会导致运行时间超长的脚本错误。
:::

#### 5.2.1 检测数组
使用 instanceof 操作符
``` js
if(value instanceof Array){
    //对数组执行某些操作
}
```
instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

为了解决这个问题， ECMAScript 5 新增了 Array.isArray()方法。这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。
``` js
if(Array.isArrsy(value)){
    //对数组执行某些操作
}
```
#### 5.2.2 转换方法
所有对象都具有 toLocaleString()、 toString()和 valueOf()方法。其中，调用数组的 toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。而调用 valueOf()返回的还是数组
``` js
//Chrome console
colors.toString()
"red,blue,green"
colors.valueOf()
(3) ["red", "blue", "green"]
colors
(3) ["red", "blue", "green"]
```
当调用数组的 toLocaleString()方法时，它也会创建一个数组值的以逗号分隔的字符串。而与前两个方法唯一的不同之处在于，这一次为了取得每一项的值，调用的是每一项的 toLocaleString()方法，而不是 toString()方法。
``` js
var person1 = {
    toLocaleString : function () {
        return "ThreeST";
    },
    toString : function() {
        return "threeST";
    }
};
var person2 = {
    toLocaleString : function () {
        return "April";
    },
    toString : function() {
        return "april";
    }
};
var people = [person1, person2];
alert(people); //threeST,april
people.toString()
"threeST,april"
people.toLocaleString()
"ThreeST,April"
```
数组继承的 toLocaleString()、 toString()和 valueOf()方法，在默认情况下都会以逗号分隔的字符串的形式返回数组项。而如果使用 join()方法，则可以使用不同的分隔符来构建这个字符串。 join()方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。
``` js
var colors = ["red", "green", "blue"];
alert(colors.join(",")); //red,green,blue
alert(colors.join("||")); //red||green||blue
```

#### 5.2.3 栈方法
栈是一种 LIFO（ Last-In-First-Out，后进先出）的数据结构，也就是最新添加的项最早被移除。而栈中项的插入（叫做推入）和移除（叫做弹出），只发生在一个位置——栈的顶部。 ECMAScript 为数组专门提供了 push()和 pop()方法
* push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
* pop()方法则从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。
``` js
var colors = new Array(); // 创建一个数组
var count = colors.push("red", "green"); // 推入两项
alert(count); //2
count = colors.push("black"); // 推入另一项
alert(count); //3
var item = colors.pop(); // 取得最后一项
alert(item); //"black"
alert(colors.length); //2
```

#### 5.2.4 队列方法
栈数据结构的访问规则是 LIFO（后进先出），而队列数据结构的访问规则是 FIFO（ First-In-First-Out，先进先出）。队列在列表的末端添加项，从列表的前端移除项。
* push()是向数组末端添加项的方法
* shift()能够移除数组中的第一个项并返回该项，同时将数组长度减 1
``` js
var colors = new Array(); //创建一个数组
var count = colors.push("red", "green"); //推入两项
alert(count); //2
count = colors.push("black"); //推入另一项
alert(count); //3
var item = colors.shift(); //取得第一项
alert(item); //"red"
alert(colors.length); //2
```

ECMAScript 还为数组提供了一个 unshift()方法。顾名思义， unshift()与 shift()的用途相反：它能在数组前端添加任意个项并返回新数组的长度。因此，同时使用 unshift()和 pop()方法，可以从相反的方向来模拟队列，即在数组的前端添加项，从数组末端移除项，
``` js
var colors = new Array(); //创建一个数组
var count = colors.unshift("red", "green"); //推入两项
alert(count); //2
count = colors.unshift("black"); //推入另一项
alert(count); //3
var item = colors.pop(); //取得最后一项
alert(item); //"green"
alert(colors.length); //2
```
#### 5.2.5 重排序方法
数组中已经存在两个可以直接用来重排序的方法： reverse()和 sort()
* reverse()反转数组排序
* sort()
``` js
var values = [1,2,3,4,5];
values.reverse();
(5) [5, 4, 3, 2, 1]
values.sort();
(5) [1, 2, 3, 4, 5]
```
sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串
``` js
var values = [0, 1, 5, 10, 15];
values.sort();
(5) [0, 1, 10, 15, 5]
```
比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。
``` js
function compare(value1,value2){
    if(value1<value2){
        return -1;
    }else if(value1>value2){
        return 1;
    }else{
        return 0;
    }
}
//调用上面函数
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); //0,1,5,10,15

//倒序排序
function compareReverse(value1,value2){
    if(value1<value2){
        return 1;
    }else if(value1>value2){
        return -1;
    }else{
        return 0;
    }
}
values.sort(compareReverse);
alert(values); // 15,10,5,1,0
```
比较简单的方法
``` js
function compare(value1,value2){
    return value2 - value1;
}
```
#### 5.2.6 操作方法

* concat()方法可以基于当前数组中的所有项创建一个新数组。具体来说，这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本。如果传递给 concat()方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。如果传递的值不是数组，这些值就会被简单地添加到结果数组的末尾
``` js
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
alert(colors); //red,green,blue
alert(colors2); //red,green,blue,yellow,black,brown
```

* slice()，它能够基于当前数组中的一或多个项创建一个新数组。 slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。注意， slice()方法不会影响原始数组
``` js
var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
alert(colors2); //green,blue,yellow,purple
alert(colors3); //green,blue,yellow
```
::: tip
如果 slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。例如，在一个包含 5 项的数组上调用 slice(-2,-1)与调用 slice(3,4)得到的结果相同。如果结束位置小于起始位置，则返回空数组。
:::

*  splice()方法，这个方法恐怕要算是最强大的数组方法了，它有很多种用法。splice()的主要用途是向数组的中部插入项，但使用这种方法的方式则有如下 3 种
   * 删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。
   *  插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，splice(2,0,"red","green")会从当前数组的位置 2 开始插入字符串"red"和"green"。
   * 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,"red","green")会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串"red"和"green"。
splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。
``` js
var colors = ["red", "green", "blue"];
var removed = colors.splice(0,1); // 删除第一项
alert(colors); // green,blue
alert(removed); // red，返回的数组中只包含一项
removed = colors.splice(1, 0, "yellow", "orange"); // 从位置 1 开始插入两项
alert(colors); // green,yellow,orange,blue
alert(removed); // 返回的是一个空数组
removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
alert(colors); // green,red,purple,orange,blue
alert(removed); // yellow，返回的数组中只包含一项
```
#### 5.2.7 位置方法
ECMAScript 5 为数组实例添加了两个位置方法： indexOf()和 lastIndexOf()。这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， indexOf()方法从数组的开头（位置 0）开始向后查找， lastIndexOf()方法则从数组的末尾开始向前查找。
这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回-1
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4)); //3
alert(numbers.lastIndexOf(4)); //5
alert(numbers.indexOf(4, 4)); //5
alert(numbers.lastIndexOf(4, 4)); //3
var person = { name: "Nicholas" };
var people = [{ name: "Nicholas" }];
var morePeople = [person];
alert(people.indexOf(person)); //-1
alert(morePeople.indexOf(person)); //0
```
#### 5.2.8 迭代方法
ECMAScript 5 为数组定义了 5 个迭代方法。每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响 this 的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。根据使用的方法不同，这个函数执行后的返回值可能会也可能不会影响方法的返回值。以下是这 5 个迭代方法的作用。
*  every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
*  filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
*  forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
*  map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
*  some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
以上方法都不会修改数组中的包含的值。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item,index,array){
    return (item>2);
});
alert(everyResult);   //false

var someResult = numbers.some(function(item,index,array){
    return (item>2);
});

alert(someResult); //true

var filterResult = numbers.filter(function(item,index,array){
    return (item>2);
});

alert(filterResult); //[3,4,5,4,3]

var mapResult = numbers.map(function(item.index,array){
    return item*2;
});

alert(mapResult); //[2,4,6,8,10,8,6,4,2]

numbers.forEach(function(item,index,array){
    //todo
});
```

#### 5.2.9归并方法
reduce()和 reduceRight()。这两个方法都会迭
代数组的所有项，然后构建一个最终返回的值。其中， reduce()方法从数组的第一项开始，逐个遍历
到最后。而 reduceRight()则从数组的最后一项开始，向前遍历到第一项。
这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这
个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第
一个参数是数组的第一项，第二个参数就是数组的第二项。
``` js
var values = [1,2,3,4,5];
var sum =values.reduce(function(prev,cur,index,array){
    return prev+cur;
});

alert(sum); //15
```

### 5.3 Date类型
ECMAScript 中的 Date 类型是在早期 Java 中的 java.util.Date 类基础上构建的。为此， Date类型使用自 UTC（ Coordinated Universal Time，国际协调时间） 1970 年 1 月 1 日午夜（零时）开始经过的毫秒数来保存日期。在使用这种数据存储格式的条件下， Date 类型保存的日期能够精确到 1970 年 1月 1 日之前或之后的 285 616 年。
```  js
var date = new Date();//自动获得当前时间
```
想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数（即从UTC 时间 1970 年 1 月 1 日午夜起至该日期止经过的毫秒数）。为了简化这一计算过程， ECMAScript 提供了两个方法： Date.parse()和 Date.UTC()。
* Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。
    *  “月/日/年”，如 6/13/2019；
    *  “英文月名 日,年”，如 January 12,2019；
    *  “英文星期几 英文月名 日 年 时:分:秒 时区”，如 Tue May 25 2019 00:00:00 GMT-0700。
    *  ISO 8601 扩展格式 YYYY-MM-DDTHH:mm:ss.sssZ（例如 2019-05-25T00:00:00）。只有兼容ECMAScript 5 的实现支持这种格式。
例如，要为 2020 年 5 月 25 日创建一个日期对象，可以使用下面的代码：
``` js
var someDate = new Date(Date.parse("May 25, 2020"));
```

Date.UTC()的参数分别是年份、基于 0 的月份（一月是 0，二月是 1，以此类推）、月中的哪一天（1 到 31）、小时数（ 0 到 23）、分钟、秒以及毫秒数。在这些参数中，只有前两个参数（年和月）是必需的。如果没有提供月中的天数，则假设天数为 1；如果省略其他参数，则统统假设为 0。
``` js
// GMT 时间 2000 年 1 月 1 日午夜零时
var y2k = new Date(Date.UTC(2000, 0));
// GMT 时间 2015 年 5 月 5 日下午 5:55:55
var allFives = new Date(Date.UTC(2015, 4, 5, 17, 55, 55));
//取得开始时间
var start = Date.now();
//调用函数
doSomething();
//取得停止时间
var stop = Date.now(),
result = stop – start;
```
#### 5.3.1 继承的方法
Date 类型也重写了 toLocaleString()、 toString()和 valueOf()方法；但这些方法返回的值与其他类型中的方法不同。 Date 类型的 toLocaleString()方法会按照与浏览器设置的地区相适应的格式返回日期和时间。这大致意味着时间格式中会包含 AM 或 PM，但不会包含时区信息（当然，具体的格式会因浏览器而异）。而 toString()方法则通常返回带有时区信息的日期和时间，其中时间一般以军用时间（即小时的范围是 0 到 23）表示

至于 Date 类型的 valueOf()方法，则根本不返回字符串，而是返回日期的毫秒表示。因此，可以方便使用比较操作符（小于或大于）来比较日期值。

#### 5.3.2 日期格式化方法
Date 类型还有一些专门用于将日期格式化为字符串的方法，这些方法如下。
*  toDateString()——以特定于实现的格式显示星期几、月、日和年；
*  toTimeString()——以特定于实现的格式显示时、分、秒和时区；
*  toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年；
*  toLocaleTimeString()——以特定于实现的格式显示时、分、秒；
*  toUTCString()——以特定于实现的格式完整的 UTC 日期。
与 toLocaleString()和 toString()方法一样，以上这些字符串格式方法的输出也是因浏览器而异的

#### 5.3.3 日期/时间组件方法

直接取得和设置日期值中特定部分的方法了。需要注意的是， UTC 日期指的是在没有时区偏差的情况下（将日期转换为 GMT 时间）的日期值
``` js
getTime() 返回表示日期的毫秒数；与valueOf()方法返回的值相同
setTime(毫秒) 以毫秒数设置日期，会改变整个日期
getFullYear() 取得4位数的年份（如2007而非仅07）
getUTCFullYear() 返回UTC日期的4位数年份
setFullYear(年) 设置日期的年份。传入的年份值必须是4位数字（如2007而非仅07）
setUTCFullYear(年) 设置UTC日期的年份。传入的年份值必须是4位数字（如2007而非仅07）
getMonth() 返回日期中的月份，其中0表示一月， 11表示十二月
getUTCMonth() 返回UTC日期中的月份，其中0表示一月， 11表示十二月
setMonth(月) 设置日期的月份。传入的月份值必须大于0，超过11则增加年份
setUTCMonth(月) 设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份
getDate() 返回日期月份中的天数（ 1到31）
getUTCDate() 返回UTC日期月份中的天数（ 1到31）
setDate(日) 设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
setUTCDate(日) 设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
getDay() 返回日期中星期的星期几（其中0表示星期日， 6表示星期六）
getUTCDay() 返回UTC日期中星期的星期几（其中0表示星期日， 6表示星期六）
getHours() 返回日期中的小时数（ 0到23）
getUTCHours() 返回UTC日期中的小时数（ 0到23）
setHours(时) 设置日期中的小时数。传入的值超过了23则增加月份中的天数
setUTCHours(时) 设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数
getMinutes() 返回日期中的分钟数（ 0到59）
getUTCMinutes() 返回UTC日期中的分钟数（ 0到59）
setMinutes(分) 设置日期中的分钟数。传入的值超过59则增加小时数
setUTCMinutes(分) 设置UTC日期中的分钟数。传入的值超过59则增加小时数
getSeconds() 返回日期中的秒数（ 0到59）
getUTCSeconds() 返回UTC日期中的秒数（ 0到59）
setSeconds(秒) 设置日期中的秒数。传入的值超过了59会增加分钟数
setUTCSeconds(秒) 设置UTC日期中的秒数。传入的值超过了59会增加分钟数
getMilliseconds() 返回日期中的毫秒数
getUTCMilliseconds() 返回UTC日期中的毫秒数
setMilliseconds(毫秒) 设置日期中的毫秒数
setUTCMilliseconds(毫秒) 设置UTC日期中的毫秒数
getTimezoneOffset() 返回本地时间与UTC时间相差的分钟数。例如，美国东部标准时间返回300。在某地进入夏令时的情况下，这个值会有所变化
```
### 5.4 RegExp类型
ECMAScript 通过 RegExp 类型来支持正则表达式。使用下面类似 Perl 的语法，就可以创建一个正则表达式。
``` js
var expression = / pattern / flags ;
```
*  g：表示全局（ global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
*  i：表示不区分大小写（ case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
*  m：表示多行（ multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。
``` js
/*
* 匹配字符串中所有"at"的实例
*/
var pattern1 = /at/g;
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern2 = /[bc]at/i;
/*
* 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
*/
var pattern3 = /.at/gi;
```
模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：
``` 
( [ { \ ^ $ | ) ? * + .]}
```
这些元字符在正则表达式中都有一或多种特殊用途，因此如果想要匹配字符串中包含的这些字符，就必须对它们进行转义。
``` js
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern1 = /[bc]at/i;
/*
* 匹配第一个" [bc]at"，不区分大小写
*/
var pattern2 = /\[bc\]at/i;
/*
* 匹配所有以"at"结尾的 3 个字符的组合，不区分大小写
*/
var pattern3 = /.at/gi;
/*
* 匹配所有".at"，不区分大小写
*/
var pattern4 = /\.at/gi;
```
前面举的这些例子都是以字面量形式来定义的正则表达式。另一种创建正则表达式的方式是使用RegExp 构造函数，它接收两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串
``` js
/*
* 匹配第一个"bat"或"cat"，不区分大小写
*/
var pattern1 = /[bc]at/i;
/*
* 与 pattern1 相同，只不过是使用构造函数创建的
*/
var pattern2 = new RegExp("[bc]at", "i");
```
pattern1 和 pattern2 是两个完全等价的正则表达式。要注意的是，传递给 RegExp 构造函数的两个参数都是字符串（不能把正则表达式字面量传递给 RegExp 构造函数）。由于 RegExp 构造函数的模式参数是字符串，所以在某些情况下要对字符进行双重转义。所有元字符都必须双重转义，那些已经转义过的字符也是如此
字面量模式 | 等价的字符串
--:|:--:|:--
/\[bc\]at/ |"\\[bc\\]at"
/\.at/ |"\\.at"
/name\/age/| "name\\/age"
/\d.\d{1,2}/ |"\\d.\\d{1,2}"
/\w\\hello\\123/ |"\\w\\\\hello\\\\123"

使用正则表达式字面量和使用 RegExp 构造函数创建的正则表达式不一样。在 ECMAScript 3 中，正则表达式字面量始终会共享同一个 RegExp 实例，而使用构造函数创建的每一个新 RegExp 实例都是新实例
``` js
var re = null,
    i;
for (i=0; i < 10; i++){
    re = /cat/g;
    re.test("catastrophe");
}
for (i=0; i < 10; i++){
    re = new RegExp("cat", "g");
    re.test("catastrophe");
}
```

#### 5.4.1 RegExp实例属性
RegExp 的每个实例都具有下列属性，通过这些属性可以取得有关模式的各种信息。
*  global：布尔值，表示是否设置了 g 标志。
*  ignoreCase：布尔值，表示是否设置了 i 标志。
*  lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。
*  multiline：布尔值，表示是否设置了 m 标志。
*  source：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。
``` js
var pattern1 = /\[bc\]at/i;
alert(pattern1.global); //false
alert(pattern1.ignoreCase); //true
alert(pattern1.multiline); //false
alert(pattern1.lastIndex); //0
alert(pattern1.source); //"\[bc\]at"
var pattern2 = new RegExp("\\[bc\\]at", "i");
alert(pattern2.global); //false
alert(pattern2.ignoreCase); //true
alert(pattern2.multiline); //false
alert(pattern2.lastIndex); //0
alert(pattern2.source); //"\[bc\]at"
```
第一个模式使用的是字面量，第二个模式使用了 RegExp 构造函数，但它们的source 属性是相同的


#### 5.4.2 RegExp 实例方法

exec()接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回 null。返回的数组虽然是 Array 的实例，但包含两个额外的属性： index 和 input。其中， index 表示匹配项在字符串中的位置，而 input 表示应用正则表达式的字符串。
``` js
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
alert(matches.index); // 0
alert(matches.input); // "mom and dad and baby"
alert(matches[0]); // "mom and dad and baby"
alert(matches[1]); // " and dad and baby"
alert(matches[2]); // " and baby"
```
对于 exec()方法而言，即使在模式中设置了全局标志（ g），它每次也只会返回一个匹配项。在不设置全局标志的情况下，在同一个字符串上多次调用 exec()将始终返回第一个匹配项的信息。而在设置全局标志的情况下，每次调用 exec()则都会在字符串中继续查找新匹配项
``` js
var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern1.lastIndex); //0

matches = pattern1.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern1.lastIndex); //0

var pattern2 = /.at/g;
var matches = pattern2.exec(text);
alert(matches.index); //0
alert(matches[0]); //cat
alert(pattern2.lastIndex); //3

matches = pattern2.exec(text);
alert(matches.index); //5
alert(matches[0]); //bat
alert(pattern2.lastIndex); //8
```
第一个模式 pattern1 不是全局模式，因此每次调用 exec()返回的都是第一个匹配项（ "cat"）。而第二个模式 pattern2 是全局模式，因此每次调用 exec()都会返回字符串中的下一个匹配项，直至搜索到字符串末尾为止。此外，还应该注意模式的 lastIndex 属性的变化情况。在全局匹配模式下， lastIndex 的值在每次调用 exec()后都会增加，而在非全局模式下则始终保持不变
::: danger
IE 的 JavaScript 实现在 lastIndex 属性上存在偏差，即使在非全局模式下，lastIndex 属性每次也会变化。
:::

正则表达式的第二个方法是 test()，它接受一个字符串参数。在模式与该参数匹配的情况下返回true；否则，返回 false。在只想知道目标字符串与某个模式是否匹配，但不需要知道其文本内容的情况下，使用这个方法非常方便。

``` js
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){
    alert("The pattern was matched.");
}

var pattern = new RegExp("\\[bc\\]at", "gi");
alert(pattern.toString()); // /\[bc\]at/gi
alert(pattern.toLocaleString()); // /\[bc\]at/gi
```
#### 5.4.3RegExp构造函数属性
RegExp 构造函数包含一些属性（这些属性在其他语言中被看成是静态属性）。这些属性适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化。

长属性名| 短属性名 |说 明
--:|:--:|:--:|:--
input |$_| 最近一次要匹配的字符串。 Opera未实现此属性
lastMatch |$& |最近一次的匹配项。Opera未实现此属性
lastParen |$+ |最近一次匹配的捕获组。 Opera未实现此属性
leftContext |$` |input字符串中lastMatch之前的文本
multiline| $* |布尔值，表示是否所有表达式都使用多行模式。 IE和Opera未实现此属性
rightContext| $'| Input字符串中lastMatch之后的文本

使用这些属性可以从 exec()或 test()执行的操作中提取出更具体的信息
``` js
var text = "this has been a short summer";
var pattern = /(.)hort/g;
/*
* 注意： Opera 不支持 input、 lastMatch、 lastParen 和 multiline 属性
* Internet Explorer 不支持 multiline 属性
*/
if (pattern.test(text)){
    alert(RegExp.input); // this has been a short summer
    alert(RegExp.leftContext); // this has been a
    alert(RegExp.rightContext); // summer
    alert(RegExp.lastMatch); // short
    alert(RegExp.lastParen); // s
    alert(RegExp.multiline); // false
}
```
以上代码创建了一个模式，匹配任何一个字符后跟 hort，而且把第一个字符放在了一个捕获组中,RegExp 构造函数的各个属性返回了下列值：
*  input 属性返回了原始字符串；
*  leftContext 属性返回了单词 short 之前的字符串，而 rightContext 属性则返回了 short之后的字符串；
*  lastMatch 属性返回最近一次与整个正则表达式匹配的字符串，即 short；
*  lastParen 属性返回最近一次匹配的捕获组，即例子中的 s。
``` js
var text = "this has been a short summer";
var pattern = /(.)hort/g;
/*
* 注意： Opera 不支持 input、 lastMatch、 lastParen 和 multiline 属性
* Internet Explorer 不支持 multiline 属性
*/
if (pattern.test(text)){
    alert(RegExp.$_); // this has been a short summer
    alert(RegExp["$`"]); // this has been a
    alert(RegExp["$'"]); // summer
    alert(RegExp["$&"]); // short
    alert(RegExp["$+"]); // s
    alert(RegExp["$*"]); // false
}
```
#### 5.2.4 模式的局限性
ECMAScript 正则表达式不支持的特性 www.regular-expressions.info
* 匹配字符串开始和结尾的\A 和\Z 锚①
* 向后查找（ lookbehind） ②
* 并集和交集类
* 原子组（ atomic grouping）
* Unicode 支持（单个字符除外，如\uFFFF）
* 命名的捕获组③
* s（ single，单行）和 x（ free-spacing，无间隔）匹配模式
* 条件匹配
* 正则表达式注释

### 5.5 Function类型
函数实际上是对象。每个函数都是 Function 类型的实例，而且都与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。
``` js
function sum (num1, num2) {
    return num1 + num2;
}

var sum = function(num1,num2){
    return num1+num2;
}

var sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
//这种语法会导致解析两次代码（第一次是解析常规 ECMAScript 代码，第二次是解析传入构造函数中的字符串，从而影响性能

function sum(num1, num2){
    return num1 + num2;
}
alert(sum(10,10)); //20
var anotherSum = sum;
alert(anotherSum(10,10)); //20
sum = null;
alert(anotherSum(10,10)); //20
```
首先定义了一个名为 sum()的函数，用于求两个值的和。然后，又声明了变量 anotherSum，并将其设置为与 sum 相等（将 sum 的值赋给 anotherSum）。注意，使用不带圆括号的函数名是访问函数指针，而非调用函数。此时， anotherSum 和 sum 就都指向了同一个函数，因此 anotherSum()也可以被调用并返回结果。即使将 sum 设置为 null，让它与函数“断绝关系”，但仍然可以正常调用anotherSum()。

#### 5.5.1 没有重载
将函数名想象为指针，也有助于理解为什么 ECMAScript 中没有函数重载的概念
``` js
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); //300
```
#### 5.5.2 函数声明与函数表达式
解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。
``` js
//函数声明提升 function hoisting
alert(sum(10,10));
function sum(num1, num2){
    return num1 + num2;
}
//函数表达式
alert(sum(10,10)); // error unexpected identifier
var sum = function(num1,num2){
    return num1+num2;
}
```
#### 5.5.3 作为值的函数
ECMAScript 中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回
``` js
function callSomeFunction(someFunction, someArgument){
    return someFunction(someArgument);
}
function add10(num){
    return num + 10;
}
var result1 = callSomeFunction(add10, 10);
alert(result1); //20
function getGreeting(name){
    return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, "Nicholas");
alert(result2); //"Hello, Nicholas"
```
可以从一个函数中返回另一个函数，而且这也是极为有用的一种技术
``` js
function createComparisonFunction(propertyName) {
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        } else if (value1 > value2){
            return 1;
        } else {
            return 0;
        }
    };
}
var data = [{name: "Zachary", age: 28}, {name: "Nicholas", age: 29}];
data.sort(createComparisonFunction("name"));
alert(data[0].name); //Nicholas
data.sort(createComparisonFunction("age"));
alert(data[0].name); //Zachary

```

#### 5.5.4 函数内部属性
在函数内部，有两个特殊的对象： arguments 和 this。其中， arguments它是一个类数组对象，包含着传入函数中的所有参数。虽然 arguments 的主要用途是保存函数参数，但这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。
``` js
function factorial(num){
    if (num <=1) {
        return 1;
    } else {
        return num * factorial(num-1)
    }
}
```
定义阶乘函数一般都要用到递归算法；如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但问题是这个函数的执行与函数名 factorial 紧紧耦合在了一起。为了消除这种紧密耦合的现象，可以像下面这样使用 arguments.callee。
``` js
function factorial(num){
    if (num <=1) {
        return 1;
    } else {
        return num * arguments.callee(num-1)
    }
}

var trueFactorial = factorial;
factorial = function(){
    return 0;
};
alert(trueFactorial(5)); //120
alert(factorial(5)); //0
```
函数内部的另一个特殊对象是 this，其行为与 Java 和 C#中的 this 大致类似。换句话说， this引用的是函数据以执行的环境对象——或者也可以说是 this 值（当在网页的全局作用域中调用函数时，this 对象引用的就是 window）
``` js
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor(); //"red"
o.sayColor = sayColor;
o.sayColor(); //"blue"
```
上面这个函数 sayColor()是在全局作用域中定义的，它引用了 this 对象。由于在调用函数之前，this 的值并不确定，因此 this 可能会在代码执行过程中引用不同的对象。当在全局作用域中调用sayColor()时， this 引用的是全局对象 window；换句话说，对 this.color 求值会转换成对window.color 求值，于是结果就返回了"red"。而当把这个函数赋给对象 o 并调用 o.sayColor()时， this 引用的是对象 o， 因此对 this.color 求值会转换成对 o.color 求值，结果就返回"blue"。
::: tip
函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的 sayColor()函数与 o.sayColor()指向的仍然是同一个函数
:::
ECMAScript 5 也规范化了另一个函数对象的属性： caller,这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为 null
``` js
function outer(){
    inner();
}
function inner(){
    alert(inner.caller);
}
outer(); //显示outer源码

//通过 arguments.callee.caller来访问相同的信息
function outer(){
    inner();
}
function inner(){
    alert(arguments.callee.caller);
}
outer();
```
警告框中显示 outer()函数的源代码。因为 outer()调用了 inter()，所以inner.caller 就指向 outer()。
当函数在严格模式下运行时，访问 arguments.callee 会导致错误，arguments.caller 属性，但在严格模式下访问它也会导致错误，而在非严格模式下这个属性始终是undefined，严格模式还有一个限制：不能为函数的 caller 属性赋值，否则会导致错误。

#### 5.5.5 函数属性和方法

ECMAScript 中的函数是对象，因此函数也有属性和方法。每个函数都包含两个属性： length 和 prototype。其中， length 属性表示函数希望接收的命名参数的个数

``` js
function sayName(name){
    alert(name);
}
function sum(num1, num2){
    return num1 + num2;
}
function sayHi(){
    alert("hi");
}
alert(sayName.length); //1
alert(sum.length); //2
alert(sayHi.length); //0
```
在 ECMAScript 核心所定义的全部属性中，最耐人寻味的就要数 prototype 属性了。对于ECMAScript 中的引用类型而言， prototype 是保存它们所有实例方法的真正所在。换句话说，诸如toString()和 valueOf()等方法实际上都保存在 prototype 名下，只不过是通过各自对象的实例访问罢了。在创建自定义引用类型以及实现继承时， prototype 属性的作用是极为重要的。在 ECMAScript 5 中， prototype 属性是不可枚举的，因此使用 for-in 无法发现。

每个函数都包含两个非继承而来的方法： apply()和 call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。首先， apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 Array 的实例，也可以是arguments 对象。
``` js
function sum(num1, num2){
    return num1 + num2;
}
function callSum1(num1, num2){
    return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]); // 传入数组
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20
```
::: tip
在严格模式下，未指定环境对象而调用函数，则 this 值不会转型为 window。除非明确把函数添加到某个对象或者调用 apply()或 call()，否则 this 值将是undefined。
:::

call()方法与 apply()方法的作用相同，它们的区别仅在于接收参数的方式不同。对于 call()方法而言，第一个参数是 this 值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须逐个列举出来
``` js
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
alert(callSum(10,10)); //20
```
在使用 call()方法的情况下， callSum()必须明确地传入每一个参数。结果与使用 apply()没有什么不同。至于是使用 apply()还是 call()，完全取决于你采取哪种给函数传递参数的方式最方便。如果你打算直接传入 arguments 对象，或者包含函数中先接收到的也是一个数组，那么使用 apply()肯定更方便；否则，选择 call()可能更合适

传递参数并非 apply()和 call()真正的用武之地；它们真正强大的地方是能够扩充函数赖以运行的作用域
``` js
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
sayColor(); //red
sayColor.call(this); //red
sayColor.call(window); //red
sayColor.call(o); //blue
```
使用 call()（或 apply()）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。

ECMAScript 5 还定义了一个方法： bind()。这个方法会创建一个函数的实例，其 this 值会被绑定到传给 bind()函数的值。

``` js
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```
sayColor()调用 bind()并传入对象 o，创建了 objectSayColor()函数。 objectSayColor()函数的this 值等于 o，因此即使是在全局作用域中调用这个函数，也会看到"blue"。
每个函数继承的 toLocaleString()和 toString()方法始终都返回函数的代码。返回代码的格式则因浏览器而异——有的返回的代码与源代码中的函数代码一样，而有的则返回函数代码的内部表示，即由解析器删除了注释并对某些代码作了改动后的代码

### 5.6 基本包装类型

ECMAScript 还提供了 3 个特殊的引用类型： Boolean、 Number 和String。
``` js
var s1 = "some text";
var s2 = s1.ssubstring(2);
```
变量 s1 包含一个字符串，字符串当然是基本类型值。而下一行调用了 s1 的substring()方法，并将返回的结果保存在了 s2 中。
在读取模式中访问字符串时，后台都会自动完成下列处理。
(1) 创建 String 类型的一个实例；
(2) 在实例上调用指定的方法；
(3) 销毁这个实例。
可以将以上三个步骤想象成是执行了下列 ECMAScript 代码。
``` js
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
```
引用类型与基本包装类型的主要区别就是对象的生存期。使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着我们不能在运行时为基本类型值添加属性和方法
``` js
var s1 = "some text";
s1.color = "red";
alert(s1.color); //undefined
```
第二行代码试图为字符串 s1 添加一个 color 属性。但是，当第三行代码再次访问 s1 时，其 color 属性不见了。问题的原因就是第二行创建的 String 对象在执行第三行代码时已经被销毁了。第三行代码又创建自己的 String 对象，而该对象没有 color 属性。

以显式地调用 Boolean、 Number 和 String 来创建基本包装类型的对象。不过，应该在绝对必要的情况下再这样做，因为这种做法很容易让人分不清自己是在处理基本类型还是引用类型的值。对基本包装类型的实例调用 typeof 会返回"object"，而且所有基本包装类型的对象都会被转换为布尔值 true

``` js
var value = "25";
var number = Number(value); //转型函数
alert(typeof number); //"number"
var obj = new Number(value); //构造函数
alert(typeof obj); //"object"
```

#### 5.6.1 Boolean 类型
Boolean 类型是与布尔值对应的引用类型。要创建 Boolean 对象，可以像下面这样调用 Boolean构造函数并传入 true 或 false 值。
``` js
var booleanObject = new Boolean(true);
```
Boolean 类型的实例重写了 valueOf()方法，返回基本类型值 true 或 false；重写了 toString()方法，返回字符串"true"和"false"。可是， Boolean 对象在 ECMAScript 中的用处不大，因为它经常会造成人们的误解。
``` js
var falseObject = new Boolean(false);
var result = falseObject && true;
alert(result); //true

var falseValue = false;
result = falseValue && true;
alert(result); //false
```
使用 false 值创建了一个 Boolean 对象。然后，将这个对象与基本类型值 true构成了逻辑与表达式。在布尔运算中， false && true 等于 false。可是，示例中的这行代码是对falseObject 而不是对它的值（ false）进行求值。前面讨论过，布尔表达式中的所有对象都会被转换为 true，因此 falseObject 对象在布尔表达式中代表的是 true。结果， true && true 当然就等于 true 了.

基本类型与引用类型的布尔值还有两个区别。首先， typeof 操作符对基本类型返回"boolean"，而对引用类型返回"object"。其次，由于 Boolean 对象是 Boolean 类型的实例，所以使用 instanceof操作符测试 Boolean 对象会返回 true，而测试基本类型的布尔值则返回 false。
``` js
alert(typeof falseObject); //object
alert(typeof falseValue); //boolean
alert(falseObject instanceof Boolean); //true
alert(falseValue instanceof Boolean); //false
```
#### 5.6.2 Number类型
Number 是与数字值对应的引用类型。要创建 Number 对象，可以在调用 Number 构造函数时向其中传递相应的数值。
``` js
var numberObject = new Number(10);
```
与 Boolean 类型一样， Number 类型也重写了 valueOf()、 toLocaleString()和 toString()方法。重写后的 valueOf()方法返回对象表示的基本类型的数值，另外两个方法则返回字符串形式的数值,可以为 toString()方法传递一个表示基数的参数，告诉它返回几进制数值的字符串形式
``` js
var num = 10;
alert(num.toString()); //"10"
alert(num.toString(2)); //"1010"
alert(num.toString(8)); //"12"
alert(num.toString(10)); //"10"
alert(num.toString(16)); //"a
```
toFixed()方法会按照指定的小数位返回数值的字符串表示
``` js
var num = 10;
alert(num.toFixed(2)); //"10.00"
//如果数值本身包含的小数位比指定的还多，那么接近指定的最大小数位的值就会舍入
var num = 10.005;
alert(num.toFixed(2)); //"10.01"
```
可用于格式化数值的方法是 toExponential()，该方法返回以指数表示法（也称 e 表示法）表示的数值的字符串形式。与 toFixed()一样， toExponential()也接收一个参数，而且该参数同样也是指定输出结果中的小数位数。
``` js
var num = 10;
alert(num.toExponential(1)); //"1.0e+1"
//toPrecision()方法可能会返回固定大小（ fixed）格式，也可能返回指数（exponential）格式
var num = 99;
alert(num.toPrecision(1)); //"1e+2"
alert(num.toPrecision(2)); //"99"
alert(num.toPrecision(3)); //"99.0"
```
在使用typeof 和 instanceof 操作符测试基本类型数值与引用类型数值时，得到的结果完全不同
``` js
var numberObject = new Number(10);
var numberValue = 10;
alert(typeof numberObject); //"object"
alert(typeof numberValue); //"number"
alert(numberObject instanceof Number); //true
alert(numberValue instanceof Number); //false
```
Number 对象是 Number 类型的实例，而基本类型的数值则不是。

#### 5.6.3 String类型
String 类型是字符串的对象包装类型
``` js
var stringObject = new String("hello world");
```
String 类型的每个实例都有一个 length 属性，表示字符串中包含多个字符
``` js
var stringValue = "hello world";
alert(stringValue.length); //"11"
```
1. 字符方法
两个用于访问字符串中特定字符的方法是： charAt()和 charCodeAt()。这两个方法都接收一个参数，即基于 0 的字符位置。其中， charAt()方法以单字符字符串的形式返回给定位置的那个字符
``` js
var stringValue = "hello world";
alert(stringValue.charAt(1)); //"e"

alert(stringValue.charCodeAt(1)); //输出"101"
```
2. 字符串操作方法
 concat()，用于将一或多个字符串拼接起来，返回拼接得到的新字符串。
``` js
var stringValue = "hello ";
var result = stringValue.concat("world");
alert(result); //"hello world"
alert(stringValue); //"hello"

var result = stringValue.concat("world", "!");
alert(result); //"hello world!"
alert(stringValue); //"hello"
```
ECMAScript还提供了三个基于子字符串创建新字符串的方法： slice()、 substr()和 substring()。这三个方法都会返回被操作字符串的一个子字符串，而且也都接受一或两个参数。第一个参数指定子字符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪里结束。slice()和substring()的第二个参数指定的是子字符串最后一个字符后面的位置。而 substr()的第二个参数指定的则是返回的字符个数。如果没有给这些方法传递第二个参数，则将字符串的长度作为结束位置。与concat()方法一样， slice()、 substr()和 substring()也不会修改字符串本身的值——它们只是返回一个基本类型的字符串值，对原始字符串没有任何影响。

``` js
var stringValue = "hello world";
alert(stringValue.slice(3)); //"lo world"
alert(stringValue.substring(3)); //"lo world"
alert(stringValue.substr(3)); //"lo world"
alert(stringValue.slice(3, 7)); //"lo w"
alert(stringValue.substring(3,7)); //"lo w"
alert(stringValue.substr(3, 7)); //"lo worl"
```
在传递给这些方法的参数是负值的情况下，它们的行为就不尽相同了。其中， slice()方法会将传入的负值与字符串的长度相加， substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转换为 0。最后， substring()方法会把所有负值参数都转换为 0。
``` js
var stringValue = "hello world";
alert(stringValue.slice(-3)); //"rld"
alert(stringValue.substring(-3)); //"hello world"
alert(stringValue.substr(-3)); //"rld"
alert(stringValue.slice(3, -4)); //"lo w"
alert(stringValue.substring(3, -4)); //"hel"
alert(stringValue.substr(3, -4)); //""（空字符串）
```
在给 slice()和 substr()传递一个负值参数时，它们的行为相同。这是因为-3 会被转换为 8（字符串长度加参数 11+(3)=8），实际上相当于调用了 slice(8)和 substr(8)。但 substring()方法则返回了全部字符串，因为它将-3 转换成了 0。

当第二个参数是负值时，这三个方法的行为各不相同。 slice()方法会把第二个参数转换为 7，这就相当于调用了 slice(3,7)，因此返回"lo w"。 substring()方法会把第二个参数转换为 0，使调用变成了 substring(3,0)，而由于这个方法会将较小的数作为开始位置，将较大的数作为结束位置，因此最终相当于调用了 substring(0,3)。 substr()也会将第二个参数转换为 0，这也就意味着返回包含零个字符的字符串，也就是一个空字符串。

3. 字符串位置方法
有两个可以从字符串中查找子字符串的方法： indexOf()和 lastIndexOf()。
indexOf()方法从字符串的开头向后搜索子字符串，而 lastIndexOf()方法是从字符串的末尾向前搜索子字符串。
``` js
var stringValue = "hello world";
alert(stringValue.indexOf("o")); //4
alert(stringValue.lastIndexOf("o")); //7
```
这两个方法都可以接收可选的第二个参数，表示从字符串中的哪个位置开始搜索,indexOf()会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而 lastIndexOf()则会从指定的位置向前搜索，忽略该位置之后的所有字符
``` js
var stringValue = "hello world";
alert(stringValue.indexOf("o", 6)); //7
alert(stringValue.lastIndexOf("o", 6)); //4
```
由于indexOf()是从位置 6（字母"w"） 开始向后搜索，结果在位置 7 找到了"o"， 因此它返回 7。而 lastIndexOf()是从位置 6 开始向前搜索。结果找到了"hello"中的"o"，因此它返回 4。在使用第二个参数的情况下，可以通过循环调用 indexOf()或 lastIndexOf()来找到所有匹配的子字符串
``` js
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
var positions = new Array();
var pos = stringValue.indexOf("e");
while(pos > -1){
    positions.push(pos);
    pos = stringValue.indexOf("e", pos + 1);
}
alert(positions); //"3,24,32,35,52"
```
通过不断增加 indexOf()方法开始查找的位置，遍历了一个长字符串。在循环之外，首先找到了"e"在字符串中的初始位置；而进入循环后，则每次都给 indexOf()传递上一次的位置加 1。这样，就确保了每次新搜索都从上一次找到的子字符串的后面开始。每次搜索返回的位置依次被保存在数组 positions 中，以便将来使用
4. trim()方法
ECMAScript 5 为所有字符串定义了 trim()方法。这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。
``` js
var stringValue = " hello world ";
var trimmedStringValue = stringValue.trim();
alert(stringValue); //" hello world "
alert(trimmedStringValue); //"hello world"
```
5. 字符串大小写转换方法
接下来我们要介绍的是一组与大小写转换有关的方法。ECMAScript中涉及字符串大小写转换的方法有4个：toLowerCase()、toLocaleLowerCase()、toUpperCase()和toLocaleUpperCase()。其中，toLowerCase()和toUpperCase()是两个经典的方法，借鉴自java.lang.String 中的同名方法。而 toLocaleLowerCase()和 toLocaleUpperCase()方法则是针对特定地区的实现。对有些地区来说，针对地区的方法与其通用方法得到的结果相同，但少数语言（如土耳其语）会为 Unicode 大小写转换应用特殊的规则，这时候就必须使用针对地区的方法来保证实现正确的转换
``` js
var stringValue = "hello world";
alert(stringValue.toLocaleUpperCase()); //"HELLO WORLD"
alert(stringValue.toUpperCase()); //"HELLO WORLD"
alert(stringValue.toLocaleLowerCase()); //"hello world"
alert(stringValue.toLowerCase()); //"hello world"
```

6. 字符串的模式匹配方法
String 类型定义了几个用于在字符串中匹配模式的方法。第一个方法就是 match()，在字符串上调用这个方法，本质上与调用 RegExp 的 exec()方法相同。 match()方法只接受一个参数，要么是一个正则表达式，要么是一个 RegExp 对象。
``` js
var text = "cat, bat, sat, fat";
var pattern = /.at/;
//与 pattern.exec(text)相同
var matches = text.match(pattern);
alert(matches.index); //0
alert(matches[0]); //"cat"
alert(pattern.lastIndex); //0
```
另一个用于查找模式的方法是 search()。这个方法的唯一参数与 match()方法的参数相同：由字符串或 RegExp 对象指定的一个正则表达式。 search()方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。而且， search()方法始终是从字符串开头向后查找模式
``` js
var text = "cat, bat, sat, fat";
var pos = text.search(/at/);
alert(pos); //1
```
ECMAScript 提供了 replace()方法。这个方法接受两个参数：第一个参数可以是一个 RegExp 对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g）标志
``` js
var text = "cat, bat, sat, fat";
var result = text.replace("at", "ond");
alert(result); //"cond, bat, sat, fat"

result = text.replace(/at/g, "ond");
alert(result); //"cond, bond, sond, fond"
```
如果第二个参数是字符串，那么还可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。下表列出了 ECMAScript 提供的这些特殊的字符序列

字符序列 | 替换文本
--:|:--
$$ |$
$& |匹配整个模式的子字符串。与RegExp.lastMatch的值相同
$' |匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同
$` |匹配的子字符串之后的子字符串。与RegExp.rightContext的值相同
$n |匹配第n个捕获组的子字符串，其中n等于0～ 9。例如， $1是匹配第一个捕获组的子字符串， $2是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串
$nn |匹配第nn个捕获组的子字符串，其中nn等于01～ 99。例如， $01是匹配第一个捕获组的子字符串， $02是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串

``` js
var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g, "word ($1)");
alert(result); //word (cat), word (bat), word (sat), word (fat)
```
replace()方法的第二个参数也可以是一个函数。在只有一个匹配项（即与模式匹配的字符串）的情况下，会向这个函数传递 3 个参数：模式的匹配项、模式匹配项在字符串中的位置和原始字符串。在正则表达式中定义了多个捕获组的情况下，传递给函数的参数依次是模式的匹配项、第一个捕获组的匹配项、第二个捕获组的匹配项……，但最后两个参数仍然分别是模式的匹配项在字符串中的位置和原始字符串。这个函数应该返回一个字符串，表示应该被替换的匹配项使用函数作为 replace()方法的第二个参数可以实现更加精细的替换操作.
``` js
function htmlEscape(text){
    return text.replace(/[<>"&]/g,function(match,pos,originalText){
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt";
            case "&":
                return "&amp";
            case "\"":
                return "&quot;";
        }
    });
}
alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```
split()这个方法可以基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是一个 RegExp 对象（这个方法不会将字符串看成正则表达式）。 split()方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小
``` js
var colorText = "red,blue,green,yellow";
var colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
var colors2 = colorText.split(",", 2); //["red", "blue"]
var colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""]
```
7. localeCompare()方法
与操作字符串有关的最后一个方法是 localeCompare()，这个方法比较两个字符串，并返回下列值中的一个：
* 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（大多数情况下是-1，具体的值要视实现而定）；
* 如果字符串等于字符串参数，则返回 0；
* 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（大多数情况下是 1，具体的值同样要视实现而定）。
``` js
var stringValue = "yellow";
alert(stringValue.localeCompare("brick")); //1
alert(stringValue.localeCompare("yellow")); //0
alert(stringValue.localeCompare("zoo")); //-1
```
8. fromCharCode()方法
另外， String 构造函数本身还有一个静态方法： fromCharCode()。这个方法的任务是接收一或多个字符编码，然后将它们转换成一个字符串。
``` js
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello"
```
9. HTML 方法
早期的 Web 浏览器提供商觉察到了使用 JavaScript 动态格式化 HTML 的需求。于是，这些提供商就扩展了标准，实现了一些专门用于简化常见 HTML 格式化任务的方法。

方 法 |输出结果
--:|:--
anchor(name) |\<a name= "name"\>string\</a\>
big() |\<big\>string\</big\>
bold() |\<b\>string\</b\>
fixed() |\<tt\>string\</tt\>
fontcolor(color) |\<font color="color"\>string\</font\>
fontsize(size) |\<font size="size"\>string\</font\>
italics() |\<i\>string\</i\>
link(url) |\<a href="url"\>string\</a\>
small() |\<small\>string\</small\>
strike() |\<strike\>string\</strike\>
sub() |\<sub\>string\</sub\>
sup() |\<sup\>string\</sup\>

### 5.7单体内置对象

ECMA-262 对内置对象的定义是：“由 ECMAScript 实现提供的、不依赖于宿主环境的对象，这些对象在 ECMAScript 程序执行之前就已经存在了。ECMA-262 还定义了两个单体内置对象： Global 和 Math。

#### 5.7.1 
Global（全局）对象可以说是 ECMAScript 中最特别的一个对象了，因为不管你从什么角度上看，这个对象都是不存在的。 ECMAScript 中的 Global 对象在某种意义上是作为一个终极的“兜底儿对象”来定义的。换句话说，不属于任何其他对象的属性和方法，最终都是它的属性和方法。事实上，没有全局变量或全局函数；所有在全局作用域中定义的属性和函数，都是 Global 对象的属性。本书前面介绍过的那些函数，诸如 isNaN()、 isFinite()、 parseInt()以及 parseFloat()，实际上全都是 Global对象的方法

1. URI 编码方法
Global 对象的 encodeURI()和 encodeURIComponent()方法可以对 URI（ Uniform Resource Identifiers，通用资源标识符）进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这两个 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，从而让浏览器能够接受和理解。
encodeURI()主要用于整个 URI（例如， http://www.wrox.com/illegal value.htm），而encodeURIComponent()主要用于对 URI 中的某一段（例如前面 URI 中的 illegal value.htm）进行编码。它们的主要区别在于， encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 encodeURIComponent()则会对它发现的任何非标准字符进行编码。
``` js
var uri = "http://www.wrox.com/illegal value.htm#start";
//"http://www.wrox.com/illegal%20value.htm#start"
alert(encodeURI(uri));
//"http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start"
alert(encodeURIComponent(uri));
```
::: tip
一 般 来 说 ， 我 们 使 用 encodeURIComponent() 方 法 的 时 候 要 比 使 用encodeURI()更多，因为在实践中更常见的是对查询字符串参数而不是对基础 URI进行编码。
:::

与 encodeURI()和 encodeURIComponent()方法对应的两个方法分别是 decodeURI()和decodeURIComponent()。其中， decodeURI()只能对使用 encodeURI()替换的字符进行解码。
``` js
var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";
//http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
alert(decodeURI(uri));
//http://www.wrox.com/illegal value.htm#start
alert(decodeURIComponent(uri));
```

::: tip
URI 方法 encodeURI()、 encodeURIComponent()、 decodeURI()和 decodeURIComponent()用于替代已经被 ECMA-262第 3版废弃的 escape()和 unescape()方法。 URI 方法能够编码所有 Unicode 字符，而原来的方法只能正确地编码 ASCII 字符。因此在开发实践中，特别是在产品级的代码中，一定要使用 URI 方法， 不要使用 escape()和 unescape()方法。
:::

2. eval()方法
我们介绍最后一个——大概也是整个 ECMAScript 语言中最强大的一个方法： eval()。eval()方法就像是一个完整的 ECMAScript 解析器，它只接受一个参数，即要执行的 ECMAScript （或 JavaScript）字符串。
``` js
eval("alert('hi')");
//这行代码的作用等价于下面这行代码：
alert("hi");
```
通过 eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。
``` js
eval("var msg = 'hello world'; ");
alert(msg); //"hello world"
```
在 eval()中创建的任何变量或函数都不会被提升，因为在解析代码的时候，它们被包含在一个字符串中；它们只在 eval()执行的时候创建。
::: danger
能够解释代码字符串的能力非常强大，但也非常危险。因此在使用 eval()时必须极为谨慎，特别是在用它执行用户输入数据的情况下。否则，可能会有恶意用户输入威胁你的站点或应用程序安全的代码（即所谓的代码注入）。
:::
3. Global 对象的属性
Global 对象还包含一些属性

属 性 |说 明 |属 性 |说 明
--:|:--:|:--:|:--
undefined |特殊值undefined |Date |构造函数Date
NaN |特殊值NaN |RegExp |构造函数RegExp
Infinity |特殊值Infinity |Error |构造函数Error
Object |构造函数Object |EvalError |构造函数EvalError
Array |构造函数Array |RangeError |构造函数RangeError
Function |构造函数Function |ReferenceError |构造函数ReferenceError
Boolean |构造函数Boolean |SyntaxError |构造函数SyntaxError
String |构造函数String |TypeError |构造函数TypeError
Number |构造函数Number |URIError |构造函数URIError

ECMAScript 5 明确禁止给 undefined、 NaN 和 Infinity 赋值，这样做即使在非严格模式下也会导致错误
4. window 对象
ECMAScript 虽然没有指出如何直接访问 Global 对象，但 Web 浏览器都是将这个全局对象作为window 对象的一部分加以实现的。因此，在全局作用域中声明的所有变量和函数，就都成为了 window对象的属性。
``` js
var color = "red";
function sayColor(){
    alert(window.color);
}
window.sayColor(); //"red"
```

#### 5.7.2 Math对象
ECMAScript 还为保存数学公式和信息提供了一个公共位置，即 Math 对象。

1. Math 对象的属性
Math 对象包含的属性大都是数学计算中可能会用到的一些特殊值。
属 性 |说 明
--:|:--
Math.E |自然对数的底数，即常量e的值
Math.LN10 |10的自然对数
Math.LN2 |2的自然对数
Math.LOG2E |以2为底e的对数
Math.LOG10E |以10为底e的对数
Math.PI |π的值
Math.SQRT1_2 |1/2的平方根（即2的平方根的倒数）
Math.SQRT2 |2的平方根

2. min()和 max()方法
Math 对象还包含许多方法，用于辅助完成简单和复杂的数学计算
min()和 max()方法用于确定一组数值中的最小值和最大值。这两个方法都可以接收任意多个数值参数
``` js
var max = Math.max(3, 54, 32, 16);
alert(max); //54
var min = Math.min(3, 54, 32, 16);
alert(min); //3
```

3. 舍入方法
* Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
* Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
* Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数（这也是我们在数学课上学到的舍入规则）。
``` js
alert(Math.ceil(25.9)); //26
alert(Math.ceil(25.5)); //26
alert(Math.ceil(25.1)); //26

alert(Math.round(25.9)); //26
alert(Math.round(25.5)); //26
alert(Math.round(25.1)); //25

alert(Math.floor(25.9)); //25
alert(Math.floor(25.5)); //25
alert(Math.floor(25.1)); //25
```
4. random()方法
Math.random()方法返回大于等于 0 小于 1 的一个随机数

``` js
//产生1-10之间的数字
var num = Math.floor(Math.random() * 10 + 1);
```

5. 其他方法
Math 对象中还包含其他一些与完成各种简单或复杂计算有关的方法

方 法 |说 明 |方 法 |说 明
--:|:--:|:--:|:--
Math.abs(num) |返回num 的绝对值| Math.asin(x) |返回x 的反正弦值
Math.exp(num) |返回Math.E 的num 次幂| Math.atan(x) |返回x 的反正切值
Math.log(num) |返回num 的自然对数| Math.atan2(y,x) |返回y/x 的反正切值
Math.pow(num,power) |返回num 的power 次幂| Math.cos(x) |返回x 的余弦值
Math.sqrt(num) |返回num 的平方根| Math.sin(x) |返回x 的正弦值
Math.acos(x) |返回x 的反余弦值| Math.tan(x) |返回x 的正切值

### 5.8 小结
对象在 JavaScript 中被称为引用类型的值，而且有一些内置的引用类型可以用来创建特定的对象，现简要总结如下：
* 引用类型与传统面向对象程序设计中的类相似，但实现不同；
* Object 是一个基础类型，其他所有类型都从 Object 继承了基本的行为；
* Array 类型是一组值的有序列表，同时还提供了操作和转换这些值的功能；
* Date 类型提供了有关日期和时间的信息，包括当前日期和时间以及相关的计算功能；
* RegExp 类型是 ECMAScript 支持正则表达式的一个接口，提供了最基本的和一些高级的正则表达式功能。
函数实际上是 Function 类型的实例，因此函数也是对象；而这一点正是 JavaScript 最有特色的地方。由于函数是对象，所以函数也拥有方法，可以用来增强其行为。因为有了基本包装类型，所以 JavaScript 中的基本类型值可以被当作对象来访问。三种基本包装类型分别是： Boolean、 Number 和 String。以下是它们共同的特征：
* 每个包装类型都映射到同名的基本类型；
* 在读取模式下访问基本类型值时，就会创建对应的基本包装类型的一个对象，从而方便了数据操作；
* 操作基本类型值的语句一经执行完毕，就会立即销毁新创建的包装对象。在所有代码执行之前，作用域中就已经存在两个内置对象： Global 和 Math。在大多数 ECMAScript实现中都不能直接访问 Global 对象；不过， Web 浏览器实现了承担该角色的 window 对象。全局变量和函数都是 Global 对象的属性。 Math 对象提供了很多属性和方法，用于辅助完成复杂的数学计算任务。

















## 6.面向对象的程序设计

### 6.1 理解对象

面向对象（ Object-Oriented， OO）的语言有一个标志，那就是它们都有类的概念，而通过类可以创建任意多个具有相同属性和方法的对象。前面提到过， ECMAScript 中没有类的概念，因此它的对象也与基于类的语言中的对象有所不同。
ECMA-262 把对象定义为：“无序属性的集合，其属性可以包含基本值、对象或者函数。”严格来讲，这就相当于说对象是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。
创建自定义对象的最简单方式就是创建一个 Object 的实例，然后再为它添加属性和方法，如下所示。
``` js
var person = new Object();
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";
person.sayName = function(){
    alert(this.name);
};
```
对象字面量语法可以写成这样：
``` js
var person = {
    name:"xx",
    age:"18",
    job:"software",
    sayName:function(){
        alert(this.name);
    }
}
```
#### 6.1.1 属性类型
ECMA-262 第 5 版在定义只有内部才用的特性（ attribute）时，描述了属性（ property）的各种特征。ECMA-262 定义这些特性是为了实现 JavaScript 引擎用的，因此在 JavaScript 中不能直接访问它们。为了表示特性是内部值，该规范把它们放在了两对儿方括号中，例如[[Enumerable]]

1. 数据属性
数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有 4 个描述其行为的特性。
* [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
* [[Enumerable]]：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
* [[Writable]]：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true。
* [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined。
``` js
var person = {
    name: "Nicholas"
};
```
ECMAScript 5 的 Object.defineProperty()方法。这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。
``` js
var person = {};
Object.defineProperty(person,"name",{
    writable:false, //只读
    value:"xx"
});
alert(person.name); //xx
person.name = "xxx";
alert(person.name) //xx
//类似的规则也适用于不可配置的属性。例如：
var person = {};
Object.defineProperty(person, "name", {
    configurable: false,
    value: "Nicholas"
});
alert(person.name); //"Nicholas"
delete person.name;
alert(person.name); //"Nicholas"
```

2. 访问器属性
访问器属性不包含数据值；它们包含一对儿 getter 和 setter 函数（不过，这两个函数都不是必需的）。在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter 函数并传入新值，这个函数负责决定如何处理数据。访问器属性有如下 4 个特性。
* [[Configurable]]：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true。
* [[Enumerable]]：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为true。
* [[Get]]：在读取属性时调用的函数。默认值为 undefined。
* [[Set]]：在写入属性时调用的函数。默认值为 undefined。
``` js
var book ={
    _year:2004,
    edition:1
};

Object.defineProperty(book,"year",{
    get:function(){
        return this._year;
    },
    set:function(newvalue){
        if(newValue>2004){
            this._year = newValue;
            this.edition +=newVlaue-2004;
        }
    }
});

book.year = 2005;
alert(book.edition);
```
要创建访问器属性，一般都使用两个非标准的方法 ：__defineGetter__()和__defineSetter__()
``` js
var book = {
    _year: 2004,
    edition: 1
};
//定义访问器的旧有方法
book.__defineGetter__("year", function(){
    return this._year;
});
book.__defineSetter__("year", function(newValue){
if (newValue > 2004) {
    this._year = newValue;
    this.edition += newValue - 2004;
}
});
book.year = 2005;
alert(book.edition); //2
```


#### 6.1.2 定义多个属性
由于为对象定义多个属性的可能性很大， ECMAScript 5 又定义了一个 Object.defineProperties()方法。利用这个方法可以通过描述符一次定义多个属性。这方法接收两个对象参数：第一个对象是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应。
``` js
var book = {};
Object.defineProperties(book, {
    _year: {
        value: 2004
    },
    edition: {
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
```
支持 Object.defineProperties()方法的浏览器有 IE9+、 Firefox 4+、 Safari +、 Opera 12+和Chrome。

#### 6.1.3 读取属性的特性
使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述符。这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果是访问器属性，这个对象的属性有 configurable、 enumerable、 get 和 set；如果是数据属性，这个对象的属性有 configurable、 enumerable、 writable 和 value。
``` js
var book = {};
Object.defineProperties(book,{
    _year:{
        value:2004
    },
    edition:{
        value:
    },
    year:{
        get:function(){
            return this._year;
        }
        set:function(newValue){
            this._year = newValue;
            this.edition +=newValue-2004;
        ;}
    }
});
var descriptor = Object.definePeopertyDescriptor(book,"year");
alert(descriptor.value);        //2004
alert(descriptor.configurable); //false
alert(typeof descriptor.get); //"undefined"
var descriptor = Object.getOwnPropertyDescriptor(book, "year");
alert(descriptor.value); //undefined
alert(descriptor.enumerable); //false
alert(typeof descriptor.get); //"function"
```
对于数据属性_year， value 等于最初的值， configurable 是 false，而 get 等于 undefined。对于访问器属性 year， value 等于 undefined， enumerable 是 false，而 get 是一个指向 getter函数的指针。

###  6.2 创建对象
虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

#### 6.2.1 工厂模式
工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程。考虑到在 ECMAScript 中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节
``` js
function createPerson(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    }
    return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```
函数 createPerson()能够根据接受的参数来构建一个包含所有必要信息的 Person 对象。可以无数次地调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着 JavaScript的发展，又一个新模式出现了。

#### 6.2.2 构造函数模式
ECMAScript 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。
``` js
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
在这个例子中， Person()函数取代了 createPerson()函数。我们注意到， Person()中的代码除了与 createPerson()中相同的部分外，还存在以下不同之处：
*  没有显式地创建对象；
*  直接将属性和方法赋给了 this 对象；
*  没有 return 语句
构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
(3) 执行构造函数中的代码（为这个新对象添加属性）；
(4) 返回新对象。
在前面例子的最后， person1 和 person2 分别保存着 Person 的一个不同的实例。这两个对象都有一个 constructor（构造函数）属性，该属性指向 Person，如下所示。
``` js
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
```
对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instanceof 操作符要更可靠一些。我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 Person的实例，这一点通过 instanceof 操作符可以得到验证。
``` js
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true
```
创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式胜过工厂模式的地方。在这个例子中， person1 和 person2 之所以同时是 Object 的实例，是因为所有对象均继承自 Object.

1. 将构造函数当作函数
构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不存在定义构造函数的特殊语法。任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；而任何函数，如果不通过 new 操作符来调用，那它跟普通函数也不会有什么两样。
``` js
// 当作构造函数使用
var person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); //"Nicholas"
// 作为普通函数调用
Person("Greg", 27, "Doctor"); // 添加到 window
window.sayName(); //"Greg"
// 在另一个对象的作用域中调用
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); //"Kristen"
```
2. 构造函数的问题
构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍。在前面的例子中， person1 和 person2 都有一个名为sayName()的方法，但那两个方法不是同一个 Function 的实例。不要忘了——ECMAScript 中的函数是对象，因此每定义一个函数，也就是实例化了一个对象。从逻辑角度讲，此时的构造函数也可以这样定义。

``` js
function Person(name,age,job){
    this.name = name;
    this.job = job;
    this.age = age;
    //与声明函数在逻辑上是等价的
    this.sayName = nrw Function("alert(this.name)");    
}
```
从这个角度上来看构造函数，更容易明白每个 Person 实例都包含一个不同的 Function 实例（以显示 name 属性）的本质
``` js
alert(person1.sayName == person2.sayName); //false
```
然而，创建两个完成同样任务的 Function 实例的确没有必要；况且有 this 对象在，根本不用在执行代码前就把函数绑定到特定对象上面,通过把函数定义转移到构造函数外部来解决这个问题
``` js
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName(){
    alert(this.name);
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

#### 6.2.3 原型模式
我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中
``` js
function Person(){

}
Person.prototype.name= "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true
```
将 sayName()方法和所有属性直接添加到了 Person 的 prototype 属性中，构造函数
变成了空函数。即使如此，也仍然可以通过调用构造函数来创建新对象，而且新对象还会具有相同的属性和方法。但与构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。换句话说，person1 和 person2 访问的都是同一组属性和同一个 sayName()函数。要理解原型模式的工作原理，必须先理解 ECMAScript 中原型对象的性质

1. 理解原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个 constructor（构造函数）属性，这个属性包含一个指向 prototype 属性所在函数的指针。就拿前面的例子来说，Person.prototype. constructor 指向 Person。而通过这个构造函数，我们还可继续为原型对象添加其他属性和方法。

创建了自定义的构造函数之后，其原型对象默认只会取得 constructor 属性；至于其他方法，则都是从 Object 继承而来的。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象。

![](/iamges/frontend-JavaScript-function-prototype.jog)

图展示了 Person 构造函数、 Person 的原型属性以及 Person 现有的两个实例之间的关系。在此， Person.prototype 指向了原型对象，而Person.prototype.constructor 又指回了 Person。原型对象中除了包含 constructor 属性之外，还包括后来添加的其他属性。 Person 的每个实例——person1 和 person2 都包含一个内部属性，该属性仅仅指向了Person.prototype；换句话说，它们与构造函数没有直接的关系。此外，要格外注意的是，虽然这两个实例都不包含属性和方法，但我们却可以调用person1.sayName()。这是通过查找对象属性的过程来实现的。

如果[[Prototype]]指向调用 isPrototypeOf()方法的对象（Person.prototype），那么这个方法就返回 true，
``` js
alert(Person.prototype.isPrototypeOf(person1)); //true
alert(Person.prototype.isPrototypeOf(person2)); //true
```
ECMAScript 5 增加了一个新方法，叫 Object.getPrototypeOf()，在所有支持的实现中，这个方法返回[[Prototype]]的值
``` js
alert(Object.getPrototypeOf(person1) == Person.prototype); //true
alert(Object.getPrototypeOf(person1).name); //"Nicholas
```
可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性
``` js
function Person(){

}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "software enginner";
Person.prototype.sayName = function(){
    alert(this.name);
}
var person1 = new Person();
var person2 = new Person();

person1.name = "Greg";
alert(person1.name);  //from instance
alert(person2.name);  //form prototype
```
当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 null，也只会在实例中设置这个属性，而不会恢复其指向原型的连接。不过，使用 delete 操作符则可以完全删除实例属性，从而让我们能够重新访问原型中的属性，
``` js
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
person1.name = "Greg";
alert(person1.name); //"Greg"—— 来自实例
alert(person2.name); //"Nicholas"—— 来自原型
delete person1.name;
alert(person1.name); //"Nicholas"—— 来自原型
```
在这个修改后的例子中，我们使用 delete 操作符删除了 person1.name，之前它保存的"Greg"值屏蔽了同名的原型属性。把它删除以后，就恢复了对原型中 name 属性的连接。因此，接下来再调用person1.name 时，返回的就是原型中 name 属性的值了。
使用 hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法（不要忘了它是从 Object 继承来的）只在给定属性存在于对象实例中时，才会返回 true。

``` js
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
person1.name = "Greg";
alert(person1.name); //"Greg"—— 来自实例
alert(person1.hasOwnProperty("name")); //true
alert(person2.name); //"Nicholas"—— 来自原型
alert(person2.hasOwnProperty("name")); //false
delete person1.name;
alert(person1.name); //"Nicholas"—— 来自原型
alert(person1.hasOwnProperty("name")); //false
```
通过使用 hasOwnProperty()方法，什么时候访问的是实例属性，什么时候访问的是原型属性就一清二楚了。
![](/images/front-end-javascript-function-hasownproperty.jpg)
ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法只能用于实例属性，要取得原型属性的描述符，必须直接在原型对象上调用 Object.getOwnPropertyDescriptor()方法。

2. 原型与 in 操作符
有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时， in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中。
``` js
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person1 = new Person();
var person2 = new Person();
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
person1.name = "Greg";
alert(person1.name); //"Greg" —— 来自实例
alert(person1.hasOwnProperty("name")); //true
alert("name" in person1); //true
alert(person2.name); //"Nicholas" —— 来自原型
alert(person2.hasOwnProperty("name")); //false
alert("name" in person2); //true
delete person1.name;
alert(person1.name); //"Nicholas" —— 来自原型
alert(person1.hasOwnProperty("name")); //false
alert("name" in person1); //true
```

通用访问方法
``` js
function hasPrototypeProperty(object,name){
    return (object.hasOwnProperty(name)&&(name in object));
}
```
由于 in 操作符只要通过对象能够访问到属性就返回 true， hasOwnProperty()只在属性存在于实例中时才返回 true，因此只要 in 操作符返回 true 而 hasOwnProperty()返回 false，就可以确定属性是原型中的属性。

``` js
function Person(){
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var person = new Person();
alert(hasPrototypeProperty(person, "name")); //true
person.name = "Greg";

alert(hasPrototypeProperty(person, "name")); //false
```
在这里， name 属性先是存在于原型中，因此 hasPrototypeProperty()返回 true。当在实例中重写 name 属性后，该属性就存在于实例中了，因此 hasPrototypeProperty()返回 false。即使原型中仍然有 name 属性，但由于现在实例中也有了这个属性，因此原型中的 name 属性就用不到了
在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的（ enumerated）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。屏蔽了原型中不可枚举属性（即将[[Enumerable]]标记为 false 的属性）的实例属性也会在 for-in 循环中返回，因为根据规定，所有开发人员定义的属性都是可枚举的——只有在 IE8 及更早版本中例外。IE 早期版本的实现中存在一个 bug，即屏蔽不可枚举属性的实例属性不会出现在for-in 循环中。
``` js
var o = {
    toStirng:function(){
        retuen "My Object";
    }
}
for(var prop in o){
    if(prop == "toString"){
        alert("Found toStirng"); //在IE中不会显示
    }
}
```
要取得对象上所有可枚举的实例属性，可以使用 ECMAScript 5 的 Object.keys()方法。这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
``` js
function Person(){
}

Person.prototype.name = "Nicholas";
Perosn.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    alert(this.name);
};
var keys = Object.keys(Person.prototype);
alert(keys); //"name,age,job,sayName"

var p1 = new Person();
p1.name = "Rob";
p1.age = 31;
var p1keys = Object.keys(p1);
alert(p1keys); //"name,age"
```
变量 keys 中将保存一个数组，数组中是字符串"name"、 "age"、 "job"和"sayName"。这个顺序也是它们在 for-in 循环中出现的顺序。如果是通过 Person 的实例调用，则Object.keys()返回的数组只包含"name"和"age"这两个实例属性
得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()方法。
``` js
var keys = Object.getOwnPropertyNames(Person.prototype);
alert(keys); //"constructor,name,age,job,sayName"
```
3. 更简单的原型语法
用一个包含所有属性和方法的对象字面量来重写整个原型对象
``` js
function Person(){
}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
```
将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外： constructor 属性不再指向 Person 了。前面曾经介绍过，每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object 构造函数），不再指向 Person 函数。此时，尽管 instanceof操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了，如下所示。
``` js
var friend = new Person();
alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true
```
用 instanceof 操作符测试 Object 和 Person 仍然返回 true，但 constructor 属性则等于 Object 而不等于 Person 了
``` js
function Person(){
}
Person.prototype = {
    constructor:Person,
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
//重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});
```
4. 原型的动态性
``` js
var friend = new Person();
Person.prototype.sayHi = function(){
    alert("hi");
};
friend.sayHi(); //"hi"（没有问题！）
```
调用构造函数时会为实例添加一个指向最初原型的[[Prototype]]指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。请记住：实例中的指针仅指向原型，而不指向构造函数
``` js
function Person(){

}
var friend = new Person();
Person.prototype = {
    constructor:Person,
    name:"nicholas",
    age:29,
    job:"software engineer",
    sayName:function(){
        alert(this.name);
    }
};
friend.sayName(); //error
```
在这个例子中，我们先创建了 Person 的一个实例，然后又重写了其原型对象。然后在调用friend.sayName()时发生了错误，因为 friend 指向的原型中不包含以该名字命名的属性
![](/images/frontend-JavaScript-oop-prototypemode.jpg)
重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；它们引用的仍然是最初的原型。

5. 原生对象的原型
原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（ Object、 Array、 String，等等）都在其构造函数的原型上定义了方法
``` js
alert(typeof Array.prototype.sort); //"function"
alert(typeof String.prototype.substring); //"function"
```
通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自定义对象的原型一样修改原生对象的原型，因此可以随时添加方法。
``` js
String.prototype.startWith = function(text){
    return this.indexOf(text) ==0;
}

var msg = "Hello world";
alert(msg.startWith("Hello"));
```
6. 原型对象的问题
原型模式也不是没有缺点。首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。原型模式的最大问题是由其共享的本性所导致的
通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了

``` js
function Person(){

}

Person.prototype = {
    constructor:Person,
    name:"Nicholas",
    age:29,
    job:"software engineer",
    friends:["Shelby","Court"],
    sayName:function(){
        alert(this.name);
    }
}
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true
```
Person.prototype 对象有一个名为 friends 的属性，该属性包含一个字符串数组。然后，创建了 Person 的两个实例。接着，修改了 person1.friends 引用的数组，向数组中添加了一个字符串。由于 friends 数组存在于 Person.prototype 而非 person1 中，所以刚刚提到的修改也会通过person2.friends（与 person1.friends 指向同一个数组）反映出来。假如我们的初衷就是像这样在所有实例中共享一个数组

#### 6.2.4 组合使用构造函数模式和原型模式
创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。

``` js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
        constructor : Person,
        sayName : function(){
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```
这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。

#### 6.2.5 动态原型模式
有其他 OO 语言经验的开发人员在看到独立的构造函数和原型时，很可能会感到非常惑。动态原型模式正是致力于解决这个问题的一个方案，它把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

``` js
function Person(name, age, job){
//属性
this.name = name;
this.age = age;
this.job = job;
//方法
    if (typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            alert(this.name);
        };
    }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```
在 sayName()方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时才会执行。此后，原型已经完成初始化，不需要再做什么修改了。不过要记住，这里对原型所做的修改，能够立即在所有实例中得到反映


#### 6.2.6 寄生构造函数模式
通常，在前述的几种模式都不适用的情况下，可以使用寄生（ parasitic）构造函数模式。这种模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数。
``` js
function Person(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };
    return o;
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas"
```
Person 函数创建了一个新对象，并以相应的属性和方法初始化该对象，然后又返回了这个对象。除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时返回的值。

这个模式可以在特殊的情况下用来为对象创建构造函数
``` js
function SpecialArray(){
    //创建数组
    var values = new Array();
    //添加值
    values.push.apply(values, arguments);
    //添加方法
    values.toPipedString = function(){
    return this.join("|");
    };
    //返回数组
    return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"
```
返回的对象与构造函数或者与构造函数的原型属性之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情况下，不要使用这种模式。

#### 6.2.7 稳妥构造函数模式
道格拉斯·克罗克福德（ Douglas Crockford）发明了 JavaScript 中的稳妥对象（ durable objects）这个概念。所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序（如 Mashup程序）改动时使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用 this；二是不使用 new 操作符调用构造函数。
``` js
function Person(){
    //创建要返回的对象
    var o = new Object();

    //定义私有变量和函数

    //添加方法
    o.sayName = function(){
        alert(name);
    }
    return o;
}
```
在以这种模式创建的对象中， 除了使用 sayName()方法之外，没有其他办法访问 name 的值。可以像下面使用稳妥的 Person 构造函数。
``` js
var friend = Person("Nicholas", 29, "Software Engineer");
friend.sayName(); //"Nicholas
```
变量 friend 中保存的是一个稳妥对象，而除了调用 sayName()方法外，没有别的方式可以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境

::: tip
与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没有意义。
:::

### 6.3 继承
继承是 OO 语言中的一个最为人津津乐道的概念。许多 OO 语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。如前所述，由于函数没有签名，在 ECMAScript 中无法实现接口继承。 ECMAScript 只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

#### 6.3.1 原型链
ECMAScript 中描述了原型链的概念，并将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么，假如我们让原型对象等于另一个类型的实例，结果会怎么样呢？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。
``` js
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true
```
以上代码定义了两个类型：SuperType和SubType。每个类型分别有一个属性和一个方法。它们的主要区别是SubType继承了SuperType，而继承是通过创建SuperType的实例，并将该实例赋给SubType.prototype实现的。实现的本质是重写原型对象，代之以一个新类型的实例。换句话说，原来存在于SuperType的实例中的所有属性和方法，现在也存在于SubType.prototype中了。在确立了继承关系之后，我们给SubType.prototype添加了一个方法，这样就在继承了SuperType的属性和方法的基础上又添加了一个新方法
![](/images/frontend-JavaScript-oop-extend-prototype.jpg)

在上面的代码中，我们没有使用SubType默认提供的原型，而是给它换了一个新原型；这个新原型就是SuperType的实例。于是，新原型不仅具有作为一个SuperType的实例所拥有的全部属性和方法，而且其内部还有一个指针，指向了SuperType的原型。最终结果就是这样的：instance指向SubType的原型,SubType的原型又指向SuperType的原型。getSuperValue()方法仍然还在SuperType.prototype中，但property则位于SubType.prototype中。这是因为property是一个实例属性，而getSuperValue()则是一个原型方法。既然SubType.prototype现在是SuperType的实例，那么property当然就位于该实例中了。

通过实现原型链，本质上扩展了本章前面介绍的原型搜索机制。读者大概还记得，当以读取模式访问一个实例属性时，首先会在实例中搜索该属性。如果没有找到该属性，则会继续搜索实例的原型。在通过原型链实现继承的情况下，搜索过程就得以沿着原型链继续向上。就拿上面的例子来说，调用instance.getSuperValue()会经历三个搜索步骤：1）搜索实例；2）搜索SubType.prototype；3）搜索SuperType.prototype，最后一步才会找到该方法。在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。

1.  别忘记默认的原型
事实上，前面例子中展示的原型链还少一环。我们知道，所有引用类型默认都继承了Object，而这个继承也是通过原型链实现的。大家要记住，所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。这也正是所有自定义类型都会继承 toString()、valueOf()等默认方法的根本原因。

上面例子展示的原型链中还应该包括另外一个继承层次
![](/images/frontend-JavaScript-oop-extend-prototypechain.jpg)

SubType继承了SuperType，而SuperType继承了Object。当调用instance.toString()时，实际上调用的是保存在Object.prototype中的那个方法

2. 确定原型和实例的关系
可以通过两种方式来确定原型和实例之间的关系。第一种方式是使用 instanceof 操作符，只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回 true。
``` js
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true
```
第二种方式是使用 isPrototypeOf()方法。同样，只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型，因此 isPrototypeOf()方法也会返回 true
``` js
alert(Object.prototype,isPrototypeOf(instance));//true
alert(SuperType.prototype.isPrototype(instance));//true
alert(SubType.prototype.isPrototypeOf(instance));//true
```
3. 谨慎地定义方法
子类型有时候需要重写超类型中的某个方法，或者需要添加超类型中不存在的某个方法。但不管怎样，给原型添加方法的代码一定要放在替换原型的语句之后。
``` js
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了supertype
SubType.prototype = new SuperType():

//添加新方法
SubType.prototype.getSubValue = function(){
    return this.subproperty;
};
//重写超类型中的方法
SubType.prototype.getSuperValue = function (){
    return false;
};
var instance = new SubType();
alert(instance.getSuperValue()); //false
```
第一个方法getSubValue()被添加到了SubType中。第二个方法getSuperValue()是原型链中已经存在的一个方法，但重写这个方法将会屏蔽原来的那个方法。换句话说，当通过SubType的实例调用getSuperValue()时，调用的就是这个重新定义的方法；但通过SuperType的实例调用getSuperValue()时，还会继续调用原来的那个方法

``` js
function SuperType(){
this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
//使用字面量添加新方法，会导致上一行代码无效
SubType.prototype = {
    getSubValue : function (){
        return this.subproperty;
    },
    someOtherMethod : function (){
        return false;
    }
};
var instance = new SubType();
alert(instance.getSuperValue()); //error!
```
把 SuperType 的实例赋值给原型，紧接着又将原型替换成一个对象字面量而导致的问题。由于现在的原型包含的是一个 Object 的实例，而非 SuperType 的实例，因此我们设想中的原型链已经被切断——SubType 和 SuperType 之间已经没有关系了
4. 原型链的问题
原型链虽然很强大，可以用它来实现继承，但它也存在一些问题。其中，最主要的问题来自包含引用类型值的原型。想必大家还记得，我们前面介绍过包含引用类型值的原型属性会被所有实例共享；而这也正是为什么要在构造函数中，而不是在原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了
``` js
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
function SubType(){
}
//继承了 SuperType
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```
SuperType构造函数定义了一个colors属性，该属性包含一个数组（引用类型值）。
SuperType的每个实例都会有各自包含自己数组的colors属性。当SubType通过原型链继承了SuperType之后，SubType.prototype就变成了SuperType的一个实例，因此它也拥有了一个它自己的colors属性——就跟专门创建了一个SubType.prototype.colors属性一样。但结果是什么呢？结果是SubType的所有实例都会共享这一个colors属性。而我们对instance1.colors的修改能够通过instance2.colors反映出来，就已经充分证实了这一点

#### 6.3.2 借用构造函数
在解决原型中包含引用类型值所带来问题的过程中，开发人员开始使用一种叫做借用构造函数
（constructor stealing）的技术（有时候也叫做伪造对象或经典继承）。这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。别忘了，函数只不过是在特定环境中执行代码的对象，因此通过使用apply()和call()方法也可以在（将来）新创建的对象上执行构造函数
``` js
function SuperType(){
    this.color = ["red","blue","green"];
}
function SubType(){
    //继承了SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"
```
通过使用 call()方法（或 apply()方法也可以），我们实际上是在（未来将要）新创建的 SubType 实例的环境下调用了 SuperType 构造函数。这样一来，就会在新 SubType 对象上执行 SuperType()函数中定义的所有对象初始化代码。结果，SubType 的每个实例就都会具有自己的 colors 属性的副本了。

1. 传递参数
相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数。
``` js
function SuperType(name){
    this.name = name;
}
function SubType(){
    //继承了SuperType，同时还传递了参数
    SuperType.call(this,"Nicholas");
    //实例属性
    this.age = 29;
}
var instance = new SubType();
alert(instance.name); //"Nicholas";
alert(instance.age); //29;

```
以上代码中的 SuperType 只接受一个参数 name，该参数会直接赋给一个属性。在 SubType 构造函数内部调用 SuperType 构造函数时，实际上是为 SubType 的实例设置了 name 属性。为了确保SuperType 构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性。

2. 借用构造函数的问题
如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。考虑到这些问题，借用构造函数的技术也是很少单独使用的。

#### 6.3.3 组合继承
组合继承（ combination inheritance），有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。
``` js
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    //继承属性
    SuperType.call(this, name);
    this.age = age;
}
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```
在这个例子中， SuperType 构造函数定义了两个属性： name 和 colors。 SuperType 的原型定义了一个方法 sayName()。 SubType 构造函数在调用 SuperType 构造函数时传入了 name 参数，紧接着又定义了它自己的属性 age。然后，将 SuperType 的实例赋值给 SubType 的原型，然后又在该新原型上定义了方法 sayAge()。这样一来，就可以让两个不同的 SubType 实例既分别拥有自己属性

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，成为 JavaScript 中最常用的继承模式。而且， instanceof 和 isPrototypeOf()也能够用于识别基于组合继承创建的对象。

#### 6.3.4 原型式继承
道格拉斯·克罗克福德在2006年写了一篇文章，题为Prototypal Inheritance in JavaScript （JavaScript中的原型式继承）。在这篇文章中，他介绍了一种实现继承的方法，这种方法并没有使用严格意义上的构造函数。他的想法是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。为了达到这个目的
``` js
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```
在 object()函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲， object()对传入其中的对象执行了一次浅复制。来看下面的例子.
``` js
var Person = {
    name:"Nicholas",
    friends:["shelby","Court","Van"]
}

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```
一个对象可以作为另一个对象的基础。如果有这么一个对象的话，可以把它传递给 object()函数，然后再根据具体需求对得到的对象加以修改即可。在这个例子中，可以作为另一个对象基础的是 person 对象，于是我们把它传入到 object()函数中，然后该函数就会返回一个新对象。这个新对象将 person 作为原型，所以它的原型中就包含一个基本类型值属性和一个引用类型值属性。这意味着 person.friends 不仅属于 person 所有，而且也会被anotherPerson以及 yetAnotherPerson 共享。实际上，这就相当于又创建了 person 对象的两个副本.

ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，Object.create()与 object()方法的行为相同

``` js
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```
Object.create()方法的第二个参数与Object.defineProperties()方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。以这种方式指定的任何属性都会覆盖原型对象上的同名属性。
``` js
var person = {
    name:"Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = object.create(person,{
    name:{
        value:"Greg"
    }
});
alert(anotherPerson.name); // "Greg"
```

#### 6.3.5 寄生式继承
寄生式（parasitic）继承是与原型式继承紧密相关的一种思路，并且同样也是由克罗克福德推而广之的。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。
``` js
function createAnother(original){
    var clone = object(original); //通过调用函数创建一个新对象
    clone.sayHi = function(){     //以某种方式增强对象
        alert("hi");
    }
    return clone； //返回某个对象
}
```
在这个例子中， createAnother()函数接收了一个参数，也就是将要作为新对象基础的对象。然后，把这个对象（original）传递给 object()函数，将返回的结果赋值给 clone。再为 clone 对象添加一个新方法 sayHi()，最后返回 clone 对象。可以像下面这样来使用 createAnother()函数：
``` js
var person = {
    name:"Nicholas",
    friends:["Shelby","Court","Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```
::: tip
使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似。
:::

#### 6.3.6 寄生组合式继承
前面说过，组合继承是 JavaScript 最常用的继承模式；不过，它也有自己的不足。组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。没错，子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。
``` js
function SuperType(name){
this.name = name;
this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name); //第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); //第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```
第一次调用 SuperType 构造函数时，SubType.prototype 会得到两个属性： name 和 colors；它们都是 SuperType 的实例属性，只不过现在位于 SubType 的原型中。当调用 SubType 构造函数时，又会调用一次 SuperType 构造函数，这一次又在新对象上创建了实例属性 name 和 colors。于是，这两个属性就屏蔽了原型中的两个同名属性。
![](/images/frontend-JavaScript-oop-parasiticinheritanceexample.jpg)

有两组 name 和 colors 属性：一组在实例上，一组在 SubType 原型中。这就是调用两次 SuperType 构造函数的结果。好在我们已经找到了解决这个问题方法——寄生组合式继承。

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示
``` js
function inheritPrototype(subType,superType){
    var prototype = object(superType.prototype);  //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype;   //指定对象
}
```
inheritPrototype()函数实现了寄生组合式继承的最简单形式。这个函数接收两个参数：子类型构造函数和超类型构造函数。在函数内部，第一步是创建超类型原型的一个副本。第二步是为创建的副本添加 constructor 属性，从而弥补因重写原型而失去的默认的constructor 属性。最后一步，将新创建的对象（即副本）赋值给子类型的原型。这样，我们就可以用调用 inheritPrototype()函数的语句，去替换前面例子中为子类型原型赋值的语句
``` js
function SuperType(name){
    this.name = name;
    this.colors = ["red","green","blue"];
}
SuperType.prototype.sayName = function(){
    alert(this.name);
}

function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}
inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

### 6.4 小结

ECMAScript支持面向对象（OO）编程，但不使用类或者接口。对象可以在代码执行过程中创建和增强，因此具有动态性而非严格定义的实体。在没有类的情况下，可以采用下列模式创建对象。
*  工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来被构造函数模式所取代。
*  构造函数模式，可以创建自定义引用类型，可以像创建内置对象实例一样使用new操作符。不过，构造函数模式也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局
限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数。
*  原型模式，使用构造函数的prototype属性来指定那些应该共享的属性和方法。组合使用构造函数模式和原型模式时，使用构造函数定义实例属性，而使用原型定义共享的属性和方法。
JavaScript主要通过原型链实现继承。原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与基于类的继承很相似。
原型链的问题是对象实例共享所有继承的属性和方法，因此不适宜单独使用。解决这个问题的技术是借用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都具有自己的属性，同时还能保证只使用构造函数模式来定义类型。使用最多的继承模式是组合继承，这种模式使用原型链继承共享的属性和方法，而通过借用构造函数继承实例属性。
此外，还存在下列可供选择的继承模式。
*   原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。
*   寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率问题，可以将这个模式与组合继承一起使用。
*   寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式

## 7. 函数表达式
函数表达式是 JavaScript 中的一个既强大又容易令人困惑的特性。定义函数的方式有两种：一种是函数声明，另一种就是函数表达式。函数声明的语法是这样的。
``` js
function functionName(arg0, arg1, arg2) {
//函数体
}
```
关于函数声明，它的一个重要特征就是函数声明提升（function declaration hoisting），意思是在执行代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。
``` js
sayHi();
function sayHi(){
    alert("Hi!");
}
```
第二种创建函数的方式是使用函数表达式。函数表达式有几种不同的语法形式。下面是最常见的一种形式。
``` js
var functionName = function(arg0, arg1, arg2){
//函数体
};
```
这种形式看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量 functionName。这种情况下创建的函数叫做匿名函数（ anonymous function），因为 function 关键字后面没有标识符。（匿名函数有时候也叫拉姆达函数。）匿名函数的 name 属性是空字符串.

函数表达式与其他表达式一样，在使用前必须先赋值。以下代码会导致错误。
``` js
sayHi(); //错误：函数还不存在
var sayHi = function(){
    alert("Hi!");
};
```
### 7.1 递归
递归函数是在一个函数通过名字调用自身的情况下构成的
``` js
function factorial(num){
    if(num<1){
        return 1;
    }else{
        return num*factorial(num-1);
    }
}
```
虽然这个函数表面看来没什么问题，但下面的代码却可能导致它出错。
``` js
var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //出错！
```
arguments.callee 是一个指向正在执行的函数的指针，因此可以用它来实现对函数的递归调用
``` js
function factorial(num){
    if(num<1){
        return 1;
    }else{
        return num*arguments.callee(num-1);
    }
}
```
::: tip
通过使用 arguments.callee 代替函数名，可以确保无论怎样调用函数都不会出问题。因此，在编写递归函数时，使用 arguments.callee 总比使用函数名更保险。
但在严格模式下，不能通过脚本访问 arguments.callee，访问这个属性会导致错误。不过，可以使用命名函数表达式来达成相同的结果。
:::
``` js
var factorial = (function f(num){
    if(num<=1{
        return 1;
    }else{
        return num*f(num-1);
    })
})
```
### 7.2 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数
``` js
function createComparisonFunction(propertyName){
    return function(object1,object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1<value2){
            return -1;
        }else if(value1>value2){
            return 1;
        }else{
            return 0;
        }
    };
}
```
这两行代码访问了外部
函数中的变量 propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量 propertyName。之所以还能够访问这个变量，是因为内部函数的作用域链中包含createComparisonFunction()的作用域。

当某个函数被调用时，会创建一个执行环境（execution context）及相应的作用域链。然后，使用 arguments 和其他命名参数的值来初始化函数的活动对象（activation object）。但在作用域链中，外部函数的活动对象始终处于第二位，外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境.
``` js
function compare(value1,value2){
        if(value1<value2){
            return -1;
        }else if(value1>value2){
            return 1;
        }else{
            return 0;
        }
}

var result = compare(5,10);
```
以上代码先定义了 compare()函数，然后又在全局作用域中调用了它。当调用 compare()时，会创建一个包含 arguments、 value1 和 value2 的活动对象。全局执行环境的变量对象（包含 result和 compare）在 compare()执行环境的作用域链中则处于第二位
![](/images/frontend-JavaScript-function-Closure-scope.jpg)

后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而compare()函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建 compare()函数时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的[[Scope]]属性中。当调用 compare()函数时，会为函数创建一个执行环境，然后通过复制函数的[[Scope]]属性中的对象构建起执行环境的作用域链。此后，又有一个活动对象（在此作为变量对象使用）被创建并被推入执行环境作用域链的前端。对于这个例子中 compare()函数的执行环境而言，其作用域链中包含两个变量对象：本地活动对象和全局变量对象。显然，作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

``` js
//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
```
首先，创建的比较函数被保存在变量 compareNames 中。而通过将 compareNames 设置为等于 null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域（除了全局作用域）也都可以安全地销毁了。
![](/images/frontend-JavaScript-function-closure-scope2.jpg)

::: danger
由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多，我们建议读者只在绝对必要时再考虑使用闭包。虽然像 V8 等优化后的 JavaScript 引擎会尝试回收被闭包占用的内存，但请大家还是要慎重使用闭包。
:::

#### 7.2.1 闭包与变量

作用域链的这种配置机制引出了一个值得注意的副作用，即闭包只能取得包含函数中任何变量的最后一个值。别忘了闭包所保存的是整个变量对象，而不是某个特殊的变量
``` js
function createFunctions(){
    var result = new Array();
    for(var i=0;i<10;i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
```
这个函数会返回一个函数数组。表面上看，似乎每个函数都应该返自己的索引值，即位置0的函数返回0，位置1的函数返回1，以此类推。但实际上，每个函数都返回10。因为每个函数的作用域链中都保存着createFunctions()函数的活动对象，所以它们引用的都是同一个变量i。当createFunctions()函数返回后，变量i的值是10，此时每个函数都引用着保存变量i的同一个变量对象，所以在每个函数内部i的值都是 10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期
``` js
function createFunctions(){
    var result = new Array():
    for(var i=0;i<10;i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```
在重写了前面的 createFunctions()函数后，每个函数就会返回各自不同的索引值了。在这个版本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋给数组。这里的匿名函数有一个参数 num，也就是最终的函数要返回的值。在调用每个匿名函数时，我们传入了变量 i。由于函数参数是按值传递的，所以就会将变量 i 的当前值复制给参数 num。而在这个匿名函数内部，又创建并返回了一个访问 num 的闭包。这样一来， result 数组中的每个函数都有自己num 变量的一个副本，因此就可以返回各自不同的数值了。

#### 7.2.2 关于this对象

在闭包中使用 this 对象也可能会导致一些问题。我们知道， this 对象是在运行时基于函数的执行环境绑定的：在全局函数中， this 等于 window，而当函数被作为某个对象的方法调用时， this 等于那个对象。不过，匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。
``` js
var name = "The Window";
var object = {
    name:"My Object",
    getNameFunc:function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()());  //"The Window"（在非严格模式下）
```
以上代码先创建了一个全局变量 name，又创建了一个包含 name 属性的对象。这个对象还包含一个方法——getNameFunc()， 它返回一个匿名函数，而匿名函数又返回 this.name。 由于 getNameFunc()返回一个函数，因此调用 object.getNameFunc()()就会立即调用它返回的函数，结果就是返回一个字符串。

每个函数在被调用时都会自动取得两个特殊变量： this 和 arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量,把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了
``` js
var name = "The Window";
var object = {
    name:"My Object",
    getNameFunc:function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
alert(object.getNameFunc()()); //"My Object
```
在定义匿名函数之前， 我们把 this对象赋值给了一个名叫 that 的变量。而在定义了闭包之后，闭包也可以访问这个变量，因为它是我们在包含函数中特意声名的一个变量。即使在函数返回之后， that 也仍然引用着 object，所以调用object.getNameFunc()()就返回了"My Object"。
::: tip
this 和 arguments 也存在同样的问题。如果想访问作用域中的 arguments 对象，必须将对该对象的引用保存到另一个闭包能够访问的变量中。
:::
在几种特殊情况下， this 的值可能会意外地改变
``` js
var name = "The Window";
var object = {
    name:"My Object",
    getName:function(){
        return this.name;
    }
};
//这里的 getName()方法只简单地返回 this.name 的值。
object.getName(); //"My Object"
(object.getName)(); //"My Object"
(object.getName = object.getName)(); //"The Window"，在非严格模式下
```
第一行代码跟平常一样调用了 object.getName()，返回的是"My Object"，因为 this.name就是 object.name。第二行代码在调用这个方法前先给它加上了括号。虽然加上括号之后，就好像只是在引用一个函数，但 this 的值得到了维持，因为 object.getName 和(object.getName)的定义是相同的。第三行代码先执行了一条赋值语句，然后再调用赋值后的结果。因为这个赋值表达式的值是函数本身，所以 this 的值不能得到维持，结果就返回了"The Window"。

#### 7.2.3 内存泄露

如果闭包的作用域链中保存着一个HTML 元素，那么就意味着该元素将无法被销毁
``` js
function assignHandler(){
    var element = document.getElementById("someElement");
    element.onclick = function(){
        alert(element.id);
    };
}
```
由于匿名函数保存了一个对 assignHandler()的活动对象的引用，因此就会导致无法减少 element 的引用数。只要匿名函数存在， element 的引用数至少也是 1，因此它所占用的内存就永远不会被回收。不过，这个问题可以通过稍微改写一下代码来解决.
``` js
function assignHandler(){
    var element = document.getElementById("someElement");
    var id = element.id;

    element.click = function(){
        alert(id);
    };
}
element = null;
```

闭包会引用包含函数的整个活动对象，而其中包含着 element。即使闭包不直接引用 element，包含函数的活动对象中也仍然会保存一个引用。因此，有必要把 element 变量设置为 null。这样就能够解除对 DOM 对象的引用，顺利地减少其引用数，确保正常回收其占用的内存

### 7.3 模仿块级作用域
JavaScript 没有块级作用域的概念。这意味着在块语句中定义的变量，实际上是在包含函数中而非语句中创建的
``` js
function outputNumber(count){
    for(var i=0;i<count;i++){
        alert(i);
    }
    alert(i); //计数
}
```
块级作用域（私有作用域）声明如下：
``` js
(function(){
    //块级作用域
})()
```
以上代码定义并立即调用了一个匿名函数。将函数声明包含在一对圆括号中，表示它实际上是一个函数表达式。而紧随其后的另一对圆括号会立即调用这个函数。
``` js
function(){
//这里是块级作用域
}(); //出错！
```
这段代码会导致语法错误，是因为 JavaScript 将 function 关键字当作一个函数声明的开始，而函数声明后面不能跟圆括号。然而，函数表达式的后面可以跟圆括号。要将函数声明转换成函数表达式，只要像下面这样给它加上一对圆括号即可。
``` js
(function(){
//这里是块级作用域
})();
```
::: tip
闭包经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数。一般来说，我们都应该尽量少向全局作用域中添加变量和函数。在一个由很多开发人员共同参与的大型应用程序中，过多的全局变量和函数很容易导致命名冲突。而通过创建私有作用域，每个开发人员既可以使用自己的变量，又不必担心搞乱全局作用域。
:::

### 7.4 私有变量
JavaScript 中没有私有成员的概念；所有对象属性都是公有的，任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。
``` js
function add(num1,num2){
    var sum = num1+num2;
    return sum;
}
```
把有权访问私有变量和私有函数的公有方法称为特权方法（ privileged method）。有两种在对象上创建特权方法的方式。第一种是在构造函数中定义特权方法，基本模式如下
``` js
function MyObject(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //特权方法
    this.publicMethod = function (){
        privateVariable++;
        return privateFunction();
    };
}
```
利用私有和特权成员，可以隐藏那些不应该被直接修改的数据
``` js
function Person(name){
    this.getName = function(){
        return name;
    };

    this.setName = function(value){
        name = value;
    }
}

var person = new Person("ThreeST");
alert(person.getName()); //ThreeST
person.setName("april");
alert(person.getName()); //april
```
构造函数模式的缺点是针对每个实例都会创建同样一组新方法，而使用静态私有变量来实现特权方法就可以避免这个问题。

#### 7.4.1 静态私有变量
通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法
``` js
(function(){
    //私有变量和私有函数
    var privateVariable = 10；

    function privateFunction(){
        return false;
    }

    //构造函数
    MyObject = function(){

    };

    //公/私有方法
    MyObject.prototype.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };

})();
```
这个模式创建了一个私有作用域，在私有作用域中，首先定义了私有变量和私有函数，然后又定义了构造函数及其公有方法。公有方法是在原型上定义的，这一点体现了典型的原型模式。这个模式在定义构造函数时并没有使用函数声明，而是使用了函数表达式。函数声明只能创建局部函数，但那并不是我们想要的。出于同样的原因，我们也没有在声明 MyObject 时使用 var 关键字。
::: tip
初始化未经声明的变量，总是会创建一个全局变量。因此， MyObject 就成了一个全局变量，能够在私有作用域之外被访问到。但也要知道，在严格模式下给未经声明的变量赋值会导致错误。
:::
``` js
(function(){
    var name = "";
    Person = function(value){
        name = value;
    }

    Person.prototype.getName = function(){
        return name;
    };

    Person.prototype.setName = function(value){
        name = value;
    };
})();

var person1 = new Person("April");
alert(person1.getName()); //"April"
person1.setName("ThreeST");
alert(person1.getName()); //"ThreeST"

var person2 = new Person("CUG");
alert(person1.getName()); //"CUG"
alert(person2.getName()); //"CUG"
```
name成为了共有属性
::: tip
多查找作用域链中的一个层次，就会在一定程度上影响查找速度。而这正是使用
闭包和私有变量的一个显明的不足之处。
:::


#### 7.4.2 模块模式
前面的模式是用于为自定义类型创建私有变量和特权方法的。而道格拉斯所说的模块模式（ module pattern）则是为单例创建私有变量和特权方法。所谓单例（ singleton），指的就是只有一个实例的对象。按照惯例， JavaScript 是以对象字面量的方式来创建单例对象的
``` js
var singleton = {
    name:value,
    method:function(){
        //这里是方法的代码
    }
};
```
模块模式通过为单例添加私有变量和特权方法能够使其得到增强
``` js
var singleton = function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    return {
        publicProperty:true,
        publicMethod:function(){
            privateVariable++;
            return privateFunction();
        }
    };
}();
```
模块模式使用了一个返回对象的匿名函数。在这个匿名函数内部，首先定义了私有变量和函数。然后，将一个对象字面量作为函数的值返回。返回的对象字面量中只包含可以公开的属性和方法。这个对象是在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。从本质上来讲，这个对象字面量定义的是单例的公共接口。这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的

``` js
var application = function(){
    //私有变量和函数
    var components = new Array();
    components.push(new BaseComponent());
    //公共
    return {
        getComponentCount:function(){
            return components.length;
        },
        registerComponent:function(component){
            if(typeof component == "object"){
                components.push(component);
            }
        }
    };
}();
```
使用一个单例来管理应用程序级的信息。这个简单的例子创建了一个用于管理组件的 application 对象。在创建这个对象的过程中，首先声明了一个私有的 components数组，并向数组中添加了一个 BaseComponent 的新实例（在这里不需要关心 BaseComponent 的代码，我们只是用它来展示初始化操作）。而返回对象的 getComponentCount()和 registerComponent()方法，都是有权访问数组 components 的特权方法。前者只是返回已注册的组件数目，后者用于注册新组件。

如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式。以这种模式创建的每个单例都是 Object 的实例，因为最终要通过一个对象字面量来表示它

#### 7.4.3 增强的模块模式
即在返回对象之前加入对其增强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况

``` js
var singleton = function(){
    //私有变量和私有函数
    var privateVariable = 10;
    function privateFunction(){
        return false;
    }
    //创建对象
    var object = new CustomType();
    //添加特权/公有属性和方法
    object.publicProperty = true;
    object.publicMethod = function(){
    privateVariable++;
        return privateFunction();
    };
    //返回这个对象
    return object;
}();
```
如果前面演示模块模式的例子中的 application 对象必须是 BaseComponent 的实例
``` js
var application = function(){
    //私有变量和函数
    var components = new Array();
    //初始化
    components.push(new BaseComponent());
    //创建 application 的一个局部副本
    var app = new BaseComponent();
    //公共接口
    app.getComponentCount = function(){
        return components.length;
    };
    app.registerComponent = function(component){
    if (typeof component == "object"){
        components.push(component);
    }
    };
    //返回这个副本
    return app;
}();
```
在这个重写后的应用程序（ application）单例中，首先也是像前面例子中一样定义了私有变量。主要的不同之处在于命名变量 app 的创建过程，因为它必须是 BaseComponent 的实例。这个实例实际上是 application 对象的局部变量版。此后，我们又为 app 对象添加了能够访问私有变量的公有方法。最后一步是返回 app 对象，结果仍然是将它赋值给全局变量 application。
### 7.5 小结
在 JavaScript 编程中，函数表达式是一种非常有用的技术。使用函数表达式可以无须对函数命名，从而实现动态编程。匿名函数，也称为拉姆达函数，是一种使用 JavaScript 函数的强大方式。以下总结了函数表达式的特点。
* 函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表达式也叫做匿名函数。
* 在无法确定如何引用函数的情况下，递归函数就会变得比较复杂；
* 递归函数应该始终使用 arguments.callee 来递归地调用自身，不要使用函数名——函数名可能会发生变化。当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理如下。
* 在后台执行环境中，闭包的作用域链包含着它自己的作用域、包含函数的作用域和全局作用域。
* 通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。
* 但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。使用闭包可以在 JavaScript 中模仿块级作用域（ JavaScript 本身没有块级作用域的概念），要点如下。
* 创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。
* 结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了包含作用域（即外部作用域）中的变量。闭包还可以用于在对象中创建私有变量，相关概念和要点如下。
* 即使 JavaScript 中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。
* 有权访问私有变量的公有方法叫做特权方法。
* 可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强的模块模式来实现单例的特权方法。
JavaScript 中的函数表达式和闭包都是极其有用的特性，利用它们可以实现很多功能。不过，因为创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。


























## 9.客户端检测

### 9.1 能力检测
最常用也最为人们广泛接受的客户端检测形式是能力检测（又称特性检测）。能力检测的目标不是识别特定的浏览器，而是识别浏览器的能力。
``` js
if (object.propertyInQuestion){
//使用 object.propertyInQuestion
}
```
IE5.0 之前的版本不支持 document.getElementById()这个 DOM 方法。但可以使用document.all()
``` js
function getElement(id){
    if(document.getElementById){
        return document.getElementById(id);
    }else if(document.all){
        return document.all[id];
    }else{
        throw new Error("No way to retrieve element");
    }
}
```
将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象
每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。而我们在这里使用的语法，本质上完全重写了默认的 prototype 对象，因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object 构造函数），不再指向 Person 函数。此时，尽管 instanceof操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了
``` js
var friend = new Person();
alert(friend instanceof Object); //true
alert(friend instanceof Person); //true
alert(friend.constructor == Person); //false
alert(friend.constructor == Object); //true
```
用 instanceof 操作符测试 Object 和 Person 仍然返回 true，但 constructor 属性则等于 Object 而不等于 Person 了
``` js
function Person(){
}
Person.prototype = {
    constructor : Person,
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
//重设构造函数，只适用于 ECMAScript 5 兼容的浏览器
Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person
});
```
4. 原型的动态性
由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此。
``` js
var friend = new Person();

Person.prototype.sayHi = function(){
    alert("hi");
}
friend.sayHi(); //Hi
```




#### 9.1.1 更可靠的能力检测
能力检测对于想知道某个特性是否会按照适当方式行事（而不仅仅是某个特性存在）非常有用

``` js
//不要这样做！这不是能力检测——只检测了是否存在相应的方法
function isSortable(object){
    return !!object.sort;
}
//这样更好：检查 sort 是不是函数
function isSortable(object){
    return typeof object.sort == "function";
}
//在 IE8 及之前版本中不行
function hasCreateElement(){
    //typeof document.createElement 返回的是"object"，而不是"function"。
    return typeof document.createElement == "function";
    //IE9 纠正了这个问题，对所有 DOM 方法都返回"function"。
}
```
在浏览器环境下测试任何对象的某个特性是否存在，要使用下面这个函数
``` js
//作者： Peter Michaux
function isHostMethod(object, property) {
    var t = typeof object[property];
        return t=='function' ||
            (!!(t=='object' && object[property])) ||
            t=='unknown';
}

result = isHostMethod(xhr, "open"); //true
result = isHostMethod(xhr, "foo"); //false
```

#### 9.1.2 能力不是浏览器检测
一次性检测所有相关特性，而不要分别检测
``` js
//确定浏览器是否支持 Netscape 风格的插件
var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);
//确定浏览器是否具有 DOM1 级规定的能力
var hasDOM1 = !!(document.getElementById && document.createElement &&
document.getElementsByTagName);
```
### 9.2 怪癖检测
怪癖检测（ quirks detection）的目标是识别浏览器的特殊行为。
``` js
var hasDontEnumQuirk = function(){
    var o = { toString : function(){} };
    for (var prop in o){
        if (prop == "toString"){
            return false;
        }
    }
    return true;
}();

var hasEnumShadowsQuirk = function(){
    var o = { toString : function(){} };
    var count = 0;
    for (var prop in o){
        if (prop == "toString"){
            count++;
        }
    }
    return (count > 1);
}();
```

### 9.3 怪癖检测
用户代理检测通过检测用户代字符串来确定实际使用的浏览器。 在每一次 HTTP 请求过程中，用户代理字符串是作为响应首部发送的，
而且该字符串可以通过 JavaScript 的 navigator.userAgent 属性访问。在服务器端，通过检测用户代理字符串来确定用户使用的浏览器是一种常用而且广为接受的做法。
#### 9.3.1 UA历史
* 第一款浏览器 1993 Mosaic/0.9 美国 NCSA（ National Center for Supercomputing Applications，国家超级计算机中心）
* Mozilla (Mosaic Killer) Mozilla/版本号 [语言] (平台; 加密类型)
    * 语言：即语言代码，表示应用程序针对哪种语言设计。
    * 平台：即操作系统和（或）平台，表示应用程序的运行环境。
    * 加密类型：即安全加密的类型。可能的值有 U（ 128 位加密）、 I（ 40 位加密）和 N（未加密）。
* Netscape Navigator 和 Internet Explorer 3 1996年
    * Mozilla/版本号 (平台; 加密类型 [; 操作系统或 CPU 说明])
    * Mozilla/2.0 (compatible; MSIE 3.02; Windows 95) IE3.02
* Netscape Communicator 4 和 IE4～IE8
    * Mozilla/版本号 (平台; 加密类型 [; 操作系统或 CPU 说明])
    * Mozilla/4.79 (Win98; I)
    * Mozilla/4.0 (compatible; MSIE 版本号; 操作系统)
    * Mozilla/4.0 (compatible; MSIE 版本号; 操作系统; Trident/Trident 版本号) //IE8
* Gecko
Gecko 是 Firefox 的呈现引擎。当初的 Gecko 是作为通用 Mozilla 浏览器的一部分开发的，而第一个采用 Gecko 引擎的浏览器是 Netscape 6
   * Mozilla/Mozilla 版本号 (平台; 加密类型; 操作系统或 CPU; 语言; 预先发行版本)
Gecko/Gecko 版本号 应用程序或产品/应用程序或产品版本号
* WebKit
    * 2003 年， Apple 公司宣布要发布自己的 Web 浏览器，名字定为 Safari。 Safari 的呈现引擎叫 WebKit，是 Linux 平台中 Konqueror 浏览器的呈现引擎 KHTML 的一个分支。几年后， WebKit 独立出来成为了一个开源项目，专注于呈现引擎的开发。
* Konqueror
    * 与 KDE Linux 集成的 Konqueror，是一款基于 KHTML 开源呈现引擎的浏览器。尽管 Konqueror 只能在 Linux 中使用，但它也有数量可观的用户。为确保最大限度的兼容性， Konqueror 效仿 IE 选择了如下用户代理字符串格式：
Mozilla/5.0 (compatible; Konqueror/ 版本号; 操作系统或 CPU )
* Chrome
    * 谷歌公司的 Chrome 浏览器以 WebKit 作为呈现引擎，但使用了不同的 JavaScript 引擎。
Mozilla/5.0 ( 平台; 加密类型; 操作系统或 CPU; 语言) AppleWebKit/AppleWebKit 版本号 (KHTML,like Gecko) Chrome/ Chrome 版本号 Safari/ Safari 版本
Chrome 7 的完整的用户代理字符串如下：
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.7 (KHTML,like Gecko) Chrome/7.0.517.44 Safari/534.7
* Opera
    * 仅就用户代理字符串而言， Opera 应该是最有争议的一款浏览器了
    * Opera/ 版本号 (操作系统或 CPU; 加密类型) [语言]
Windows XP 中的 Opera 7.54 会显示下面的用户代理字符串：
    * Opera/7.54 (Windows NT 5.1; U) [en]
### 9.3.2 UA检测技术
``` js
if (ieVer >=6){
//代码
}
```
* 1.识别呈现引擎
``` js
var clent = function(){
    var engine ={
        ////呈现引擎
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体的版本号
        ver: null
    };
    //呈现平台、引擎、设备
    return {
        engine:engine
    };
}();

if(client.engine.ie){
    //针对IE的代码、
}else if(client.engine.gecko>1.5){
    if(client.engine.ver=='1.8.1'){
        //针对这个版本执行某些操作
    }
}
```
* 识别Opera
``` js
if(window.opera){
    engine.ver = window.opera.version();
    engine.opera = parseFloat(engine.ver);
}
```
* 识别WebKit
``` js
var ua = navigator.userAgent;
if (window.opera){
    engine.ver = window.opera.version();
    engine.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);
}
```
* 识别Gecko
``` js
var ua = navigator.userAgent;
if (window.opera){
    engine.ver = window.opera.version();
    engine.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);
} else if (/KHTML\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.khtml = parseFloat(engine.ver);
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);
}
```



### 9.4 小结
* 能力检测-在编写代码之前先检测特定浏览器的能力
* 怪癖检测-浏览器的
* 用户代理检测-通过检测用户代理字符串来识别浏览器

## 10 DOM
DOM（文档对象模型）是针对 HTML 和 XML 文档的一个 API（应用程序编程接口）。DOM 脱胎于
Netscape 及微软公司创始的 DHTML（动态 HTML），但现在它已经成为表现和操作页面标记的真正的跨平台、语言中立的方式。

### 10.1 节点层次 
DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。
``` html
<html>
    <head>
        <title>Smaple</title>
    </head>
    <body>
        <p>hello world</p>
    </body>
</html>
```
#### 10.1.1 Node类型
DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。这个 Node 接口在JavaScript 中是作为 Node 类型实现的；除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。
每个节点都有一个NodeType属性，用于表明节点的类型。
``` js
if(someNode.nodeType==Node.ELEMENT_NODE){ //IE 中无效
    alert("Node is an element"); 
}
if(someNode.nodeType==1){     //所以浏览器有效
    alert('Node is an element')
}
```
1. nodeName和nodeValue属性
检测元素的类型
``` js
if(someNode.nodeType == 1){
    value = someNode.nodeName;
}
```
2. 节点关系
每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。 NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。NodeList会根据dom结构变化
``` js
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
//在 IE8 及之前版本中无效
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
```
IE8及之前的的将NodeList实现为一个COM对象。因此需要转换IE中的NodeList对象为数组
``` js
function convertToArray(nodes){
    var array = null;
    try{
        array = Array.prototype.slice.call(nodes,0); // 针对非IE浏览器
    }catch(err){
        array = new Array();
        for(var i=0;len = nodes.length;i<len;i++){
            array.push(nodes[1]);
        }
    }
    return array;
}
```
每个节点都有parentNode属性，该属性指向文档树中的父节点，通过使用列表中每个节点的 previousSibling和 nextSibling 属性，可以访问同一列表中的其他节点。
``` js
if(someNode.nextSibiling===null){
    alert("Last Node in the parent's childNode list")
}else if(someNode.previousSibiling == null){
    alert("First node in the parent childNode's list")
}
```
父节点与其第一个和最后一个子节点之间也存在特殊关系。父节点的 firstChild 和 lastChild属性分别指向其 childNodes 列表中的第一个和最后一个节点。
![](/images/JavaScript-DOM-childNodes.jpg)
所有节点都有的最后一个属性是 ownerDocument，该属性指向表示整个文档的文档节点
3. 操作节点
关系指针只读
* appendChild
    * 用于向 childNodes 列表的末尾添加一个节点。添加节点后， childNodes 的新增节点、父节点及以前的最后一个子节点的关系指针都会相应地得到更新。更新完成后， appendChild()返回新增的节点。
``` js
var returnedNode = someNode.appendChild(newNode);
alert(returnedNode == newNode); //true
alert(someNode.lastChild == newNode); //true

//someNode 有多个子节点
var returnedNode = someNode.appendChild(someNode.firstChild);
alert(returnedNode == someNode.firstChild); //false
alert(returnedNode == someNode.lastChild); //true
``` 
* insertBefore
    * 这个方法接受两个参数：要插入的节点和作为参照的节点。插入节点后，被插入的节点会变成参照节点的前一个同胞节点（ previousSibling），同时被方法返回
``` js
//插入后成为最后一个子节点
returnedNode = someNode.insertBefore(newNode, null);
alert(newNode == someNode.lastChild); //true
//插入后成为第一个子节点
var returnedNode = someNode.insertBefore(newNode, someNode.firstChild);
alert(returnedNode == newNode); //true
alert(newNode == someNode.firstChild); //true
//插入到最后一个子节点前面
returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
alert(newNode == someNode.childNodes[someNode.childNodes.length-2]); //true
```
* replaceChild()
    * 方法接受的两个参数是：要插入的节点和要替换的节点。要替换的节点将由这个方法返回并从文档树中被移除，同时由要插入的节点占据其位置。
``` js
//替换第一个子节点
var returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
//替换最后一个子节点
returnedNode = someNode.replaceChild(newNode, someNode.lastChild);
```
* removeChild()方法。
    * 这个方法接受一个参数，即要移除的节点。被移除的节点将成为方法的返回值，
``` js
//移除第一个子节点
var formerFirstChild = someNode.removeChild(someNode.firstChild);
//移除最后一个子节点
var formerLastChild = someNode.removeChild(someNode.lastChild);
```
4. 其他方法
 * cloneNode
    * 用于创建调用这个方法的节点的一个完全相同的副本。 cloneNode()方法接受一个布尔值参数，表示是否执行深复制。在参数为 true的情况下，执行深复制，也就是复制节点及其整个子节点树；在参数为 false 的情况下，执行浅复制，即只复制节点本身。复制后返回的节点副本属于文档所有，但并没有为它指定父节点。除非通过 appendChild()、 insertBefore()或 replaceChild()将它添加到文档中。
``` html
<ul id="myList">
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
</ul>
```
``` js
var mylist = document.getElementById('myList')
var deepList = myList.cloneNode(true);
alert(deepList.childNodes.length); //3

var shallowList = myList.cloneNode(false);
alert(shallowList.childNodes.length); //0
```

### 10.1.2 document类型
在浏览器中， document 对象是 HTMLDocument（继承自 Document 类型）的一个实例，表示整个 HTML 页面
*  nodeType 的值为 9；
*  nodeName 的值为"#document"；
*  nodeValue 的值为 null；
*  parentNode 的值为 null；
*  ownerDocument 的值为 null；
*  其子节点可能是一个 DocumentType（最多一个）、 Element（最多一个）、 ProcessingInstruction或 Comment。
Document 类型可以表示 HTML 页面或者其他基于 XML 的文档。
1. 文档的子节点
 * documenttElement-该属性始终指向 HTML 页面中的"html"元素
 * childNodes
 ``` html
<html>
    <body>
    </body>
</html>
 ```

 ``` js
var html = document.documentElement; //取得对<html>的引用
alert(html === document.childNodes[0]); //true
alert(html === document.firstChild); //true
 ```
 Document 另一个可能的子节点是 DocumentType。
``` js
var docuemntType = document.doctype //取得对<!DOCTYPE>的引用
```

2. 文档信息
document 对象还有一些标准的 Document 对象所没有的属性。这些属性提供了 document 对象所表现的网页的一些信息。其中第一个属性就是 title
* title
``` js
//取得文档 标题
var originalTree = document.title;

//设置文档标题
document.title = "New Page title"
```
* URL 属性中包含页面完整的 URL（即地址栏中显示的 URL）， 
* domain 属性中只包含页面的域名，
* referrer属性中则保存着链接到当前页面的那个页面的 URL。
``` js
//取得完整的 URL
var url = document.URL;
//取得域名
var domain = document.domain
//获取来自原页面URL
var referrer = document.referrer
```
document.domain不能设置不包含的域
``` js
document.domain = "example.com"
docuemnt.domain = "example1.com"
```
document.domain如果先是松散 loose 的不能再设为紧绷的 tight
``` js
//假设页面为 lib.example.com
document.domain = "example.com";     //松散的
document.domain = "ftp.example.com"  //紧绷的 出错
```

3. 查找元素
* 1.getElementById()
    * 接收一个参数：要取得的元素的 ID。如果找到相应的元素则返回该元素，如果不存在带有相应 ID 的元素，则返回 null。注意，这里的 ID 必须与页面中元素的 id特性（ attribute）严格匹配，包括大小写。
``` html
<div id="myDiv">Some text</div>
```
``` js
var div = document.getElementById("myDiv");   //获取Div 在IE7及以下无用
//返回HTMLDocument对象
```
* 2.getElementsByTagName()
``` html
<img >
```

```  js
var images = document.getElementsByTagName("img");
alert(images.length); //输出图像的数量
alert(images[0].src); //输出第一个图像元素的 src 特性
alert(images.item(0).src); //输出第一个图像元素的 src 特性
```
    * namedItem() 使用这个方法可以通过元素的 name特性取得集合中的项。
``` html
<img src="myimage.gif" name="myImage">
``` 
``` js 
var myImage = images.namedItem("myItem")
```
* 3.getElementsByName - 只有 HTMLDocument 类型才有的方法
这个方法会返回带有给定 name 特性的所有元素。最常使用 getElementsByName()方法的情况是取得单选按钮；
``` js
<field>
    <legend>Which color do you prefer?</legend>
    <ul>
        <li><input type="radio" value="red" name="color" id="colorRed">
    <label for="colorRed">Red</label></li>
        <li><input type="radio" value="green" name="color" id="colorGreen">
    <label for="colorGreen">Green</label></li>
        <li><input type="radio" value="blue" name="color" id="colorBlue">
    <label for="colorBlue">Blue</label></li>
    </ul>
</field>

var radios = document.getElementssByName("color");
```
4. 特殊集合
document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象，为访问文档常用的部分提供了快捷方式
* document.anchors，包含文档中所有带 name 特性的</a>元素；
* document.applets，包含文档中所有的</applet>元素，因为不再推荐使用/applet>元素，
所以这个集合已经不建议使用了；
* document.forms， 包含文档中所有的</form>元素， 与 document.getElementsByTagName("form")
得到的结果相同；
* document.images，包含文档中所有的</img>元素，与 document.getElementsByTagName
("img")得到的结果相同；
* document.links，包含文档中所有带 href 特性的</a>元素。

5. DOM一致性检测
 document.implementation 属性就是为此提供相应信息和功能的对象，与浏览器对 DOM 的实现直接对应。 DOM1 级只为 document.implementation 规定了一个方法，即 hasFeature()

 ``` js
var hasXmlDom = document.implementation.hasFeature("XML", "1.0");
 ```
 6. 文档写入
   * write 
     * 原样写入
   * writeln
     * 在文档末尾添加 换行符 \n
   * open
   * close

   ``` js
<html>
    <head>
        <title>document.write() Example 2</title>
    </head>
    <body>
        <script type="text/javascript">
            document.write("<script type=\"text/javascript\" src=\"file.js\">" +
            "<\/script>");   //避免<script>被解释为与外部的<script>标签匹配 加入转义字符
        </script>
    </body>
</html>
   ```

#### 10.1.3 Element类型
Element 类型用于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问
*  nodeType 的值为 1；
*  nodeName 的值为元素的标签名；
*  nodeValue 的值为 null；
*  parentNode 可能是 Document 或 Element；
*  其子节点可能是 Element、 Text、 Comment、 ProcessingInstruction、 CDATASection 或
EntityReference。
``` html
<div id="myDiv"></div>
```

``` js
var div = document.getElementById("myDiv");
alert(div.tagName); //"DIV" 大写
alert(div.tagName == div.nodeName); //true
```
1. HTML元素
HTMLElement 类型直接继承自 Element 并添加了一些属性。添加的这些属性分别对应于每个 HTML元素中都存在的下列标准特性。
* id，元素在文档中的唯一标识符。
* title，有关元素的附加说明信息，一般通过工具提示条显示出来。
* lang，元素内容的语言代码，很少使用。
* dir，语言的方向，值为"ltr"（ left-to-right，从左至右）或"rtl"（ right-to-left，从右至左），也很少使用。
* className，与元素的 class 特性对应，即为元素指定的 CSS 类。
``` html
<div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
```

``` js
var div = document.getElementById("myDiv");
alert(div.id); //"myDiv""
alert(div.className); //"bd"
alert(div.title); //"Body text"
alert(div.lang); //"en"
alert(div.dir); //"ltr"
```
2. 取得特性
每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。操作特性的DOM 方法主要有三个，分别是 getAttribute()、 setAttribute()和 removeAttribute()
``` js
var div = document.getElementById("myDiv");
alert(div.getAttribute("id")); //"myDiv"
alert(div.getAttribute("class")); //"bd"
alert(div.getAttribute("title")); //"Body text"
alert(div.getAttribute("lang")); //"en"
alert(div.getAttribute("dir")); //"ltr"
```
3. 设置特性
与 getAttribute()对应的方法是 setAttribute()，这个方法接受两个参数：要设置的特性名和值。如果特性已经存在，setAttribute()会以指定的值替换现有的值；如果特性不存在， setAttribute()则创建该属性并设置相应的值。
``` js
div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");
div.setAttribute("title", "Some other text");
div.setAttribute("lang","fr");
div.setAttribute("dir", "rtl");
```

 removeAttribute()，这个方法用于彻底删除元素的特性。调用这个方法不仅会清除特性的值，而且也会从元素中完全删除特性
 ``` js
div.removeAttribute("class");
 ```
 4.  attributes属性
 Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。 attributes 属性中包含一个NamedNodeMap，与NodeList 类似，也是一个“动态”的集合
 ``` js
* getNamedItem(name)：返回 nodeName 属性等于 name 的节点；
* removeNamedItem(name)：从列表中移除 nodeName 属性等于 name 的节点；
* setNamedItem(node)：向列表中添加节点，以节点的 nodeName 属性为索引；
* item(pos)：返回位于数字 pos 位置处的节点。
///要取得元素的 id 特性，可以使用以下代码。
var id = element.attributes.getNamedItem("id").nodeValue;
//将其 nodeValue 设置为新值
element.getAttributes["id"].nodeValue = "someOtherId";
//setNamedItem()这个方法可以为元素添加一个新特性
element.attributes.setNamedItem(newAttr);
 ```
遍历元素
``` js
function outputAttributes(element){
    var pairs = new Array(),
    attrName,
    attrValue,
    i,
    len;
    for(i=0;len=element.attributes.length;i<len;i++){
        attrName = element.attribute[i].nodeName;
        attrValue = element.attribute[i].nodeValue;
        pairs.push(attrName+"=\"+attrValue+"\");
    }
    return pairs.join(" ");
}
```
只返回特定的元素
``` js
function outputAttribute(element){
    var pairs = new Array(),
    attrName,
    attrValue,
    i,
    len;
    for(i=0;len=element.attributes.length;i<len;i++){
        attrName = element.attribute[i].nodeName;
        attrValue = element.attribute[i].nodeValue;
        if(element.attributes[i].specified){
            pairs.push(attrName+"=\"+attrValue+"\");
        }
    }
    return pairs.join(" ");
}
```
5. 创建元素
使用 document.createElement()方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。这个标签名在 HTML 文档中不区分大小写，而在 XML（包括 XHTML）文档中，则是区分大小写的。
``` js
var div = document.createElement("div");
div.id = "myNewDiv";
div.className = "box";
```
要把新元素添加到文档树，可以使用 appendChild()、 insertBefore()或 replaceChild()方法。
``` js
document.body.appendChild(div);
//使用 createElement()，即为这个方法传入完整的元素标签，也可以包含属性
var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >");
```
<=IE7时 创建某些元素
* 动态设置iframe的name特性
* 不能通过表单的reset()方法重设动态创建input元素
* 动态创建type特性值为reset的button元素
* 创建一批name相同的按钮
``` js
if (client.browser.ie && client.browser.ie <=7){
    //创建一个带 name 特性的 iframe 元素
    var iframe = document.createElement("<iframe name=\"myframe\"></iframe>");
    //创建 input 元素
    var input = document.createElement("<input type=\"checkbox\">");
    //创建 button 元素
    var button = document.createElement("<button type=\"reset\"></button>");
    //创建单选按钮
    var radio1 = document.createElement("<input type=\"radio\" name=\"choice\" "＋"value=\"1\">");
    var radio2 = document.createElement("<input type=\"radio\" name=\"choice\" "＋"value=\"2\">");
}
```
6. 元素的子节点
元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的childNodes属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。
``` js
<ul id="myList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

for(var i=0,len=element.childNodes.length;i<len;i++){
    if(element.childNodes[i].nodeType==1){
        //执行某些操作
    }
}

var ul = document.getElementById("myList");
var items = ul.getElementsByTagName("li");
```
#### 10.1.4 text类型
 Text 节点具有以下特征：
* nodeType 的值为 3；
* nodeName 的值为"#text"；
* nodeValue 的值为节点所包含的文本；
* parentNode 是一个 Element；
* 不支持（没有）子节点
nodeValue修改
* appendData(text)：将 text 添加到节点的末尾。
* deleteData(offset, count)：从 offset 指定的位置开始删除 count 个字符。
* insertData(offset, text)：在 offset 指定的位置插入 text。
* replaceData(offset, count, text)：用 text 替换从 offset 指定的位置开始到 offset+
count 为止处的文本。
* splitText(offset)：从 offset 指定的位置将当前文本节点分成两个文本节点。
* substringData(offset, count)：提取从 offset 指定的位置开始到 offset+count 为止处的字符串。
1. 创建文本节点
可以使用 document.createTextNode()创建新文本节点，这个方法接受一个参数——要插入节点中的文本
``` js
var textNode = document.createTextNode("<strong>Hello</strong> world!");
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
document.body.appendChild(element);
//包含多个文本节点
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world");
element.appendCild(textNode);

var anotherTextNode = document.createTextNode("Yippeee");
element.body.appendChild(element);
```
2. 规范化文本节点
这个方法是由 Node 类型定义的（因而在所有节点类型中都存在），名叫 normalize()
``` js
var element = document.createElement("div");
element.className = "message";

var textNode = document.createTextNode("Hello world");
element.appendChild(textNode);

var anotherTextNode = document.createTextNode("Yippee!");
element.appendChild(anotherTextNode);

document.body.appendChild(element);
alert(element.childNodes.length); //2

element.normalize();
alert(element.childNodes.length); //1
alert(element.firstChild.nodeValue); // "Hello world!Yippee!"
```
3. 分割文本节点
Text 类型提供了一个作用与 normalize()相反的方法： splitText()。这个方法会将一个文本节点分成两个文本节点，即按照指定的位置分割 nodeValue 值。
``` js
var element = document.createElement("div");
element.className = "message";
var textNode = document.createTextNode("Hello world!");
element.appendChild(textNode);
document.body.appendChild(element);
var newNode = element.firstChild.splitText(5);
alert(element.firstChild.nodeValue); //"Hello"
alert(newNode.nodeValue); //" world!"
alert(element.childNodes.length); //2
```

#### 10.1.5 Comment类型
注释在 DOM 中是通过 Comment 类型来表示的。 Comment 节点具有下列特征：
* nodeType 的值为 8；
* nodeName 的值为"#comment"；
* nodeValue 的值是注释的内容；
* parentNode 可能是 Document 或 Element；
* 不支持（没有）子节点
``` js
<div id="myDiv"><!--A comment --></div>

var div = document.getElementById("myDiv");
var comment = div.firstChild;
alert(comment.data); //"A comment"

var comment = document.createComment("A comment ");
```

#### 10.1.6 CDATASection类型
CDATASection 类型只针对基于 XML 的文档，表示的是 CDATA 区域。
* nodeType 的值为 4；
* nodeName 的值为"#cdata-section"；
* nodeValue 的值是 CDATA 区域中的内容；
* parentNode 可能是 Document 或 Element；
* 不支持（没有）子节点。
CDATA 区域只会出现在 XML 文档中，因此多数浏览器都会把 CDATA 区域错误地解析为 Comment或 Element。以下面的代码为例：
``` html
<div id="myDiv"><![CDATA[This is some content.]]></div>
```
#### 10.1.7 DocumentType类型
它具有下列特征：
* nodeType 的值为 10；
* nodeName 的值为 doctype 的名称；
* nodeValue 的值为 null；
* parentNode 是 Document；
* 不支持（没有）子节点。
严格型 HTML4.01 的文档类型声明为例：
``` html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
DocumentType 的 name 属性中保存的就是"HTML"：
```
``` js
alert(document.doctype.name); //"HTML"
```
#### 10.1.8 DocumentFragment类型
DocumentFragment 节点具有下列特征：
* nodeType 的值为 11；
* nodeName 的值为"#document-fragment"；
* nodeValue 的值为 null；
* parentNode 的值为 null；
* 子节点可以是 Element、 ProcessingInstruction、 Comment、 Text、 CDATASection 或EntityReference。
* 创建文档片段
```html
<ul id="myList"></ul>
```

``` js
var fragment = document.createDocumentFragment();
var ul = document.getElementById("myList");
var li = null;
for (var i=0; i < 3; i++){
li = document.createElement("li");
li.appendChild(document.createTextNode("Item " + (i+1)));
fragment.appendChild(li);
}
ul.appendChild(fragment);
```

#### 10.1.9 Attr类型
特性节点具有下列特征：
* nodeType 的值为 2；
* nodeName 的值是特性的名称；
* nodeValue 的值是特性的值；
* parentNode 的值为 null；
* 在 HTML 中不支持（没有）子节点；
* 在 XML 中子节点可以是 Text 或 EntityReference。

要为元素添加 align 特性，可以使用下列代码：
``` js
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
alert(element.attributes["align"].value); //"left"
alert(element.getAttributeNode("align").value); //"left"
alert(element.getAttribute("align")); //"left"
```

### 10.2 DOM操作技术

#### 10.2.1 动态脚本
- 使用\<script\>元素可以向页面中插入 JavaScript 代码
* 一种方式是通过其 src 特性包含外部文件
* 另一种方式就是用这个元素本身来包含代码。
``` js
<sript type="text/javascript" src="client.js"></script>

var script = document.createElement("script");
script.type = "text/javascript";
script.scr="client.js";
document.body.appendChild(script);
```
封装加载脚本的函数
``` js
function loadScript(){
    var script = document.createElement("script");
    script.type = "text/script";
    script.src = url;
    document.appendChildd(script);
}
```
* 行内JavaScript代码
``` html
<script type ="text/javascript">
    function sayHi(){
        alert("hi")
    }
</script>
```
大多数浏览器可以使用如下代码实现上述代码
``` js
var script = document.createElement("script");
script.type = "text/javascript";
script.appendChild(document.createTextNode("function sayHi(){alert('hi');}"));
document.body.appendChild(script);
```
IE下可以使用如下代码:IE 将\<script\>视为一个特殊的元素，不允许 DOM 访问其子节点
``` js
var script = document.createElement("script");
script.type = "text/javascript";
script.text = "function sayHi(){alert('hi');}";
document.body.appendChild(script);
```
最后总的代码如下:
``` js
function loadScriptString(code){
var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
        document.body.appendChild(script);
}
//下面是调用这个函数的示例：
loadScriptString("function sayHi(){alert('hi');}");
```

### 10.2.1 动态样式
能够把 CSS 样式包含到 HTML 页面中的元素有两个。其中， \<link\>元素用于包含来自外部的文件，而\<style\>元素用于指定嵌入的样式。与动态脚本类似，所谓动态样式是指在页面刚加载时不存在的样式；动态样式是在页面加载完成后动态添加到页面中的。
``` html
<link rel="stylesheet" type="text/css" href="styles.css">
```

使用 DOM 代码可以很容易地动态创建出这个元素：
``` js
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "style.css";
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);
```
加载style元素
``` js
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
```
* 内部样式
``` html
<style type="text/css">
body {
    background-color: red;
}
</style>
```
style和script类型，用一下函数解决
``` js
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    }catch{
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagNames("head")[0];
    head.appendChild(style);
    }
```

#### 10.2.3 操作表格
\<table\>元素是 HTML 中最复杂的结构之一。要想创建表格，一般都必须涉及表示表格行、 单元格、表头等方面的标签。
``` html
<table>
    <tbody>
        <tr>
            <td>Cell 1,1</td>
            <td>Cell 1,2</td>
        </tr>
        <tr>
            <td>Cell 2,1</td>
            <td>Cell 2,2</td>
        </tr>
    </tbody>
</table>
```
``` js
//创建 table
var table = document.createElement("table");
table.border = 1;
table.width = "100%";
//创建 tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);
//创建第一行
var row1 = document.createElement("tr");
tbody.appendChild(row1);
var cell1_1 = document.createElement("td");
cell1_1.appendChild(document.createTextNode("Cell 1,1"));
row1.appendChild(cell1_1);
var cell2_1 = document.createElement("td");
cell2_1.appendChild(document.createTextNode("Cell 2,1"));
row1.appendChild(cell2_1);
//创建第二行
var row2 = document.createElement("tr");
tbody.appendChild(row2);
var cell1_2 = document.createElement("td");
cell1_2.appendChild(document.createTextNode("Cell 1,2"));
row2.appendChild(cell1_2);
var cell2_2= document.createElement("td");
cell2_2.appendChild(document.createTextNode("Cell 2,2"));
row2.appendChild(cell2_2);
//将表格添加到文档主体中
document.body.appendChild(table);
```
重写代码
``` js
//创建 table
var table = document.createElement("table");
table.border = 1;
table.width = "100%";
//创建 tbody
var tbody = document.createElement("tbody");
table.appendChild(tbody);
//创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"));
//创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"));
//将表格添加到文档主体中
document.body.appendChild(table);
```

#### 10.2.4 使用NodeList
所有 NodeList 对象都是在访问 DOM 文档时实时运行的查询。
``` js
var divs = document.getElementsByTagName("div"),
    i,
    len,
    div;
    for(i=0,len=divs.length;i<len;i++){
        div = document.createElement("div");
        document.body.appendChild(div);
    }
```
一般来说，应该尽量减少访问 NodeList 的次数。因为每次访问 NodeList，都会运行一次基于文档的查询。所以，可以考虑将从 NodeList 中取得的值缓存起来。

### 10.3
DOM 是语言中立的 API，用于访问和操作 HTML 和 XML 文档。 DOM1 级将 HTML 和 XML 文档形象地看作一个层次化的节点树，可以使用 JavaScript 来操作这个节点树，进而改变底层文档的外观和结构。
DOM 由各种节点构成，简要总结如下。
* 最基本的节点类型是 Node，用于抽象地表示文档中一个独立的部分；所有其他类型都继承自
Node。
* Document 类型表示整个文档，是一组分层节点的根节点。在 JavaScript 中， document 对象是
Document 的一个实例。使用 document 对象，有很多种方式可以查询和取得节点。
* Element 节点表示文档中的所有 HTML 或 XML 元素，可以用来操作这些元素的内容和特性。
* 另外还有一些节点类型，分别表示文本内容、注释、文档类型、 CDATA 区域和文档片段。
::: danger
减少dom操作
:::

## 11 DOM扩展
内容
* 理解 Selectors API
* 使用 HTML5 DOM 扩展
* 了解专有的 DOM 扩展

### 11.1 选择符API
Selectors API（ www.w3.org/TR/selectors-api/）是由 W3C 发起制定的一个标准，致力于让浏览器原生支持 CSS 查询。所有实现这一功能的 JavaScript 库都会写一个基础的 CSS 解析器，然后再使用已有的DOM 方法查询文档并找到匹配的节点。核心方法
* querySelector
* querySelectorAll

#### 11.1.1 querySelector()方法
querySelector()方法接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null。
``` js
//取得 body 元素
var body = document.querySelector("body");
//取得 ID 为"myDiv"的元素
var myDiv = document.querySelector("#myDiv");
//取得类为"selected"的第一个元素
var selected = document.querySelector(".selected");
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");
```
通过 Document 类型调用 querySelector()方法时，会在文档元素的范围内查找匹配的元素。而通过 Element 类型调用 querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。

#### 11.1.2 querySelector()方法
querySelector和querySelectorAll之间传递的参数类型，但是querySelectorAll返回的是包含属性和方法的NodeList实例。
``` js
//取得某<div>中的所有<em>元素（类似于 getElementsByTagName("em")）
var ems = document.getElementById("myDiv").querySelectorAll("em");
//取得类为"selected"的所有元素
var selecteds = document.querySelectorAll(".selected");
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll("p strong");

var i,len,strong;
for(i=0,len=strong.length;i<len;i++){
    strong = strongs[i];//或者strongs.item(i)
    strong.className = "important"
}
```

#### 11.1.3matchesSelector()方法
接收一个参数，即 CSS 选择符，如果调用元素与该选择符匹配，返回 true；否则，返回 false。
``` js
if (document.body.matchesSelector("body.page1")){
    //true
}

function matchesSelector(element, selector){
if (element.matchesSelector){
    return element.matchesSelector(selector);
} else if (element.msMatchesSelector){
    return element.msMatchesSelector(selector);
} else if (element.mozMatchesSelector){
    return element.mozMatchesSelector(selector);
} else if (element.webkitMatchesSelector){
    return element.webkitMatchesSelector(selector);
} else {
throw new Error("Not supported.");
}
}
if (matchesSelector(document.body, "body.page1")){
//执行操作
}
```

### 11.2 元素遍历
ElementTraversal规范为DOM添加了一下5个属性：
* childElementCount：返回子元素（不包括文本节点和注释）的个数。
* firstElementChild：指向第一个子元素； firstChild 的元素版。
* lastElementChild：指向最后一个子元素； lastChild 的元素版。
* previousElementSibling：指向前一个同辈元素； previousSibling 的元素版。
* nextElementSibling：指向后一个同辈元素； nextSibling 的元素版。
``` js
var i,len,child = element.firstChild;
while(child != element.lastChild){
    if (child.nodeType == 1){ //检查是不是元素
        processChild(child);
    }
    child = child.nextSibling;
}

//而使用 Element Traversal 新增的元素，代码会更简洁。
var i,
    len,
    child = element.firstElementChild;
while(child != element.lastElementChild){
    processChild(child); //已知其是元素
    child = child.nextElementSibling;
}
```

### 11.3 HTML5
对于传统 HTML 而言， HTML5 是一个叛逆。所有之前的版本对 JavaScript 接口的描述都不过三言两语，主要篇幅都用于定义标记，与 JavaScript 相关的内容一概交由 DOM 规范去定义。
而 HTML5 规范则围绕如何使用新增标记定义了大量 JavaScript API。其中一些 API 与 DOM 重叠，定义了浏览器应该支持的 DOM 扩展。

#### 11.3.1 与类有关的扩充

1. getElementsByClassName()方法
HTML5 添加的 getElementsByClassName()方法是最受人欢迎的一个方法，可以通过 document对象及所有 HTML 元素调用该方法。这个方法最早出现在 JavaScript 库中，是通过既有的 DOM 功能实现的，而原生的实现具有极大的性能优势
``` js
//取得所有类中包含"username"和"current"的元素，类名的先后顺序无所谓
var allCurrentUsernames = document.getElementsByClassName("username current");
//取得 ID 为"myDiv"的元素中带有类名"selected"的所有元素
var selected = document.getElementById("myDiv").getElementsByClassName("selected");
```
2. classList 属性
在操作类名时，需要通过 className 属性添加、删除和替换类名。因为 className 中是一个字符串，所以即使只修改字符串一部分，也必须每次都设置整个字符串的值。
``` js
<div class="bd user disabled">...</div>

//首先，取得类名字符串并拆分成数组
var classNames = div.className.split("/\s+/");

//找到要删的类名
var pos = -1,
    i,
    len;
    for(i = 0;len;className.length;i<len;i++){
        if(className[i]=="user"){
            pos = i;
            break;
        }
    }
//删除类名
classNames.splice(i,1);
//把剩下的类名拼成字符串并重新设置
div.className = classNames.join(" ");
```
HTML5 新增了一种操作类名的方式，可以让操作更简单也更安全，那就是为所有元素添加classList 属性。这个 classList 属性是新集合类型 DOMTokenList 的实例:

* add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
* contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回false。
* remove(value)：从列表中删除给定的字符串。
* toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。
这样，前面那么多行代码用下面这一行代码就可以代替了：
``` js
div.classList.remove("user");

//删除"disabled"类
div.classList.remove("disabled");
//添加"current"类
div.classList.add("current");
//切换"user"类
div.classList.toggle("user");
//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){
//执行操作
)
//迭代类名
for (var i=0, len=div.classList.length; i < len; i++){
    doSomething(div.classList[i]);
}
```

#### 11.3.2 焦点管理
HTML5 也添加了辅助管理 DOM 焦点的功能。首先就是 document.activeElement 属性，这个
属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入（通常是通过按 Tab 键）和在代码中调用 focus()方法
``` js
var button = document.getElementById("myButton");
button.focus();
alert(docuemnt.activeElement===button);  //true
//文档加载完成 document.activeElement保存的是document.body元素的引用
//文档加载期间 document。activeElement值为null
```
增加了document.hasFocus，用于确定文档是否获得焦点
``` js
var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus()); //true
```

####  11.3.3HTMLDocument变化
HTML5 扩展了 HTMLDocument，增加了新的功能。与 HTML5 中新增的其他 DOM 扩展类似，这些变化同样基于那些已经得到很多浏览器完美支持的专有扩展。
1. readyState属性
IE4 最早为 document 对象引入了 readyState 属性。然后，其他浏览器也都陆续添加这个属性，最终 HTML5 把这个属性纳入了标准当中。

* loading，正在加载文档；
* complete，已经加载完文档
``` js
if(document.readyState=="complete"){
    //执行操作
}
```
2. 兼容模式
IE6开始区分页面渲染模式，标准模式/混杂模式 compatMode
``` js
if (document.compatMode == "CSS1Compat"){
    alert("Standards mode");
} else {
    alert("Quirks mode");
}
```
3. head属性
HTML5 新增了 document.head 属性，引用文档的/<head/>元素。
``` js
var head = document.head || document.getElementsByTagName("head")[0];
```

#### 11.3.4 字符集属性
``` js
alert(document.charset); //UTF-16
document.charset = "UTF-8";
```
另一个属性是 defaultCharset，表示根据默认浏览器及操作系统的设置，当前文档默认的字符集应该是什么
```  js
if(document.charset!=document.defaultCharset){
    alert("custom charset set being used")
}
```
#### 11.3.5 自定义数据属性
HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-，目的是为元素提供与渲染无关的信息，或者提供语义信息。
``` js
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```
添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值。 dataset 属性的值是 DOMStringMap 的一个实例，也就是一个名值对儿的映射。
``` js
//本例中使用的方法仅用于演示
var div = document.getElementById("myDiv");
//取得自定义属性的值
var appId = div.dataset.appId;
var myName = div.dataset.myname;
//设置值
div.dataset.appId = 23456;
div.dataset.myname = "Michael";
//有没有"myname"值呢？
if (div.dataset.myname){
    alert("Hello,"+div.dataset.myname);
}
```

#### 11.3.6 插入标记

1. innerHTML
在读模式下， innerHTML 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标记。在写模式下， innerHTML 会根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全替换调用元素原先的所有子节点。
``` js
<div id="content">
<p>This is a <strong>paragraph</strong> with a list following it.</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>
```
上面div的innerHTML返回如下：
``` html
<p>This is a <strong>paragraph</strong> with a list following it.</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
```
2. outerHTML属性
在读模式下， outerHTML 返回调用它的元素及所有子节点的 HTML 标签。 在写模式下， outerHTML会根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替换调用元素
``` js
div.outerHTML = "<p>This is a paragraph.</p>";
//这行代码完成的操作与下面这些 DOM 脚本代码一样：
var p = document.createElement("p");
p.appendChild(document.createTextNode("This is a paragraph."));
div.parentNode.replaceChild(p, div);
```
3. insertAdjacentHTML()方法
插入标记的最后一个新增方式是 insertAdjacentHTML()方法。这个方法最早也是在IE中出现的，它接收两个参数：插入位置和要插入的 HTML 文本。
* "beforebegin"，在当前元素之前插入一个紧邻的同辈元素；
* "afterbegin"， 在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
* "beforeend"， 在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；
* "afterend"，在当前元素之后插入一个紧邻的同辈元素。
``` js
//作为前一个同辈元素插入
element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");
//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");
```
4. 内存与性能问题
在删除带有事件处理程序或引用了其他 JavaScript 对象子树时，就有可能导致内存占用问题。假设某个元素有一个事件处理程序（或者引用了一个 JavaScript 对象作为属性），在使用前述某个属性将该元素从文档树中删除后，元素与事件处理程序（或 JavaScript 对象）之间的绑定关系在内存中并没有一并删除。如果这种情况频繁出现，页面占用的内存数量就会明显增加。因此，在使用 innerHTML、outerHTML 属性和 insertAdjacentHTML()方法时，最好先手工删除要被替换的元素的所有事件处理程序和 JavaScript 对象属性。
效率低的方法：
``` js
for(var i=0,len = values.length;i<len;i++){
    ul.innerHTML +="<li>"+values[i]+"</li>";//避免此种操作
}
```
改进效率后的办法：
``` js
var itemsHTML = "";
for(var i=0,len = values.length;i<len;i++){
    itemHTML +="<li>"+values[i]+"</li>";
}
ul.innerHTML = itemsHTML;
```

#### 11.3.7 scrollIntoView
scrollIntoView()可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用
元素就可以出现在视口中。如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入 false 作为参数，调用元素会尽可能全部出现在视口中.
``` js
//让元素可见
document.forms[0].scrollIntoView();
```
### 11.4 专有扩展

#### 11.4.1 文档标准
IE8 引入了一个新的概念叫“文档模式”（ document mode）。
* IE5：以混杂模式渲染页面（ IE5 的默认模式就是混杂模式）。 IE8 及更高版本中的新功能都无法使用。
* IE7：以 IE7 标准模式渲染页面。 IE8 及更高版本中的新功能都无法使用。
* IE8：以 IE8 标准模式渲染页面。 IE8 中的新功能都可以使用，因此可以使用 Selectors API、更多CSS2 级选择符和某些 CSS3 功能，还有一些 HTML5 的功能。不过 IE9 中的新功能无法使用。
* IE9：以 IE9 标准模式渲染页面。 IE9 中的新功能都可以使用，比如 ECMAScript 5、完整的 CSS3以及更多 HTML5 功能。这个文档模式是最高级的模式。

#### 11.4.2 children属性
这个属性是 HTMLCollection 的实例，只包含元素中同样还是元素的子节点。

#### 11.4.3 contains方法
IE 为此率先引入了 contains()
方法，以便不通过在 DOM 文档树中查找即可获得这个信息。调用 contains()方法的应该是祖先节点，也就是搜索开始的节点，这个方法接收一个参数，即要检测的后代节点。
``` js
alert(document.documentElement.contains(document.body)); //true
```
使用 DOM Level 3 compareDocumentPosition()也能够确定节点间的关系。
``` js
function contains(refNode,otherNode){
    if(typeof refNode.contains == "function"&&(!client.engine.webkit||client.engine.webkit>=522)){
        return ref.contains(otherNode);
    }else if(typeof refNode.compareDocumentPosition == "function"){
        return !!(refNode.compareDocumentPosition(otherNode)&16);
    }else{
        var node = otherNode.parentNode;
        do{
            if(node === refNode){
                return true;
            }else{
                ndoe = node.parentNode;
            }
        }while(node!==null);
        return false;
    }
}
```
#### 11.4.4 插入文本
1. innerText属性
通过 innertText 属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。在通过innerText 读取值时，它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。在通过innerText 写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点。
``` html
<div id="content">
    <p>This is a <strong>paragraph</strong> with a list following it.</p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</div>
```
对于这个例子中的\<div\>元素而言，其 innerText 属性会返回下列字符串：
```
This is a paragraph with a list following it.
Item 1
Item 2
Item 3
```

innerText特性检查
``` js
function getInnerText(element){
    return (typeof element.textContent == "string")?element.textContent:element.innerText;
}

function setInnerText(element)
if(typeof element.textContent == "string"){
    element.textContent = text;
}else{
    element.innerText = text;
}
```
实际上， innerText 与 textContent 返回的内容并不完全一样。比如，innerText 会忽略行内的样式和脚本，而 textContent 则会像返回其他文本一样返回行内的样式和脚本代码。避免跨浏览器兼容问题的最佳途径，就是从不包含行内样式或行内脚本的 DOM 子树副本或 DOM 片段中读取文本。

2. outText属性
在读取文本值时， outerText 与 innerText 的结果完全一样。但在写模式下， outerText 就完全不同了： outerText 不只是替换调用它的元素的子节点，而是会替换整个元素
``` js
div.outerText = "Hello world!";
//这行代码实际上相当于如下两行代码：
var text = document.createTextNode("Hello world!");
div.parentNode.replaceChild(text, div);
```
#### 11.4.5 滚动
* scrollIntoViewIfNeeded(alignCenter)：只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的 alignCenter 参数设置为 true，则表示尽量将元素显示在视口中部（垂直方向）。Safari 和 Chrome 实现了这个方法。
* scrollByLines(lineCount)：将元素的内容滚动指定的行高， lineCount 值可以是正值，也可以是负值。 Safari 和 Chrome 实现了这个方法。
* scrollByPages(pageCount)：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。 Safari 和 Chrome 实现了这个方法。
``` js
//将页面主体滚动 5 行
document.body.scrollByLines(5);
//在当前元素不可见的时候，让它进入浏览器的视口
document.images[0].scrollIntoViewIfNeeded();
//将页面主体往回滚动 1 页
document.body.scrollByPages(-1);
```
### 11.5 小结
本章介绍的三个这方面的规范如下。
* Selectors API，定义了两个方法，让开发人员能够基于 CSS 选择符从 DOM 中取得元素，这两个
方法是 querySelector()和 querySelectorAll()。
* Element Traversal，为 DOM 元素定义了额外的属性，让开发人员能够更方便地从一个元素跳到
另一个元素。之所以会出现这个扩展，是因为浏览器处理 DOM 元素间空白符的方式不一样。
* HTML5，为标准的 DOM 定义了很多扩展功能。其中包括在 innerHTML 属性这样的事实标准基
础上提供的标准定义，以及为管理焦点、设置字符集、滚动页面而规定的扩展 API。

## 12 DOM2和DOM3
DOM1 级主要定义的是 HTML 和 XML 文档的底层结构。 DOM2 和 DOM3 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的 XML 特性。

### 12.1 DOM变化
DOM2 级和 3 级的目的在于扩展 DOM API，以满足操作 XML 的所有需求，同时提供更好的错误处理及特性检测能力。
``` js
var supportsDOM2Core = document.implementation.hasFeature("Core", "2.0");
var supportsDOM3Core = document.implementation.hasFeature("Core", "3.0");
var supportsDOM2HTML = document.implementation.hasFeature("HTML", "2.0");
var supportsDOM2Views = document.implementation.hasFeature("Views", "2.0");
var supportsDOM2XML = document.implementation.hasFeature("XML", "2.0");
```
#### 12.1.1 针对XML命名空间的变化
“DOM2 级核心”通过为大多数 DOM1 级方法提供特定于命名空间的版本解决了这个问题。
1. Node 类型的变化
在 DOM2 级中， Node 类型包含下列特定于命名空间的属性。
* localName：不带命名空间前缀的节点名称。
* namespaceURI：命名空间 URI 或者（在未指定的情况下是） null。
* prefix：命名空间前缀或者（在未指定的情况下是） null。

DOM3 级在此基础上更进一步，又引入了下列与命名空间有关的方法。
* isDefaultNamespace(namespaceURI)：在指定的 namespaceURI 是当前节点的默认命名空
间的情况下返回 true。
* lookupNamespaceURI(prefix)：返回给定 prefix 的命名空间。
* lookupPrefix(namespaceURI)：返回给定 namespaceURI 的前缀。

2. Document 类型的变化
DOM2 级中的 Document 类型也发生了变化，包含了下列与命名空间有关的方法。
* createElementNS(namespaceURI, tagName)：使用给定的 tagName 创建一个属于命名空间 namespaceURI 的新元素。
* createAttributeNS(namespaceURI, attributeName)：使用给定的 attributeName 创建一个属于命名空间 namespaceURI 的新特性。
* getElementsByTagNameNS(namespaceURI, tagName)：返回属于命名空间 namespaceURI的 tagName 元素的 NodeList
``` js
//创建一个新的 SVG 元素
var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
//创建一个属于某个命名空间的新特性
var att = document.createAttributeNS("http://www.somewhere.com", "random");
//取得所有 XHTML 元素
var elems = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "*");
```
3. Element类型的变化

“DOM2 级核心”中有关 Element 的变化，主要涉及操作特性。新增的方法如下。
* getAttributeNS(namespaceURI,localName)：取得属于命名空间 namespaceURI 且名为localName 的特性。
* getAttributeNodeNS(namespaceURI,localName)：取得属于命名空间 namespaceURI 且名为 localName 的特性节点。
* getElementsByTagNameNS(namespaceURI, tagName)：返回属于命名空间 namespaceURI的 tagName 元素的 NodeList。
* hasAttributeNS(namespaceURI,localName)：确定当前元素是否有一个名为 localName的特性，而且该特性的命名空间是 namespaceURI。注意， “DOM2 级核心”也增加了一个hasAttribute()方法，用于不考虑命名空间的情况。
* removeAttriubteNS(namespaceURI,localName)：删除属于命名空间 namespaceURI 且名为 localName 的特性。
* setAttributeNS(namespaceURI,qualifiedName,value)：设置属于命名空间 namespaceURI 且名为 qualifiedName 的特性的值为 value。
* setAttributeNodeNS(attNode)：设置属于命名空间 namespaceURI 的特性节点。

4. NamedNodeMap 类型的变化
NamedNodeMap 类型也新增了下列与命名空间有关的方法。由于特性是通过 NamedNodeMap 表示的，因此这些方法多数情况下只针对特性使用。
* getNamedItemNS(namespaceURI,localName)：取得属于命名空间 namespaceURI 且名为localName 的项。
* removeNamedItemNS(namespaceURI,localName)：移除属于命名空间 namespaceURI 且名为 localName 的项。
* setNamedItemNS(node)：添加 node，这个节点已经事先指定了命名空间信息。

#### 12.1.2 其他方面的变化
1. DocumentType 类型的变化
DocumentType 类型新增了 3 个属性： publicId、 systemId 和 internalSubset。其中，前两个属性表示的是文档类型声明中的两个信息段，这两个信息段在 DOM1 级中是没有办法访问到的。
2. Document 类型的变化
Document 类型的变化中唯一与命名空间无关的方法是 importNode()。这个方法的用途是从一个文档中取得一个节点，然后将其导入到另一个文档，使其成为这个文档结构的一部分。
3. Node 类型的变化
Node 类型中唯一与命名空间无关的变化，就是添加了 isSupported()方法。与 DOM1 级为 document.implementation 引入的 hasFeature()方法类似， isSupported()方法用于确定当前节点具有什么能力。这个方法也接受相同的两个参数：特性名和特性版本号。如果浏览器实现了相应特性，而且能够基于给定节点执行该特性， isSupported()就返回 true。
``` js
if (document.body.isSupported("HTML", "2.0")){
//执行只有"DOM2 级 HTML"才支持的操作
}

var div1 = document.createElement("div");
div1.setAttribute("class", "box");
var div2 = document.createElement("div");
div2.setAttribute("class", "box");
alert(div1.isSameNode(div1)); //true
alert(div1.isEqualNode(div2)); //true
alert(div1.isSameNode(div2)); //false
```
4. 框架的变化
框架和内嵌框架分别用 HTMLFrameElement 和 HTMLIFrameElement 表示， 它们在 DOM2 级中都有了一个新属性，名叫 contentDocument。这个属性包含一个指针，指向表示框架内容的文档对象。在此之前，无法直接通过元素取得这个文档对象（只能使用 frames 集合）
``` js
var iframe = document.getElementById("myIframe");
var iframeDoc = iframe.contentDocument; //在 IE8 以前的版本中无效
```
由于 contentDocument 属性是 Document 类型的实例，因此可以像使用其他 HTML 文档一样使用它，包括所有属性和方法。IE8 之前不支持框架中
的 contentDocument 属性，但支持一个名叫 contentWindow 的属性，该属性返回框架的 window 对象，而这个 window 对象又有一个 document 属性。
``` js
var iframe = document.getElementById("myIframe");
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
```
所有浏览器都支持 contentWindow 属性
### 12.2 样式
``` js
var supportsDOM2CSS = document.implementation.hasFeature("CSS", "2.0");
var supportsDOM2CSS2 = document.implementation.hasFeature("CSS2", "2.0");
```
#### 12.2.1 访问元素的样式
任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性。 这个 style 对象是 CSSStyleDeclaration 的实例，包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。
CSS 属性名，必须将其转换成驼峰大小写形式，才能通过 JavaScript 来访问。

|CSS属性 |JavaScript属性
|--|--|
|background-image |style.backgroundImage
|color |style.color
|display |style.display
|font-family |style.fontFamily

其中一个不能直接转换的 CSS 属性就是 float。由于 float 是 JavaScript 中的保留字，因此不能用作属性名。“DOM2 级样式”规范规定样式对象上相应的属性名应该是 cssFloat； Firefox、 Safari、 Opera 和 Chrome 都支持这个属性，而 IE支持的则是 styleFloat。
``` js
var myDiv = document.getElementById("myDiv");
//设置背景颜色
myDiv.style.backgroundColor = "red";
//改变大小
myDiv.style.width = "100px";
myDiv.style.height = "200px";
//指定边框
myDiv.style.border = "1px solid black";
```
1. DOM 样式属性和方法
“DOM2 级样式”规范还为 style 对象定义了一些属性和方法。这些属性和方法在提供元素的 style特性值的同时，也可以修改样式。下面列出了这些属性和方法。
* cssText：如前所述，通过它能够访问到 style 特性中的 CSS 代码。
* length：应用给元素的 CSS 属性的数量。
* parentRule：表示 CSS 信息的 CSSRule 对象。本节后面将讨论 CSSRule 类型。
* getPropertyCSSValue(propertyName)：返回包含给定属性值的 CSSValue 对象。
* getPropertyPriority(propertyName)：如果给定的属性使用了!important 设置，则返回"important"；否则，返回空字符串。
* getPropertyValue(propertyName)：返回给定属性的字符串值。
* item(index)：返回给定位置的 CSS 属性的名称。
* removeProperty(propertyName)：从样式中删除给定属性。
* setProperty(propertyName,value,priority)：将给定属性设置为相应的值，并加上优先权标志（ "important"或者一个空字符串）。
2. 计算的样式
虽然 style 对象能够提供支持 style 特性的任何元素的样式信息，但它不包含那些从其他样式表层叠而来并影响到当前元素的样式信息。 
``` html
<!DOCTYPE html>
<html>
<head>
<title>Computed Styles Example</title>
    <style type="text/css">
        #myDiv {
        background-color: blue;
        width: 100px;
        height: 200px;
        }
    </style>
</head>
<body>
    <div id="myDiv" style="background-color: red; border: 1px solid black"></div>
</body>
</html>
```

``` js
var myDiv = document.getElementById("myDiv");
var computedStyle = document.defaultView.getComputedStyle(myDiv, null);
alert(computedStyle.backgroundColor); // "red"
alert(computedStyle.width); // "100px"
alert(computedStyle.height); // "200px"
alert(computedStyle.border); // 在某些浏览器中是"1px solid black"
```
在这个元素计算后的样式中，背景颜色的值是"red"，宽度值是"100px"，高度值是"200px"。我们注意到，背景颜色不是"blue"，因为这个样式在自身的 style 特性中已经被覆盖了。IE 不支持 getComputedStyle()方法，但它有一种类似的概念。在 IE 中，每个具有 style 属性的元素还有一个 currentStyle 属性。
``` js
var myDiv = document.getElementById("myDiv");
var computedStyle = myDiv.currentStyle;
alert(computedStyle.backgroundColor); //"red"
alert(computedStyle.width); //"100px"
alert(computedStyle.height); //"200px"
alert(computedStyle.border); //undefined
```

#### 12.2.2 操作样式表
CSSStyleSheet 类型表示的是样式表，包括通过\<link\>元素包含的样式表和在\<style\>元素中定义的样式表。使用下面的代码可以确定浏览器是否支持 DOM2 级样式表。
``` js
var supportsDOM2StyleSheets = document.implementation.hasFeature("StyleSheets", "2.0");
```
从StyleSheet 接口继承而来的属性如下。
* disabled：表示样式表是否被禁用的布尔值。这个属性是可读/写的，将这个值设置为 true 可以禁用样式表。
* href：如果样式表是通过\<link\>包含的，则是样式表的 URL；否则，是 null。
* media：当前样式表支持的所有媒体类型的集合。与所有 DOM 集合一样，这个集合也有一个length 属性和一个 item()方法。也可以使用方括号语法取得集合中特定的项。如果集合是空列表，表示样式表适用于所有媒体。在 IE 中， media 是一个反映\<link\>和\<style\>元素 media特性值的字符串。
* ownerNode：指向拥有当前样式表的节点的指针，样式表可能是在 HTML 中通过\<link\>或
\<style/\>引入的（在 XML 中可能是通过处理指令引入的）。如果当前样式表是其他样式表通过@import 导入的，则这个属性值为 null。 IE 不支持这个属性。
* parentStyleSheet：在当前样式表是通过@import 导入的情况下，这个属性是一个指向导入它的样式表的指针。
* title： ownerNode 中 title 属性的值。
* type：表示样式表类型的字符串。对 CSS 样式表而言，这个字符串是"type/css"。
除 了 disabled 属 性 之 外， 其 他 属 性都 是 只 读 的 。 在 支 持 以上 所 有 这 些属 性 的 基 础上 ，
CSSStyleSheet 类型还支持下列属性和方法：
* cssRules：样式表中包含的样式规则的集合。 IE 不支持这个属性，但有一个类似的 rules 属性。
* ownerRule：如果样式表是通过@import 导入的，这个属性就是一个指针，指向表示导入的规则；否则，值为 null。 IE 不支持这个属性。
* deleteRule(index)：删除 cssRules 集合中指定位置的规则。 IE 不支持这个方法，但支持一个类似的 removeRule()方法。
* insertRule(rule,index)：向 cssRules 集合中指定的位置插入 rule 字符串。 IE 不支持这个方法，但支持一个类似的 addRule()方法。
这里的 getStyleSheet()返回的样式表对象与 document.styleSheets 集合中的样式表对象相同。

1. CSS 规则
CSSRule 对象表示样式表中的每一条规则。实际上， CSSRule 是一个供其他多种类型继承的基类型，其中最常见的就是 CSSStyleRule 类型，表示样式信息（其他规则还有@import、 @font-face、
@page 和@charset，但这些规则很少有必要通过脚本来访问）。 CSSStyleRule 对象包含下列属性。
* cssText：返回整条规则对应的文本。由于浏览器对样式表的内部处理方式不同，返回的文本可能会与样式表中实际的文本不一样； Safari 始终都会将文本转换成全部小写。 IE 不支持这个属性。
* parentRule：如果当前规则是导入的规则，这个属性引用的就是导入规则；否则，这个值为null。 IE 不支持这个属性。
* parentStyleSheet：当前规则所属的样式表。 IE 不支持这个属性。
* selectorText：返回当前规则的选择符文本。由于浏览器对样式表的内部处理方式不同，返回的文本可能会与样式表中实际的文本不一样（例如， Safari 3 之前的版本始终会将文本转换成全部小写）。在 Firefox、 Safari、 Chrome 和 IE 中这个属性是只读的。 Opera 允许修改 selectorText。
* style：一个 CSSStyleDeclaration 对象，可以通过它设置和取得规则中特定的样式值。
* type：表示规则类型的常量值。对于样式规则，这个值是 1。 IE 不支持这个属性。其中三个最常用的属性是 cssText、 selectorText 和 style。 
2. 创建规则
DOM 规定，要向现有样式表中添加新规则，需要使用 insertRule()方法。这个方法接受两个参数：规则文本和表示在哪里插入规则的索引。
3. 删除规则
从样式表中删除规则的方法是 deleteRule()，这个方法接受一个参数：要删除的规则的位置。
``` js
sheet.deleteRule(0); //DOM 方法
//IE 支持的类似方法叫 removeRule()，使用方法相同，如下所示：
sheet.removeRule(0); //仅对 IE 有效
function deleteRule(sheet,index){
    if(sheet.deleteRule){
        sheet.deleteRule(index);
    }else if(sheet.removeRule){
        sheet.removeRule(index);
    }
}
}
```
#### 12.2.3 元素大小
1. 偏移量
首先要介绍的属性涉及偏移量（offset dimension），包括元素在屏幕上占用的所有可见的空间。元素的可见大小由其高度、宽度决定，包括所有内边距、滚动条和边框大小（不包括外边距）。
* offsetHeight：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）
水平滚动条的高度、上边框高度和下边框高度。
* offsetWidth：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂
直滚动条的宽度、左边框宽度和右边框宽度。
* offsetLeft：元素的左外边框至包含元素的左内边框之间的像素距离。
* offsetTop：元素的上外边框至包含元素的上内边框之间的像素距离。
![](/images/frontend-JavaScript-dom-offset.jpg)
``` js
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while(current !==null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualHeight;
}

function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while(current!==null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
```
#### 2. 客户区大小
元素的客户区大小（client dimension），指的是元素内容及其内边距所占据的空间大小。有关客户区大小的属性有两个： clientWidth 和 clientHeight。其中， clientWidth 属性是元素内容区宽度加上左右内边距宽度； clientHeight 属性是元素内容区高度加上上下内边距高度。

![](/iamges/frontend-javascript-dom-client.jpg)
``` js
function getViewport(){
    if(document.compatModez=="BackCompat"){
        return {
            width:document.body.clientWidth,
            height:docuement.body.clientHeight
        };
    }else{
        return {
            width:document.documentElement.clientWidth,
            height:docuement.documentElement.clientHeight
        };
    }
}
```
3. 滚动大小
最后要介绍的是滚动大小（scroll dimension），指的是包含滚动内容的元素的大小。有些元素（例如\<html\>元素），即使没有执行任何代码也能自动地添加滚动条；但另外一些元素，则需要通过 CSS 的overflow 属性进行设置才能滚动。
* scrollHeight：在没有滚动条的情况下，元素内容的总高度。
* scrollWidth：在没有滚动条的情况下，元素内容的总宽度。
* scrollLeft：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
* scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置
![](/images/frontend-javascript-dom-scroll.jpg)
``` js
var docHeight = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);
```

4. 确定元素大小
getBoundingClientRect()方法。这个方法返回会一个矩形对象，包含 4 个属性： left、 top、 right 和 bottom。
``` js
function getBoundingClientRect(element){
    if(typeof arguments.callee.offset!="number"){
        var scrollTop = document.documentElementscrollTop;
        var temp = document.createElement("div");
        temp.style.cssText = "position:absolute;left:0;top:0;";
        document.body.appendChild(temp);
        arguments.callee.offset = -temp.getBoundingClientRect().top-scrollTop;
        document.body.removeChild(temp);
        temp = null;
    }
    var rect = element.getBoundingClientRect();
    var offset = arguments.callee.offset;
    return {
        left:rect.left+offset,
        right:rect.right+offset,
        top:rect.top+offset,
        bottom:rect.bottom+offset
    };
}
```
对于不支持 getBoundingClientRect()的浏览器，可以通过其他手段取得相同的信息。一般来说， right 和 left 的差值与 offsetWidth 的值相等，而 bottom 和 top 的差值与 offsetHeight相等。而且， left 和 top 属性大致等于使用本章前面定义的 getElementLeft()和 getElementTop()
函数取得的值。综合上述，就可以创建出下面这个跨浏览器的函数：
``` js
function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect){
        if(typeof arguments.callee.offset!="number"){
        var scrollTop = document.documentElementscrollTop;
        var temp = document.createElement("div");
        temp.style.cssText = "position:absolute;left:0;top:0;";
        document.body.appendChild(temp);
        arguments.callee.offset = -temp.getBoundingClientRect().top-scrollTop;
        document.body.removeChild(temp);
        temp = null;
    }
    var rect = element.getBoundingClientRect();
    var offset = arguments.callee.offset;
    return {
        left:rect.left+offset,
        right:rect.right+offset,
        top:rect.top+offset,
        bottom:rect.bottom+offset
    };
    }else{
        var actualLeft = getElementLeft(element);
        var actualRight = getElementRight(element);

    }return {
        left: actualLeft - scrollLeft,
        right: actualLeft + element.offsetWidth - scrollLeft,
        top: actualTop - scrollTop,
        bottom: actualTop + element.offsetHeight - scrollTop
    }
}
```

### 12.3 遍历
“DOM2 级遍历和范围”模块定义了两个用于辅助完成顺序遍历 DOM 结构的类型： NodeIterator和 TreeWalker。这两个类型能够基于给定的起点对 DOM 结构执行深度优先（ depth-first）的遍历操作。
``` js
var supportsTraversals = document.implementation.hasFeature("Traversal", "2.0");
var supportsNodeIterator = (typeof document.createNodeIterator == "function");
var supportsTreeWalker = (typeof document.createTreeWalker == "function");
```

#### 12.3.1 NodeIterator
NodeIterator 类型是两者中比较简单的一个，可以使用 document.createNodeIterator()方法创建它的新实例。
* root：想要作为搜索起点的树中的节点。
* whatToShow：表示要访问哪些节点的数字代码。
* filter：是一个 NodeFilter 对象，或者一个表示应该接受还是拒绝某种特定节点的函数。
* entityReferenceExpansion：布尔值，表示是否要扩展实体引用。这个参数在 HTML 页面中没有用，因为其中的实体引用不能扩展。
whatToShow 参数是一个位掩码，通过应用一或多个过滤器（ filter）来确定要访问哪些节点。这个参数的值以常量形式在 NodeFilter 类型中定义，如下所示。
* NodeFilter.SHOW_ALL：显示所有类型的节点。
* NodeFilter.SHOW_ELEMENT：显示元素节点。
* NodeFilter.SHOW_ATTRIBUTE：显示特性节点。由于 DOM 结构原因，实际上不能使用这个值。
* NodeFilter.SHOW_TEXT：显示文本节点。
* NodeFilter.SHOW_CDATA_SECTION：显示 CDATA 节点。对 HTML 页面没有用。
* NodeFilter.SHOW_ENTITY_REFERENCE：显示实体引用节点。对 HTML 页面没有用。
* NodeFilter.SHOW_ENTITYE：显示实体节点。对 HTML 页面没有用。
* NodeFilter.SHOW_PROCESSING_INSTRUCTION：显示处理指令节点。对 HTML 页面没有用。
* NodeFilter.SHOW_COMMENT：显示注释节点。
* NodeFilter.SHOW_DOCUMENT：显示文档节点。
* NodeFilter.SHOW_DOCUMENT_TYPE：显示文档类型节点。
* NodeFilter.SHOW_DOCUMENT_FRAGMENT：显示文档片段节点。对 HTML 页面没有用。
* NodeFilter.SHOW_NOTATION：显示符号节点。对 HTML 页面没有用。
可以通过 createNodeIterator()方法的 filter 参数来指定自定义的 NodeFilter 对象，或者指定一个功能类似节点过滤器（ node filter）的函数
``` js
var filter = function(node){
    return node.tagName.toLowerCase() == "p" ?
    NodeFilter.FILTER_ACCEPT :
    NodeFilter.FILTER_SKIP;
    };
var iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT,filter, false);
//下面的代码创建了一个能够访问所有类型节点的简单的 NodeIterator。
var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ALL,null, false);
```
#### 12.3.2 TreeWalker
TreeWalker 是 NodeIterator 的一个更高级的版本。除了包括 nextNode()和 previousNode()在内的相同的功能之外，这个类型还提供了下列用于在不同方向上遍历 DOM 结构的方法。
* parentNode()：遍历到当前节点的父节点；
* firstChild()：遍历到当前节点的第一个子节点；
* lastChild()：遍历到当前节点的最后一个子节点；
* nextSibling()：遍历到当前节点的下一个同辈节点；
* previousSibling()：遍历到当前节点的上一个同辈节点。
``` js
var div = document.getElementById("div1");
var filter = function(node){
    return node.tagName.toLowerCase() == "li"?
        NodeFilter.FILTER_ACCEPT :
        NodeFilter.FILTER_SKIP;
};
var walker= document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT,filter, false);
var node = iterator.nextNode();
while (node !== null) {
    alert(node.tagName); //输出标签名
    node = iterator.nextNode();
}
```

### 12.4 范围
为了让开发人员更方便地控制页面，“DOM2 级遍历和范围”模块定义了“范围”（ range）接口。通过范围可以选择文档中的一个区域，而不必考虑节点的界限.

#### 12.4.1 DOM中的范围
DOM2 级在 Document 类型中定义了 createRange()方法。在兼容 DOM 的浏览器中，这个方法属于 document 对象。使用 hasFeature()或者直接检测该方法，都可以确定浏览器是否支持范围。
``` js
var supportsRange = document.implementation.hasFeature("Range", "2.0");
var alsoSupportsRange = (typeof document.createRange == "function");
//如果浏览器支持范围，那么就可以使用 createRange()来创建 DOM 范围，如下所示：
var range = document.createRange();
```
* startContainer：包含范围起点的节点（即选区中第一个节点的父节点）。
* startOffset：范围在 startContainer 中起点的偏移量。如果 startContainer 是文本节点、注释节点或 CDATA 节点，那么 startOffset 就是范围起点之前跳过的字符数量。否则，
startOffset 就是范围中第一个子节点的索引。
* endContainer：包含范围终点的节点（即选区中最后一个节点的父节点）。
* endOffset：范围在 endContainer 中终点的偏移量（与 startOffset 遵循相同的取值规则）。
* commonAncestorContainer： startContainer 和 endContainer 共同的祖先节点在文档树中位置最深的那个
1. 用 DOM 范围实现简单选择
要使用范围来选择文档中的一部分，最简的方式就是使用 selectNode()或 selectNodeContents()。为了更精细地控制将哪些节点包含在范围中，还可以使用下列方法。
* setStartBefore(refNode)：将范围的起点设置在 refNode 之前，因此 refNode 也就是范围选区中的第一个子节点。同时会将 startContainer 属性设置为 refNode.parentNode，将startOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引。
* setStartAfter(refNode)：将范围的起点设置在 refNode 之后，因此 refNode 也就不在范围之内了，其下一个同辈节点才是范围选区中的第一个子节点。同时会将 startContainer 属性设置为 refNode.parentNode，将 startOffset 属性设置为 refNode 在其父节点的childNodes 集合中的索引加 1。
* setEndBefore(refNode)：将范围的终点设置在 refNode 之前，因此 refNode 也就不在范围之内了，其上一个同辈节点才是范围选区中的最后一个子节点。同时会将 endContainer 属性设置为refNode.parentNode，将 endOffset 属性设置为 refNode 在其父节点的 childNodes集合中的索引。
* setEndAfter(refNode)：将范围的终点设置在 refNode 之后，因此 refNode 也就是范围选区
中的最后一个子节点。同时会将 endContainer 属性设置为 refNode.parentNode，将endOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引加 1。

2. 用 DOM 范围实现复杂选择
要创建复杂的范围就得使用 setStart()和 setEnd()方法。这两个方法都接受两个参数：一个参照节点和一个偏移量值。对 setStart()来说，参照节点会变成 startContainer，而偏移量值会变成startOffset。
``` js
可以使用这两个方法来模仿 selectNode()和 selectNodeContents()。来看下面的例子：
var range1 = document.createRange();
    range2 = document.createRange();
    p1 = document.getElementById("p1");
    p1Index = -1;
    i, len;
for (i=0, len=p1.parentNode.childNodes.length; i < len; i++) {
    if (p1.parentNode.childNodes[i] == p1) {
    p1Index = i;
    break;
    }
}
range1.setStart(p1.parentNode, p1Index);
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0);
range2.setEnd(p1, p1.childNodes.length);
DOMRangeExample2.
```
显然，要选择这个节点（使用 range1），就必须确定当前节点（ p1）在其父节点的 childNodes集合中的索引。而要选择这个节点的内容（使用 range2），也不必计算什么；只要通过 setStart()和 setEnd()设置默认值即可。
3. 操作 DOM 范围中的内容
在创建范围时 ，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档片段中。为了创建这个文档片段，范围内容的格式必须正确有效。在前面的例子中，我们创建的选区分别开始和结束于两个文本节点的内部，因此不能算是格式良好的 DOM 结构，也就无法通过 DOM 来表示。
4. 插入 DOM 范围中的内容
利用范围，可以删除或复制内容，还可以像前面介绍的那样操作范围中的内容。 使用 insertNode()
方法可以向范围选区的开始处插入一个节点。假设我们想在前面例子中的 HTML 前面插入以下 HTML
代码：
``` js
<span style="color: red">Inserted text</span>
//那么，就可以使用下列代码：
var p1 = document.getElementById("p1");
    helloNode = p1.firstChild.firstChild;
    worldNode = p1.lastChild;
    range = document.createRange();
    range.setStart(helloNode, 2);
    range.setEnd(worldNode, 3);
var span = document.createElement("span");
    span.style.color = "red";
    span.appendChild(document.createTextNode("Inserted text"));
    range.insertNode(span);
```
5. 折叠 DOM 范围
所谓折叠范围，就是指范围中未选择文档的任何部分。可以用文本框来描述折叠范围的过程。假设文本框中有一行文本，你用鼠标选择了其中一个完整的单词。然后，你单击鼠标左键，选区消失，而光标则落在了其中两个字母之间。同样，在折叠范围时，其位置会落在文档中的两个部分之间，可能是范围选区的开始位置，也可能是结束位置。
6. 比较 DOM 范围
在有多个范围的情况下，可以使用 compareBoundaryPoints()方法来确定这些范围是否有公共的边界（起点或终点）。这个方法接受两个参数：表示比较方式的常量值和要比较的范围。表示比较方式的常量值如下所示。
* Range.START_TO_START(0)：比较第一个范围和第二个范围的起点；
* Range.START_TO_END(1)：比较第一个范围的起点和第二个范围的终点；
* Range.END_TO_END(2)：比较第一个范围和第二个范围的终点；
* Range.END_TO_START(3)：比较第一个范围的终点和第一个范围的起点。
``` js
var range1 = document.createRange();
var range2 = document.createRange();
var p1 = document.getElementById("p1");
range1.selectNodeContents(p1);
range2.selectNodeContents(p1);
range2.setEndBefore(p1.lastChild);
alert(range1.compareBoundaryPoints(Range.START_TO_START, range2)); //0
alert(range1.compareBoundaryPoints(Range.END_TO_END, range2)); //1
```
7. 复制 DOM 范围
可以使用 cloneRange()方法复制范围。这个方法会创建调用它的范围的一个副本。
``` js
var newRange = range.cloneRange();
```
新创建的范围与原来的范围包含相同的属性，而修改它的端点不会影响原来的范围。
8. 清理 DOM 范围
在使用完范围之后，最好是调用 detach()方法，以便从创建范围的文档中分离出该范围。调用detach()之后，就可以放心地解除对范围的引用，从而让垃圾回收机制回收其内存了。来看下面的例子。
``` js
range.detach(); //从文档中分离
range = null; //解除引用
```

### 12.5 小结
DOM2 级规范定义了一些模块，用于增强 DOM1 级。“DOM2 级核心”为不同的 DOM 类型引入了一些与 XML 命名空间有关的方法。这些变化只在使用 XML 或 XHTML 文档时才有用；对于 HTML 文档没有实际意义。除了与 XML 命名空间有关的方法外， “DOM2 级核心”还定义了以编程方式创建Document 实例的方法，也支持了创建 DocumentType 对象。
“DOM2 级样式”模块主要针对操作元素的样式信息而开发，其特性简要总结如下。
* 每个元素都有一个关联的 style 对象，可以用来确定和修改行内的样式。
* 要确定某个元素的计算样式（包括应用给它的所有 CSS 规则）， 可以使用 getComputedStyle()方法。
* IE 不支持 getComputedStyle()方法，但为所有元素都提供了能够返回相同信息 currentStyle属性。
* 可以通过 document.styleSheets 集合访问样式表。
* 除 IE 之外的所有浏览器都支持针对样式表的这个接口， IE 也为几乎所有相应的 DOM 功能提供了自己的一套属性和方法。
“DOM2 级遍历和范围”模块提供了与 DOM 结构交互的不同方式，简要总结如下。
* 遍历即使用 NodeIterator 或 TreeWalker 对 DOM 执行深度优先的遍历。
* NodeIterator 是一个简单的接口，只允许以一个节点的步幅前后移动。而 TreeWalker 在提供相同功能的同时，还支持在 DOM 结构的各个方向上移动，包括父节点、同辈节点和子节点等方向。
* 范围是选择 DOM 结构中特定部分，然后再执行相应操作的一种手段。
* 使用范围选区可以在删除文档中某些部分的同时，保持文档结构的格式良好，或者复制文档中的相应部分。
* IE8 及更早版本不支持“DOM2 级遍历和范围”模块，但它提供了一个专有的文本范围对象，可以用来完成简单的基于文本的范围操作。 IE9 完全支持 DOM 遍历。

## 13 事件流
javaScript 与 HTML 之间的交互是通过事件实现的。事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。可以使用侦听器（或处理程序）来预订事件，以便事件发生时执行相应的代码。这种在传统软件工程中被称为观察员模式的模型，支持页面的行为（ JavaScript 代码）与页面的外观（ HTML 和 CSS 代码）之间的松散耦合.

### 13.1 事件流
IE 的事件流是事件冒泡流，而 Netscape Communicator 的事件流是事件捕获流。
#### 13.1.1 事件冒泡
IE 的事件流叫做事件冒泡（ event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深
的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。以下面的 HTML 页面为例：
``` html
<!DOCTYPE html>
<html>
<head>
    <title>Event Bubbling Example</title>
</head>
<body>
    <div id="myDiv">Click Me</div>
</body>
</html>
```
如果你单击了页面中的\<div\>元素，那么这个 click 事件会按照如下顺序传播：
```  html
(1) <div>
(2) <body>
(3) <html>
(4) document
```
![](/images/frontend-JavaScript-event-iecapture.jpg)

#### 13.1.2 事件捕获
另一种事件流叫做事件捕获（ event capturing）。事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。
``` 
(1) document
(2) <html>
(3) <body>
(4) <div>
```
![](/iamges/frontend-javascript-event-netscape-capture.jpg)

#### 13.1.3 DOM事件流
“DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。

![](/images/frontend-javascript-event-domevent.jpg)

### 13.2 事件处理程序
事件就是用户或浏览器自身执行的某种动作。诸如 click、 load 和 mouseover，都是事件的名字。而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。

#### 某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的 HTML 特性来指定。这个
特性的值应该是能够执行的 JavaScript 代码。例如，要在按钮被单击时执行一些 JavaScript，可以像下面这样编写代码：
``` html
<input type="button" value="Click Me" onclick="alert('Clicked')" />
```
当单击这个按钮时，就会显示一个警告框。这个操作是通过指定 onclick 特性并将一些 JavaScript代码作为它的值来定义的。由于这个值是 JavaScript，因此不能在其中使用未经转义的 HTML 语法字符，例如和号（ &）、双引号（ ""）、小于号（ <）或大于号（ >）。为了避免使用 HTML 实体，这里使用了单引号。如果想要使用双引号，那么就要将代码改写成如下所示：
``` html
<input type="button" value="Click Me" onclick="alert(&quot;Clicked&quot;)" />
```
在 HTML 中定义的事件处理程序可以包含要执行的具体动作，也可以调用在页面其他地方定义的脚本，如下面的例子所示：
``` html
<script type="text/javascript">
function showMessage(){
alert("Hello world!");
}
</script>
<input type="button" value="Click Me" onclick="showMessage()" />
```
关于这个动态创建的函数，另一个有意思的地方是它扩展作用域的方式。在这个函数内部，可以像访问局部变量一样访问 document 及该元素本身的成员。这个函数使用 with 像下面这样扩展作用域：
``` js
function(){
    with(document){
        with(this){
            //元素属性值
        }
    }
}
```
如果当前元素是一个表单输入元素，则作用域中还会包含访问表单元素（父元素）的入口，这个函数就变成了如下所示：
``` js
function(){
    with(document){
        with(this.form){
            with(this){
                //元素属性值
            }
        }
    }
}
```
这样扩展事件处理程序的作用域链在不同浏览器中会导致不同结果。不同 JavaScript引擎遵循的标识符解析规则略有差异，很可能会在访问非限定对象成员时出错。
通过 HTML 指定事件处理程序的最后一个缺点是 HTML 与 JavaScript 代码紧密耦合。如果要更换事件处理程序，就要改动两个地方： HTML 代码和 JavaScript 代码。

#### 13.2.2 DOM0 级事件处理程序
通过 JavaScript 指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。这种为事件处理程序赋值的方法是在第四代 Web 浏览器中出现的，而且至今仍然为所有现代浏览器所支持。原因一是简单，二是具有跨浏览器的优势。要使用 JavaScript 指定事件处理程序，首先必须取得一个要操作的对象的引用。
``` js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("clicked");
}
```

#### 13.2.3 DOM2 级事件处理程序
“DOM2 级事件” 定义了两个方法，用于处理指定和删除事件处理程序的操作： addEventListener()和 removeEventListener()。所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。
``` js
var btn = document.getElementById("myBtn");
btn.addEventListener("click",function(){
    alert(this.id);
},false);
```
通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过 addEventListener()添加的匿名函数将无法移除，如下面的例子所示。
``` js
var btn = document.getElementById("myBtn");
btn.addEventListener("click",function(){
    alert(this.id);
},false);
//省略了其他代码
btn.removeEventListener("click",function(){//程序没有用
    //  
},false)
```
传入 removeEventListener()中的事件处理程序函数必须与传入addEventListener()中的相同
``` js
var btn = document.getElementById("myBtn");
var handler = function(){
    alert(this.id);
};
btn.addEventListener("click",handler,false);
btn.removeEventListener("click",handler,false);
```

#### 13.2.4 IE事件处理程序
IE 实现了与 DOM 中类似的两个方法： attachEvent()和 detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。由于 IE8 及更早版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段
``` js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick",function(){
    alert(this === window); //true});
};
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
    alert("Clicked");
});
btn.attachEvent("onclick", function(){
    alert("Hello world!");
});
```
这里调用了两次 attachEvent()，为同一个按钮添加了两个不同的事件处理程序。不过，与 DOM方法不同的是，这些事件处理程序不是以添加它们的顺序执行，而是以相反的顺序被触发。单击这个例子中的按钮，首先看到的是"Hello world!"，然后才是"Clicked"。
使用 attachEvent()添加的事件可以通过 detachEvent()来移除，条件是必须提供相同的参数。与 DOM 方法一样，这也意味着添加的匿名函数将不能被移除。
``` js
var btn = document.getElementById("myBtn");
var handler = function(){
    alert("Clicked");
};
btn.attachEvent("onclick", handler);
//这里省略了其他代码
btn.detachEvent("onclick", handler);
```

#### 13.2.5 跨浏览器的事件处理程序
第一个要创建的方法是 addHandler()，它的职责是视情况分别使用 DOM0 级方法、 DOM2 级方法或 IE 方法来添加事件。
与 addHandler()对应的方法是 removeHandler()，它也接受相同的参数。这个方法的职责是移除之前添加的事件处理程序
``` js
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
        element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on" + type + handler);
        }else{
            element["on"+type] = handler;
        }
    };
    removeHnadler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    }
}
```
这两个方法首先都会检测传入的元素中是否存在 DOM2 级方法。如果存在 DOM2 级方法，则使用该方法：传入事件类型、事件处理程序函数和第三个参数 false（表示冒泡阶段）。如果存在的是 IE 的方法，则采取第二种方案。
``` js
var btn = document.getElementById("myBtn");
var handler = function(){
    alert("Clicked");
};
EventUtil.addHandler(btn, "click", handler);
//这里省略了其他代码
EventUtil.removeHandler(btn, "click", handler);
```

### 13.3 事件对象
在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。
#### 13.3.1 DOM中的事件对象
兼容 DOM 的浏览器会将一个 event 对象传入到事件处理程序中。无论指定事件处理程序时使用什么方法（ DOM0 级或 DOM2 级），都会传入 event 对象。
```  js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert(event.type); //"click"
};
btn.addEventListener("click", function(event){
    alert(event.type); //"click"
}, false);
```
event 对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。
属性/方法 |类 型 |读/写 |说 明
--|--|--|--
bubbles | Boolean | 只读 | 表明事件是否冒泡
cancelable | Boolean | 只读 | 表明是否可以取消事件的默认行为
currentTarget | Element | 只读 | 其事件处理程序当前正在处理事件的那个元素
defaultPrevented | Boolean | 只读 |为true表示已经调用了preventDefault()（DOM3级事件中新增）
detail |Integer |只读 |与事件相关的细节信息
eventPhase |Integer |只读 |调用事件处理程序的阶段： 1表示捕获阶段， 2表示“处于目标”， 3表示冒泡阶段
preventDefault() |Function |只读| 取消事件的默认行为 。 如果cancelable是true，则可以使用这个方法
stopImmediatePropagation()| Function |只读 |取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用（ DOM3级事件中新增）
stopPropagation() |Function |只读 |取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法
target |Element| 只读 |事件的目标
trusted |Boolean |只读 |为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JavaScript创建的（DOM3级事件中新增）
type |String| 只读 |被触发的事件的类型
view |AbstractView |只读| 与事件关联的抽象视图。等同于发生事件的window对象

``` js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
alert(event.currentTarget === this); //true
alert(event.target === this); //true
};
```
在需要通过一个函数处理多个事件时，可以使用 type 属性。例如：
``` js
var btn = document.getElementById("myBtn");
var handler = function(event){
    switch(event.type){
        case "click":
            alert("clicked");
            break;
        case "mouseover":
            event.target.style.backgroundColor = "red";
            break;
        case "mouseout":
            event.target.style.backgroundColor = "";
            break;
    }
};
btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler; 
```
要阻止特定事件的默认行为，可以使用 preventDefault()方法。
``` js
var link = document.getElementById("myLink");
link.onclick = function(event){
    event.preventDefault();
};
```
只有 cancelable 属性设置为 true 的事件，才可以使用 preventDefault()来取消其默认行为。
另外， stopPropagation()方法用于立即停止事件在 DOM 层次中的传播，即取消进一步的事件捕获或冒泡。
``` js
var btn = document.getElementById("myBtn");
btn.onclick = function(event){
    alert("clicked");
    event.stopPropagation();
};
document.body.onclick = function(event){
    alert("Body clicked")
};
```

#### 13.3.2 IE中的事件对象
与访问 DOM 中的 event 对象不同，要访问 IE 中的 event 对象有几种不同的方式，取决于指定事件处理程序的方法
``` js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    var event = window.event;
    alert(event.type);  //""click
};
```
通过 window.event 取得了 event 对象，并检测了被触发事件的类型（ IE 中的 type属性与 DOM 中的 type 属性是相同的）。事件处理程序是使用 attachEvent()添加的，那么就会有一个 event 对象作为参数被传入事件处理程序函数中.
``` js
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick",function(event){
    alert(event.type);//click
})
```
属性/方法 |类 型 |读/写 |说 明
--|--|--|--
cancelBubble |Boolean |读/写 |默认值为false，但将其设置为true就可以取消事件冒泡（与DOM中的stopPropagation()方法的作用相同）
returnValue |Boolean |读/写 |默认值为true，但将其设置为false就可以取消事件的默认行为（与DOM中的preventDefault()方法的作用相同）
srcElement |Element| 只读 |事件的目标（与DOM中的target属性相同）
type |String |只读 |被触发的事件的类型

使用 event.srcElement 比较保险
``` js
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert(window.event.srcElement === this); //true
};
btn.attachEvent("onclick", function(event){
    alert(event.srcElement === this); //false
});
```
returnValue 属性相当于 DOM 中的 preventDefault()方法，它们的作用都是取消给定事件的默认行为。只要将 returnValue 设置为 false，就可以阻止默认行为。
``` js
var link = document.getElementById("myLink");
link.onclick = function(){
    window.event.returnValue = false;
};
document.body.onclick = function(){
    alert("body clicked")
}
```
#### 13.3.3 跨浏览器的事件对象
虽然 DOM 和 IE 中的 event 对象不同，但基于它们之间的相似性依旧可以拿出跨浏览器的方案来。IE 中 event 对象的全部信息和方法 DOM 对象中都有，只不过实现方式不一样。
``` js
var EventUtil = {
    addHandler:function(element,type,handler){
        //省略代码
    }，
    getHandler:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.prevenntDefault();
        }else{
            event.returnValue = false;
        }
    },
    removeHandler:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
}
```
第一个是 getEvent()，它返回对 event对象的引用。
``` js
btn.onclick = function(event){
    event = EventUtil.getEvent(event);
};
```
第二个方法是 getTarget()，它返回事件的目标。在这个方法内部，会检测 event 对象的 target属性，如果存在则返回该属性的值；否则，返回 srcElement 属性的值。
``` js
btn.onclick = function(event){
    event = EventUtil(event);
    var target = EventUtil.getTarget(event);
}
```
第三个方法是 preventDefault()，用于取消事件的默认行为。在传入 event 对象后，这个方法会检查是否存在 preventDefault()方法，如果存在则调用该方法。如果 preventDefault()方法不存在，则将 returnValue 设置为 false。
``` js
var link = document.getElementById("myLink");
    link.onclick = function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
};
```
第四个方法是 stopPropagation()，其实现方式类似。首先尝试使用 DOM 方法阻止事件流，否则就使用 cancelBubble 属性。
``` JS
var btn = document.getElementById("myBtn");
    btn.onclick = function(event){
    alert("Clicked");
    event = EventUtil.getEvent(event);
    EventUtil.stopPropagation(event);
};
document.body.onclick = function(event){
    alert("Body clicked");
};
```

### 13.4 事件类型
Web 浏览器中可能发生的事件有很多类型。
* UI（ User Interface，用户界面）事件，当用户与页面上的元素交互时触发；
* 焦点事件，当元素获得或失去焦点时触发；
* 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
* 滚轮事件，当使用鼠标滚轮（或类似设备）时触发；
* 文本事件，当在文档中输入文本时触发；
* 键盘事件，当用户通过键盘在页面上执行操作时触发；
* 合成事件，当为 IME（ Input Method Editor，输入法编辑器）输入字符时触发；
* 变动（ mutation）事件，当底层 DOM 结构发生变化时触发。
* 变动名称事件，当元素或属性名变动时触发。此类事件已经被废弃，没有任何浏览器实现它们，因此本章不做介绍。

#### 13.4.1 UI事件
UI 事件指的是那些不一定与用户操作有关的事件。这些事件在 DOM 规范出现之前，都是以这种或那种形式存在的，而在 DOM 规范中保留是为了向后兼容。
* DOMActivate：表示元素已经被用户操作（通过鼠标或键盘）激活。这个事件在 DOM3 级事件中被废弃，但 Firefox 2+和 Chrome 支持它。考虑到不同浏览器实现的差异，不建议使用这个事件。
* load：当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在\<img\>元素上面触发，或者当嵌入的内容加载完毕时在\<object\>元素上面触发。
* unload：当页面完全卸载后在 window 上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在\<object\>元素上面触发。
* abort：在用户停止下载过程时，如果嵌入的内容没有加载完，则在\<object\>元素上面触发。
* error：当发生 JavaScript 错误时在 window 上面触发，当无法加载图像时在\<img\>元素上面触发，当无法加载嵌入内容时在\<object\>元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发。
* select：当用户选择文本框（\<input\>或\<texterea\>）中的一或多个字符时触发。
* resize：当窗口或框架的大小变化时在 window 或框架上面触发。
* scroll：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。 \<body\>元素中包含所加载页面的滚动条。
1. load 事件
JavaScript 中最常用的一个事件就是 load。当页面完全加载后（包括所有图像、 JavaScript 文件、CSS 文件等外部资源），就会触发 window 上面的 load 事件。
``` js
EventUtil.addHandler(window, "load", function(event){
    alert("Loaded!");
});
```
与添加其他事件一样，这里也给事件处理程序传入了一个 event 对象。这个 event 对象中不包含有关这个事件的任何附加信息，但在兼容 DOM 的浏览器中， event.target 属性的值会被设置为document，而 IE 并不会为这个事件设置 srcElement 属性。
第二种指定 onload 事件处理程序的方式是为\<body\>元素添加一个 onload 特性
``` html
<!DOCTYPE html>
<html>
<head>
<title>Load Event Example</title>
</head>
    <body onload="alert('Loaded!')">
</body>
</html>
```
::: tip
根据“DOM2 级事件”规范，应该在 document 而非 window 上面触发 load 事件。但是，所有浏览器都在 window 上面实现了该事件，以确保向后兼容。
:::
在创建新的\<img\>元素时，可以为其指定一个事件处理程序，以便图像加载完毕后给出提示。此时，最重要的是要在指定 src 属性之前先指定事件
``` js
EventUtil.addHandler(window, "load", function(){
    var image = document.createElement("img");
    EventUtil.addHandler(image, "load", function(event){
        event = EventUtil.getEvent(event);
        alert(EventUtil.getTarget(event).src);
    });
    document.body.appendChild(image);
    image.src = "smile.gif";
});
```
同样的功能也可以通过使用 DOM0 级的 Image 对象实现。在 DOM 出现之前，开发人员经常使用Image 对象在客户端预先加载图像。
``` js
EventUtil.addHandler(window, "load", function(){
    var image = new Image();
    EventUtil.addHandler(image, "load", function(event){
        alert("Image loaded!");
    });
    image.src = "smile.gif";
});
```
\<script\>元素也会触发 load 事件，以便开发人员确定动态加载的 JavaScript 文件是否加载完毕
``` js
EventUtil.addHandler(window, "load", function(){
    var script = document.createElement("script");
    EventUtil.addHandler(script, "load", function(event){
        alert("Loaded");
    });
    script.src = "example.js";
    document.body.appendChild(script);
});
```
\<link\>元素上的 load 事件
``` js
EventUtil.addHandler(window, "load", function(){
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel= "stylesheet";
    EventUtil.addHandler(link, "load", function(event){
        alert("css loaded");
    });
    link.href = "example.css";
    document.getElementsByTagName("head")[0].appendChild(link);
});
```
2. unload 事件
与 load 事件对应的是 unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生 unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。与 load 事件类似，也有两种指定 onunload 事件处理程序的方式。
``` js
EventUtil.addHandler(window, "unload", function(event){
    alert("Unloaded");
});
```
指定事件处理程序的第二种方式，也是为\<body\>元素添加一个特性（与 load 事件相似），
``` js
<!DOCTYPE html>
<html>
<head>
    <title>Unload Event Example</title>
</head>
<body onunload="alert('Unloaded!')">
</body>
</html>
```
3. resize 事件
当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件。这个事件在 window（窗口）上面触发，因此可以通过 JavaScript 或者\<body\>元素中的 onresize 特性来指定事件处理程序。
``` js
EventUtil.addHandler(window, "resize", function(event){
    alert("Resized");
});
```
4. scroll 事件
虽然 scroll 事件是在 window 对象上发生的，但它实际表示的则是页面中相应元素的变化。在混杂模式下，可以通过\<body\>元素的 scrollLeft 和 scrollTop 来监控到这一变化；
``` js
EventUtil.addHandler(window, "scroll", function(event){
    if (document.compatMode == "CSS1Compat"){
        alert(document.documentElement.scrollTop);
    } else {
        alert(document.body.scrollTop);
    }
});
```
#### 13.4.2 焦点事件
焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与 document.hasFocus()方法及document.activeElement 属性配合，可以知晓用户在页面上的行踪。
* blur：在元素失去焦点时触发。这个事件不会冒泡；所有浏览器都支持它。
* DOMFocusIn：在元素获得焦点时触发。这个事件与 HTML 事件 focus 等价，但它冒泡。只有Opera 支持这个事件。 DOM3 级事件废弃了 DOMFocusIn，选择了 focusin。
* DOMFocusOut：在元素失去焦点时触发。这个事件是 HTML 事件 blur 的通用版本。只有 Opera支持这个事件。 DOM3 级事件废弃了 DOMFocusOut，选择了 focusout。
* focus：在元素获得焦点时触发。这个事件不会冒泡；所有浏览器都支持它。
* focusin：在元素获得焦点时触发。这个事件与 HTML 事件 focus 等价，但它冒泡。支持这个事件的浏览器有 IE5.5+、 Safari 5.1+、 Opera 11.5+和 Chrome。
* focusout：在元素失去焦点时触发。这个事件是 HTML 事件 blur 的通用版本。支持这个事件的浏览器有 IE5.5+、 Safari 5.1+、 Opera 11.5+和 Chrome。
当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件：
(1) focusout 在失去焦点的元素上触发；
(2) focusin 在获得焦点的元素上触发；
(3) blur 在失去焦点的元素上触发；
(4) DOMFocusOut 在失去焦点的元素上触发；
(5) focus 在获得焦点的元素上触发；
(6) DOMFocusIn 在获得焦点的元素上触发。

#### 13.4.3 鼠标与滚轮事件
鼠标事件是 Web 开发中最常用的一类事件，毕竟鼠标还是最主要的定位设备。 DOM3 级事件中定义了 9 个鼠标事件，
* click：在用户单击主鼠标按钮（一般是左边的按钮）或者按下回车键时触发。这一点对确保易访问性很重要，意味着 onclick 事件处理程序既可以通过键盘也可以通过鼠标执行。
* dblclick：在用户双击主鼠标按钮（一般是左边的按钮）时触发。从技术上说，这个事件并不是 DOM2 级事件规范中规定的，但鉴于它得到了广泛支持，所以 DOM3 级事件将其纳入了标准。
* mousedown：在用户按下了任意鼠标按钮时触发。不能通过键盘触发这个事件。
* mouseenter：在鼠标光标从元素外部首次移动到元素范围之内时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。 DOM2 级事件并没有定义这个事件，但 DOM3 级事件将它纳入了规范。 IE、 Firefox 9+和 Opera 支持这个事件。
* mouseleave：在位于元素上方的鼠标光标移动到元素范围之外时触发。这个事件不冒泡，而且在光标移动到后代元素上不会触发。 DOM2 级事件并没有定义这个事件，但 DOM3 级事件将它纳入了规范。 IE、 Firefox 9+和 Opera 支持这个事件。
* mousemove：当鼠标指针在元素内部移动时重复地触发。不能通过键盘触发这个事件。
* mouseout：在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。不能通过键盘触发这个事件。
* mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。不能通过键盘触发这个事件。
* mouseup：在用户释放鼠标按钮时触发。不能通过键盘触发这个事件。
除了 mouseenter 和 mouseleave，所有鼠标事件都会冒泡，也可以被取消，而取消鼠标事件将会影响浏览器的默认行为。
只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件；如果mousedown 或 mouseup 中的一个被取消，就不会触发 click 事件。
1. 客户区坐标位置
鼠标事件都是在浏览器视口中的特定位置上发生的。这个位置信息保存在事件对象的 clientX 和clientY 属性中。
``` js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    alert("Client coordinates: " + event.clientX + "," + event.clientY);
});
```

2. 页面坐标位置
通过客户区坐标能够知道鼠标是在视口中什么位置发生的，而页面坐标通过事件对象的 pageX 和pageY 属性
``` js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    alert("Page coordinates: " + event.pageX + "," + event.pageY);
});
```
IE8 及更早版本不支持事件对象上的页面坐标，不过使用客户区坐标和滚动信息可以计算出来。这时候需要用到 document.body（混杂模式）或 document.documentElement（标准模式）中的scrollLeft 和 scrollTop 属性。
``` js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div,"click",function(event){
    event = EventUtil.getEvent(event);
    var pageX = event.pageX,
        pageY = event.pageY;

    if(pageX === undefined){
        pageX = event.clientX + (document.body.scrollLeft||documentElement.scrollLeft);
    }
    if(pageY === undefined){
        pageY = event.clientY + (document.body.scrollTop||document.documentElement.scrollTop);
    }

    alert("Page coordinates: " + pageX + "," + pageY);
});
```
3. 屏幕坐标位置
鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通过 screenX 和 screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。
``` js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div,"click",function(event){
    event = EventUtil(event);
    alert("screen coordinates:"+event.screenX+","+event.screenY);
})
```
4. 修改键
虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要采取的操作。
``` js
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
    event = EventUtil.getEvent(event);
    var keys = new Array();
    if (event.shiftKey){
    keys.push("shift");
    }
    if (event.ctrlKey){
    keys.push("ctrl");
    }
    if (event.altKey){
    keys.push("alt");
    }
    if (event.metaKey){
    keys.push("meta");
    }
    alert("Keys: " + keys.join(","));
});
```
5. 相关元素
在发生 mouseover 和 mouseout 事件时，还会涉及更多的元素。
``` js
var EventUtil = {
    getRelatedTarget:function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    //
};
```
6. 鼠标按钮
只有在主鼠标按钮被单击（或键盘回车键被按下）时才会触发 click 事件，因此检测按钮的信息并不是必要的。但对于 mousedown 和 mouseup 事件来说，则在其 event 对象存在一个 button 属性，表示按下或释放的按钮。 DOM 的 button 属性可能有如下 3 个值： 0 表示主鼠标按钮， 1 表示中间的鼠标按钮（鼠标滚轮按钮）， 2 表示次鼠标按钮。
* 0：表示没有按下按钮。
* 1：表示按下了主鼠标按钮。
* 2：表示按下了次鼠标按钮。
* 3：表示同时按下了主、次鼠标按钮。
* 4：表示按下了中间的鼠标按钮。
* 5：表示同时按下了主鼠标按钮和中间的鼠标按钮。
* 6：表示同时按下了次鼠标按钮和中间的鼠标按钮。
* 7：表示同时按下了三个鼠标按钮。
``` js
var EventUtil = {
    getButton:function(event){
        if(document.inplementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(evemt.button){
                case 0：
                case 1：
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
};
```
7. 更多的事件信息
“DOM2 级事件”规范在 event 对象中还提供了 detail 属性，用于给出有关事件的更多信息。对于鼠标事件来说， detail 中包含了一个数值，表示在给定位置上发生了多少次单击。在同一个元素上相继地发生一次 mousedown 和一次 mouseup 事件算作一次单击。 
* altLeft： 布尔值，表示是否按下了 Alt 键。 如果 altLeft 的值为 true，则 altKey 的值也为 true。
* ctrlLeft：布尔值，表示是否按下了 Ctrl 键。如果 ctrlLeft 的值为 true，则 ctrlKey 的值也为 true。
* offsetX：光标相对于目标元素边界的 x 坐标。
* offsetY：光标相对于目标元素边界的 y 坐标。
* shiftLeft：布尔值，表示是否按下了 Shift 键。如果 shiftLeft 的值为 true，则 shiftKey的值也为 true。
8. 鼠标滚轮事件
IE 6.0 首先实现了mousewheel事件。此后，Opera、Chrome 和 Safari 也都实现了这个事件。当用户通过鼠标滚轮与页面交互、在垂直方向上滚动页面时（无论向上还是向下），就会触发 mousewheel事件。
在 Opera 9.5 之前的版本中， wheelDelta 值的正负号是颠倒的。如果你打算支持早期的 Opera 版本，就需要使用浏览器检测技术来确定实际的值，
``` js
EventUtil.addHandler(document, "mousewheel", function(event){
    event = EventUtil.getEvent(event);
    var delta = (client.engine.opera && client.engine.opera < 9.5 ?-event.wheelDelta : event.wheelDelta);
    alert(delta);
});
```

![](/images/frontend-javascript-event-mousescroll.jpg)
添加事件处理程序
``` js
EventUtil.addHandler(document, "mousewheel", function(event){
    event = EventUtil.getEvent(event);
    alert(event.wheelDelta);
});
//跨浏览器环境下的解决方案
var EventUtil = {
    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
        }else{
            return -event.detail*40;
        }
    },
};

(function(){
    function handleMouseWheel(event){
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
        alert(delta);
        }
        EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
        EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel);
})();
```
9. 触摸设备
* 不支持 dblclick 事件。双击浏览器窗口会放大画面，而且没有办法改变该行为。
* 轻击可单击元素会触发 mousemove 事件。如果此操作会导致内容变化，将不再有其他事件发生；如果屏幕没有因此变化，那么会依次发生 mousedown、 mouseup 和 click 事件。轻击不可单击的元素不会触发任何事件。可单击的元素是指那些单击可产生默认操作的元素（如链接），或者那些已经被指定了 onclick 事件处理程序的元素。
* mousemove 事件也会触发 mouseover 和 mouseout 事件。
* 两个手指放在屏幕上且页面随手指移动而滚动时会触发 mousewheel 和 scroll 事件。
10. 无障碍性问题
* 使用 click 事件执行代码。有人指出通过 onmousedown 执行代码会让人觉得速度更快，对视力正常的人来说这是没错的。但是，在屏幕阅读器中，由于无法触发 mousedown 事件，结果就会造成代码无法执行。
* 不要使用 onmouseover 向用户显示新的选项。原因同上，屏幕阅读器无法触发这个事件。如果确实非要通过这种方式来显示新选项，可以考虑添加显示相同信息的键盘快捷方式。
* 不要使用 dblclick 执行重要的操作。键盘无法触发这个事件
#### 13.4.4 键盘与文本事件
用户在使用键盘时会触发键盘事件。“DOM2 级事件”最初规定了键盘事件，但在最终定稿之前又删除了相应的内容。结果，对键盘事件的支持主要遵循的是 DOM0 级。
有 3 个键盘事件，简述如下。
* keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
* keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。按下 Esc 键也会触发这个事件。 Safari 3.1 之前的版本也会在用户按下非字符键时触发keypress事件。
* keyup：当用户释放键盘上的键时触发。
只有一个文本事件： textInput。这个事件是对 keypress 的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发 textInput 事件
1. 键码
在发生 keydown 和 keyup 事件时， event 对象的 keyCode 属性中会包含一个代码，与键盘上一个特定的键对应。
``` js
var textbox = document.getElementById("myText");
    EventUtil.addHandler(textbox, "keyup", function(event){
        event = EventUtil.getEvent(event);
        alert(event.keyCode);
});
```
键 |键 码 |键 |键 码
--|--|--|--
退格（ Backspace） |8| 数字小键盘1| 97
制表（ Tab） |9 |数字小键盘2 |98
回车（ Enter）| 13 数字小键盘3 |99
上档（ Shift） |16 数字小键盘4 |100
控制（ Ctrl） |17 数字小键盘5 |101
Alt |18| 数字小键盘6 |102
暂停/中断（ Pause/Break） |19| 数字小键盘7 |103
大写锁定（ Caps Lock） |20 |数字小键盘8 |104
退出（ Esc） |27 |数字小键盘9 |105
上翻页（ Page Up）|33 |数字小键盘+ |107
下翻页（ Page Down） |34| 数字小键盘及大键盘上的- |109
结尾（ End）| 35 |数字小键盘 |. |110
开头（ Home） |36| 数字小键盘 | 111
左箭头（ Left Arrow）| 37 |F1| 112
上箭头（ Up Arrow） |38| F2| 113
右箭头（ Right Arrow）| 39 |F3 |114
下箭头（ Down Arrow） |40 |F4 |115
插入（ Ins） |45| F5 |116
删除（ Del） |46 |F6 |117
左Windows键 |91 |F7 |118
右Windows键 |92 |F8 |119
上下文菜单键| 93| F9|120
数字小键盘0| 96 |F10 |121
F11 |122 正斜杠 |191
F12| 123 沉音符（ `） |192
数字锁（ Num Lock）| 144 等于 61
滚动锁（ Scroll Lock）| 145 |左方括号 |219
分号（ IE/Safari/Chrome中）| 186| 反斜杠（ \）| 220
分号（ Opera/FF中）、 59| 右方括号| 221
小于| 188 |单引号| 222
大于 |190||

2. 字符编码
发生 keypress 事件意味着按下的键会影响到屏幕中文本的显示。在所有浏览器中，按下能够插入或删除字符的键都会触发 keypress 事件；按下其他键能否触发此事件因浏览器而异
``` js
var EventUtil = {
    //省略的代码
    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    //省略的代码
};
```
3. DOM3 级变化
尽管所有浏览器都实现了某种形式的键盘事件， DOM3 级事件还是做出了一些改变。比如， DOM3级事件中的键盘事件，不再包含 charCode 属性，而是包含两个新属性： key 和 char。

``` js
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "keypress", function(event){
    event = EventUtil.getEvent(event);
    var identifier = event.key || event.keyIdentifier;
    if (identifier){
        alert(identifier);
}
});
```
由于存在跨浏览器问题，因此本书不推荐使用 key、 keyIdentifier 或 char。
DOM3 级事件还添加了一个名为 location 的属性，这是一个数值，表示按下了什么位置上的键：0 表示默认键盘， 1 表示左侧位置（例如左位的 Alt 键）， 2 表示右侧位置（例如右侧的 Shift 键）， 3 表示数字小键盘， 4 表示移动设备键盘（也就是虚拟键盘）， 5 表示手柄（如任天堂 Wii 控制器）。
``` js
var textbox = document.getElementById("myText");
    EventUtil.addHandler(textbox, "keypress", function(event){
        event = EventUtil.getEvent(event);
        var loc = event.location || event.keyLocation;
        if (loc){
            alert(loc);
}
});
```
4. textInput 事件
“DOM3 级事件”规范中引入了一个新事件，名叫 textInput。根据规范，当用户在可编辑区域中输入字符时，就会触发这个事件。这个用于替代 keypress 的 textInput 事件的行为稍有不同。区别之一就是任何可以获得焦点的元素都可以触发 keypress 事件，但只有可编辑区域才能触发 textInput事件。区别之二是 textInput 事件只会在用户按下能够输入实际字符的键时才会被触发，而 keypress事件则在按下那些能够影响文本显示的键时也会触发（例如退格键）
``` js
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "textInput", function(event){
    event = EventUtil.getEvent(event);
    alert(event.data);
});
```
另外， event 对象上还有一个属性，叫 inputMethod，表示把文本输入到文本框中的方式。
* 0，表示浏览器不确定是怎么输入的。
* 1，表示是使用键盘输入的。
* 2，表示文本是粘贴进来的。
* 3，表示文本是拖放进来的。
* 4，表示文本是使用 IME 输入的。
* 5，表示文本是通过在表单中选择某一项输入的。
* 6，表示文本是通过手写输入的（比如使用手写笔）。
* 7，表示文本是通过语音输入的。
* 8，表示文本是通过几种方法组合输入的。
* 9，表示文本是通过脚本输入的。
#### 13.4.5 复合事件
复合事件（ composition event）是 DOM3 级事件中新添加的一类事件，用于处理 IME 的输入序列。IME（ Input Method Editor，输入法编辑器）可以让用户输入在物理键盘上找不到的字符。
* compositionstart：在 IME 的文本复合系统打开时触发，表示要开始输入了。
* compositionupdate：在向输入字段中插入新字符时触发。
* compositionend：在 IME 的文本复合系统关闭时触发，表示返回正常键盘输入状态。复合事件与文本事件在很多方面都很相似。在触发复合事件时，目标是接收文本的输入字段。但它比文本事件的事件对象多一个属性 data，其中包含以下几个值中的一个：
* 如果在 compositionstart 事件发生时访问，包含正在编辑的文本（例如，已经选中的需要马上替换的文本）；
* 如果在 compositionupdate 事件发生时访问，包含正插入的新字符；
* 如果在 compositionend 事件发生时访问，包含此次输入会话中插入的所有字符。
``` js
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "compositionstart", function(event){
    event = EventUtil.getEvent(event);
    alert(event.data);
});
EventUtil.addHandler(textbox, "compositionupdate", function(event){
    event = EventUtil.getEvent(event);
    alert(event.data);
});
EventUtil.addHandler(textbox, "compositionend", function(event){
    event = EventUtil.getEvent(event);
    alert(event.data);
});
```
#### 13.4.6 变动事件
DOM2 级的变动（ mutation）事件能在 DOM 中的某一部分发生变化时给出提示。变动事件是为 XML或 HTML DOM 设计的，并不特定于某种语言。 DOM2 级定义了如下变动事件
* DOMSubtreeModified：在 DOM 结构中发生任何变化时触发。这个事件在其他任何事件触发后都会触发。
* DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。
* DOMNodeRemoved：在节点从其父节点中被移除时触发。
* DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在 DOMNodeInserted 之后触发。
* DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在 DOMNodeRemoved 之后触发。
* DOMAttrModified：在特性被修改之后触发。
* DOMCharacterDataModified：在文本节点的值发生变化时触发。
使用下列代码可以检测出浏览器是否支持变动事件：
``` js
var isSupported = document.implementation.hasFeature("MutationEvents", "2.0");
```

1. 删除节点
在使用removeChild()或replaceChild()从 DOM中删除节点时，首先会触发DOMNodeRemoved事件。这个事件的目标（ event.target）是被删除的节点，而 event.relatedNode 属性中包含着对目标节点父节点的引用。在这个事件触发时，节点尚未从其父节点删除，因此其 parentNode 属性仍然指向父节点（与 event.relatedNode 相同）。这个事件会冒泡，因而可以在 DOM 的任何层次上面处理它
``` html
<! DOCTYPE html>
<html>
<head>
    <title>Node Removal Events Example</title>
</head>
<body>
    <ul id="myList">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</body>
</html>
```
```  js
EventUtil.addHandler(window, "load", function(event){
    var list = document.getElementById("myList");
EventUtil.addHandler(document, "DOMSubtreeModified", function(event){
    alert(event.type);
    alert(event.target);
});
EventUtil.addHandler(document, "DOMNodeRemoved", function(event){
    alert(event.type);
    alert(event.target);
    alert(event.relatedNode);
});
EventUtil.addHandler(list.firstChild, "DOMNodeRemovedFromDocument", function(event){
    alert(event.type);
    alert(event.target);
});
    list.parentNode.removeChild(list);
});
```
2. 插入节点
在使用 appendChild()、 replaceChild()或 insertBefore()向 DOM 中插入节点时，首先会触发 DOMNodeInserted 事件。这个事件的目标是被插入的节点，而 event.relatedNode 属性中包含一个对父节点的引用。在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在 DOM 的各个层次上处理它。
1.DOMNodeInsertedIntoDocument
2.DOMSubtreeModified
``` js
EventUtil.addHandler(window, "load", function(event){
    var list = document.getElementById("myList");
    var item = document.createElement("li");
    item.appendChild(document.createTextNode("Item 4"));
    EventUtil.addHandler(document, "DOMSubtreeModified", function(event){
        alert(event.type);
        alert(event.target);
    });
    EventUtil.addHandler(document, "DOMNodeInserted", function(event){
        alert(event.type);
        alert(event.target);
        alert(event.relatedNode);
    });
    EventUtil.addHandler(item, "DOMNodeInsertedIntoDocument", function(event){
        alert(event.type);
        alert(event.target);
    });
        list.appendChild(item);
});
```
以上代码首先创建了一个包含文本"Item4"的新\<li\>元素。由于DOMSubtreeModified和DOMNodeInserted事件是冒泡的，所以把它们的事件处理程序添加到了文档中。在将列表项插入到其父节点之前，先将DOMNodeInsertedIntoDocument事件的事件处理程序添加给它。最后一步就是使用appendChild()来添加这个列表项；此时，事件开始依次被触发。首先是在新\<li\>元素上触发DOMNodeInserted事件，其relatedNode是\<ul\>元素。然后是触发新\<li\>元素上的DOMNodeInsertedIntoDocument事件，最后触发的是\<ul\>元素上的DOMSubtreeModified事件。
#### 13.4.7 HTML5 事件
DOM 规范没有涵盖所有浏览器支持的所有事件。很多浏览器出于不同的目的——满足用户需求或解决特殊问题，还实现了一些自定义的事件。 HTML5 详尽列出了浏览器应该支持的所有事件。本节只讨论其中得到浏览器完善支持的事件，但并非全部事件。（其他事件会在本书其他章节讨论。）
1. contextmenu 事件
 contextmenu 这个事件，用以表示何时应该显示上下文菜单，以便开发人员取消默认的上下文菜单而提供自定义的菜单。
 ``` html
<!DOCTYPE html>
<html>
<head>
    <title>ContextMenu Event Example</title>
</head>
<body>
    <div id="myDiv">Right click or Ctrl+click me to get a custom context menu.Click anywhere else to get the default context menu.</div>
    <ul id="myMenu" style="position:absolute;visibility:hidden;background-color:silver">
        <li><a href="http://www.nczonline.net">Nicholas’ site</a></li>
        <li><a href="http://www.wrox.com">Wrox site</a></li>
        <li><a href="http://www.yahoo.com">Yahoo!</a></li>
    </ul>
</body>
</html>
 ```
 这里的\<div\>元素包含一个自定义的上下文菜单。其中，\<ul\>元素作为自定义上下文菜单，并且在初始时是隐藏的。实现这个例子的 JavaScript 代码如下所示。
 ``` js
EventUtil.addHandler(window, "load", function(event){
    var div = document.getElementById("myDiv");
        EventUtil.addHandler(div, "contextmenu", function(event){
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);

        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });
    EventUtil.addHandler(document, "click", function(event){
        document.getElementById("myMenu").style.visibility = "hidden";
    });
});
 ```
为\<div\>元素添加了 oncontextmenu 事件的处理程序。这个事件处理程序首先会取消默认行为，以保证不显示浏览器默认的上下文菜单。然后，再根据 event 对象 clientX 和clientY 属性的值，来确定放置\<ul\>元素的位置。最后一步就是通过将 visibility 属性设置为"visible"来显示自定义上下文菜单。另外，还为 document 添加了一个 onclick 事件处理程序，以便用户能够通过鼠标单击来隐藏菜单（单击也是隐藏系统上下文菜单的默认操作）。
2. beforeunload 事件
之所以有发生在 window 对象上的 beforeunload 事件，是为了让开发人员有可能在页面卸载前阻止这一操作。这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。但是，不能彻底取消这个事件，因为那就相当于让用户无法离开当前页面了。
``` js
EventUtil.addHandler("window","beforeunloaded",function(event){
    event = EventUtil.getEvent(event);
    var message = "I'm really going to miss you if you go";
    event.returnValue = message;
    return message;
})
```
3. DOMContentLoaded 事件
DOMContentLoaded 事件则在形成完整的 DOM 树之后就会触发，不理会图像、 JavaScript 文件、 CSS 文件或其他资源是否已经下载完毕。与 load 事件不同，DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。
``` js
EventUtil.addHandler(document,"DOMOontentLoaded",function(event){
    alert("Content Loaded")
});
```
4. readystatechange 事件
IE 为 DOM 文档中的某些部分提供了 readystatechange 事件。这个事件的目的是提供与文档或元素的加载状态有关的信息
* uninitialized（未初始化）：对象存在但尚未初始化。
* loading（正在加载）：对象正在加载数据。
* loaded（加载完毕）：对象加载数据完成。
* interactive（交互）：可以操作对象了，但还没有完全加载。
* complete（完成）：对象已经加载完毕。
``` js
EventUtil.addHandler(document,"readystatechange",funtion(event){
    if(document.readyState == "interactive"){
        alert("content loaded")
    }
});
```
5. pageshow 和 pagehide 事件
Firefox 和 Opera 有一个特性，名叫“往返缓存”（ back-forward cache，或 bfcache），可以在用户使用浏览器的“后退”和“前进”按钮时加快页面的转换速度。
第一个事件就是 pageshow，这个事件在页面显示时触发，无论该页面是否来自 bfcache。在重新加载的页面中， pageshow 会在 load 事件触发后触发；而对于 bfcache 中的页面， pageshow 会在页面状态完全恢复的那一刻触发。另外要注意的是，虽然这个事件的目标是 document，但必须将其事件处理程序添加到 window。
``` js
(function(){
    var showCount = 0;
    EventUtil.addHandler(window,"load",function(){
        alert("Load fired");
    });
    EventUtil.addHandler(window,"pageshow",function(){
        showcount++;
        alert("show has been fired"+ showCount+"times");
        //persistent属性
        alert("times,persistent"+event.persisted);
    })
})();
```
6. hashchange 事件
HTML5 新增了 hashchange 事件，以便在 URL 的参数列表（及 URL 中“#”号后面的所有字符串）发生变化时通知开发人员。之所以新增这个事件，是因为在 Ajax 应用中，开发人员经常要利用 URL 参数列表来保存状态或导航信息。
``` js
EventUtil.addHandler(window, "hashchange", function(event){
    alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
});
```
#### 13.4.8 设备事件

1. orientationchange 事件
苹果公司为移动 Safari 中添加了 orientationchange 事件，以便开发人员能够确定用户何时将设备由横向查看模式切换为纵向查看模式。
0 表示肖像模式， 90 表示向左旋转的横向模式（“主屏幕”按钮在右侧）， -90 表示向右旋转的横向模式（“主屏幕”按钮在左侧）。
![](/images/frontend-JavaScript-event-device-orientation.jpg)

``` js
EventUtil.addHandler(window,"loaded",function(event){
    var div = document.getElementById("myDiv");
    div.innerHTML = "current orientation is"+window.orientation;
    EventUtil.addHandler(window, "orientationchange", function(event){
        div.innerHTML = "Current orientation is " + window.orientation;
    });
})
```
2. MozOrientation 事件
Firefox 3.6 为检测设备的方向引入了一个名为 MozOrientation 的新事件。（前缀 Moz 表示这是特定于浏览器开发商的事件，不是标准事件。）
``` js
EventUtil.addHandler(window, "MozOrientation", function(event){
//响应事件
});
```
此时的 event 对象包含三个属性： x、 y 和 z。这几个属性的值都介于 1 到-1 之间，表示不同坐标轴上的方向。在静止状态下， x 值为 0， y 值为 0， z 值为 1（表示设备处于竖直状态）。如果设备向右倾斜， x 值会减小；反之，向左倾斜， x 值会增大。类似地，如果设备向远离用户的方向倾斜， y 值会减小，向接近用户的方向倾斜， y 值会增大。z 轴检测垂直加速度度，1 表示静止不动，在设备移动时值会减小。（失重状态下值为 0。）以下是输出这三个值的一个简单的例子。
``` js
EventUtil.addHandler(window, "MozOrientation", function(event){
    var output = document.getElementById("output");
    output.innerHTML = "X=" + event.x + ", Y=" + event.y + ", Z=" + event.z +"<br>";
});
```
3. deviceorientation 事件
 deviceorientation 事件的意图是告诉开发人员设备在空间中朝向哪儿，而不是如何移动。
 * alpha：在围绕 z 轴旋转时（即左右旋转时）， y 轴的度数差；是一个介于 0 到 360 之间的浮点数。
* beta：在围绕 x 轴旋转时（即前后旋转时）， z 轴的度数差；是一个介于180 到 180 之间的浮点数。
* gamma：在围绕 y 轴旋转时（即扭转设备时）， z 轴的度数差；是一个介于90 到 90 之间的浮点数。
* absolute：布尔值，表示设备是否返回一个绝对值。
* compassCalibrated：布尔值，表示设备的指南针是否校准过。
``` js
EventUtil.addHandler(window, "deviceorientation", function(event){
    var output = document.getElementById("output");
    output.innerHTML = "Alpha=" + event.alpha + ", Beta=" + event.beta +", Gamma=" + event.gamma + "<br>";
});
```
4. devicemotion 事件
DeviceOrientation Event 规范还定义了一个 devicemotion 事件。这个事件是要告诉开发人员设备什么时候移动，而不仅仅是设备方向如何改变。
触发 devicemotion 事件时，事件对象包含以下属性。
* acceleration：一个包含 x、 y 和 z 属性的对象，在不考虑重力的情况下，告诉你在每个方上的加速度。
* accelerationIncludingGravity：一个包含 x、 y 和 z 属性的对象，在考虑 z 轴自然重力加速度的情况下，告诉你在每个方向上的加速度。
* interval：以毫秒表示的时间值，必须在另一个 devicemotion 事件触发前传入。这个值在每个事件中应该是一个常量
* rotationRate：一个包含表示方向的 alpha、 beta 和 gamma 属性的对象。

``` js
EventUtil.addHandler(window, "devicemotion", function(event){
    var output = document.getElementById("output");
    if (event.rotationRate !== null){
        output.innerHTML += "Alpha=" + event.rotationRate.alpha + ", Beta=" +event.rotationRate.beta + ", Gamma=" +event.rotationRate.gamma;
    }
});
```
#### 13.4.9 触摸与手势事件
1. 触摸事件
* touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
* touchmove： 当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用 preventDefault()可以阻止滚动。
* touchend：当手指从屏幕上移开时触发。
* touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。
上面这几个事件都会冒泡，也都可以取消。每个触摸事件的 event 对象都提供了在鼠标事件中常见的属性：bubbles、 cancelable、 view、 clientX、 clientY、 screenX、 screenY、 detail、 altKey、 shiftKey、ctrlKey 和 metaKey。
除了常见的 DOM 属性外，触摸事件还包含下列三个用于跟踪触摸的属性。
* touches：表示当前跟踪的触摸操作的 Touch 对象的数组。
* targetTouchs：特定于事件目标的 Touch 对象的数组。
* changeTouches：表示自上次触摸以来发生了什么改变的 Touch 对象的数组。每个 Touch 对象包含下列属性。
* clientX：触摸目标在视口中的 x 坐标。
* clientY：触摸目标在视口中的 y 坐标。
* identifier：标识触摸的唯一 ID。
* pageX：触摸目标在页面中的 x 坐标。
* pageY：触摸目标在页面中的 y 坐标。
* screenX：触摸目标在屏幕中的 x 坐标。
* screenY：触摸目标在屏幕中的 y 坐标。
* target：触摸的 DOM 节点目标。
``` js
function handleTouchEvent(event){
    //只跟踪一次触摸
    if (event.touches.length == 1){
        var output = document.getElementById("output");
        switch(event.type){
        case "touchstart":
        output.innerHTML = "Touch started (" + event.touches[0].clientX +"," + event.touches[0].clientY + ")";
        break;
        case "touchend":
        output.innerHTML += "<br>Touch ended (" +event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
        break;
        case "touchmove":
        event.preventDefault(); //阻止滚动
        output.innerHTML += "<br>Touch moved (" +event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
        break;
        }
    }
}
EventUtil.addHandler(document, "touchstart", handleTouchEvent);
EventUtil.addHandler(document, "touchend", handleTouchEvent);
EventUtil.addHandler(document, "touchmove", handleTouchEvent);
```
2. 手势事件
iOS 2.0 中的 Safari 还引入了一组手势事件。当两个手指触摸屏幕时就会产生手势，手势通常会改变显示项的大小，或者旋转显示项。有三个手势事件，分别介绍如下。
* gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
* gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。
* gestureend：当任何一个手指从屏幕上面移开时触发
```  js
function handleGestureEvent(event){
var output = document.getElementById("output");
    switch(event.type){
    case "gesturestart":
        output.innerHTML = "Gesture started (rotation=" + event.rotation +",scale=" + event.scale + ")";
    break;
    case "gestureend":
        output.innerHTML += "<br>Gesture ended (rotation=" + event.rotation +",scale=" + event.scale + ")";
    break;
    case "gesturechange":
        output.innerHTML += "<br>Gesture changed (rotation=" + event.rotation +",scale=" + event.scale + ")";
    break;
    }
}
document.addEventListener("gesturestart", handleGestureEvent, false);
document.addEventListener("gestureend", handleGestureEvent, false);
document.addEventListener("gesturechange", handleGestureEvent, false);
```
触摸事件也会返回 rotation 和 scale 属性，但这两个属性只会在两个手指与屏幕保持接触时才会发生变化。一般来说，使用基于两个手指的手势事件，要比管理触摸事件中的所有交互要容易得多

### 13.5 内存和性能
#### 13.5.1 事件委托
对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
``` html
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>
```
传统做法，不加事件委托
``` js
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
    location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
    document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
    alert("hi");
});
```
添加事件委托：
``` js
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch(target.id){
    case "doSomething":
        document.title = "I changed the document's title";
    break;
    case "goSomewhere":
        location.href = "http://www.wrox.com";
    break;
    case "sayHi":
        alert("hi");
    break;
    }
})
```
#### 13.5.2 移除事件处理程序
每当将事件处理程序指定给元素时，运行中的浏览器代码与支持页面交互的 JavaScript 代码之间就会建立一个连接。这种连接越多，页面执行起来就越慢。
``` html
<div id="myDiv">
<input type="button" value="Click Me" id="myBtn">
</div>
<script type="text/javascript">
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    //先执行某些操作
    btn.onclick = null; //移除事件处理程序
    document.getElementById("myDiv").innerHTML = "Processing...";
};
</script>
```
### 13.6 模拟事件
#### 13.6.1 DOM中的事件模拟
可以在 document 对象上使用 createEvent()方法创建 event 对象。这个方法接收一个参数，即表示要创建的事件类型的字符串。
* UIEvents：一般化的 UI 事件。 鼠标事件和键盘事件都继承自 UI 事件。 DOM3 级中是 UIEvent。
* MouseEvents：一般化的鼠标事件。 DOM3 级中是 MouseEvent。
* MutationEvents：一般化的 DOM 变动事件。 DOM3 级中是 MutationEvent。
* HTMLEvents：一般化的 HTML 事件。没有对应的 DOM3 级事件（ HTML 事件被分散到其他类别中）。
1. 模拟鼠标事件
创建新的鼠标事件对象并为其指定必要的信息，就可以模拟鼠标事件。创建鼠标事件对象的方法是为 createEvent()传入字符串"MouseEvents"。返回的对象有一个名为 initMouseEvent()方法，用于指定与该鼠标事件有关的信息。
* type（字符串）：表示要触发的事件类型，例如"click"。
* bubbles（布尔值）：表示事件是否应该冒泡。为精确地模拟鼠标事件，应该把这个参数设置为true。
* cancelable（布尔值）：表示事件是否可以取消。为精确地模拟鼠标事件，应该把这个参数设置为 true。
* view（ AbstractView）：与事件关联的视图。这个参数几乎总是要设置为 document.defaultView。
* detail（整数）： 与事件有关的详细信息。这个值一般只有事件处理程序使用，但通常都设置为 0。
* screenX（整数）：事件相对于屏幕的 X 坐标。
* screenY（整数）：事件相对于屏幕的 Y 坐标。
* clientX（整数）：事件相对于视口的 X 坐标。
* clientY（整数）：事件想对于视口的 Y 坐标。
* ctrlKey（布尔值）：表示是否按下了 Ctrl 键。默认值为 false。
* altKey（布尔值）：表示是否按下了 Alt 键。默认值为 false。
* shiftKey（布尔值）：表示是否按下了 Shift 键。默认值为 false。
* metaKey（布尔值）：表示是否按下了 Meta 键。默认值为 false。
* button（整数）：表示按下了哪一个鼠标键。默认值为 0。
* relatedTarget（对象）： 表示与事件相关的对象。这个参数只在模拟 mouseover 或 mouseout时使用。
``` js
var btn = document.getElementById("myBtn");
//创建事件对象
var event = document.createEvent("MouseEvents");
//初始化事件对象
event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0,false, false, false, false, 0, null);
//触发事件
btn.dispatchEvent(event);
```
2. 模拟键盘事件
DOM3 级规定，调用 createEvent()并传入"KeyboardEvent"就可以创建一个键盘事件。返回的事件对象会包含一个 initKeyEvent()方法，这个方法接收下列参数。
* type（字符串）：表示要触发的事件类型，如"keydown"。
* bubbles（布尔值）：表示事件是否应该冒泡。为精确模拟鼠标事件，应该设置为 true。
* cancelable（布尔值）：表示事件是否可以取消。为精确模拟鼠标事件，应该设置为 true。
* view （ AbstractView ）：与事件关联的视图。这个参数几乎总是要设置为 document.defaultView。
* key（布尔值）：表示按下的键的键码。
* location（整数）：表示按下了哪里的键。 0 表示默认的主键盘， 1 表示左， 2 表示右， 3 表示数字键盘， 4 表示移动设备（即虚拟键盘）， 5 表示手柄。
* modifiers（字符串）：空格分隔的修改键列表，如"Shift"。
* repeat（整数）：在一行中按了这个键多少次。
由于 DOM3 级不提倡使用 keypress 事件，因此只能利用这种技术来模拟 keydown 和 keyup 事件。
``` js
var textbox = document.getElementById("myTextbox"),
    event;
//以 DOM3 级方式创建事件对象
if (document.implementation.hasFeature("KeyboardEvents", "3.0")){
    event = document.createEvent("KeyboardEvent");
    //初始化事件对象
    event.initKeyboardEvent("keydown", true, true, document.defaultView, "a",0, "Shift", 0);
}
//触发事件
textbox.dispatchEvent(event);
//通用键盘事件
var textbox = document.getElementById("myTextbox");
//创建事件对象
var event = document.createEvent("Events");
//初始化事件对象
event.initEvent(type, bubbles, cancelable);
event.view = document.defaultView;
event.altKey = false;
event.ctrlKey = false;
event.shiftKey = false;
event.metaKey = false;
event.keyCode = 65;
event.charCode = 65;
//触发事件
textbox.dispatchEvent(event);
```
3. 模拟其他事件
虽然鼠标事件和键盘事件是在浏览器中最经常模拟的事件，但有时候同样需要模拟变动事件和HTML 事 件 。 要模拟变动事件 ， 可以使用 createEvent("MutationEvents") 创建一个包含initMutationEvent()方法的变动事件对象 。 这个方法接受的参数包括 ：type、bubbles 、
cancelable、 relatedNode、 preValue、 newValue、 attrName 和 attrChange。
``` js
var event = document.createEvent("MutationEvents");
event.initMutationEvent("DOMNodeInserted", true, false, someNode, "","","",0);
target.dispatchEvent(event);
```
4. 自定义 DOM 事件
DOM3 级还定义了“自定义事件”。自定义事件不是由 DOM 原生触发的，它的目的是让开发人员创建自己的事件。要创建新的自定义事件，可以调用 createEvent("CustomEvent")。返回的对象有一个名为 initCustomEvent()的方法，接收如下 4 个参数。
* type（字符串）：触发的事件类型，例如"keydown"。
* bubbles（布尔值）：表示事件是否应该冒泡。
* cancelable（布尔值）：表示事件是否可以取消。
* detail（对象）：任意值，保存在 event 对象的 detail 属性中
``` js
var div = document.getElementById("myDiv"),
    event;
EventUtil.addHandler(div, "myevent", function(event){
    alert("DIV: " + event.detail);
});
EventUtil.addHandler(document, "myevent", function(event){
    alert("DOCUMENT: " + event.detail);
});
if (document.implementation.hasFeature("CustomEvents", "3.0")){
    event = document.createEvent("CustomEvent");
    event.initCustomEvent("myevent", true, false, "Hello world!");
    div.dispatchEvent(event);
}
```
#### 13.6.2 IE中的事件模拟
调用 document.createEventObject()方法可以在 IE 中创建 event 对象。但与 DOM 方式不同的是，这个方法不接受参数，结果会返回一个通用的 event 对象。
``` js
var btn = document.getElementById("myBtn");
//创建事件对象
var event = document.createEventObject();
//初始化事件对象
event.screenX = 100;
event.screenY = 0;
event.clientX = 0;
event.clientY = 0;
event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.button = 0;
//触发事件
btn.fireEvent("onclick", event);
//采用相同的模式也可以模拟触发 keypress 事件，如下面的例子所示。
var textbox = document.getElementById("myTextbox");
//创建事件对象
var event = document.createEventObject();
//初始化事件对象
event.altKey = false;
event.ctrlKey = false;
event.shiftKey = false;
event.keyCode = 65;
//触发事件
textbox.fireEvent("onkeypress", event);
```
### 13.7 小结
事件是将 JavaScript 与网页联系在一起的主要方式。“DOM3 级事件”规范和 HTML5 定义了常见的大多数事件。即使有规范定义了基本事件，但很多浏览器仍然在规范之外实现了自己的专有事件，从而为开发人员提供更多掌握用户交互的手段。
在使用事件时，需要考虑如下一些内存与性能方面的问题。
* 有必要限制一个页面中事件处理程序的数量，数量太多会导致占用大量内存，而且也会让用户感觉页面反应不够灵敏。
* 建立在事件冒泡机制之上的事件委托技术，可以有效地减少事件处理程序的数量。
* 建议在浏览器卸载页面之前移除页面中的所有事件处理程序。