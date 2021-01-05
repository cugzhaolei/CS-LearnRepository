# 动态规划

## 爬楼梯

```js
let f1 = 1,
  f2 = 2,
  f3 = 4,
  result = 0;
for (let i = 4; i <= 11; i++) {
  result = f1 + f2 + f3;
  f1 = f2;
  f2 = f3;
  f3 = result;
}
console.log(result);
```

```java
public int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }
    int pre2 = 1, pre1 = 2;
    for (int i = 2; i < n; i++) {
        int cur = pre1 + pre2;
        pre2 = pre1;
        pre1 = cur;
    }
    return pre1;
}

```

## [0-1 背包](https://blog.csdn.net/reed1991/article/details/53352426)

有一个容量为 N 的背包，要用这个背包装下物品的价值最大，这些物品有两个属性：体积 w 和价值 v。

定义一个二维数组 dp 存储最大价值，其中 dp[i][j] 表示前 i 件物品体积不超过 j 的情况下能达到的最大价值。设第 i 件物品体积为 w，价值为 v，根据第 i 件物品是否添加到背包中，可以分两种情况讨论：

第 i 件物品没添加到背包，总体积不超过 j 的前 i 件物品的最大价值就是总体积不超过 j 的前 i-1 件物品的最大价值，dp[i][j] = dp[i-1][j]。
第 i 件物品添加到背包中，dp[i][j] = dp[i-1][j-w] + v。
第 i 件物品可添加也可以不添加，取决于哪种情况下最大价值更大。因此，0-1 背包的状态转移方程为：

![0-1](/images/algorithm-data-01-formulation.png)

```java
// W 为背包总体积
// N 为物品数量
// weights 数组存储 N 个物品的重量
// values 数组存储 N 个物品的价值
public int knapsack(int W, int N, int[] weights, int[] values) {
    int[][] dp = new int[N + 1][W + 1];
    for (int i = 1; i <= N; i++) {
        int w = weights[i - 1], v = values[i - 1];
        for (int j = 1; j <= W; j++) {
            if (j >= w) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w] + v);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[N][W];
}
```

空间优化

在程序实现时可以对 0-1 背包做优化。观察状态转移方程可以知道，前 i 件物品的状态仅与前 i-1 件物品的状态有关，因此可以将 dp 定义为一维数组，其中 dp[j] 既可以表示 dp[i-1][j] 也可以表示 dp[i][j]。此时，

![01back](/images/algorithm-data-01-for-opt.jpg)
因为 dp[j-w] 表示 dp[i-1][j-w]，因此不能先求 dp[i][j-w]，防止将 dp[i-1][j-w] 覆盖。也就是说要先计算 dp[i][j] 再计算 dp[i][j-w]，在程序实现时需要按倒序来循环求解。

```java
public int knapsack(int W, int N, int[] weights, int[] values) {
    int[] dp = new int[W + 1];
    for (int i = 1; i <= N; i++) {
        int w = weights[i - 1], v = values[i - 1];
        for (int j = W; j >= 1; j--) {
            if (j >= w) {
                dp[j] = Math.max(dp[j], dp[j - w] + v);
            }
        }
    }
    return dp[W];
}
```

`无法使用贪心算法的解释`

0-1 背包问题无法使用贪心算法来求解，也就是说不能按照先添加性价比最高的物品来达到最优，这是因为这种方式可能造成背包空间的浪费，从而无法达到最优。考虑下面的物品和一个容量为 5 的背包，如果先添加物品 0 再添加物品 1，那么只能存放的价值为 16，浪费了大小为 2 的空间。最优的方式是存放物品 1 和物品 2，价值为 22.

|  id |  w  |  v  | v/w |
| --: | :-: | :-: | :-- |
|   0 |  1  |  6  | 6   |
|   1 |  2  | 10  | 5   |
|   2 |  3  | 12  | 4   |

`变种`

- 完全背包：物品数量为无限个

- 多重背包：物品数量有限制

- 多维费用背包：物品不仅有重量，还有体积，同时考虑这两种限制

- 其它：物品之间相互约束或者依赖

### [494.目标和](https://leetcode-cn.com/problems/target-sum/)

给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号  +  和  -。对于数组中的任意一个整数，你都可以从  +  或  -中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

```md
示例 1:

输入: nums: [1, 1, 1, 1, 1], S: 3
输出: 5
解释:

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有 5 种方法让最终目标和为 3。
```

该问题可以转换为 Subset Sum 问题，从而使用 0-1 背包的方法来求解。

可以将这组数看成两部分，P 和 N，其中 P 使用正号，N 使用负号，有以下推导：

```md
                  sum(P) - sum(N) = target

sum(P) + sum(N) + sum(P) - sum(N) = target + sum(P) + sum(N)
2 \* sum(P) = target + sum(nums)
```

因此只要找到一个子集，令它们都取正号，并且和等于 (target + sum(nums))/2，就证明存在解。

```js
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
  return findTarget(nums, 0, S);
};
function findTarget(nums, start, S) {
  if (start == nums.length) {
    return S == 0 ? 1 : 0;
  }
  return (
    findTarget(nums, start + 1, S + nums[start]) +
    findTarget(nums, start + 1, S - nums[start])
  );
}
```

```java
public int findTargetSumWays(int[] nums, int S) {
    int sum = computeArraySum(nums);
    if (sum < S || (sum + S) % 2 == 1) {
        return 0;
    }
    int W = (sum + S) / 2;
    int[] dp = new int[W + 1];
    dp[0] = 1;
    for (int num : nums) {
        for (int i = W; i >= num; i--) {
            dp[i] = dp[i] + dp[i - num];
        }
    }
    return dp[W];
}

private int computeArraySum(int[] nums) {
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    return sum;
}
```

### [474.一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

在计算机界中，我们总是追求用有限的资源获取最大的收益。

现在，假设你分别支配着 m 个  0  和 n 个  1。另外，还有一个仅包含  0  和  1  字符串的数组。

你的任务是使用给定的  m 个  0  和 n 个  1 ，找到能拼出存在于数组中的字符串的最大数量。每个  0  和  1  至多被使用一次。

注意:

给定  0  和  1  的数量都不会超过  100。
给定字符串数组的长度不会超过  600。
示例 1:

```md
输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
输出: 4
```

解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。
示例 2:

```md
输入: Array = {"10", "0", "1"}, m = 1, n = 1
输出: 2
```

解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。

这是一个多维费用的 0-1 背包问题，有两个背包大小，0 的数量和 1 的数量。

```js
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
  if (strs == null || strs.length == 0) {
    return 0;
  }
  var dp = [];
  for (var i = 0; i <= amount; i++) {
    dp[i] = [];
  }
  for (let j = 0; j < strs.length; j++) {
    let ones = 0,
      zeros = 0;
    for (let k = 0; k < strs[j].length; k++) {
      let ch = strs[j].charAt(k);
      if (ch == "0") {
        zeros++;
      } else {
        ones++;
      }
    }
    for (let i = m; i >= zeros; i--) {
      for (let o = n; o >= ones; o--) {
        dp[i][o] = Math.max(dp[i][o], dp[i - zeros][o - ones] + 1);
      }
    }
  }
  return dp[m][n];
};
```

```java
class Solution {
    public int findMaxForm(String[] strs, int m, int n) {
        if(strs==null||strs.length==0){
            return 0;
        }
        int dp[][] = new int[m+1][n+1];
        for(String str:strs){
            int zeros=0,ones=0;
            for(char ch:str.toCharArray()){
                if(ch=='0'){
                    zeros++;
                }else{
                    ones++;
                }
            }
            for(int i=m;i>=zeros;i--){
                for(int j=n;j>=ones;j--){
                    dp[i][j] = Math.max(dp[i][j],dp[i-zeros][j-ones]+1);
                }
            }
        }
        return dp[m][n];
    }
}
```

