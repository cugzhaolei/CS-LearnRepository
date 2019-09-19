# [贪心算法](https://leetcode-cn.com/tag/greedy/)

贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，他所做出的是在某种意义上的局部最优解。

贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择，选择的贪心策略必须具备无后效性，即某个状态以前的过程不会影响以后的状态，只与当前状态有关。

### [121.买卖股票的最佳时期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

* 解题思路：只要记录前面的最小价格，将这个最小价格作为买入价格，然后将当前的价格作为售出价格，查看当前收益是不是最大收益。
``` js
var maxProfit = function(prices) {
    if(prices==null||prices.length==0||prices[0].length==0){
        return 0;
    }
    let minNum = prices[0];
    let val = 0;
    for(let i=1;i<prices.length;i++){
        let temp = prices[i];
        if(temp<minNum){
            minNum=temp;
        }
        val = Math.max(val,temp-minNum);
    }
    return val;
};
```


## [122.买卖股票的最佳时机II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
只要在上升阶段就开始买入卖出

``` js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length==0||prices==null){
        return 0;
    }
    let val=0;
    for(let i=1;i<prices.length;i++){
        if(prices[i-1]<prices[i]){
            val +=prices[i]-prices[i-1];
        }
    }
    return val;
};
```

``` java
public int maxProfit(int[] prices){
    int maxprofit=0;
    for(int i=1;i<prices.length;i++){
        if(prices[i]>prices[i-1]){
            maxProfit +=prices[i]-prices[i-1]; //赚钱才交易 不赚钱不交易
        }
    }
    return maxProfit;
}
```

## [55.跳跃游戏](https://leetcode-cn.com/problems/jump-game/)

### [贪心算法](https://leetcode-cn.com/problems/jump-game/solution/tiao-yue-you-xi-by-leetcode/)

``` js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums==null||nums.length==0){
        return false;
    }
    let lastPos = nums.length-1;
    for(let i=nums.length-1;i>=0;i--){
        if(i+nums[i]>=lastPos){
            lastPos = i;
        }
    }
    return lastPos == 0;
};
```

``` java
public class Solution {
    public boolean canJump(int[] nums) {
        int lastPos = nums.length - 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (i + nums[i] >= lastPos) {//逐步向前递推
                lastPos = i;
            }
        }
        return lastPos == 0;
    }
}
```
### [自底向上的动态规划](https://leetcode-cn.com/problems/jump-game/solution/tiao-yue-you-xi-by-leetcode/)

``` java
class Solution {
    public boolean canJump(int[] nums) {
        
        if (nums == null) {
            return false;
        }
        boolean[] dp = new boolean[nums.length];
        dp[0] = true;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                // 如果之前的j节点可达，并且从此节点可以到跳到i
                if (dp[j] && nums[j] + j >= i) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[nums.length - 1];
    }
}
作者：yangtianrui95
链接：https://leetcode-cn.com/problems/jump-game/solution/dong-tai-gui-hua-yu-tan-xin-suan-fa-jie-jue-ci-wen/

```
``` c++
bool canJump(vector<int>& nums) 
{
	int k = 0;
	for (int i = 0; i < nums.size(); i++)
	{
		if (i > k) return false;
		k = max(k, i + nums[i]);
	}
	return true;
}
作者：ikaruga
链接：https://leetcode-cn.com/problems/jump-game/solution/55-by-ikaruga/
```

## [45.跳跃游戏II](https://leetcode-cn.com/problems/jump-game-ii/)
给定一个非负整数数组，你最初位于数组的第一个位置。
数组中的每个元素代表你在该位置可以跳跃的最大长度。
你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:
``` md
输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
```
### [顺腾摸瓜](https://leetcode-cn.com/problems/jump-game-ii/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-10/)
我们每次在可跳范围内选择可以使得跳的更远的位置。
如下图，开始的位置是 2，可跳的范围是橙色的。然后因为 3 可以跳的更远，所以跳到 3 的位置。

![](/images/algorithm-greedy-leetcode-45-jump.png)

