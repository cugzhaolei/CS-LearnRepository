# 链表 List

 链表数据结构
 向链表添加元素
 从链表移除元素
 使用LinkedList类
 双向链表
 循环链表

## 5.1 链表数据结构

要存储多个元素，数组（或列表）可能是最常用的数据结构。这种数据结构非常方便，提供了一个便利的[]语法来访问它的元素。然而，这种数据结构有一个缺点：（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入
或移除项的成本很高，因为需要移动元素.

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成

![链表的描述](/images/datastructure-JavaScript-list-what's-list.jpg)

链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点（ 表头）开始迭代列表直到找到所需的元素。

## 5.2 创建链表

es5实现linkedlist

``` js
function LinkedList(){
    let Node = function(){
        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;

    this.append = funtion(element){};
    this.insert = function(position,element){};
    this.removeAt = function(position){};
    this.remove = function(element){};
    this.indexOf = function(element){};
    this.isEmpty = function(){};
    this.size = function(){};
    this.getHead = function(){};
    this.toString = function(){};
    this.print = function(){};
}
```

Node类表示要加入列表的项。它包含一个element属性，即要添加到列表的值，以及一个next属性，即指向列表中下一个节点项的指针。

 append(element)：向列表尾部添加一个新的项。
 insert(position, element)：向列表的特定位置插入一个新的项。
 remove(element)：从列表中移除一项。
 indexOf(element)：返回元素在列表中的索引。如果列表中没有该元素则返回-1。
 removeAt(position)：从列表的特定位置移除一项。
 isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
 size()：返回链表包含的元素个数。与数组的length属性类似。
 toString()：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值。

### 5.2.1 向连表尾部追加元素

向LinkedList对象尾部添加一个元素时，可能有两种场景：列表为空，添加的是第一个元素，或者列表不为空，向其追加元素。

``` js
this.append = function(element){
    let node = new Node(element),
        current;

    if(head===null){ //列表中第一个节点
        head = node;
    }else{
        current = head;
        //循环列表，找到最后一项
        while(current.next){
            current = current.next;
        }
        //找到最后一项，将其next赋为node，建立连接
        current.next = node;
    }
    length++;//更新列表的长度
};
```

向为空的列表添加一个元素。当我们创建一个LinkedList对象时，head会指向null
![新建链表](/images/datastructure-JavaScript-linkedlist-new-linklist.jpg)

如果head元素为null（列表为空——行{3}），就意味着在向列表添加第一个元素。因此要做的就是让head元素指向node元素。 下一个node元素将会自动成为null

::: tip
列表最后一个节点的下一个元素始终是null
:::
向一个不为空的列表尾部添加元素。

要向列表的尾部添加一个元素，首先需要找到最后一个元素。记住，我们只有第一个元素的引用，因此需要循环访问列表，直到找到最后一项。为此，我们需要一个指向列表中current项的变量。

循环访问列表时，当current.next元素为null时，我们就知道已经到达列表尾部了。然后要做的就是让当前（也就是最后一个）元素的next指针指向想要添加到列表的节点.

![插入链表](/images/datastructure-JavaScript-linkedlist-new-linklist-insert.jpg)

### 5.2.2 从链表中移除元素

从LinkedList对象中移除元素。移除元素也有两种场景：第一种是移除第一个元素，第二种是移除第一个以外的任一元素。我们要实现两种remove方法：第一种是从特定位置移除一个元素，第二种是根据元素的值移除元素

``` js
this.removeAt = function(position){
    //检查越界限
    if(position >-1&&position <length){
        let current = head,
        previous,
        idnex = 0;

        //移除第一项
        if(position === 0){
            head = head.next;
        }else{
            while(index++<position){
                previous = current;
                current = current.next;
            }
            //将previous与current的下一项链接起来：跳过current，从而移除它
            previous.next = current.next; 
        }
        length--;
        return current.element;
    }else{
        return null;
    }
};
```

从列表中移除第一个元素（position === 0）

![删除数](/images/datastructure-JavaScript-linkedlist-removeexample.jpg)

移除列表的最后一项或者中间某一项，使用一个用于内部控制和递增的index变量）： current
变量总是为对所循环列表的当前元素的引用,previous用于表示对前一个元素的引用

要从列表中移除当前元素，要做的就是将previous.next和current.next链接起来

![删除链表中](/images/datastructure-JavaScript-linkedlist-remove2.jpg)

对于最后一个元素，当我们在跳出循环时，current变量将是对列表中最后一个元素的引用（要移除的元素）。 current.next的值将是null（因为它是最后一个元素）。由于还保留了对previous元素的引用（当前元素的前一个元素）， previous.next就指向了current。那么要移除current，要做的就是把previous.next的值改变为current.next。

![删除最后一个](/images/datastructure-JavaScript-linkedlist-removelast.jpg)

current变量是对要移除元素的引用。 previous变量是对要移除元素的前一个元素的引用。
那么要移除current元素，需要做的就是将previous.next与current.next链接起来。

### 5.2.3 在任意位置插入元素

在任意位置插入一个元素

``` js
this.insert = function(position,element){
    //检查越界值
    if(position>=0&&position<=length){//{1}
        let node = new Node(element);
        current = head,
        previous,
        index = 0;

        if(position === 0){
            //在第一个位置添加
            node.next = current;//{2}
            head = node;
        }else{
            while(index++<position){//{3}
                previous = current;
                current = current.next;
            }
            node.next = current;// {4}
            previous.next = node; //{5}
        }
        length++; //更新列表的长度
        return true;
    }else{
        return false; //{6}
    }
}
```

位置需要检查是否越界，需要检查越界值（行{1}）。如果越界了，就返回false值，表示没有添加项到列表中（行{6}）
插入的场景：

* 第一种场景，需要在列表的起点添加一个元素，也就是第一个位置。

![插入头部](/images/datastructure-JavaScript-linkedlist-insert-example-head.jpg)

current变量是对列表中第一个元素的引用。把node.next的值设为current（列表中第一个元素）。现在head和node.next都指向了current。接下来要做的就是把head的引用改为node（行{2}），这样列表中就有了一个新元素。

* 第二种情况，在列表中间或尾部添加一个元素。首先，我们需要循环访问列表，找到目标位置（行{3}）。当跳出循环时， current变量将是对想要插入新元素的位置之后一个元素的引用，而previous将是对想要插入新元素的位置之前一个元素的引用。在这种情况下，我们要在previous和current之间添加新项。因此，首先需要把新项（ node）和当前项链接起来（行{4}），然后需要改变previous和current之间的链接。我们还需要让previous.next指向node（行{5}）。

![插入中间](/images/datastructure-JavaScript-linkedlist-insert-middle.jpg)

* 向最后一个位置添加一个新元素， previous将是对列表最后一项的引用，而current将是null。在这种情况下， node.next将指向current，而previous.next将指向node，这样列表中就有了一个新的项.

::: tip
使用变量引用我们需要控制的节点非常重要，这样就不会丢失节点之间的链接。我们可以只使用一个变量（ previous），但那样会很难控制节点之间的链接。由于这个原因，最好是声明一个额外的变量来帮助我们处理这些引用
:::

### 5.2.4 其他方法

1. toString()

``` js
this.toString = function(){
    let current = head;//{1}
    string = '';   //{2}
    while(current){//{3}
        string +=current.element+(current.next?'n':''); //{4}
        current = current.next;//{5}
    }
    return string;  //{6}
};
```

首先，要循环访问列表中的所有元素，就需要有一个起点，也就是head。我们会把current变量当作索引（行{1}），控制循环访问列表。我们还需要初始化用于拼接元素值的变量（行{2}）。接下来就是循环访问列表中的每个元素（行{3}）。我们要用current来检查元素是否存在（如果列表为空，或是到达列表中最后一个元素的下一位（null）， while循环中的代码就不会执行）。然后我们就得到了元素的内容，将其拼接到字符串中（行{4}）。最后，继续迭代下一个元素（行{5}）。最后，返回列表内容的字符串（行{6}）。

2. indexOf()

indexOf方法接收一个元素的值.

``` js
this.indexOf = function(element){
    let current = head,//{1}
    index = -1;

    while(current){  //{2}
        if(element === current.element){
            return index;  //{3}
        }
        index++;                //{4}
        current = current.next; //{5}
    }
    return -1;
};
```

需要一个变量来帮助我们循环访问列表，这个变量是current，它的初始值是head（列表的第一个元素——我们还需要一个index变量来计算位置数（行{1}））,访问元素（行{2}），检查当前元素是否是我们要找的。如果是，就返回它的位置（行{3}）；如果不是，就继续计数（行{4}），检查列表中下一个节点（行{5}）。

如果列表为空，或是到达列表的尾部（ current = current.next将是null），循环就不会执行。如果没有找到值，就返回-1。

3. remove()

``` js
this.remove = function(element){
    let index = this.indexOf(element);
    return this.removeAt(index);
};
```

4. isEmpty()

``` js
this.isEmpty = function() {
    return length === 0;
};
```

4. length()

``` js
this.size = function() {
    return length;
};
```

5. getHead()

``` js
this.getHead = function(){
    return head;
};
```

## 5.3 双向链表

双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素

![双向链表](/images/datastructure-JavaScript-linkedlist-doublehead.jpg)

``` js
function DoublyLinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
        this.pre = null; //新增加
    };

    let length = 0;
    let head = null;
    let tail = null; //新增加的
}
```

LinkedList类和DoublyLinkedList类之间的区别标为新增的。在Node类里有prev属性（一个新指针），在DoublyLinkedList类里也有用来保存对列表最后一项的引用的tail属性。

双向链表提供了两种迭代列表的方法：从头到尾，或者反过来。我们也可以访问一个特定节点的下一个或前一个元素。在单向链表中，如果迭代列表时错过了要找的元素，就需要回到列表起点，重新开始迭代。这是双向链表的一个优点。

### 5.3.1 在任意位置插入元素

向双向链表中插入一个新项跟（单向）链表非常类似。区别在于，链表只要控制一个next指针，而双向链表则要同时控制next和prev（ previous，前一个）这两个指针。

``` js
this.insert = function(position,element){
    //检查越界值
    if(position>=0&&position<=element){
        let node = new Node(element),
        current = head,
        previous,
        index = 0;

        if(position === 0 ){//在第一个位置添加
            if(!head){//新增加的{1}
                head = node;
                tail = node;
            }else{
                node.next = current;
                current.next = node; //新增加的{2}
                head = node;
            }
        }else if(position === length){//最后一项//新增的
            current = tail;//{3}
            current.next = node;
            tail = node;
        }else{
            while(index++<position){ //{4}
                previous = current;
                current = current.next;
            }
            node.next = current; //{5}
            previous.next = node;
        }
        length++; //更新列表的长度
        return true;
    }else{
        return false;
    }
};
```

第一种场景：在列表的第一个位置（列表的起点）插入一个新元素。如果列表为空（行{1}），只需要把head和tail都指向这个新节点。如果不为空， current变量将是对列表中第一个元素的引用。就像我们在链表中所做的，把node.next设为current，而head将指向node（它将成为列表中的第一个元素）。不同之处在于，我们还需要为指向上一个元素的指针设一个值。 current.prev指针将由指向null变为指向新元素（node——行{2}）。 node.prev指针已经是null，因此不需要再更新任何东西。

![doubly linked list](/images/datastructure-JavaScript-linkedlist-doublylist-newlist.jpg)

在列表最后添加一个新元素。这是一个特殊情况，控制着指向最后一个元素的指针（ tail）。 current变量将引用最后一个元素（行{3}）。然后开始建立第一个链接： node.prev将引用current。 current.next指针（指向null）将指向node（由于构造函数，node.next已经指向了null）。然后只剩一件事了，就是更新tail，它将由指向current变为指向node。

![doubly linked list](/images/datastructure-JavaScript-linkedlist-doublylist-new.jpg)

第三种场景：在列表中间插入一个新元素。就像我们在之前的方法中所做的，迭代列表，直到到达要找的位置（行{4}）。我们将在current和previous元素之间插入新元素。首先， node.next将指向current（行{5}），而previous.next将指向node，这样就不会丢失节点之间的链接。然后需要处理所有的链接： current.prev将指向node，而node.prev将指向previous。

![doubly linkedlist 3](/images/datastructure-JavaScript-linkedlist-doublylist-type3.jpg)

### 5.3.2 从任意位置移除元素

``` js
this.removeAt = function(position){
    //检查数组越界
    if(position>-1&&position<length){
        let current = head,
        previous,
        index = 0;

        //移除第一项
        if(position === 0){
            head = current.next; //{1}

            //如果只有一项 更新tail //新增
            if(length === 1){  //{2}
                tail = null;
            }else{
                head.prev = null; //{3}
            }
        }else if(position === length-1){//最后一项 //新增的
        current = tail;//{4}
        tail = current.prev;
        tail.next = null;
        }else{
            while(index++<position){//{5}
                previous = current;
                current = current.next;
            }

            //将previous与current的下一项连接起来一起跳过current
            previous.next = current.next；//{6}
            current.next.prev = previous；//新增加的
        }
        length --;
        return current.element;
    }else{
        return null;
    }
};
```

处理三种场景：从头部、从中间和从尾部移除一个元素。如何移除第一个元素。current变量是对列表中第一个元素的引用，也就是我们想移除的元素。需要做的就是改变head的引用，将其从current改为下一个元素（current.next——行{1}）。但我们还需要更新current.next指向上一个元素的指针（因为第一个元素的prev指针是null）。因此，把head.prev的引用改为null（行{3}——因为head也指向列表中新的第一个元素，或者也可以用current.next.prev）。由于还需要控制tail的引用，我们可以检查要移除的元素是否是第一个元素，如果是，只需要把tail也设为null（行{2}）。

![remove](/images/frontend-algorithm-JavaScript-doublylinkedlist-insert.jpg)

从最后一个位置移除元素。既然已经有了对最后一个元素的引用（tail），我
们就不需要为找到它而迭代列表。这样我们也就可以把tail的引用赋给current变量（行{4}）。接下来，需要把tail的引用更新为列表中倒数第二个元素（current.prev，或者tail.prev也可以）。既然tail指向了倒数第二个元素，我们就只需要把next指针更新为null（tail.next= null）。

![remove](/images/algorithm-JavaScript-linkedlist-removelastnode.jpg)

第三种也是最后一种场景：从列表中间移除一个元素。首先需要迭代列表，直到到达要找的位置（行{5}）。 current变量所引用的就是要移除的元素。那么要移除它，我们可以通过更新previous.next和current.next.prev的引用，在列表中跳过它。因此， previous.next将指向current.next，而current.next.prev将指向previous

![remove])(/images/algorithm-javascript-linkedlist-doublylist-removemiddle.jpg)