### [322.零钱兑换](https://leetcode-cn.com/problems/coin-change/)

给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回  -1。

示例  1:

```md
输入: coins = [1, 2, 5], amount = 11
输出: 3
解释: 11 = 5 + 5 + 1
```

- 物品：硬币
- 物品大小：面额
- 物品价值：数量
  因为硬币可以重复使用，因此这是一个完全背包问题。完全背包只需要将 0-1 背包的逆序遍历 dp 数组改为正序遍历即可。

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  if (amount == 0 || coins == null || coins.length == 0) {
    return 0;
  }
  var dp = new Array(amount + 1);
  for (var i = 0; i <= amount; i++) {
    dp[i] = 0;
  }
  for (var j = 0; j < coins.length; j++) {
    var coin = coins[i];
    for (var i = coin; i <= amount; i++) {
      //将逆序遍历改为正序遍历
      if (i == coin) {
        dp[i] = 1; //如果需要组成的金额正好和某个硬币的面额相等
      } else if (dp[i] == 0 && dp[i - coin] != 0) {
        //只有能凑成dp[i - coin]才能凑成dp[i]
        dp[i] = dp[i - coin] + 1;
      } else if (dp[i - coin] != 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] == 0 ? -1 : dp[amount];
};
```

```java
public int coinChange(int[] coins, int amount) {
    if (amount == 0 || coins == null || coins.length == 0) {
        return 0;
    }
    int[] dp = new int[amount + 1];
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) { //将逆序遍历改为正序遍历
            //如果需要组成的金额正好和某个硬币的面额相等
            if (i == coin) {
                dp[i] = 1;
                //只有能凑成dp[i - coin]才能凑成dp[i]
            } else if (dp[i] == 0 && dp[i - coin] != 0) {
                 //暂时能凑成dp[i-coin]，但是凑不成dp[i]，那么直接将dp[i-coin]+1
                dp[i] = dp[i - coin] + 1;
            } else if (dp[i - coin] != 0) {
                //既能凑成dp[i-coin]，又能凑不成dp[i]，那么取dp[i-coin]+1和dp[i]的较小值
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] == 0 ? -1 : dp[amount];
}


```

### [518.兑换零钱](https://leetcode-cn.com/problems/coin-change-2/)

给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。

示例 1:

输入: amount = 5, coins = [1, 2, 5]
输出: 4
解释: 有四种方式可以凑成总金额:

```md
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

完全背包问题，使用 dp 记录可达成目标的组合数目。

```js
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  if (coins == null) {
    return 0;
  }
  var dp = [];
  //JavaScript要初始化数组
  for (var i = 0; i <= amount; i++) {
    dp[i] = 0;
  }
  dp[0] = 1;
  for (var coin of coins) {
    for (var i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  return dp[amount];
};
```

```java
public int change(int amount, int[] coins) {
    if (coins == null) {
        return 0;
    }
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}
```

### [139.单词拆分](https://leetcode-cn.com/problems/word-break/)

给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定  s 是否可以被空格拆分为一个或多个在字典中出现的单词。

说明：

- 拆分时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。
  示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

dict 中的单词没有使用次数的限制，因此这是一个完全背包问题。

该问题涉及到字典中单词的使用顺序，也就是说物品必须按一定顺序放入背包中，例如下面的 dict 就不够组成字符串 "leetcode"：

```md
["lee", "tc", "cod"]
```

求解顺序的完全背包问题时，对物品的迭代应该放在最里层，对背包的迭代放在外层，只有这样才能让物品按一定顺序放入背包中。

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  var n = s.length;
  var dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = false;
  }
  dp[0] = true;
  for (let i = 0; i <= n; i++) {
    //对物品的迭代放在最里层
    for (var word of wordDict) {
      var len = word.length;
      if (len <= i && word == s.substring(i - len, i)) {
        dp[i] = dp[i] || dp[i - len];
      }
    }
  }
  return dp[n];
};
```

```java
public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordDictSet=new HashSet(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordDictSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
```

### [377.组合综合 IV](https://leetcode-cn.com/problems/combination-sum-iv/)

给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

```md
示例:

nums = [1, 2, 3]
target = 4

所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)

请注意，顺序不同的序列被视作不同的组合。

因此输出为 7。
```

涉及顺序的完全背包。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
  if (nums == null || nums.length == 0) {
    return 0;
  }
  var dp = [];
  for (let i = 0; i <= target; i++) {
    dp[i] = 0; //初始化为0
  }
  //dp[0]表示组成0，一个数都不选就可以了，所以dp[0]=1
  dp[0] = 1;
  nums.sort(function(a, b) {
    return a - b;
  }); //不加判断会报错 因为js库函数还是较少
  for (let i = 1; i <= target; i++) {
    for (let j = 0; j <= nums.length && nums[j] <= i; j++) {
      dp[i] += dp[i - nums[j]];
    }
  }
  return dp[target];
};
```

```java
    public int combinationSum4(int[] nums, int target) {
        if (nums == null || nums.length == 0) {
            return 0;
        }
        int[] maximum = new int[target + 1];
        maximum[0] = 1;
        Arrays.sort(nums);  //直接由小到大排
        for (int i = 1; i <= target; i++) {
            for (int j = 0; j < nums.length && nums[j] <= i; j++) {
                maximum[i] += maximum[i - nums[j]];
            }
        }
        return maximum[target];
    }
```

## 股票交易

### [309.需要冷却期的股票](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

给定一个整数数组，其中第  i  个元素代表了第  i  天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

- 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
- 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
  示例:

输入: [1,2,3,0,2]
输出: 3
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

```js
function maxProfit(prices) {
  if (prices == null || prices.length == 0) {
    return 0;
  }
  let n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  let dp_pre_0 = 0; //代表dp[i-2][0]
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
    dp_pre_0 = temp;
  }
  return dp_i_0;
}
/**
 * @param {number[]} prices
 * @return {number}
 *
 * 每天有3种状态：
 * 1，持有股票
 * 2，不持有股票
 * 3，冷冻期
 *
 * 如果当天持有股票，那么昨天要么就是  手上捏着股票没卖  要么就是，今天刚买
 * 这里要买的话，必然昨天是冷冻状态，或者是冷冻状态的后N天，其实也就是不持有状态
 * 所以这里持有股票的利润=max(昨天持有的利润，昨天冷冻的利润+买入的花费，昨天不持有的利润+买入的花费)
 * 这里注意:冷冻期过后不持有的几天的利润和冷冻期的利润是相同的，所以
 * 持有股票的利润=max(昨天持有的利润，昨天冷冻的利润+买入的花费)
 *
 * 如果当天不持有股票，那么昨天要么就是  本来就没有，我一直观望   要么就是，今天刚卖
 * 所以它的利润就是max(昨天不持有，昨天持有的利润+今天卖出的利润)
 *
 * 如果当天是冷冻期，那么昨天肯定刚卖
 * 所以冷冻期利润=昨天不持有的利润
 */
var maxProfit = function(prices) {
  if (prices.length == 0) return 0;
  var noHold = 0,
    freeze = 0,
    hold = -prices[0];
  for (var i = 1; i < prices.length; i++) {
    var newNoHold = Math.max(noHold, hold + prices[i]); // 当天不持有的利润为 max(昨天不持有的利润，昨天持有的利润+今天卖出的利润)
    var newHold = Math.max(hold, freeze - prices[i]); // 当天持有的利润为 max(昨天持有的利润，昨天冷冻期或者冷冻期过后的某一天的利润-今天买股票的花费)
    freeze = noHold; // 冷冻期意味着手上没股票，那昨天肯定刚卖出，所以等于昨天不持有的利润
    noHold = newNoHold;
    hold = newHold;
  }
  return Math.max(noHold, freeze, hold);
};
```