如下图，然后现在的位置就是 3 了，能跳的范围是橙色的，然后因为 4 可以跳的更远，所以下次跳到 4 的位置。

![](/images/algorithm-greedy-leetcode-45-jump-2.png)

写代码的话，我们用 end 表示当前能跳的边界，对于上边第一个图的橙色 1，第二个图中就是橙色的 4，遍历数组的时候，到了边界，我们就重新更新新的边界。
``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let end=0;
    let maxPosition=0;
    let steps=0;
    for(let i=0;i<nums.length-1;i++){
        //找能够跳的最远的
        maxPosition = Math.max(maxPosition,nums[i]+i);
        if(i==end){//遇到边界 更新边界
            end = maxPosition;
            steps++;
        }
    }
    return steps;
};
```
::: danger
这里要注意一个细节，就是 for 循环中，i < nums.length - 1，少了末尾。因为开始的时候边界是第 0个位置，steps 已经加 1 了。如下图，如果最后一步刚好跳到了末尾，此时 steps 其实不用加 1 了。如果是 i < nums.length，i 遍历到最后的时候，会进入 if 语句中，steps 会多加 1。
![](/images/algorithm-greedy-leetcode-45-jump-3.png)
:::

### [贪心算法BFS](https://leetcode-cn.com/problems/jump-game-ii/solution/tan-xin-suan-fa-by-powcai/)

从一个位置跳到它能跳到的最远位置之间的都只需要一步!所以,如果一开始都能跳到,后面再跳到的肯定步数要变多!
``` js
var jump = function(nums) {
    if(nums.length==1){
        return 0;
    }
    let dp = new Array(nums.length);
    dp.fill(0);
    for(let i=0;i<nums.length;i++){
        for(let j=nums[i];j>0;j++){
            if(i+j>=nums.length-1){
                return dp[i]+1;
            }else if(dp[i+j]==0){
                dp[i+j]=dp[i]+1;
            }else{
                break;
            }
        }
    }
    return 0;
};
```
``` java
class Solution {
    public int jump(int[] nums) {
        if (nums.length == 1) return 0;
        int[] dp = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            for (int j = nums[i]; j > 0; j--) {
                if (i + j >= nums.length - 1) {
                    return dp[i] + 1;
                } else if (dp[i + j] == 0) {
                    dp[i + j] = dp[i] + 1;
                } else {
                    break;
                }
            }
        }
        return 0;
    }
}
```

## [135.分发糖果](https://leetcode-cn.com/problems/candy/)
老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

你需要按照以下要求，帮助老师给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻的孩子中，评分高的孩子必须获得更多的糖果。
那么这样下来，老师至少需要准备多少颗糖果呢？
``` md
示例 1:
输入: [1,0,2]
输出: 5
解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
示例 2:
输入: [1,2,2]
输出: 4
解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件
```
### 暴力解法
遍历数组，同时新建一个candy数组保存每个孩子的糖果数
``` js
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    let candies = new Array(ratings.length);
    candies.fill(1); //每个孩子先发一个糖
    let flag = true; //监测candies是否变化
    let sum = 0;
    while(flag){
        flag = false;
        for(let i=0;i<ratings.length;i++){
            if(i!=ratings.length-1&&ratings[i]>ratings[i+1]&&candies[i]<=candies[i+1]){
                //未到末尾，并且前一个孩子的评分高于后者，但是糖果还少，因此要新增糖果
                candies[i]=candies[i+1]+1;
                flag = true;
            }
            if(i>0&&ratings[i]>ratings[i-1]&&candies[i]<=candies[i-1]){
                //后面的孩子评分高于前者，后者糖果+1
                candies[i]=candies[i-1]+1;
                flag = true;
            }
        }
    }

    for(let candy of candies){
        sum+=candy;
    }
    return sum;
};
```

### [使用一个数组](https://leetcode-cn.com/problems/candy/solution/fen-fa-tang-guo-by-leetcode/)

先每个学生分一块糖，从左到右遍历，只更新评分比左邻居高且糖果小于等于左邻居的

再从右到左遍历
``` js
var candy = function(ratings){
    let candies = new Array(ratings.length);
    candies.fill(1); //每个孩子先发一个
    for(let i=1;i<ratings.length;i++){
        if(ratings[i]>ratings[i-1]){
            candies[i] = candies[i-1]+1;//先从左到右遍历，发现前一个评分低于后一个则增加
        }
    }
    var sum=candies[ratings.length-1];
    for(let i=ratings.length-2;i>=0;i--){
        if(ratings[i]>ratings[i+1]){
            candies[i]=Math.max(candies[i],candies[i+1]+1);
        }
        sum+=candies[i];
    }
    
    return sum;
};
```

## [区间调度问题](https://leetcode-cn.com/problems/non-overlapping-intervals/solution/tan-xin-suan-fa-zhi-qu-jian-diao-du-wen-ti-by-labu/)

正确的思路其实很简单，可以分为以下三步：

1. 从区间集合 intvs 中选择一个区间 x，这个 x 是在当前所有区间中结束最早的（end 最小）。
2. 把所有与 x 区间相交的区间从区间集合 intvs 中删除。
3. 重复步骤 1 和 2，直到 intvs 为空为止。之前选出的那些 x 就是最大不相交子集。
把这个思路实现成算法的话，可以按每个区间的 end 数值升序排序，因为这样处理之后实现步骤 1 和步骤 2 都方便很多:
![](/images/algorithm-LeetCode-greedy-453-1.gif)
现在来实现算法，对于步骤 1，由于我们预先按照 end 排了序，所以选择 x 是很容易的。关键在于，如何去除与 x 相交的区间，选择下一轮循环的 x 呢？

由于我们事先排了序，不难发现所有与 x 相交的区间必然会与 x 的 end 相交；如果一个区间不想与 x 的 end 相交，它的 start 必须要大于（或等于）x 的 end：
![](/images/algorithm-LeetCode-greedy-453-2.jpg)

### [435. 无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
注意:
可以认为区间的终点总是大于它的起点。
区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
``` md
示例 1:
输入: [ [1,2], [2,3], [3,4], [1,3] ]
输出: 1
解释: 移除 [1,3] 后，剩下的区间没有重叠。
```

``` js
var intervalSchedule = function(intvs){
    if(intvs.length==0) return 0;
    //按照end升序排序
    intvs.sort((a,b)=>(a[1]-b[1]));
    //至少有一个区间不相交
    let count = 1;
    //排序后，第一个区间就是X
    let x_end = intvs[0][1];
    for(let interval of intvs){
        let start = interval[0];
        if(start>=x_end){
            //找到下一个选择的区间
            count++;
            x_end = interval[1];
        }
    }
    return count;
};
var eraseOverlapIntervals=function(intervals){
    let n = intervals.length;
    return n-intervalSchedule(intervals);
};
```
``` java
public int intervalSchedule(int[][] intvs) {
    if (intvs.length == 0) return 0;
    // 按 end 升序排序
    Arrays.sort(intvs, new Comparator<int[]>() {
        public int compare(int[] a, int[] b) {
            return a[1] - b[1];
        }
    });
    // 至少有一个区间不相交
    int count = 1;
    // 排序后，第一个区间就是 x
    int x_end = intvs[0][1];
    for (int[] interval : intvs) {
        int start = interval[0];
        if (start >= x_end) {
            // 找到下一个选择的区间了
            count++;
            x_end = interval[1];
        }
    }
    return count;
}
int eraseOverlapIntervals(int[][] intervals) {
    int n = intervals.length;
    return n - intervalSchedule(intervals);
}
```
### [452.最少的箭头射爆气球](https://leetcode-cn.com/problems/non-overlapping-intervals/solution/tan-xin-suan-fa-zhi-qu-jian-diao-du-wen-ti-by-labu/)
这个问题和区间调度算法一模一样！如果最多有 n 个不重叠的区间，那么就至少需要 n 个箭头穿透所有区间：
![](/images/algorithm-LeetCode-greedy-453-3.jpg)
只是有一点不一样，在 intervalSchedule 算法中，如果两个区间的边界触碰，不算重叠；而按照这道题目的描述，箭头如果碰到气球的边界气球也会爆炸，所以说相当于区间的边界触碰也算重叠：
![](/images/algorithm-LeetCode-greedy-453-4.jpg)
对上面的算法稍作修改
``` js
var findMinArrowShots = function(intvs){
    if(intvs.length==0) return 0;
        let n =points.length;
    if(n<=1){
        return n;  //[]的情况
    }
    //按照end升序排序
    intvs.sort((a,b)=>(a[1]-b[1]));
    //至少有一个区间
    let count = 1;
    //排序后 第一个区间就是x
    let x_end = intvs[0][1];
    for(let interval of intvs){
        let start = interval[0];
        //把>=改成>就行了
        if(start>x_end){
            count++;
            x_end = interval[1];
        }
    }
    return count;
};
```
边界接触也算重叠，所以 start == x_end 时不能更新 x。

## [321.拼接最大数](https://leetcode-cn.com/problems/create-maximum-number/)

给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。

求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。

``` js
var maxNumber = function (nums1, nums2, k) {
    if (nums1.length > nums2.length) {
        return maxNumber(nums2, nums1, k);
    }

    var array = new Array(k);

    for (var i = 0; i < array.length; i++) {
        array[i] = -1;
    }

    if (nums1.length + nums2.length == k) {
        return mergeCompare(nums1, nums2, array);
    }

    var k1 = getMaxMToK(nums1, k, k > nums2.length ? k - nums2.length : 0);
    var k2 = getMaxMToK(nums2, k, k > nums1.length ? k - nums1.length : 0);

    for (var i = 0; i < k2.length; i++) {
        if (k - i >= k1.length) {
            //k2更长,可能k1取0个,k2取k个
            if (i == k) {
                array = mergeCompare(k1[0], k2[i], array);
            }
        }
        else {
            array = mergeCompare(k1[k - i], k2[i], array);
        }
    }

    return array;
};

