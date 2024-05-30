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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return isSame(root.left,root.right)
};

var isSame = function(p,q){
    if(p===null||q===null){
        return p === q
    }
    return p.val==q.val&&isSame(p.left,q.right)&&isSame(p.right,q.left)
}