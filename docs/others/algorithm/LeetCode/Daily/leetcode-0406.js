/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
 var inorderSuccessor = function(root, p) {
    let arr = [];
    // 使中序遍历
    const preorder = function(root,p){
        if(root.val==p){
            if(root.left){
                if(root.val==p){
                    res = root.left;
                    return res;
                }
            }
            if(root.right){
                if(root.val==p){
                    res = root.right;
                    return res;
                }
            }
        }else{
            if(root.left){
                preorder(root.left,p);
            }
            if(root.right){
                preorder(root.right,p)
            }
        }
    }

    const inorder = function(root,p,arr){

        console.log('val',root.val,'left',root.left,'right',root.right)
        if(root.left){
            inorder(root.left,p,arr)
        }
        arr.push(root.val)
        if(root.right){
            inorder(root.right,p,arr)
        }
    }
    inorder(root,p,arr);
    console.log('arr',arr)

    const index = arr.indexOf(p)
    return index>-1?arr[index+1]:null;



};