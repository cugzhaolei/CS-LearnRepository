::: tip
# Dictionary & hash

集合、字典和散列表可以存储不重复的值。在集合中，我们感兴趣的是每个值本身，并把它
当作主要元素。在字典中，我们用[键，值]的形式来存储数据。在散列表中也是一样（也是以[键，
值]对的形式来存储数据）。但是两种数据结构的实现方式略有不同。

## 字典
在字典中，存储的是[键，值]
对，其中键名是用来查询特定元素的。字典和集合很相似，集合以[值，值]的形式存储元素，字
典则是以[键，值]的形式来存储元素。字典也称作映射。

### 创建字典

要实现的类就是以ECMAScript 6中Map类的实现为基础的
``` js
function Dictionary(){
    var items = {};
};
```
与Set类类似，我们将在一个Object的实例而不是数组中存储元素。
``` js
 set(key,value)：向字典中添加新元素。
 delete(key)：通过使用键值来从字典中移除键值对应的数据值。
 has(key)：如果某个键值存在于这个字典中，则返回true，反之则返回false。
 get(key)：通过键值查找特定的数值并返回。
 clear()：将这个字典中的所有元素全部删除。
 size()：返回字典所包含元素的数量。与数组的length属性类似。
 keys()：将字典所包含的所有键名以数组形式返回。
 values()：将字典所包含的所有数值以数组形式返回。
```
#### has和set方法
``` js
this.has = function(key){
    return key in items;
};
```

``` js
this.set = function(key,value){
    items[key] = values;
};
```

#### delete方法
``` js
this.delete = function(key){
    if(this.has(key)){
        delete items[key];
        return true;
    }
    return false;
};
```
#### get和values
``` js
this.get = function(key){
    return this.has(key)?items[key]:undefined;
};
```
get方法首先会验证我们想要检索的值是否存在（通过查找key值），如果存在，将返回该值，
反之将返回一个undefined值（请记住undefined值和null值是不一样的)
``` js
this.values = function(){
    var values = [];
    for(var k in items){
        if(this.has(k)){
            values.push(items[k]);
        }
    }
    return values;
};
```
::: danger
我们不能仅仅使用for-in语句来遍历items对象的所有属性，还需要使用hasOwnProperty方法（验证items对象是否包含某个属性），因为对象的原型也会包含对象的其他属性（JavaScript基本的Object类中的属性将会被继承，并存在于当前对象中，而对于这个数据结构来说，我们并不需要它们）。
:::

#### clear size keys & getItems

