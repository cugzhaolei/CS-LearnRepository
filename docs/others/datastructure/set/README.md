::: tip
# 集合

## 构建数据集合
集合是由一组无序且唯一(不能重复)的项组成，这个数据结构使用了与有限集合相同的数学概念，但应由在计算机科学的数据结构中。

空集是不包含任何元素的集合


## 创建集合
ES6中新增了Set类的实现
``` js
function Set(){
    let items = {};
}
```
使用对象而不是数组来表示数组(items),但是也可以用数组实现
ES6中集合的方法
``` js
 add(value)：向集合添加一个新的项。
 delete(value)：从集合移除一个值。
 has(value)：如果值在集合中，返回true，否则返回false。
 clear()：移除集合中的所有项。
 size()：返回集合所包含元素的数量。与数组的length属性类似。
 values()：返回一个包含集合中所有值的数组。
```
### has(value)方法
``` js
this.has = function(value){
    return value in items;
};
```
使用对象存储集合，就可以使用JavaScript的in操作符来验证给定的值是不是items对象的属性
- 更好的实现方法
``` js
this.has = function(value){
    return items.hasOwnProperty(value);
};
```
所有的JavaScript对象都要hasOwnProperty方法，返回一个是否包含特定属性的boolean值

### add方法
``` js
this.add = function(value){
    if(!this.has(value)){
        items[value] = values; //{value}
        return true;
    }
    return false;
};
```
添加一个值的时候，把它同时作为键和值保存，因为这样有利于查找这个值。

### remove & clear
``` js
this.remove = function(value){
    if(this.has(value)){
        delete items[value];; //{value}
        return true;
    }
    return false;
};
```
用对象来存储集合的items对象，就可以简单地使用delete操作符从items对象中移除
属性
``` js
let set = new Set();
set.add(1);
set.add(2);
```
![](/images/set-add.jpg)
移除集合中的所有值用clear
``` js
this.clear = function(){
    items = {}; //对象为空
};
```

### size方法
实现size有三种方法
1. 使用length，每次使用add或者remove的时候++ 或者 --
2. 使用JavaScript内建的Object类的内建函数(ES5以上)
``` js
this.size = function(){
    return Object.keys(items).length;
};
```
JavaScript的Object类有一个keys方法，它返回一个包含给定对象所有属性的数组。有浏览器限制

3. 动提取items对象的每一个属性，记录属性的个数并返回这个数字，无浏览器限制
``` js
this.sizeLegacy = function(){
    let count = 0;
    for(let key in items){
        if(items.hasOwnProperty(key)){
            ++count;
        }
    }
    return count;
};
```
### values方法
提取items对象的所有属性，以数组的形式返回：只能在现代浏览器运行
``` js
this.values = function(){
    let values = {};
    for(let i =0,keys=Object.keys(items).length;i<keys.length;i++){
        values.push(items[keys[i]]);
    }
    return values;
};
```
所有浏览器都能执行
``` js
this.valuesLegacy=function(){
    let values = [];
    for(let key in items){
        if(items.hasOwnProperty(key)){
            values.push(items[key]);
        }
    }
    return values;
};
```

### 使用Set类
``` js
let set = new Set();
set.add(1);
console.log(set.values());  //输出["1"]
console.log(set.has(1));    //输出true
console.log(set.size());     // 1
set.add(2);
console.log(set.values()); //输出["1", "2"]
console.log(set.has(2)); //true
console.log(set.size()); //2
set.remove(1);
console.log(set.values()); //输出["2"]
set.remove(2);
console.log(set.values()); //输出[]
```
## 集合操作

对集合可以进行如下操作。
 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集
合的元素的新集合。
 子集：验证一个给定集合是否是另一集合的子集。

### 并集 union
并集的数学概念是集合A和集合B的并集: A∪B
定义如下：
``` js
A∪B = { x | x ∈ A∨x ∈ B }
```
意思是x（元素）存在于A中，或x存在于B中
``` js
this.union = function(otherSet){
    let unionSet = new Set();

    let values = this.values();
    for(let i=0;i<values.length;i++){
        unionSet.add(values[i]);
    }

    values = otherSet.values();
    for(let i=0;i<values.length;i++){
        unionSet.add(values[i]);
    }
    return unionSet;
};
```
测试代码：
``` js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
let unionAB = setA.union(setB);
console.log(unionAB.values());
```
输出为["1", "2", "3", "4", "5", "6"]。注意元素3同时存在于A和B中，它在结果的
集合中只出现一次。

