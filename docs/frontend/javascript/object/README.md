# Object

## 模拟 New 操作

```js
function newO(data, ...args) {
  if (object !== "undefined") {
    throw new TypeError("Type Error");
  }

  const obj = Object.create(data.prototype);
  const res = data.apply(obj, args);

  const isObject = typeof res === "object" && res !== null;
  const isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
}
```

## instanceof

```js
const instanceOf = (left, right) => {
  // 基本数据类型都返回false
  if (typeof left != "object" || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (prototype === null) return false;
    if (prototype === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};
```

## prototype

寄生组合继承

```js
function Parent() {
  this.name = "parent";
}
function Child() {
  Parent.call(this);
  this.type = "children";
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
```

## object.create

```js
if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

## Object.is

object.is 主要解决这个问题

```js
+0 === -0; // true
NaN === NaN; // false
```

```js
const is = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
};
```

## Object.assign

Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）

```js
Object.definePorperty(Object, "assign", {
  value: function(target, ...args) {
    if (target == null) {
      return new TypeError("Cannot convert undefined or null to object");
    }

    //目标对象统一转换为引用类型 如果不是要自动转换
    const to = Object(target);
    for (let i = 0; i < args.length; i++) {
      // 每一个源对象
      const nextSource = args[i];
      if (nextSource !== null) {
        // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true,
});
```

## 深拷贝

```js
const deepClone = (target,hash=new WeakMap())=>[
    // 对于传入参数处理
    if(typeof target=='object'||target === null){
        return target;
    }

    // 哈希表中存在直接返回
    if(hash.has(target)) return hash.get(target);

    const cloneTarget = Array.isArray(target)?[]:{};
    hash.set(target,cloneTarget);

    // 针对symbol
    const symbolKeys = Object.getOwnPropertySymbols(target);
    if(symbolKeys.length){
        symbolKeys.forEach(symbolKey=>{
            if(typeof target[symbolKey]==='object'&&target[symbolKey]!==null){
                cloneTarget[symbolKey] = deepClone(target[symbolKey]);
            }else{
                cloneTarget[symbolKey] = target[symbolKey];
            }
        })
    }

    for(const i in target){
        if(Object.prototype.hasOwnProperty(target,i)){
            cloneTarget[i] = typeof target[i] === 'object'&&target[i]!==null?deepClone(target[i],hash):target[i];
        }
    }
    return cloneTarget;
]
```

## DMZ对象

在使用call,apply,bind传入null，或者undefined的时候，会出现变量污染的情况：

```js
function foo(){
	console.log(this.name);
}
var name = 'helloworld';

foo.apply(null); // helloworld
// 非严格模式下 foo中的this是全局对象，（严格模式下绑定到undefined），输出 helloworld
// 但是全局变量 name被修改就出问题了

function foo(){
	cthis.name = ‘april’;
}
var name = 'helloworld';
foo.apply(null); // april

```

这个时候DMZ（Demilitarized Zone 非军事区）对象就派上用场了

```js
function foo(){
	cthis.name = ‘april’;
}

let dmz = Object.create(null);
var name = 'helloworld';
foo.apply(dmz); // helloworld
```