/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = {}; //new Array(s.length).fill(0); // key:char value:int
  let ans = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    let key = s[right];
    if (!map[key]) {
      map[key] = 0;
    }
    map[key] += 1;
    while (map[key] > 1) {
      let l = s[left];
      map[l] -= 1;
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }

  return ans;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
