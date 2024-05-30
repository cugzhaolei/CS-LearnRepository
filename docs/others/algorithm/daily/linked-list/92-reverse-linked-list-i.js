/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
    let dummyNode = new ListNode(0,head)
    let p0 = dummyNode

    for(let i=0;i<left-1;i++){
        p0 = p0.next
    }

    let pre = null
    let cur = p0.next

    for(let i=0;i<right-left+1;i++){
        let temp = cur.next
        cur.next = pre
        pre = cur
        cur = temp
    }
    p0.next.next = cur
    p0.next = pre

    return dummyNode.next
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
  let arr = [1,2,3,4,5]; // 为了方便，将数组转化为链表
  let L = createLinkList(arr);
  console.log(JSON.stringify(L));

  console.log(JSON.stringify(reverseBetween(L,2,4)));
}

function test2() {
    let arr = [5]; // 为了方便，将数组转化为链表
    let L = createLinkList(arr);
    console.log(JSON.stringify(L));

    console.log(JSON.stringify(reverseBetween(L,1,1)));
  }

test()

test2()