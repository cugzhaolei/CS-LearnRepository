# 动态规划

## [0-1背包](https://blog.csdn.net/reed1991/article/details/53352426)
有一个容量为 N 的背包，要用这个背包装下物品的价值最大，这些物品有两个属性：体积 w 和价值 v。

定义一个二维数组 dp 存储最大价值，其中 dp[i][j] 表示前 i 件物品体积不超过 j 的情况下能达到的最大价值。设第 i 件物品体积为 w，价值为 v，根据第 i 件物品是否添加到背包中，可以分两种情况讨论：

第 i 件物品没添加到背包，总体积不超过 j 的前 i 件物品的最大价值就是总体积不超过 j 的前 i-1 件物品的最大价值，dp[i][j] = dp[i-1][j]。
第 i 件物品添加到背包中，dp[i][j] = dp[i-1][j-w] + v。
第 i 件物品可添加也可以不添加，取决于哪种情况下最大价值更大。因此，0-1 背包的状态转移方程为：

![](/images/algorithm-data-01-formulation.png)

``` java
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

![](/images/algorithm-data-01-for-opt.jpg)
因为 dp[j-w] 表示 dp[i-1][j-w]，因此不能先求 dp[i][j-w]，防止将 dp[i-1][j-w] 覆盖。也就是说要先计算 dp[i][j] 再计算 dp[i][j-w]，在程序实现时需要按倒序来循环求解。
``` java
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
<b>无法使用贪心算法的解释</b>

0-1 背包问题无法使用贪心算法来求解，也就是说不能按照先添加性价比最高的物品来达到最优，这是因为这种方式可能造成背包空间的浪费，从而无法达到最优。考虑下面的物品和一个容量为 5 的背包，如果先添加物品 0 再添加物品 1，那么只能存放的价值为 16，浪费了大小为 2 的空间。最优的方式是存放物品 1 和物品 2，价值为 22.

id	|w	|v	|v/w
--:|:--:|:--:|:--
0	|1	|6	|6
1	|2	|10	|5
2	|3	|12	|4
<b>变种</b>

* 完全背包：物品数量为无限个

* 多重背包：物品数量有限制

* 多维费用背包：物品不仅有重量，还有体积，同时考虑这两种限制

* 其它：物品之间相互约束或者依赖

### [494.目标和](https://leetcode-cn.com/problems/target-sum/)

给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

``` md
示例 1:

输入: nums: [1, 1, 1, 1, 1], S: 3
输出: 5
解释: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有5种方法让最终目标和为3。
```
该问题可以转换为 Subset Sum 问题，从而使用 0-1 背包的方法来求解。

可以将这组数看成两部分，P 和 N，其中 P 使用正号，N 使用负号，有以下推导：

