/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  let n = 0;
  let node = head;
  while (node) {
    n++;
    node = node.next;
  }

  let dummyNode = new ListNode(0, head);
  let p0 = dummyNode;
  let pre = null;
  let cur = p0.next;

  while (n >= k) {
    n -= k;
    console.log(JSON.stringify(dummyNode));

    for (let i = 0; i < k; i++) {
      let temp = cur.next;
      cur.next = pre;
      pre = cur;
      cur = temp;
    }

    let t = p0.next;

    p0.next.next = cur;
    p0.next = pre;
    p0 = t;

    console.log(JSON.stringify(p0));
  }

  return dummyNode.next;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function createLinkList(arr) {
  var node = new ListNode(null);
  var p = node;
  arr.forEach((v) => {
    p.next = new ListNode(v);
    p = p.next;
  });
  return node;
}

function test() {
  let arr = [1, 2, 3, 4, 5]; // 为了方便，将数组转化为链表
  let L = createLinkList(arr);
  console.log(JSON.stringify(L));

  console.log(JSON.stringify(reverseKGroup(L, 2)));
}

test();
