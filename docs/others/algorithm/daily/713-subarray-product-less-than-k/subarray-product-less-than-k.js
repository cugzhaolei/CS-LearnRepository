/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    if(k<=1){
        return 0;
    }

    let ans = 0,prod = 1,left = 0;
    for(let right=0;right<nums.length;right++){
        prod *= nums[right]
        while(prod>=k){
            prod /= nums[left++]
        }

        ans+= right-left+1
    }

    return ans
};

console.log(numSubarrayProductLessThanK([10,5,2,6],100))
console.log(numSubarrayProductLessThanK([1,2,3],0))