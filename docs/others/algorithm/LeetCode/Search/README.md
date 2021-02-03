# 搜索算法

## BFS

广度优先搜索一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。

![bfs](/images/algorithm-LeetCode-search-bfs.jpg)

第一层：

```bash
- 0 -> {6,2,1,5}
```

第二层：

```bash
- 6 -> {4}
- 2 -> {}
- 1 -> {}
- 5 -> {3}
```

第三层：

```bash
- 4 -> {}
- 3 -> {}
```

每一层遍历的节点都与根节点距离相同。设 d~i~ 表示第 i 个节点与根节点的距离，推导出一个结论：对于先遍历的节点 i 与后遍历的节点 j，有 d~i~ <= d~j~。利用这个结论，可以求解最短路径等 最优解 问题：第一次遍历到目的节点，其所经过的路径为最短路径。应该注意的是，使用 BFS 只能求解无权图的最短路径，无权图是指从一个节点到另一个节点的代价都记为 1。

在程序实现 BFS 时需要考虑以下问题：

- 队列：用来存储每一轮遍历得到的节点；
- 标记：对于遍历过的节点，应该将它标记，防止重复遍历。

### [1091.二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)

```bash
[[1,1,0,1],
 [1,0,1,0],
 [1,1,1,1],
 [1,0,1,1]]
```

题目描述：1 表示可以经过某个位置，求解从 (0, 0) 位置到 (tr, tc) 位置的最短路径长度。

```java
public int minPathLength(int[][] grids, int tr, int tc) {
    final int[][] direction = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    final int m = grids.length, n = grids[0].length;
    Queue<Pair<Integer, Integer>> queue = new LinkedList<>();
    queue.add(new Pair<>(0, 0));
    int pathLength = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        pathLength++;
        while (size-- > 0) {
            Pair<Integer, Integer> cur = queue.poll();
            int cr = cur.getKey(), cc = cur.getValue();
            grids[cr][cc] = 0; // 标记
            for (int[] d : direction) {
                int nr = cr + d[0], nc = cc + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || grids[nr][nc] == 0) {
                    continue;
                }
                if (nr == tr && nc == tc) {
                    return pathLength;
                }
                queue.add(new Pair<>(nr, nc));
            }
        }
    }
    return -1;
}
```

### [279.完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

示例 1:

```bash
输入: n = 12
输出: 3
解释: 12 = 4 + 4 + 4.
```