## 5.4 循环链表

循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（ tail.next）不是引用null，而是指向第一个元素（ head）

![circular](/images/algorithm-javascript-recursive-linkedlist.jpg)

## 5.5 小结

学习了链表这种数据结构，及其变体双向链表和循环链表。学习了如何在任意位置添加和移除元素，以及如何循环访问链表。还学习了链表相比数组最重要的优点，那就是无需移动链表中的元素，就能轻松地添加和移除元素。因此，当需要添加和移除很多元素时，最好的选择就是链表，而非数组。

完整代码

* ES5实现

``` js
function LinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
        } else {

            current = head;

            //loop the list until find last item
            while(current.next){
                current = current.next;
            }

            //get last item and assign next to added item to make the link
            current.next = node;
        }

        length++; //update size of list
    };

    this.insert = function(position, element){

        //check for out-of-bounds values
        if (position >= 0 && position <= length){

            let node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0){ //add on first position

                node.next = current;
                head = node;

            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }

            length++; //update size of list

            return true;

        } else {
            return false;
        }
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){
                head = current.next;
            } else {

                while (index++ < position){

                    previous = current;
                    current = current.next;
                }

                //link previous with current's next - skip it to remove
                previous.next = current.next;
            }

            length--;

            return current.element;

        } else {
            return null;
        }
    };

    this.remove = function(element){

        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){

        let current = head,
            index = 0;

        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.size = function() {
        return length;
    };

    this.getHead = function(){
        return head;
    };

    this.toString = function(){

        let current = head,
            string = '';

        while (current) {
            string += current.element + (current.next ? ', ' : '');
            current = current.next;
        }
        return string;

    };

    this.print = function(){
        console.log(this.toString());
    };
}

```