//m,m+1,m+2...k个最大的数字,实际返回k个数组,MaxNumber方法中好处理一点
//
//0 :null
//1 :null
//...
//m :[num_1,num_2,....num_m]
//...
//k :[num_1,num_2,....num_k]
var getMaxMToK = function (nums, k, m) {
    if (k == 0) {
        return [];
    }

    if (k > nums.length) {
        k = nums.length;
    }

    //dp[i]=dp[i+1].removeFirstLeftMinRight();
    var dp = new Array(k + 1);

    for (var i = k; i >= m; i--) {
        if (i == k) {
            dp[i] = getMaxK(nums, i);
        }
        else {
            dp[i] = getMaxK(dp[i + 1], i);
        }
    }

    return dp;
}

var getMaxK = function (nums, k) {
    if (k == 0) {
        return [];
    }

    let size = Math.min(nums.length, k) + 1;
    let dp = new Array(k);

    //先填满
    for (let i = nums.length - 1, m = size - 1; i >= 0 && m >= 1; i-- , m--) {
        dp[m - 1] = nums[i];
    }

    for (let j = nums.length - dp.length - 1; j >= 0; j--) {
        if (nums[j] < dp[0]) {
            continue;
        }

        let start = 0;
        let min = dp[0];

        //干掉第一个比右边小的值
        //如 nums[j]=8  dp={7,5,6,3},移除5得到 dp={8,7,6,3}
        for (let i = 1; i < dp.length; i++) {
            if (min < dp[i]) {
                break;
            }

            start = i;
            min = dp[i];
        }

        for (let i = start; i >= 1; i--) {
            dp[i] = dp[i - 1];
        }

        dp[0] = nums[j];
    }

    return dp;
}