``` md               
                  sum(P) - sum(N) = target
sum(P) + sum(N) + sum(P) - sum(N) = target + sum(P) + sum(N)
                       2 * sum(P) = target + sum(nums)
```
因此只要找到一个子集，令它们都取正号，并且和等于 (target + sum(nums))/2，就证明存在解。
``` js
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
    return findTarget(nums,0,S);
};
function findTarget(nums,start,S){
    if(start==nums.length){
        return S ==0?1:0;
    }
    return findTarget(nums,start+1,S+nums[start])+findTarget(nums,start+1,S-nums[start]);
}
```
``` java
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

现在，假设你分别支配着 m 个 0 和 n 个 1。另外，还有一个仅包含 0 和 1 字符串的数组。

你的任务是使用给定的 m 个 0 和 n 个 1 ，找到能拼出存在于数组中的字符串的最大数量。每个 0 和 1 至多被使用一次。

注意:

给定 0 和 1 的数量都不会超过 100。
给定字符串数组的长度不会超过 600。
示例 1:
``` md
输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
输出: 4
```
解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。
示例 2:
``` md
输入: Array = {"10", "0", "1"}, m = 1, n = 1
输出: 2
```
解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。

这是一个多维费用的 0-1 背包问题，有两个背包大小，0 的数量和 1 的数量。
``` js
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    if(strs==null||strs.length==0){
        return 0;
    }
    var dp =[];
    for(var i=0;i<=amount;i++){
        dp[i] = [];
    }
    for(let j=0;j<strs.length;j++){
        let ones = 0,zeros = 0;
        for(let k=0;k<strs[j].length;k++){
            let ch = strs[j].charAt(k);
            if(ch =='0'){
                zeros++;
            }else{
                ones++;
            }
        }
        for(let i=m;i>=zeros;i--){
            for(let o =n;o>=ones;o--){
                dp[i][o] = Math.max(dp[i][o],dp[i-zeros][o-ones]+1);
            }
        }
    }
    return dp[m][n];
};
```

``` java
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
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示例 1:
``` md
输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
```
* 物品：硬币
* 物品大小：面额
* 物品价值：数量
因为硬币可以重复使用，因此这是一个完全背包问题。完全背包只需要将 0-1 背包的逆序遍历 dp 数组改为正序遍历即可。
``` js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if(amount==0||coins==null||coins.length==0){
        return 0;
    }
    var dp = new Array(amount+1);
    for(var i=0;i<=amount;i++){
        dp[i] = 0;
    }
    for(var j=0;j<coins.length;j++){
        var coin = coins[i];
        for(var i=coin;i<=amount;i++){//将逆序遍历改为正序遍历
            if(i==coin){
                dp[i]=1; //如果需要组成的金额正好和某个硬币的面额相等
            }else if(dp[i]==0&&dp[i-coin]!=0){  //只有能凑成dp[i - coin]才能凑成dp[i]
                dp[i]=dp[i-coin]+1;
            }else if(dp[i-coin]!=0){
                dp[i] = Math.min(dp[i],dp[i-coin]+1);
            }
        }
    }
    return dp[amount]==0?-1:dp[amount];
};
```
``` java
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
``` md
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```
完全背包问题，使用 dp 记录可达成目标的组合数目。
``` js
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    if(coins==null){
        return 0;
    }
    var dp = [];
    //JavaScript要初始化数组
    for(var i=0;i<=amount;i++){
        dp[i] = 0;
    }
    dp[0] = 1;
    for(var coin of coins){
        for(var i=coin;i<=amount;i++){
            dp[i] +=dp[i-coin];
        }
    }
    return dp[amount];
};
```

``` java
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
给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

说明：
* 拆分时可以重复使用字典中的单词。
* 你可以假设字典中没有重复的单词。
示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

dict 中的单词没有使用次数的限制，因此这是一个完全背包问题。

该问题涉及到字典中单词的使用顺序，也就是说物品必须按一定顺序放入背包中，例如下面的 dict 就不够组成字符串 "leetcode"：
``` md
["lee", "tc", "cod"]
```
求解顺序的完全背包问题时，对物品的迭代应该放在最里层，对背包的迭代放在外层，只有这样才能让物品按一定顺序放入背包中。
``` js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    var n = s.length;
    var dp = [];
    for(let i=0;i<=n;i++){
        dp[i] = false;
    }
    dp[0] = true;
    for(let i=0;i<=n;i++){
        //对物品的迭代放在最里层
        for(var word of wordDict){
            var len = word.length;
            if(len<=i&&word==s.substring(i-len,i)){
                dp[i] = dp[i]||dp[i-len];
            }
        }
    }
    return dp[n];
};
```

``` java
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

### [377.组合综合IV](https://leetcode-cn.com/problems/combination-sum-iv/)
给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。
``` md
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

