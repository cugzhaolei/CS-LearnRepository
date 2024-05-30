/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    let mid = middleNode(head)
    let head2 = reverseList(mid)

    while(head2.next){
        let next = head.next
        let next2 = head2.next
        head.next = head2
        head2.next = next
        head = next
        head2 = next2
    }
};

var middleNode = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

var reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    let temp = cur.next;
    cur.next = pre;
    pre = cur;
    cur = temp;
  }

  return pre;
};



function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
  
  
  function createLinkList(arr) {
    var L = new ListNode(null);
    var p = L;
    arr.forEach((v) => {
      p.next = new ListNode(v);
      p = p.next;
    });
    return L;
  }
  
  function test() {
    let arr = [1, 3, 5, 7, 9]; // 为了方便，将数组转化为链表
    let L = createLinkList(arr);
    console.log(JSON.stringify(L));
  
    console.log(JSON.stringify(reorderList(L)));
  }
  
  test();