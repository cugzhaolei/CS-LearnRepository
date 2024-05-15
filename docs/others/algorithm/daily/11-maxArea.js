/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // 时间复杂度 O(n)
    // 空间复杂度 O(1)
  let len = height.length;
  let left = 0,
    right = len - 1;
  let res = 0;

  while (left < right) {
    let area = Math.min(height[left], height[right]) * (right - left);
     res = Math.max(res, area);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return res;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