```java
public int maxProfit(int[] prices) {
    if (prices == null || prices.length == 0) {
        return 0;
    }
    int N = prices.length;
    int[] buy = new int[N];
    int[] s1 = new int[N];
    int[] sell = new int[N];
    int[] s2 = new int[N];
    s1[0] = buy[0] = -prices[0];
    sell[0] = s2[0] = 0;
    for (int i = 1; i < N; i++) {
        buy[i] = s2[i - 1] - prices[i];
        s1[i] = Math.max(buy[i - 1], s1[i - 1]);
        sell[i] = Math.max(buy[i - 1], s1[i - 1]) + prices[i];
        s2[i] = Math.max(s2[i - 1], sell[i - 1]);
    }
    return Math.max(sell[N - 1], s2[N - 1]);
}
```

### [714.需要交易费用的股票交易](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)

```js
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  let n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee);
  }
  return dp_i_0;
};
```

### [123.买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成   两笔   交易。

注意:  你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  //状态转移方程
  //dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
  //dp[i][k][1] = max(dp[i-1][k][i],dp[i-1][k-1][0]-prices[i])
  let dp_i10 = 0,
    dp_i11 = Number.MIN_SAFE_INTEGER;
  let dp_i20 = 0,
    dp_i21 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < prices.length; i++) {
    let price = prices[i];
    dp_i20 = Math.max(dp_i20, dp_i21 + price);
    dp_i21 = Math.max(dp_i21, dp_i10 - price);
    dp_i10 = Math.max(dp_i10, dp_i11 + price);
    dp_i11 = Math.max(dp_i11, -price);
  }
  return dp_i20;
};
```

### [188.只能进行 K 次的股票交易 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

```js
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {
  //dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
  //dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
  //            = max(dp[i-1][k][1],dp[i-1][k]-prices[i])
  let n = prices.length;
  if (k >= n / 2) {
    let maxProfit = 0; //退化为普通的股票交易问题
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        maxProfit += prices[i] - prices[i - 1];
      }
    }
    return maxProfit;
  }
  let maxdp = [];
  for (let i = 0; i <= k; i++) {
    maxdp[i] = [];
    for (let j = 0; j <= n; j++) {
      maxdp[i][j] = 0; //初始化0 否则报错
    }
  }

  for (let i = 1; i <= k; i++) {
    let localMax = maxdp[i - 1][0] - prices[0];
    for (let j = 1; j < n; j++) {
      maxdp[i][j] = Math.max(maxdp[i][j - 1], prices[j] + localMax);
      localMax = Math.max(localMax, maxdp[i - 1][j] - prices[j]);
    }
  }
  return maxdp[k][n - 1];
};
```

```java
public int maxProfit(int k, int[] prices) {
    int n = prices.length;
    if (k >= n / 2) {   // 这种情况下该问题退化为普通的股票交易问题
        int maxProfit = 0;
        for (int i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }
    int[][] maxProfit = new int[k + 1][n];
    for (int i = 1; i <= k; i++) {
        int localMax = maxProfit[i - 1][0] - prices[0];
        for (int j = 1; j < n; j++) {
            maxProfit[i][j] = Math.max(maxProfit[i][j - 1], prices[j] + localMax);
            localMax = Math.max(localMax, maxProfit[i - 1][j] - prices[j]);
        }
    }
    return maxProfit[k][n - 1];
}
```

## 字符串编辑

### [583.删除两个字符串的字符使它们相等](https://leetcode-cn.com/problems/delete-operation-for-two-strings/)

给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。

转换为求两个字符串的最长公共子串问题

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let m = word1.length,
    n = word2.length;
  let dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      dp[i][j] = 0; ///初始化 否则NaN
    }
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1.charCodeAt(i - 1) == word2.charCodeAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return m + n - 2 * dp[m][n];
};
```

```java
public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    return m + n - 2 * dp[m][n];
}
```

### [72.编辑距离](https://leetcode-cn.com/problems/edit-distance/solution/bian-ji-ju-chi-by-leetcode/)

给定两个单词  word1 和  word2，计算出将  word1  转换成  word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符
  dp[i][j] 表示 word1 的前 i 个字母和 word2 的前 j 个字母之间的编辑距离
  当我们获得 dp[i-1][j],dp[i][j-1]和 dp[i-1][j-1]的值后就可以计算出 dp[i][j]，每次只能往单个或者多个字符中插入一个字符：
  对“dp[i-1][j-1] 表示替换操作，dp[i-1][j] 表示删除操作，dp[i][j-1] 表示插入操作。”的说明 更容易理解些： dp[i-1][j-1]到 dp[i][j]需要进行替换操作，dp[i-1][j]到 d[i][j]需要进行删除操作，dp[i][j-1] 到 d[i][j]需要进行添加操作。
  如果两个子串的最后一个字母相同，word1[i]=word2[i]的情况如下：

```md
dp[i][j] = 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]-1);
```

否则 word1[i]!=word2[i]，我们将考虑替换最后一个字符使得他们相同

```md
dp[i][j] = 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
```

```js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  let n = word1.length,
    m = word2.length;
  //有空字符串
  if (n * m == 0) {
    return n + m;
  }
  //新建dp数组
  let dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = [];
    for (let j = 0; j <= m; j++) {
      dp[i][j] = 0; //初始化dp数组
    }
  }
  //初始化
  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j < m + 1; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      let left = dp[i - 1][j] + 1;
      let down = dp[i][j - 1] + 1;
      let left_down = dp[i - 1][j - 1];
      if (word1.charCodeAt(i - 1) != word2.charCodeAt(j - 1)) {
        left_down += 1;
      }
      dp[i][j] = Math.min(left, Math.min(down, left_down));
    }
  }
  return dp[n][m];
};
```

```java
public int minDistance(String word1,String word2){
    int n = word1.length();
    int m = word2.length();

    //if one string is empty
    if(n*m==0){
        return n+m;
    }

    //array to store the convertion history
    int [][] dp = new int[n+1][m+1];

    //init boundries
    for(int i=0;i<n+1;i++){
        dp[i][0] = i;
    }

    for(int j=0;j<m+1;j++){
        dp[0][j] = j;
    }

    //dp compute
    for(int i=1;i<n+1;i++){
        for(int j=1;j<m+1;j++){
            int left = dp[i-1][j]+1;
            int right = dp[i][j-1]+1;
            int left_down = dp[i-1][j-1];
            if(word1.charAt(i-1)!=word2.charAt(j-1)){
                left_down +=1;
            }
            dp[i][j] = Math.min(left,Math.min(right,left_down));
        }
    }
    return dp[n][m];
}
```

### [650.复制粘贴字符](https://leetcode-cn.com/problems/2-keys-keyboard/)

最初在一个记事本上只有一个字符 'A'。你每次可以对这个记事本进行两种操作：

- Copy All (复制全部) : 你可以复制这个记事本中的所有字符(部分的复制是不允许的)。
- Paste (粘贴) : 你可以粘贴你上一次复制的字符。
  给定一个数字  n 。你需要使用最少的操作次数，在记事本中打印出恰好  n  个 'A'。输出能够打印出  n  个 'A' 的最少操作次数。

```js
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function(n) {
  let dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = 0;
  }
  let h = Math.round(Math.sqrt(n));
  for (let i = 2; i <= n; i++) {
    dp[i] = i;
    for (let j = 2; j <= h; j++) {
      if (i % j == 0) {
        dp[i] = dp[j] + dp[i / j];
        break;
      }
    }
  }
};
```

dp[i]表示，通过复制粘贴操作，得到 i 个字符，最少需要几步操作。
如果一个数是素数，那么最少操作就是一开始复制一个，最后一个个粘贴；
如果一个数不是素数，那么最少操作就可以按它的因数分解一下，简化操作。
举个例子，比如 12，可以分解为 以下几种情况：

- 12 = 2\*6, 需要操作 CPCPPPPP 总共 8 步
- 12 = 3\*4, 需要操作 CPPCPPP 总共 7 步
- 12 = 4\*3, 需要操作 CPPPCPP 总共 7 步
- 12 = 6\*2, 需要操作 CPPPPPCP 总共 8 步

其实可以发现，因子相同的情况下，交换因子相乘的顺序，需要的步骤是一样的。所以我们可以简化一下分解的步骤，只需要找到小于 sqrt(n)的因子即可。

假设找到的因子是 j ，那么需要的最小步骤就是 dp[j] + dp[i/j]，其中，dp[j]表示需要多少步生成这个因子，dp[i/j]表示需要多少步基于这个因子得到 i。

```java
public int minSteps(int n) {
    //第n步需要的操作数
    int[] dp = new int[n + 1];
    //从2开始到n计算
    int h = (int) Math.sqrt(n);
    for (int i = 2; i <= n; i++) {
        //如果是素数，那么操作数等于它本身
        dp[i] = i;
        //直接从2开始，如果是素数那么久一直进不去if判断，结果就是i
        //如果不是素数，那么就从2开始一定可以整除的数
        //比如6=2*3 dp[6] = dp[2]+dp[3]
        for (int j = 2; j <= h; j++) {
            if (i % j == 0) {
                dp[i] = dp[j] + dp[i / j];
                break;
            }
        }
    }
    return dp[n];
}
```

[大神解答](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-lab/)

状态转移方程:

```md
base case：
dp[-1][k][0] = dp[i][0][0] = 0
dp[-1][k][1] = dp[i][0][1] = -infinity

状态转移方程：
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
```

第一题
根据状态转移方程

```js
dp[i][1][0] = max(dp[i-1][1][0],dp[i-1][1][1]+prices[i])
dp[i][1][1] = max(dp[i-1][1][1].dp[i-1][0][0]-prices[i])
            = max(dp[i-1][1][1],-prices[i])
            解释：k=0的base case,所以dp[i-1][0][0] = 0;
现在发现K都是1，不会改变，即k对状态转移已经没有影响了
可以进一步化简去掉所有k:
dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
dp[i][1] = max(dp[i-1][1],-prices[i])
```

核心代码：

```js
var n = prices.length;
var dp = [n][2];
for (let i = 0; i < n; i++) {
  if (i - 1 == -1) {
    dp[i][0] = 0;
    dp[i][1] = -prices[i];
    continue;
  }
  dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
  dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
}
return dp[n - 1][0];
```

```java
for (int i = 0; i < n; i++) {
    if (i - 1 == -1) {
        dp[i][0] = 0;
        // 解释：
        //   dp[i][0]
        // = max(dp[-1][0], dp[-1][1] + prices[i])
        // = max(0, -infinity + prices[i]) = 0
        dp[i][1] = -prices[i];
        //解释：
        //   dp[i][1]
        // = max(dp[-1][1], dp[-1][0] - prices[i])
        // = max(-infinity, 0 - prices[i])
        // = -prices[i]
        continue;
    }
    dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i-1][1], -prices[i]);
}
return dp[n - 1][0];
```

O(1)的方案

```js
function maxProfit_k_1(prices) {
  var n = prices.length;
  //base case dp[-1][0] = 0,dp[i-1][1] = -infinity;
  var dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    //dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    //dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i]);
  }
  return dp_i_0;
}
```

```java

// k == 1
int maxProfit_k_1(int[] prices) {
    int n = prices.length;
    // base case: dp[-1][0] = 0, dp[-1][1] = -infinity
    int dp_i_0 = 0, dp_i_1 = Integer.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        // dp[i][1] = max(dp[i-1][1], -prices[i])
        dp_i_1 = Math.max(dp_i_1, -prices[i]);
    }
    return dp_i_0;
}
```

`第二题 k=±Infinity`
K 为无穷大，那么就可以认为 k 和 k-1 是一样的，改写框架

```md
dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
= max(dp[i-1][k][1],dp[i-1][k][0]-prices[i])
我们发现数组中的 k 已经不会改变了，也就是说不需要记录 K 这个状态了
dp[i][0] = max(dp[i-1][0],dp[i-1][i]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i])
```

转换为代码

```js
function maxProfit_k_inf(prices) {
  let n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
  }
  return dp_i_0;
}
```

```java
int maxProfit_k_inf(int[] prices) {
    int n = prices.length;
    int dp_i_0 = 0, dp_i_1 = Integer.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        int temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i]);
    }
    return dp_i_0;
}
```

`第三题:k=+Infinity with cooldown`
每次 sell 之后需要等一天才能继续交易。只需把这个特点融入上一题的状态转移方程即可：

```js
dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-2][0]-prices[i])
解释:第i天选择buy的时候，要从i-2的状态转移，而不是i-1
```

转换为代码：

```js
function maxProfit_with_cool(prices) {
  let n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  let dp_pre_0 = 0; //代表dp[i-2][0]
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
    dp_pre_0 = temp;
  }
  return dp_i_0;
}
```

```java
int maxProfit_with_cool(int[] prices) {
    int n = prices.length;
    int dp_i_0 = 0, dp_i_1 = Integer.MIN_VALUE;
    int dp_pre_0 = 0; // 代表 dp[i-2][0]
    for (int i = 0; i < n; i++) {
        int temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i]);
        dp_pre_0 = temp;
    }
    return dp_i_0;
}
```

`第四题：k=infinity with fee`
每次交易需要支付手续费，只需要把手续费从利润中减去即可，改写方程：

```md
dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i]-fee)
解释：相当于买入股票的价格升高了。在第一个公式中减也是一样的，相当于卖出股票的价格减少了
```

代码实现：

```js
function maxProfit_with_fee(prices, fee) {
  let n = prices.length;
  let dp_i_0 = 0,
    dp_i_1 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < n; i++) {
    let temp = dp_i_0;
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
    dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee);
  }
  return dp_i_0;
}
```

```java
int maxProfit_with_fee(int[] prices, int fee) {
    int n = prices.length;
    int dp_i_0 = 0, dp_i_1 = Integer.MIN_VALUE;
    for (int i = 0; i < n; i++) {
        int temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i]);
        dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee);
    }
    return dp_i_0;
}
```

`第五题：K=2`
k=2 和后面讲的 K 是任意正整数的情况中，对 k 的处理就凸显出来了

```md
原始的动态转移方程，没有可简化的地方
dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
```

穷举算法，穷举所有 K 的状态

```js
let n = prices.length;
let max_k = 2;
var dp = [];
for (let i = 0; i < n; i++) {
  dp[i] = [];
  for (let j = 0; j < max_k; j++) {
    dp[i][j] = [];
    for (let k = 0; k < 2; k++) {
      dp[i][j][k] = [];
    }
  }
}
for (let i = 0; i < n; i++) {
  for (let k = max_k; k >= 1; k--) {
    if (i - 1 == -1) {
      //处理base case
      dp[i][k][0] = 0;
      dp[i][k][1] = -prices[i];
      continue;
    }
    dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
    dp[i][k][1] = Math.max(
      dp[i - 1][k - 1][1],
      dp[i - 1][k - 1][0] - prices[i]
    );
  }
}
///穷举了n*max_k*2个状态
return dp[n - 1][max_k][0];

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  //状态转移方程
  //dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
  //dp[i][k][1] = max(dp[i-1][k][i],dp[i-1][k-1][0]-prices[i])
  let dp_i10 = 0,
    dp_i11 = Number.MIN_SAFE_INTEGER;
  let dp_i20 = 0,
    dp_i21 = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < prices.length; i++) {
    let price = prices[i];
    dp_i20 = Math.max(dp_i20, dp_i21 + price);
    dp_i21 = Math.max(dp_i21, dp_i10 - price);
    dp_i10 = Math.max(dp_i10, dp_i11 + price);
    dp_i11 = Math.max(dp_i11, -price);
  }
  return dp_i20;
};
```

```java
int maxProfit_k_2(int[] prices){
int max_k = 2;
int[][][] dp = new int[n][max_k + 1][2];
for (int i = 0; i < n; i++) {
    for (int k = max_k; k >= 1; k--) {
        if (i - 1 == -1) {
            /* 处理 base case */
            dp[i][k][0] = 0;
            dp[i][k][1] = -prices[i];
            continue;
        }
        dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
        dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
    }
}
// 穷举了 n × max_k × 2 个状态，正确。
return dp[n - 1][max_k][0];
}

//k取值较少，直接用k=1,k=2列举出来也可以
dp[i][2][0] = max(dp[i-1][2][0], dp[i-1][2][1] + prices[i])
dp[i][2][1] = max(dp[i-1][2][1], dp[i-1][1][0] - prices[i])
dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
dp[i][1][1] = max(dp[i-1][1][1], -prices[i])

int maxProfit_k_2(int[] prices) {
    int dp_i10 = 0, dp_i11 = Integer.MIN_VALUE;
    int dp_i20 = 0, dp_i21 = Integer.MIN_VALUE;
    for (int price : prices) {
        dp_i20 = Math.max(dp_i20, dp_i21 + price);
        dp_i21 = Math.max(dp_i21, dp_i10 - price);
        dp_i10 = Math.max(dp_i10, dp_i11 + price);
        dp_i11 = Math.max(dp_i11, -price);
    }
    return dp_i20;
}
```

`第六题：k=any integer`
从 k=2 开始，如果传入 K 太大，dp 数组过大，一次性交易由买入和卖出构成，至少需要两天，所有有效 K 不应该超过 n/2,如果超过，没有约束作用。相当于 k=±infinity

```js
function maxProfit_k_any(max_k, prices) {
  let n = prices.length;
  if (max_k > n / 2) {
    return maxProfit_k_inf(prices);
  }
  var dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = [];
    for (let j = 0; j < max_k; j++) {
      dp[i][j] = [];
      for (let k = 0; k < 2; k++) {
        dp[i][j][k] = [];
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let k = max_k; k >= 1; k--) {
      if (i - 1 == -1) {
        /* 处理 base case */
        dp[i][k][0] = 0;
        dp[i][k][1] = -prices[i];
        continue;
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
    }
  }
}
```

```java
int maxProfit_k_any(int max_k, int[] prices) {
    int n = prices.length;
    if (max_k > n / 2)
        return maxProfit_k_inf(prices);
    int[][][] dp = new int[n][max_k + 1][2];
    for (int i = 0; i < n; i++)
        for (int k = max_k; k >= 1; k--) {
            if (i - 1 == -1) { /* 处理 base case */ }
            dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i]);
            dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i]);
        }
    return dp[n - 1][max_k][0];
}
```

## 最长递增子序列

已知一个序列 {S1, S2,...,Sn}，取出若干数组成新的序列 {Si1, Si2,..., Sim}，其中 i1、i2 ... im 保持递增，即新序列中各个数仍然保持原数列中的先后顺序，称新序列为原序列的一个 子序列 。

如果在子序列中，当下标 ix > iy 时，Six > Siy，称子序列为原序列的一个 递增子序列 。

定义一个数组 dp 存储最长递增子序列的长度，dp[n] 表示以 Sn 结尾的序列的最长递增子序列长度。对于一个递增子序列 {Si1, Si2,...,Sim}，如果 im < n 并且 Sim < Sn，此时 {Si1, Si2,..., Sim, Sn} 为一个递增子序列，递增子序列的长度增加 1。满足上述条件的递增子序列中，长度最长的那个递增子序列就是要找的，在长度最长的递增子序列上加上 Sn 就构成了以 Sn 为结尾的最长递增子序列。因此 dp[n] = max{ dp[i]+1 | Si < Sn && i < n} 。

因为在求 dp[n] 时可能无法找到一个满足条件的递增子序列，此时 {Sn} 就构成了递增子序列，需要对前面的求解方程做修改，令 dp[n] 最小为 1，即：

![最长子串](/images/algorithm-lcs-dp.jpg)

```md
dp[n] = max{1,dp[i]+1|Si<Sn&&i< n }
```

对于一个长度为 N 的序列，最长递增子序列并不一定会以 SN 为结尾，因此 dp[N] 不是序列的最长递增子序列的长度，需要遍历 dp 数组找出最大值才是所要的结果，max{ dp[i] | 1 <= i <= N} 即为所求。

### [300.最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:

```md
输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长的上升子序列是  [2,3,7,101]，它的长度是 4。
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  return lengthofLISRec(nums, Number.MIN_SAFE_VALUE);
};
function lengthofLISRec(nums, prev, curpos) {
  if (curpos == numslength) {
    return 0;
  }
  let taken = 0;
  if (nums[curpos] > prev) {
    taken = 1 + lengthofLISRec(nums, nums[curpos], curpos + 1);
  }
  let nottoken = lengthofLISRec(nums, prev, curpos + 1);
  return Math.max(taken, nottaken);
}

//动态规划
var lengthOfLIS = function(nums) {
  if (nums.length == 0) {
    return 0;
  }
  let dp = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1; //初始化为1
  }
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    res = Math.max(res, dp[i]);
  }
  return res;
};
//[dp+二分查找](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/zui-chang-shang-sheng-zi-xu-lie-dong-tai-gui-hua-2/)

var lengthOfLIS = function(nums) {
  let tails = new Array(nums.length);
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let i = 0,
      j = res;
    while (i < j) {
      let m = (i + j) / 2;
      if (tails[m] < num) {
        i = m + 1;
      } else {
        j = m;
      }
      tails[i] = num;
      if (res == j) res++;
    }
  }
  return res;
};
```

```java
public int lengthOfLIS(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    for (int i = 0; i < n; i++) {
        int max = 1;
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                max = Math.max(max, dp[j] + 1);
            }
        }
        dp[i] = max;
    }
    return Arrays.stream(dp).max().orElse(0);
}
//使用 Stream 求最大值会导致运行时间过长，可以改成以下形式：
int ret = 0;
for (int i = 0; i < n; i++) {
    ret = Math.max(ret, dp[i]);
}
return ret;
```

```java
public int lengthOfLIS(int[] nums) {
    int n = nums.length;
    int[] tails = new int[n];
    int len = 0;
    for (int num : nums) {
        int index = binarySearch(tails, len, num);
        tails[index] = num;
        if (index == len) {
            len++;
        }
    }
    return len;
}

private int binarySearch(int[] tails, int len, int key) {
    int l = 0, h = len;
    while (l < h) {
        int mid = l + (h - l) / 2;
        if (tails[mid] == key) {
            return mid;
        } else if (tails[mid] > key) {
            h = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
```

### [646.最长数对链](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)

考虑使用 DP，dp[i]为第 i 个数对作为结尾的最长数对链长度。将数对先按照第一个元素排序，然后按照按照第二个元素从小到大排序：

如果 paris[i][0] > pairs[0~i-1][1]，则 dp[i]=dp[i-1]+1
注意每个 dp[i]需要初始化为 1，如果前面没有数对与其构成数对链，则 dp[i]=1

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
  let n = pairs.length;
  if (n == 0) return 0;
  pairs.sort((a, b) => a[0] - b[0]);
  let res = 0;
  let dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = 1;
    for (let j = i - 1; j >= 0; j--) {
      if (pairs[i][0] > pairs[j][1]) {
        dp[i] = dp[j] + 1;
        break;
      }
    }
    res = Math.max(res, dp[i]);
  }
  return res;
};
```

```java
public int findLongestChain(int[][] pairs) {
    if (pairs == null || pairs.length == 0) {
        return 0;
    }
    Arrays.sort(pairs, (a, b) -> (a[0] - b[0]));
    int n = pairs.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (pairs[j][1] < pairs[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Arrays.stream(dp).max().orElse(0);
}
```

### [376.摆动序列](https://leetcode-cn.com/problems/wiggle-subsequence/)

[线性动态规划](https://leetcode-cn.com/problems/wiggle-subsequence/solution/bai-dong-xu-lie-by-leetcode/)

数组中的任何元素都对应下面三种可能状态中的一种：

- 上升的位置，意味着 nums[i] > nums[i - 1]
  - up[i] = down[i-1]+1 down[i] = down[i-1]
- 下降的位置，意味着 nums[i] < nums[i - 1]
  - down[i] = up[i-1]+1 up[i] = up[i-1]
- 相同的位置，意味着 nums[i] == nums[i - 1]
  - down[i] = down[i-1] up[i] = up[i-1]

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  if (nums.length < 2) {
    return nums.length;
  }
  let up = new Array(nums.length);
  let down = new Array(nums.length);
  for (let i = 0; i < nums.length; i++) {
    up[i] = 0;
    down[i] = 0;
  }
  up[0] = down[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    //从1开始
    if (nums[i] > nums[i - 1]) {
      up[i] = down[i - 1] + 1;
      down[i] = down[i - 1];
    } else if (nums[i] < nums[i - 1]) {
      down[i] = up[i - 1] + 1;
      up[i] = up[i - 1];
    } else {
      down[i] = down[i - 1];
      up[i] = up[i - 1];
    }
  }
  return Math.max(down[nums.length - 1], up[nums.length - 1]);
};
```

空间优化的动态规划
更新 up[i] down[i] 只需要 up[i-1] down[i-1]，因此只需要最后一个元素

```js
var wiggleMaxLength = function(nums) {
    if(nums.length<2){
        return nums.length;
    }
    let down=1,up=1;
    for(let i=1;i<nums.length){
        if(nums[i]>nums[i-1]){
            up = down+1;
        }else if(nums[i]<nums[i-1]){
            down = up+1;
        }
    }
    return Math.max(up,down);
}
```

## 最长公共子序列

对于两个子序列 S1 和 S2，找出它们最长的公共子序列。

定义一个二维数组 dp 用来存储最长公共子序列的长度，其中 dp[i][j] 表示 S1 的前 i 个字符与 S2 的前 j 个字符最长公共子序列的长度。考虑 S1i 与 S2j 值是否相等，分为两种情况：

当 S1i==S2j 时，那么就能在 S1 的前 i-1 个字符与 S2 的前 j-1 个字符最长公共子序列的基础上再加上 S1i 这个值，最长公共子序列长度加 1，即 dp[i][j] = dp[i-1][j-1] + 1。
当 S1i != S2j 时，此时最长公共子序列为 S1 的前 i-1 个字符和 S2 的前 j 个字符最长公共子序列，或者 S1 的前 i 个字符和 S2 的前 j-1 个字符最长公共子序列，取它们的最大者，即 dp[i][j] = max{ dp[i-1][j], dp[i][j-1] }。
综上，最长公共子序列的状态转移方程为：

![状态转移方程](/images/ealgorithm-data-longestSubqueue.jpg)

对于长度为 N 的序列 S1 和长度为 M 的序列 S2，dp[N][m] 就是序列 S1 和序列 S2 的最长公共子序列长度。

与最长递增子序列相比，最长公共子序列有以下不同点：

针对的是两个序列，求它们的最长公共子序列。
在最长递增子序列中，dp[i] 表示以 Si 为结尾的最长递增子序列长度，子序列必须包含 Si ；在最长公共子序列中，dp[i][j] 表示 S1 中前 i 个字符与 S2 中前 j 个字符的最长公共子序列长度，不一定包含 S1i 和 S2j。
在求最终解时，最长公共子序列中 dp[N][m] 就是最终解，而最长递增子序列中 dp[N] 不是最终解，因为以 SN 为结尾的最长递增子序列不一定是整个序列最长递增子序列，需要遍历一遍 dp 数组找到最大者。

```js
var longthOfLCS = function(nums1, nums2) {
  let n1 = nums1.length,
    n2 = nums2.length;
  let dp = new Array(n1 + 1);
  for (let i = 0; i <= n1; i++) {
    dp[i] = new Array(n2 + 1);
    for (let j = 0; j <= n2; j++) {
      dp[i][j] = 0;
    }
  }
  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      if (nums1[i - 1] == nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[n][m];
};
```

## 分割整数

### [343.整数拆分](https://leetcode-cn.com/problems/integer-break/)

#### 暴力搜索

F(n)=max{i\*F(n-1)},i=1,2,...,n-1

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if (n == 2) {
    return 1;
  }
  let res = -1;
  for (let i = 1; i <= n - 1; i++) {
    res = Math.max(res, Math.max(i * (n - 1), i * integerBreak(n - i)));
  }
  return res;
};
```

#### 记忆化搜索

```js
//记忆化搜索，自顶向下
integerBreak = function(n) {
  memory = new Array(n + 1);
  memory.fill(0);
  return integerBreakHelper(n);
};

integerBreakHelper = function(n) {
  if (n == 2) {
    return 1;
  }
  //记忆力的核心
  if (memory[n] != 0) {
    //memory的初始值为0，如果不为0，说明已经计算过了，直接返回
    return memory[n];
  }
  let res = -1;
  for (let i = 1; i <= n - 1; i++) {
    res = Math.max(res, Math.max(i * integerBreakHelper(n - i), i * (n - i)));
  }
  memory[n] = res;
  return res;
};
```

#### 动态规划 1

```js
integerBreak = function(n) {
  let memory = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    memory[i] = 0;
  }
  memory[2] = 1;
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i - 1; j++) {
      memory[i] = Math.max(memory[i], Math.max(j * memory[i - j], j * (i - j)));
    }
  }
  return memory[n];
};
```

### [279.完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let dp = new Array(n + 1);
  dp.fill(0); //初始化为0
  for (let i = 1; i <= n; i++) {
    dp[i] = i; //最坏的情况，每次+1
    for (let j = 1; i - j * j >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1); //动态规划
    }
  }
  return dp[n];
};
//自顶向下 记忆里搜索
/**
 * @param {number} n
 * @return {number} 需求解决memo这个全局变量的问题
 */
var memo;
var numSquares = function(n) {
  var memo = new Array(n + 1);
  memo.fill(0);
  return numSquareMemo(n);
};
var numSquareMemo = function(n) {
  if (memo[n] != 0) {
    return memo[n];
  }
  let val = Math.sqrt(n);
  if (val * val == n) {
    return (memo[n] = 1);
  }
  let res = Number.MIN_SAFE_VALUE;
  for (let i = 1; i * i < n; i++) {
    res = Math.min(res, numSquareMemo(n - i * i) + 1);
  }
  return (memo[n] = res);
};
//动态规划
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  var memo = new Array(n + 1);
  for (let i = 0; i <= n + 1; i++) {
    memo[i] = i;
  }
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      memo[i] = Math.min(memo[i], memo[i - j * j] + 1);
    }
  }
  return memo[n];
};
```

