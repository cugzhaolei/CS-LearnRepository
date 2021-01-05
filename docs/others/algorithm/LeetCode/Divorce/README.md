# [分治](https://blog.csdn.net/qq_21515253/article/details/96216125)

分治，字面上的解释是“分而治之”，就是把一个复杂的问题分成两个或更多的相同或相似的子问题，再把子问题分成更小的子问题……直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。在计算机科学中，分治法就是运用分治思想的一种很重要的算法。

## [241.位运算表达式设计优先级](https://leetcode-cn.com/problems/different-ways-to-add-parentheses)

给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。你需要给出所有可能的组合的结果。有效的运算符号包含 +, -  以及  \* 。

分解成容易解决的子问题：也就是按运算符分成左右两部分，分别计算后，利用分隔符，合并

- 策略

1. 不处理字符串，以 string 形式进行 partition
2. 分割字符串（split），分离出所有参与运算的数字（数量为 n）和符号(数量为 n-1)

(1) 分隔符数量为 string 中符号数
(2) 策略一效率优于策略二
策略一：

```java
public List<Integer> diffWaysToCompute(String input){
    return partition(input);
}
public List<Integer> partition(String input){
    List<Integer> result = new ArrayList<>();
    if(!input.contains("+")&&!input.contains("-")&&!input.contains("*")){
        result.add(Integer.valueOf(input));
        return result;
    }
    for(int i=0;i<input.length();i++){
        if(input.charAt(i)=='+'||input.charAt(i)=='-'||input.charAt(i)=='*'){
            for(Integer left:partition(input.substring(0,i))){
                for(Integer right:partition(input.substring(i+1))){
                    if(input.charAt(i)=='+'){
                        result.add(left+right);
                    }else if(input.charAt(i)=='-'){
                        result.add(left-right);
                    }else  if(input.charAt(i)=='*'){
                        result.add(left*right);
                    }
                }
            }
        }
    }
    return result;
}
```

策略二

```java
ArrayList<Character> op = new  ArrayList<>();
String[] nums;

public void split(String input){
    for(int i=0;i<input.length();i++){
        if(int i=0;i<input.length();i++){
            if(input.charAt(i)=='+'||input.charAt(i)=='-'||input.charAt(i)=='*'){
                op.add(input.charAt(i));
            }
        }
        nums = input.split("[\\+\\-\\*]");
    }
}

public List<Integer> diffWaysToCompute(String input){
    split(input);
    return partition(0,nums.length-1);
}

public List<Integer> partition(int start,int end){
    List<Integer> result = new ArrayList<>();
    if(start == end){
        result.add(Integer.valueOf(nums[start]));
        return result;
    }

    for(int i=start;i<end;i++){
        for(Integer left:partition(start,i)){
            for(Integer right:partition(i+1,end)){
                if(op.get(i)=='+'){
                    result.add(left+right);
                }else if(op.get(i)=='-'){
                    result.add(left-right);
                }else if(op.get(i)=='*'){
                    result.add(left*right);
                }
            }
        }
    }
    return result;
}
```

## [95.不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/)

[递归解答](https://leetcode-cn.com/problems/unique-binary-search-trees-ii/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-2-7/)

```java
public List<TreeNode> generateTrees(int n){
    List<TreeNode> ans = new ArrayList<TreeNode>();
    if(n==0){
        return ans;
    }
    return getAns(1,n);
}

public List<TreeNode> getAns(int start,int end){
    List<TreeNode> ans = new ArrayList<TreeNode>();
    //此时没有数字，null加入结果
    if(start>end){
        ans.add(null);
        return ans;
    }
    //只有一个数字，当前数字作为一棵树加入结果中
    if(start==end){
        TreeNode tree = new TreeNode(start);
        ans.add(tree);
        return ans;
    }
    //尝试每个数字作为根节点
    for(int i=start;i<=end;i++){
        //得到所有可能的左子树
        List<TreeNode> leftTrees = getAns(start,i-1);
        //得到所有可能的右子树
        List<TreeNode> rightTrees = getAns(i+1,end);
        //左子树右子树两两组合
        for(TreeNode leftTree:leftTrees){
            for(TreeNode rightTree:rightTrees){
                TreeNode root = new TreeNode(i);
                root.left = leftTree;
                root.right =  rightTree;
                //加入到最终结果zhong
                ans.add(root);
            }
        }
    }
    return ans;
}
```

动态规划
