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
 * @return {number[]}
 */
var rightSideView = function(root) {
    let res = []

    let dfs = (node, depth)=>{
        if(node === null){
            return
        }

        if(depth == res.length){
            res.push(node.val)
        }

        dfs(node.right,depth+1)
        dfs(node.left,depth+1)

        return res
    }
    dfs(root,0)
    return res;
};