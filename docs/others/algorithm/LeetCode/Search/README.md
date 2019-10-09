# 搜索算法

## BFS 
广度优先搜索一层一层地进行遍历，每层遍历都以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。

![](/images/algorithm-LeetCode-search-bfs.jpg)

第一层：

- 0 -> {6,2,1,5}

第二层：

- 6 -> {4}
- 2 -> {}
- 1 -> {}
- 5 -> {3}

第三层：

- 4 -> {}
- 3 -> {}

每一层遍历的节点都与根节点距离相同。设 d~i~ 表示第 i 个节点与根节点的距离，推导出一个结论：对于先遍历的节点 i 与后遍历的节点 j，有 d~i~ <= d~j~。利用这个结论，可以求解最短路径等 最优解 问题：第一次遍历到目的节点，其所经过的路径为最短路径。应该注意的是，使用 BFS 只能求解无权图的最短路径，无权图是指从一个节点到另一个节点的代价都记为 1。

在程序实现 BFS 时需要考虑以下问题：

- 队列：用来存储每一轮遍历得到的节点；
- 标记：对于遍历过的节点，应该将它标记，防止重复遍历。


### 计算在网格中从原点到特定点的最短路径

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

