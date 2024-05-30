/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if(!root){
        return 0
    }
    let leftLen = maxDepth(root.left)
    let rightLen = maxDepth(root.right)
    return Math.max(leftLen,rightLen)+1
};

var maxDepth2 = function(node){
    let ans = 0
    function f(node,depth){
        if(!node){
            return 
        }

        depth++
        ans = Math.max(ans,depth)
        f(node.left,depth)
        f(node.right,depth)
    }

    f(node,0)
    return ans;
}