::: tip
# 图

## 相关术语

图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。

一个图G = (V, E)由以下元素组成。
 V：一组顶点
 E：一组边，连接V中的顶点

* 相邻顶点 由一条边连接在一起的顶点称为相邻顶点。
* 度 一个顶点的度是其相邻顶点的数量
* 路径 路径是顶点v1, v2,…,vk的一个连续序列，其中vi和vi+1是相邻的。
* 简单路径要求不包含重复的顶点。
* 环也是一个简单路径
* 如果图中不存在环，则称该图是无环的。
* 如果图中每两个顶点间都存在路径，则该图是连通的。

### 有向图与无向图

* 图可以是无向的（边没有方向）或是有向的（有向图）。
* 如果图中每两个顶点间在双向上都存在路径，则该图是强连通的
* 图还可以是未加权的或是加权的

## 图的表示
从数据结构的角度来说，我们有多种方式来表示图。在所有的表示法中，不存在绝对正确的方式。图的正确表示法取决于待解决的问题和图的类型。


### 邻接矩阵
图最常见的实现是邻接矩阵。每个节点都和一个整数相关联，该整数将作为数组的索引。我们用一个二维数组来表示顶点之间的连接。如果索引为i的节点和索引为j的节点相邻，则array[i][j]=== 1，否则array[i][j] === 0，

![](/images/data-graph-matrix.jpg)

不是强连通的图（稀疏图）如果用邻接矩阵来表示，则矩阵中将会有很多0，这意味着我们浪费了计算机存储空间来表示根本不存在的边。

### 邻接表
邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。我们可以用列表（数组）、链表，甚至是散列表或是字典来表示相邻顶点列表。

![](/images/data-graph-table.jpg)

尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用，且它们有着不同的性质（例如，要找出顶点v和w是否相邻，使用邻接矩阵会比较快）。

### 关联矩阵

在关联矩阵中，矩阵的行表示顶点，列表示边。如下图所示，我们使用二维数组来表示两者之间的连通性，如果顶点v是边e的入射点，则array[v][e] === 1；否则，array[v][e] === 0。

![](/images/data-graph-relate.jpg)

## 创建Graph类

``` js
function graph(){
    var vertices = [];
    var adjList = new Dictionary();
}
```
用一个数组来存储图中所有顶点的名字，以及一个字典来存储邻接表。字典将会使用顶点的名字作为键，邻接顶点列表作为值。 vertices数组和adjList字典两者都是我们Graph类的私有属性。

实现两个方法：一个用来向图中添加一个新的顶点（因为图实例化后是空的），另外一个方法用来添加顶点之间的边。
### addVertex()
``` js
this.addVertex = function(v){
    vertices.push(v);
    adjList.set(v,[]);
}
```
这个方法接受顶点v作为参数。我们将该顶点添加到顶点列表中，并且在邻接表中，设置顶点v作为键对应的字典值为一个空数组.

### addEdge()
``` js
this.addEdge = function(v,w){
    adjList.get(v).push(w);  //{5}
    adjList.get(w).push(v);  //{6}
}
```
首先，通过将w加入到v的邻接表中，我们添加了一条自顶点v到顶点w的边。如果你想实现一个有向图，则行{5}就足够了。由于本章中大多数的例子都是基于无向图的，我们需要添加一条自w向v的边{6}。


测试代码
``` js
var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I']; //{7}
for(var i=0;i<myVertices.length;i++){
    graph.addVertx(muVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
```
创建了一个数组，包含所有我们想添加到图中的顶点（行{7}）。接下来，我们只要遍历vertices数组并将其中的值逐一添加到我们的图中（行{8}）。最后，我们添加想要的边（行{9}）。

### toString()
``` js
this.toString = function(){
    var s = '';
    for(var i=0;i<vertices.length;i++){   //{10}
        s+=vertices[i]+'->';
        var neighbors = adjList.get(vertices[i]); //{11}
        for(var j=0;i<neighbors.length;j++){  //{12}
            s+=neighbour[j]+' ';
        }
        s+='\n';  //{13}
    }
    return s;
}
```

