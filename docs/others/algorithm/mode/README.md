 
# 算法模式
::: tip
## 递归

递归是一种解决问题的方法，它解决问题的各个小部分，直到解决最初的大问题。递归通常涉及函数调用自身。
递归函数是像下面这样能够直接调用自身的方法或函数：
``` js
function recursiveFunction(someParam){
    recursiveFunction(someParam);
};
```
能够像下面这样间接调用自身的函数，也是递归函数：
``` js
function recursiveFunction1(someParam){
    recursiveFunction2(someParam);
};
function recursiveFunction2(someParam){
    recursiveFunction1(someParam);
};
```
假设现在必须要执行recursiveFunction，结果是什么？单单就上述情况而言，它会一直执行下去。因此，每个递归函数都必须要有边界条件，即一个不再递归调用的条件（停止点），以防止无限递归。

### JS调用栈限制

如果忘记加上用以停止函数递归调用的边界条件，会发生什么呢？递归并不会无限地执行下去；浏览器会抛出错误，也就是所谓的栈溢出错误（stack overflow error）。
:::

::: danger
根据操作系统和浏览器的不同，具体数值会所有不同，但区别不大;ECMAScript 6有尾调用优化（tail call optimization）。如果函数内最后一个操作是调用函数，会通过“跳转指令”（jump） 而不是“子程序调用”（subroutine call）来
控制。
:::

### Fibonacci
::: tip
斐波那契数列的定义如下：
*  1和2的斐波那契数是 1；
*  n（n>2）的斐波那契数是(n1)的斐波那契数加上(n2)的斐波那契数。

``` js
function fibnacci(num){
    if(num===1||num===2){
        return 1;
    }
    return fibnacci(num-1)+fibnacci(num-2);
}
```
fibnacci(6)的调用如下：
![](/images/algorithm-recursicve-fibnacci.jpg)

非递归实现
``` js
function fib(num){
    var n1=1,n2=1,n=1;
    for(var i=3;i<=num;i++){
        n = n1+n2;
        n1 = n2;
        n2 = n;
    }
    return n;
}
```

## 动态规划

<b>动态规划（Dynamic Programming,DP）</b>是一种将复杂问题分解成更小的子问题来解决的优化技术。

用动态规划解决问题时，要遵循三个重要步骤：
* (1) 定义子问题；
* (2) 实现要反复执行来解决子问题的部分（这一步要参考前一节讨论的递归的步骤）；
* (3) 识别并求解出边界条件。
能用动态规划解决的一些著名的问题如下。
*  <b>背包问题</b>：给出一组项目，各自有值和容量，目标是找出总值最大的项目的集合。这个问题的限制是，总容量必须小于等于“背包”的容量。
*  <b>最长公共子序列</b>：找出一组序列的最长公共子序列（可由另一序列删除元素但不改变余下元素的顺序而得到）。
*  <b>矩阵链相乘</b>：给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法（计算次数尽可能少）。相乘操作不会进行，解决方案是找到这些矩阵各自相乘的顺序。
*  <b>硬币找零</b>：给出面额为d1…dn的一定数量的硬币和要找零的钱数，找出有多少种找零的方法。
*  <b>图的全源最短路径</b>：对所有顶点对(u, v)，找出从顶点u到顶点v的最短路径。Floyd-Warshall算法。

### 最小硬币找零

最少硬币找零问题是硬币找零问题的一个变种。硬币找零问题是给出要找零的钱数，以及可用的硬币面额d1…dn及其数量，找出有多少种找零方法。最少硬币找零问题是给出要找零的钱数，以及可用的硬币面额d1…dn及其数量，找到所需的最少的硬币个数。

例如，美国有以下面额（硬币）： d1=1， d2=5， d3=10， d4=25。
如果要找36美分的零钱，我们可以用1个25美分、 1个10美分和1个便士（1美分）。

