::: tip
# 对象的拷贝

##  浅拷贝: 
以赋值的形式拷贝引用对象，仍指向同一个地址，修改时原对象也会受到影响
![微软开发者社区](https://msdn.microsoft.com/zh-cn/library/dn858229(v=vs.94).aspx)
``` js
- Object.assing(target,…sources)

- 展开运算符
```
##  深拷贝: 
完全拷贝一个新对象，修改时原对象不再受到任何影响
###  Array 

#### 1. for循环
``` js
let arr1 = [1,2,3];
let arr2 = copyArr(arr1);
function copyArr(arr){
    let res=[];
    for(let i=0,length=arr.length;i<length;i++){
        res.push(arr[i]);
    }
    return res;
}
``` 

#### 2. slice返回新数组
``` js
let arr1 = [1,2,3];
let arr2 = arr1.slice(0);
```
#### 3. contact
``` js
let arr1 = [1,2,3];
let arr2 = arr1.contact();
``` 
#### 4. 扩展运算符
``` js
let arr1 = [1,2,3];
let [...arr2] = arr1;
```
#### 5. Array.from
``` js
//如果参数是一个真正的数组，Array.from会返回一个一模一样的新数组
let arr1 = [1,2.3];
let arr2 = Array.from(arr1);

```

###  Object
``` js
//1. for循环
let obj1 = {count:12,price:200,name:'apple'};
let onj2 = copyObj(obj){
    let ans = {};
    for(let key in obj){
        res[key] = obj[key];
    }
    return ans;
}
``` 
####  2.JSON方法

``` js
//具有循环引用的对象时，报错
//他无法实现对函数 、RegExp等特殊对象的克隆
//会抛弃对象的constructor,所有的构造函数会指向Object
//当值为函数、undefined、或symbol时，无法拷贝
let obj1 = {count:12,price:200,name:'apple'};
let obj2 = JSON.parse(JSON.stringify(obj1));

//坑的地方
// 构造函数
function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

// 函数
function say() {
  console.log('hi');
};

const oldObj = {
  a: say,
  b: new Array(1),
  c: new RegExp('ab+c', 'i'),
  d: Messi
};

const newObj = JSON.parse(JSON.stringify(oldObj));

// 无法复制函数
console.log(newObj.a, oldObj.a); // undefined [Function: say]
// 稀疏数组复制错误
console.log(newObj.b[0], oldObj.b[0]); // null undefined
// 无法复制正则对象
console.log(newObj.c, oldObj.c); // {} /ab+c/i
// 构造函数指向错误
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: Object] [Function: person]

//constructor 
const oldObj = {};

oldObj.a = oldObj;

const newObj = JSON.parse(JSON.stringify(oldObj));
console.log(newObj.a, oldObj.a); // TypeError: Converting circular structure to JSON

```

#### 3 扩展运算符
``` js
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
            ans[i] = (prop.constructor === Array)?[]:Object.create(prop);
        }else{
            ans[i] = prop;
        }
    }
    return ans;
}
```
:::

### map实现深克隆
说明：通过new WeakMap()来避免循环引用（拷贝引用类型时并保存其地址，后面遇到引用类型先检查是否已经保存了）
通过Reflect.ownKeys(obj)遍历出obj自身的所有可枚举和不可枚举的属性以及symbol属性
拷贝对应属性的属性描述符
``` js
function checkType(obj:any):string{
  const type = Object.prototype.toString.call(obj);
  return type.slice(8,-1);
}

//深拷贝(hash= new WeakMap)
export function deepClone(obj:any,hash= new WeakMap()):any{
  if(checkType(obj)==='RegExp'){
    //regExp.source 正则对象的源模式文本
    //regExp.flags 正则表达式对象的标志字符串
    //regExp.lastIndex 下次匹配开始的字符串索引位置
    let temp = new RegExp(obj.source,obj.flags);
    temp.lastIndex = obj.lastIndex;
    return temp;
  }

  if(checkType(obj)==='Date'){
    return new Date(obj);
  }

  //非复杂类型
  if(obj===null||typeof obj!=='object'){
    return obj;
  }

  //其他类型
  //与后面的hash.set()防止循环引用
  if(hash.has(obj)){
    return hash.get(obj);
  }

  let newObj = new obj.constructor();
  hash.set(obj,newObj);
  //Object.keys(obj) 类型与for in 和 obj.hasOwnProperty
  //是否应该拷贝自身属性（可枚举的和不可枚举的以及symbol
  Reflect.ownKeys(obj).forEach(function(key){
    if(typeof obj[key]==='object'&&obj[key]!==null){
      newObj[key] = deepClone(obj[key],hash);
    }else{
      //直接赋值
      //newObj[key] = obj[key];
      //是否应该保留属性描述符
      Object.defineProperty(newObj,key,Object.getOwnPropertyDescriptor(obj,key));
    }
  });
  return newObj;
}
```


## 实现一个深克隆

由于要面对不同的对象(正则、数组、Date等)要采用不同的处理方式，我们需要实现一个对象类型判断函数。
``` js
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};
```
这样我们就可以对特殊对象进行类型判断了,从而采用针对性的克隆策略.
``` js
const arr = Array.of(3, 4, 5, 2);
console.log(isType(arr, 'Array')); // true
```
对于正则对象,我们在处理之前要先补充一点新知识.

我们需要通过[正则的扩展](http://es6.ruanyifeng.com/#docs/regex#flags-%E5%B1%9E%E6%80%A7)了解到flags属性等等,因此我们需要实现一个提取flags的函数.
``` js
const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
```
做好了这些准备工作,我们就可以进行深克隆的实现了.
``` js
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
  // 维护两个储存循环引用的数组
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index != -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
};
```
我们做一下测试
``` js
function person(pname) {
  this.name = pname;
}

const Messi = new person('Messi');

function say() {
  console.log('hi');
}

const oldObj = {
  a: say,
  c: new RegExp('ab+c', 'i'),
  d: Messi,
};

oldObj.b = oldObj;


const newObj = clone(oldObj);
console.log(newObj.a, oldObj.a); // [Function: say] [Function: say]
console.log(newObj.b, oldObj.b); // { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] } { a: [Function: say], c: /ab+c/i, d: person { name: 'Messi' }, b: [Circular] }
console.log(newObj.c, oldObj.c); // /ab+c/i /ab+c/i
console.log(newObj.d.constructor, oldObj.d.constructor); // [Function: person] [Function: person]
```
当然,我们这个深克隆还不算完美,例如Buffer对象、Promise、Set、Map可能都需要我们做特殊处理，另外对于确保没有循环引用的对象，我们可以省去对循环引用的特殊处理，因为这很消耗时间，不过一个基本的深克隆函数我们已经实现了。

# 总结
实现一个完整的深克隆是由许多坑要踩的,npm上一些库的实现也不够完整,在生产环境中最好用lodash的深克隆实现.

在面试过程中,我们上面提到的众多坑是面试官很可能追问你的,要知道坑在哪里,能答出来才是你的加分项,在面试过程中必须要有一两个闪光点,如果只知道序列/反序列这种投机取巧的方法,在追问下不仅拿不到分,很可能造成只懂个皮毛的印象,毕竟,面试面得就是你知识的深度