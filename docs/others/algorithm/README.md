# 算法
::: tip

## [算法模式](./mode/)

## [LeetCode](./LeetCode/)

## 五大算法
* 贪心算法: 局部最优解法
* 分治算法: 分成多个小模块，与原问题性质相同
* 动态规划: 每个状态都是过去历史的一个总结
* 回溯法: 发现原先选择不优时，退回重新选择
* 分支限界法

## 基础排序算法
![](/images/algorithm-sort.jpg)
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
改进后的冒泡排序
如果从内循环减去外循环中已跑过的轮数，就可以避免内循环中所有不必要的比较
``` js
function bubleSort(arr){
    let len = arr.length;
    for(let outer = len;outer>=2;outer--){
        for(let inner = 0;inner<len-outer-1;inner++){
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
* 归并排序
- 归并排序性能不错，其复杂度为O(nlogn)
::: tip
JavaScript的Array类定义了一个sort函数（ Array.prototype.sort）用以排序JavaScript数组（我们不必自己实现这个算法）。 ECMAScript没有定义用哪个排序算法，所以浏览器厂商可以自行去实现算法。例如， Mozilla Firefox使用归并排序作为Array.prototype.sort的实现，而Chrome使用了一个快速排序.
:::
归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
``` js
this.mergeSort = function(){
    array = mergeSortRec(array);
};
var mergeSortRec = function(array){
    var length = array.length;
    if(length===1){
        return array;  
    }
    var mid = Math.floor(length/2),
        left = array.slice(0,mid),
        right = array.slice(mid,length);
    
    return merge(mergeSortRec(left),mergeSortRec(right));
};
var merge = function(left, right){
    var result = [], // {7}
    il = 0,
    ir = 0;
    while(il < left.length && ir < right.length) { // {8}
        if(left[il] < right[ir]) {
            result.push(left[il++]); // {9}
        } else{
            result.push(right[ir++]); // {10}
        }
    }
    while (il < left.length){ // {11}
        result.push(left[il++]);
    }
    while (ir < right.length){ // {12}
        result.push(right[ir++]);
    }
    return result; // {13}
};
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
* 堆排序
堆排序也是一种很高效的算法，因其把数组当作二叉树来排序而得名。这个算法会根据以下信息，把数组当作二叉树来管理。
*  索引0是树的根节点；
*  除根节点外，任意节点N的父节点是N/2；
*  节点L的左子节点是2*L；
*  节点R的右子节点是2*R+1。
举例来说，可以将数组[3, 5, 1, 6, 4, 7, 2]想象成下面的树：
![](/images/datastructure-sort-heapsort-tree.png)

``` js
this.heapSort = function(){
    var heapSize = array.length;
    buildTree(array);               //{1}
    while(heapSize>1){
        heapSize--;
        swap(array,0,heapSize);     //{2}
        heapify(array,heapSize,0);  //{3}
    }
};
var swap = function(array,index1,index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
};
```
第一步，构造一个满足array[parent(i)] ≥ array[i]的堆结构（行{1}）。
第二步，交换堆里第一个元素（数组中较大的值）和最后一个元素的位置（行{2}）。这样，最大的值就会出现在它已排序的位置。
第二步可能会丢掉堆的属性。因此，我们还需要执行一个heapify函数，再次将数组转换成堆，也就是说，它会找到当前堆的根节点（较小的值），重新放到树的底部。
``` js
var buildHeap = function(array){
    var heapSize = array.length;
    for(let i=Math.floor(array.length/2);i>=0;i--){
        heapify(array,heapSize,1);
    }
};
var heapify = function(array){
    var left = i*2+1,
        right = i*2+2,
        largest = i;
        if(left<heapSize&&array[left]>array[largest]){
            largest = left;
        }
        if(right<heapSize&&array[right]>array[left]){
            largest = right;
        }

        if(largest !==i){
            swap(array,i,largest);
            heapify(array,heapSize,largest);
        }
};
```
过程图解如下：
![](/images/datastructure-sort-heapsort-tree2.png)

构造完毕的堆排序过程如图所示：
![](/images/datastructure-sort-heapsort-tree3.jpg)


* 希尔排序：不定步数的插入排序，插入排序
* 口诀: 插冒归基稳定，快选堆希不稳定

* 稳定性： 同大小情况下是否可能会被交换位置, 虚拟dom的diff，不稳定性会导致重新渲染；
:::

