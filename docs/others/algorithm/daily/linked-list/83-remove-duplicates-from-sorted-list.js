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

  let cur = head;
  
  while (cur.next) {
    if (cur.val == cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};

// var deleteDuplicates = function (head) {
//   if (!head) {
//     return head;
//   }

//   let dummyNode = new ListNode(0, head);
//   let cur = dummyNode;
//   while (cur.next) {
//     if (cur.val == cur.next.val) {
//       cur.next = cur.next.next;
//     } else {
//       cur = cur.next;
//     }
//   }
//   return dummyNode.next;
// };

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
  let arr = [0, 0, 0, 0, 0, 0]; // 为了方便，将数组转化为链表
  let L = createLinkList(arr);
  console.log(JSON.stringify(L));

  console.log(JSON.stringify(deleteDuplicates(L)));
}

test();
