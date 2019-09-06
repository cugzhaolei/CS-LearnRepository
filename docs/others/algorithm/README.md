# 算法
::: tip
## 五大算法
* 贪心算法: 局部最优解法
* 分治算法: 分成多个小模块，与原问题性质相同
* 动态规划: 每个状态都是过去历史的一个总结
* 回溯法: 发现原先选择不优时，退回重新选择
* 分支限界法

## 基础排序算法
<!-- ![](/images/algorithm-sort.jpg) -->
* 冒泡排序
- 两两比较
``` js
function bubleSort(arr){
    let len = arr.length;
    for(let outer = len;outer>=2;outer--){
        for(let inner = 0;inner<outer-1;inner++){
            if(arr[inner]>arr[inner+1]){
                [arr[inner],arr[inner+1]] = [arr[inner+1],arr[inner]];
            }
        }
    }
    return arr;
}
```
* 选择排序
- 遍历自身以后的元素，最小的元素跟自己调换位置
``` js
function selectSort(arr){
    let len = arr.length;
    for(let i = 0;i<len-1;i++){
        for(let j =i;i<len;j++){
            if(arr[j]<arr[i]){
                [arr[i],arr[j]] = [arr[j],arr[i]];
            }
        }
    }
    return arr;
}
```
* 插入排序
- 将元素插入到已排序好的数组
``` js
function insertSort(arr){
    let len = arr.length;
    for(let i =1;i<arr.length;i++){//外循环从1开始，默认arr[0]是有序段
        for(let j=i;j>0;j--){ //j=i 将arr[i]依次插入有序段中
            if(arr[j]<arr[j-1]){
                [arr[j],arr[j-1]] = [arr[j-1],arr[j]];
            }else{
                break;
            }
        }  
        } 
    }
    return arr;
}
```
## 高级排序
* 快速排序
    - 选择基准值(base)，原数组长度减一(基准值)，使用 splice
    - 循环原数组，小的放左边(left数组)，大的放右边(right数组);
    - concat(left, base, right)
    - 递归继续排序 left 与 right
``` js
function quickSort(arr){
    if(arr.length<=1){
        return arr;
    }
    var left = [],right=[],current=arr.splice(0,1);
    for(let i=0;i<arr.length;i++){
        if(arr[i]<current){
            left.push(arr[i]); //放在左边
        }else{
            right.push(arr[i]);//放在右边
        }
    }
    return  quickSort(left).concat(current,quickSort(right));
}
```
* 希尔排序：不定步数的插入排序，插入排序
* 口诀: 插冒归基稳定，快选堆希不稳定

* 稳定性： 同大小情况下是否可能会被交换位置, 虚拟dom的diff，不稳定性会导致重新渲染；
:::

