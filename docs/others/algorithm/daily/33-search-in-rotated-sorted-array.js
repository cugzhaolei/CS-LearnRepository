/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = -1,
    right = nums.length - 1;

  while (left + 1 < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (isBlue(mid, nums, target)) {
      right = mid;
    } else {
      left = mid;
    }
  }
  if (right == nums.length || nums[right] != target) {
    return -1;
  }

  return right;
};



var isBlue = function (i, nums, target) {
  let end = nums[nums.length - 1];
  if (nums[i] > end) {
    return target > end && nums[i] >= target;
  } else {
    return target > end || nums[i] >= target;
  }
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));
console.log(search([0, 1, 2, 4, 5, 6, 7], 3));
console.log(search([4, 5, 6, 7, 0, 1, 2], 2));
console.log(search([4, 5, 6, 7, 0, 1, 2], 4));
console.log(search([4, 5, 6, 7, 0, 1, 2], 5));
console.log(search([4, 5, 6, 7, 0, 1, 2], 6));

console.log(search([2], 0));
