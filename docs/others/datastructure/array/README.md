# 队列 Array
几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构，数组存储一系列同一种数据类型的值。但在JavaScript里，也可以在数组中保存不同类型的值。但要遵守最佳实践，别这么做

## 创建和初始化数组

``` js
var daysOfWeek = new Array(); //{1}
var daysOfWeek = new Array(7); //{2}
var daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday',
'Thursday', 'Friday', 'Saturday'); //{3}
```

使用new关键字，就能简单地声明并初始化一个数组（行{1}）。用这种方式，还可以创建一个指定长度的数组（行{2}）。另外，也可以直接将数组元素作为参数传递给它的构造器（行{3}）。

``` js
//推荐的写法
var daysOfWeek = [];
//用元素初始化数组
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];
```
``访问元素和迭代数组``
要访问数组里特定位置的元素，可以用中括号传递数值位置，得到想知道的值或者赋新的值。

``` js
for(let i=0;i<daysOfWeek.length;i++){
    console.log(daysOfWeek[i]);
}
```

求斐波那契数列的前num个数字。

``` js
function finonacci(num){
    var fibonacci = []; //{1}
    if(num<=2){
    fibonacci[1] = 1; //{2}
    fibonacci[2] = 2; //{3}
    }else{
    fibonacci[1] = 1; //{2}
    fibonacci[2] = 2; //{3}

    for(var i=3;i<num;i++){
        fibonacci[i] = fibonacci[i-1]+fibonacci[i-2];//{4}
    }
    }

    for(var i=1;i<fibonacci.length;i++){//{5}
        console.log(fibonacci[i]); //{6}
    }
}
```

## 2.3 添加元素

在JavaScript中，数组是一个可以修改的对象。如果添加元素，它就会动态增长。在C和Java等其他语言里，我们要决定数组的大小，想添加元素就要创建一个全新的数组，不能简单地往其中添加所需的元素。

``` js
var numbers = [0,1,2,3,4,5,6,7,8,9];
//add 10
numbers[numbers.length] = 10;
```

### 2.3.1 push

把元素添加到数组的末尾

``` js
numbers.push(11);
numbers.push(12,13);
```

### 2.3.2 插入元素到数组首位

放到数组的首位。为了实现这个需求，首先我们要腾出数组里第一个元素的位置，把所有的元素向右移动一位。我们可以循环数组中的元素，从最后一位+1（长度）开始，将其对应的前一个元素的值赋给它，依次处理，最后把我们想要的值赋给第一个位置（-1）上.

``` js
for(var i=numbers.length;i>=0;i--){
    numbers[i] = numbers[i-1];
}
numbers[0] = -1;
```

![](/images/datastructure-javascript-array-unshift.jpg)

* unshift

``` js
numbers.unshift(-2);
numbers.unshift(-4, -3);
```

## 2.4 删除元素

* pop
要删除数组里最靠后的元素，可以用pop方法：

``` js
numbers.pop();
```

::: tip
通过push和pop方法，就能用数组来模拟栈，
:::

移除数组里的第一个元素 

``` js
for(var i=0;i<numbers.length;i++){
    numbers[i] = numbers[i+1];
}
```

![](/iamges/datastructure-javascript-array-shift.jpg)

把数组里所有的元素都左移了一位。但数组的长度依然是17，这意味着数组中有额外的一个元素（值是undefined）。在最后一次循环里， i + 1引用了一个数组里还未初始化的位置。在Java、 C/C+或C#等一些语言里，这样写可能就会抛出异常了，因此不得不在 numbers.length-1处停止循环。

把数组第一位的值用第二位覆盖了，并没有删除元素

* shift

``` js
numbers.shift();
```

## 在任意位置添加或删除元素

使用splice方法，简单地通过指定位置/索引，就可以删除相应位置和数量的元素：

``` js
numbers.splice(5,3);
```

代码删除了从数组索引5开始的3个元素。这就意味着numbers[5]、 numbers[6]和numbers[7]从数组中删除了。现在数组里的值变成了3、 2、 1、 0、 1、 5、 6、 7、 8、 9、 10、11和12（ 2、 3、 4已经被移除）
::: tip
对于JavaScript数组和对象，我们还可以用delete操作符删除数组中的元素，例如delete numbers[0]。然而，数组位置0的值会变成undefined，也就是说，以上操作等同于numbers[0] = undefined。因此，我们应该始终使用splice、 pop或shift方法来删除数组元素。
:::
把数字2、 3、 4插入数组里，放到之前删除元素的位置上

