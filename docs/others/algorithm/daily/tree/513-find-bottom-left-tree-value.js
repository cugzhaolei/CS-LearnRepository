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
var findBottomLeftValue = function(root) {
    let q = [root]
    let node = root
    while(q.length){
         node = q.shift()
        if(node.right)
            q.push(node.right)
        if(node.left)
            q.push(node.left)
    }
    return node.val
};