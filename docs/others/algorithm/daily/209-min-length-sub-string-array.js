/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let n = nums.length, ans = n+1;
    let sum = 0,left = 0;

    for(let right=0;right<n;right++){
        sum += nums[right]

        while(sum-nums[left]>=target){
            sum -=nums[left++]
        }

        if(sum>=target){
            ans = Math.min(ans,right-left+1)
        }
    }

    return ans<=n?ans:0;
};

console.log(minSubArrayLen(7,[2,3,1,2,4,3]))
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1]))