``` js
numbers.splice(5,0,2,3,4);
```

splice方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数（这个例子里，我们的目的不是删除元素，所以传入0）。第三个参数往后，就是要添加到数组里的值（元素2、 3、 4）。输出会发现值又变成了从3到12。

## 2.6 二维和多维数组

``` js
var averageTempDay1 = [72,75,79,79,81,81];
var averageTempDay2 = [81,79,75,75,73,72];
//使用矩阵（二维数组）来存储
var averageTemp = [];
averageTemp[0] = [72,75,79,79,81,81];
averageTemp[1] = [81,79,75,75,73,72];
```

JavaScript只支持一维数组，并不支持矩阵。但是，我们可以像上面的代码一样，用数组套数
组，实现矩阵或任一多维数组

``` js
//day 1
averageTemp[0] = [];
averageTemp[0][0] = 72;
averageTemp[0][1] = 75;
averageTemp[0][2] = 79;
averageTemp[0][3] = 79;
averageTemp[0][4] = 81;
averageTemp[0][5] = 81;
//day 2
averageTemp[1] = [];
averageTemp[1][0] = 81;
averageTemp[1][1] = 79;
averageTemp[1][2] = 75;
averageTemp[1][3] = 75;
averageTemp[1][4] = 73;
averageTemp[1][5] = 72;
```

### 2.6.1 迭代二维数组的元素

输出数组矩阵元素

``` js
function printMatrix(myMatrix){
    for(var i=0;i<myMatrix.length;i++){
        for(var j=0;j<myMatrix[i].length;j++){
            console.log(myMatrix[i][j]);
        }
    }
}

printMatrix(averageTemp);
```

### 2.6.2 多维数组

创建一个3×3×3的矩阵，每一格里包含矩阵的i（行）、 j（列）及z（深度）之和：

``` js
var matrix3x3x3 = [];
for (var i=0; i<3; i++){
    matrix3x3x3[i] = [];
    for (var j=0; j<3; j++){
        matrix3x3x3[i][j] = [];
        for (var z=0; z<3; z++){
            matrix3x3x3[i][j][z] = i+j+z;
        }
    }
}

//另一种方式
for (var i=0; i<matrix3x3x3.length; i++){
    for (var j=0; j<matrix3x3x3[i].length; j++){
        for (var z=0; z<matrix3x3x3[i][j].length; z++){
            console.log(matrix3x3x3[i][j][z]);
        }
    }
}

```

![三维数组矩阵](/images/datastructure-javascript-array-3dmatrix.jpg)

## 2.7 JavaScript 的数组方法参考

在JavaScript里，数组是可修改的对象，这意味着创建的每个数组都有一些可用的方法

方法名 |描 述
--:|:--
concat | 连接2个或更多数组，并返回结果
every | 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true
filter | 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
forEach | 对数组中的每一项运行给定函数。这个方法没有返回值
join | 将所有的数组元素连接成一个字符串
indexOf | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1
lastIndexOf | 返回在数组中搜索到的与给定参数相等的元素的索引里最大的值
map | 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
reverse | 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个
slice | 传入索引值，将数组里对应索引范围内的元素作为新数组返回
some | 对数组中的每一项运行给定函数，如果任一项返回true，则返回true
sort | 按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数
toString | 将数组作为字符串返回
valueOf | 和toString类似，将数组作为字符串返回

### 2.7.1 数组合并

``` js
var zero = 0;
var positiveNumbers = [1,2,3];
var negativeNumbers = [-3,-2,-1];
var numbers = negativeNumbers.concat(zero, positiveNumbers);
```

### 2.7.2 迭代器函数

``` js
var isEven = function(){
    //如果x是2的倍数，就返回true
    console.log(x);
    return (x%2==0)?true:false;  //return (x % 2 == 0) ? true : false也可以写成return (x % 2== 0)
};
var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
```

1. 用every方法迭代

every方法会迭代数组中的每个元素，直到返回false。

``` js
numbers.every(isEven);
```

2. 用some方法迭代

