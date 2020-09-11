# 队列 Array

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构，数组存储一系列同一种数据类型的值。但在 JavaScript 里，也可以在数组中保存不同类型的值。但要遵守最佳实践，别这么做

## 创建和初始化数组

```js
var daysOfWeek = new Array(); //{1}
var daysOfWeek = new Array(7); //{2}
var daysOfWeek = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
); //{3}
```

使用 new 关键字，就能简单地声明并初始化一个数组（行{1}）。用这种方式，还可以创建一个指定长度的数组（行{2}）。另外，也可以直接将数组元素作为参数传递给它的构造器（行{3}）。

```js
//推荐的写法
var daysOfWeek = [];
//用元素初始化数组
var daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
```

`访问元素和迭代数组`
要访问数组里特定位置的元素，可以用中括号传递数值位置，得到想知道的值或者赋新的值。

```js
for (let i = 0; i < daysOfWeek.length; i++) {
  console.log(daysOfWeek[i]);
}
```

求斐波那契数列的前 num 个数字。

```js
function finonacci(num) {
  var fibonacci = []; //{1}
  if (num <= 2) {
    fibonacci[1] = 1; //{2}
    fibonacci[2] = 2; //{3}
  } else {
    fibonacci[1] = 1; //{2}
    fibonacci[2] = 2; //{3}

    for (var i = 3; i < num; i++) {
      fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]; //{4}
    }
  }

  for (var i = 1; i < fibonacci.length; i++) {
    //{5}
    console.log(fibonacci[i]); //{6}
  }
}
```

## 2.3 添加元素

在 JavaScript 中，数组是一个可以修改的对象。如果添加元素，它就会动态增长。在 C 和 Java 等其他语言里，我们要决定数组的大小，想添加元素就要创建一个全新的数组，不能简单地往其中添加所需的元素。

```js
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//add 10
numbers[numbers.length] = 10;
```

### 2.3.1 push

把元素添加到数组的末尾

```js
numbers.push(11);
numbers.push(12, 13);
```

### 2.3.2 插入元素到数组首位

放到数组的首位。为了实现这个需求，首先我们要腾出数组里第一个元素的位置，把所有的元素向右移动一位。我们可以循环数组中的元素，从最后一位+1（长度）开始，将其对应的前一个元素的值赋给它，依次处理，最后把我们想要的值赋给第一个位置（-1）上.

```js
for (var i = numbers.length; i >= 0; i--) {
  numbers[i] = numbers[i - 1];
}
numbers[0] = -1;
```

![array unshift](/images/datastructure-javascript-array-unshift.jpg)

- unshift

```js
numbers.unshift(-2);
numbers.unshift(-4, -3);
```

## 2.4 删除元素

- pop
  要删除数组里最靠后的元素，可以用 pop 方法：

```js
numbers.pop();
```

::: tip
通过 push 和 pop 方法，就能用数组来模拟栈，
:::

移除数组里的第一个元素

```js
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1];
}
```

![array-shift](/iamges/datastructure-javascript-array-shift.jpg)

把数组里所有的元素都左移了一位。但数组的长度依然是 17，这意味着数组中有额外的一个元素（值是 undefined）。在最后一次循环里， i + 1 引用了一个数组里还未初始化的位置。在 Java、 C/C+或 C#等一些语言里，这样写可能就会抛出异常了，因此不得不在 numbers.length-1 处停止循环。

把数组第一位的值用第二位覆盖了，并没有删除元素

- shift

```js
numbers.shift();
```

## 在任意位置添加或删除元素

使用 splice 方法，简单地通过指定位置/索引，就可以删除相应位置和数量的元素：

```js
numbers.splice(5, 3);
```

代码删除了从数组索引 5 开始的 3 个元素。这就意味着 numbers[5]、 numbers[6]和 numbers[7]从数组中删除了。现在数组里的值变成了 3、 2、 1、 0、 1、 5、 6、 7、 8、 9、 10、11 和 12（ 2、 3、 4 已经被移除）
::: tip
对于 JavaScript 数组和对象，我们还可以用 delete 操作符删除数组中的元素，例如 delete numbers[0]。然而，数组位置 0 的值会变成 undefined，也就是说，以上操作等同于 numbers[0] = undefined。因此，我们应该始终使用 splice、 pop 或 shift 方法来删除数组元素。
:::
把数字 2、 3、 4 插入数组里，放到之前删除元素的位置上

```js
numbers.splice(5, 0, 2, 3, 4);
```

splice 方法接收的第一个参数，表示想要删除或插入的元素的索引值。第二个参数是删除元素的个数（这个例子里，我们的目的不是删除元素，所以传入 0）。第三个参数往后，就是要添加到数组里的值（元素 2、 3、 4）。输出会发现值又变成了从 3 到 12。

## 2.6 二维和多维数组

```js
var averageTempDay1 = [72, 75, 79, 79, 81, 81];
var averageTempDay2 = [81, 79, 75, 75, 73, 72];
//使用矩阵（二维数组）来存储
var averageTemp = [];
averageTemp[0] = [72, 75, 79, 79, 81, 81];
averageTemp[1] = [81, 79, 75, 75, 73, 72];
```

JavaScript 只支持一维数组，并不支持矩阵。但是，我们可以像上面的代码一样，用数组套数
组，实现矩阵或任一多维数组

```js
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

```js
function printMatrix(myMatrix) {
  for (var i = 0; i < myMatrix.length; i++) {
    for (var j = 0; j < myMatrix[i].length; j++) {
      console.log(myMatrix[i][j]);
    }
  }
}

printMatrix(averageTemp);
```

### 2.6.2 多维数组

创建一个 3×3×3 的矩阵，每一格里包含矩阵的 i（行）、 j（列）及 z（深度）之和：

```js
var matrix3x3x3 = [];
for (var i = 0; i < 3; i++) {
  matrix3x3x3[i] = [];
  for (var j = 0; j < 3; j++) {
    matrix3x3x3[i][j] = [];
    for (var z = 0; z < 3; z++) {
      matrix3x3x3[i][j][z] = i + j + z;
    }
  }
}

//另一种方式
for (var i = 0; i < matrix3x3x3.length; i++) {
  for (var j = 0; j < matrix3x3x3[i].length; j++) {
    for (var z = 0; z < matrix3x3x3[i][j].length; z++) {
      console.log(matrix3x3x3[i][j][z]);
    }
  }
}
```

![三维数组矩阵](/images/datastructure-javascript-array-3dmatrix.jpg)

## 2.9 小结

- 数组方法

- 数据结构
