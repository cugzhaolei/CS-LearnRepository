# 搜索算法

## BFS 
广度优先搜索一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。

![](/images/algorithm-LeetCode-search-bfs.jpg)

第一层：
```
- 0 -> {6,2,1,5}
```
第二层：
```
- 6 -> {4}
- 2 -> {}
- 1 -> {}
- 5 -> {3}
```
第三层：
```
- 4 -> {}
- 3 -> {}
```
每一层遍历的节点都与根节点距离相同。设 d~i~ 表示第 i 个节点与根节点的距离，推导出一个结论：对于先遍历的节点 i 与后遍历的节点 j，有 d~i~ <= d~j~。利用这个结论，可以求解最短路径等 最优解 问题：第一次遍历到目的节点，其所经过的路径为最短路径。应该注意的是，使用 BFS 只能求解无权图的最短路径，无权图是指从一个节点到另一个节点的代价都记为 1。

在程序实现 BFS 时需要考虑以下问题：

- 队列：用来存储每一轮遍历得到的节点；
- 标记：对于遍历过的节点，应该将它标记，防止重复遍历。


### [1091.二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)

```
[[1,1,0,1],
 [1,0,1,0],
 [1,1,1,1],
 [1,0,1,1]]
```

题目描述：1 表示可以经过某个位置，求解从 (0, 0) 位置到 (tr, tc) 位置的最短路径长度。

``` java
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
``` 
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```
[动态规划：](https://leetcode-cn.com/problems/perfect-squares/solution/hua-jie-suan-fa-279-wan-quan-ping-fang-shu-by-guan/)

动态转移方程为：dp[i] = MIN(dp[i], dp[i - j * j] + 1)，i表示当前数字，j*j表示平方数
``` js
var numSquares = function(n){
    const dp = [...Array(n+1)].map(_=>0);//数组长度n+1 值均为0
    for(let i=1;i<=n;i++){
        dp[i] = i;
        for(let j=0;i-j*j>=0;j++){
            dp[i] = Math.min(dp[i],dp[i-j*j]+1);//动态转移方程
        }
    }
    return dp[n];
}
```

``` java
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

``` java
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

给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：

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

``` java
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
深度优先搜索算法将会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点.

![DFS](/images/algorithm-LeetCode-search-dfs.jpg)

### [695.岛屿的最大面积](https://leetcode-cn.com/problems/max-area-of-island/)
``` java
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

给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

``` java
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
班上有 N 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。

给定一个 N * N 的矩阵 M，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生互为朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。

``` java
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

给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。

找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。

示例:
```
X X X X
X O O X
X X O X
X O X X
```
运行你的函数后，矩阵变为：
``` 
X X X X
X X X X
X X X X
X O X X
```
[解答](https://leetcode-cn.com/problems/surrounded-regions/solution/bfsdi-gui-dfsfei-di-gui-dfsbing-cha-ji-by-ac_pipe/)


1. bfs+递归
``` java
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

``` js
var solve = function(board){
    let m = board.length;
    if(m==0){return};
    let n = board[0].length;
    let cannot = {};
    let dfs = (i,j)=>{
        //越界 标志过或者非相连O下return
        if(i<0||j<0||i==m||j==n||board[i][j]!='O'||cannot[i+'-'+j]){
            return;
        }
        cannot[i+'-'+j]=true;
        dfs(i-1,j);
        dfs(i+1,j);
        dfs(i,j-1);
        dfs(i,j+1);
    }
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            //从边缘O出发寻找其相连接点都标示为不可替换
            if(i==0||j==0||i==m-1||j==n-1&&board[i][j]=='O'){
                dfs(i,j);
            }
        }
    }
    //规避边界条件去循环 将边界不相互连接的联通到一起
    for(let i=1;i<m-1;i++){
        for(let j=1;j<n-1;j++){
            if(!cannot[i+'-'+j]&&board[i][j]=='O'){
                board[i][j]='X';
            }
        }
    }
}
```

### [417.太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)

给定一个 m x n 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，而“大西洋”处于大陆的右边界和下边界。
规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。
请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。

[DFS+递归](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/solution/ni-liu-dfs-yu-bfs-by-fibonacciwh/)
``` java
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
``` java
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
``` java
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

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```
    1
   / \
  2   2
   \   \
   3    3
```
``` java
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
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其层次遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```
bfs+递归实现
``` java
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
``` java
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
```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

``` java
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

### 