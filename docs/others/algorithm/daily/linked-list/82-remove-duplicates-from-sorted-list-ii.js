/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }
  let dummyNode = new ListNode(0,head);

  let cur = dummyNode;
  while(cur.next&&cur.next.next){
    let val = cur.next.val
    if(cur.next.next.val == val){
        while(cur.next&&cur.next.val == val){
            cur.next = cur.next.next
        }
    }else{
        cur = cur.next
    }
  }
  return dummyNode.next;
};
