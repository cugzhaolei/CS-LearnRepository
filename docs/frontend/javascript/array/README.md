# Array

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