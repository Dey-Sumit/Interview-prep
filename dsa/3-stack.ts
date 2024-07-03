/*
Implement a stack data structure in JavaScript that contains the following operations:

new Stack(): Creates an instance of a Stack class that doesn't contain any items. The constructor does not accept any arguments.
push(): Pushes an item onto the top of the stack and returns the new length of the stack. Required time complexity: O(1).
pop(): Removes an item at the top of the stack and returns that item. Required time complexity: O(1).
isEmpty(): Determines if the stack is empty. Required time complexity: O(1).
peek(): Returns the item at the top of the stack without removing it from the stack. Required time complexity: O(1).
length(): Returns the number of items in the stack. Required time complexity: O(1).

const stack = new Stack();
stack.isEmpty(); // true
stack.push(1);
stack.push(2);
stack.length(); // 2
stack.push(3);
stack.peek(); // 3
stack.pop(); // 3
stack.isEmpty(); // false
*/

class Stack {
  data: number[];
  private _length: number;

  constructor() {
    this.data = [];
    this._length = 0;
  }

  public push(item: number) {
    if (!item) {
      throw Error("push needs an item");
    }
    this.data.push(item);
    this._length++;
    return this._length;
  }

  public pop() {
    const poppedItem = this.data.pop();
    if (poppedItem !== undefined) {
      this._length--;
    }
    return poppedItem;
  }

  public length() {
    return this._length;
  }

  public peek() {
    return this.data[this._length - 1];
  }
  public isEmpty() {
    return this._length === 0;
  }
}

const stack = new Stack();
console.log(stack.push(100));
console.log(stack.length());
console.log(stack.pop());
console.log(stack.length());
console.log(stack.pop());