[动态规划：](https://leetcode-cn.com/problems/perfect-squares/solution/hua-jie-suan-fa-279-wan-quan-ping-fang-shu-by-guan/)

动态转移方程为：dp[i] = MIN(dp[i], dp[i - j * j] + 1)，i 表示当前数字，j\*j 表示平方数

```js
var numSquares = function(n) {
  const dp = [...Array(n + 1)].map((_) => 0); //数组长度n+1 值均为0
  for (let i = 1; i <= n; i++) {
    dp[i] = i;
    for (let j = 0; i - j * j >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1); //动态转移方程
    }
  }
  return dp[n];
};
```

```java
public int numSquares(int n){
    int[] dp = new int[n+1];  //默认初始值为0
    for(int i=0;i<=n;i++){
        dp[i] = i;
        for(int j=1;i-j*j>=0;j++){
            dp[i]=Math.min(dp[i],dp[i-j*j]+1);
        }
    }
    return dp[n];
}
```

[BFS](https://leetcode-cn.com/problems/perfect-squares/solution/java-jie-fa-jiang-wen-ti-zhuan-hua-wei-tu-lun-by-b/)

```java
static class Node {
        int val;
        int step;

        public Node(int val, int step) {
            this.val = val;
            this.step = step;
        }
    }

    // 将问题转化成图论
    // 该算法在往队列里面添加节点的时候会 add 很多重复的节点，导致超时，
    // 优化办法是，加入 visited 数组，检查要 add 的数据是否已经出现过了，防止数据重复出现，从而影响图的遍历
    // 同时优化：num - i * i 表达式，只让他计算一次
    // 同时在循环体里面判断退出或返回的条件，而不是在循环体外
    public int numSquares(int n) {
        Queue<Node> queue = new LinkedList<>();
        queue.add(new Node(n, 0));
        // 其实一个真正的图的 BSF 是一定会加上 visited 数组来过滤元素的
        boolean[] visited = new boolean[n+1];
        while (!queue.isEmpty()) {
            int num = queue.peek().val;
            int step = queue.peek().step;
            queue.remove();
            for (int i = 1; ; i++) {
                int a = num - i * i;
                if (a < 0) {
                    break;
                }
                // 若 a 已经计算到 0 了，就不必再往下执行了
                if (a == 0) {
                    return step + 1;
                }
                if (!visited[a]) {
                    queue.add(new Node(a, step + 1));
                    visited[a] = true;
                }
            }
        }
        return -1;
    }
```

### [127.单词接龙](https://leetcode-cn.com/problems/word-ladder/)

给定两个单词（beginWord  和 endWord）和一个字典，找到从  beginWord 到  endWord 的最短转换序列的长度。转换需遵循如下规则：

每次转换只能改变一个字母。
转换过程中的中间单词必须是字典中的单词。

```
示例 1:

输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出: 5

解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
     返回它的长度 5。
```

[官方题解](https://leetcode-cn.com/problems/word-ladder/solution/dan-ci-jie-long-by-leetcode/)

```java
import javafx.util.Pair;

class Solution {
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {

    // Since all words are of same length.
    int L = beginWord.length();

    // Dictionary to hold combination of words that can be formed,
    // from any given word. By changing one letter at a time.
    HashMap<String, ArrayList<String>> allComboDict = new HashMap<String, ArrayList<String>>();

    wordList.forEach(
        word -> {
          for (int i = 0; i < L; i++) {
            // Key is the generic word
            // Value is a list of words which have the same intermediate generic word.
            String newWord = word.substring(0, i) + '*' + word.substring(i + 1, L);
            ArrayList<String> transformations =
                allComboDict.getOrDefault(newWord, new ArrayList<String>());
            transformations.add(word);
            allComboDict.put(newWord, transformations);
          }
        });

    // Queue for BFS
    Queue<Pair<String, Integer>> Q = new LinkedList<Pair<String, Integer>>();
    Q.add(new Pair(beginWord, 1));

    // Visited to make sure we don't repeat processing same word.
    HashMap<String, Boolean> visited = new HashMap<String, Boolean>();
    visited.put(beginWord, true);

    while (!Q.isEmpty()) {
      Pair<String, Integer> node = Q.remove();
      String word = node.getKey();
      int level = node.getValue();
      for (int i = 0; i < L; i++) {

        // Intermediate words for current word
        String newWord = word.substring(0, i) + '*' + word.substring(i + 1, L);

        // Next states are all the words which share the same intermediate state.
        for (String adjacentWord : allComboDict.getOrDefault(newWord, new ArrayList<String>())) {
          // If at any point if we find what we are looking for
          // i.e. the end word - we can return with the answer.
          if (adjacentWord.equals(endWord)) {
            return level + 1;
          }
          // Otherwise, add it to the BFS Queue. Also mark it visited
          if (!visited.containsKey(adjacentWord)) {
            visited.put(adjacentWord, true);
            Q.add(new Pair(adjacentWord, level + 1));
          }
        }
      }
    }

    return 0;
  }
}
```

## DFS

### Java实现

```js
public Iterator DFSTraverse(Vertex v){
    LinkedList traverseSeq = new LinkedListDLNode();// 遍历结果
    resetVexStatus(); //重置顶点状态
    DFSRecursion(v,traverseSeq); // 从v 点出发深度优先搜索
    Iterator it = getVertext(); // 从图未曾访问的其他顶点重新搜索
    for(it.first();!it.isDone();it.next()){
        Vertex u = (Vertex)it.currentItem();
        if(!u.isVisited())DFSRecursion(u,traverseSeq);
    }
    return traverseSeq.elements();
}

private void DFSRecursion(Vertex v,LinkedList list){
    v.setToVisited(); // 设置顶点V已经访问过
    list.insertLast(v); // 访问顶点v
    Iterator it = adjVertexs(v); // 取得顶点v的所有邻接点
    for(it.first();!it.isDone();it.next()){
        Vertex u = (Vertex)it.currentItem();
        if(!u.isVisited())DFSRecursion(u,list);
    }
}
```

深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点.

![DFS](/images/algorithm-LeetCode-search-dfs.jpg)

### [695.岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)

```java
class Solution {
    int [][] grid;
    int rows,columns;
    int max = Integer.MIN_VALUE;
    int sum = 0;
    public int maxAreaOfIsland(int[][] grid) {
        if(grid.length==0||grid==null){
            return 0;
        }
        this.grid = grid;
        this.rows = grid.length;
        this.columns = grid[0].length;
        for(int i=0;i<grid.length;i++){
            for(int j=0;j<grid[0].length;j++){
                if(grid[i][j]==1){
                    findArea(i,j);
                    max = Math.max(sum,max);
                    sum=0;
                }
            }
        }
        return max == Integer.MIN_VALUE?0:max;
    }
    public void findArea(int i,int j){
        if(i<0||i>=rows||j<0||j>=columns||grid[i][j]==0||grid[i][j]==-1){
            return;
        }
        sum++;
        grid[i][j]=-1;
        findArea(i-1,j);
        findArea(i+1,j);
        findArea(i,j+1);
        findArea(i,j-1);
        }
}
```

### [200.岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

给定一个由  '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

```java
class Solution {
    public int numIslands(char[][] grid) {
        if(grid==null||grid.length==0){
            return 0;
        }
        int nr = grid.length;
        int nc = grid[0].length;
        int num_islands = 0;
        for(int r=0;r<nr;++r){
            for(int c=0;c<nc;++c){
                if(grid[r][c]=='1'){
                    ++num_islands;
                    dfs(grid,r,c);
                }
            }
        }
        return num_islands;
    }

     void dfs(char[][] grid,int r,int c){
        int nr = grid.length;
        int nc = grid[0].length;
        if(r<0||c<0||r>=nr||c>=nc||grid[r][c]=='0'){
            return;
        }
        grid[r][c] = '0';
        dfs(grid,r-1,c);
        dfs(grid,r+1,c);
        dfs(grid,r,c-1);
        dfs(grid,r,c+1);
    }
}
```

### [547.朋友圈](https://leetcode-cn.com/problems/friend-circles/)

班上有  N  名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B  的朋友，B 是 C  的朋友，那么我们可以认为 A 也是 C  的朋友。所谓的朋友圈，是指所有朋友的集合。

给定一个  N \* N  的矩阵  M，表示班级中学生之间的朋友关系。如果 M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。

```java
public class Solution{
    public void dfs(int[][] M,int[] visited,int i){
        for(int j=0;j<M.length;j++){
            if(M[i][j]==1&&visited[j]==0){
                visited[j]=1;
                dfs(M,visited,j);
            }
        }
    }

    public int findCircleNum(int[][] M){
        int[] visited = new int[M.length];
        int count = 0;
        for(int i=0;i<M.length;i++){
            if(visited[i]==0){
                dfs(M,visited,i);
                count++;
            }
        }
        return count;
    }
}
```

### [130.被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)

给定一个二维的矩阵，包含  'X'  和  'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的  'O' 用 'X' 填充。

示例:

```bash
X X X X
X O O X
X X O X
X O X X
```

运行你的函数后，矩阵变为：

```bash
X X X X
X X X X
X X X X
X O X X
```

[解答](https://leetcode-cn.com/problems/surrounded-regions/solution/bfsdi-gui-dfsfei-di-gui-dfsbing-cha-ji-by-ac_pipe/)

1. bfs+递归

```java
class Solution {
    public void solve(char[][] board) {
        if (board == null || board.length == 0) return;
        int m = board.length;
        int n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // 从边缘o开始搜索
                //判断当前点是否是边界情况
                boolean isEdge = i == 0 || j == 0 || i == m - 1 || j == n - 1;
                if (isEdge && board[i][j] == 'O') {
                    dfs(board, i, j);
                }
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
                if (board[i][j] == '#') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    public void dfs(char[][] board, int i, int j) {
        if (i < 0 || j < 0 || i >= board.length  || j >= board[0].length || board[i][j] == 'X' || board[i][j] == '#') {
            // board[i][j] == '#' 说明已经搜索过了.
            return;
        }
        board[i][j] = '#';
        dfs(board, i - 1, j); // 上
        dfs(board, i + 1, j); // 下
        dfs(board, i, j - 1); // 左
        dfs(board, i, j + 1); // 右
    }
}

```

2. [dfs+递归](https://leetcode-cn.com/problems/surrounded-regions/solution/130-bei-wei-rao-de-qu-yu-by-alexer-660/)

```js
var solve = function(board) {
  let m = board.length;
  if (m == 0) {
    return;
  }
  let n = board[0].length;
  let cannot = {};
  let dfs = (i, j) => {
    //越界 标志过或者非相连O下return
    if (
      i < 0 ||
      j < 0 ||
      i == m ||
      j == n ||
      board[i][j] != "O" ||
      cannot[i + "-" + j]
    ) {
      return;
    }
    cannot[i + "-" + j] = true;
    dfs(i - 1, j);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i, j + 1);
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //从边缘O出发寻找其相连接点都标示为不可替换
      if (
        i == 0 ||
        j == 0 ||
        i == m - 1 ||
        (j == n - 1 && board[i][j] == "O")
      ) {
        dfs(i, j);
      }
    }
  }
  //规避边界条件去循环 将边界不相互连接的联通到一起
  for (let i = 1; i < m - 1; i++) {
    for (let j = 1; j < n - 1; j++) {
      if (!cannot[i + "-" + j] && board[i][j] == "O") {
        board[i][j] = "X";
      }
    }
  }
};
```

### [417.太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，而“大西洋”处于大陆的右边界和下边界。
规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。
请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。

[DFS+递归](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/solution/ni-liu-dfs-yu-bfs-by-fibonacciwh/)

```java
public  List<List<Integer>> pacificAtlantic(int[][] matrix){
    List<List<Integer>> result = new ArrayList<>();
    if(matrix.length==0||matrix[0].length==0){
        return new ArrayList<>();
    }

    int m = matrix.length;
    int n = matrix[0].length;
    int[][] pacific = new int[m][n];
    int[][] atlantic = new int[m][n];

    //海洋边界
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            if(i==0||j==0){
                dfs(matrix,pacific,i,j,matrix[i][j]);
            }
            if(i==m-1||j==n-1){
                dfs(matrix,atlantic,i,j,matrix[i][j]);
            }
        }
    }

    List<List<Integer>> res = new ArrayList<>();
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            if(pacific[i][j]==1&&atlantic[i][j]==1){
                res.add(Arrays.asList(i,j));
            }
        }
    }
    return res;
}

private void dfs(int[][] matrix,int[][] aux,int i,int j,int pre){
    //判断边界
    if(i<0||j<0||i>matrix.length-1||j>matrix[0].length-1||aux[i][j]==1||matrix[i][j]<pre){
        return;
            //aux[i][j]==1 已经流过了
            //matrix[i][j]<pre不能流动
    }

    aux[i][j]=1;
    dfs(matrix,aux,i-1,j,matrix[i][j]);
    dfs(matrix,aux,i+1,j,matrix[i][j]);
    dfs(matrix,aux,i,j-1,matrix[i][j]);
    dfs(matrix,aux,i,j+1,matrix[i][j]);
}
```

BFS+递归

```java
public List<List<Integer>>pacificAtlantic(int[][] matrix){
    if(matrix.length==0||matrix[0].length==0){
        return new ArrayList<>();
    }

    int m = matrix.length;
    int n = matrix[0].length;

    Queue<int[]> pacificQueue = new LinkedList<>();
    Queue<int[]> atlanticQueue = new LinkedList<>();

    int[][] pacificAux = new int[m][n];
    int[][] atlanticAux = new int[m][n];

    //从海洋边界开始
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            if(i==0||j==0){
                pacificQueue.add(new int[]{i,j});
            }
            if(i==m-1||j==n-1){
                atlanticQueue,add(new int[]{i,j});
            }
        }
    }

    bfs(matrix,pacificAux,pacificQueue);
    bfs(matrix,atlanticAux,atlanticQueue);

    List<List<Integer>> res = new ArrayList<>();
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            //路未被标记
            if(pacificAux[i][j]==1&&atlanticAux[i][j]==1){
                res.add(Arrays.asList(i,j));
            }
        }
    }
    return res;
}

private void bfs(int[][] matrix,int[][] aux,Queue<int[]> queue){
    while(!queue.isEmpty()){
        int[] array = queue.remove();
        int i = array[0];
        int j = array[1];
        //流到的位置置为1
        aux[i][j]=1;
        //数组位置不越界 从高到低或者同等高度移动
        if(i-1>=0&&matrix[i][j]<=matrix[i-1][j]&&aux[i-1][j]!=1){
            queue.add(new int[]{i-1,j});
        }
        if(i+1<matrix.length&&matrix[i][j]<=matrix[i+1][j]&&aux[i+1][j]!=1){
            queue.add(new int[]{i+1,j});
        }
        if(j-1>=0&&matrix[i][j]<=matrix[i][j-1]&&aux[i][j-1]!=1){
            queue.add(new int[]{i,j-1});
        }
        if(j+1<matrix[0].length&&matrix[i][j]<=matrix[i][j+1]&&aux[i][j+1]!=1){
            queue.add(new int[]{i,j+1});
        }
    }
}

```

### [100.相同的树](https://leetcode-cn.com/problems/same-tree/)

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

```java
public boolean isSameTree(TreeNode p,TreeNode q){
    //左右子树都为空
    if(p==null&&q==null) return true;

    //左右任一个为空
    if(p==null||q==null) return false;
    if(p.val!=q.val) return false;

    return isSameTree(p.left,q.left)&&isSameTree(p.right,q.right);
}
```

### [101.对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树  [1,2,2,3,4,4,3] 是对称的。

```bash
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个  [1,2,2,null,3,null,3] 则不是镜像对称的:

```bash
    1
   / \
  2   2
   \   \
   3    3
```

```java
public boolean isSymmetric(TreeNode root){
    if(root==null) return true;
    return judge(root.left,root.right);

}
private boolean judge(TreeNode left,TreeNode right){
    if(left==null&&right==null) return true;
    if(left==null||right==null) return false;
    if(left.val!=right.val) return false;
    return judge(left.left,right.rigth)&&judge(left.right,right.left);
}
```

### [102.层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。

例如:
给定二叉树: [3,9,20,null,null,15,7],

```bash
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```bash
[
  [3],
  [9,20],
  [15,7]
]
```

bfs+递归实现

```java
List<List<Integer>> levels = new ArrayList<List<Integer>>();

public void helper(TreeNode node,int level){
    //从当前层次开始
    if(levels.size()==level){
        levels.add(new ArrayList<Integer>());
    }
    //填充当前层次
    levels.get(level).add(node.val);

    //处理当前节点的下一节点
    if(node.left!=null){
        helper(node.left,level+1);
    }
    if(node.right!=null){
        helper(node.right,level+1);
    }
}

public List<List<Integer>> levelOrder(TreeNode root)
{
    if(root==null) return levels;
    helper(root,0);
    return levels;
}
```

迭代实现

```java
public List<List<Integer>> levelOrder(TreeNode root){
    List<List<Integer>> levels = new ArrayList<List<Integer>>();
    if(root==null) return levels;

    Queue<TreeNode> queue = new LinkedList<TreeNode>();
    queue.add(root);
    int level =0;
    while(!queue.isEmpty()){
        //开始当前层
        levels.add(new ArrayList<Integer>());
        //当前层下面的所有数
        int level_length = queue.size();
        for(int i=0;i<levle_length;++i){
            TreeNode node = queue.remove();
            //填充当前节点
            levels.get(level).add(node.val);

            //将当前节点的子节点添加到队列中
            if(node.left!=null) queue.add(node.left);
            if(node.right!=null)queue.add(node.right);
        }
        //下一层开始
        level++;
    }
    return levels;
}
```

### [116.填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```bash
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有  next 指针都被设置为 NULL。

```java
public Node connect(Node root){
    if(root==null) return null;
    Node pre = root;
    Node cur = null;
    Node start = pre;
    while(pre.left!=null){
        //遍历到最右边的节点，要将pre和cur更新到下一层，并且用start记录
        if(cur==null){
            //把pre的左节点的next指向右节点
            pre.left.next = pre.right;

            pre = start.left;
            cur = start.right;
            start = pre;
            //连接下一层的next,同时pre next 后移
        }else{
            //把pre的左节点的next指向右节点
            pre.left.next = pre.right;
            //pre的右节点的next指向cur的左节点
            pre.right.next = cur.left;

            pre = pre.next;
            cur = cur.next;

        }
    }
    return root;
}
```

## Backtrace

回溯是一种通过穷举所有可能情况来找到所有解的算法。如果一个候选解最后被发现并不是可行解，回溯算法会舍弃它，并在前面的一些步骤做出一些修改，并重新尝试找到可行解。

套用[算法模板](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-tao-mo-ban-ji-ke-by-jeromememory/)
直接上回溯算法框架。解决一个回溯问题，实际上就是一个决策树的遍历过程。你只需要思考 3 个问题：

1、路径：也就是已经做出的选择。

2、选择列表：也就是你当前可以做的选择。

3、结束条件：也就是到达决策树底层，无法再做选择的条件。

```bash
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return

for 选择 in 选择列表:
    做选择
    backtrack(路径, 选择列表)
    撤销选择
```

其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」，特别简单。

```java
List<List<Integer>> res = new LinkedList<>();

/* 主函数，输入一组不重复的数字，返回它们的全排列 */
List<List<Integer>> permute(int[] nums) {
    // 记录「路径」
    // 这里的 选择列表 即包含在nums中
    LinkedList<Integer> track = new LinkedList<>();
    backtrack(nums, track);
    return res;
}

// 路径：记录在 track 中
// 选择列表：nums 中的元素
// 结束条件：nums 中的元素全都在 track 中出现
void backtrack(int[] nums, LinkedList<Integer> track) {
    // 触发结束条件
    if (track.size() == nums.length) {
        res.add(new LinkedList(track));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        // 排除不合法的选择
        if (track.contains(nums[i]))
            continue;
        // 做选择
        track.add(nums[i]);
        // 进入下一层决策树
        backtrack(nums, track);
        // 取消选择，返回上一层决策树
        track.removeLast();
    }
}
```

解决 LeetCode 39 题的回溯算法

```java
public class combinationSum_39 {

    public static void main(String[] args) {
        combinationSum(new int[]{2,3,6,7},7);
        System.out.println(res);

    }
    public static List<List<Integer>> res =  new LinkedList<>();

    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        LinkedList<Integer> track = new LinkedList<>();
        //排序后剪枝更容易
        Arrays.sort(candidates);
        //套用公式，candidates是指选择列表。target用来判断是否结束和用于剪枝
        //track是路径 已经做出的选择
        backtrack(candidates, 0, target, track);
        return res;
    }

    private static void backtrack(int[] candidates, int start, int target, LinkedList<Integer> track) {
        //先判断结束条件
        if (target < 0) return;
        if (target == 0){
            //target为0时 将路径加入结果列表
            res.add(new LinkedList<>(track));
            return;
        }
        //遍历选择列表
        for(int i = start;i < candidates.length;i++){
            if(target < candidates[i]) break;
            track.add(candidates[i]);
            backtrack(candidates,i,target-candidates[i],track);
            track.removeLast();
        }
    }
}
```

### [17.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例:
“
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
”

```java
class Solution {

    Map<String,String> phone = new HashMap<String,String>(){{
        put("2","abc");
        put("3","def");
        put("4","ghi");
        put("5","jkl");
        put("6","mno");
        put("7","pqrs");
        put("8","tuv");
        put("9","wxyz");
    }};

    List<String> output = new ArrayList<String>();

    public void backtrace(String combination,String next_digits){
        //没有数字
        if(next_digits.length()==0){
            //组合完成
            output.add(combination);

        //如果next_digits不为空
        }else{
            //枚举在map中的所有字母中可用的字符
            String digit = next_digits.substring(0,1);
            String letters = phone.get(digit);
            for(int i=0;i<letters.length();i++){
                String letter = phone.get(digit).substring(i,i+1);
                //将当前字符添加到组合中
                //处理下一个数字
                backtrace(combination+letter,next_digits.substring(1));
            }
        }
    }

    public List<String> letterCombinations(String digits) {
        if(digits.length()!=0)
        {
            backtrace("",digits);
        }
        return output;
    }
}
```

### [复原 IP 地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

示例:

```bash
输入: "25525511135"
输出: ["255.255.11.135", "255.255.111.35"]
```

[BFS+回溯](https://leetcode.wang/leetCode-93-Restore-IP-Addresses.html)

```java
    public List<String> restoreIpAddresses(String s) {
        List<String> ans = new ArrayList<>(); //保存最终的所有结果
        getAns(s,0,new StringBuilder(),ans,0);
        return ans;
    }

    private void getAns(String s,int start,StringBuilder temp,List<String> ans,int count){
        //长度大于剩下部分的最长长度
        if(s.length()-start>3*(4-count)){
            return;
        }
        //刚好到达了末尾
        if(start==s.length()){
            //当前刚好是4的部分 将结果加入
            if(count==4){
                ans.add(new Sring(temp.substring(0,temp.length()-1)));
            }
            return;
        }

        //当前超过末尾，或者已经到达了4部分结束
        if(start>s.length()||count==4){
            return;
        }

        //保存当前解
        StringBuilder before = new StringBuilder(temp);

        //加入1位数
        temp.append(s.charAt(start)+""+'.');
        getAns(s,start+1,temp,ans,count+1);

        //如果开头是0
        if(s.charAt(start)=='0'){
            return;
        }

        //加入2位数
        if(start+1<s.length()){
            temp = new StringBuilder(before);//恢复为之前的解
            temp.append(s.substring(start,start+2)+""+'.');
            getAns(s,start+2,temp,ans,count+1);
        }

        //加入3位数
        if(start+2<s.length()){
            temp = new  StringBuilder(before);
            int num = Integer.parseInt(s.substring(start,start+3));
            if(num>=0&&num<=255){
                temp.append(s.substring(start,start+3)+""+'.');
                getAns(s,start+3,temp,ans,count+1);
            }
        }
    }

```

### [79.单词搜索](https://leetcode-cn.com/problems/word-search/)

给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

示例:

```bash
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true.
给定 word = "SEE", 返回 true.
给定 word = "ABCB", 返回 false.
```

[DFS](https://leetcode.wang/leetCode-79-Word-Search.html)
我们需要做的就是，在深度优先遍历过程中，判断当前遍历元素是否对应 word 元素，如果不匹配就结束当前的遍历，返回上一次的元素，尝试其他路径。当然，和普通的 dfs 一样，我们需要一个 visited 数组标记元素是否访问过。

```java
public boolean exist(char[][] board,String word){
    int rows = board.length;
    if(rows == 0){
        return false;
    }
    int cols = board[0].length;
    boolean[][] vivisted = new boolean[rows][cols];
    //从不同位置开始
    for(int i=0;i<rows;i++){
        for(int j=0;j<cols;j++){
            //从当前位置 开始 符合就返回true
            if(existRecursive(board,i,j,word,0,visited)){
                return true;
            }
        }
    }
    return false;
}

private boolean existRecursive(char[][] board,int row,int col,String word,int index,boolean[][] visited){
    //判断是否越界
    if(row<0||row>=board.length||col<0||col>=board[0].length){
        return false;
    }

    //当前元素访问过或者当前word不匹配返回false
    if(visited[row][col]||board[row][col]!=word.charAt(index)){
        return false;
    }
    //匹配到了最后一个字母 反击true
    if(index==word.length()-1){
        return true;
    }

    //将当前位置标记为已访问
    visited[row][col] = true;
    //对四个位置分别尝试
    boolean up = existRecursive(board,row-1,col,word,index+1,visited);
    if(up){
        return true;
    }
    boolean down = existRecursive(board,row+1,col,word,index+1,visited);
    if(down){
        return true;
    }
    boolean left = existRecursive(board,row,col-1,word,index+1,visited);
    if(left){
        return true;
    }
    boolean right = existRecursive(board,row,col+1,word,index+1,visited);
    if(right){
        return true;
    }
    //当前位置未被访问
    visited[row][col] = false;
    return false;
}
```

### [257.二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

给定一个二叉树，返回所有从根节点到叶子节点的路径。
说明:  叶子节点是指没有子节点的节点。
示例:

```bash
输入:

   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]
解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```

- [递归](https://leetcode-cn.com/problems/binary-tree-paths/solution/er-cha-shu-de-suo-you-lu-jing-by-leetcode/)

```java
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        LinkedList<String> paths = new LinkedList();
        constructor_paths(root,"",paths);
        return paths;
    }

    private void construct_paths(TreeNode root,String path,LinkedList<String> paths){
        //递归的结束条件
        if(root!=null){
            path+=Integer.toString(root.val);
            if((root.left==null)&&(root.right==null)){
                //当前节点是叶子结点
                //将当前节点加入路径
                paths.add(path);
            }else{
                //当前节点不是叶子节点
                path+="->";
                //从左右节点开始递归
                //递归的返回值是 path 和 paths
                construct_paths(root.left,path,paths);
                construct_paths(root.right,path,paths);
            }
        }
    }
}
```

- 迭代实现
  迭代（宽度优先搜索）的方法实现。我们维护一个队列，存储节点以及根到该节点的路径。一开始这个队列里只有根节点。在每一步迭代中，我们取出队列中的首节点，如果它是一个叶子节点，则将它对应的路径加入到答案中。如果它不是一个叶子节点，则将它的所有孩子节点加入到队列的末尾。当队列为空时，迭代结束。

```java
class solution{
    public List<String> binarTreePaths(TreeNode root){
        LinkedList<String> paths = new LinkedList();
        if(root==null)
        {
            return paths;
        }

        LinkedList<TreeNode> node_stack = new LinkedList();
        LinkedList<String> path_stack = new LinkedList();
        node_stack.add(root);
        path_stack.add(Integer.toString(root.val));
        TreeNode node;
        String path;
        while(!node_stack.isEmpty()){
            node = node_stack.pollLast();
            path = path_stack.pollLast();
            if((node.left==null)&&(node.right==null)){
                paths.add(path);
            }
            if(node.left!=null){
                node_stack.add(node.left);
                path_stack.add(path+"->"+Integer.toString(node.left.val));
            }
            if(node.right!=null){
                node_stack.add(node.right);
                path_stack.add(path+"->"+Integer.toString(node.right.val));
            }
        }
        return path;
    }
}
```

### [113.路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)

给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

说明:  叶子节点是指没有子节点的节点。

示例:
给定如下二叉树，以及目标和  sum = 22，

```bash
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1
```

返回:

```bash
[
   [5,4,11,2],
   [5,8,4,5]
]
```

解题思路改造一下上面的算法，将 sum 在每次遍历中减去，实现如下：

```java
class Solution{
    private List<List<Integer>> resultList = new ArrayList<>();
    private List<Integer> tempList = new ArrayList<>();

    public List<List<Integer>> pathSum(TreeNode root,int sum){
        dfs(root,sum);
        return resultList;
    }

    private void dfs(TreeNode node,int sum){
        if(node==null){
            return ;
        }
        tempList.add(node.val);
        sum-=node.val;
        if(node.left==null&&node.right==null&&sum==0){
             resultList.add(new ArrayList<>(tempList));
        }

        if(node.left!=null){
            dfs(node.left,sum);
        }
        if(node.right!=null){
            dfs(node.right,sum);
        }
        tempList.remove(tempList.size()-1);
    }

}
```

### [437.路径总和 III](https://leetcode-cn.com/problems/path-sum-iii/)

给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过 1000 个节点，且节点数值范围是 [-1000000,1000000] 的整数。

示例：

```
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

返回 3。和等于 8 的路径有:

1.  5 -> 3
2.  5 -> 2 -> 1
3.  -3 -> 11
```

```java
public int pathSum(TreeNode root, int sum) {
 return pathSum(root, sum, new int[1000], 0);
 }

 public int pathSum(TreeNode root, int sum, int[] array/*保存路径*/, int p/*指向路径终点*/) {
  if (root == null) {
   return 0;
  }
    int tmp = root.val;
    int n = root.val == sum ? 1 : 0;
    for (int i = p - 1; i >= 0; i--) {//从后往前，后面的才是新增的，前面的已经算过了。
        tmp += array[i];
        if (tmp == sum) {
            n++;
        }
    }
    array[p] = root.val;
    int n1 = pathSum(root.left, sum, array, p + 1);//往左走，往右走
    int n2 = pathSum(root.right, sum, array, p + 1);
    return n + n1 + n2;//当前子树、左子树、右子树存在的满足路径的数量
}
```

- [递归](https://leetcode-cn.com/problems/path-sum-iii/solution/leetcode-437-path-sum-iii-by-li-xin-lei/)

```java
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) { val = x; }
    }
    public  int pathSum(TreeNode root,int sum) {
        if(root==null) {
            return 0;
        }
        return PathS(root,sum)+PathS(root.left,sum)+PathS(root.right,sum);
    }

    private  int PathS(TreeNode root,int sum) {
        if(root==null) {
            return 0;
        }
        int res = 0;
        if(root.val==sum) {
            res +=1;
        }
        res += PathS(root.left,sum-root.val);
        res += PathS(root.right,sum-root.val);
        return res;
    }
```

### [46.全排列](https://leetcode-cn.com/problems/permutations/)

给定一个没有重复数字的序列，返回其所有可能的全排列。

示例:

```bash
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

- [回溯法](https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode/)

```java
public List<List<Integer>> permute(int[] nums){
    //初始化
    List<List<Integer>> output = new LinkedList();
    //将数组转化为list
    ArrayList<Integer> nums_list = new ArrayList<Integer>();
    for(int num:nums){
        nums_list.add(num);
    }
    int n = nums.length;
    backtrace(n,nums_list,output,0);
    return output;
}

private void backtrace(int n,ArrayList<Integer> nums,List<List<Integer>> output,int first){
    //所有的数字已使用
    if(first==n){
        output.add(new ArrayList<Integer>(nums));
    }
            for(int i=first;i<n;i++){
            //将第i个整数到当前排列
            Collections.swap(nums,first,i);
            //添加下一个数字到排列中
            backtrace(n,nums,output,first+1);
            //回溯
            Collections.swap(nums,first,i);
        }
}
```

- [回溯 2](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-by-powcai-2/)

### [47.含有相同元素求排列](https://leetcode-cn.com/problems/permutations-ii/)

给定一个可包含重复数字的序列，返回所有不重复的全排列。

示例:

```bash
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

- [回溯+剪枝算法](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/)
  - 对数组排序后，发现有重复元素则跳过当前分支，达到剪枝效果。
  - 在进入一个新的分支之前，看一看这个数是不是和之前的数一样，如果这个数和之前的数一样，并且之前的数还未使用过，那接下来如果走这个分支，就会使用到之前那个和当前一样的数，就会发生重复，此时分支和之前的分支一模一样

```java
class Solution{
    private List<List<Integer>> res = new ArrayList<>();
    private boolean[] used;

    private void findPermuteUnique(int[] nums,int depth,Stack<Integer> stack){
        if(depth == nums.length){
            res.add(new ArrayList<>(stack));
            return ;
        }
        for(int i=0;i<nums.length;i++){
            if(!used[i]){
                //修改2：因为排序后重复的数一定不会出现在开始，故i>0
                //和之前的数相等，并且之前的数还未使用过，只有出现这种情况，
                //才会出现相同分支，跳过这种情况
                if(i>0&&nums[i]==nums[i-1]&&!used[i-1]){
                    continue;
                }
                used[i] = true;
                stack.add(nums[i]);
                findPermuteUnique(nums,depth+1,stack);
                stack.pop();
                used[i] = false;
            }
        }
    }

    public List<List<Integer>> permuteUnique(int[] nums){
        int len = nums.length;
        if(len==0){
            return res;
        }
        //修改1，首先排序，之后才可能发现重复分支
        Arrays.sort(nums);

        used = new boolean[len];
        findPermuteUnique(nums,0,new Stack<>());
        return res;
    }
}
```

### [77.组合](https://leetcode-cn.com/problems/combinations/)

给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

示例:

```
输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

- [回溯法](https://leetcode-cn.com/problems/combinations/solution/zu-he-by-leetcode/)
  是一种通过遍历所有可能成员来寻找全部可行解的算法。若候选 不是 可行解 (或者至少不是 最后一个 解)，回溯法会在前一步进行一些修改以舍弃该候选，换而言之， 回溯 并再次尝试。

这是一个回溯法函数，它将第一个添加到组合中的数和现有的组合作为参数。 backtrack(first, curr)

若组合完成- 添加到输出中。

遍历从 first t 到 n 的所有整数。

将整数 i 添加到现有组合 curr 中。

继续向组合中添加更多整数 :
backtrack(i + 1, curr).

将 i 从 curr 中移除，实现回溯

链接：https://leetcode-cn.com/problems/combinations/solution/zu-he-by-leetcode/

```java
class Solution{
    List<List<Integer>> output = new LinkedList();
    int n;
    int k;

    public void backtrace(int first,LinkedList<Integer> curr){
        //如果组合被使用了
        if(curr.size()==k){
            output.add(new LinkedList(curr));
        }

        for(int i=first;i<n+1;++i){
            //将i添加到当前组合中
            curr.add(i);
            //将下一个整数加入
            backtrace(i+1,curr);
            //回溯
            curr.removeLast();
        }
    }

    public List<List<Integer>> combine(int n,int k){
        this.n = n;
        this.k = k;
        backtrace(1,new LinkedList<Integer>());
        return output;
    }
}
```

### [39.组合求和](https://leetcode-cn.com/problems/combination-sum/)

给定一个无重复元素的数组  candidates  和一个目标数  target ，找出  candidates  中所有可以使数字和为  target  的组合。

candidates  中的数字可以无限制重复被选取。

说明：

所有数字（包括  target）都是正整数。
解集不能包含重复的组合。 
示例  1:

```bash
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```

[回溯算法](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class Solution {

    private List<List<Integer>> res = new ArrayList<>();
    private int[] candidates;
    private int len;

    private void findCombinationSum(int residue, int start, Stack<Integer> pre) {
        if (residue == 0) {
            // Java 中可变对象是引用传递，因此需要将当前 path 里的值拷贝出来
            res.add(new ArrayList<>(pre));
            return;
        }
        // 优化添加的代码2：在循环的时候做判断，尽量避免系统栈的深度
        // residue - candidates[i] 表示下一轮的剩余，如果下一轮的剩余都小于 0 ，就没有必要进行后面的循环了
        // 这一点基于原始数组是排序数组的前提，因为如果计算后面的剩余，只会越来越小
        for (int i = start; i < len && residue - candidates[i] >= 0; i++) {
            pre.add(candidates[i]);
            // 【关键】因为元素可以重复使用，这里递归传递下去的是 i 而不是 i + 1
            findCombinationSum(residue - candidates[i], i, pre);
            pre.pop();
        }
    }

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        if (len == 0) {
            return res;
        }
        // 优化添加的代码1：先对数组排序，可以提前终止判断
        Arrays.sort(candidates);
        this.len = len;
        this.candidates = candidates;
        findCombinationSum(target, 0, new Stack<>());
        return res;
    }

    public static void main(String[] args) {
        int[] candidates = {2, 3, 6, 7};
        int target = 7;
        Solution solution = new Solution();
        List<List<Integer>> combinationSum = solution.combinationSum(candidates, target);
        System.out.println(combinationSum);
    }
}
```

```java
public List<List<Integer>> combinationSum(int[] candidates,int target){
    List<List<Integer>> combinations = new ArrayList<>();
    backtracking(new ArrayList<>(),combinations,0,target,candidates);
    return combinations;
}
private void backtracking(List<Integer> tempCombination,List<List<Integer>> combinations,int start,int target,final int[] candidates){
    if(target==0){
        combinations.add(new ArrayList<>(tempCombination));
        return;
    }

    for(int i=start;i<candidates.length;i++){
        if(candidates[i]<=target){
            tempConbination.add(candidates[i]);
            backtracking(tempCombination,combinations,i,target-candidates[i]);
            tempCombination.remove(tempCombination.size()-1);
        }
    }
}
```

### [40.含有相同元素的组合求和](https://leetcode-cn.com/problems/combination-sum-ii/)

给定一个数组  candidates  和一个目标数  target ，找出  candidates  中所有可以使数字和为  target  的组合。

candidates  中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 
示例  1:

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

```java
class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if(len == 0){
            return  res;
        }

        //先将数组排序，这一步很关键
        Arrays.sort(candidates);
        Deque<Integer> path = new ArrayDeque<>(len);
        dfs(candidates,len,0,target,path,res);
        return res;
    }
    /**
     * @param candidates 候选数组
     * @param len
     * @param begin      从候选数组的 begin 位置开始搜索
     * @param residue    表示剩余，这个值一开始等于 target，基于题目中说明的"所有数字（包括目标数）都是正整数"这个条件
     * @param path       从根结点到叶子结点的路径
     * @param res
     */
    private void dfs(int[] candidates,int len,int begin,int residue,Deque<Integer> path,List<List<Integer>> res){
        if(residue==0){
            res.add(new ArrayList<>(path));
            return;
        }
        for(int i=begin;i<len;i++){
            //大剪枝
            if(residue-candidates[i]<0){
                break;
            }
            //小剪枝
            if(i>begin&&candidates[i]==candidates[i-1]){
                continue;
            }
            path.addLast(candidates[i]);

            //因为元素不可重复使用，这传递下去的是i+1而不是i
            dfs(candidates,len,i+1,residue-candidates[i],path,res);
            path.removeLast();
        }
    }
}
```

### [10.1-9 数字组合](https://leetcode-cn.com/problems/combination-sum-iii/)

找出所有相加之和为  n 的  k  个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：

所有数字都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: k = 3, n = 7
输出: [[1,2,4]]
示例 2:

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]

[回溯+剪枝](https://leetcode-cn.com/problems/combination-sum-iii/solution/hui-su-jian-zhi-by-liweiwei1419/)

```java
public List<List<Integer>> combinationSum3(int k,int n){
    List<List<Integer>> res = new ArrayList<>();
    //开始做一些特殊判断
    if(k<=0||n<=0||k>=n){
        return res;
    }
    //寻找n的上限：[9,8,7,...(9k+1)]，他们的和为(19-k)*k/2
    //大于上限，结束搜索
    if(n>(19-k)*k/2){
        return res;
    }

    // 用deque代替stack
    Deque<Integer> path = new ArrayDeque<>();
    dfs(k,n,1,path,res);
    return res;
}

private void dfs(int k,int residue,int start,Deque<Integer> path,List<List<Integer>> res){
    //剪枝：[start,9] 区间里面的数不够k个，不用继续向下搜索
    if(10-start<k){
        return;
    }
    if(k==0){
        if(residue==0){
            res.add(new ArrayList<>(path));
            return;
        }
    }

    //枚举起点值[...,7,8,9]
    //找3个数，起点最多到7
    //找2个数，起点最多到8
    //规律是，起点上界+k=10,故起点上界=10-k

    for(int i=start;i<=10-k;i++){
        if(residue-i<0){
            break;
        }
        path.addLast(i);
        dfs(k-1,residue-i,i+1,path,res);
        path.removeLast();
    }
}
```

### [78. 子集](https://leetcode-cn.com/problems/subsets/)

给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
[1](https://leetcode-cn.com/problems/subsets/solution/hui-su-suan-fa-by-powcai-5/)
[2](https://leetcode-cn.com/problems/subsets/solution/er-jin-zhi-wei-zhu-ge-mei-ju-dfssan-chong-si-lu-9c/)

```js
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrace(0,nums,res,new ArrayList<Integer>());
        return res;
    }

    private void backtrace(int i,int[] nums,List<List<Integer>> res,ArrayList<Integer> tmp){
        res.add(new ArrayList<>(tmp));
        for(int j=i;j<nums.length;j++){
            tmp.add(nums[j]);
            backtrace(j+1,nums,res,tmp);
            tmp.remove(tmp.size()-1);
        }
    }
}
```

- 二进制和位运算

```java
public static List<List<Integer>> binaryBit(int[] nums){
    List<List<Integer>> res = newArrayList<List<Integer>>();
    for(int i=0;i<(1<<nums.length);i++){
        List<Integer> sub = new ArrayList<Integer>();
        for(int j=0;j<nums.length;i++){
            if(((i>>j)&1)==1)sub.add(nums[j]);
        }
        res.add(sub);
    }
    return res;
}
```

## [1.两数之和](https://leetcode-cn.com/problems/two-sum/)

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那   两个   整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

```bash
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 1.利用hash 保存数组下标和数字
var twoSum = function(nums, target) {
  if (nums.length < 2) {
    return null;
  }
  var map = new Map();
  var res = [];
  map.set(nums[0], 0);
  for (let i = 1; i < nums.length; i++) {
    var temp = nums[i];
    if (map.has(target - temp)) {
      res.push(i);
      res.push(map.get(target - temp));
      return res;
    }
    map.set(nums[i], i);
  }
  return [];
};
```

## 【1046.最后一块石头的重量](<https://leetcode-cn.com/problems/last-stone-weight/>)

有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为  x 和  y，且  x <= y。那么粉碎的可能结果如下：

如果  x == y，那么两块石头都会被完全粉碎；
如果  x != y，那么重量为  x  的石头将会完全粉碎，而重量为  y  的石头新重量为  y-x。
最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

```bash
示例：

输入：[2,7,4,1,8,1]
输出：1
解释：
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。

```

```js
/**
 * @param {number[]} stones
 * @return {number}
 */

// 大顶堆
var lastStoneWeight = function(stones) {
  const pq = new MaxPriorityQueue();
  for (const stone of stones) {
    pq.enqueue("x", stone);
  }

  while (pq.size() > 1) {
    const a = pq.dequeue()["priority"];
    const b = pq.dequeue()["priority"];
    if (a > b) {
      pq.enqueue("x", a - b);
    }
  }
  return pq.isEmpty() ? 0 : pq.dequeue()["priority"];
};

// 暴力算法
var lastStoneWeight = function(stones) {
  var len = stones.length;
  if (len < 2) {
    return stones[0];
  }
  stones = stones.sort((a, b) => (a - b > 0 ? -1 : 1));
  while (stones.length > 1) {
    var first = stones.shift();
    var second = stones.shift();
    if (first == second) {
    } else {
      stones.push(first - second);
    }
    stones = stones.sort((a, b) => (a - b > 0 ? -1 : 1));
  }
  return stones.length < 1 ? 0 : stones[0];
};

// [大神解法](https://leetcode-cn.com/problems/last-stone-weight/solution/di-gui-die-dai-dui-lie-cha-pai-1xing-dai-70hv/)

var lastStoneWeight = function(stones) {
  stones = stones.sort((a, b) => a - b);
  if (stones.length > 1) {
    const temp = stones.shift() - stones.shift();
    if (temp) stones.push(temp);
    return lastStoneWight(stones);
  }
  return stones.length ? stones[0] : 0;
};
```

### [435.无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

注意:
可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
示例 1:

```bash
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。

输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。

输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。

```

[解答](https://leetcode-cn.com/problems/non-overlapping-intervals/solution/wu-zhong-die-qu-jian-by-leetcode-solutio-cpsb/)

```js
// 1.动态规划
var eraseOverlapIntervals = function(intervals) {
  if (!intervals.length) {
    return 0;
  }

  intervals.sort((a, b) => a[0] - b[0]);
  const n = intervals.length;
  const f = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[j][1] <= intervals[i][0]) {
        f[i] = Math.max(f[i], f[j] + 1);
      }
    }
  }
  return n - Math.max(...f);
};

var eraseOverlapIntervals = function(intervals) {
  if (!intervals.length) {
    return 0;
  }

  intervals.sort((a, b) => a[0] - b[0]);
  const n = intervals.length;
  const f = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (intervals[j][1] <= intervals[i][0]) {
        f[i] = Math.max(f[i], f[j] + 1);
      }
    }
  }
  return n - Math.max(...f);
};
```

### [547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)

有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

```bash
输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2

提示：

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] 为 1 或 0
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]
```

[官方题解](https://leetcode-cn.com/problems/number-of-provinces/solution/sheng-fen-shu-liang-by-leetcode-solution-eyk0/)

```js
// 1.深度优先搜索 DFS

var findCircleNum = function(isConnected) {
  var provinces = isConnected.length;
  var visited = new Set();
  let circles = 0;
  for (let i = 0; i < provinces; i++) {
    if (!visited.has(i)) {
      dfs(isConnected, visited, provinces, i);
      circles++;
    }
  }
  return circles;
};

var dfs = (isConnected, visited, provinces, i) => {
  for (let j = 0; j < provinces; j++) {
    if (isConnected[i][j] == 1 && !visited.has(j)) {
      visited.add(j);
      dfs(isConnected, visited, provinces, j);
    }
  }
};
```

## 并查集

[算法学习笔记：并查集](https://zhuanlan.zhihu.com/p/93647900/)

****