* ES6实现

``` js
let LinkedList2 = (function () {

    class Node {
        constructor(element){
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();

    class LinkedList2 {

        constructor () {
            length.set(this, 0);
            head.set(this, null);
        }

        append(element) {

            let node = new Node(element),
                current;

            if (this.getHead() === null) { //first node on list
                head.set(this, node);
            } else {

                current = this.getHead();

                //loop the list until find last item
                while (current.next) {
                    current = current.next;
                }

                //get last item and assign next to added item to make the link
                current.next = node;
            }

            //update size of list
            let l = this.size();
            l++;
            length.set(this, l);
        }

        insert(position, element) {

            //check for out-of-bounds values
            if (position >= 0 && position <= this.size()) {

                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index = 0;

                if (position === 0) { //add on first position

                    node.next = current;
                    head.set(this, node);

                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) {

            //check for out-of-bounds values
            if (position > -1 && position < this.size()) {

                let current = this.getHead(),
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {
                    head.set(this, current.next);
                } else {

                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = 0;

            while (current) {
                if (element === current.element) {
                    return index;
                }
                index++;
                current = current.next;
            }

            return -1;
        }

        isEmpty() {
            return this.size() === 0;
        }

        size() {
            return length.get(this);
        }

        getHead() {
            return head.get(this);
        }

        toString() {

            let current = this.getHead(),
                string = '';

            while (current) {
                string += current.element + (current.next ? ', ' : '');
                current = current.next;
            }
            return string;

        }

        print() {
            console.log(this.toString());
        }
    }

    return LinkedList2;
})();


let list = new LinkedList2();
list.append(15);
list.print();
console.log(list.indexOf(15));
list.append(10);
list.print();
console.log(list.indexOf(10));
list.append(13);
list.print();
console.log(list.indexOf(13));
console.log(list.indexOf(10));
list.append(11);
list.append(12);
list.print();
console.log(list.removeAt(1));
list.print()
console.log(list.removeAt(3));
list.print();
list.append(14);
list.print();
list.insert(0,16);
list.print();
list.insert(1,17);
list.print();
list.insert(list.size(),18);
list.print();
list.remove(16);
list.print();
list.remove(11);
list.print();
list.remove(18);
list.print();
```