### [91.解码方法](https://leetcode-cn.com/problems/decode-ways/)

递推转为动态规划

![递推转为动态规划](/images/algorithm-leetcode-91-numDecoding.png)

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s == null || s.length == 0) {
    return 0;
  }
  let pre = 1,
    cur = 1; //dp[-1]=dp[0]=1;
  for (let i = 1; i < s.length; i++) {
    let temp = cur;
    if (s.charAt(i) == "0") {
      if (s.charAt(i - 1) == "1" || s.charAt(i - 1) == "2") {
        cur = pre;
      } else {
        return 0;
      }
    } else if (
      s.charAt(i - 1) == "1" ||
      (s.charAt(i - 1) == "2" && s.charAt(i) >= "1" && s.charAt(i) <= "6")
    ) {
      cur = cur + pre;
    }
    pre = temp;
  }
  return cur;
};
```

利用 A-Z 的编码 当一个数大于 26 时则直接返回 0

```c++
int numDecodings(string s) {
    if (s[0] == '0') return 0;
    int pre = 1, curr = 1;//dp[-1] = dp[0] = 1
    for (int i = 1; i < s.size(); i++) {
        int tmp = curr;
        if (s[i] == '0')
            if (s[i - 1] == '1' || s[i - 1] == '2') curr = pre;
            else return 0;
        else if (s[i - 1] == '1' || (s[i - 1] == '2' && s[i] >= '1' && s[i] <= '6'))
            curr = curr + pre;
        pre = tmp;
    }
    return curr;
}
```

```java
public int numDecodings(String s) {
        if (s == null || s.length() == 0) {
            return 0;
        }
        int len = s.length();

        int help = 1;
        int res = 0;
        if (s.charAt(len - 1) != '0') {
            res = 1;
        }
        for (int i = len - 2; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                help = res;
                res = 0;
                continue;
            }
            if ((s.charAt(i) - '0') * 10 + (s.charAt(i + 1) - '0') <= 26) {
                res += help;
                //help用来存储res以前的值
                help = res-help;
            } else {
                help = res;
            }

        }
        return res;
    }