## 图的遍历

有两种算法可以对图进行遍历： 广度优先搜索（Breadth-First Search， BFS）和深度优先搜索（Depth-First Search， DFS）。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。

图遍历算法的思想是必须追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。

完全探索一个顶点要求我们查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。

为了保证算法的效率，务必访问每个顶点至多两次。连通图中每条边和顶点都会被访问到。

广度优先搜索算法和深度优先搜索算法基本上是相同的，只有一点不同，那就是待访问顶点
列表的数据结构。

算 法|数据结构|描 述
---|:--:|:--:
深度优先搜索 |栈 |通过将顶点存入栈中，顶点是沿着路径被探索的，存在新的相邻顶点就去访问
广度优先搜索| 队列 |通过将顶点存入队列中，最先入队列的顶点先被探索

当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
 白色：表示该顶点还没有被访问。
 灰色：表示该顶点被访问过，但并未被探索过。
 黑色：表示该顶点被访问过且被完全探索过。
这就是之前提到的务必访问每个顶点最多两次的原因。

### BFS

以下是从顶点v开始的广度优先搜索算法所遵循的步骤。
(1) 创建一个队列Q。
(2) 将v标注为被发现的（灰色），并将v入队列Q。
(3) 如果Q非空，则运行以下步骤：
(a) 将u从Q中出队列；
(b) 将标注u为被发现的（灰色）；
(c) 将u所有未被访问过的邻点（白色）入队列；
(d) 将u标注为已被探索的（黑色）。

``` js
var initializaeColor = function(){
    var color = [];
    for(var i=0;i<vertices.length;i++){
        color[vertices[i]] = 'white'; //{1}
    }
    return color;
};

this.bfs = function(v,callback){
    var color = initializeColor(), //{2}
    queue = new Queue();     //{3}
    queue.enqueue(v);        //{4}
    while(!enqueue.isEmpty()){  //{5}
        var u =queue.dequeue(); //{6}
        neighbours = adjList.get(u);  //{7}
        color[u] = 'grey';            //{8}
        for(var i=0;i<neighbours.length;i++){//{9}
            var w = neighbours[i];           //{10}
            if(color[w]==='white'){          //{11}
                color[w] = 'grey';           //{12}
                queue.enqueue(w);            //{13}
            }
        }
        color[u] = 'black';                  //{14}
        if(callback){                        //{15}
            callback(u);
        }
    }
};
```
广度优先搜索和深度优先搜索都需要标注被访问过的顶点。为此，我们将使用一个辅助数组color。由于当算法开始执行时，所有的顶点颜色都是白色（行{1}），所以我们可以创建一个辅助函数initializeColor，为这两个算法执行此初始化操作。

广度优先搜索的实现：
* 第一件事情是用initializeColor函数来将color数组初始化为white（行{2}）。我们还需要声明和创建一个Queue实例（行{3}），它将会存储待访问和待探索的顶点。
* bfs方法接受一个顶点作为算法的起始点。起始顶点是必要的，我们将此顶点入队列
* 如果队列非空（行{5}），我们将通过出队列（行{6}）操作从队列中移除一个顶点，并取得一个包含其所有邻点的邻接表（行{7}）。该顶点将被标注为grey（行{8}），表示我们发现了它（但还未完成对其的探索）
* 对于u（行{9}）的每个邻点，我们取得其值（该顶点的名字——行{10}），如果它还未被访问过（颜色为white——行{11}），则将其标注为我们已经发现了它（颜色设置为grey——行{12}），并将这个顶点加入队列中（行{13}），这样当其从队列中出列的时候，我们可以完成对其的探索
* 当完成探索该顶点和其相邻顶点后，我们将该顶点标注为已探索过的（颜色设置为black——行{14}）。

