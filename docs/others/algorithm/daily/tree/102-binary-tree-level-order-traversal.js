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
var levelOrder = function(root) {
  if(root===null)
  {
      return []
  }

  let ans = []
  let cur = [root]
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
          ans.push(vals)
  }
  return ans
};


var levelOrder2 = function(root){
  if(root === null){
    return []
  }

  let ans = []
  let q = [root]

  while(q.length){
    let vals = []
    for(let node of q){
      //let node = q.shift()
      vals.push(node.val)

      if(node.left){
        q.push(node.left)
      }

      if(node.right){
        q.push(node.right)
      }
    }

    ans.push(vals)
  }

  return ans
}