```

## 数组区间

### [数组区间和](https://leetcode-cn.com/problems/range-sum-query-immutable/)

给定一个整数数组 nums，求出数组从索引 i 到 j (i ≤ j) 范围内元素的总和，包含 i, j 两点。

```js
/**
 * @param {number[]} nums
 */

var NumArray = function(nums) {
  this.sums = new Array(nums.length + 1);
  this.sums[0] = 0;
  for (let i = 1; i <= nums.length; i++) {
    this.sums[i] = this.sums[i - 1] + nums[i - 1];
  }
};

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return this.sums[j + 1] - this.sums[i];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
```

```java
class NumArray {
    private int[] sums;

    public NumArray(int[] nums) {
        sums = new int[nums.length+1];
        for(int i=1;i<=nums.length;i++){
            sums[i] = sums[i-1]+nums[i-1];
        }
    }

    public int sumRange(int i, int j) {
        return sums[j+1]-sums[i];
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * int param_1 = obj.sumRange(i,j);
 */
```

### [413.等差数列划分]

如果一个数列至少有三个元素，并且任意两个相邻元素之差相同，则称该数列为等差数列。
1、暴力解法

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function(A) {
  let count = 0;
  for (let i = 0; i < A.length - 2; i++) {
    let d = A[i + 1] - A[i];
    for (let j = i + 2; j < A.length; j++) {
      if (A[j] - A[j - 1] != d) {
        break;
      } else {
        count++;
      }
    }
  }
  return count;
};
```

```java
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int count = 0;
        for (int s = 0; s < A.length - 2; s++) {
            int d = A[s + 1] - A[s];
            for (int e = s + 2; e < A.length; e++) {
                if (A[e] - A[e - 1] == d)
                    count++;
                else
                    break;
            }
        }
        return count;
    }
}
```

2、递归

```js
this.sum = 0;
var numberOfArithmeticSlices = function(A) {
  slices(A, A.length - 1);
  return this.sum;
};
var slices = function(A, n) {
  if (n < 2) return 0;
  let ap = 0;
  if (A[n] - A[n - 1] == A[n - 1] - A[n - 2]) {
    ap = 1 + slices(A, i - 1);
    this.sum += ap;
  } else {
    slices(A, i - 1);
  }
  return ap;
};
```

```java
public class Solution {
    int sum = 0;
    public int numberOfArithmeticSlices(int[] A) {
        slices(A, A.length - 1);
        return sum;
    }
    public int slices(int[] A, int i) {
        if (i < 2)
            return 0;
        int ap = 0;
        if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
            ap = 1 + slices(A, i - 1);
            sum += ap;
        } else
            slices(A, i - 1);
        return ap;
    }
}
```

3、动态规划

```js
var numberOfArithmeticSlices = function(A) {
  let dp = new Array(A.length + 1);
  dp.fill(0);
  let sum = 0;
  for (let i = 2; i < dp.length; i++) {
    if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
      dp[i] = 1 + dp[i - 1];
      sum += dp[i];
    }
  }
  return sum;
};
```

4、常数动态规划

```js
var numberOfArithmeticSlices = function(A) {
  let dp = 0;
  let sum = 0;
  for (let i = 2; i < A.length; i++) {
    if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
      dp++;
      sum += dp;
    } else {
      dp = 0;
    }
  }
  return sum;
};
```

## 矩阵路径

### [64.矩阵的最小路径](https://leetcode-cn.com/problems/minimum-path-sum/)

题目描述：求从矩阵的左上角到右下角的最小路径和，每次只能向右和向下移动

1. 暴力解法
   暴力就是利用递归，对于每个元素我们考虑两条路径，向右走和向下走，在这两条路径中挑选路径权值和较小的一个。

```md
cost(i,j)=grid[i][j]+min(cost(i+1,j),cost(i,j+1))
```

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  return cost(grid, 0, 0);
};
var cost = function(grid, i, j) {
  if (i == grid.length || j == grid[0].length) return Number.MAX_SAFE_VALUE;
  if (i == grid.length - 1 && j == grid[0].length - 1) return grid[i][j];
  return grid[i][j] + Math.min(cost(grid, i + 1, j), cost(grid, i, j + 1));
};
```

2. 动态规划
   我们新建一个额外的 dpdp 数组，与原矩阵大小相同。在这个矩阵中，dp(i, j)dp(i,j) 表示从坐标 (i, j)(i,j) 到右下角的最小路径权值。我们初始化右下角的 dpdp 值为对应的原矩阵值，然后去填整个矩阵，对于每个元素考虑移动到右边或者下面，因此获得最小路径和我们有如下递推公式：

```md
dp(i,j)=grid(i,j)+min(dp(i+1,j),dp(i,j+1))
```

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let dp = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    dp[i] = new Array(grid[0].length);
  }
  dp[grid.length - 1][grid[0].length - 1] = 0;
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      if (i == grid.length - 1 && j != grid[0].length - 1) {
        dp[i][j] = grid[i][j] + dp[i][j + 1];
      } else if (j == grid[0].length - 1 && i != grid.length - 1) {
        dp[i][j] = grid[i][j] + dp[i + 1][j];
      } else if (i != grid.length - 1 && j != grid[0].length - 1) {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1]);
      } else {
        dp[i][j] = grid[i][j];
      }
    }
  }
  return dp[0][0];
};
```

```java
public class Solution {
    public int minPathSum(int[][] grid) {
        int[][] dp = new int[grid.length][grid[0].length];
        for (int i = grid.length - 1; i >= 0; i--) {
            for (int j = grid[0].length - 1; j >= 0; j--) {
                if(i == grid.length - 1 && j != grid[0].length - 1)
                    dp[i][j] = grid[i][j] +  dp[i][j + 1];
                else if(j == grid[0].length - 1 && i != grid.length - 1)
                    dp[i][j] = grid[i][j] + dp[i + 1][j];
                else if(j != grid[0].length - 1 && i != grid.length - 1)
                    dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
                else
                    dp[i][j] = grid[i][j];
            }
        }
        return dp[0][0];
    }
}

class Solution {
    public int minPathSum(int[][] grid) {
        for(int i = 0; i < grid.length; i++) {
            for(int j = 0; j < grid[0].length; j++) {
                if(i == 0 && j == 0) continue;
                else if(i == 0)  grid[i][j] = grid[i][j - 1] + grid[i][j];
                else if(j == 0)  grid[i][j] = grid[i - 1][j] + grid[i][j];
                else grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
            }
        }
        return grid[grid.length - 1][grid[0].length - 1];
    }
}

class Solution {
    public int minPathSum(int[][] grid) {
        int[][] dp = new int[grid.length][grid[0].length];
        for(int i = 0;i<=grid.length-1;i++){
            for(int j = 0;j<=grid[0].length-1;j++){
                if(i==0&&j==0){
                    continue;
                }else if(i==0){
                    grid[i][j] = grid[i][j]+grid[i][j-1];
                }else if(j==0){
                    grid[i][j] = grid[i][j]+grid[i-1][j];
                }else{
                    grid[i][j] = grid[i][j]+Math.min(grid[i-1][j],grid[i][j-1]);
                }
            }
        }
        return grid[grid.length-1][grid[0].length-1];
    }
}
```

### [63.不同路径](https://leetcode-cn.com/problems/unique-paths/)

一个机器人位于一个 m x n 网格的左上角。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角

问总共有多少条不同的路径？

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let dp = new Array(n + 1);
  for (let i = 0; i < n; i++) {
    dp[i] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1];
    }
  }
  return dp[n - 1];
};
```

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int i = 0; i < n; i++) dp[0][i] = 1;
        for (int i = 0; i < m; i++) dp[i][0] = 1;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

## 斐波那契数列

### [70.爬楼梯]

题目描述：有 N 阶楼梯，每次可以上一阶或者两阶，求有多少种上楼梯的方法。

定义一个数组 dp 存储上楼梯的方法数（为了方便讨论，数组下标从 1 开始），dp[i] 表示走到第 i 个楼梯的方法数目。

第 i 个楼梯可以从第 i-1 和 i-2 个楼梯再走一步到达，走到第 i 个楼梯的方法数为走到第 i-1 和第 i-2 个楼梯的方法数之和。

```md
dp[i] = dp[i-1]+dp[i-2]
```

考虑到 dp[i]只与两个变量有关，因此可以使用两个变量来优化解空间复杂度

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n <= 2) {
    return n;
  }
  let pre = 1,
    cur = 2;
  for (let i = 2; i < n; i++) {
    let temp = pre + cur;
    pre = cur;
    cur = temp;
  }
  return cur;
};
```

