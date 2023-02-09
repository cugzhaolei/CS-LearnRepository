/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
 var smallestDistancePair = function(nums, k) {
    // 先对nums排序
    // nums.sort((a,b)=>a-b);
    let res = [];
    // 循环嵌套遍历
    // 两层
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            res.push(Math.abs(nums[i]-nums[j]))
        }
    }
    res.sort((a,b)=>a-b)
    return res[k-1]
};

console.log(smallestDistancePair([1,6,1],2))