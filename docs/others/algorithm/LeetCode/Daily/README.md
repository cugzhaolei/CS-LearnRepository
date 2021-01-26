# Daily Practice

## Day Practice

### [721. 账户合并](https://leetcode-cn.com/problems/accounts-merge/)

给定一个列表 accounts，每个元素 accounts[i]  是一个字符串列表，其中第一个元素 accounts[i][0]  是   名称 (name)，其余元素是 emails 表示该账户的邮箱地址。

现在，我们想合并这些账户。如果两个账户都有一些共同的邮箱地址，则两个账户必定属于同一个人。请注意，即使两个账户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。一个人最初可以拥有任意数量的账户，但其所有账户都具有相同的名称。

合并账户后，按以下格式返回账户：每个账户的第一个元素是名称，其余元素是按字符 ASCII 顺序排列的邮箱地址。账户本身可以以任意顺序返回。

```bash
输入：
accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
输出：
[["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
解释：
第一个和第三个 John 是同一个人，因为他们有共同的邮箱地址 "johnsmith@mail.com"。
第二个 John 和 Mary 是不同的人，因为他们的邮箱地址没有被其他帐户使用。
可以以任何顺序返回这些列表，例如答案 [['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']] 也是正确的。
```

```js
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
  const emailToIndex = new Map();
  const emailToName = new Map();
  let emailsCount = 0;
  for (const account of accounts) {
    const name = account[0];
    const size = account.length;
    for (let i = 1; i < size; i++) {
      const email = account[i];
      if (!emailToIndex.has(email)) {
        emailToIndex.set(email, emailsCount++);
        emailToName.set(email, name);
      }
    }
  }

  const unionFind = new UnionFind(emailsCount);
  for (const account of accounts) {
    const firstEmail = account[1];
    const firstIndex = emailToIndex.get(firstEmail);
    const size = account.length;
    for (let i = 2; i < size; i++) {
      const nextEmail = account[i];
      const nextIndex = emailToIndex.get(nextEmail);
      unionFind.union(firstIndex, nextIndex);
    }
  }

  const indexToEmails = new Map();
  for (const email of emailToIndex.keys()) {
    const index = unionFind.find(emailToIndex.get(email));
    const account = indexToEmails.get(index) ? indexToEmails.get(index) : [];
    account.push(email);
    indexToEmails.set(index, account);
  }

  const merged = [];
  for (const emails of indexToEmails.values()) {
    emails.sort();
    const name = emailToName.get(emails[0]);
    const account = [];
    account.push(name);
    account.push(...emails);
    merged.push(account);
  }
  return merged;
};

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((item, index) => index);
  }

  union(index1, index2) {
    this.parent[this.find(index2)] = this.find(index1);
  }

  find(index) {
    if (this.parent[index] !== index) {
      this.parent[index] = this.find(this.parent[index]);
    }
    return this.parent[index];

    // return parent[index] == index? index:this.find(parent[index]);
  }
}
```

### [628. 三个数的最大乘积](https://leetcode-cn.com/problems/maximum-product-of-three-numbers/)

给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

```bash
示例 1:

输入: [1,2,3]
输出: 6
示例 2:

输入: [1,2,3,4]
输出: 24
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
  // 处理有正有负的情况
  var len = nums.length;
  nums.sort((a, b) => b - a);
  // +-都有
  const max1 = nums[0] * nums[len - 1] * nums[len - 2];
  const max2 = nums[0] * nums[1] * nums[2];

  return Math.max(max1, max2);
};
```

### [1489. 找到最小生成树里的关键边和伪关键边](https://leetcode-cn.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/)

给你一个 n  个点的带权无向连通图，节点编号为 0  到 n-1 ，同时还有一个数组 edges ，其中 edges[i] = [fromi, toi, weighti]  表示在  fromi  和  toi  节点之间有一条带权无向边。最小生成树  (MST) 是给定图中边的一个子集，它连接了所有节点且没有环，而且这些边的权值和最小。

请你找到给定图中最小生成树的所有关键边和伪关键边。如果从图中删去某条边，会导致最小生成树的权值和增加，那么我们就说它是一条关键边。伪关键边则是可能会出现在某些最小生成树中但不会出现在所有最小生成树中的边。

请注意，你可以分别以任意顺序返回关键边的下标和伪关键边的下标。