### 交集 intersection
交集是数学概念是集合A和集合B的交集，表示为：A∩B
定义如下：
``` js
A∩B = { x | x ∈ A∧x ∈ B }
```
代码实现
``` js
this.interSection = function(otherSet){
    let intersectionSet = new Set();

    let values = this.values();
    for(let i=0;i<values.length;i++){
        if(otherSet.has(values[i])){
            intersectionSet.add(values[i]);
        }
    }
    return intersectionSet;
}
```
测试代码
``` js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());
```
输出为["2", "3"]，因为2和3同时存在于两个集合中。


### 差集 difference
差集的数学概念是集合A和集合B的差集，表示为： A-B，定义如下：
``` js
A-B = { x | x ∈ A ∧ x ∉ B }
```
实现Set的difference方法：
``` js
this.difference = function(otherSet){
    let differenceSet = new Set();
    
    let values = this.values();
    for(let i=0;i<values.length;i++){
        if(!otherSet.has(values[i])){
            differenceSet.add(values[i]);
        }
    }
    return differenceSet;
};
```
测试
``` js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let differenceAB = setA.difference(setB);
console.log(differenceAB.values());
```
输出为["1"]，因为1是唯一一个仅存在于setA的元素。

### 子集 subset

 子集的数学概念是集合A是集合B的子集（或集合B包含了A），表示为：A⊆ B
 定义如下：
 ``` js
∀ x { x ∈ A → x ∈ B }
 ```
代码实现：
``` js
this.subSet = function(otherSet){
    if(this.size()>otherSet.size()){
        return false;
    }else{
        let values = this.values();
        for(let i=0;o<values.length;i++){
            if(!otherSet.has(values[i])){
                return false;
            }
        }
        return true;
    }
};
```
首先需要验证的是当前Set实例的大小。如果当前实例中的元素比otherSet实例更多，它
就不是一个子集。子集的元素个数需要小于或等于要比较的集合。

接下来要遍历集合中的所有元素，验证这些元素也存在于otherSet中。
如果有任何元素不存在于otherSet中，就意味着它不是一个子集，返回false。如果
所有元素都存在于otherSet中，就不会被执行，那么就返回true。

``` js
let setA = new Set();
setA.add(1);
setA.add(2);

let setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

let setC= new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.subset(setB));  //true
console.log(setA.sybset(setC));  //false
```

## [ES6 -- Set类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global-Objects/Set)

``` js
let set = new Set();
set.add(1);
console.log(set.values()); // 输出SetIterator
console.log(set.has(1)); // 输出true
console.log(set.size); // 输出1
```
ES6的Set的values方法返回Iterator，而不是值构成的数组。
ES6的Set则有一个size属性

### ES6 Set操作
原生ES6中并没有交集、并集、差集、子集

``` js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
```

1. 模拟并集操作
``` js
//新建集合 添加两个集合中是所以元素
let unionAb = new Set();
for(let x of setA) unionAb.add(x);
for(let y of setB) unionAb.add(y);
```
2. 模拟交集操作
模拟交集操作需要创建一个辅助函数，来生成包含setA和setB都有的元素的新集合
``` js
let intersection = function(setA,setB){
    let intersectionSet = new Set();
    for(let x of setA){
        if(setB.has(x)){
            intersectionSet.add(x);
        }
    }
    return intersectionSet;
};
let intersectionAB = intersection(setA,setB);
```
更简单的实现方式
``` js
intersectionAb = new Set([x for (x of setA) if (setB.has(x))])
```
3. 模拟差集操作
差集操作创建的集合包含的则是setA有而setB没有的元素。

``` js
let difference = function(setA,setB){
    let differenceSet = new Set();
    for(let x of setA){
        if(!setB.has(x)){
            differenceSet.add(x);
        }
    }
    return differenceSet;
};
let differenceSet = difference(setA,setB);
```
更简单的操作
``` js
differenceAB = new Set([x for (x of setA) if (!setB.has(x))]);
```

:::