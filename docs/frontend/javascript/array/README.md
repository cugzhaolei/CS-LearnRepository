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
