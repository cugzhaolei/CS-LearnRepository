# BackTrace(回溯)

## 排列组合

### [357. 计算各个位数不同的数字个数](https://leetcode-cn.com/problems/count-numbers-with-unique-digits/submissions/)

给定一个非负整数 n，计算各位数字都不同的数字 x 的个数，其中 0 ≤ x < 10n 。

```js
function countNumbersWithUniqueDigits(self, n) {
  if (n == 0) {
    return 1;
  }
  n = Math.min(n, 10);
  var res = 10;
  var cur = 9;
  var k = 9;

  for (let i = 1; i < n; ++i) {
    cur *= k;
    k--;
    res += cur;
  }
  return res;
}
```
