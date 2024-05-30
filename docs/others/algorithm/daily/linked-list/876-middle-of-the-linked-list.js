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
var middleNode = function (head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
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
  let arr = [1, 2, 3, 4, 5]; // 为了方便，将数组转化为链表
  let L = createLinkList(arr);
  console.log(JSON.stringify(L));

  console.log(JSON.stringify(middleNode(L)));
}

function test2() {
  let arr = [1, 2, 3, 4, 5, 6]; // 为了方便，将数组转化为链表
  let L = createLinkList(arr);
  console.log(JSON.stringify(L));

  console.log(JSON.stringify(middleNode(L)));
}

test();
test2();