``` js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
    if(nums==null||nums.length==0){
        return 0;
    }
    var dp = [];
    for(let i=0;i<=target;i++){
        dp[i] = 0;  //初始化为0
    }
    //dp[0]表示组成0，一个数都不选就可以了，所以dp[0]=1
    dp[0]=1;
    nums.sort(function(a,b){return a-b;}); //不加判断会报错 因为js库函数还是较少
    for(let i=1;i<=target;i++){
        for(let j=0;j<=nums.length&&nums[j]<=i;j++){
            dp[i] += dp[i-nums[j]];
        }
    }
    return dp[target];
};
```
``` java
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

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

* 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
* 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:

输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
``` js
function maxProfit(prices){
    if(prices==null||prices.length==0){
        return 0;
    }
    let n = prices.length;
    let dp_i_0=0,dp_i_1=Number.MIN_SAFE_INTEGER;
    let dp_pre_0 = 0; //代表dp[i-2][0]
    for(let i=0;i<n;i++){
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        dp_i_1 = Math.max(dp_i_1,dp_pre_0-prices[i]);
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
var maxProfit = function (prices) {
    if (prices.length == 0) return 0;
    var noHold = 0,
        freeze = 0,
        hold = -prices[0];
    for (var i = 1; i < prices.length; i++) {
        var newNoHold = Math.max(noHold, hold + prices[i]); // 当天不持有的利润为 max(昨天不持有的利润，昨天持有的利润+今天卖出的利润)
        var newHold = Math.max(hold, freeze - prices[i]);// 当天持有的利润为 max(昨天持有的利润，昨天冷冻期或者冷冻期过后的某一天的利润-今天买股票的花费)
        freeze = noHold;// 冷冻期意味着手上没股票，那昨天肯定刚卖出，所以等于昨天不持有的利润
        noHold = newNoHold;
        hold = newHold;
    }
    return Math.max(noHold, freeze, hold);
};
```
``` java
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

``` js
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
    let n = prices.length;
    let dp_i_0 =0,dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<n;i++){
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        dp_i_1 = Math.max(dp_i_1,temp-prices[i]-fee);
    }
    return dp_i_0;
};
```
### [123.买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

``` js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    //状态转移方程
    //dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
    //dp[i][k][1] = max(dp[i-1][k][i],dp[i-1][k-1][0]-prices[i])
    let dp_i10 = 0,dp_i11 = Number.MIN_SAFE_INTEGER;
    let dp_i20 = 0,dp_i21 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<prices.length;i++){
        let price = prices[i];
        dp_i20 = Math.max(dp_i20,dp_i21+price);
        dp_i21 = Math.max(dp_i21,dp_i10-price);
        dp_i10 = Math.max(dp_i10,dp_i11+price);
        dp_i11 = Math.max(dp_i11,-price);
    }
    return dp_i20;
};
```
### [188.只能进行K次的股票交易IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)

``` js
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
    if(k>=n/2){
        let maxProfit = 0;  //退化为普通的股票交易问题
        for(let i=1;i<n;i++){
            if(prices[i]>prices[i-1]){
                maxProfit+=prices[i]-prices[i-1];
            }
        }
        return maxProfit;
    }
    let maxdp = [];
    for(let i=0;i<=k;i++){
        maxdp[i] = [];
        for(let j=0;j<=n;j++){
            maxdp[i][j] = 0; //初始化0 否则报错
        }
    }

    for(let i=1;i<=k;i++){
        let localMax = maxdp[i-1][0]-prices[0];
        for(let j=1;j<n;j++){
            maxdp[i][j] = Math.max(maxdp[i][j-1],prices[j]+localMax);
            localMax = Math.max(localMax,maxdp[i-1][j]-prices[j]);
        }
    }
    return maxdp[k][n-1];
};
```
``` java
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
``` js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let m = word1.length,n=word2.length;
    let dp = [];
    for(let i=0;i<=m;i++){
        dp[i] = [];
        for(let j=0;j<=n;j++){
            dp[i][j] = 0 ; ///初始化 否则NaN
        }
    }
    for(let i =1;i<=m;i++){
        for(let j=1;j<=n;j++){
            if(word1.charCodeAt(i-1)==word2.charCodeAt(j-1)){
                dp[i][j] = dp[i-1][j-1]+1;
            }else{
                dp[i][j] = Math.max(dp[i][j-1],dp[i-1][j]);
            }
        }
    }
    return m+n-2*dp[m][n];
};
```
``` java
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
给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

* 插入一个字符
* 删除一个字符
* 替换一个字符
dp[i][j] 表示word1 的前i个字母和word2的前j个字母之间的编辑距离
当我们获得dp[i-1][j],dp[i][j-1]和dp[i-1][j-1]的值后就可以计算出dp[i][j]，每次只能往单个或者多个字符中插入一个字符：
如果两个子串的最后一个字母相同，word1[i]=word2[i]的情况如下：
``` md
dp[i][j] = 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]-1);
```
否则word1[i]!=word2[i]，我们将考虑替换最后一个字符使得他们相同
``` md
dp[i][j] = 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
```

``` js
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let n = word1.length,m=word2.length;
    //有空字符串
    if(n*m==0){
        return n+m;
    }
    //新建dp数组
    let dp = [];
    for(let i=0;i<=n;i++){
        dp[i] = [];
        for(let j=0;j<=m;j++){
            dp[i][j] = 0; //初始化dp数组
        }
    }
    //初始化
    for(let i=0;i<n+1;i++){
        dp[i][0] = i;
    }

    for(let j=0;j<m+1;j++){
        dp[0][j] = j;
    }
    for(let i=1;i<n+1;i++){
        for(let j=1;j<m+1;j++){
            let left = dp[i-1][j]+1;
            let down = dp[i][j-1]+1;
            let left_down = dp[i-1][j-1];
            if(word1.charCodeAt(i-1)!=word2.charCodeAt(j-1)){
                left_down+=1;
            }
            dp[i][j] = Math.min(left,Math.min(down,left_down));
        }
    }
    return dp[n][m];
};
```
``` java
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



[大神解答](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/yi-ge-fang-fa-tuan-mie-6-dao-gu-piao-wen-ti-by-lab/)

状态转移方程:
``` md
base case：
dp[-1][k][0] = dp[i][0][0] = 0
dp[-1][k][1] = dp[i][0][1] = -infinity

状态转移方程：
dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
```
第一题
根据状态转移方程
``` js
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
``` js 
var n = prices.length;
var dp = [n][2];
for(let i=0;i<n;i++){
    if(i-1==-1){
        dp[i][0]=0;
        dp[i][1]=-prices[i];
        continue;
    }
    dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]);
    dp[i][1] = Math.max(dp[i-1][1],-prices[i]);
}
return dp[n-1][0];
```
``` java
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
``` js
function maxProfit_k_1(prices){
    var n = prices.length;
    //base case dp[-1][0] = 0,dp[i-1][1] = -infinity;
    var dp_i_0 = 0,dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<n;i++){
        //dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        //dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i])
        dp_i_1 = Math.max(dp_i_1,-prices[i]);
    }
    return dp_i_0;
}
```
``` java

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
<b>第二题 k=±Infinity</b>
K为无穷大，那么就可以认为k和k-1是一样的，改写框架
``` md
dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
            = max(dp[i-1][k][1],dp[i-1][k][0]-prices[i])
我们发现数组中的k已经不会改变了，也就是说不需要记录K这个状态了
dp[i][0] = max(dp[i-1][0],dp[i-1][i]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i])
```
转换为代码
``` js
function maxProfit_k_inf(prices){
    let n = prices.length;
    let dp_i_0 = 0,dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<n;i++){
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        dp_i_1 = Math.max(dp_i_1,temp-prices[i]);
    }
    return dp_i_0;
}
```
``` java
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
<b>第三题:k=+Infinity with cooldown</b>
每次sell之后需要等一天才能继续交易。只需把这个特点融入上一题的状态转移方程即可：
``` js
dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-2][0]-prices[i])
解释:第i天选择buy的时候，要从i-2的状态转移，而不是i-1
```
转换为代码：
``` js
function maxProfit_with_cool(prices){
    let n = prices.length;
    let dp_i_0 = 0,dp_i_1 = Number.MIN_SAFE_INTEGER;
    let dp_pre_0 = 0; //代表dp[i-2][0]
    for(let i=0;i<n;i++){
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        dp_i_1 = Math.max(dp_i_1,dp_pre_0-prices[i]);
        dp_pre_0 = temp;
    }
    return dp_i_0;
}
```
``` java
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
<b>第四题：k=infinity with fee</b>
每次交易需要支付手续费，只需要把手续费从利润中减去即可，改写方程：
``` md
dp[i][0] = max(dp[i-1][0],dp[i-1][1]+prices[i])
dp[i][1] = max(dp[i-1][1],dp[i-1][0]-prices[i]-fee)
解释：相当于买入股票的价格升高了。在第一个公式中减也是一样的，相当于卖出股票的价格减少了
```
代码实现：
``` js
function maxProfit_with_fee(prices,fee){
    let n = prices.length;
    let dp_i_0 =0,dp_i_1 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<n;i++){
        let temp = dp_i_0;
        dp_i_0 = Math.max(dp_i_0,dp_i_1+prices[i]);
        dp_i_1 = Math.max(dp_i_1,temp-prices[i]-fee);
    }
    return dp_i_0;
}
```
``` java
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
<b>第五题：K=2</b>
k=2和后面讲的K是任意正整数的情况中，对k的处理就凸显出来了
``` md
原始的动态转移方程，没有可简化的地方
dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
dp[i][k][1] = max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
```
穷举算法，穷举所有K的状态
``` js
let n = prices.length;
let max_k = 2;
var dp= []; 
for(let i=0;i<n;i++){
    dp[i] = [];
    for(let j =0;j<max_k;j++){
        dp[i][j] = [];
        for(let k = 0;k<2;k++){
            dp[i][j][k] = [];
        }
    }
}
for(let i=0;i<n;i++){
    for(let k = max_k;k>=1;k--){
        if(i-1==-1){
            //处理base case
            dp[i][k][0] = 0;
            dp[i][k][1] = -prices[i];
            continue;
        }
        dp[i][k][0] = Math.max(dp[i-1][k][0],dp[i-1][k][1]+prices[i]);
        dp[i][k][1] = Math.max(dp[i-1][k-1][1],dp[i-1][k-1][0]-prices[i]);
    }
}
///穷举了n*max_k*2个状态
return dp[n-1][max_k][0];

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    //状态转移方程
    //dp[i][k][0] = max(dp[i-1][k][0],dp[i-1][k][1]+prices[i])
    //dp[i][k][1] = max(dp[i-1][k][i],dp[i-1][k-1][0]-prices[i])
    let dp_i10 = 0,dp_i11 = Number.MIN_SAFE_INTEGER;
    let dp_i20 = 0,dp_i21 = Number.MIN_SAFE_INTEGER;
    for(let i=0;i<prices.length;i++){
        let price = prices[i];
        dp_i20 = Math.max(dp_i20,dp_i21+price);
        dp_i21 = Math.max(dp_i21,dp_i10-price);
        dp_i10 = Math.max(dp_i10,dp_i11+price);
        dp_i11 = Math.max(dp_i11,-price);
    }
    return dp_i20;
};

```

``` java
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

<b>第六题：k=any integer</b>
从k=2开始，如果传入K太大，dp数组过大，一次性交易由买入和卖出构成，至少需要两天，所有有效K不应该超过n/2,如果超过，没有约束作用。相当于k=±infinity
``` js
function maxProfit_k_any(max_k,prices){
    let n = prices.length;
    if(max_k>n/2){
        return maxProfit_k_inf(prices);
    }
    var dp= []; 
    for(let i=0;i<n;i++){
        dp[i] = [];
        for(let j =0;j<max_k;j++){
            dp[i][j] = [];
            for(let k = 0;k<2;k++){
                dp[i][j][k] = [];
            }
        }
    }

    for(let i=0;i<n;i++){
        for(let k=max_k;k>=1;k--){
            if(i-1==-1){
                /* 处理 base case */
                dp[i][k][0] = 0;
                dp[i][k][1] = -prices[i];
                continue;
            }
            dp[i][k][0] = Math.max(dp[i-1][k][0],dp[i-1][k][1]+prices[i]);
            dp[i][k][1] = Math.max(dp[i-1][k][1],dp[i-1][k-1][0]-prices[i])
        }
    }
}
```

``` java
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