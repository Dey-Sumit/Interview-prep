// Quokka Js  : run on current file

class LRUCache {
  private cache: Record<string, any>;
  private size: number;
  private queue: string[]; // ByLeastRecentlyUsedOrder
  constructor(size: number) {
    this.size = size;
    this.cache = {};
    this.queue = [];
  }

  public get(key: string) {
    console.log(key, this.cache[key]);

    if (key in this.cache) {
      console.log(key, this.cache[key]);
      return -1;
    }
    if (this.queue.length === this.size) {
      this.queue.shift();
    }
    this.queue.push(key);

    return this.cache[key];
  }

  public put(key: string, value: any) {
    if (Object.keys(this.cache).length === this.size && key in this.cache) {
      const leastRecentlyUsedKey = this.queue.shift();

      if (leastRecentlyUsedKey) delete this.cache[leastRecentlyUsedKey];
    }
    if(this.cache[key]){
    // If the key already exists, remove it from the queue
      const index = this.queue.indexOf(key);
      if (index > -1) {
        this.queue.splice(index, 1);
      }
  }
    this.cache[key] = value;
    this.queue.push(key);
  }

  public printCache() {
    return { cache: this.cache, queue: this.queue };
  }
}

const lruCache = new LRUCache(2); // Capacity is 2

console.log(lruCache.get("1"));
lruCache.put("2", 6);
console.log(lruCache.printCache());
console.log(lruCache.get("1"));

lruCache.put("1", 5); 
console.log(lruCache.printCache());

lruCache.put("1", 2); 
console.log(lruCache.printCache());

console.log(lruCache.get("1")); 
console.log(lruCache.get("2")); 
