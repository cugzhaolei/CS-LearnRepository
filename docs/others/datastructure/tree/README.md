# 树

## [二叉树](https://segmentfault.com/a/1190000014743964?utm_source=tag-newest)

### 二叉树定义

``` java
public class BinaryTreeNode {
    private int data;  //数据
    private BinaryTreeNode leftChirld;  //左孩子
    private BinaryTreeNode rightChirld; //右孩子
    
    public int getData() {
        return data;
    }
    public void setData(int data) {
        this.data = data;
    }
    public BinaryTreeNode getLeftChild() {
        return leftChirld;
    }
    public void setLeftChirld(BinaryTreeNode leftChirld) {
        this.leftChirld = leftChirld;
    }
    public BinaryTreeNode getRightChild() {
        return rightChirld;
    }
    public void setRightChirld(BinaryTreeNode rightChirld) {
        this.rightChirld = rightChirld;
    }        
}
```

### 初始化
``` java
public class BinaryTree {
    private BinaryTreeNode root;
    
    //初始化二叉树
    public BinaryTree(){}
    
    public BinaryTree(BinaryTreeNode root){
        this.root = root;
    }
    
    public void setRoot(BinaryTreeNode root){
        this.root = root;
    }
    
    public BinaryTreeNode getRoot(){
        return root;
    }
}
  /**
     * 二叉树的清空：
     * 首先提供一个清空以某个节点为根节点的子树的方法，既递归地删除每个节点；
     * 接着提供一个删除树的方法，直接通过第一种方法删除到根节点即可
     */
    //清除某个子树的所有节点
    public void clear(BinaryTreeNode node){
        if(node!=null){
            clear(node.getLeftChild());
            clear(node.getRightChild());
            node = null; //删除节点
        }
    }
    //清空树
    public void clear(){
        clear(root);
    }

    //判断二叉树是否为空
    public boolean isEmpty(){
        return root == null;
    }

     /**
     * 求二叉树的高度：
     * 首先要一种获取以某个节点为子树的高度的方法，使用递归调用。
     * 如果一个节点为空，那么这个节点肯定是一颗空树，高度为0；
     * 如果不为空，那么我们要遍历地比较它的左子树高度和右子树高度，
     *     高的一个为这个子树的最大高度，然后加上自己本身的高度就是了
     * 获取二叉树的高度，只需要调用第一种方法，即传入根节点
     */
    
    //获取二叉树的高度
    public int height(){
        return height(root);
    }
    
    //获取以某节点为子树的高度
    public int height(BinaryTreeNode node){
        if(node==null){
            return 0; //递归结束，空子树高度为0
        }else{
            //递归获取左子树高度
            int l = height(node.getLeftChild());
            //递归获取右子树高度
            int r = height(node.getRightChild());
            //高度应该算更高的一边，（+1是因为要算上自身这一层）
            return l>r? (l+1):(r+1);
        }
    }

   /**
    * 获取二叉树的节点数
    */
    public int size(){
        return size(root);
    }
    /**
     * 求二叉树的节点数：
     * 求节点数时，我们看看获取某个节点为子树的节点数的实现。
     * 首先节点为空，则个数肯定为0；
     * 如果不为空，那就算上这个节点之后继续递归所有左右子树的子节点数，
     *    全部相加就是以所给节点为根的子树的节点数
     * 如果求二叉树的节点数，则输入根节点即可
     */
    
    public int size(BinaryTreeNode node){
        if(node==null){
            return 0;  //如果节点为空，则返回节点数为0
        }else{
            //计算本节点 所以要+1
            //递归获取左子树节点数和右子树节点数，最终相加
            return 1+size(node.getLeftChirld())+size(node.getRightChirld());
        }
    }

      //node节点在subTree子树中的父节点
    public BinaryTreeNode getParent(BinaryTreeNode subTree,BinaryTreeNode node){
        if(subTree==null){
            return null;   //如果是空子树，则没有父节点
        }
        if(subTree.getLeftChirld()==node || subTree.getRightChirld() == node){
            return subTree;   //如果子树的根节点的左右孩子之一是待查节点，则返回子树的根节点
        }
        BinaryTreeNode parent = null;
        if(getParent(subTree.getLeftChirld(),node)!=null){
            parent = getParent(subTree.getLeftChirld(),node);
            return parent;
        }else{
            //递归左右子树
            return getParent(subTree.getRightChirld(),node);
        }
    }
    
    //查找node节点在二叉树中的父节点
    public BinaryTreeNode getParent(BinaryTreeNode node){
        return (root==null||root==node)? null:getParent(root,node);
    }

      //获取某个节点的左子树
    public BinaryTreeNode getleftTree(BinaryTreeNode node){
        return node.getLeftChirld();
    }
    
    //获取某个节点的右子树
    public BinaryTreeNode getrightTree(BinaryTreeNode node){
        return node.getRightChirld();
    }

    * 分两种情况：插入某个节点的左子节点；插入某个节点的右子节点
    * 值得指出的是，当这个节点本身有子节点时，这样的插入也会覆盖原来在这个位置上的节点。
    * 另外，虽然插入的是子节点，但是子节点也可以代表一颗子树。
    * 因为但从这个节点来看并不知道这个节点是否有左右子树存在，所以虽然插入的是一个节点，但有可能
    * 插入可很多节点（插入的是一颗子树）
    //给某个节点插入左节点
    public void insertLeft(BinaryTreeNode parent,BinaryTreeNode newnode){
        parent.setLeftChirld(newnode);
    }
    //给某个节点插入右节点
    public void insertRitht(BinaryTreeNode parent,BinaryTreeNode newnode){
        parent.setRightChirld(newnode);
    }
```

