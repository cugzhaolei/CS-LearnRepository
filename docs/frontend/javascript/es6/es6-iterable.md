# Iterable

## for await...of

for...of 循环用于遍历同步的 Iterator 接口。新引入的 for await...of 循环，则是用于遍历异步的 Iterator 接口。

```js
async function f() {
  for await (const x of createAsyncIterable(["a", "b"])) {
    console.log(x);
  }
}
// a
// b
```

createAsyncIterable()返回一个拥有异步遍历器接口的对象，for...of 循环自动调用这个对象的异步遍历器的 next 方法，会得到一个 Promise 对象。await 用来处理这个 Promise 对象，一旦 resolve，就把得到的值（x）传入 for...of 的循环体。

for await...of 循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。

```js
let body = "";

async function f() {
  for await (const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log("got", parsed);
}
```

req 是一个 asyncIterable 对象，用来异步读取数据。可以看到，使用 for await...of 循环以后，代码会非常简洁。

如果 next 方法返回的 Promise 对象被 reject，for await...of 就会报错，要用 try...catch 捕捉。

```js
async function () {
  try {
    for await (const x of createRejectingIterable()) {
      console.log(x);
    }
  } catch (e) {
    console.error(e);
  }
}
```

for await...of 循环也可以用于同步遍历器。

```js
(async function() {
  for await (const x of ["a", "b"]) {
    console.log(x);
  }
})();
// a
// b
```

Node v10 支持异步遍历器，Stream 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。

```js
// 传统写法
function main(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf8",
    highWaterMark: 1024,
  });
  readStream.on("data", (chunk) => {
    console.log(">>> " + chunk);
  });
  readStream.on("end", () => {
    console.log("### DONE ###");
  });
}

// 异步遍历器写法
async function main(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf8",
    highWaterMark: 1024,
  });

  for await (const chunk of readStream) {
    console.log(">>> " + chunk);
  }
  console.log("### DONE ###");
}
```

## 参考链接

[1.ECMAScript6 入门教程](<(https://es6.ruanyifeng.com/#docs/async-iterator)>)
