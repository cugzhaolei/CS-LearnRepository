# 队列 Queue
队列是遵循FIFO（First In First Out， 先进先出，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。最常见的是排队

## 4.2 创建队列
从最基本的声明类开始：
``` js
function Queue(){
   //添加的方法 
}
//需要一个用于存储队列中元素的数据结构
let items = [];
```
队列方法
 enqueue(element(s))：向队列尾部添加一个（或多个）新的项。
 dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
 front()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
 isEmpty()：如果队列中不包含任何元素，返回true，否则返回false。
 size()：返回队列包含的元素个数，与数组的length属性类似。

### 4.2.1 向队列添加元素
enqueue方法。这个方法负责向队列添加新元素。这里有一个非常重要的细节，新的项只能添加到队列末尾：
``` js
this.enqueue = function(element){
    items.push(element);
};
```
### 4.2.2 从队列移除元素
dequeue方法。这个方法负责从队列移除项。由于队列遵循先进先出原则，最先添加的项也是最先被移除的。
``` js
this.dequeue=function(){
    return items.shift();
};
```
### 4.2.3 查看队列头元素
用front方法。这个方法会返回队列最前面的项（数组的索引为0）：
``` js
this.front = function(){
    return items[0];
};
```

### 4.2.4 检查队列是否为空
isEmpty方法。如果队列为空，它会返回true，否则返回false
``` js
this.front = function(){
    return items.length==0;
};
//size方法
this.size = function(){
    return items.length;
}
```

###  4.2.5 打印队列元素
``` js
this.print = function(){
    console.log(items.toString());
};
```
``使用Queue类``
首先要做的是实例化我们刚刚创建的Queue类，然后就可以验证它为空
``` js
function Queue() {

    let items = [];

    this.enqueue = function(element){
        items.push(element);
    };

    this.dequeue = function(){
        return items.shift();
    };

    this.front = function(){
        return items[0];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.clear = function(){
        items = [];
    };

    this.size = function(){
        return items.length;
    };

    this.print = function(){
        console.log(items.toString());
    };
}


let queue = new Queue();
console.log(queue.isEmpty()); //输出true

queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
queue.print();
console.log(queue.size()); //输出3
console.log(queue.isEmpty()); //输出false
queue.dequeue();
queue.dequeue();
queue.print();
```

## 4.3 用 ECMAScript 6 语法实现的 Queue 类
用一个WeakMap来保存私有属性items，并用外层函数（闭包）来封装Queue类
``` js
let Queue2 = (function(){
    const items = new WeakMap();
    class Queue2{
        constructor(){
            items.set(this,[]);
        }
        enqueue(element){
            let q = items.get(this);
            q.push(element);
        }
        dequeue(){
            let q = items.get(this);
            let r = q.shift();
            return r;
        }
        //其他方法
    }
    return Queue2;
})();
```

## 4.4 优先队列
其中一个修改版就是优先队列。元素的添加和移除是基于优先级的。实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们
``` js
function PriorityQueue() {

    let items = [];

    function QueueElement (element, priority){ // {1}
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority){
        let queueElement = new QueueElement(element, priority);

        let added = false;
        for (let i=0; i<items.length; i++){
            if (queueElement.priority < items[i].priority){ // {2}
                items.splice(i,0,queueElement);             // {3}
                added = true;
                break; // {4}
            }
        }
        if (!added){
            items.push(queueElement); //{5}
        }
    };

    this.dequeue = function(){
        return items.shift();
    };

    this.front = function(){
        return items[0];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.size = function(){
        return items.length;
    };

    this.print = function(){
        for (let i=0; i<items.length; i++){
            console.log(`${items[i].element}  - ${items[i].priority}`);
        }
    };
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();
```
默认的Queue类和PriorityQueue类实现上的区别是，要向PriorityQueue添加元素，需要创建一个特殊的元素（行{1}）。这个元素包含了要添加到队列的元素（它可以是任意类型）及其在队列中的优先级。

如果队列为空，可以直接将元素入列（行{2}）。否则，就需要比较该元素与其他元素的优先级。当找到一个比要添加的元素的priority值更大（优先级更低）的项时，就把新元素插入到它之前（根据这个逻辑，对于其他优先级相同，但是先添加到队列的元素，我们同样遵循先进先出的原则）。

如果要添加元素的priority值大于任何已有的元素，把它添加到队列的末尾就行了（行{5}）：

![](/images/datastructure-JavaScript-queue-priorityqueue-example.jpg)

第一个被添加的元素是优先级为2的John。因为此前队列为空，所以它是队列中唯一的元素。接下来，添加了优先级为1的Jack。由于Jack的优先级高于John，它就成了队列中的第一个元素。 然后， 添加了优先级也为1的Camila。 Camila的优先级和Jack相同，所以它会被插入到Jack之后（因为Jack先被插入队列）； Camila的优先级高于John，所以它会被插入到John之前。

这里实现的优先队列称为最小优先队列，因为优先级的值较小的元素被放置在队列最前面（1代表更高的优先级）。最大优先队列则与之相反，把优先级的值较大的元素放置在队列最前面。

## 循环队列——击鼓传花
还有另一个修改版的队列实现，就是循环队列。循环队列的一个例子就是击鼓传花游戏（ Hot Potato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）
``` js
function hotPotato(nameList,num){
    let queue = new Queue(); //{1}

    for(let i=0;i<nameList.length;i++){
        queue.enqueue(nameList[i]); //{2}
    }
    let eliminated = '';
    while(queue.size()>1){
        for(let i=0;i<num;i++){
            queue.enqueue(queue.dequeue());//{3}
        }
        eliminated = queue.dequeue();//{4}
        console.log(eliminated+"在击鼓传花游戏中被淘汰。");
    }
}
let names = ['John','Jack','Camila','Ingrid','Carl'];
let winner = hotPotato(names, 7);console.log('The winner is: ' + winner);
```
实现一个模拟的击鼓传花游戏，要用到这一章开头实现的Queue类（行{1}）。我们会得到一份名单，把里面的名字全都加入队列（行{2}）。给定一个数字，然后迭代队列。从队列开头移除一项，再将其添加到队列末尾（行{3}），模拟击鼓传花（如果你把花传给了旁边的人，你被淘汰的威胁立刻就解除了）。一旦传递次数达到给定的数字，拿着花的那个人就被淘汰了（从队列中移除——行{4}）。最后只剩下一个人的时候，这个人就是胜者（行{5}）。

以上算法的输出如下：
```
Camila在击鼓传花游戏中被淘汰。
Jack在击鼓传花游戏中被淘汰。
Carl在击鼓传花游戏中被淘汰。
Ingrid在击鼓传花游戏中被淘汰。
胜利者： John
```
![](/images/datastructure-JavaScript-queue-hotpotato.jpg)

## 4.6 JavaScript 任务队列
当我们在浏览器中打开新标签时，就会创建一个任务队列。这是因为每个标签都是单线程处理所有的任务，它被称为事件循环。浏览器要负责多个任务，如渲染HTML，执行JavaScript代码，处理用户交互（用户输入、鼠标点击等），执行和处理异步请求。

## 4.7 小结
* 队列数据结构
* 队列算法
* enqueue和dequeue方法操作元素
* es5/es6实现队列的方法
* 优先队列，循环队列