### 遍历
#### 先序遍历
* 访问根节点
* 遍历左子树
* 遍历右子树
* 结束
``` java
public void Porder(BinaryTreeNode node){
    if(node!=null){
        System.out.println(node.getData());//访问根节点
        PreOrder(node.getLeftChild());  //遍历左子树
        PreOrder(node.getRightChild()); //遍历右子树
    }
}
```
#### 中序遍历
* 遍历左子树
* 访问根节点
* 遍历右子树
* 结束
``` java
public void InOrder(BinaryTreeNode node){
    if(node!=null){
        InOrder(node.getLeftChild());  //中序遍历左子树
        System.out.println(node);      //访问根节点
        InOrder(node.getRightChild()); //中序遍历右子树 
    }
}
```

#### 后序遍历
* 遍历左子树
* 遍历右子树
* 访问根节点
* 结束
``` java
public void postOrder(BinaryTreeNode node){
    if(node!=null){
        postOrder(node.getLeftChild());  //后序遍历左子树
        postOrder(node.getRightChild()); //后序遍历右子树
        System.out.println(node);
    }
}
```

### 哈夫曼编码树

数据压缩，每个代码都不可以是其他代码的前缀
出现的频率越高，在树中的位置越高，每个圆圈外的数字就是频率
![](/images/datastructure-tree-huffman.jpg)
每个字符都是从根开始，如果遇到0，就向左走到下一节点，如果遇到1，就向右。例如字符A的代码是010.先向左，向右，再向左。
#### 创建哈夫曼树

1. 为消息中每个字符创建一个Node对象，每个节点有两个数据项：字符和字符在消息中出现的频率。
2. 为这些节点创建tree对象，这些节点就是树的根；
3. 把这些树都插入到一个优先队列中，按照频率排序，频率小的节点有最高的优先级，因此删除一棵树的时候，他就是队列中最少用到的字符。
接下来：
1. 从优先级队列中删掉两棵树，并把它们作为一个新的子节点，新节点的频率是子节点频率的和：它的字符字段可以是空的。；
2. 把这个新的三节点树插回优先级队列中；
3. 重复步骤1和2，树会越来越大，队列中数据越来越少，当队列中只有一棵树的时候，就是哈夫曼树了

![](/images/datastructure-tree-huffman-encode.jpg)