some方法会迭代数组的每个元素，直到函数返回true

``` js
numbers.some(isEven);
```

3. 用forEach方法迭代

迭代整个数组

``` js
numbers.forEach(function(x){
    console.log((x%2==0));
});
```

4. 使用map和filter方法

``` js
var myMap = numbers.map(isEven);
```

数组myMap里的值是： [false, true, false, true, false, true, false, true,false,true, false, true, false, true, false]。它保存了传入map方法的isEven函数的运行结果。

### 5. 使用reduce方法

reduce方法接收一个函数作为参数，这个函数有四个参数：previousValue、 currentValue、 index和array。

``` js
numbers.reduce(function(previous,current,index){
    return previous + current;
});
```

### 2.7.3 ECMAScript 6 和数组的新功能

方 法 |描 述
--:|:--
@@iterator | 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对
copyWithin | 复制数组中一系列元素到同一数组指定的起始位置
entries | 返回包含数组所有键值对的@@iterator
includes | 如果数组中存在某个元素则返回true，否则返回false。ES7新增
find | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素
findIndex | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素在数组中的索引
fill | 用静态值填充数组
from | 根据已有数组创建一个新数组
keys | 返回包含数组所有索引的@@iterator
of | 根据传入的参数创建一个新数组
values | 返回包含数组中所有值的@@iterator

1. 使用forEach和箭头函数迭代

``` js
numbers.foreach(function(x){
    console.log(x%2==0);
});
```

2. 使用for...of循环迭代

用for循环和forEach方法迭代数组

``` js
for(let n of numbers){
    console.log((n%2==0)?'even':'odd');
}
```

3. 使用ES6新的迭代器（ @@iterator）

``` js
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // 5
```

 数组的entries、 keys和values方法
entries方法:

``` js
let aEntries = numbers.entries(); // 得到键值对的迭代器
console.log(aEntries.next().value); // [0, 1] - 位置0的值为1
console.log(aEntries.next().value); // [1, 2] - 位置1的值为2
console.log(aEntries.next().value); // [2, 3] - 位置2的值为3
```

numbers数组中都是数字， key是数组中的位置， value是保存在数组索引的值

keys方法返回包含数组索引的@@iterator。

``` js
let aKeys = numbers.keys(); // 得到数组索引的迭代器
console.log(aKeys.next()); // {value: 0, done: false }
console.log(aKeys.next()); // {value: 1, done: false }
console.log(aKeys.next()); // {value: 2, done: false }
```

keys方法会返回numbers数组的索引。一旦没有可迭代的值， aKeys.next()就会返回一个value属性为undefined， done属性为true的对象。如果done属性的值为false，就意味着还有可迭代的值

values方法返回的@@iterator则包含数组的值

``` js
let aValues = numbers.values();
console.log(aValues.next()); // {value: 1, done: false }
console.log(aValues.next()); // {value: 2, done: false }
console.log(aValues.next()); // {value: 3, done: false }
```

4. 使用from方法

Array.from方法根据已有的数组创建一个新数组。比如，要复制numbers数组， 可以这样做：

``` js
let numbers2 = Array.from(numbers);
```

还可以传入一个用来过滤值的函数，例子如下：

``` js
let evens = Array.from(numbers, x => (x % 2 == 0));
```

上面的代码会创建一个evens数组，其中只包含numbers数组中的偶数

5. 使用Array.of方法

Array.of方法根据传入的参数创建一个新数组

``` js
let numbers3 = Array.of(1);
let numbers4 = Array.of(1,2,3,4,5,6);
//等于下述代码
let numbers3 = [1];
let numbers4  = [1,2,3,4,5,6];

let numbersCopy = Array.of(...numbers4);
```

6. 使用fill方法

fill方法用静态值填充数组

``` js
let numbersCopy = Array.of(1, 2, 3, 4, 5, 6);
```

numbersCopy数组的length是6，也就是有6个位置。

``` js
numbersCopy.fill(0);
```

numbersCopy数组所有位置的值都会变成0（[0, 0, 0, 0, 0, 0]）

``` js
numbersCopy.fill(2, 1);

```
数组中从1开始的所有位置，值都是2（[0, 2, 2, 2, 2, 2]）。

7. 使用copyWithin方法

copyWithin方法复制数组中的一系列元素到同一数组指定的起始位置

