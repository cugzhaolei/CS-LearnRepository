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
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let x = root.val
    if(p.val<x&&q.val<x){
        return lowestCommonAncestor(root.left,p,q)
    }

    if(p.val>x&&q.val>x){
        return lowestCommonAncestor(root.right,p,q)
    }

    return root
};