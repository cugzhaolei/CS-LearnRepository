# async/await

ES7 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案。No more callback hell。
*async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
想较于 Generator，Async 函数的改进在于下面四点：

* 内置执行器。Generator 函数的执行必须依靠执行器，而 Aysnc 函数自带执行器，调用方式跟普通函数的调用一样；
* 更好的语义。async 和 await 相较于 * 和 yield 更加语义化；
* 更广的适用性。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise对象。而 async 函数的 await命令后面则可以是 Promise 或者 原始类型的值（Number，string，boolean，但这时等同于同步操作）；
* 返回值是 Promise。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator对象方便，可以直接使用 then() 方法进行调用。

``` js
//promise实例
const makeRequest = ()=>{
    return getJson()
    .then(data=>{
        if(data.needsAnotherRequest){
            return makeAnotherRequest(data)
            .then(moreData=>{
                console.log(moreData);
                return moreData;
            })
        }else{
            console.log(data);
            return data;
        }
    })
}

//async/await
const makeRequest = async()=>{
    const data = await getJson()
    if(data.needsAnotheRRequest){
        const moreData = await makeAnotherRequest(data);
        console.log(moreData);
        return moreData;
    }else{
        console.log(data);
        return data;
    }
}




```