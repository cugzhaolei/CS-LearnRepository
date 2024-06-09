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
// var isValidBST = function (root) {
//   let isValid = (node, left = -Infinity, right = Infinity) => {
//     if (root == null) {
//         return true;
//     }
//     let x = root.val;

//     return (
//       left < x && x < right &&
//       isValid(node.left, left, x) &&
//       isValid(node.right, x, right)
//     );
//   };

//   return isValid(root)
// };

// // 前序遍历
// var isValidBST = function(root,left = Number.MIN_SAFE_INTEGER,right = Number.MAX_SAFE_INTEGER){
//     if(root==null){
//         return true
//     }
//     const x = root.val;
//     return left<x&&x<right&&isValidBST(root.left,left,x)&&isValidBST(root.right,x,right)
// }


// 中序遍历
var isValidBST = function (root) {
    let pre = Number.MIN_SAFE_INTEGER;
    function dfs(node){
        
        if (node == null) {
            return true;
        }

        if (!dfs(node.left)||(node.val <= pre)){
            return false;
        }

        pre = node.val;
        return dfs(node.right);
    }
    return dfs(root)
};

// 后序遍历

var isValidBST = function (root) {
    function dfs(node){
        if(node == null){
            return [Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER]
        }
        const [lMin,lMax] = dfs(node.left)
        const [rMin,rMax] = dfs(node.right)

        const x = node.val
        if(x<=lMax||x>=rMin){
            return [Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER]
        }
        return [Math.min(lMin,x),Math.max(rMax,x)]
    }

    return dfs(root)[1]!=Number.MAX_SAFE_INTEGER
}