最少硬币找零的解决方案是找到n所需的最小硬币数。但要做到这一点，首先得找到对每个x < n的解。然后，我们将解建立在更小的值的解的基础上。
``` js
    function MinCoinChange(coins) {
        var coins = coins; //{1}
        var cache = []; //{2}
        this.makeChange = function (amount) {
            var me = this;
            if (!amount) { //{3}
                return [];
            }
            if (cache[amount]) { //{4}
                return cache[amount];
            }
            var min = [],
                newMin, newAmount;
                for (let i = 0; i < coins.length; i++) {
                const coin = coins[i];
                newAmount = value - coin;
                if (newAmount >= 0) {
                    newMin = makeChange(newAmount);  //{7}
                }
                if (
                    newAmount >= 0
                    && (newMin.length < min.length - 1 || !min.length)  /*{9}*/
                    && (newMin.length || !newAmount)/*10*/
                ) {
                    min = [coin].concat(newMin);  /*{11}*/
                    console.log('new Min ' + min + ' for ' + amount);
                }
                }
                return (cache[amount] = min); //{12}
            };
        }
```
MinCoinChange类接收coins参数（行{1}），该参数代表问题中的面额。对美国的硬币系统而言，它是[1, 5, 10, 25]。我们可以随心所欲传递任何面额。此外，为了更加高效且不重复计算值，我们使用了cache（行{2}）

接下来是makeChange方法，它也是一个递归函数，找零问题由它解决。首先，若amount不为正（< 0），就返回空数组（行{3}）；方法执行结束后，会返回一个数组，包含用来找零的各个面额的硬币数量（最少硬币数）。接着，检查cache缓存。若结果已缓存（行{4}），则直接返回结果；否则，执行算法。

我们基于coins参数（面额）解决问题。因此，对每个面额（行{5}），我们都计算newAmount（行{6}）的值，它的值会一直减小，直到能找零的最小钱数（别忘了本算法对所有的x < amount都会计算makeChange结果）。若newAmount是合理的值（正值），我们也会计算它的找零结果（行
{7}）

最后，我们判断newAmount是否有效， minValue（最少硬币数）是否是最优解，与此同时
minValue和newAmount是否是合理的值（{行10}）。若以上判断都成立，意味着有一个比之前更优的答案（行{11}。以5美分为例，可以给5便士或者1个5美分镍币， 1个5美分镍币是最优解）。最后，返回最终结果（行{12}）。

### 背包问题

背包问题是一个组合优化问题。它可以描述如下：给定一个固定大小、能够携重W的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，且总价值最大。

下面是一个例子：
物 品# |重 量 |价 值
--:|:--:|:--
1 |2| 3
2 |3| 4
3 |4| 5
考虑背包能够携带的重量只有5。对于这个例子，我们可以说最佳解决案是往背包里装入物品1和物品2，这样，总重量为5，总价值为7。


这个问题有两个版本。 0-1版本只能往背包里装完整的物品，而<b>分数背包问题</b>则允许装入分数物品。在这个例子里，我们将处理该问题的0-1版本。动态规划对分数版本无能为力，但本章稍后要学习的贪心算法可以解决它。

``` js
function knapSack(capacity,weight,values,n){
    var i,w,a,b,ks=[];
    for(i=0;i<=n;i++){  //{1}
        ks[i]=[];
    }

    for(i=0;i<=n;i++){
        for(w=0;w<=capacity;w++){
            if(i==0||w==0){  //{2}
                ks[i][w] = 0;
            }else if(weights[i-1]<=w){//{3}
                a = values[i-1]+ks[i-1][w-weights[i-1]];
                b = ks[i-1][w];
                ks[i][w] = (a>b)?a:b;  //{4} max{a,b}
            }else{
                ks[i][w] = ks[i-1][w];  //{5}
            }
        }
    }

    return ks[n][capacity];   //{6}
}
```
我们来看看这个算法是如何工作的。
*  行{1}：首先，初始化将用于寻找解决方案的矩阵ks[n+1][capacity+1]。
*  行{2}：忽略矩阵的第一列和第一行，只处理索引不为0的列和行。
*  行{3}：物品i的重量必须小于约束（ capacity）才有可能成为解决方案的一部分；否则，
总重量就会超出背包能够携带的重量，这是不可能发生的。发生这种情况时，只要忽略
它，用之前的值就可以了（行{5}）。
*  行{4}：当找到可以构成解决方案的物品时，选择价值最大的那个。
*  行{6}：最后，问题的解决方案就在这个二维表格右下角的最后一个格子里。

