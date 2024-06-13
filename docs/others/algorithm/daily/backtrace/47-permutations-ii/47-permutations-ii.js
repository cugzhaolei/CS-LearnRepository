/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    let n = nums.length
    let ans = [];
    let path = new Array(n).fill(0)

    let dfs = (i, s) => {
        if (i == n) {
            ans.push(s.slice())
            return;
        }

        for (let k = 0; k < n; ++k) {
            if (path[k] || (k > 0 && nums[k] === nums[k - 1] && !path[k - 1])) {
                continue
            }
            s.push(nums[k])
            path[k] = 1
            dfs(i + 1, s)
            path[k] = 0
            s.pop()
        }
    }

    nums.sort((x, y) => x - y)
    dfs(0, [])
    return ans
};