```java
public int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }
    int pre2 = 1, pre1 = 2;
    for (int i = 2; i < n; i++) {
        int cur = pre1 + pre2;
        pre2 = pre1;
        pre1 = cur;
    }
    return pre1;
}
```

### [198.打家劫舍](https://leetcode-cn.com/problems/house-robber/)

题目描述：抢劫一排住户，但是不能抢邻近的住户，求最大抢劫量。
定义 dp 数组用来存储最大的抢劫量，其中 dp[i] 表示抢到第 i 个住户时的最大抢劫量。
由于不能抢劫邻近住户，如果抢劫了第 i -1 个住户，那么就不能再抢劫第 i 个住户，所以

```md
dp[i] = max(dp[i-1],dp[i-2]+nums[i])
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let pre = 0,
    cur = 0;
  for (let i = 0; i < nums.length; i++) {
    let temp = Math.max(pre + nums[i], cur);
    pre = cur;
    cur = temp;
  }
  return cur;
};
```

```java
public int rob(int[] nums) {
    int pre2 = 0, pre1 = 0;
    for (int i = 0; i < nums.length; i++) {
        int cur = Math.max(pre2 + nums[i], pre1);
        pre2 = pre1;
        pre1 = cur;
    }
    return pre1;
}
```

### [213.环形街区打劫]

