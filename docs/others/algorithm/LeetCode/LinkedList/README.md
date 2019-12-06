# 链表

## [链表反转](https://www.cnblogs.com/keeya/p/9218352.html)
``` java
public static class Node {
    public int value;
    public Node next;

    public Node(int data) {
        this.value = data;
    }
}

public Node reverse(Node head) {
    if (head == null || head.next == null)
        return head;
    Node temp = head.next;
    Node newHead = reverse(head.next);
    temp.next = head;
    head.next = null;
    return newHead;
}

public static Node reverseList(Node node) {
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
## [删除链表中倒数第N个节点](https://juejin.im/post/5dd884936fb9a07a9323de6f)
快指针和慢指针，快指针比慢指针快N步，然后快慢指针一起向前移动，那么正好快指针走到Null的时候慢指针所指向的就是我们要删除的节点。
``` java
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

``` java
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

``` java
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