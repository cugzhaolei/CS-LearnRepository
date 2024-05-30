/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = -1, right = nums.length-1

    while(left+1<right){
        let mid = Math.floor(left +(right-left)/2)
        if(nums[mid]<nums[nums.length-1]){ // 有序数组打乱
            right = mid
        }else{
            left = mid
        }
    }
    return nums[right]
};

console.log(findMin([3,4,5,1,2]))

console.log(findMin([4,5,6,7,0,1,2]))

console.log(findMin([11,13,15,17]))