``` js
this.clear = function(){
    items = {}; //对象为空
};

this.size = function(){
    return Object.keys(items).length;
};

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
keys方法返回在Dictionary类中所有用于标识值的键名。要取出一个JavaScript对象中所有的键名，可以把这个对象作为参数传入Object类的keys方法
``` js
this.keys = function(){
    return Object.keys(items);
}
this.getItems = function() {
return items;
}
```

### 使用Dictionary
``` js
var dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');
```
如果执行了如下代码，输出结果将会是true：
``` js
console.log(dictionary.has('Gandalf'));
```
下面的代码将会输出3，因为我们向字典实例中添加了三个元素：
``` js
console.log(dictionary.size());
```
现在，执行下面的几行代码：
``` js
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('Tyrion'));
```
输出结果分别如下所示：
``` js
["Gandalf", "John", "Tyrion"]
["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
tyrion@email.com
```
最后，再执行几行代码：
``` js
dictionary.delete('John');
```
再执行下面的代码：
``` js
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());
```
输出结果如下所示：
``` js
["Gandalf", "Tyrion"]
["gandalf@email.com", "tyrion@email.com"]
Object {Gandalf: "gandalf@email.com", Tyrion:
"tyrion@email.com"}
```
## 散列表

散列算法的作用是尽可能快地在数据结构中找到一个值。

### 创建散列表

``` js
function HashTable(){
    var table = {};
}
```
 put(key,value)：向散列表增加一个新的项（也能更新散列表）。
 remove(key)：根据键值从散列表中移除值。
 get(key)：返回根据键值检索到的特定的值。

实现一个散列函数
``` js
var loseloseHashCode = function(key){
    var hash = 0;
    for(var i = 0;i<key.length;i++){
        hash+=key.charCodeAt(i);
    }
    return hash%37;
};
```
为了得到比较小的数值，我们会使用hash值和一个任意数做除法的余数（mod）。
* Put方法
``` js
this.put = function(key,value){
    var position = loseloseHashCode(key);
    console.log(position+'-'+key);
    table[position] = value;
};
```
根据给定的key，我们需要根据所创建的散列函数计算出它在表中的位置。为了便于展示信息，我们将计算出的位置输出至控制台。然后要做的，是将value参数添加到用散列函数计算出的对应的位置上。
* Get方法
``` js
this.get = function(key){
    return table[loseloseHashCode(key)];
};
```
使用所创建的散列函数来求出给定key所对应的位置。这个函数会返回值的位置，因此我们所要做的就是根据这个位置从数组table中获得这个值。
* remove方法
``` js
this.remove=function(key){
    table[loseloseHashCode[key]] = undefined;
};
```

### 使用HashTable类
``` js
var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
```
执行上述代码，会在控制台中获得如下输出：
``` js
19 - Gandalf
29 - John
16 - Tyrion
```

### 散列表和散列集合

散列集合由一个集合构成，但是插入、移除或获取元素时，使用的是散列函数。
不同之处在于，不再添加键值对，而是只插入值而没有键。例如，可以使用散列集合来存储所有
的英语单词（不包括它们的定义）。和集合相似，散列集合只存储唯一的不重复的值。

### 处理散列表中的冲突
有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为
冲突
``` js
var hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');
```
输出如下：
``` js
19 - Gandalf
29 - John
16 - Tyrion
16 - Aaron
13 - Donnie
13 - Ana
5 - Jonathan
5 - Jamie
5 - Sue
32 - Mindy
32 - Paul
10 – Nathan
```
::: danger
Tyrion和Aaron有相同的散列值（16）。 Donnie和Ana有相同的散列
值（13）， Jonathan、 Jamie和Sue有相同的散列值（5）， Mindy和Paul也有相
同的散列值（32）。
::: 
print的辅助函数
``` js
this.print = function() {
for (var i = 0; i < table.length; ++i) { //{1}
if (table[i] !== undefined) { //{2}
        console.log(i + ": " + table[i]);//{3}
        }
    }
};
```
``` js
hash.print();
```

在控制台上得到如下的输出结果：

``` js
5: sue@email.com
10: nathan@email.com
13: ana@email.com
16: aaron@email.com
19: gandalf@email.com
29: johnsnow@email.com
32: paul@email.com
```
Jonathan、 Jamie和Sue有相同的散列值，也就是5。由于Sue是最后一个被添加的， Sue将是在HashTable实例中占据位置5的元素。首先， Jonathan会占据这个位置，然后Jamie会覆
盖它，然后Sue会再次覆盖。这对于其他发生冲突的元素来说也是一样的。

处理冲突的方法
1. 分离链接
   - 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。
      - 对于分离链接和线性探查来说，只需要重写三个方法： put、 get和remove。这三个方法在每种技术实现中都是不同的。
   - 为了实现一个使用了分离链接的HashTable实例，我们需要一个新的辅助类来表示将要加入LinkedList实例的元素。我们管它叫ValuePair类（在HashTable类内部定义）
   ``` js
   var ValuePair = function(key,value){
       this.key = key;
       this.value = value;

       this.toString = function(){
           return '['+this.key+'-'+this.value+']';
       }
   };
   ```
   这个类只会将key和value存储在一个Object实例中。
   * Put方法
   ``` js
    this.put = function(key,vale){
        var position = loseloseHashCode(key);
        if(table[position]==undefined){
            table[position] = new LInkedList();
        }
        table[position].append(new ValuePair(key,vale));
    }
   ```
   * Get方法
   ``` js
    this.get = function(key){
        var position = loseloseHashCode(key);
        if(table[position]!==undefined){
            //遍历链表来寻找键/值
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key===key){
                    return current.element.value;
                }
                current = current.next;
            }

            //检查元素在链表第一个或者最后一个节点的情况
            if(current.element.key===key){
                return current.element.value;
            }
        }
        return undefined;
    };
   ```
   * remove
   ``` js
    this.move = function(key){
        var position = loseloseHashCode(key);
        if(table[position]!==undefined){
            var current = table[position].getHead();
            while(current.next){
                if(current.element.key===key){
                    table[position].remove(current.element);
                    if(table[position].isEmpty()){
                        table[position] = undefined;
                    }
                    return true;
                }
                current = current.next;
            }

            //检查是否为第一个或者最后一个元素
            if(current.element.key===key){
                table[position].remove(current.element);
                if(table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false;
    };
   ```
2. 线性探测
   - 另一种解决冲突的方法是线性探查。当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，就尝试index+2的位置，以此类推。
   * put()
   ``` js
   this.put = function(key, value){
    var position = loseloseHashCode(key); // {1}
        if (table[position] == undefined) { // {2}
            table[position] = new ValuePair(key, value); // {3}
        } else {
            var index = ++position; // {4}
            while (table[index] != undefined){ // {5}
                index++; // {6}
        }
        table[index] = new ValuePair(key, value); // {7}
        }
    };

   ```


3. 双散列法

:::


