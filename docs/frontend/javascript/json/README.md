::: tip
# JSON

## 语法

JSON 的语法可以表示以下三种类型的值。
*  简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。但 JSON 不支持 JavaScript 中的特殊值 undefined。
*  对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值。
*  数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。
JSON 不支持变量、函数或对象实例，它就是一种表示结构化数据的格式，虽然与 JavaScript 中表示数据的某些语法相同，但它并不局限于 JavaScript 的范畴。

#### 对象
与JavaScript 的对象字面量相比， JSON对象有两个地方不一样。首先，没有声明变量（JSON 中没有变量的概念）。其次，没有末尾的分号（因为这不是 JavaScript 语句，所以不需要分号）。再说一遍，对象的属性必须加双引号，这在 JSON 中是必需的。属性的值可以是简单值，也可以是复杂类型值，因此可以像下面这样在对象中嵌入对象：
``` js
{
    "name": "Nicholas",
    "age": 29,
    "school": {
        "name": "Merrimack College",
        "location": "North Andover, MA"
    }
}
```

## JSONP

网页动态插入一个`<script>`元素，向跨域服务器请求JSON数据。服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
 
 
只支持get
``` js
function callback(data){
    console.log(data);
}

function jsonpHack(url){
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type","text/javascript");
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
}

window.onload = function(){
    jsonpHack('http://example.com/data:callback=callback');
}

//调用函数
callback({
    "fn":"console.log(this)";
})
```



:::