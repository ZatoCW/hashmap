import Node from './node.js';

export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    let current = this.head;

    if (!current) {
      this.head = newNode;
    } else {
      while (current.next) {
        current = current.next;
      }

      current.next = newNode;
    }
  }

  prepend(key, value) {
    const newNode = new Node(key, value);

    newNode.next = this.head;

    this.head = newNode;
  }

  size() {
    let count = 0;

    let current = this.head;

    while (current) {
      count++;
      current = current.next
    }

    return count;
  }

  getHead() {
    if (!this.head) return 'There is no data in this list.';
    return this.head;
  }

  getTail() {
    let current = this.head;

    if (!current) return 'There is no data in this list.';

    while (current.next) {
      current = current.next;
    }

    return current;
  }

  at(index) {
    if (index === 0 || !this.head) return this.getHead()

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.next;
      if (!current) return 'There is no element in that index.'
    }

    return current;
  }

  pop() {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
    } else {
      let current = this.head;
      let previous;

      while (current.next) {
        previous = current;
        current = current.next;
      }

      previous.next = null;
    }
  }

  contains(key) {
    let current = this.head;

    while (current) {
      if (current.key === key) return true;
      current = current.next
    }

    return false;
  }

  find(key) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.key === key) return index;
      current = current.next;
      index++
    }

    return null;
  }

  toString() {
    let current = this.head;
    let string = "";

    while (current) {
      string += `(${current.data}) -> `;
      current = current.next
    }

    return string += 'null';
  }

  insertAt(key, value, index) {
    if (index === 0 || !this.head) {
      this.prepend(data);
    } else if (index >= this.size()) {
      this.append(data);
    } else {
      const newNode = new Node(key, value);
      let current = this.head;
      let previous;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next
      }

      previous.next = newNode;
      newNode.next = current;
    }
  }

  removeAt(index) {
    if (!this.head) return;

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      let previous;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
        if (!current) return 'There is no element in that index';
      }

      previous.next = current.next;
    }
  }
}