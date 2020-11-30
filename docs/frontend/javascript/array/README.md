# Array

[1.MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 数组扁平化

``` js
var inputArr = [1,2,3,[4,5,[6,7,[8,9,[10,11,[12]]]]]];

function flatten(arr){
    var res = [];
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            res = res.concat(flatten(arr[i]));
        }else{
            res.push(arr[i])
        }
    }
    return res;
}

function flatten(arr){
    return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?flatten(cur):cur);
}

function flatten(arr){
    return arr.reduce(function(prev,item){
        return prev.concat(Array.isArray(item)?flatten(item):item);
    },[]);
}

function flatten(arr){
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(..arr);
    } 
    return arr;
}

const res1 = arr.flat(Infinity);

const res2 = JSON.stringify(arr).replace(/\[|\]/g,'').split(','); // 所有数据变成了字符串

const res3 = JSON.parse('['+JSON.stringify(arr).replace(/\[|\])/g,'')+']'); // 改良版

```

## 去重

``` js
let originalArray = [1,2,3,4,5,3,2,4,5,1,7];

//method1
const result = Array.from(new Set(originalArray));
console.log(result); //[1,2.3,4,5,7]

//method2
const result = [];
const map = new Map();
for(let v of originalArray){
    if(!map.has(v)){
        map.set(v,true);
        result.push(v);
    }
}
console.log(result); //[1,2.3,4,5,7]

//method3
const result = [];
for(let v of originalArray){
    if(!result.includes(v)){
        result.push(v);
    }
}
console.log(result);  //[1,2.3,4,5,7]

//method4
for(let i=0;i<originalArray.length;i++){
    for(let j=i+1;j<originalArray.length;j++){
        if(originalArray[i]===originalArray[j]){
            originalArray.splice(j,1);
            j--;
        }
    }
}
console.log(originalArray); 

//method5
cosnt obj = {};
const result = originalArray.filter(item=>obj.hasOwnProperty(typeof item+item)?false:(obj[typeof item + item]=true));
consoel.log(result)

//method6
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
var myOrderedArray = myArray.reduce(function(accumulator,currentValue){
    if(accumulator.indexOf(currentValue)===-1){
        accumulator.push(currentValue);
    }
    return accumulator
},[])
console.log(myOrderArray) //(5) ["a", "b", "c", "e", "d"]

//method7 利用数组的indexof下标属性查询
function unique7(arr){
    var newArr = []
    for(var i=0;i<arr.length;i++){
        if(newArr.indexOf(arr[i])===-1){
            newArr.push(arr[i])
        }
    }
    return newArr
}
console.log(unique7([1,2,5,6,8,8,7,3,6,9,11])) //[1, 2, 5, 6, 8, 7, 3, 9, 11]

//method8 先将原数组排序，相邻元素比较，不同则存入新数组
function unique7(arr){
    var fromArr = arr.sort()
    var newArr = [fromArr[0]]
    for(let i=1;i<fromArr.length;i++){
        if(fromArr[i]!==fromArr[i-1]){
            newArr.push(fromArr[i])
        }
    }
    return newArr
}
console.log(unique7([1,5,6,8,,4,6,3,6,7,4,1,2,5])) //[1, 2, 3, 4, 5, 6, 7, 8, undefined]

//method8 利用对象属性存在的特性，如果没有该属性则存入新数组
function unique8(arr){
    var obj ={}
    var newArr = []
    for(let i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = 1
            newArr.push(arr[i])
        }
    }
    return newArr
}
console.log(unique8([1,5,2,3,4,1,5,6,2,4,5,3,4,1]))  // [1, 5, 2, 3, 4, 6]

//method9 利用数组原型的includes方法
function unique9(arr){
    var newArr = []
    for(var i=0;i<arr.length;i++){
        if(!newArr.includes(arr[i])){
            newArr.push(arr[i])
        }
    }
    return newArr
}
console.log(unique9([1,2,4,5,1,3,4,5,3,1,2])) // [1, 2, 4, 5, 3]

//method10 利用数组原型对象上的 filter 和 includes方法。
function unique10(arr){
    var newArr = []
    newArr = arr.filter(function(item){
        return newArr.includes(item)?'':newArr.push(item)
    })
    return newArr
}
console.log(unique10([1,2,1,3,5,1,5,3,8,4,9,5,1,3,7,8]))//[1, 2, 3, 5, 8, 4, 9, 7]

//method11 ES6的set方法
function unique11(arr){
    return Array.from(new Set(arr))  //利用array.from将set结构转换为数组
}
console.log(unique11([1,2,1,3,4,1,2,5,3,7,8]))//[1, 2, 3, 4, 5, 7, 8]

```

### 对象数组去重

``` js
const resourceList = [
    {id:1,a:1},
    {id:2,a:2},
    {id:3,a:3},
    {id:1,a:4},
];

const result = responseList.reduce((acc.cur)=>{
    const ids = acc.map(item=>item.id);
    return ids.includes(cur.id)?acc:[...acc,cur];
},[]);
console.log(result);

```

### 数组去重

``` js
const arr = [1, 1, '1', 17, true, true, 17, false, 'true', 'a', {}, {}];

function unique(arr){
    var temp = arr.sort();
    var res = [temp[0]];
    for(let i=1;i<temp.length;i++){
        if(temp[i]==res[res.length-1]){
            res.push(temp[i]);
        }
    }
    return temp;
}

function unique(arr){
    var temp = [arr[0]];
    for(let i=1;i<arr.length;i++){
        if(newArr.indexOf(arr[i]==-1)){
            temp.push(arr[i]);
        }
    }
    return temp;
}

// set

const res1 = Array.from(new Set(arr));

//双重嵌套

const unique2 = arr =>{
    let len = arr.length;
    for(let i=0;i<len;i++){
        for(let j = i+1;j<len;j++){
            if(arr[i]===arr[j]){
                //删除一个数 j--保证j的值经过自加后保持不变 len-- 减少循环数 提升性能
                len--;
                j--;
            }
        }
    }
}

// 利用indexOf

const unique3 = arr => {
    const res = [];
    for(let i = 0; i< arr.length; i++){
        if(res.indexOf(arr[i])===-1)
        {
            res.push(arr[i]);
        }
    }
    return res;
}

// 使用include
const unique4 = arr =>{
    const res =[];
    for(let i=0; i<arr.length;i++){
        if(!res.includes(arr[i]))
        {
            res.push(arr[i]);
        }
    }
    return res;
}

// 使用 filter
const unique5 = arr => {
    return arr.filter((item,index)=>  {
        return arr.indexOf(item) === index;
    });
}

// 利用map
const unique6 = arr=》 {
    const map = new Map();
    const res = [];

    for(let i=0;i<arr.length;i++){
        if(!map.has(arr[i])){
            map.set(arr[i],true)
            res.push(arr[i]);
        }
    }
    return res;
}
```

### 数组拆解

``` js
Array.prototype.flat = function(){
    return this.toString().split(',').map(item+=>item);
}
```

### 数组乱序

``` js
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.sort(function(){
    return Math.random()-0.5;
})
```

## 判断数组方法

### Object.prototype.toString.call()

每一个继承Object的对象都有toString()方法，如果没有被重写，都会返回[Object type]，其实type为对象的类型，但是当除了Object类型的对象外。其他的类型可以直接使用toString方法。都返回内容的字符串。所以需要执行call apply方法改变toString方法的上下文

``` js
const newArr = ['hello','world'];
newArr.toString(); // hello world
Object.prototype.toString.call(newArr); //[object Array]
```

判断其他类型

``` js
Object.prototype.toString.call(newArr); //[object Array]
Object.prototype.toString.call(1); //[object Number]
Object.prototype.toString.call(Symbol(1)); //[object Symbol]
Object.prototype.toString.call(null); //[object Null]
Object.prototype.toString.call(undefined); //[object Undefined]
Object.prototype.toString.call(function(){}); //[object Function]
Object.prototype.toString.call({foo:'bar'}); //[object Object]
```

### instanceof

instanceof是通过判断对象的原型链中能否找到prototype。使用instanceof判断一个对象是否为数组，instanceof会判断这个对象的原型链上是否会找到对应的array原型，否则返回false。

``` js
[] instanceof Array; //true
```

instanceof 只能用来判断对象类型，不能用作原始类型的判断，所有对象的instanceof Object都为true

``` js
[] instanceof Object; //true
```

### Array.isArray

* 判断对象是否为数组 ES5新增
* instanceof和Array.isArray
  Array.isArray()可以检测出iframes

``` js
var iframe = document.createElement('iframe');
docuement.body.appendChild(iframe);
ArrayX = window.frames[windows.frames.length-1].Array;
var arr = new ArrayX(1,2,3); //[1.2.3]

Array.isArray(arr); //true

Object.prototype.toString.call(arr); //true

arr instanceof Array ; //false

//polify
if(Array.isArray){
    Array.isArray = function(arg){
        return Object.prototype.toString.call(arg)
    };
}
```

### [Array.reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

## 类数组转化为数组

1. Array.from

``` js
Array.from(documentt.querySelector('div'));
```

2. Array.prototype.slice.call()

```js
Array.prototype.slice.call(document.querySelector('div'));
```

3. 扩展运算符

```js
[...document.querySelector('div')];
```

4. 利用concat

```js
Array.ptototype.concat.apply([],documentt.querySelectorAll('div'));
```

## API

### Array.prototype.filter

```js
Array.prototype.filter = function(callback,thisArg){
    if(this==undefined){
        throw new TypeError('this is null or undefined');
    }
    if(typeof callback!=='function'){
        throw new TypeError(callback + 'is not a function');
    }

    const res = [];
    // 新建一个回调函数的对象(强制转换对象)
    const O = Object(this);

    //>>>O 保证len为number，且为正整数数
    const len = O.length>>>0;
    for(let i=0;i<len;i++){
        // 检查i是否在0的属性（会检查原型链）
        if(i in O){
            // 回调函数调用参数
            if(callback.call(thisArg,O[i],i,0)){
                res.push(O[i]);
            }
        }
    }
    return res;
}
```

###  Array.prototype.map()

```js
Array.prototype.map = function(callback,thisArg){
    if(this==undefined){
        throw new TypeError('this is null or undefined');
    }
    if(typeof callback!=='function'){
        throw new TypeError(callback + 'is not a function');
    }
    const res = [];
    const O = Object(this);
    const len = O.length>>>;
    for(let i=0;i<len;i++){
        if(i in O){
        res[i] = callback.call(thisArg,O[i],i,this);
        }
    }
    return res;
}
```

### Array.prototype.forEach()

```js
Array.prototype.forEach = function(callback,thisArg){
    if(this==undefined){
        throw new TypeError('this is null or undefined');
    }
    if(typeof callback!=='function'){
        throw new TypeError(callback + 'is not a function');
    }

    const O = Object(this);
    const len = O.length>>>0;
    let k = 0;
    while(k<len){
        if(k in O){
            callback.call(thisArg,O[k],k,O);
        }
        k++;
    }
}
```

### Array.prototype.reduce()

```js
Array.prototype.reduce = function(callback,initialValue){
    if(this==undefined){
        throw new TypeError('this is null or undefined');
    }
    if(typeof callback!=='function'){
        throw new TypeError(callback + 'is not a function');
    }
    const O = Object(this);
    const len = this.length>>>0;
    let accumulator = initialValue;
    let k = 0;
    // 如果第二个参数为undefined的情况下，则数组的第一个有效值做为累加器的 初始值
    if(accumulator === undefined){
        while(k<len&&!(k in O)){
            k++;
        }
        // 如果超出数组界限还没有找到累加器的初始值，则TypeError
        if(k>=len){
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = callbacl.call(undefined,accumulator,O[k],k,O)
        accumulator = O[k++];
    }
    while(k<len){
        if(k in O){
            accumulator = callback.call(undefined,accumulator,O[k],k,O);
        }
        k++;
    }
    return accumulator;
}
```


[1^ MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
[2^ 手写](https://juejin.im/post/6875152247714480136)