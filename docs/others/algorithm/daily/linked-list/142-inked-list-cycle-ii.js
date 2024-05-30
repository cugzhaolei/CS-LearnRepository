/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let fast = head
    let slow = head
    while(fast&&fast.next){
        fast = fast.next.next;
        slow = slow.next
        if(slow == fast){
            // slow从相遇点出发
            // head 从头节点出发
            // 走C 步后，slow在入口处
            // head 到入口的距离也恰好是环长的倍数
            // 继续走将会在入口相遇
            while(slow!=head){
                slow = slow.next
                head = head.next
            }
            return slow
        }
    }
    return null
};