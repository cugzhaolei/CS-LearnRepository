/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let len = height.length;
  let pre_max = new Array(len).fill(0);
  let suf_max = new Array(len).fill(0);

  pre_max[0] = height[0];
  suf_max[len - 1] = height[len - 1];

  for (let i = 1; i < len; i++) {
    pre_max[i] = Math.max(pre_max[i - 1], height[i]);
  }

  for (let j = len - 2; j >= 0; j--) {
    suf_max[j] = Math.max(suf_max[j + 1], height[j]);
  }

  let ans = 0;
  for(let k = 0;k<len;k++){
    let h = height[k];
    let pre = pre_max[k]
    let suf = suf_max[k];

    ans +=(Math.min(pre,suf)-h)
  }

  return ans;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(trap([4,2,0,3,2,5]))

// 优化空间
var trap2 = function(height){
    let n = height.length;
    let ans = 0
    let left = 0,right = n-1;
    let pre_max = 0,suf_max = 0;

    while(left<=right){
        pre_max = Math.max(pre_max,height[left])
        suf_max = Math.max(suf_max,height[right])

        if(pre_max<suf_max){
            ans += pre_max-height[left]
            left++
        }else{
            ans +=suf_max-height[right]
            right--
        }
    }

    return ans;
}

console.log(trap2([0,1,0,2,1,0,1,3,2,1,2,1]))
console.log(trap2([4,2,0,3,2,5]))
