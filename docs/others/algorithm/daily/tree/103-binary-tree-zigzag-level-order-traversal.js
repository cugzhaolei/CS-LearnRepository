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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if(root == null){
        return []
    }

    let ans = []
    let cur = [root]
    let even = false

    while(cur.length){
        let next = []
        let vals = []
        for(let node of cur){
            vals.push(node.val)
            if(node.left){
                next.push(node.left)
            }
            if(node.right){
                next.push(node.right)
            }
        }
        cur = next
        ans.push(even?vals.reverse():vals)
        even =!even
    }
    return ans
};