我们可以用开头的例子来测试这个算法：
``` js
var values = [3, 4, 5],
weights = [2, 3, 4],
capacity = 5,
n = values.length;
console.log(knapSack(capacity, weights, values, n)); //输出 7
```
下图举例说明了例子中kS矩阵的构造：

![](/images/algorithm-knapsack-0-1.jpg.JPG)

请注意，这个算法只输出背包携带物品价值的最大值，而不列出实际的物品。我们可以增加下面的附加函数来找出构成解决方案的物品：
``` js
function findValue(n,capacity,ks,weights,values){
    var i=n,k=capacity;
    console.log('解决方案包含以下物品：')；
    while(i>0&&k>0){
        if(ks[i][k]!==ks[i-1][k]){
            console.log('物品'+i+',重量：'+weights[i-1]+',价值：'+values[i-1]);
            i--;
            k = k-ks[i][k];
        }else{
            i--;
        }
    }
}
```

我们可以在knapsack函数的行{6}之前调用这个函数。执行完整的算法，会得到如下输出：
解决方案包含以下物品：
* 物品2，重量： 4，价值： 3
* 物品1，重量： 3，价值： 2
* 总价值： 7


### 最长公共子序列

另一个经常被当作编程挑战问题的动态规划问题是最长公共子序列（ LCS）：找出两个字符串序列的最长子序列的长度。最长子序列是指，在两个字符串序列中以相同顺序出现，但不要求连续（非字符串子串）的字符串序列。

![](/images/algorithm-longest-string.jpg.JPG)

``` js
function lcs(wordX,wordY){
    var m = wordX.length,
    n = wordY.length,
    l=[],
    i,j,a,b;

    for(i=0;i<=m;++i){
        l[i] = m;  
        //{1}
        for(j=0;j<=n;++j){
            l[i][j] = 0;  
            //{2}
        }
    }

    for(i = 0;i<=n;i++){
        for(j=0;j<=n;j++){
            if(i==0||j==0){
                l[i][j]=0;
            }else if(wordX[i-1]==wordY[j-1]){
                l[i][j] = l[i-1][j-1]+1; 
                //{3}
            }else{
                a = l[i-1][j];
                b = l[i][j-1];
                l[i][j] = (a>b)>a:b; //max{a,b}  
                //{4}
            }
        }
    }
    //{5}
    return l[m][n]; 
}
```
比较背包问题和LCS算法，我们会发现两者非常相似。这项从顶部开始构建解决方案的技术被称为<b>记忆</b>，而解决方案就在表格或矩阵的右下角。

像背包问题算法一样，这种方法只输出LCS的长度，而不包含LCS的实际结果。要提取这个信息，需要对算法稍作修改，声明一个新的solution矩阵。注意，代码中有一些注释，我们需要用以下代码替换这些注释

*  行{1}： solution[i] = [];
*  行{2}： solution[i][j] = '0';
*  行{3}： solution[i][j] = 'diagonal';
*  行{4}： solution[i][j]=(l[i][j] == l[i-1][j]) ? 'top' : 'left';
*  行{5}： printSolution(solution, l, wordX, wordY, m, n);

printSolution函数如下：
``` js
function printSolution(solution,1,wordX,wordY,m,n){
    var a =m,b=n,i,j,
    x = solution[a][b],
    answer = '';
    
    while(x!=='0'){
        if(solution[a][b]==='diagonal'){
            answer = wordX[a-1]+answer;
            a--;
            b--;
        }else if(solution[a][b]==='left'){
            b--;
        }else if(solution[a][b]==='top'){
            a--;
        }
        x = solution[a][b];
    }
    console.log('lcs:'+answer);
}
```
当解矩阵的方向为对角线时，我们可以将字符添加到答案中。