打劫了第一家不能打劫最后一家，两者互斥

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums.length == 0 || nums == null) {
    return 0;
  }
  let n = nums.length;
  if (n == 1) {
    return nums[0];
  }
  return Math.max(helper(nums, 0, n - 2), helper(nums, 1, n - 1));
};
var helper = function(nums, first, last) {
  let pre = 0,
    cur = 0;
  for (let i = first; i <= last; i++) {
    let temp = Math.max(cur, pre + nums[i]);
    pre = cur;
    cur = temp;
  }
  return cur;
};
```

### [信件排错]

题目描述：有 N 个 信 和 信封，它们被打乱，求错误装信方式的数量。

定义一个数组 dp 存储错误方式数量，dp[i] 表示前 i 个信和信封的错误方式数量。假设第 i 个信装到第 j 个信封里面，而第 j 个信装到第 k 个信封里面。根据 i 和 k 是否相等，有两种情况：

i==k，交换 i 和 k 的信后，它们的信和信封在正确的位置，但是其余 i-2 封信有 dp[i-2] 种错误装信的方式。由于 j 有 i-1 种取值，因此共有 (i-1)*dp[i-2] 种错误装信方式。
i != k，交换 i 和 j 的信后，第 i 个信和信封在正确的位置，其余 i-1 封信有 dp[i-1] 种错误装信方式。由于 j 有 i-1 种取值，因此共有 (i-1)*dp[i-1] 种错误装信方式。
综上所述，错误装信数量方式数量为：

```md
dp[i] = (i-1)dp[i-1]+(i-1)dp[i-2];
```

### [母牛生产]

题目描述：假设农场中成熟的母牛每年都会生 1 头小母牛，并且永远不会死。第一年有 1 只小母牛，从第二年开始，母牛开始生小母牛。每只小母牛 3 年之后成熟又可以生小母牛。给定整数 N，求 N 年后牛的数量。

第 i 年成熟的牛的数量为：

```md
dp[i] = dp[i-3]+dp[i-1]
```

### [509. 斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)

斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n > 1
给你 n ，请计算 F(n) 。

示例 1：

```bash
输入：2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1
```

```js
var fib = function(n){
  if(n<2){
    return n;
  }

  let prev = 0, cur = 0, next = 1; 
  for(let i = 2;i<=n;i++){
    prev = cur;
    cur =  next;
    next = prev + cur;
  }
  return next;
}