//拼接并比较 reutrn new>old?new:old;
var mergeCompare = function (nums1, nums2, array) {
    var i = 0;
    var j = 0;
    var isBigger = false;
    var newArray = new Array();
    var k = nums1.length + nums2.length;

    while (i + j < k) {
        var index = i + j;

        if (i >= nums1.length) {
            newArray.push(nums2[j++]);
        }
        else if (j >= nums2.length) {
            newArray.push(nums1[i++]);
        }
        else if (nums1[i] > nums2[j]) {
            newArray.push(nums1[i++]);
        }
        else if (nums1[i] == nums2[j]) {
            if (isNums1Bigger(nums1, nums2, i + 1, j + 1)) {
                newArray.push(nums1[i++]);
            }
            else {
                newArray.push(nums2[j++]);
            }
        }
        else {
            newArray.push(nums2[j++]);
        }

        if (!isBigger) {
            if (newArray[index] < array[index]) {
                return array;
            }
            else if (newArray[index] > array[index]) {
                isBigger = true;
            }
        }
    }

    return newArray;
}

//return nums1>nums2
var isNums1Bigger = function (nums1, nums2, i, j) {
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] > nums2[j]) {
            return true;
        }

        if (nums1[i] < nums2[j]) {
            return false;
        }

        i++;
        j++;
    }

    return nums1.length - i - (nums2.length - j) > 0;
}
```

## [406.根据身高和序号重组](https://leetcode-cn.com/problems/queue-reconstruction-by-height/)
参考大神解答：先排序在插入
1. 排序规则：按照先H高度降序，K个数升序排序
2. 遍历排序后的数组，根据K插入到K的位置上

* 核心思想：高个子先站好，矮个子插入到K位置上，前面肯定有K个高个子，矮个子再插到前面也满足K的要求

```java
public int[][] reconstructQueue(int[][] people){
    // [7,0], [7,1], [6,1], [5,0], [5,2], [4,4]
    // 再一个一个插入。
    // [7,0]
    // [7,0], [7,1]
    // [7,0], [6,1], [7,1]
    // [5,0], [7,0], [6,1], [7,1]
    // [5,0], [7,0], [5,2], [6,1], [7,1]
    // [5,0], [7,0], [5,2], [6,1], [4,4], [7,1]
    if(people==null||people.length==0||people[0].length==0){
        return new int[0][0];
    }
                                             //K升序      //高度降序
    Arrays.sort(people,(o1,o2)->o1[0]==o2[0]?o1[1]-o2[1]:o2[0]-o1[0]);
    LinkedList<int[]> list = new LinkedList<>();
    for(int[] i:people){
        list.add(i[1],i);
    }
    return list.toArray(new int[list.size()][2]);
}
```

``` js
var reconstructQueue = function(people) {
    people.sort((a,b)=>(a[0]==b[0]?a[1]-b[1]:b[0]-a[0]));
    let res = [];
    for(let obj of people){
        res.push(obj[1],obj);
    }
    return res;
};
```

## [455.分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

解题思路：
1. 对 g 和 s 升序排序
2. 初始化两个指针 i 和 j 分别指向 g 和 s 初始位置
3. 对比 g[i] 和 s[j]
  * g[i] <= s[j]：饼干满足胃口，把能满足的孩子数量加 1，并移动指针 i = i + 1，j = j + 1
  * g[i] > s[j]：无法满足胃口，j 右移，继续查看下一块饼干是否可以满足胃口
``` js
var findContentChildren = function(g, s) {
    g.sort((a,b)=>(a-b));
    s.sort((a,b)=>(a-b));
    let i=0,j=0;
    while(i<g.length&&j<s.length){
        if(g[i]<=s[j]){
            i++;
            j++;
        }else{
            j++;
        }
    }
    return i;
};
```
## [630.课程表III]()

``` java
	public int scheduleCourse(int[][] courses) {
		Arrays.sort(courses,(a,b)->a[1]-b[1]);
		//新建一个大顶堆
		PriorityQueue<Integer> queue = new PriorityQueue<>((a,b)->b-a);
		int time = 0;
		for(int[] c:courses) {
			//学习时间超过结束时间
			if(c[0]>c[1])
				continue;
			//时间上面能够满足 则添加进去
			if(time+c[0]<=c[1]) {
				queue.add(c[0]);
				time+=c[0];
			}else {
				//如果超出了学习时间 则取出堆顶的与当前比较 学习时间长的被替换
				if(!queue.isEmpty()&&queue.peek()>c[0]) {
					//取出堆顶元素 重新计算时间
					time+=c[0]-queue.poll();
					queue.add(c[0]);
				}
			}
		}
		return queue.size();
	}