如果用'acbaed'和'abcadf'两个字符串执行上面的算法，我们将得到输出4。用于构建结果的矩阵l看起来像下面这样。我们也可以用附加的算法来跟踪LCS的值（如下图高亮所示）

![](/images/algorithm-lcs.jpg.JPG)

### 矩阵链相乘

矩阵链相乘是另一个可以用动态规划解决的著名问题。这个问题是要找出一组矩阵相乘的最佳方式（顺序）。

让我们试着更好地理解这个问题。 n行m列的矩阵A和m行p列的矩阵B相乘，结果是n行p列的矩阵C。

考虑我们想做A*B*C*D的乘法。因为乘法满足结合律，所以我们可以让这些矩阵以任意顺序相乘。因此，考虑如下情况：

*  A是一个10行100列的矩阵
*  B是一个100行5列的矩阵
*  C是一个5行50列的矩阵
*  D是一个50行1列的矩阵
*  A*B*C*D的结果是一个10行1列的矩阵

在这个例子里，相乘的方式有五种。
* (1) (A(B(CD)))：乘法运算的次数是1750次。
* (2) ((AB)(CD))：乘法运算的次数是5300次。
* (3) (((AB)C)D)：乘法运算的次数是8000次。
* (4) ((A(BC))D)：乘法运算的次数是75 500次。
* (5) (A((BC)D))：乘法运算的次数是31 000次。

相乘的顺序不一样，要进行的乘法运算总数也有很大差异。那么，要如何构建一个算法，求出最少的乘法运算操作次数？矩阵链相乘的算法如下：
``` js
function matrixChainOrder(p,n){
    var i,j,k,l,q,m=[];
    for(i=1;i<=n;i++){
        m[i]=[];
        m[i][i]=0;
    }

    for(l=2;l<n;l++){
        for(i=1;i<=n-l+1;i++){
            j=i+l+1;
            m[i][j] = Number.MAX_SPFE_INTEGER;
            for(k=i;k<=j-1;k++){
                q = m[i][k]+m[k+1][j]+p[i-1]*p[k]*p[j]; //{1}
                if(q<=[i][j]){
                    m[i][j]=q;
                    //{2}
                }
            }
        }
    }
    //{3}
    return m[1][n-1];
}
```
整个算法中最重要的是行{1}，神奇之处全都在这一行。它计算了给定括号顺序的乘法运算次数，并将值保存在辅助矩阵m中。

对开头的例子执行上面的算法，会得到结果7500；正如我们前面提到的，这是最少的操作次数。看看这个：
``` js
var p = [10, 100, 5, 50, 1],
n = p.length;
console.log(matrixChainOrder(p, n));
```
然而，这个算法也不会给出最优解的括号顺序。为了得到这些信息，我们可以对代码做一些改动。

首先，我们需要通过以下代码声明并初始化一个辅助矩阵s：
``` js
var s = [];
for (i = 0; i <= n; i++) {
    s[i] = [];
    for (j = 0; j <= n; j++) {
        s[i][j] = 0;
    }
}
```
然后，在matrixChainOrder函数的行{2}添加下面的代码：
s[i][j] = k;

在行{3}，我们调用打印括号的函数，如下：
``` js
printOptimalParenthesis(s, 1, n-1);
```
最后，我们的printOptimalParenthesis函数如下：
``` js
function printOptimalParenthesis(s, i, j) {
if (i == j) {
    console.log("A[" + i + "]");
} else {
    console.log("(");
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(")");
    }
}
```

## 贪心算法

贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）。它不像动态规划算法那样计算更大的格局。

Dijkstra算法、 Prim算法和Kruskal算法都是贪心算法。

