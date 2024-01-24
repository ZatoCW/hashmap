class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    let current = this.head;

    if (!current) {
      this.head = newNode;
    } else {
      if (this.head.key === key) return this.head.value = value;
      
      while (current.next) {
        current = current.next;
        if (current.key === key) return current.value = value;
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

class HashMap {
  constructor() {
    this.buckets = Array.from({ length: 16 }, () => new LinkedList());
    this.loadFactor = 0.9;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode += primeNumber * i + key.charCodeAt(i);
    }
    return hashCode % this.buckets.length;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
       throw new Error("Trying to access index out of bound");
     }
    
    return this.buckets[index].contains(key);
  }

  set(key, value) {
    const index = this.hash(key);

    const bucket = this.buckets[index];

    bucket.append(key, value)

    this.resize();
  }

  get(key) {
    let index = this.hash(key);

    let current = this.buckets[index].head;

    while (current) {
      if (current.key === key) return current.value;
      current = current.next
    }

    return null;
  }

  remove(key) {
    if (this.has(key)) {
      const bucket = this.buckets[this.hash(key)];
      bucket.removeAt(bucket.find(key))
      console.log(bucket)
      return true
    }
    return false;
  }

  length() {
    let storedKeys = 0;
    
    this.buckets.forEach(bucket => {
      let currentNode = bucket.head;
      
      while (currentNode) {
        storedKeys++;
        currentNode = currentNode.next;
      }
    })
    
    return storedKeys;
  }

  clear() {
    this.buckets = Array.from({ length: 16 }, () => new LinkedList());
  }

  keys() {
    const keysCollection = [];

    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        keysCollection.push(current.key);
        current = current.next;
      }
    })

    return keysCollection;
  }

  values() {
    const valuesCollection = [];

    this.buckets.forEach(bucket => {
      let current = bucket.head;
      while (current) {
        valuesCollection.push(current.value);
        current = current.next;
      }
    })

    return valuesCollection;
  }

  entries() {
    const entriesArray = [];

    this.buckets.forEach(bucket => {
      let current = bucket.head
      while (current) {
        entriesArray.push([current.key, current.value]);
        current = current.next
      }
    })

    return entriesArray;
  }

  resize() {
    let filledBuckets = 0;
    
    this.buckets.forEach(bucket => {
      if (bucket.head) filledBuckets++;
    })

    if (filledBuckets / this.buckets.length >= this.loadFactor) {
      const newBuckets = Array.from({ length: this.buckets.length }, () => new LinkedList());
      this.buckets = this.buckets.concat(newBuckets);
    }
  }
}

const newHashMap = new HashMap();
newHashMap.set('john', 6852)
newHashMap.set('maria', 2324)
newHashMap.set('john', 4343)
newHashMap.set('makima', 4385)
newHashMap.set('denji', 34835)
newHashMap.set('jamie', 4384)
newHashMap.set('aki', 348347)
newHashMap.set('reze', 3434)
newHashMap.set('power', 4354)
newHashMap.set('surtr', 9999)
newHashMap.set('texas', 38755)
newHashMap.set('lappland', 43843)
newHashMap.set('chen', 438474)
newHashMap.set('melania', 3484)
newHashMap.set('thorns', 34434)
newHashMap.set('penance', 43434)
newHashMap.set('pozy', 374364)
newHashMap.set('saga', 3434)
newHashMap.set('zauru', 3434)
newHashMap.set('mewtwo', 34434)
newHashMap.set('john', 1000)
newHashMap.set('maria', 1001)
newHashMap.set('denji', 1001)
newHashMap.set('montoya', 4234)
console.log(newHashMap.buckets)
console.log(newHashMap.get('montoya'))
console.log(newHashMap.has('makima'))
console.log(newHashMap.remove('denji'))
console.log(newHashMap.length())
console.log(newHashMap.keys())
console.log(newHashMap.values())
console.log(newHashMap.entries())
newHashMap.clear()
console.log(newHashMap.buckets)