::: tip
# JS-内存管理

## 内存泄漏

### 原因
* 滥用全局变量：直接用全局变量赋值，在函数中滥用this指向全局对象
* 不销毁定时器和回调
* DOM引用不规范，很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中，往往无法对其进行内存回收，ES6中引入 WeakSet 和 WeakMap 两个新的概念, 来解决引用造成的内存回收问题. WeakSet 和 WeakMap 对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.
* 滥用闭包:
``` js
//滥用闭包引起内存泄漏
var theThing = null;
var replaceThing = fucntion(){
    var originalThing = theThing;
    var unused = fucntion(){
        if(originalThing){ // 对于 originalThing的引用
            console.log("h1");
        }
    };
};
setInterval(replaceThing,1000);

```
### 查看内存泄漏
* 打开开发者工具，选择 Timeline 面板
* 在顶部的Capture字段里面勾选 Memory
* 点击左上角的录制按钮。
* 在页面上进行各种操作，模拟用户的使用情况。
* 一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况
:::

## [MDN] (https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)