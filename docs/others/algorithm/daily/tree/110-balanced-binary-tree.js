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
var isBalanced = function (root) {
  return getHeight(root) != -1;
};

var getHeight = function (root) {
  if (root === null) {
    return 0;
  }

  let leftHeight = getHeight(root.left);
  if (leftHeight == -1) {
    return -1;
  }
  let rightHeight = getHeight(root.right);
  if (rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
    return -1;
  }

  return Math.max(leftHeight, rightHeight) + 1;
};