``` js
//ES5
function DoublyLinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
        this.prev = null; //NEW
    };

    let length = 0;
    let head = null;
    let tail = null; //NEW

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
            tail = node; //NEW
        } else {

            //attach to the tail node //NEW
            tail.next = node;
            node.prev = tail;
            tail = node;
        }

        length++; //update size of list
    };

    this.insert = function(position, element){

        //check for out-of-bounds values
        if (position >= 0 && position <= length){

            let node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0){ //add on first position

                if (!head){       //NEW
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node; //NEW {1}
                    head = node;
                }

            } else  if (position === length) { //last item //NEW

                current = tail;     // {2}
                current.next = node;
                node.prev = current;
                tail = node;

            } else {
                while (index++ < position){ //{3}
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;

                current.prev = node; //NEW
                node.prev = previous; //NEW
            }

            length++; //update size of list

            return true;

        } else {
            return false;
        }
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){

                head = current.next; // {1}

                //if there is only one item, then we update tail as well //NEW
                if (length === 1){ // {2}
                    tail = null;
                } else {
                    head.prev = null; // {3}
                }

            } else if (position === length-1){ //last item //NEW

                current = tail; // {4}
                tail = current.prev;
                tail.next = null;

            } else {

                while (index++ < position){ // {5}

                    previous = current;
                    current = current.next;
                }

                //link previous with current's next - skip it to remove
                previous.next = current.next; // {6}
                current.next.prev = previous; //NEW
            }

            length--;

            return current.element;

        } else {
            return null;
        }
    };

    this.remove = function(element){

        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){

        let current = head,
            index = -1;

        //check first item
        if (element == current.element){
            return 0;
        }

        index++;

        //check in the middle of the list
        while(current.next){

            if (element == current.element){
                return index;
            }

            current = current.next;
            index++;
        }

        //check last item
        if (element == current.element){
            return index;
        }

        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this. size = function() {
        return length;
    };

    this.toString = function(){

        let current = head,
            s = current ? current.element : '';

        while(current && current.next){
            current = current.next;
            s += ', ' + current.element;
        }

        return s;
    };

    this.inverseToString = function() {

        let current = tail,
            s = current ? current.element : '';

        while(current && current.prev){
            current = current.prev;
            s += ', ' + current.element;
        }

        return s;
    };

    this.print = function(){
        console.log(this.toString());
    };

    this.printInverse = function(){
        console.log(this.inverseToString());
    };

    this.getHead = function(){
        return head;
    };

    this.getTail = function(){
        return tail;
    }
}

//ES6
let DoublyLinkedList2 = (function () {

    class Node {
        constructor(element) {
            this.element = element;
            this.next = null;
            this.prev = null; //NEW
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();
    const tail = new WeakMap(); //NEW

    class DoublyLinkedList2 {

        constructor () {
            length.set(this, 0);
            head.set(this, null);
            tail.set(this, null);
        }

        append(element) {

            let node = new Node(element),
                current, _tail;

            if (this.getHead() === null) { //first node on list
                head.set(this, node);
                tail.set(this, node); //NEW
            } else {
                //attach to the tail node //NEW
                _tail = this.getTail();
                _tail.next = node;
                node.prev = _tail;
                tail.set(this, node);
            }

            //update size of list
            let l = this.size();
            l++;
            length.set(this, l);
        }

        insert(position, element) {

            //check for out-of-bounds values
            if (position >= 0 && position <= this.size()) {

                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index = 0;

                if (position === 0) { //add on first position

                    if (!this.getHead()) {       //NEW
                        head.set(this, node);
                        tail.set(this, node);
                    } else {
                        node.next = current;
                        current.prev = node; //NEW {1}
                        head.set(this, node);
                    }

                } else if (position === this.size()) { //last item //NEW

                    current = tail;     // {2}
                    current.next = node;
                    node.prev = current;
                    tail.set(this, node);

                } else {
                    while (index++ < position) { //{3}
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;

                    current.prev = node; //NEW
                    node.prev = previous; //NEW
                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) {

            //check for out-of-bounds values
            if (position > -1 && position < this.size()) {

                let _head = this.getHead(),
                    _tail = this.getTail(),
                    current = _head,
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {

                    _head = current.next; // {1}

                    //if there is only one item, then we update tail as well //NEW
                    if (this.size() === 1) { // {2}
                        _tail = null;
                    } else {
                        _head.prev = null; // {3}
                    }

                } else if (position === this.size() - 1) { //last item //NEW

                    current = _tail; // {4}
                    _tail = current.prev;
                    _tail.next = null;

                } else {

                    while (index++ < position) { // {5}

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next; // {6}
                    current.next.prev = previous; //NEW
                }

                head.set(this,_head);
                tail.set(this,_tail);

                //update size of list
                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;
        }

        isEmpty() {
            return this.size() === 0;
        }

        size() {
            return length.get(this);
        }

        toString() {

            let current = this.getHead(),
                s = current ? current.element : '';

            while (current && current.next) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s;
        }

        inverseToString() {

            let current = this.getTail(),
                s = current ? current.element : '';

            while (current && current.prev) {
                current = current.prev;
                s += ', ' + current.element;
            }

            return s;
        }

        print() {
            console.log(this.toString());
        }

        printInverse() {
            console.log(this.inverseToString());
        }

        getHead() {
            return head.get(this);
        }

        getTail() {
            return tail.get(this);
        }
    }
    return DoublyLinkedList2;
})();


let list = new DoublyLinkedList2();

list.append(15);
list.print();
list.printInverse();

list.append(16);
list.print();
list.printInverse();

list.append(17);
list.print();
list.printInverse();

list.insert(0,13);
list.print();
list.printInverse();

list.insert(4,18);
list.print();
list.printInverse();

list.insert(1,14);
list.print();
list.printInverse();

list.removeAt(0);
list.print();
list.printInverse();

list.removeAt(list.size()-1);
list.print();
list.printInverse();

list.removeAt(1);
list.print();
list.printInverse();

list.remove(16);
list.print();
list.printInverse();

list.remove(14);
list.print();
list.printInverse();

list.remove(17);
list.print();
list.printInverse();
```

