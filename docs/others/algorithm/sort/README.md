# 常用算法

::: tip

## [排序](https://juejin.cn/post/6856546833025237006#heading-1)

### 冒泡排序

从最外层循环开始，每次比较相邻两个数字的大小

```js
let bubbleSort = function(arr, pivot = 0) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return pivot ? arr.reverse() : arr;
};

let arr = [5, 1, 6, 7, 12, 36, 71, 9, 35, 4, 68];
console.log(bubbleSort(arr, 0)); // (11) [1, 4, 5, 6, 7, 9, 12, 35, 36, 68, 71]
```

### 计数排序

把数组元素作为数组的下标，用一个临时数组统计该元素出现的次数(数据必须是整数，而且最大最小值的差值不要过大)

- 计算出差值 d,最小值小于 0.加上本身
- 创建统计数组并统计对应元素个数
- 统计数组做变形，后面的元素等于前面的元素之和，也就是排名数组
- 遍历原始数组，从统计数组中找到正确位置，输出到结果数组

```js
let countSort = function(arr, pivot = 0) {
  let min = arr[0];
  let max = arr[0];
  let len = arr.length;
  // 求极值
  for (let i = 0; i < len; i++) {
    max = Math.max(arr[i], max);
    min = Math.min(arr[i], min);
  }
  // 1 计算差值d,最小值小于0 加上自身 add
  let d = max - min,
    add = min < 0 ? -min : 0;
  // 2.创建统计数组并统计对应元素个数
  let countArray = new Array(d + 1 + add).fill(0);
  for (let i = 0; i < len; i++) {
    let temp = arr[i] - min + add;
    countArray[temp] += 1;
  }

  // 3.统计数组变形 后面的元素等于前面元素之和，也就是排名数组
  let sum = 0;

  // 遍历countArray长度
  for (let i = 0; i < d + 1 + add; i++) {
    sum += countArray[i];
    countArray[i] = sum;
  }
  let res = new Array(len);

  // 4.遍历原始数组，从统计数组中找到正确的位置 输出数组结果
  for (let i = 0; i < len; i++) {
    let temp = arr[i] - min + add;
    res[countArray[temp] - 1] = arr[i];
    countArray[temp]--;
  }
  return pivot ? res.reverse() : res;
};

let arr = [5, 1, 6, 7, 12, 36, 71, 9, 35, 4, 68, -12, -85, 0];
console.log(countSort(arr, 0)); // (14) [-85, -12, 0, 1, 4, 5, 6, 7, 9, 12, 35, 36, 68, 71]
```

### 快速排序

将要排序的数组分成两部分，一部分比基准大，一部分比基准小，分别对两部分做排序。排序结束后合并排序结果

- 选择数组中间数作为基数,并取出该值
- 准备两个数组，逐个对比基数值，较小的放左，较大的放右
- 地柜处理两个数组的元素，并将处理后的数据按照基数大小合并成一个数组

```js
let quickSort = function(arr) {
  //  当数组长度《=1 提前结束
  if (arr.length <= 1) return arr;
  // 取数组中间值的索引 向下取整
  let index = Math.floor(arr.length / 2);
  // 取中间值的索引，第一个参数为截取的索引，第二个为截取的长度
  // 如果使用 pivot = arr[index]; 将会出现无限循环
  let pivot = arr.splice(index, 1)[0],
    left = [],
    right = [];
  console.log(pivot, arr, index);
  for (let i = 0; i < arr.length; i++) {
    if (pivot > arr[i]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};

let arr = [5, 1, 6, 7, 12, 36, 71, 9, 35, 4, 68, -12, -85, 0];
console.log(quickSort(arr)); // [-85, -12, 0, 1, 4, 5, 6, 7, 9, 12, 35, 36, 68, 71]
```

### 归并排序

将两个有序数组合并成一个有序数组，先递归分解数组，在合并数列（分治）

- 将一个数组拆解成两个数组，不断递归拆分，直到每个数组只有一个元素为止。
- 拆解过程中不断分解 比较

```js
let merge = function(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
};

let mergeSort = function(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);

  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  let mergeLeftArray = mergeSort(left);
  let mergeRightArray = mergeSort(right);

  return merge(mergeLeftArray, mergeRightArray);
};

let arr = [5, 1, 6, 7, 12, 36, 71, 9, 35, 4, 68, -12, -85, 0];
console.log(mergeSort(arr)); // [-85, -12, 0, 1, 4, 5, 6, 7, 9, 12, 35, 36, 68, 71]
```

### 插入排序

通过构建有序序列，对未排序的数据，在已排序序列中从后向前扫描，插入数据

- 从第一个元素开始，该元素可以认为已经被排序；
- 取出下一个元素，在已排序的元素序列中从后向前扫描；
- 如果该元素（已排序）大于新元素，将该元素移动到下一位置；
- 重复步骤 3，直到找到已排序元素小于或者等于新元素的位置；
- 重复 2-5

```js
let insertSort = function(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    // 取第一个元素 开始排序
    let preIndex = i - 1,
      cur = arr[i];
    // 如果当前值小于前面的值 并且存在 就往前移动
    while (preIndex >= 0 && arr[preIndex] > cur) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    // 将值插入到排序的数组中
    arr[preIndex + 1] = cur;
  }
  return arr;
};

let arr = [1, 4, 41, 23, 67, 8, 42, 38, -15, 69, 73, 55];
console.log(insertSort(arr)); //  (12) [-15, 1, 4, 8, 23, 38, 41, 42, 55, 67, 69, 73]
```

### 选择排序

从待排序的数组元素中选择最大（最小）的一个元素作为首元素，直到排完为止

- 有 n 个数，需要排序 n-1 次
- 第一次选择最小值，放在第一位
- 第二次选择最小值，放在第二位
- 不断重复
- 第 n-1 次选择最小值，放在 n-1 位

```js
let selectSort = function(arr,pivot = 0){
  let len = arr.length,
    temp = 0;
  
  // 筛选
  for(let i=0;i<len-1;i++){
    temp = i;
    for(let j = i+1;j<len;j++){
      if(arr[j]<arr[temp]){
        temp = j;
      }
      // 取到最小的值
      if(temp!==i){
        [arr[i],arr[temp]] = [arr[temp],arr[i]];
      }
    }
    return pivot?arr.reverse():arr;
  }
}

let arr = [5,0,14,56,-45,36,79,25,37,102,-14];
console.log(selectSort(arr,1)); //
```

### 希尔排序

```js
let shellSort = function(arr){
  if(arr==null||arr.length<2){
    return arr;
  }
  let len = arr.length;
  // 对每组间隔为h的分组进行排序，刚开始 h=n/2;
  for(let h = len/2;h>0;h/2){
    // 对每个局部分组进行插入排序
    for(let i = h;i<len;i++){
      // 将arr[i]插入到所在分组的正确位置上
      insertArr(arr,h,i);
    }
  }
  return arr;
}
// 将arr[i]插入到所在分组的正确位置上
// arr[i]所在的分组为... arr[i2*h],arr[i-h],arr[i+h]...
let insertArr = function(arr,h,i){
  let temp = arr[i],k;
  for(k = i-h;k>0&&temp<arr[k];k-=h){
    arr[k+h]=arr[k];
  }
  arr[k+h]=temp;
}
```

## 搜索

:::

## 参考连接

[1.必学十大经典排序算法，看这篇就够了(附完整代码动图优质文章)](https://zhuanlan.zhihu.com/p/57088609)
