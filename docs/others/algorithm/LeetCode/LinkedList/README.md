# 链表

## [链表反转](https://www.cnblogs.com/keeya/p/9218352.html)

```java
public static class Node {
    public int value;
    public Node next;

    public Node(int data) {
        this.value = data;
    }
}
//递归
public Node reverse(Node head) {
    if (head == null || head.next == null)
        return head;
    Node temp = head.next;
    Node newHead = reverse(head.next);
    temp.next = head;
    head.next = null;
    return newHead;
}

public Node reverseList(Node node) {
  Node pre = null;
  Node next = null;
  while (node != null) {
      next = node.next;
      node.next = pre;
      pre = node;
      node = next;
  }
  return pre;
}
```

## [删除链表中倒数第 N 个节点](https://juejin.im/post/5dd884936fb9a07a9323de6f)

快指针和慢指针，快指针比慢指针快 N 步，然后快慢指针一起向前移动，那么正好快指针走到 Null 的时候慢指针所指向的就是我们要删除的节点。

```java
public ListNode removeNthChildFromEnd(ListNode head,int n){
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy;
    ListNode second = dummy;
    //移动快指针 提前N
    for(int i=1;i<=n+1;i++){
        first = first.next;
    }

    while(first!=null){
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}

//两次遍历的方法
public ListNode removeNthChildFromEnd(ListNode head,int n){
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    int length = 0;
    ListNode first = head;
    while(first !=null){
        length++;
        first = first.next;
    }
    length -=n;
    first=dummy;
    while(length>0){
        length--;
        first = first.next;
    }
    first.next = first.next.next;
    return dummy.next;
}
```

## [找出两个链表的交点](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode l1 = headA,l2 = headB;
        while(l1!=l2){
            l1=(l1==null)?headB:l1.next;
            l2=(l2==null)?headA:l2.next;
        }
        return l1;
    }
}
```

## [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```java
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

### [86.](https://leetcode-cn.com/problems/partition-list/)

给你一个链表和一个特定值 x ，请你对链表进行分隔，使得所有小于 x 的节点都出现在大于或等于 x 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

示例：

```bash
输入：head = 1->4->3->2->5->2, x = 3
输出：1->2->2->4->3->5
```

[5 种解法](https://leetcode-cn.com/problems/partition-list/solution/lian-tou-shu-zu-shuang-zhi-zhen-7xing-da-baxz/)

```js
var partition = function(head, x) {
  let small = new ListNode(0);
  const smallHead = small;
  let large = new ListNode(0);
  const largeHead = large;
  while (head !== null) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }
  large.next = null;
  small.next = largeHead.next;
  return smallHead.next;
};

var partition = function(head, x) {
  let p = new ListNode(0),
    pTag = (tag = new ListNode(0));
  prev.next = head;
  while (head) {
    if (head.val >= x) {
      prev.next = head.next;
      tag = tag.next = head;
    } else {
      prev = head;
    }
    head = head.next;
  }
  tag.next = null;
  prev.next = pTag.next;
  return p.next;
};

var partition = function(head, x) {
  let pA = (a = new ListNode(0)),
    pB = (b = new ListNode(0));
  while (head) {
    head.val < x ? (a = a.next = head) : (b = b.next = head);
    head = head.next;
  }
  a.next = pB.next;
  b.next = null;
  return pA.next;
};

let smallHead = (small = new ListNode(0));
let largeHead = (large = new ListNode(0));
while (head) {
  head.val < x ? (small = small.next = head) : (large = large.next = head);
  head = head.next;
}
large.next = null;
small.next = largeHead.next;
return smallHead.next;
```
