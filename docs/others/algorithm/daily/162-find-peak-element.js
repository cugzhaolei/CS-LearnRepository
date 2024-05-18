/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  // [0,n-2]
  // (-1,n-1)

  // 时间复杂度 O(log(n))
  // 空间复杂度 O(1)
  let left = -1,
    right = nums.length - 1;
  while (left + 1 < right) {
    mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // blue
      right = mid;
    } else {
      left = mid;
    }
  }

  return right;
};

console.log(findPeakElement([1, 2, 3, 1]));
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]));
