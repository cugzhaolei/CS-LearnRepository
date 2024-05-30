/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummyNode = new ListNode(0, head);
  let right = dummyNode;

  for (let i = 0; i < n; i++) {
    right = right.next;
  }

  let left = dummyNode;
  while (right.next) {
    left = left.next;
    right = right.next;
  }
  left.next = left.next.next;
  return dummyNode.next;
};
