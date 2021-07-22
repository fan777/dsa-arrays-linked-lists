/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  getNode(idx) {
    if (idx < 0 || idx >= this.length)
      throw new Error(`invalid index`);

    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }
    return current;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null)
      this.head = newNode;
    if (this.tail !== null)
      this.tail.next = newNode;

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (this.head === null)
      this.push(val);
    else {
      let newNode = new Node(val);
      newNode.next = this.head;

      this.head = newNode;
      this.length++;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.getNode(idx);
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.getNode(idx);
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx === 0)
      this.unshift(val);
    else if (idx === this.length) {
      this.push(val);
    } else {
      let newNode = new Node(val);
      let beforeNode = this.getNode(idx - 1);
      let afterNode = beforeNode.next;
      beforeNode.next = newNode;
      newNode.next = afterNode;
      this.length++;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let value;
    let current;

    if (this.length > 1 && idx > 0) {
      // get previous node
      current = this.getNode(idx - 1);
      value = current.next.val;
      current.next = null;
    } else {
      // get target node
      current = this.getNode(idx);
      value = current.val;
    }

    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      if (idx === this.length) {
        this.tail = current;
      }
      if (idx === 0) {
        this.head = current.next;
      }
    }
    return value;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length <= 0)
      return 0;

    let current = this.head;
    let sum = 0;

    for (let i = 0; i < this.length; i++) {
      sum += current.val;
      current = current.next;
    }
    return (sum / this.length);
  }
}

module.exports = LinkedList;
