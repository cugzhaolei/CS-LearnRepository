# Map

集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它 当作主要元素。在字典中，我们用[键，值]的形式来存储数据。在散列表中也是一样(也是以[键， 值]对的形式来存储数据)

## 字典(dictionary)

集合表示一组互不相同的元素(不重复的元素)。在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。字典和集合很相似，集合以[值，值]的形式存储元素，字 典则是以[键，值]的形式来存储元素。字典也称作映射。

### 创建字典

与 Set 类相似，ECMAScript 6 同样包含了一个 Map 类的实现，即我们所说的字典。

```js
function Dictionary() {
  var items = {};
}
```

 set(key,value):向字典中添加新元素。
 delete(key):通过使用键值来从字典中移除键值对应的数据值。
 has(key):如果某个键值存在于这个字典中，则返回 true，反之则返回 false。  get(key):通过键值查找特定的数值并返回。
 clear():将这个字典中的所有元素全部删除。
 size():返回字典所包含元素的数量。与数组的 length 属性类似。
 keys():将字典所包含的所有键名以数组形式返回。
 values():将字典所包含的所有数值以数组形式返回。

- has()

```js
this.has = function(key) {
  return key in items;
};
```

- set()

```js
this.set = function(key, value) {
  items[key] = value; //{1}
};
```

- delete()

```js
this.delete = function(key) {
  if (this.has(key)) {
    delete items[key];
    return this;
  }
  return this;
};
```

- get()

```js
this.get = function(key) {
  return this.has(key) ? items[key] : undefined;
};
```

- values()

```js
this.values = function() {
  var values = [];
  for (var k in items) {
    //{1}
    if (this.has(k)) {
      values.push(items[k]); //{2}
    }
  }
  return values;
};
```

```tip
我们不能仅仅使用for-in语句来遍历items对象的所有属性，还需要使用 hasOwnProperty方法(验证items对象是否包含某个属性)，因为对象的原型 也会包含对象的其他属性(JavaScript基本的Object类中的属性将会被继承，并 存在于当前对象中，而对于这个数据结构来说，我们并不需要它们)。
```

- clear() size() keys() getItems()

```js
this.remove = function(value) {
  if (this.has(value)) {
    delete items[value]; //{2}
    return true;
  }
  return false;
};

this.clear = function() {
  items = {}; // {3}
};

this.size = function() {
  return Object.keys(items).length; //{4}
};

this.keys = function() {
  return Object.keys(items);
};

this.getItems = function() {
  return items;
};
```