* 循环链表

``` js
//es5
function CircularLinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
        } else {

            current = head;

            //loop the list until find last item
            while(current.next !== head){ //last element will be head instead of NULL
                current = current.next;
            }

            //get last item and assign next to added item to make the link
            current.next = node;
        }

        //set node.next to head - to have circular list
        node.next = head;

        length++; //update size of list
    };

    this.insert = function(position, element){

        //check for out-of-bounds values
        if (position >= 0 && position <= length){

            let node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0){ //add on first position
                
                if(!head){ // if no node  in list
                    head = node;
                    node.next = head;
                }else{
                    node.next = current;

                    //update last element
                    while(current.next !== head){ //last element will be head instead of NULL
                        current = current.next;
                    }

                    head = node;
                    current.next = head;
                }
                

            } else {
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }

            length++; //update size of list

            return true;

        } else {
            return false;
        }
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){

                while(current.next !== head){ //needs to update last element first
                    current = current.next;
                }

                head = head.next;
                current.next = head;

            } else { //no need to update last element for circular list

                while (index++ < position){

                    previous = current;
                    current = current.next;
                }

                //link previous with current's next - skip it to remove
                previous.next = current.next;
            }

            length--;

            return current.element;

        } else {
            return null;
        }
    };

    this.remove = function(element){

        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){

        let current = head,
            index = -1;

        //check first item
        if (element == current.element){
            return 0;
        }

        index++;

        //check in the middle of the list
        while(current.next !== head){

            if (element == current.element){
                return index;
            }

            current = current.next;
            index++;
        }

        //check last item
        if (element == current.element){
            return index;
        }

        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this.size = function() {
        return length;
    };

    this.getHead = function(){
        return head;
    };

    this.toString = function(){

        let current = head,
            s = current.element;

        while(current.next !== head){
            current = current.next;
            s += ', ' + current.element;
        }

        return s.toString();
    };

    this.print = function(){
        console.log(this.toString());
    };
}

//es6
let CircularLinkedList2 = (function () {

    class Node {
        constructor(element) {
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();

    class CircularLinkedList2 {

        constructor () {
            length.set(this, 0);
            head.set(this, null);
        }

        append(element) {

            let node = new Node(element),
                current;

            if (this.getHead() === null) { //first node on list
                head.set(this, node);
            } else {

                current = this.getHead();

                //loop the list until find last item
                while (current.next !== this.getHead()) { //last element will be head instead of NULL
                    current = current.next;
                }

                //get last item and assign next to added item to make the link
                current.next = node;
            }

            //set node.next to head - to have circular list
            node.next = this.getHead();

            //update size of list
            let l = this.size();
            l++;
            length.set(this, l);
        }

        insert(position, element) {

            //check for out-of-bounds values
            if (position >= 0 && position <= this.size()) {

                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index = 0;

              if (position === 0) { //add on first position

                  if(!this.getHead()) { // if no node  in list
                      head.set(this, node);
                      node.next = this.getHead();
                  } else {
                      node.next = current;
                      //update last element
                      while(current.next !== this.getHead()) { //last element will be head instead of NULL
                          current = current.next;
                      }
                      head.set(this, node);
                      current.next = this.getHead();
                  }

                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) {

            //check for out-of-bounds values
            if (position > -1 && position < this.size()) {

                let current = this.getHead(),
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {

                    while (current.next !== this.getHead()) { //needs to update last element first
                        current = current.next;
                    }

                    head.set(this, this.getHead().next);
                    current.next = this.getHead();

                } else { //no need to update last element for circular list

                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next !== this.getHead()) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;
        }

        isEmpty() {
            return this.size() === 0;
        }

        size() {
            return length.get(this);
        }

        getHead() {
            return head.get(this);
        }

        toString() {

            let current = this.getHead(),
                s = current.element;

            while (current.next !== this.getHead()) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s.toString();
        }

        print() {
            console.log(this.toString());
        }
    }
    return CircularLinkedList2;
})();


let circularLinkedList = new CircularLinkedList2();

circularLinkedList.append(15);
circularLinkedList.print();

circularLinkedList.append(16);
circularLinkedList.print();

circularLinkedList.insert(0,14);
circularLinkedList.print();

circularLinkedList.insert(1,14.5);
circularLinkedList.print();

circularLinkedList.insert(4,17);
circularLinkedList.print();

circularLinkedList.removeAt(0);
circularLinkedList.print();

circularLinkedList.removeAt(1);
circularLinkedList.print();

circularLinkedList.removeAt(2);
circularLinkedList.print();

console.log(circularLinkedList.indexOf(14.5));
console.log(circularLinkedList.indexOf(16));
```