![img](https://i.loli.net/2021/01/21/pbeV79LF26UX3Dk.png)

输入：n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
输出：[[0,1],[2,3,4,5]]
解释：上图描述了给定图。
下图是所有的最小生成树。

![img](https://i.loli.net/2021/01/21/MdOzxRaUV5NQsEj.png)

注意到第 0 条边和第 1 条边出现在了所有最小生成树中，所以它们是关键边，我们将这两个下标作为输出的第一个列表。
边 2，3，4 和 5 是所有 MST 的剩余边，所以它们是伪关键边。我们将它们作为输出的第二个列表。

[1.找到最小生成树里的关键边和伪关键边](https://leetcode-cn.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/solution/zhao-dao-zui-xiao-sheng-cheng-shu-li-de-gu57q/)

```js
const m = edges.length;
    for (const [i, edge] of edges.entries()) {
        edge.push(i);
    }
    edges.sort((a, b) => a[2] - b[2]);

    // 计算 value
    const uf_std = new UnionFind(n);
    let value = 0;
    for (let i = 0; i < m; i++) {
        if (uf_std.unite(edges[i][0], edges[i][1])) {
            value += edges[i][2];
        }
    }

    const ans = [[], []];

    for (let i = 0; i < m; i++) {
        // 判断是否是关键边
        let uf = new UnionFind(n);
        let v = 0;
        for (let j = 0; j < m; j++) {
            if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
                v += edges[j][2];
            }
        }
        if (uf.setCount !== 1 || (uf.setCount === 1 && v > value)) {
            ans[0].push(edges[i][3]);
            continue;
        }

        // 判断是否是伪关键边
        uf = new UnionFind(n);
        uf.unite(edges[i][0], edges[i][1]);
        v = edges[i][2];
        for (let j = 0; j < m; j++) {
            if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
                v += edges[j][2];
            }
        }
        if (v === value) {
            ans[1].push(edges[i][3]);
        }
    }
    return ans;
};

// 并查集模板
class UnionFind {
    constructor (n) {
        this.parent = new Array(n).fill(0).map((element, index) => index);
        this.size = new Array(n).fill(1);
        // 当前连通分量数目
        this.setCount = n;
    }

    findset (x) {
        if (this.parent[x] === x) {
            return x;
        }
        this.parent[x] = this.findset(this.parent[x]);
        return this.parent[x];
    }

    unite (a, b) {
        let x = this.findset(a), y = this.findset(b);
        if (x === y) {
            return false;
        }
        if (this.size[x] < this.size[y]) {
            [x, y] = [y, x];
        }
        this.parent[y] = x;
        this.size[x] += this.size[y];
        this.setCount -= 1;
        return true;
    }

    connected (a, b) {
        const x = this.findset(a), y = this.findset(b);
        return x === y;
    }
```

### [989. 数组形式的整数加法](https://leetcode-cn.com/problems/add-to-array-form-of-integer/)

对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。

示例 1：

输入：A = [1,2,0,0], K = 34
输出：[1,2,3,4]
解释：1200 + 34 = 1234
示例 2：

输入：A = [2,7,4], K = 181
输出：[4,5,5]
解释：274 + 181 = 455
示例 3：

输入：A = [2,1,5], K = 806
输出：[1,0,2,1]
解释：215 + 806 = 1021
示例 4：

输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
输出：[1,0,0,0,0,0,0,0,0,0,0]
解释：9999999999 + 1 = 10000000000

[官方题解](https://leetcode-cn.com/problems/add-to-array-form-of-integer/solution/shu-zu-xing-shi-de-zheng-shu-jia-fa-by-l-jljp/)

[大神题解](https://leetcode-cn.com/problems/add-to-array-form-of-integer/solution/shu-zu-xing-shi-de-zheng-shu-jia-fa-nei-60pm8/)

```js
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function(A, K) {
    const res = [];
    const len = A.length;
    for(let i=n-1;i>=0||K>0;--i,K=Math.floor(K/10)){
        if(i>=0){
            K+=A[i];
        }
        res.push(K%10);
    }
    res.reverse();
    return res;
};

// 将reverse() 改成 unshift()
var addToArrayForm = function(A, K) {
    // let res = K;
    let ans = [];
    const len = A.length;
    for(let i=len-1;i>=0||K>0;--i,K=Math.floor(K/10)){
        if(i>=0){
            K+=A[i];
        }
        ans.unshift(K%10);
    }
    return ans;
    // const nums = A.join('');
    // return [...(parseInt(nums,10)+K).toString().split('')]; // 超过integr的最大值

};
```