测试算法
``` js
function printNode(value){  //{16}
    console.log("Visited vertex: "+value);  //{17}
}
graph.bfs(myVertices[0],printNode);   //{18}
```
#### BFS寻找最短路径

给定一个图G和源顶点v，找出对每个顶点u， u和v之间最短路径的距离（以边的数量计）

对于给定顶点v，广度优先算法会访问所有与其距离为1的顶点，接着是距离为2的顶点，以此类推。所以，可以用广度优先算法来解这个问题。我们可以修改bfs方法以返回给我们一些信息：

 从v到u的距离d[u]；
 前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径。

``` js
this.BFS = function(v){
    var color = initializeColor(),
    queue = new Queue(),
    d =[],     //{1}
    pred = []; //{2}
    queue.enqueue(v);

    for(var i=0;i<vertices.length;i++){  //{3}
        d[vertices[i]] = 0;              //{4}
        pred[vertices[i]] =null;         //{5}
    }
    while(!queue.isEmpty()){
        var u = queue.dequeue(),
        neighbors = adjList.get(u);
        color[u] = 'grey';
        for(i=0;i<neighbors.length;i++){
            var w = neighbors[i];
            if(color[w]==='white'){
                color[w] = 'grey';
                d[w] = d[u]+1;   //{6}
                pred[w] = u;     //{7}
                queue.enqueue(w);
            }
        }
        color[u] = 'black';
    }
    return {//{8}
        distance:d,
        predecessors:pred
    };
};
```
声明数组d（行{1}）来表示距离，以及pred数组来表示前溯点。下一步则是对图中的每一个顶点，用0来初始化数组d（行{4}），用null来初始化数组pred。

当我们发现顶点u的邻点w时，则设置w的前溯点值为u（行{7}）。我们还通过给d[u]加1来设置v和w之间的距离（u是w的前溯点， d[u]的值已经有了）

方法最后返回了一个包含d和pred的对象（行{8}）

再次执行BFS方法，并将其返回值存在一个变量中：
``` js
var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);

distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3],
predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G: "C", H: "D", I: "E"]
```

通过前溯点数组，我们可以用下面这段代码来构建从顶点A到其他顶点的路径：、
``` JS
var fromVertex = myVertices[0]; //{9}
for(var i=1;i<myVertices.length;i++){ //{10}
    var toVertex = myVertices[i];  //{11}
    path = new Stack();            //{12}
    for(var v = toVertex;v!=fromVertex;v=shortestPathA.predecessors[v]){//{13}
        path.push(v);             //{14}
    }
    path.push(fromVertex);        //{15}
    var s = path.pop();           //{16}
    while(!path.isEmpty()){       //{17}
        s+='-'+path.pop();        //{18}
    }
    console.log(s);               //{19}
}

```

我们用顶点A作为源顶点（行{9}）。对于每个其他顶点（除了顶点A——行{10}），我们会计算顶点A到它的路径。我们从顶点数组得到toVertex（行{11}），然后会创建一个栈来存储路径值（行{12}）

接着，我们追溯toVertex到fromVertex的路径（行{13}）。变量v被赋值为其前溯点的值，这样我们能够反向追溯这条路径。将变量v添加到栈中（行{14}）。最后，源顶点也会被添加到栈中，以得到完整路径。

这之后，我们创建了一个s字符串，并将源顶点赋值给它（它是最后一个加入栈中的，所以
它是第一个被弹出的项 ——行{16}）。当栈是非空的，我们就从栈中移出一个项并将其拼接到字符串s的后面（行{18}）。最后（行{19}）在控制台上输出路径。

执行该代码段，我们会得到如下输出：
``` shell
A - B
A - C
A - D
A - B - E
A - B - F
A - C - G
A - D - H
A - B - E - I
```
这里，我们得到了从顶点A到图中其他顶点的最短路径（衡量标准是边的数量）。








::: 