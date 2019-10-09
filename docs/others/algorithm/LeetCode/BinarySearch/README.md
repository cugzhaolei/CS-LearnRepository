# 二分查找
``` js
var binarySearch = function(nums,key){
    let l=0,h=nums.length-1;
    while(l<=h){
        let m = l+(h-l)/2;
        if(nums[m]==key){
            return m;
        }else if(nums[m]>key){
            h=m-1;
        }else{
            l=m+1;
        }
    }
    return -1;
}
```

## [69.求开方](https://leetcode-cn.com/problems/sqrtx/)

计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

一个数 x 的开方 sqrt 一定在 0 ~ x 之间，并且满足 sqrt == x / sqrt。可以利用二分查找在 0 ~ x 之间查找 sqrt。

对于 x = 8，它的开方是 2.82842...，最后应该返回 2 而不是 3。在循环条件为 l <= h 并且循环退出时，h 总是比 l 小 1，也就是说 h = 2，l = 3，因此最后的返回值应该为 h 而不是 l。
``` js
var mySqrt = function(x) {
    if(x<=1){
        return x;
    }
    return parseInt(Math.sqrt(x));
};
```
[大佬的解法](https://leetcode-cn.com/problems/sqrtx/solution/javascript-xde-ping-fang-gen-by-rhinoc/)
```java
public int mySqrt(int x){
    if(x<=1){
        return x;
    }
    int l = 1,h=x;
    while(l<=h){
        int mid = l+(h-l)/2;
        int sqrt = x/mid;
        if(sqrt==mid){
            return mid;
        }else if(mid>sqrt){
            h = mid-1;
        }else{
            l=mid+1;
        }
    }
    return h;
}
```

## [744.大于给定元素的最小元素](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)
给定一个只包含小写字母的有序数组letters 和一个目标字母 target，寻找有序数组里面比目标字母大的最小字母。

数组里字母的顺序是循环的。举个例子，如果目标字母target = 'z' 并且有序数组为 letters = ['a', 'b']，则答案返回 'a'。
分情况讨论：
1. 如果letters[0]>target||letters[letters.length-1]<=target说明letters[0]就是我们需要查找的字符串
2. 先取mid = left+(right+left)/2;
   + 如果letters[mid]==target.由于有序数组，说明需要在右边查找，left = mid+1;
   + 如果letters[mid]<target,由于是有序数组，说明需要在右边查找，left = mid+1;
   + 当letters[mid]>target,需要分情况讨论，如果letters[mid-1]<=target,说明letters[mid]就是我们需要查找的字符，返回即可，否则，我们需要继续在左边查找，left = mid-1;

``` js
var nextGreatestLetter = function(letters, target) {
    let n = letters.length;
    let l = 0,h=n-1;
    while(l<=h){
        let mid = parseInt(l+(h-l)/2);
        if(letters[mid]<=target){
            l = mid+1;
        }else{
            h = mid-1;
        }
    }
    return l<n?letters[l]:letters[0];
};
```

``` js
var nextGreatestLetter = function(letters, target) {
    if(letters[0]>target||letters[letters.length-1]<=target){
        return letters[0];
    }
    let left = 1,right = letters.length-1;
    while(left<=right){
        let mid = left+(right-left)/2;
        if(letters[left]<=target){
            left = mid+1;
        }else{
            if(letters[mid-1]<=target){
                return letters[mid];
            }else{
                right = mid-1;
            }
        }
    }
    return ' ';
};
```
### [540.有序数组中的单一元素](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。
[解题思路](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/solution/java-er-fen-fa-0msji-bai-liao-10000-by-qiu-offer-3/)

``` js
var singleNonDuplicate = function(nums) {
    let l = 0,r = nums.length-1;
    while(l<r){
        let h = parseInt((r+l)/2);  //取中间的数
        if(h%2==1){       //中间数下标为基数 前后元素为奇数
            if(nums[h]==nums[h+1]){  //奇数时 唯一数处于前h-1,反之处于后h+1
                r = h-1;
            }else{
                l = h+1;
            }
        }else{            //中间数为偶数 剩余数为偶数
            if(nums[h]==nums[h+1]){  //唯一数处于后h+2 反之处于前h，就是要保证剩余查找元素个数为奇数
                l=h+2;
            }else{
                r = h;
            }
        }
    }
    return nums[l]
};
```
最简单的办法：
``` js
var singleNonDuplicate = function(nums) {
    let result = 0;
    for(let i=0;i<nums.length/2;i++){
        if(nums[i*2]!==nums[i*2+1]){
            result = nums[i*2];
            break;
        }
    }
    return result;
};
```
### [278.第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

1. 线性扫描 超时
``` js
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        for(let i=1;i<n;i++){
            if(isBadVersion(i)){
                return i;
            }
        }
    };
};
```
2. 二分查找
``` js
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let left = 1,right = n;
        while(left<right){
            let mid = left+parseInt((right-left)/2);
            if(isBadVersion(mid)){
                right = mid;
            }else{
                left = mid+1;
            }
        }
        return left;
    };
};
```

``` java
public int firstBadVersion(int n) {
    int left = 1;
    int right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

### [153.寻找旋转排序数组的中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)

假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
请找出其中最小的元素。
你可以假设数组中不存在重复元素。

1. Leetcode官方解法，寻找变化点
变化点特点：
+ 所有变化点左侧元素>数组的第一个元素
+ 所有变化点右侧元素<数组的第一个元素

算法：

+ 寻找数组的中间元素 mid;
+ 如果中间元素>数组第一个元素，需要在mid右边搜索变化点
+ 如果中间元素<数组第一个元素，需要在mid左边搜索变化点
+ 当我们找到变化点时停止搜索，当以下条件满足任意一个即可：
    + nums[mid] > nums[mid + 1]，因此 mid+1 是最小值。
    + nums[mid - 1] > nums[mid]，因此 mid 是最小值。

``` java
public int findMin(int[] nums){
    //如果数组中只有一个元素 直接返回
    if(nums.length==1){
        return nums[0];
    }
    //初始化左边和右边的指针
    int left = 0,right = nums.length-1;

    //如果最后一个元素比第一个元素大，则未发生旋转
    //例如： 1<2<3<4<5<6<7
    //最小元素即为第一个元素
    if(nums[right]>nums[0]){
        return nums[0];
    }

    //二分查找
    while(left<=right){
        //找到中位数
        int mid = left + (right-left)/2;

        if(nums[mid]>nums[mid+1]){
            return nums[mid+1];
        }

        if(nums[mid-1]>nums[mid]){
            return nums[mid];
        }

        if(nums[mid]>nums[0]){//往右边找
            left = mid+1;
        }else{
            right = mid-1;    //左边找
        }
    }
    return -1;
}
```
``` js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    nums.sort((a,b)=>(a-b));
    return nums[0];
};
```

### [34.排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

``` js
var searchRange = function(nums, target) {
    let first = binarySearch(nums,target);
    let last = binarySearch(nums,target+1)-1;
    if(first==nums.length||nums[first]!=target){
        return [-1,-1];
    }else{
        return [].concat(first,Math.max(first,last));
    }
};

var binarySearch = function(nums,target){
    let left = 0,right = nums.length;
    while(left<right){
        let mid = left + parseInt((right-left)/2);
        if(nums[mid]>=target){
            right = mid;
        }else{
            left = mid+1;
        }
    }
    return left;
};
```