### 最少硬币找零问题

最少硬币找零问题也能用贪心算法解决。大部分情况下的结果是最优的，不过对有些面额而言，结果不会是最优的。
``` js
function MinCoinChange(coins){
    var coins = coins;  //{1}
    this.makeChange = function(amount){
        var change = [],total = 0;
        for(var i=coins.length;i>=0;i--){
            var coin = coins[i];
            while(total+coin<=amount){   //{3}
                change.push(coin);       //{4}
                total+=coin;             //{5}
            }
        }
        return change;
    };
}
```
不得不说贪心版本的MinCoinChange比动态规划版本的简单多了。和动态规划方法相似，我们传递面额参数，实例化MinCoinChange（行{1}）。

对每个面额（行{2}——从大到小），把它的值和total相加后， total需要小于amount（行{3}）。我们会将当前面额coin添加到结果中（行{4}），也会将它和total相加（行{5}）。

如你所见，这个解法很简单。从最大面额的硬币开始，拿尽可能多的这种硬币找零。当无法再拿更多这种价值的硬币时，开始拿第二大价值的硬币，依次继续。

用和DP方法同样的测试代码测试：
``` js
var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));
```
结果依然是[25, 10, 1]，和用DP得到的一样。下图阐释了算法的执行过程：

![](/images/algorithm-coinchange-greedy.JPG)

然而，如果用[1, 3, 4]面额执行贪心算法，会得到结果[4, 1, 1]。如果用动态规划的解法，会得到最优的结果[3, 3]。

比起动态规划算法而言，贪心算法更简单、更快。然而，如我们所见，它并不总是得到最优答案。但是综合来看，它相对执行时间来说，输出了一个可以接受的解。

### 分数背包问题

求解分数背包问题的算法与动态规划版本稍有不同。在0-1背包问题中，只能向背包里装入完整的物品，而在分数背包问题中，我们可以装入分数的物品。我们用前面用过的例子来比较两者的差异，如下所示：

物品# |重 量 |价 值
--:|:--:|:--
1 |2 |3
2 |3 |4
3 |4 |5

在动态规划的例子里，我们考虑背包能够携带的重量只有5。而在这个例子里，我们可以说最佳解决方案是往背包里装入物品1和物品2，总重量为5，总价值为7。

如果在分数背包问题中考虑相同的容量，得到的结果是一样的。因此，我们考虑容量为6的情况。

在这种情况下，解决方案是装入物品1和物品2，还有25%的物品3。这样，重量为6的物品总价值为8.25
``` js
function knapSack(capacity,values,weights){
    var n = values.length,load = 0,i=0,val=0;
    for(i=0;i<n&&load<capacity;i++){      //{1}
        if(weights[i]<=(capacity-load)){  //{2}
        val+=values[i];
        load+=weights[i];
        }else{
            var r = (capacity-lod)/weights[i];  //{3}
            val +=r*weights[i];
            load+=weights[i];
        }
    }
    return w;
}
```
下面是对算法的解释。

*  行{1}：总重量少于背包容量，继续迭代，装入物品。
*  行{2}：如果物品可以完整地装入背包，就将其价值和重量分别计入背包已装入物品的总价值（ val）和总重量（ load）。
*  行{3}：如果物品不能完整地装入背包，计算能够装入部分的比例（ r）。


## 函数式编程介绍

到目前为止，我们在本书中所用的编程范式都是命令式编程。在命令式编程中，我们按部就班地编写程序代码，详细描述要完成的事情以及完成的顺序。

在本节中，我们会介绍一种新的范式，叫作函数式编程。函数式编程是一种曾经主要用于学术领域的范式，多亏了Python和Ruby等现代语言，它才开始在行业开发者中流行起来。值得欣慰的是，借助ES6的能力， JavaScript也能够进行函数式编程。

### 函数式编程与命令式编程


:::




::: danger
要注意动态规划和分而治之（归并排序和快速排序算法中用到的那种）是不同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题。
::: 