var fib = function(n) {
    if(n<2){
        return n;
    }

    let fib = new Map();
    fib.set(0,0);
    fib.set(1,1);
    fib.set(2,1);
    for(let i=2;i<=n;i++){
        if(fib.get(i)){
            fib.get(i);
        }else{
            const res = fib.get(i-1)+fib.get(i-2);
            fib.set(i,res);
        }
    }
    return fib.get(n);
};
```

### [830. 较大分组的位置](https://leetcode-cn.com/problems/positions-of-large-groups/)

在一个由小写字母构成的字符串 s 中，包含由一些连续的相同字符所构成的分组。

例如，在字符串 s = "abbxxxxzyy" 中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组。

分组可以用区间 [start, end] 表示，其中 start 和 end 分别表示该分组的起始和终止位置的下标。上例中的 "xxxx" 分组用区间表示为 [3,6] 。

我们称所有包含大于或等于三个连续字符的分组为 较大分组 。

找到每一个 较大分组 的区间，按起始位置下标递增顺序排序后，返回结果。

```bash
示例 1：

输入：s = "abbxxxxzzy"
输出：[[3,6]]
解释："xxxx" 是一个起始于 3 且终止于 6 的较大分组。
示例 2：

输入：s = "abc"
输出：[]
解释："a","b" 和 "c" 均不是符合要求的较大分组。
```

[1.正则 + 位 + 栈（4解法，超100%）](https://leetcode-cn.com/problems/positions-of-large-groups/solution/zheng-ze-wei-zhan-3jie-fa-chao-100-by-ma-r0vy/)

```js
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function(s) {
    if(s.length<3){
        return [];
    }
    let result = [];
    let start = 1;
    for(let i=0;i<s.length;i++){
        if(i==s.length-1||s[i+1]!=s[i]){
            if(start>=3){
                result.push([i-start+1,i]);
            }
            start = 1;
        }else{
            start++;
        }
    }
    return result;
};
```
