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

class Node {
  constructor(data) {
    this.val = data;
    this.next = null;
  }
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
  console.log(L);

  console.log(reverseList(L));
}

test();