```

## [53.子数组的最大和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

``` js
// Kadane算法扫描一次整个数列的所有数值，
// 在每一个扫描点计算以该点数值为结束点的子数列的最大和（正数和）。
// 该子数列由两部分组成：以前一个位置为结束点的最大子数列、该位置的数值。
// 因为该算法用到了“最佳子结构”（以每个位置为终点的最大子数列都是基于其前一位置的最大子数列计算得出, 
// 该算法可看成动态规划的一个例子。
// 状态转移方程：sum[i] = max{sum[i-1]+a[i],a[i]}   
// 其中(sum[i]记录以a[i]为子序列末端的最大序子列连续和)

//作者：lao-hu-8
//链接：https://leetcode-cn.com/problems/maximum-subarray/solution/xiang-xi-jie-du-dong-tai-gui-hua-de-shi-xian-yi-li/

var maxSubArray = function(nums) {
    let ans = nums[0];
    let sum = 0;
    for(let num of nums){
        if(sum>0){
            sum+=num;
        }else{
            sum=num;
        }
        ans = Math.max(ans,sum);
    }
    return ans;
};
```

## [152.乘积最大子序列](https://leetcode-cn.com/problems/maximum-product-subarray/)

给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
``` js
var maxProduct = function(nums) {
    let mul = Number.MIN_SAFE_INTEGER;
    let max = 1;  //当前最大值
    let min = 1;  //当前最小值 因为存在负数 会使最大的变最小 最小的变最大

    for(let num of nums){
        if(num<0){
            //出现负数时需要交换
            let temp = max;
            max = min;
            min = temp;
        }
        max = Math.max(max*num,num);  //当前最大
        min = Math.min(min*num,num);  //当前最小

        mul = Math.max(max,mul);
    }
    return mul;
};
```

## [628.三个数的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/solution/java-by-venom-2/)

考虑到正负数情况
nums.sort((a,b)=>(b-a))  降序排列
//最大的三个正整数： a = nums[0]*nums[1]*nums[2];
//两个大负数+一个最大的正数 b = nums[0]*nums[nums.length-1]*nums[nums.length-2];
``` js
var maximumProduct = function(nums) {
    nums.sort((a,b)=>(b-a));
    let res = 0;
    let n = nums.length;
    let a = nums[0]*nums[1]*nums[2];
    let b = nums[0]*nums[n-1]*nums[n-2];
    return a>b?a:b;
};
```

## [665.非递减数列](https://leetcode-cn.com/problems/non-decreasing-array/)
给定一个长度为 n 的整数数组，你的任务是判断在最多改变 1 个元素的情况下，该数组能否变成一个非递减数列。

我们是这样定义一个非递减数列的： 对于数组中所有的 i (1 <= i < n)，满足 array[i] <= array[i + 1]。
思路：
从头开始遍历，当遇到第一次递减时，处理数组，有三种情况
1. 第一个元素就大于第二个元素，把第一个元素的值改成第二个元素的值
2. 递减数对的第二个数，比数对前一个元素小时，把数对第二个值改成第一个的值
3. 递减数对的第二个数，比数对前一个元素大时，把数对第一个值改成第二个的值
这个递减数对被处理后，重新遍历数组，发现第二个递减数对直接返回False。

``` js
var checkPossibility = function(nums) {
    for(let i=0;i<nums.length-1;i++){
        if(nums[i]>nums[i+1]){
            if(i==0){
                nums[0]=nums[1];
            }else if(nums[i-1]>nums[i+1]){//第i+1个数比前i-1个小 把第i+1个改成第i个
                nums[i+1]=nums[i];
            }else if(nums[i-1]<nums[i+1]){//第i+1个数比前i-1个大 把第i个改成第i-1个
                nums[i]=nums[i-1];
            }
            break;
        }
    }
    for(let i=0;i<nums.length-1;i++){
        if(nums[i]>nums[i+1]){
            return false;
        }
    }
    return true;
};
```

``` java
class Solution {
    public boolean checkPossibility(int[] nums) {
       //换一个思路，不拷贝数组然后排序了,具体分为更改第i个值，还是第i+1个值
        int counts=1;
        for(int i=0;i<nums.length-1;i++)
        {
            if(nums[i]>nums[i+1])
            {
                //第一个值必须变更改的为i，举例：423
                if(i==0)
                {
                    counts--;
                    continue;//结束本次循环
                }
                //更改i，举例1546的5，其实就是i-1,i,i+1可以成为非递减数列
                if(i-1>=0&&nums[i+1]>=nums[i-1])
                {
                    counts--;
                }
                //更改i+1，举例1304，此时i为3，要更改i+1(0)，假如将3改为-1，1和-1还是递减
                //此时就是 i-1，i,i+1无法组成非递减数列，但i-1, i,i+2可以组成非递减数列，这样就让
                // i-1,i,i+1,i+2变成非递减数列。这里的第二种情况就是i+1是数组的最后一个元素了，而i以及i之前的数（i-1，i-2，i-3）都已经按照非递减数列排列好了，那么我们就更改i+1就好，让他比i大即可
                else if((i-1>=0&&i+2<nums.length&&nums[i+2]>=nums[i]&&nums[i+2]>=nums[i-1])||(i + 1 == nums.length-1))
                    counts--;
                else
                    return false;
            }
            if(counts<0)
                    return false;
        }
        return true;
    }
}
```
## [763.分割字符](https://leetcode.com/problems/partition-labels/description/)
字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

``` md
示例 1:
输入: S = "ababcbacadefegdehijhklij"
输出: [9,7,8]
解释:
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
```

``` java
public List<Integer> partitionLabels(String S) {
        // 存放每个字母最后一次在字符串中出现的位置
        int[] last = new int[26];
        for (int i = 0; i < S.length(); ++i) {
            last[S.charAt(i) - 'a'] = i;
        }
        List<Integer> res = new ArrayList<>();
        // preIndex表示上个区间的右端点
        // maxIndex表示当前遍历的字符最后出现位置的最大值
        int preIndex = -1, maxIndex = 0;
        for (int i = 0; i < S.length(); i++) {
            int index = last[S.charAt(i) - 'a'];
            // int index = S.lastIndexOf(S.charAt(i));
            // 更新区间的右端点, 向右延展
            if (index > maxIndex) {
                maxIndex = index;
            }
            // 如果当前位置i等于当前所遍历的字符最后出现位置的最大值
            // 说明maxIndex即为区间的右端点
            if (i == maxIndex) {
                // 添加区间的长度
                res.add(maxIndex - preIndex);
                // 保存当前右端点
                preIndex = maxIndex;
            }
        }
        return res;
    }
```
## [605.种植花朵](https://leetcode-cn.com/problems/can-place-flowers)
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。
``` md
示例 1:

输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
示例 2:

输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
```
解题思路：遍历flowerbed数组，依次判断各位置是否适合种花，判断的标准是当前位置为0，且前一位置为0或其下标为-1，且后一位置为0或其下标为flowerbed.length。若判断为真，则修改flowerbed[]数组当前位置为1，n--。最后若n<=0,则能种下所有花。

``` js
var canPlaceFlowers = function(flowerbed, n) {
    for(let i=0;i<flowered.length;i++){
        if(flowerbed[i]==0&&(i-1==-1||flowerbed[i-1]==0)&&(i+1==flowerbed.length||flowerbed[i+1]==0)){
            flowered[i]=1;n--;
        }
    }
    return n<=0;
};
```