``` js
let copyArray = [1, 2, 3, 4, 5, 6];
//把4、 5、 6三个值复制到数组前三个位置
copyArray.copyWithin(0, 3);
//把4、 5两个值（位置3和4）复制到位置1和2
copyArray = [1, 2, 3, 4, 5, 6];
copyArray.copyWithin(1, 3, 5);
```

### 2.7.4 排序元素

``` js
//反序输出数组numbers
numbers.reverse();
console.log(numbers); //[15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// 
numbers.sort();  //[1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9]

numbers.sort(function(a,b){
    return a-b;
})
```

1. 自定义排序

创建compareFunction来比较元素

``` js
var friends = [
    {name: 'John', age: 30},
    {name: 'Ana', age: 20},
    {name: 'Chris', age: 25}
];
function comparePerson(a, b){
    if (a.age < b.age){
    return -1
}
if (a.age > b.age){
    return 1
}
    return 0;
}
console.log(friends.sort(comparePerson));
```

2. 字符串排序

``` js
var names =['Ana', 'ana', 'john', 'John'];
console.log(names.sort());  //["Ana", "John", "ana", "john"]
```

JavaScript在做字符比较的时候，是根据字符对应的ASCII值来比较的。例如， A、J、a、j对应的ASCII值分别是65、 75、97、 106。

给sort传入一个忽略大小写的比较函数，将会输出["Ana", "ana", "John", "john"]：

``` js
names.sort(function(a,b){
    if(a.toLowerCase()<b.toLowerCase()){
        return -1;
    }
    if(a.toLowerCase()>b.toLowerCase()){
        return 1;
    }
    return 0;
});
```

对带有重音符号的字符做排序的话，用localCompare来实现：

``` js
var names2 = ['Maève', 'Maeve'];
console.log(names2.sort(function(a, b){
    return a.localCompare(b);
}));
```

### 2.7.5 搜索

搜索有两个方法： indexOf方法返回与参数匹配的第一个元素的索引， lastIndexOf返回与参数匹配的最后一个元素的索引。

``` js
console.log(numbers.indexOf(10));   //9
console.log(numbers.indexOf(100));  //1 未找到

numbers.push(10);
console.log(numbers.lastIndexOf(10));
console.log(numbers.lastIndexOf(100));
```

1. ECMAScript 6——find和findIndex方法

``` js
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
function multipleOf13(element, index, array) {
    return (element % 13 == 0) ? true : false;
}
console.log(numbers.find(multipleOf13));
console.log(numbers.findIndex(multipleOf13));
```

find和findIndex的不同之处在于， find方法返回第一个满足条件的值， findIndex方法则返回这个值在数组里的索引。

2. ECMAScript 7——使用includes方法

如果数组里存在某个元素， includes方法会返回true，否则返回false。

``` js
console.log(numbers.includes(15));
console.log(numbers.includes(20));

let numbers2 = [7, 6, 5, 4, 3, 2, 1];
console.log(numbers2.includes(4, 5));//false 5后不包括4
```

### 2.7.6 输出数组为字符串

把数组里所有元素输出为一个字符串，可以用toString方法：

``` js
console.log(numbers.toString());
//1、 2、 3、 4、 5、 6、 7、 8、 9、 10、 11、 12、 13、 14、 15

var numbersString = numbers.join('-');
console.log(numbersString);
//1-2-3-4-5-6-7-8-9-10-11-12-13-14-15-10
```

## 2.8 类型数组

与C和Java等其他语言不同， JavaScript数组不是强类型的，因此它可以存储任意类型的数据。

类型数组 | 数据类型
--:|:--
Int8Array | 8位二进制补码整数
Uint8Array | 8位无符号整数
Uint8ClampedArray | 8位无符号整数
Int16Array | 16位二进制补码整数
Uint16Array | 16位无符号整数
Int32Array | 32位二进制补码整数
Uint32Array | 32位无符号整数
Float32Array | 32位IEEE浮点数
Float64Array | 64位IEEE浮点数

``` js
let length = 5;
let int16 = new Int16Array(length);
let array16 = [];
array16.length = length;
for (let i=0; i<length; i++){
    int16[i] = i+1;
}
console.log(int16);
```

## 2.9 小结

* 数组方法

* 数据结构
