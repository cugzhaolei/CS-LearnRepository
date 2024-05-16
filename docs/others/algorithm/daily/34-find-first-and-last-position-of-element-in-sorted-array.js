/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var lower_bound = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      // [mid+1,right]
      left = mid + 1;
    } else {
      // [left,mid-1]
      right = mid - 1;
    }
  }

  return left;
};

var lower_bound2 = function (nums, target) {
  let left = 0,
    right = nums.length; // 左闭右开区间 [LEFT,RIGHT)
  while (left < right) {
    // 区间不为空
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      // [mid+1,right）
      left = mid + 1;
    } else {
      // [left,mid)
      right = mid;
    }
  }

  return left;
};

var lower_bound3 = function (nums, target) {
  let left = -1,
    right = nums.length; // 左右开区间 (LEFT,RIGHT)
  while (left + 1 < right) {
    // 区间不为空
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      // (mid,right）
      left = mid;
    } else {
      // (left,mid)
      right = mid;
    }
  }

  return right;
};

// >=
// > -> (>= x+1)
// < -> (>=x-1)
// <= -> (>x -1)

var searchRange = function (nums, target) {
  let start = lower_bound(nums, target);
  if (start == nums.length || nums[start] != target) {
    return [-1, -1];
  }

  let end = lower_bound(nums, target + 1) - 1;

  return [start, end];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
console.log(searchRange([], 0));
console.log(searchRange([1, 2, 2, 3, 4, 4, 5], 2));
